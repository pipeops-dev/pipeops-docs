---
slug: deployment-scenarios
sidebar_position: 4
title: Deployment Scenarios
---

# Deployment Scenarios

This guide covers common deployment scenarios for the PipeOps Kubernetes Agent, helping you choose the best approach for your specific use case.

## Scenario 1: New Cluster Setup (Full Installation)

This is the most common scenario: starting from a fresh VM and creating a complete Kubernetes environment with monitoring.

### Use Case

- Starting with a bare VM (no Kubernetes installed)
- Need complete observability stack
- Production or staging environment
- Want automated, zero-configuration setup

### Installation Approach

Use the intelligent installer for automatic environment detection and setup:

```bash
export PIPEOPS_TOKEN="your-api-token"
export CLUSTER_NAME="production-cluster"
export DISABLE_MONITORING="false"

curl -sSL https://get.pipeops.io/agent | bash
```

### What Gets Installed

1. **Kubernetes Distribution**: Automatically selected based on system resources
   - k3s for production servers (default for 4GB+ RAM)
   - minikube for development/testing
   - Existing cluster detected if already present

2. **PipeOps Agent**: Core agent service in `pipeops-system` namespace

3. **Monitoring Stack** (in `pipeops-monitoring` namespace):
   - Prometheus (metrics collection)
   - Grafana (visualization dashboards)
   - Loki (log aggregation)
   - OpenCost (cost monitoring)

### Configuration Example

```bash
# Recommended for production
export PIPEOPS_TOKEN="your-api-token"
export CLUSTER_NAME="prod-us-east-1"
export CLUSTER_TYPE="k3s"
export PIPEOPS_MONITORING_ENABLED="true"
export PIPEOPS_CPU_LIMIT="1000m"
export PIPEOPS_MEMORY_LIMIT="1Gi"

curl -sSL https://get.pipeops.io/agent | bash
```

### Verification Steps

```bash
# Check Kubernetes is running
kubectl get nodes

# Verify agent installation
kubectl get pods -n pipeops-system

# Check monitoring stack
kubectl get pods -n pipeops-monitoring

# Access Grafana dashboard
kubectl port-forward svc/grafana 3000:3000 -n pipeops-monitoring
```

## Scenario 2: Existing Cluster (Agent Only)

Deploy the agent to an existing Kubernetes cluster without installing additional infrastructure.

### Use Case

- Already have a Kubernetes cluster (EKS, GKE, AKS, etc.)
- Want to integrate with PipeOps platform
- Already have monitoring solution
- Minimal footprint installation

### Installation Approach

Use Helm for precise control over what gets installed:

```bash
helm repo add pipeops https://charts.pipeops.io
helm repo update

helm install pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="existing-cluster" \
  --set monitoring.enabled=false \
  --namespace pipeops-system \
  --create-namespace
```

### Configuration for Existing Clusters

Create a `values.yaml`:

```yaml
agent:
  cluster:
    name: "existing-production-cluster"
    labels:
      provider: "aws"
      region: "us-east-1"
      environment: "production"
  
  pipeops:
    token: "your-api-token"
    apiUrl: "https://api.pipeops.sh"
  
  # Minimal resources for existing cluster
  resources:
    requests:
      cpu: "100m"
      memory: "128Mi"
    limits:
      cpu: "250m"
      memory: "256Mi"

# Don't install monitoring
monitoring:
  enabled: false

# Use existing RBAC if needed
rbac:
  create: true

# Service account
serviceAccount:
  create: true
```

Install:

```bash
helm install pipeops-agent pipeops/pipeops-agent \
  -f values.yaml \
  --namespace pipeops-system \
  --create-namespace
```

### Integration with Existing Monitoring

If you have existing Prometheus/Grafana:

```yaml
monitoring:
  # Don't deploy monitoring stack
  enabled: false

# Expose metrics for your existing Prometheus
metrics:
  enabled: true
  port: 9091
  serviceMonitor:
    enabled: true
    namespace: "monitoring"  # Your existing monitoring namespace
```

## Scenario 3: Development Environment

Optimized setup for local development with minimal resource usage.

### Use Case

- Local development on laptop/workstation
- Testing and experimentation
- Learning Kubernetes and PipeOps
- Resource-constrained environment

### Installation Approach

Use lightweight Kubernetes distribution:

```bash
export PIPEOPS_TOKEN="your-api-token"
export CLUSTER_NAME="dev-local"
export CLUSTER_TYPE="minikube"  # or k3d, kind
export PIPEOPS_MONITORING_ENABLED="false"  # Disable for dev
export PIPEOPS_CPU_LIMIT="250m"
export PIPEOPS_MEMORY_LIMIT="256Mi"

curl -sSL https://get.pipeops.io/agent | bash
```

### Alternative: Minikube with Agent

If you prefer to set up Minikube yourself:

```bash
# Start Minikube
minikube start --cpus 2 --memory 4096

# Install agent only
helm install pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="minikube-dev" \
  --set monitoring.enabled=false \
  --set agent.resources.requests.cpu="100m" \
  --set agent.resources.requests.memory="128Mi" \
  --namespace pipeops-system \
  --create-namespace
```

### Development Configuration

Minimal `values.yaml` for development:

```yaml
agent:
  cluster:
    name: "dev-cluster"
  
  pipeops:
    token: "dev-token"
  
  resources:
    requests:
      cpu: "100m"
      memory: "128Mi"
    limits:
      cpu: "250m"
      memory: "256Mi"

monitoring:
  enabled: false

# Development logging
logging:
  level: "debug"
  format: "text"  # More readable for development
```

### Quick Reset for Development

```bash
# Delete everything and start fresh
helm uninstall pipeops-agent -n pipeops-system
kubectl delete namespace pipeops-system

# Or completely reset Minikube
minikube delete
minikube start --cpus 2 --memory 4096
```

## Scenario 4: Production Environment

Production-grade deployment with high availability, monitoring, and security hardening.

### Use Case

- Mission-critical workloads
- Compliance and security requirements
- Need comprehensive monitoring
- High availability requirements

### Installation Approach

Use Helm with production values:

```yaml
# production-values.yaml
agent:
  cluster:
    name: "production-cluster"
    labels:
      environment: "production"
      region: "us-east-1"
      cost-center: "engineering"
  
  pipeops:
    token: "production-token"  # Use secret management
    apiUrl: "https://api.pipeops.sh"
    timeout: "60s"
    reconnect:
      enabled: true
      maxAttempts: 20
      interval: "10s"
  
  image:
    tag: "v1.2.3"  # Use specific version
    pullPolicy: IfNotPresent
  
  resources:
    requests:
      cpu: "500m"
      memory: "512Mi"
    limits:
      cpu: "1000m"
      memory: "1Gi"
  
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
    readOnlyRootFilesystem: true
    capabilities:
      drop:
        - ALL

monitoring:
  enabled: true
  namespace: "pipeops-monitoring"
  
  prometheus:
    enabled: true
    retention: "30d"
    persistence:
      enabled: true
      storageClass: "gp3"  # AWS EBS
      size: "100Gi"
    resources:
      requests:
        cpu: "500m"
        memory: "2Gi"
      limits:
        cpu: "2000m"
        memory: "4Gi"
    alerting:
      enabled: true
      config: |
        alertmanager_config: |
          global:
            slack_api_url: 'YOUR_SLACK_WEBHOOK'
          route:
            receiver: 'slack-notifications'
          receivers:
            - name: 'slack-notifications'
              slack_configs:
                - channel: '#alerts'
  
  grafana:
    enabled: true
    persistence:
      enabled: true
      storageClass: "gp3"
      size: "20Gi"
    ingress:
      enabled: true
      className: "nginx"
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-prod"
      hosts:
        - host: grafana.pipeops.example.com
          paths:
            - path: /
              pathType: Prefix
      tls:
        - secretName: grafana-tls
          hosts:
            - grafana.pipeops.example.com
    resources:
      requests:
        cpu: "200m"
        memory: "256Mi"
      limits:
        cpu: "500m"
        memory: "512Mi"
  
  loki:
    enabled: true
    retention: "720h"  # 30 days
    persistence:
      enabled: true
      storageClass: "gp3"
      size: "200Gi"
    resources:
      requests:
        cpu: "500m"
        memory: "1Gi"
      limits:
        cpu: "1000m"
        memory: "2Gi"

networkPolicy:
  enabled: true

podDisruptionBudget:
  enabled: true
  minAvailable: 1

# Node affinity for dedicated nodes (optional)
affinity:
  nodeAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        preference:
          matchExpressions:
            - key: workload-type
              operator: In
              values:
                - platform
```

Deploy:

```bash
# Create namespace first
kubectl create namespace pipeops-system

# Store token in secret
kubectl create secret generic pipeops-token \
  --from-literal=token="your-production-token" \
  -n pipeops-system

# Install with production values
helm install pipeops-agent pipeops/pipeops-agent \
  -f production-values.yaml \
  --namespace pipeops-system
```

### Production Security Checklist

- [ ] Use specific image versions (not `latest`)
- [ ] Store tokens in Kubernetes secrets or external secret manager
- [ ] Enable network policies
- [ ] Configure RBAC with minimal permissions
- [ ] Enable TLS for all communications
- [ ] Configure pod security policies/standards
- [ ] Set resource limits and requests
- [ ] Enable monitoring and alerting
- [ ] Configure backup for persistent data
- [ ] Set up log aggregation
- [ ] Configure ingress with TLS certificates
- [ ] Implement pod disruption budgets
- [ ] Use dedicated nodes for critical workloads (optional)

## Scenario 5: Multi-Cloud Deployment

Manage clusters across multiple cloud providers from a single PipeOps account.

### Use Case

- Multi-cloud strategy
- Different providers for different regions
- Avoiding vendor lock-in
- Cost optimization across providers

### Deployment Strategy

Deploy agents with unique cluster names and labels:

**AWS Cluster:**
```bash
helm install pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="aws-us-east-1-prod" \
  --set agent.cluster.labels.provider="aws" \
  --set agent.cluster.labels.region="us-east-1" \
  --namespace pipeops-system \
  --create-namespace
```

**GCP Cluster:**
```bash
helm install pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="gcp-us-central1-prod" \
  --set agent.cluster.labels.provider="gcp" \
  --set agent.cluster.labels.region="us-central1" \
  --namespace pipeops-system \
  --create-namespace
```

**Azure Cluster:**
```bash
helm install pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="azure-eastus-prod" \
  --set agent.cluster.labels.provider="azure" \
  --set agent.cluster.labels.region="eastus" \
  --namespace pipeops-system \
  --create-namespace
```

### Centralized Configuration

Use a GitOps approach with separate values files:

```
├── clusters/
│   ├── aws-us-east-1/
│   │   └── values.yaml
│   ├── gcp-us-central1/
│   │   └── values.yaml
│   └── azure-eastus/
│       └── values.yaml
```

## Scenario 6: Air-Gapped Environment

Deploy in environments without direct internet access.

### Use Case

- Highly regulated industries
- Secure government environments
- Corporate networks with restricted internet
- On-premises data centers

### Prerequisites

1. Download required images on a machine with internet access:

```bash
# Agent image
docker pull ghcr.io/pipeopshq/pipeops-k8-agent:v1.2.3

# Monitoring images (if needed)
docker pull prom/prometheus:v2.45.0
docker pull grafana/grafana:10.0.0
docker pull grafana/loki:2.8.0
```

2. Push images to internal registry:

```bash
# Tag for your registry
docker tag ghcr.io/pipeopshq/pipeops-k8-agent:v1.2.3 \
  internal-registry.company.com/pipeops/agent:v1.2.3

# Push to internal registry
docker push internal-registry.company.com/pipeops/agent:v1.2.3
```

3. Download Helm chart:

```bash
helm pull pipeops/pipeops-agent --version 1.2.3
```

### Installation

```yaml
# air-gapped-values.yaml
agent:
  image:
    repository: internal-registry.company.com/pipeops/agent
    tag: "v1.2.3"
    pullPolicy: IfNotPresent
  
  pipeops:
    token: "your-token"
    # Use internal proxy if needed
    apiUrl: "https://api.pipeops.sh"
  
  # Configure proxy if needed
  proxy:
    http: "http://proxy.company.com:8080"
    https: "http://proxy.company.com:8080"
    no_proxy: "localhost,127.0.0.1,.company.com"

monitoring:
  prometheus:
    image:
      repository: internal-registry.company.com/prometheus
      tag: "v2.45.0"
  
  grafana:
    image:
      repository: internal-registry.company.com/grafana
      tag: "10.0.0"
```

## Choosing the Right Scenario

| Scenario | Best For | Installation Method | Monitoring | Complexity |
|----------|----------|---------------------|------------|------------|
| New Cluster | Fresh VMs, production | Intelligent installer | Full stack | Low |
| Existing Cluster | EKS/GKE/AKS integration | Helm (agent only) | External | Medium |
| Development | Local dev, testing | Minikube + minimal agent | Disabled | Low |
| Production | Mission-critical workloads | Helm with full config | Full + ingress | High |
| Multi-Cloud | Multiple providers | Helm per cluster | Per cluster | Medium |
| Air-Gapped | Restricted networks | Manual with local images | Custom | High |

## Next Steps

- **[Configuration Reference](/docs/kubernetes-agent/configuration)** — Detailed configuration options
- **[Monitoring & Observability](/docs/kubernetes-agent/monitoring)** — Set up monitoring
- **[Management & Operations](/docs/kubernetes-agent/management)** — Lifecycle management
- **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Common issues and solutions
