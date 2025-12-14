---
slug: agent-overview
sidebar_position: 1
title: Agent Overview
---

# PipeOps Kubernetes Agent Overview

The PipeOps Kubernetes Agent is a lightweight Kubernetes service that enables secure management and gateway proxy access for your Kubernetes clusters, supporting both private and public clusters with automatic detection and optimized routing.

:::info Agent Documentation
For detailed technical documentation, architecture details, and API specifications, visit the official **[PipeOps Agent Documentation](https://agents.pipeops.io/)**.
:::

## What is the PipeOps Kubernetes Agent?

The PipeOps Kubernetes Agent is a **background service** deployed as a pod inside your Kubernetes cluster. It establishes an outbound connection to the PipeOps control plane and provides:

1. **Secure Cluster Access** — WebSocket tunnel for secure API access without inbound firewall rules
2. **Gateway Proxy** — Automatic ingress route management for private clusters without public LoadBalancer IPs (enabled by default)
3. **Real-time Monitoring** — Integrated Prometheus, Loki, Grafana stack
4. **Cluster Management** — Heartbeat, health checks, and real-time status reporting

### Key Capabilities

- **Cloud-Native Design** — Runs as a pod inside your Kubernetes cluster
- **In-Cluster Access** — Uses Kubernetes REST API directly (no kubectl dependencies)
- **ServiceAccount Authentication** — Native Kubernetes authentication via mounted tokens
- **Outbound-Only Connections** — No inbound ports required on your infrastructure
- **WebSocket Tunneling** — Encrypted bidirectional communication for cluster API access
- **Gateway Proxy** — Automatic ingress route discovery and registration (enabled by default)
- **Dual Routing Modes** — Direct routing for public clusters, tunnel for private clusters
- **Intelligent Cluster Detection** — Automatically selects the optimal Kubernetes distribution (k3s, minikube, k3d, kind)
- **Comprehensive Monitoring** — Optional Prometheus, Grafana, and Loki integration
- **Secure by Default** — All connections encrypted with TLS

## How It Works

The agent operates as a lightweight pod inside your Kubernetes cluster:

1. **Installation**: Deploy using the intelligent bash installer, Helm chart, or Kubernetes manifests
2. **WebSocket Registration**: Agent connects to PipeOps control plane via WebSocket (wss://api.pipeops.io)
3. **Gateway Connection**: Receives gateway WebSocket URL and reconnects for heartbeat/proxy operations
4. **Cluster Detection**: Automatically detects if cluster is public (LoadBalancer) or private
5. **Route Management**: Monitors ingresses and registers routes with gateway (if enabled)
6. **Secure Access**: Control plane can access cluster API through encrypted WebSocket tunnel
7. **Real-time Updates**: Continuous heartbeat every 5-30 seconds with cluster metrics

### Component Auto-Installation

The agent's behavior differs based on installation method:

**Fresh Installation (Bash Script):**
- Automatically installs: Metrics Server, VPA, Prometheus, Loki, Grafana, NGINX Ingress Controller
- Full monitoring and observability stack out-of-the-box

**Existing Cluster (Helm/Kubernetes Manifests):**
- Only establishes secure tunnel and cluster management
- Does NOT auto-install components by default
- Assumes existing monitoring infrastructure
- Enable auto-install via: `--set agent.autoInstallComponents=true`

## Architecture

The agent is built on a modern, cloud-native architecture:

### Core Components

- **WebSocket Client** — Maintains persistent connection to PipeOps control plane and gateway
- **Gateway Watcher** — Monitors ingress resources and registers routes (enabled by default)
- **Tunnel Manager** — Handles WebSocket tunneling for secure cluster API access
- **Heartbeat Service** — Reports cluster status and metrics every 5-30 seconds
- **HTTP Server** — Exposes health checks, metrics, and dashboard endpoints
- **Monitoring Stack** — Optional Prometheus, Grafana, and Loki (auto-installed with bash script)

### Technology Stack

- **Go-based Service** — High-performance, low-resource footprint agent written in Go
- **WebSocket Communication** — Real-time bidirectional communication with PipeOps platform
- **Kubernetes Native** — Native Kubernetes API integration with full RBAC support
- **Container Runtime** — Works with containerd, Docker, and other OCI-compliant runtimes

## Supported Environments

The agent is designed to work across diverse environments:

### Kubernetes Distributions
- k3s (lightweight Kubernetes)
- minikube (local development)
- k3d (k3s in Docker)
- kind (Kubernetes in Docker)
- Existing Kubernetes clusters (any CNCF-certified distribution)

### Operating Systems
- Linux (Ubuntu, CentOS, RHEL, Debian)
- macOS (for development)
- Windows with WSL2

### Architectures
- amd64 (x86_64)
- arm64 (aarch64)

### Cloud Providers
- AWS (EC2, EKS)
- Google Cloud Platform (GCE, GKE)
- Microsoft Azure (VMs, AKS)
- DigitalOcean
- On-premises infrastructure
- Bare metal servers

### Special Environments
- Docker containers
- LXC/LXD containers
- WSL2 on Windows

## Gateway Proxy (Enabled by Default)

The PipeOps Gateway Proxy provides external access to applications in your Kubernetes clusters and is **enabled by default** with automatic routing optimization.

### Key Features

- **Automatic Cluster Detection** — Identifies if cluster is public (with LoadBalancer) or private
- **Dual Routing Modes**:
  - **Direct Mode** — Public clusters with LoadBalancer (3-5x faster, no tunnel overhead)
  - **Tunnel Mode** — Private clusters without public IPs (secure WebSocket tunnel)
- **Selective Ingress Sync** — Only monitors ingresses managed by PipeOps
- **Custom Domain Support** — Full support for custom domain mapping
- **TLS Termination** — Secure HTTPS access at gateway level
- **Automatic Re-sync** — Routes refreshed every 4 hours to prevent expiry

### How It Works

1. Agent detects cluster type on startup (checks for LoadBalancer external IP)
2. Chooses routing mode automatically (direct or tunnel)
3. Monitors ingress resources across all namespaces
4. Registers routes with PipeOps gateway via REST API
5. Gateway proxy routes traffic based on cluster type

To disable gateway proxy (not recommended):
```bash
export ENABLE_INGRESS_SYNC=false
```

## Use Cases

### New Cluster Deployment
Perfect for setting up new Kubernetes infrastructure from scratch. The intelligent bash installer handles everything from selecting the right Kubernetes distribution to deploying monitoring tools.

### Existing Cluster Integration
Easily integrate existing Kubernetes clusters with PipeOps. The agent deploys alongside your workloads with minimal resource overhead.

### Development Environments
Optimize local development with minikube or k3d. Get a production-like environment on your laptop with reduced resource requirements.

### Production Environments
Deploy with full monitoring, high availability options, security hardening, and resource limits for mission-critical workloads.

### Multi-Cloud Deployments
Manage clusters across different cloud providers from a single PipeOps interface.

## Security

Security is built into every layer of the agent:

- **RBAC Integration** — Full Kubernetes role-based access control support
- **TLS Encryption** — All communications encrypted in transit using industry-standard TLS
- **Token Authentication** — Secure API token-based authentication with the PipeOps platform
- **Network Policies** — Optional Kubernetes network policy enforcement
- **Security Contexts** — Non-root container execution with minimal required privileges
- **Regular Updates** — Automated security patches and updates

## Resource Requirements

The agent is designed to be lightweight and efficient:

### Minimum Requirements
- **CPU**: 100m (0.1 cores)
- **Memory**: 128Mi
- **Disk**: 500Mi for agent and configuration

### Recommended for Production
- **CPU**: 250m (0.25 cores)
- **Memory**: 256Mi
- **Disk**: 1Gi with persistent volume

### With Full Monitoring Stack
- **CPU**: 500m (0.5 cores)
- **Memory**: 512Mi
- **Disk**: 2Gi with persistent volume

## Next Steps

Ready to get started? Here's what to do next:

1. **[Installation Guide](/docs/kubernetes-agent/installation)** — Learn how to install the agent in your environment
2. **[Configuration Reference](/docs/kubernetes-agent/configuration)** — Explore all configuration options
3. **[Deployment Scenarios](/docs/kubernetes-agent/deployment-scenarios)** — Find the best deployment approach for your use case
4. **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Common issues and solutions

## Support

Need help? We're here for you:

- **Agent Documentation**: [https://agents.pipeops.io](https://agents.pipeops.io) - Complete technical documentation and API reference
- **Platform Documentation**: [https://docs.pipeops.io](https://docs.pipeops.io)
- **GitHub Repository**: [https://github.com/PipeOpsHQ/pipeops-k8-agent](https://github.com/PipeOpsHQ/pipeops-k8-agent)
- **GitHub Issues**: [https://github.com/PipeOpsHQ/pipeops-k8-agent/issues](https://github.com/PipeOpsHQ/pipeops-k8-agent/issues)
- **Community Forum**: [https://community.pipeops.io](https://community.pipeops.io)
- **Email Support**: support@pipeops.io
