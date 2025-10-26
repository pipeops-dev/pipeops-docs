---
sidebar_position: 6
title: Agent Commands
---

# Agent Commands

The `pipeops agent` commands install and manage PipeOps agents on your infrastructure. Agents enable you to run workloads on your own servers while leveraging PipeOps orchestration capabilities.

## Overview

PipeOps agents provide:
- **Self-hosted infrastructure**: Run on your own servers
- **Kubernetes cluster management**: Automated cluster setup
- **Secure communication**: Encrypted agent-to-platform communication
- **Multi-node support**: Join worker nodes to clusters
- **Cross-platform**: Linux, Windows, FreeBSD support

---

## `pipeops agent install`

Install the PipeOps agent and set up a Kubernetes cluster on your server.

### Usage

```bash
pipeops agent install [flags]
```

### Description

Installs the PipeOps agent on the current machine and initializes a Kubernetes cluster. This command transforms your server into a PipeOps-managed infrastructure node.

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--cluster-name` | string | Name for the cluster (default: auto-generated) |
| `--server-id` | string | PipeOps server ID to associate with |
| `--token` | string | Agent registration token |
| `--advertise-address` | string | IP address to advertise (default: auto-detect) |
| `--node-labels` | string | Comma-separated node labels (key=value) |
| `--skip-kubernetes` | boolean | Install agent only, skip Kubernetes setup |

### Prerequisites

- Root or sudo access
- Supported OS: Linux, FreeBSD
- Minimum 2GB RAM, 2 CPU cores
- 20GB disk space
- Open ports: 6443 (API), 10250 (kubelet)

### Examples

**Basic installation**:
```bash
sudo pipeops agent install
```

**Install with custom cluster name**:
```bash
sudo pipeops agent install --cluster-name production-cluster
```

**Install with server association**:
```bash
sudo pipeops agent install \
  --server-id srv_1234567890 \
  --token "agent-token-here"
```

**Install with custom advertise address**:
```bash
sudo pipeops agent install \
  --advertise-address 192.168.1.100 \
  --cluster-name my-cluster
```

**Install with node labels**:
```bash
sudo pipeops agent install \
  --node-labels "environment=production,region=us-east"
```

**Install agent only (no Kubernetes)**:
```bash
sudo pipeops agent install --skip-kubernetes
```

### What Gets Installed

The installation process:

1. **System checks**: Validates prerequisites
2. **Agent binary**: Installs PipeOps agent service
3. **Kubernetes cluster**: Sets up control plane (unless `--skip-kubernetes`)
4. **Container runtime**: Installs containerd if needed
5. **Network plugin**: Configures CNI networking
6. **Agent registration**: Registers with PipeOps platform
7. **Health checks**: Verifies installation

### Installation Output

```bash
$ sudo pipeops agent install --cluster-name my-cluster

[1/7] Checking system requirements...
✓ Operating system: Linux
✓ Architecture: x86_64
✓ Memory: 4GB (minimum 2GB)
✓ Disk space: 50GB (minimum 20GB)

[2/7] Installing dependencies...
✓ Installing containerd
✓ Installing CNI plugins

[3/7] Installing PipeOps agent...
✓ Downloaded agent binary
✓ Created systemd service
✓ Agent version: 1.0.0

[4/7] Initializing Kubernetes cluster...
✓ Generating certificates
✓ Starting control plane
✓ Configuring network plugin

[5/7] Registering with PipeOps platform...
✓ Agent registered successfully
✓ Server ID: srv_1234567890

[6/7] Running post-installation checks...
✓ Agent service: running
✓ Kubernetes API: healthy
✓ Node status: ready

[7/7] Installation complete!

Cluster Information:
  Name: my-cluster
  Node: ip-192-168-1-100
  Status: Ready
  Kubernetes Version: v1.28.0
  
Join token for worker nodes:
  pipeops agent join --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Next steps:
  - View cluster info: pipeops agent info
  - Join worker nodes: pipeops agent join --token <token>
  - Deploy workloads from PipeOps console
```

### Platform Support

#### Linux
- Ubuntu 20.04, 22.04, 24.04
- Debian 11, 12
- CentOS 8, 9
- RHEL 8, 9
- Amazon Linux 2, 2023
- Rocky Linux 8, 9

#### FreeBSD
- FreeBSD 12.x, 13.x, 14.x

### Troubleshooting Installation

**Insufficient permissions**:
```bash
# Run with sudo
sudo pipeops agent install
```

**Port already in use**:
```bash
# Check what's using port 6443
sudo lsof -i :6443

# Stop conflicting service or use different port
```

**Network issues**:
```bash
# Check connectivity to PipeOps platform
curl -v https://api.pipeops.io/health

# Verify DNS resolution
nslookup api.pipeops.io
```

---

## `pipeops agent join`

Join a worker node to an existing PipeOps Kubernetes cluster.

### Usage

```bash
pipeops agent join [flags]
```

### Description

Joins the current machine as a worker node to an existing Kubernetes cluster managed by PipeOps. Use this to add capacity to your cluster.

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--token` | string | Join token from control plane (required) |
| `--server` | string | Control plane server address |
| `--node-labels` | string | Comma-separated node labels |
| `--kubelet-extra-args` | string | Additional kubelet arguments |

### Prerequisites

- Root or sudo access
- Same requirements as `agent install`
- Network connectivity to control plane
- Join token from control plane node

### Examples

**Join worker node**:
```bash
sudo pipeops agent join --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Join with explicit server address**:
```bash
sudo pipeops agent join \
  --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... \
  --server https://192.168.1.100:6443
```

**Join with node labels**:
```bash
sudo pipeops agent join \
  --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... \
  --node-labels "role=worker,zone=us-east-1a"
```

### Join Process

```bash
$ sudo pipeops agent join --token eyJ...

[1/5] Validating join token...
✓ Token is valid
✓ Control plane: https://192.168.1.100:6443

[2/5] Installing dependencies...
✓ Installing containerd
✓ Installing CNI plugins

[3/5] Configuring kubelet...
✓ Downloaded cluster CA certificate
✓ Generated kubelet config

[4/5] Joining cluster...
✓ Connected to control plane
✓ Node registered

[5/5] Post-join verification...
✓ Node status: Ready
✓ Agent service: running

Successfully joined cluster!

Node Information:
  Name: worker-01
  Status: Ready
  Role: worker
  Labels: role=worker
```

### Getting Join Token

The join token is displayed when you run `pipeops agent install` on the control plane. If you need to retrieve it again:

1. **From control plane node**:
   ```bash
   sudo pipeops agent info --show-join-token
   ```

2. **From PipeOps console**:
   Navigate to Servers > [Your Server] > Agent > Join Token

### Troubleshooting Join

**Invalid token**:
```
Error: invalid join token

# Get a new token from control plane
sudo pipeops agent info --show-join-token
```

**Cannot reach control plane**:
```
Error: failed to connect to control plane

# Verify network connectivity
ping <control-plane-ip>
telnet <control-plane-ip> 6443
```

**Node not ready**:
```bash
# Check node status
kubectl get nodes

# View node events
kubectl describe node <node-name>

# Check kubelet logs
journalctl -u kubelet -f
```

---

## `pipeops agent info`

Display information about the PipeOps agent and cluster.

### Usage

```bash
pipeops agent info [flags]
```

### Description

Shows detailed information about the installed agent, Kubernetes cluster, and node status.

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--show-join-token` | boolean | Display join token for adding workers |
| `--show-config` | boolean | Display agent configuration |

### Examples

**View cluster info**:
```bash
pipeops agent info
```

Output:
```
Agent Information:
  Version: 1.0.0
  Status: Running
  Uptime: 5 days, 3 hours
  Server ID: srv_1234567890

Cluster Information:
  Name: production-cluster
  Type: Control Plane
  Kubernetes Version: v1.28.0
  API Server: https://192.168.1.100:6443

Node Information:
  Name: control-plane-01
  Status: Ready
  Role: control-plane
  CPU: 4 cores
  Memory: 8GB
  Pods: 15/110
  
Network:
  Pod CIDR: 10.244.0.0/16
  Service CIDR: 10.96.0.0/12
  CNI Plugin: flannel
```

**Get join token**:
```bash
pipeops agent info --show-join-token
```

Output:
```
Join token for worker nodes:
  pipeops agent join --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

This token is valid for 24 hours.
```

**View configuration**:
```bash
pipeops agent info --show-config
```

**JSON output**:
```bash
pipeops agent info --json
```

```json
{
  "agent": {
    "version": "1.0.0",
    "status": "running",
    "uptime_seconds": 432000
  },
  "cluster": {
    "name": "production-cluster",
    "type": "control-plane",
    "kubernetes_version": "v1.28.0",
    "api_server": "https://192.168.1.100:6443"
  },
  "node": {
    "name": "control-plane-01",
    "status": "Ready",
    "roles": ["control-plane"],
    "cpu_cores": 4,
    "memory_gb": 8,
    "pods": 15,
    "max_pods": 110
  }
}
```

---

## Common Agent Workflows

### Setting Up a Multi-Node Cluster

**1. Install control plane**:
```bash
# On first node
sudo pipeops agent install --cluster-name production

# Save the join token from output
```

**2. Join worker nodes**:
```bash
# On additional nodes
sudo pipeops agent join --token <join-token>
```

**3. Verify cluster**:
```bash
# On control plane
pipeops agent info
kubectl get nodes
```

### Managing Agent Service

**Check agent status**:
```bash
sudo systemctl status pipeops-agent
```

**Restart agent**:
```bash
sudo systemctl restart pipeops-agent
```

**View agent logs**:
```bash
sudo journalctl -u pipeops-agent -f
```

**Stop agent**:
```bash
sudo systemctl stop pipeops-agent
```

### Upgrading Agent

**Check current version**:
```bash
pipeops agent info | grep Version
```

**Upgrade to latest**:
```bash
sudo pipeops agent upgrade
```

**Upgrade to specific version**:
```bash
sudo pipeops agent upgrade --version 1.2.0
```

### Removing Agent

**Uninstall agent and cluster**:
```bash
sudo pipeops agent uninstall
```

This will:
- Stop agent service
- Remove Kubernetes cluster
- Clean up resources
- Unregister from platform

**Uninstall with data cleanup**:
```bash
sudo pipeops agent uninstall --purge
```

---

## Security Considerations

### Agent Authentication

- Agents use mutual TLS for platform communication
- Join tokens expire after 24 hours
- Tokens are single-use (join once)
- All communication is encrypted

### Network Security

**Required ports**:
- 6443: Kubernetes API server
- 10250: Kubelet API
- 10251: kube-scheduler (localhost only)
- 10252: kube-controller-manager (localhost only)
- 2379-2380: etcd (control plane only)

**Firewall rules**:
```bash
# Control plane
sudo ufw allow 6443/tcp
sudo ufw allow 10250/tcp
sudo ufw allow 2379:2380/tcp

# Worker nodes
sudo ufw allow 10250/tcp
```

### Best Practices

1. **Use dedicated infrastructure**: Don't install agent on shared machines
2. **Keep agent updated**: Regular upgrades for security patches
3. **Monitor agent health**: Set up alerts for agent failures
4. **Secure join tokens**: Don't commit tokens to version control
5. **Use node labels**: Organize workload placement
6. **Regular backups**: Backup etcd on control plane

---

## Troubleshooting

### Agent Won't Start

**Check logs**:
```bash
sudo journalctl -u pipeops-agent -n 50
```

**Verify configuration**:
```bash
pipeops agent info --show-config
```

**Check permissions**:
```bash
ls -l /etc/pipeops-agent/
```

### Cluster Issues

**Node not ready**:
```bash
kubectl get nodes
kubectl describe node <node-name>
```

**Pod networking issues**:
```bash
kubectl get pods -n kube-system
kubectl logs <cni-pod> -n kube-system
```

**API server unreachable**:
```bash
# Check if API server is running
sudo systemctl status kube-apiserver

# Check API server logs
sudo journalctl -u kube-apiserver
```

---

## Related Documentation

- **[Server Management](/docs/servers/server-overview)**: Managing servers via web UI
- **[Server Provisioning](/docs/servers/server-provisioning)**: Provisioning PipeOps servers
- **[Quick Start](/docs/cli/getting-started/quick-start)**: CLI getting started guide
- **[Troubleshooting](/docs/cli/reference/troubleshooting)**: General troubleshooting

---

## See Also

- [PipeOps Servers](/docs/category/servers)
- [Infrastructure Management](/docs/servers/server-nodes)
- [Environment Management](/docs/servers/server-environments)
