---
slug: agent-overview
sidebar_position: 1
title: Agent Overview
---

# PipeOps Kubernetes Agent Overview

The PipeOps Kubernetes Agent is a powerful background service that transforms any virtual machine into a production-ready Kubernetes server, seamlessly integrated with the PipeOps platform for effortless project deployment and management.

## What is the PipeOps Kubernetes Agent?

The PipeOps Kubernetes Agent is a **background service** (not a CLI tool) that acts as a bridge between your infrastructure and the PipeOps platform. It automates the entire process of setting up, configuring, and managing Kubernetes clusters, allowing you to focus on deploying and scaling your applications rather than managing infrastructure.

### Key Capabilities

- **VM to Server Transformation** — Converts any virtual machine into a Kubernetes-ready deployment server automatically
- **PipeOps Integration** — Seamlessly connects your infrastructure to the PipeOps platform for unified project deployment  
- **Automated Setup** — Handles Kubernetes installation, configuration, and management without manual intervention
- **Project Deployment** — Enables easy deployment of applications and services through the PipeOps platform
- **Infrastructure Management** — Manages server resources, networking, and scaling automatically
- **Intelligent Cluster Detection** — Automatically selects the optimal Kubernetes distribution (k3s, minikube, k3d, kind)
- **Comprehensive Monitoring** — Includes integrated Prometheus, Grafana, Loki, and OpenCost for complete observability
- **Secure Tunneling** — Establishes encrypted connections between clusters and the PipeOps control plane

## How It Works

The agent operates as a lightweight, always-running service on your infrastructure:

1. **Installation**: Deploy the agent using one of several supported methods (intelligent installer, Helm, manifests, or binary)
2. **Authentication**: Agent authenticates with PipeOps platform using your API token
3. **Cluster Setup**: Automatically detects or installs the appropriate Kubernetes distribution for your environment
4. **Monitoring Integration**: Optionally deploys a full monitoring stack (Prometheus, Grafana, Loki, OpenCost)
5. **Secure Communication**: Establishes encrypted WebSocket tunnels for bidirectional communication with PipeOps
6. **Project Deployment**: Ready to receive and deploy projects from the PipeOps platform

## Architecture

The agent is built on a modern, cloud-native architecture:

### Core Components

- **Agent Service** — Main background service managing all cluster communication and operations
- **Tunnel Manager** — Handles secure tunneling for cluster access, monitoring, and control
- **Monitoring Stack** — Optional Prometheus, Grafana, and Loki integration for observability
- **Control Plane Client** — Manages communication with the PipeOps platform
- **Resource Manager** — Handles Kubernetes resource management, scheduling, and scaling

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

## Use Cases

### New Cluster Deployment
Perfect for setting up new Kubernetes infrastructure from scratch. The agent handles everything from selecting the right Kubernetes distribution to deploying monitoring tools.

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

- **Documentation**: [https://docs.pipeops.io](https://docs.pipeops.io)
- **GitHub Issues**: [https://github.com/PipeOpsHQ/pipeops-k8-agent/issues](https://github.com/PipeOpsHQ/pipeops-k8-agent/issues)
- **Community Forum**: [https://community.pipeops.io](https://community.pipeops.io)
- **Email Support**: support@pipeops.io
