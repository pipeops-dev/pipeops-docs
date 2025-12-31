---
slug: troubleshooting
sidebar_position: 7
title: Troubleshooting Guide
---

# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with the PipeOps Kubernetes Agent.

## Quick Diagnostic Steps

When experiencing issues, follow these steps first:

```bash
# 1. Check agent status
kubectl get pods -n pipeops-system

# 2. View recent logs
kubectl logs deployment/pipeops-agent -n pipeops-system --tail=50

# 3. Check events
kubectl get events -n pipeops-system --sort-by='.lastTimestamp'

# 4. Describe the pod
kubectl describe pod -n pipeops-system -l app=pipeops-agent

# 5. Check resource usage
kubectl top pod -n pipeops-system
```

## Installation Issues

### Issue: Agent Pod Not Starting

**Symptoms:**
- Pod stuck in `Pending`, `CrashLoopBackOff`, or `ImagePullBackOff`
- Installation script fails

**Diagnosis:**
```bash
# Check pod status
kubectl get pods -n pipeops-system

# View detailed pod information
kubectl describe pod -n pipeops-system -l app=pipeops-agent

# Check logs if pod started
kubectl logs -n pipeops-system -l app=pipeops-agent
```

**Solutions:**

**For `ImagePullBackOff`:**
```bash
# Check if image exists and is accessible
docker pull ghcr.io/pipeopshq/pipeops-k8-agent:latest

# Verify image pull secrets if using private registry
kubectl get secrets -n pipeops-system

# Check for image pull errors
kubectl describe pod -n pipeops-system -l app=pipeops-agent | grep -A 5 "Events"
```

**For `CrashLoopBackOff`:**
```bash
# View crash logs
kubectl logs -n pipeops-system -l app=pipeops-agent --previous

# Common causes:
# 1. Invalid configuration
# 2. Missing required environment variables
# 3. Insufficient permissions

# Check configuration
kubectl get configmap pipeops-agent-config -n pipeops-system -o yaml
kubectl get secret pipeops-agent-config -n pipeops-system -o yaml
```

**For `Pending`:**
```bash
# Check if there are sufficient node resources
kubectl describe pod -n pipeops-system -l app=pipeops-agent | grep -A 10 "Events"

# Common causes:
# 1. No nodes available
# 2. Insufficient CPU/memory
# 3. Node selector mismatch
# 4. Taints/tolerations

# Check node resources
kubectl top nodes
kubectl describe nodes
```

### Issue: Invalid or Missing API Token

**Symptoms:**
- Agent logs show authentication errors
- "Unauthorized" or "Forbidden" errors

**Diagnosis:**
```bash
# Check if secret exists
kubectl get secret pipeops-agent-config -n pipeops-system

# View secret (base64 encoded)
kubectl get secret pipeops-agent-config -n pipeops-system -o jsonpath='{.data.token}' | base64 -d
```

**Solutions:**
```bash
# Create or update secret with correct token
kubectl create secret generic pipeops-agent-config \
  --from-literal=token=your-correct-api-token \
  --namespace pipeops-system \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart agent to apply changes
kubectl rollout restart deployment/pipeops-agent -n pipeops-system

# Verify connection
kubectl logs -n pipeops-system deployment/pipeops-agent | grep -i "connected\|authenticated"
```

### Issue: Kubernetes Cluster Not Created

**Symptoms:**
- Installer fails to create cluster
- k3s, minikube, or other distribution installation fails

**Diagnosis:**
```bash
# Check installer logs
sudo cat /var/log/pipeops/install.log

# Check if Kubernetes is running
kubectl get nodes
systemctl status k3s  # or minikube status
```

**Solutions:**

**For k3s:**
```bash
# Check k3s logs
sudo journalctl -u k3s -n 100

# Common issues:
# - Port 6443 already in use
# - Insufficient resources
# - SELinux/AppArmor conflicts

# Manual k3s installation
curl -sfL https://get.k3s.io | sh -

# Verify installation
sudo k3s kubectl get nodes
```

**For minikube:**
```bash
# Check minikube status
minikube status

# View logs
minikube logs

# Delete and recreate
minikube delete
minikube start --cpus 2 --memory 4096
```

## Connection Issues

### Issue: Cannot Connect to PipeOps API

**Symptoms:**
- Logs show "connection refused" or "timeout" errors
- Agent status shows disconnected

**Diagnosis:**
```bash
# Test connectivity from pod
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  curl -v https://api.pipeops.sh/health

# Check DNS resolution
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  nslookup api.pipeops.sh

# View agent logs
kubectl logs -n pipeops-system deployment/pipeops-agent | grep -i "error\|fail\|connection"
```

**Solutions:**

**Check Network Policies:**
```bash
# List network policies
kubectl get networkpolicies -n pipeops-system

# If blocking outbound, create egress rule
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-pipeops-api
  namespace: pipeops-system
spec:
  podSelector:
    matchLabels:
      app: pipeops-agent
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector: {}
      ports:
        - protocol: TCP
          port: 443
    - to:
        - namespaceSelector: {}
      ports:
        - protocol: TCP
          port: 53
        - protocol: UDP
          port: 53
EOF
```

**Check Proxy Configuration:**
```bash
# If behind corporate proxy, configure proxy
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.proxy.http="http://proxy.company.com:8080" \
  --set agent.proxy.https="http://proxy.company.com:8080" \
  --set agent.proxy.no_proxy="localhost,127.0.0.1,.cluster.local" \
  --namespace pipeops-system \
  --reuse-values
```

**Firewall Rules:**
```bash
# Ensure outbound HTTPS (443) is allowed
# Check with cloud provider firewall/security groups

# Test from node
curl -v https://api.pipeops.sh/health
```

### Issue: Tunnel Connection Failures

**Symptoms:**
- Cannot access cluster through PipeOps dashboard
- Tunnel status shows "disconnected"

**Diagnosis:**
```bash
# Check tunnel logs
kubectl logs -n pipeops-system deployment/pipeops-agent | grep -i tunnel

# Check tunnel configuration
kubectl get configmap pipeops-agent-config -n pipeops-system -o yaml | grep -A 10 tunnel
```

**Solutions:**
```bash
# Verify tunnel is enabled
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set tunnel.enabled=true \
  --namespace pipeops-system \
  --reuse-values

# Check for port conflicts
netstat -tlnp | grep -E '6443|10250|8080'

# Restart agent
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

## Resource Issues

### Issue: High Memory Usage

**Symptoms:**
- Pod evicted due to memory
- OOMKilled status
- Slow performance

**Diagnosis:**
```bash
# Check current memory usage
kubectl top pod -n pipeops-system

# View memory limits
kubectl get pod -n pipeops-system -l app=pipeops-agent -o jsonpath='{.items[0].spec.containers[0].resources}'

# Check for memory leaks
kubectl logs -n pipeops-system deployment/pipeops-agent | grep -i "memory\|oom"
```

**Solutions:**

**Increase Memory Limits:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.resources.limits.memory="1Gi" \
  --set agent.resources.requests.memory="512Mi" \
  --namespace pipeops-system \
  --reuse-values
```

**Reduce Monitoring Overhead:**
```bash
# Disable monitoring if not needed
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set monitoring.enabled=false \
  --namespace pipeops-system \
  --reuse-values

# Or adjust scrape intervals
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set monitoring.prometheus.scrape_interval="60s" \
  --namespace pipeops-system \
  --reuse-values
```

### Issue: High CPU Usage

**Symptoms:**
- CPU throttling
- Slow API responses
- Pod stuck in throttling state

**Diagnosis:**
```bash
# Check CPU usage
kubectl top pod -n pipeops-system

# View CPU limits
kubectl describe pod -n pipeops-system -l app=pipeops-agent | grep -A 5 "Limits\|Requests"

# Check for CPU-intensive operations
kubectl logs -n pipeops-system deployment/pipeops-agent | tail -100
```

**Solutions:**
```bash
# Increase CPU limits
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.resources.limits.cpu="1000m" \
  --set agent.resources.requests.cpu="500m" \
  --namespace pipeops-system \
  --reuse-values
```

### Issue: Disk Space Full

**Symptoms:**
- Pod evicted
- Cannot write logs
- Monitoring data not persisted

**Diagnosis:**
```bash
# Check node disk usage
kubectl get nodes -o custom-columns=NAME:.metadata.name,DISK:.status.allocatable.ephemeral-storage

# Check PV usage
kubectl get pv
kubectl describe pvc -n pipeops-monitoring

# Check pod disk usage
kubectl exec -n pipeops-system deployment/pipeops-agent -- df -h
```

**Solutions:**

**Increase PV Size:**
```bash
# For monitoring PVCs
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set monitoring.prometheus.persistence.size="50Gi" \
  --set monitoring.grafana.persistence.size="10Gi" \
  --set monitoring.loki.persistence.size="50Gi" \
  --namespace pipeops-system \
  --reuse-values
```

**Reduce Retention:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set monitoring.prometheus.retention="7d" \
  --set monitoring.loki.retention="168h" \
  --namespace pipeops-system \
  --reuse-values
```

**Clean Up Old Data:**
```bash
# Delete old logs
kubectl exec -n pipeops-monitoring deployment/loki -- rm -rf /data/loki/chunks/*

# Restart to rebuild index
kubectl rollout restart deployment/loki -n pipeops-monitoring
```

## Monitoring Issues

### Issue: Prometheus Not Scraping Metrics

**Symptoms:**
- No data in Grafana dashboards
- Missing metrics in Prometheus

**Diagnosis:**
```bash
# Check Prometheus targets
kubectl port-forward -n pipeops-monitoring svc/prometheus-server 9090:9090

# Open http://localhost:9090/targets in browser
# Look for failed targets

# Check service monitors
kubectl get servicemonitor -n pipeops-monitoring
```

**Solutions:**

**Verify Service Monitor:**
```bash
kubectl get servicemonitor -n pipeops-monitoring -o yaml

# Ensure labels match Prometheus selector
kubectl get prometheus -n pipeops-monitoring -o yaml | grep serviceMonitorSelector -A 5
```

**Check Network Policies:**
```bash
# Ensure Prometheus can reach targets
kubectl describe networkpolicy -n pipeops-monitoring
```

**Restart Prometheus:**
```bash
kubectl rollout restart deployment/prometheus-server -n pipeops-monitoring
```

### Issue: Grafana Dashboards Not Loading

**Symptoms:**
- Dashboards show "No data"
- Data source connection failed

**Diagnosis:**
```bash
# Check Grafana logs
kubectl logs -n pipeops-monitoring deployment/grafana

# Test Prometheus data source
kubectl port-forward -n pipeops-monitoring svc/grafana 3000:3000

# Login and check Configuration > Data Sources
```

**Solutions:**

**Verify Data Source Configuration:**
```bash
# Check Prometheus URL in Grafana
# Should be: http://prometheus-server.pipeops-monitoring.svc.cluster.local

# Update if needed through Grafana UI or ConfigMap
kubectl edit configmap grafana-datasources -n pipeops-monitoring
```

**Restart Grafana:**
```bash
kubectl rollout restart deployment/grafana -n pipeops-monitoring
```

### Issue: Cannot Access Grafana Dashboard

**Symptoms:**
- Cannot access Grafana UI
- Login fails
- Forgot admin password

**Diagnosis:**
```bash
# Check Grafana pod status
kubectl get pods -n pipeops-monitoring -l app=grafana

# Check Grafana logs
kubectl logs -n pipeops-monitoring deployment/grafana
```

**Solutions:**

**Reset Admin Password:**
```bash
kubectl exec -it -n pipeops-monitoring deployment/grafana -- \
  grafana-cli admin reset-admin-password newpassword
```

**Port Forward to Access:**
```bash
kubectl port-forward -n pipeops-monitoring svc/grafana 3000:3000
# Open http://localhost:3000
```

**Check Ingress (if configured):**
```bash
kubectl get ingress -n pipeops-monitoring
kubectl describe ingress grafana -n pipeops-monitoring
```

## Configuration Issues

### Issue: Configuration Changes Not Applied

**Symptoms:**
- Changes to ConfigMap don't take effect
- Updated Helm values not applied

**Diagnosis:**
```bash
# Check current configuration
kubectl get configmap pipeops-agent-config -n pipeops-system -o yaml

# Check Helm values
helm get values pipeops-agent -n pipeops-system
```

**Solutions:**

**Restart Agent:**
```bash
# ConfigMaps are not auto-reloaded
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

**Verify Helm Upgrade:**
```bash
# Use --reuse-values to keep existing values
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.new.setting="value" \
  --namespace pipeops-system \
  --reuse-values

# Check what changed
helm diff upgrade pipeops-agent pipeops/pipeops-agent \
  -f values.yaml \
  --namespace pipeops-system
```

### Issue: Invalid YAML Configuration

**Symptoms:**
- Parse errors in logs
- Agent fails to start
- ConfigMap apply fails

**Diagnosis:**
```bash
# Validate YAML syntax
kubectl create configmap test --from-file=config.yaml --dry-run=client -o yaml

# Check for common issues:
# - Incorrect indentation
# - Missing quotes
# - Invalid characters
```

**Solutions:**

**Use YAML Validator:**
```bash
# Install yamllint
pip install yamllint

# Validate file
yamllint config.yaml
```

**Common Fixes:**
```yaml
# Incorrect (bad indentation)
agent:
cluster_name: "test"

# Correct
agent:
  cluster_name: "test"

# Incorrect (missing quotes)
cluster_name: my-cluster-name

# Correct
cluster_name: "my-cluster-name"
```

## Performance Issues

### Issue: Slow API Responses

**Symptoms:**
- PipeOps dashboard slow
- Deployment delays
- Timeouts

**Diagnosis:**
```bash
# Check agent logs for slow requests
kubectl logs -n pipeops-system deployment/pipeops-agent | grep -i "slow\|timeout"

# Check resource usage
kubectl top pod -n pipeops-system

# Check API latency metrics (if exposed)
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  curl http://localhost:9091/metrics | grep api_request_duration
```

**Solutions:**

**Increase Timeouts:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.timeout="60s" \
  --namespace pipeops-system \
  --reuse-values
```

**Scale Resources:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.resources.limits.cpu="1000m" \
  --set agent.resources.limits.memory="1Gi" \
  --namespace pipeops-system \
  --reuse-values
```

**Check Network Latency:**
```bash
# Test latency to PipeOps API
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  time curl -s https://api.pipeops.sh/health
```

## Security Issues

### Issue: RBAC Permission Denied

**Symptoms:**
- "Forbidden" errors in logs
- Cannot list/create Kubernetes resources

**Diagnosis:**
```bash
# Check service account
kubectl get sa pipeops-agent -n pipeops-system

# Check role bindings
kubectl get rolebinding,clusterrolebinding -n pipeops-system | grep pipeops

# Test specific permission
kubectl auth can-i list pods --as=system:serviceaccount:pipeops-system:pipeops-agent
```

**Solutions:**

**Verify RBAC Creation:**
```bash
# Ensure RBAC is enabled
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set rbac.create=true \
  --set serviceAccount.create=true \
  --namespace pipeops-system \
  --reuse-values
```

**Grant Additional Permissions (if needed):**
```yaml
# custom-rbac.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pipeops-agent-custom
rules:
  - apiGroups: [""]
    resources: ["pods", "services"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: pipeops-agent-custom
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: pipeops-agent-custom
subjects:
  - kind: ServiceAccount
    name: pipeops-agent
    namespace: pipeops-system
```

Apply:
```bash
kubectl apply -f custom-rbac.yaml
```

### Issue: TLS Certificate Errors

**Symptoms:**
- "x509: certificate" errors
- TLS handshake failures

**Diagnosis:**
```bash
# Check TLS configuration
kubectl logs -n pipeops-system deployment/pipeops-agent | grep -i "tls\|certificate"

# Test TLS connection
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  openssl s_client -connect api.pipeops.sh:443
```

**Solutions:**

**Update CA Certificates:**
```bash
# In pod
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  update-ca-certificates
```

**Disable TLS Verification (NOT for production):**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.tls.insecure_skip_verify=true \
  --namespace pipeops-system \
  --reuse-values
```

## Debugging Tools

### Enable Debug Logging

```bash
# Helm
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set logging.level="debug" \
  --namespace pipeops-system \
  --reuse-values

# ConfigMap
kubectl patch configmap pipeops-agent-config -n pipeops-system \
  --type merge \
  -p '{"data":{"log_level":"debug"}}'

# Restart agent
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

### Interactive Debugging

```bash
# Shell into agent pod
kubectl exec -it -n pipeops-system deployment/pipeops-agent -- /bin/sh

# Common debugging commands:
# - ps aux (check processes)
# - netstat -tlnp (check listening ports)
# - curl localhost:8081/healthz (health check)
# - env (check environment variables)
```

### Collect Diagnostic Information

```bash
#!/bin/bash
# collect-diagnostics.sh

mkdir -p diagnostics

# Agent info
kubectl get all -n pipeops-system -o yaml > diagnostics/agent-resources.yaml
kubectl logs deployment/pipeops-agent -n pipeops-system > diagnostics/agent-logs.txt
kubectl describe pod -n pipeops-system -l app=pipeops-agent > diagnostics/agent-pod-describe.txt

# Monitoring info
kubectl get all -n pipeops-monitoring -o yaml > diagnostics/monitoring-resources.yaml
kubectl logs deployment/prometheus-server -n pipeops-monitoring > diagnostics/prometheus-logs.txt

# Cluster info
kubectl get nodes -o wide > diagnostics/nodes.txt
kubectl top nodes > diagnostics/node-resources.txt
kubectl get events --all-namespaces --sort-by='.lastTimestamp' > diagnostics/events.txt

# Create archive
tar czf diagnostics-$(date +%Y%m%d-%H%M%S).tar.gz diagnostics/

echo "Diagnostics collected in diagnostics-*.tar.gz"
```

## Getting Help

If you cannot resolve the issue using this guide:

1. **Check GitHub Issues**: [https://github.com/PipeOpsHQ/pipeops-k8-agent/issues](https://github.com/PipeOpsHQ/pipeops-k8-agent/issues)

2. **Community Forum**: [https://community.pipeops.io](https://community.pipeops.io)

3. **Email Support**: support@pipeops.io
   - Include agent version
   - Attach diagnostic logs
   - Describe steps to reproduce

4. **Create Support Ticket**: Include:
   ```bash
   # Agent version
   kubectl get deployment pipeops-agent -n pipeops-system -o jsonpath='{.spec.template.spec.containers[0].image}'
   
   # Cluster info
   kubectl version
   kubectl get nodes
   
   # Recent logs
   kubectl logs deployment/pipeops-agent -n pipeops-system --tail=100
   ```

## Next Steps

- **[Management & Operations](/docs/kubernetes-agent/management)** — Agent lifecycle management
- **[API Reference](/docs/kubernetes-agent/api-reference)** — API documentation
- **[Configuration Reference](/docs/kubernetes-agent/configuration)** — Complete configuration options
