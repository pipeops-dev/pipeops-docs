---
slug: management
sidebar_position: 6
title: Management & Operations
---

# Management & Operations

This guide covers the day-to-day management and operational aspects of the PipeOps Kubernetes Agent, including upgrades, monitoring, backup, and lifecycle management.

## Agent Lifecycle Management

### Checking Agent Status

**Kubernetes Deployment:**
```bash
# Check pod status
kubectl get pods -n pipeops-system -l app=pipeops-agent

# Check deployment health
kubectl get deployment pipeops-agent -n pipeops-system

# View detailed status
kubectl describe deployment pipeops-agent -n pipeops-system
```

**Systemd Service:**
```bash
# Check service status
sudo systemctl status pipeops-agent

# View recent logs
sudo journalctl -u pipeops-agent -n 100
```

**Docker Container:**
```bash
# Check container status
docker ps | grep pipeops-agent

# View container details
docker inspect pipeops-agent
```

### Viewing Logs

**Kubernetes:**
```bash
# View current logs
kubectl logs deployment/pipeops-agent -n pipeops-system

# Follow logs in real-time
kubectl logs -f deployment/pipeops-agent -n pipeops-system

# View logs from previous pod instance
kubectl logs deployment/pipeops-agent -n pipeops-system --previous

# View logs with timestamps
kubectl logs deployment/pipeops-agent -n pipeops-system --timestamps

# View last 100 lines
kubectl logs deployment/pipeops-agent -n pipeops-system --tail=100
```

**Systemd:**
```bash
# View all logs
sudo journalctl -u pipeops-agent

# Follow logs
sudo journalctl -u pipeops-agent -f

# View logs since boot
sudo journalctl -u pipeops-agent -b

# View logs from last hour
sudo journalctl -u pipeops-agent --since "1 hour ago"
```

**Docker:**
```bash
# View logs
docker logs pipeops-agent

# Follow logs
docker logs -f pipeops-agent

# View last 100 lines
docker logs pipeops-agent --tail 100
```

### Restarting the Agent

**Kubernetes:**
```bash
# Restart by deleting pod (deployment recreates it)
kubectl rollout restart deployment/pipeops-agent -n pipeops-system

# Or delete the pod directly
kubectl delete pod -n pipeops-system -l app=pipeops-agent
```

**Systemd:**
```bash
# Restart service
sudo systemctl restart pipeops-agent

# Reload configuration
sudo systemctl reload pipeops-agent
```

**Docker:**
```bash
# Restart container
docker restart pipeops-agent

# Stop and start
docker stop pipeops-agent
docker start pipeops-agent
```

## Upgrading the Agent

### Version Check

Check your current agent version:

```bash
# Kubernetes
kubectl get deployment pipeops-agent -n pipeops-system -o jsonpath='{.spec.template.spec.containers[0].image}'

# Binary
pipeops-agent version

# Docker
docker inspect pipeops-agent | grep Image
```

Check available versions:
```bash
# GitHub releases
curl -s https://api.github.com/repos/PipeOpsHQ/pipeops-k8-agent/releases/latest | grep tag_name

# Helm chart versions
helm search repo pipeops/pipeops-agent --versions
```

### Helm Upgrade

**Upgrade to Latest Version:**
```bash
# Update Helm repository
helm repo update

# Upgrade to latest version
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --namespace pipeops-system \
  --reuse-values
```

**Upgrade to Specific Version:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --version 1.2.3 \
  --namespace pipeops-system \
  --reuse-values
```

**Upgrade with New Configuration:**
```bash
# Create updated values file
cat > updated-values.yaml <<EOF
agent:
  image:
    tag: "v1.2.3"
  resources:
    limits:
      cpu: "1000m"
      memory: "1Gi"
EOF

# Apply upgrade
helm upgrade pipeops-agent pipeops/pipeops-agent \
  -f updated-values.yaml \
  --namespace pipeops-system \
  --reuse-values
```

**Dry Run (Test Before Upgrade):**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --namespace pipeops-system \
  --reuse-values \
  --dry-run --debug
```

### Kubernetes Manifest Upgrade

```bash
# Download new version
curl -sSL https://get.pipeops.io/agent/manifests/v1.2.3.yaml -o pipeops-agent-v1.2.3.yaml

# Review changes
diff pipeops-agent-current.yaml pipeops-agent-v1.2.3.yaml

# Apply upgrade
kubectl apply -f pipeops-agent-v1.2.3.yaml
```

### Binary Upgrade

**Linux:**
```bash
# Download new version
curl -LO https://github.com/PipeOpsHQ/pipeops-k8-agent/releases/download/v1.2.3/pipeops-agent-linux-amd64

# Verify checksum (optional but recommended)
curl -LO https://github.com/PipeOpsHQ/pipeops-k8-agent/releases/download/v1.2.3/checksums.txt
sha256sum -c checksums.txt --ignore-missing

# Stop service
sudo systemctl stop pipeops-agent

# Backup current binary
sudo cp /usr/local/bin/pipeops-agent /usr/local/bin/pipeops-agent.backup

# Replace binary
chmod +x pipeops-agent-linux-amd64
sudo mv pipeops-agent-linux-amd64 /usr/local/bin/pipeops-agent

# Start service
sudo systemctl start pipeops-agent

# Verify upgrade
pipeops-agent version
```

**Docker:**
```bash
# Pull new image
docker pull ghcr.io/pipeopshq/pipeops-k8-agent:v1.2.3

# Stop and remove old container
docker stop pipeops-agent
docker rm pipeops-agent

# Start with new image
docker run -d \
  --name pipeops-agent \
  --restart always \
  -e PIPEOPS_TOKEN="your-api-token" \
  -e CLUSTER_NAME="your-cluster" \
  -v $HOME/.kube/config:/config/.kube/config:ro \
  ghcr.io/pipeopshq/pipeops-k8-agent:v1.2.3
```

### Rollback

If an upgrade causes issues, you can rollback:

**Helm Rollback:**
```bash
# View upgrade history
helm history pipeops-agent -n pipeops-system

# Rollback to previous version
helm rollback pipeops-agent -n pipeops-system

# Rollback to specific revision
helm rollback pipeops-agent 3 -n pipeops-system
```

**Binary Rollback:**
```bash
# Stop service
sudo systemctl stop pipeops-agent

# Restore backup
sudo cp /usr/local/bin/pipeops-agent.backup /usr/local/bin/pipeops-agent

# Start service
sudo systemctl start pipeops-agent
```

## Configuration Management

### Updating Configuration

**Helm (Recommended):**
```bash
# Update single value
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.cluster.name="new-name" \
  --namespace pipeops-system \
  --reuse-values

# Update multiple values from file
helm upgrade pipeops-agent pipeops/pipeops-agent \
  -f updated-values.yaml \
  --namespace pipeops-system \
  --reuse-values
```

**Kubernetes ConfigMap:**
```bash
# Edit ConfigMap directly
kubectl edit configmap pipeops-agent-config -n pipeops-system

# Or update from file
kubectl create configmap pipeops-agent-config \
  --from-file=config.yaml \
  --namespace pipeops-system \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart agent to apply changes
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

**Binary Configuration:**
```bash
# Edit configuration file
sudo nano /etc/pipeops/config.yaml

# Reload service
sudo systemctl reload pipeops-agent
```

### Updating Secrets

**Update API Token:**
```bash
# Create new secret
kubectl create secret generic pipeops-agent-config \
  --from-literal=token=new-api-token \
  --namespace pipeops-system \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart agent
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

**Using External Secret Management:**
```yaml
# Example: Using External Secrets Operator
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: pipeops-agent-secrets
  namespace: pipeops-system
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: pipeops-agent-config
  data:
    - secretKey: token
      remoteRef:
        key: pipeops/agent-token
```

## Resource Management

### Monitoring Resource Usage

```bash
# Check pod resource usage
kubectl top pod -n pipeops-system

# Check node resource usage
kubectl top node

# Detailed resource metrics
kubectl describe pod -n pipeops-system -l app=pipeops-agent | grep -A 5 "Limits\|Requests"
```

### Adjusting Resource Limits

**Increase Resources:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.resources.limits.cpu="1000m" \
  --set agent.resources.limits.memory="1Gi" \
  --set agent.resources.requests.cpu="500m" \
  --set agent.resources.requests.memory="512Mi" \
  --namespace pipeops-system \
  --reuse-values
```

**Monitoring Resource Recommendations:**
```bash
# Install metrics-server if not already installed
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Get resource recommendations (if VPA is installed)
kubectl describe vpa pipeops-agent -n pipeops-system
```

## Backup and Recovery

### Backing Up Agent Configuration

**Kubernetes:**
```bash
# Backup all agent resources
kubectl get all,configmap,secret -n pipeops-system -o yaml > pipeops-agent-backup.yaml

# Backup Helm values
helm get values pipeops-agent -n pipeops-system > pipeops-agent-values-backup.yaml
```

**Binary:**
```bash
# Backup configuration
sudo cp -r /etc/pipeops /etc/pipeops.backup.$(date +%Y%m%d)

# Backup binary
sudo cp /usr/local/bin/pipeops-agent /usr/local/bin/pipeops-agent.backup.$(date +%Y%m%d)
```

### Backing Up Monitoring Data

**Prometheus:**
```bash
# Backup Prometheus data directory
kubectl exec -n pipeops-monitoring deployment/prometheus-server -- tar czf /tmp/prometheus-backup.tar.gz /data

kubectl cp pipeops-monitoring/prometheus-server-xxx:/tmp/prometheus-backup.tar.gz ./prometheus-backup.tar.gz
```

**Grafana:**
```bash
# Export all dashboards
kubectl exec -n pipeops-monitoring deployment/grafana -- \
  grafana-cli --homepath /usr/share/grafana admin export-dashboards > grafana-dashboards-backup.json

# Backup Grafana database
kubectl exec -n pipeops-monitoring deployment/grafana -- \
  sqlite3 /var/lib/grafana/grafana.db .dump > grafana-db-backup.sql
```

### Disaster Recovery

**Complete Reinstallation:**
```bash
# 1. Backup current configuration
helm get values pipeops-agent -n pipeops-system > backup-values.yaml

# 2. Uninstall agent
helm uninstall pipeops-agent -n pipeops-system

# 3. Reinstall with backed-up configuration
helm install pipeops-agent pipeops/pipeops-agent \
  -f backup-values.yaml \
  --namespace pipeops-system \
  --create-namespace
```

**Restore from Backup:**
```bash
# Restore Kubernetes resources
kubectl apply -f pipeops-agent-backup.yaml

# Restore monitoring data
kubectl cp ./prometheus-backup.tar.gz pipeops-monitoring/prometheus-server-xxx:/tmp/
kubectl exec -n pipeops-monitoring deployment/prometheus-server -- \
  tar xzf /tmp/prometheus-backup.tar.gz -C /
```

## Health Checks

### Agent Health Endpoints

The agent exposes health check endpoints:

```bash
# Liveness check
kubectl exec -n pipeops-system deployment/pipeops-agent -- curl http://localhost:8081/healthz

# Readiness check
kubectl exec -n pipeops-system deployment/pipeops-agent -- curl http://localhost:8081/readyz

# Metrics endpoint
kubectl exec -n pipeops-system deployment/pipeops-agent -- curl http://localhost:9091/metrics
```

### Automated Health Monitoring

**Configure Prometheus Alerts:**
```yaml
groups:
  - name: pipeops-agent-health
    rules:
      - alert: PipeOpsAgentDown
        expr: up{job="pipeops-agent"} == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "PipeOps Agent is down"
          description: "The PipeOps Agent has been down for more than 5 minutes"
      
      - alert: PipeOpsAgentHighMemory
        expr: container_memory_working_set_bytes{pod=~"pipeops-agent.*"} / container_spec_memory_limit_bytes > 0.9
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "PipeOps Agent high memory usage"
```

## Maintenance Tasks

### Log Rotation

**Kubernetes (automatic):**
Kubernetes automatically rotates container logs. Configure if needed:

```yaml
# kubelet config
containerLogMaxSize: "10Mi"
containerLogMaxFiles: 5
```

**Systemd:**
```bash
# Configure journald log rotation
sudo nano /etc/systemd/journald.conf

# Add/modify:
# SystemMaxUse=1G
# SystemKeepFree=2G
# MaxRetentionSec=7day

# Restart journald
sudo systemctl restart systemd-journald
```

### Cleanup Old Resources

```bash
# Remove failed pods
kubectl delete pods --field-selector status.phase=Failed -n pipeops-system

# Remove completed jobs
kubectl delete jobs --field-selector status.successful=1 -n pipeops-system

# Cleanup evicted pods
kubectl get pods -n pipeops-system | grep Evicted | awk '{print $1}' | xargs kubectl delete pod -n pipeops-system
```

### Certificate Rotation

If using custom certificates:

```bash
# Update certificate secret
kubectl create secret tls pipeops-agent-tls \
  --cert=new-cert.crt \
  --key=new-key.key \
  --namespace pipeops-system \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart agent
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

## Security Best Practices

### Regular Updates

- Enable automatic security updates for your OS
- Subscribe to PipeOps security advisories
- Regularly update to latest agent version
- Keep Kubernetes cluster updated

### Token Rotation

```bash
# Generate new token in PipeOps dashboard
# Update secret with new token
kubectl create secret generic pipeops-agent-config \
  --from-literal=token=new-token \
  --namespace pipeops-system \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart agent
kubectl rollout restart deployment/pipeops-agent -n pipeops-system
```

### Audit Logs

Enable Kubernetes audit logging to track agent activities:

```yaml
# kube-apiserver audit policy
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    namespaces: ["pipeops-system"]
    verbs: ["create", "update", "patch", "delete"]
```

## Monitoring Agent Metrics

### Key Metrics to Monitor

**Agent Health:**
- `pipeops_agent_up` - Agent running status
- `pipeops_agent_connected` - Connection to PipeOps API
- `pipeops_tunnel_active` - Tunnel status

**Resource Usage:**
- `pipeops_agent_cpu_usage` - CPU utilization
- `pipeops_agent_memory_usage` - Memory utilization
- `pipeops_agent_goroutines` - Number of Go routines

**API Metrics:**
- `pipeops_api_requests_total` - Total API requests
- `pipeops_api_request_duration_seconds` - Request latency
- `pipeops_api_errors_total` - API errors

### Prometheus Queries

```promql
# Agent uptime
time() - pipeops_agent_start_time_seconds

# API request rate
rate(pipeops_api_requests_total[5m])

# Error rate
rate(pipeops_api_errors_total[5m]) / rate(pipeops_api_requests_total[5m])

# Memory usage percentage
pipeops_agent_memory_usage / pipeops_agent_memory_limit * 100
```

## Troubleshooting Common Operations

### Agent Won't Start

```bash
# Check logs for errors
kubectl logs deployment/pipeops-agent -n pipeops-system

# Common issues:
# 1. Invalid token - check secret
# 2. Network connectivity - check network policies
# 3. Resource constraints - check node capacity
# 4. Configuration errors - validate config
```

### High Resource Usage

```bash
# Check current usage
kubectl top pod -n pipeops-system

# Identify causes:
# - Too frequent metric scraping
# - Large log volume
# - Memory leaks (check for increasing trends)

# Solutions:
# - Increase resource limits
# - Adjust scrape intervals
# - Update to latest version (may include fixes)
```

### Connection Issues

```bash
# Test connectivity to PipeOps API
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  curl -v https://api.pipeops.sh/health

# Check DNS resolution
kubectl exec -n pipeops-system deployment/pipeops-agent -- \
  nslookup api.pipeops.sh

# Verify network policies
kubectl get networkpolicies -n pipeops-system
```

## Next Steps

- **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Detailed troubleshooting guide
- **[API Reference](/docs/kubernetes-agent/api-reference)** — Agent API documentation
- **[Configuration Reference](/docs/kubernetes-agent/configuration)** — Complete configuration options
