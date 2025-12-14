---
slug: configuration
sidebar_position: 3
title: Configuration Reference
---

# Configuration Reference

This page provides a comprehensive reference for all PipeOps Kubernetes Agent configuration options. The agent can be configured using environment variables, a YAML configuration file, or Helm values.

:::tip Advanced Configuration
For advanced configuration scenarios and detailed examples, refer to the [PipeOps Agent Documentation](https://agents.pipeops.io/).
:::

## Environment Variables

Environment variables provide the simplest way to configure the agent, especially for containerized deployments.

### Core Settings

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PIPEOPS_TOKEN` | Your PipeOps API authentication token | Yes | - |
| `CLUSTER_NAME` | Name for your cluster in PipeOps | No | Auto-generated |
| `PIPEOPS_API_URL` | PipeOps API endpoint URL | No | `https://api.pipeops.sh` |
| `PIPEOPS_ENDPOINT` | Alias for PIPEOPS_API_URL | No | `https://api.pipeops.sh` |
| `NAMESPACE` | Kubernetes namespace for agent | No | `pipeops-system` |

### Cluster Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `CLUSTER_TYPE` | Kubernetes distribution to use | No | `auto` |
| `KUBERNETES_IN_CLUSTER` | Running inside Kubernetes cluster | No | `true` |
| `KUBECONFIG` | Path to kubeconfig file | No | `~/.kube/config` |
| `AUTO_INSTALL_COMPONENTS` | Auto-install monitoring/cluster components | No | `true` (bash), `false` (Helm) |

Valid `CLUSTER_TYPE` values: `auto`, `k3s`, `minikube`, `k3d`, `kind`, `existing`

### Gateway Proxy Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ENABLE_INGRESS_SYNC` | Enable gateway proxy ingress watching | No | `true` |
| `GATEWAY_PROXY_ENABLED` | Alias for ENABLE_INGRESS_SYNC | No | `true` |

:::info Gateway Proxy
Gateway proxy is **enabled by default** and automatically detects cluster type (public vs private) to optimize routing. Direct routing for public clusters (3-5x faster), tunnel routing for private clusters.
:::

### Monitoring Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DISABLE_MONITORING` | Disable monitoring stack installation | No | `false` |
| `PIPEOPS_MONITORING_ENABLED` | Enable monitoring stack | No | `true` |
| `PIPEOPS_PROMETHEUS_ENABLED` | Enable Prometheus | No | `true` |
| `PIPEOPS_GRAFANA_ENABLED` | Enable Grafana | No | `true` |
| `PIPEOPS_LOKI_ENABLED` | Enable Loki | No | `true` |
| `PIPEOPS_GRAFANA_SUB_PATH` | Enable Grafana sub-path routing | No | `true` |

### Resource Limits

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PIPEOPS_CPU_LIMIT` | CPU limit for agent | No | `500m` |
| `PIPEOPS_MEMORY_LIMIT` | Memory limit for agent | No | `512Mi` |
| `PIPEOPS_CPU_REQUEST` | CPU request for agent | No | `250m` |
| `PIPEOPS_MEMORY_REQUEST` | Memory request for agent | No | `256Mi` |

### Security Settings

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PIPEOPS_TLS_ENABLED` | Enable TLS for API communication | No | `true` |
| `PIPEOPS_TLS_INSECURE_SKIP_VERIFY` | Skip TLS certificate verification | No | `false` |
| `PIPEOPS_RBAC_ENABLED` | Enable Kubernetes RBAC | No | `true` |

### Logging Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `LOG_LEVEL` | Logging level | No | `info` |
| `LOG_FORMAT` | Log output format | No | `json` |
| `LOG_OUTPUT` | Log output destination | No | `stdout` |

Valid `LOG_LEVEL` values: `debug`, `info`, `warn`, `error`, `fatal`
Valid `LOG_FORMAT` values: `json`, `text`

### Tunnel Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TUNNEL_ENABLED` | Enable secure tunneling | No | `true` |
| `TUNNEL_INACTIVITY_TIMEOUT` | Tunnel inactivity timeout | No | `5m` |

### Connection Settings

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PIPEOPS_TIMEOUT` | API request timeout | No | `30s` |
| `PIPEOPS_RECONNECT_ENABLED` | Enable automatic reconnection | No | `true` |
| `PIPEOPS_RECONNECT_MAX_ATTEMPTS` | Max reconnection attempts | No | `10` |
| `PIPEOPS_RECONNECT_INTERVAL` | Reconnection interval | No | `5s` |
| `PIPEOPS_RECONNECT_BACKOFF` | Reconnection backoff duration | No | `5s` |

## YAML Configuration File

For more complex configurations, use a YAML file. The default location is `/etc/pipeops/config.yaml` or specified with `--config` flag.

### Complete Configuration Example

```yaml
# Complete agent configuration example
agent:
  # Unique agent identifier (auto-generated if not specified)
  id: ""
  
  # Agent name shown in PipeOps dashboard
  name: "pipeops-agent"
  
  # Cluster name for identification in PipeOps
  cluster_name: "production-cluster"
  
  # Enable Grafana sub-path routing for ingress
  grafana_sub_path: true
  
  # Enable gateway proxy for ingress route management (default: true)
  enable_ingress_sync: true
  
  # Auto-install monitoring/cluster components (bash: true, Helm: false)
  autoInstallComponents: false
  
  # Custom labels for the agent
  labels:
    environment: "production"
    region: "us-east-1"
    team: "platform"
    managed-by: "pipeops"

# PipeOps platform configuration
pipeops:
  # PipeOps API URL
  api_url: "https://api.pipeops.sh"
  
  # Your cluster authentication token
  token: "your-cluster-token-here"
  
  # API request timeout
  timeout: "30s"
  
  # Reconnection configuration
  reconnect:
    enabled: true
    max_attempts: 10
    interval: "5s"
    backoff: "5s"
  
  # TLS configuration
  tls:
    enabled: true
    insecure_skip_verify: false
    # Optional: custom CA certificate
    # ca_cert: /path/to/ca.crt
    # client_cert: /path/to/client.crt
    # client_key: /path/to/client.key

# Tunnel configuration for secure cluster access
tunnel:
  enabled: true
  inactivity_timeout: "5m"
  
  # Port forwards for cluster access
  forwards:
    - name: "kubernetes-api"
      local_addr: "localhost:6443"
      remote_port: 0  # Auto-assigned
      
    - name: "kubelet-metrics"
      local_addr: "localhost:10250"
      remote_port: 0
      
    - name: "agent-http"
      local_addr: "localhost:8080"
      remote_port: 0
      
    - name: "prometheus"
      local_addr: "localhost:9090"
      remote_port: 0
      
    - name: "grafana"
      local_addr: "localhost:3000"
      remote_port: 0

# Kubernetes cluster configuration
kubernetes:
  # Whether agent is running inside cluster
  in_cluster: true
  
  # Namespace for agent resources
  namespace: "pipeops-system"
  
  # Path to kubeconfig (if not in-cluster)
  kubeconfig: ""
  
  # Kubernetes API server URL (if not in-cluster)
  # master: "https://kubernetes.default.svc"

# Logging configuration
logging:
  # Log level: debug, info, warn, error, fatal
  level: "info"
  
  # Log format: json, text
  format: "json"
  
  # Log output: stdout, stderr, or file path
  output: "stdout"
  
  # Optional: log file path if output is a file
  # file: "/var/log/pipeops/agent.log"
  
  # Optional: enable structured logging
  structured: true

# Monitoring stack configuration
monitoring:
  enabled: true
  
  # Namespace for monitoring components
  namespace: "pipeops-monitoring"
  
  # Prometheus configuration
  prometheus:
    enabled: true
    port: 9090
    retention: "15d"
    storage_size: "10Gi"
    scrape_interval: "30s"
    
    # Resource limits
    resources:
      requests:
        cpu: "250m"
        memory: "512Mi"
      limits:
        cpu: "500m"
        memory: "1Gi"
  
  # Grafana configuration
  grafana:
    enabled: true
    port: 3000
    admin_password: "changeme"
    persistence:
      enabled: true
      size: "5Gi"
    
    # Resource limits
    resources:
      requests:
        cpu: "100m"
        memory: "128Mi"
      limits:
        cpu: "200m"
        memory: "256Mi"
  
  # Loki configuration
  loki:
    enabled: true
    port: 3100
    retention: "168h"  # 7 days
    storage_size: "10Gi"
    
    # Resource limits
    resources:
      requests:
        cpu: "100m"
        memory: "256Mi"
      limits:
        cpu: "200m"
        memory: "512Mi"
  
  # OpenCost configuration
  opencost:
    enabled: true
    port: 9003

# Agent resource limits
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"

# Security context for agent pod
security:
  # Run as non-root user
  run_as_non_root: true
  run_as_user: 1000
  run_as_group: 1000
  fs_group: 1000
  
  # Security capabilities
  capabilities:
    drop:
      - ALL
    add:
      - NET_BIND_SERVICE
  
  # Read-only root filesystem
  read_only_root_filesystem: true

# Health check configuration
health:
  # Health check endpoint port
  port: 8081
  
  # Liveness probe configuration
  liveness:
    initial_delay_seconds: 10
    period_seconds: 10
    timeout_seconds: 5
    failure_threshold: 3
  
  # Readiness probe configuration
  readiness:
    initial_delay_seconds: 5
    period_seconds: 5
    timeout_seconds: 3
    failure_threshold: 3

# Metrics configuration
metrics:
  enabled: true
  port: 9091
  path: "/metrics"
```

## Helm Values

When using Helm for installation, configure the agent using a `values.yaml` file.

### Basic Helm Values

```yaml
# values.yaml - Basic configuration
agent:
  cluster:
    name: "my-cluster"
  
  pipeops:
    token: "your-api-token"
    apiUrl: "https://api.pipeops.sh"
  
  image:
    repository: ghcr.io/pipeopshq/pipeops-k8-agent
    tag: "latest"
    pullPolicy: IfNotPresent
  
  resources:
    requests:
      cpu: "250m"
      memory: "256Mi"
    limits:
      cpu: "500m"
      memory: "512Mi"

monitoring:
  enabled: true
  namespace: "pipeops-monitoring"
```

### Production Helm Values

```yaml
# values.yaml - Production configuration
agent:
  cluster:
    name: "production-cluster"
    labels:
      environment: production
      region: us-east-1
  
  pipeops:
    token: "your-api-token"
    apiUrl: "https://api.pipeops.sh"
    timeout: "30s"
    reconnect:
      enabled: true
      maxAttempts: 10
      interval: "5s"
  
  image:
    repository: ghcr.io/pipeopshq/pipeops-k8-agent
    tag: "v1.2.3"  # Use specific version in production
    pullPolicy: IfNotPresent
  
  resources:
    requests:
      cpu: "500m"
      memory: "512Mi"
    limits:
      cpu: "1000m"
      memory: "1Gi"
  
  # Pod security context
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
    capabilities:
      drop:
        - ALL
  
  # High availability
  replicas: 1  # Agent doesn't support HA yet
  
  # Pod disruption budget
  podDisruptionBudget:
    enabled: true
    minAvailable: 1

# Monitoring stack configuration
monitoring:
  enabled: true
  namespace: "pipeops-monitoring"
  
  prometheus:
    enabled: true
    retention: "30d"
    persistence:
      enabled: true
      storageClass: "standard"
      size: "50Gi"
    resources:
      requests:
        cpu: "500m"
        memory: "1Gi"
      limits:
        cpu: "1000m"
        memory: "2Gi"
    alerting:
      enabled: true
  
  grafana:
    enabled: true
    adminPassword: "secure-password-here"
    persistence:
      enabled: true
      storageClass: "standard"
      size: "10Gi"
    ingress:
      enabled: true
      className: "nginx"
      hosts:
        - host: grafana.example.com
          paths:
            - path: /
              pathType: Prefix
      tls:
        - secretName: grafana-tls
          hosts:
            - grafana.example.com
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
      storageClass: "standard"
      size: "100Gi"
    resources:
      requests:
        cpu: "200m"
        memory: "512Mi"
      limits:
        cpu: "500m"
        memory: "1Gi"
  
  opencost:
    enabled: true
    resources:
      requests:
        cpu: "100m"
        memory: "128Mi"
      limits:
        cpu: "200m"
        memory: "256Mi"

# Network policy
networkPolicy:
  enabled: true
  policyTypes:
    - Ingress
    - Egress

# Service account
serviceAccount:
  create: true
  annotations: {}
  name: "pipeops-agent"

# RBAC
rbac:
  create: true

# Node selector
nodeSelector: {}

# Tolerations
tolerations: []

# Affinity rules
affinity: {}
```

## Configuration Validation

### Validate YAML Configuration

Use the agent's built-in validation:

```bash
pipeops-agent validate --config /etc/pipeops/config.yaml
```

### Validate Helm Values

```bash
helm lint pipeops/pipeops-agent -f values.yaml
```

### Test Configuration

Dry-run installation to test configuration:

```bash
helm install pipeops-agent pipeops/pipeops-agent \
  -f values.yaml \
  --dry-run --debug
```

## Configuration Best Practices

### Security

1. **Never commit tokens to version control**
   - Use Kubernetes secrets or external secret management
   - Rotate tokens regularly

2. **Use TLS for all connections**
   ```yaml
   pipeops:
     tls:
       enabled: true
       insecure_skip_verify: false
   ```

3. **Enable RBAC**
   ```yaml
   rbac:
     create: true
   ```

4. **Run as non-root**
   ```yaml
   security:
     run_as_non_root: true
     run_as_user: 1000
   ```

### Resource Management

1. **Set appropriate resource limits**
   ```yaml
   resources:
     requests:
       cpu: "250m"
       memory: "256Mi"
     limits:
       cpu: "500m"
       memory: "512Mi"
   ```

2. **Enable monitoring to track resource usage**
   ```yaml
   monitoring:
     enabled: true
   ```

3. **Use persistent storage for monitoring data**
   ```yaml
   monitoring:
     prometheus:
       persistence:
         enabled: true
         size: "50Gi"
   ```

### High Availability

1. **Use specific image tags**
   ```yaml
   image:
     tag: "v1.2.3"  # Not "latest"
   ```

2. **Configure pod disruption budgets**
   ```yaml
   podDisruptionBudget:
     enabled: true
     minAvailable: 1
   ```

3. **Enable automatic reconnection**
   ```yaml
   pipeops:
     reconnect:
       enabled: true
       max_attempts: 10
   ```

### Monitoring

1. **Retain metrics for adequate duration**
   ```yaml
   monitoring:
     prometheus:
       retention: "30d"
   ```

2. **Configure appropriate scrape intervals**
   ```yaml
   monitoring:
     prometheus:
       scrape_interval: "30s"
   ```

3. **Enable persistent storage**
   ```yaml
   monitoring:
     prometheus:
       persistence:
         enabled: true
   ```

## Next Steps

- **[Deployment Scenarios](/docs/kubernetes-agent/deployment-scenarios)** — Learn about different deployment patterns
- **[Monitoring & Observability](/docs/kubernetes-agent/monitoring)** — Set up comprehensive monitoring
- **[Management & Operations](/docs/kubernetes-agent/management)** — Manage agent lifecycle
- **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Common configuration issues
