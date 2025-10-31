---
slug: installation
sidebar_position: 2
title: Installation Guide
---

# Installation Guide

This guide walks you through installing the PipeOps Kubernetes Agent using various methods. Choose the installation method that best fits your environment and requirements.

## Prerequisites

Before installing the agent, ensure your system meets these requirements:

### System Requirements

- **CPU**: Minimum 2 cores (recommended for cluster creation)
- **Memory**: Minimum 2GB RAM
- **Disk Space**: At least 20GB available
- **Operating System**: Linux (Ubuntu 18.04+, CentOS 7+, RHEL 7+), macOS 10.14+, or Windows with WSL2

### Software Dependencies

- `curl` or `wget` for downloading the installer
- `bash` shell (version 4.0+)
- `sudo` privileges for system-level operations
- Internet connectivity for downloading components

### Network Requirements

- Outbound HTTPS (443) access to:
  - `api.pipeops.sh` (PipeOps API)
  - `get.pipeops.dev` (installer scripts)
  - `ghcr.io` (container images and Helm charts)
- Ports for monitoring stack (if enabled):
  - 9090 (Prometheus)
  - 3000 (Grafana)
  - 3100 (Loki)

### Authentication

You'll need:
- A PipeOps account ([Sign up here](https://pipeops.io))
- Your PipeOps API token (obtain from your account settings)

## Quick Start Installation (Recommended)

The intelligent installer is the easiest way to get started. It automatically detects your environment and installs the appropriate components.

### One-Line Installation

```bash
curl -fsSL https://get.pipeops.dev/k8-install.sh | bash
```

This command will:
1. Analyze your system resources (CPU, memory, disk)
2. Detect your environment (Docker, LXC, WSL, macOS, bare metal)
3. Automatically select the optimal Kubernetes distribution (k3s, minikube, k3d, kind)
4. Install the cluster and all required components
5. Deploy the PipeOps agent as a pod in your cluster
6. Install the monitoring stack (Prometheus, Loki, Grafana, OpenCost)

### Interactive Setup

The installer will prompt you for:

```bash
Enter your PipeOps API token: ********
Enter cluster name (optional, default: auto-generated): my-cluster
Enable monitoring stack? (y/n, default: y): y
```

### Non-Interactive Installation

For automation or CI/CD pipelines, use environment variables:

```bash
export PIPEOPS_TOKEN="your-pipeops-api-token"
export CLUSTER_NAME="production-cluster"
export CLUSTER_TYPE="auto"  # Options: auto, k3s, minikube, k3d, kind

curl -fsSL https://get.pipeops.dev/k8-install.sh | bash
```

The installer automatically detects the best Kubernetes distribution when `CLUSTER_TYPE=auto` (default) based on:
- Available system resources
- Environment type (Docker, LXC, WSL, macOS, bare metal)
- Operating system capabilities

## Helm Installation (Kubernetes Clusters)

If you already have a Kubernetes cluster, Helm provides the most flexible installation method. The PipeOps agent chart is available as an OCI artifact in GitHub Container Registry.

### Minimal Installation

Install with just the required configuration:

```bash
helm install pipeops-agent oci://ghcr.io/pipeopshq/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="your-cluster-name" \
  --namespace pipeops-system \
  --create-namespace
```

### Installation with Monitoring Stack

Enable the full monitoring stack (Prometheus, Grafana, Loki, OpenCost):

```bash
helm install pipeops-agent oci://ghcr.io/pipeopshq/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="production-cluster" \
  --set monitoring.enabled=true \
  --set monitoring.prometheus.enabled=true \
  --set monitoring.grafana.enabled=true \
  --set monitoring.loki.enabled=true \
  --namespace pipeops-system \
  --create-namespace
```

### Installation with Custom Values

Create a `values.yaml` file for advanced configuration:

```yaml
# values.yaml
agent:
  cluster:
    name: "production-cluster"
  pipeops:
    token: "your-api-token"
    apiUrl: "https://api.pipeops.sh"
  resources:
    limits:
      cpu: "500m"
      memory: "512Mi"
    requests:
      cpu: "250m"
      memory: "256Mi"

monitoring:
  enabled: true
  prometheus:
    enabled: true
    persistence:
      enabled: true
      size: 10Gi
  grafana:
    enabled: true
    persistence:
      enabled: true
      size: 5Gi
  loki:
    enabled: true
    persistence:
      enabled: true
      size: 10Gi
```

Install with your custom values:

```bash
helm install pipeops-agent oci://ghcr.io/pipeopshq/pipeops-agent \
  -f values.yaml \
  --namespace pipeops-system \
  --create-namespace
```

## Kubernetes Manifest Installation

For manual deployment without Helm, you can extract manifests from the Helm chart or use kubectl directly with the OCI registry.

### Extract Manifests from Helm Chart

```bash
# Pull the chart and extract manifests
helm template pipeops-agent oci://ghcr.io/pipeopshq/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set agent.cluster.name="your-cluster-name" \
  --namespace pipeops-system > pipeops-agent.yaml
```

### Configure the Manifest

Edit the manifest to add your API token:

```bash
# Create a secret with your API token
kubectl create secret generic pipeops-agent-config \
  --from-literal=token=your-api-token \
  --from-literal=cluster-name=your-cluster-name \
  --namespace pipeops-system \
  --dry-run=client -o yaml > secret.yaml

# Apply the secret
kubectl apply -f secret.yaml
```

### Deploy the Agent

```bash
kubectl apply -f pipeops-agent.yaml
```

## Docker Container Installation

Run the agent as a standalone Docker container (requires existing Kubernetes cluster).

### Basic Docker Run

```bash
docker run -d \
  --name pipeops-agent \
  --restart always \
  -e PIPEOPS_TOKEN="your-api-token" \
  -e CLUSTER_NAME="docker-cluster" \
  -e KUBERNETES_SERVICE_HOST="your-k8s-api-host" \
  -e KUBERNETES_SERVICE_PORT="6443" \
  -v $HOME/.kube/config:/config/.kube/config:ro \
  ghcr.io/pipeopshq/pipeops-k8-agent:latest
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  pipeops-agent:
    image: ghcr.io/pipeopshq/pipeops-k8-agent:latest
    container_name: pipeops-agent
    restart: always
    environment:
      - PIPEOPS_TOKEN=your-api-token
      - CLUSTER_NAME=docker-cluster
      - PIPEOPS_API_URL=https://api.pipeops.sh
      - KUBERNETES_IN_CLUSTER=false
    volumes:
      - $HOME/.kube/config:/config/.kube/config:ro
      - ./agent-config.yaml:/config/config.yaml:ro
    networks:
      - pipeops-network

networks:
  pipeops-network:
    driver: bridge
```

Start the agent:

```bash
docker-compose up -d
```

## Binary Installation

Install the agent binary directly on your system.

### Download the Binary

For Linux (amd64):
```bash
curl -LO https://github.com/PipeOpsHQ/pipeops-k8-agent/releases/latest/download/pipeops-agent-linux-amd64
chmod +x pipeops-agent-linux-amd64
sudo mv pipeops-agent-linux-amd64 /usr/local/bin/pipeops-agent
```

For Linux (arm64):
```bash
curl -LO https://github.com/PipeOpsHQ/pipeops-k8-agent/releases/latest/download/pipeops-agent-linux-arm64
chmod +x pipeops-agent-linux-arm64
sudo mv pipeops-agent-linux-arm64 /usr/local/bin/pipeops-agent
```

For macOS (amd64):
```bash
curl -LO https://github.com/PipeOpsHQ/pipeops-k8-agent/releases/latest/download/pipeops-agent-darwin-amd64
chmod +x pipeops-agent-darwin-amd64
sudo mv pipeops-agent-darwin-amd64 /usr/local/bin/pipeops-agent
```

For macOS (arm64/M1/M2):
```bash
curl -LO https://github.com/PipeOpsHQ/pipeops-k8-agent/releases/latest/download/pipeops-agent-darwin-arm64
chmod +x pipeops-agent-darwin-arm64
sudo mv pipeops-agent-darwin-arm64 /usr/local/bin/pipeops-agent
```

### Create Configuration File

```bash
sudo mkdir -p /etc/pipeops
sudo tee /etc/pipeops/config.yaml > /dev/null <<EOF
agent:
  cluster_name: "my-cluster"

pipeops:
  api_url: "https://api.pipeops.sh"
  token: "your-api-token"

kubernetes:
  in_cluster: false
  kubeconfig: "$HOME/.kube/config"

logging:
  level: "info"
  format: "json"
EOF
```

### Create systemd Service

For Linux systems with systemd:

```bash
sudo tee /etc/systemd/system/pipeops-agent.service > /dev/null <<EOF
[Unit]
Description=PipeOps Kubernetes Agent
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/pipeops-agent --config /etc/pipeops/config.yaml
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable pipeops-agent
sudo systemctl start pipeops-agent
```

## Verification

After installation, verify that the agent is running correctly.

### Check Agent Status

For Kubernetes deployments:
```bash
kubectl get pods -n pipeops-system
kubectl logs deployment/pipeops-agent -n pipeops-system
```

For systemd service:
```bash
sudo systemctl status pipeops-agent
sudo journalctl -u pipeops-agent -f
```

For Docker:
```bash
docker ps | grep pipeops-agent
docker logs pipeops-agent
```

### Verify Connection to PipeOps

Check the agent logs for successful connection:

```bash
# Kubernetes
kubectl logs -n pipeops-system deployment/pipeops-agent | grep "connected"

# Systemd
sudo journalctl -u pipeops-agent | grep "connected"

# Docker
docker logs pipeops-agent | grep "connected"
```

You should see messages indicating:
- Successful authentication with PipeOps API
- Tunnel established
- Agent registered with cluster name

### Check Monitoring Stack (if enabled)

```bash
kubectl get pods -n pipeops-monitoring

# Expected output:
# NAME                                    READY   STATUS    RESTARTS   AGE
# prometheus-server-xxxxx                 1/1     Running   0          5m
# grafana-xxxxx                          1/1     Running   0          5m
# loki-xxxxx                             1/1     Running   0          5m
```

### Access Monitoring Dashboards

Port-forward to access Grafana:

```bash
kubectl port-forward svc/grafana 3000:3000 -n pipeops-monitoring
```

Then open http://localhost:3000 in your browser.

Default credentials (change after first login):
- Username: admin
- Password: pipeops (or check your Helm values)

## Post-Installation

### Update Agent Configuration

To update agent configuration after installation:

**Kubernetes/Helm:**
```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="new-token" \
  --namespace pipeops-system \
  --reuse-values
```

**Binary/systemd:**
```bash
sudo nano /etc/pipeops/config.yaml
sudo systemctl restart pipeops-agent
```

### Enable/Disable Monitoring

To add monitoring to an existing agent installation:

```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set monitoring.enabled=true \
  --namespace pipeops-system \
  --reuse-values
```

## Troubleshooting Installation

### Agent Pod Not Starting

Check pod events and logs:
```bash
kubectl describe pod -n pipeops-system -l app=pipeops-agent
kubectl logs -n pipeops-system -l app=pipeops-agent
```

Common issues:
- Invalid API token (check secret configuration)
- Network connectivity issues (verify firewall rules)
- Insufficient resources (check node capacity)

### Connection to PipeOps API Fails

Verify network connectivity:
```bash
curl -v https://api.pipeops.sh/health
```

Check proxy settings if behind a corporate firewall.

### Kubernetes Cluster Not Created

For new installations, check the installer logs:
```bash
# The installer creates logs in /var/log/pipeops/
sudo cat /var/log/pipeops/install.log
```

Common issues:
- Insufficient system resources
- Port conflicts (6443, 10250, etc.)
- Docker/containerd not installed

## Next Steps

- **[Configuration Reference](/docs/kubernetes-agent/configuration)** — Explore all configuration options
- **[Deployment Scenarios](/docs/kubernetes-agent/deployment-scenarios)** — Learn about different deployment patterns
- **[Monitoring & Observability](/docs/kubernetes-agent/monitoring)** — Set up comprehensive monitoring
- **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Common issues and solutions
