---
slug: api-reference
sidebar_position: 8
title: API Reference
---

# API Reference

This document provides a complete reference for the PipeOps Kubernetes Agent's API endpoints, configuration API, and integration examples.

## Agent HTTP API

The agent exposes several HTTP endpoints for health checks, metrics, and management.

### Base URL

When running in Kubernetes:
```
http://pipeops-agent.pipeops-system.svc.cluster.local:8080
```

For local/binary installations:
```
http://localhost:8080
```

### Health Check Endpoints

#### GET /healthz

Liveness probe endpoint. Returns HTTP 200 if the agent process is running.

**Request:**
```bash
curl http://localhost:8080/healthz
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:45Z"
}
```

**Status Codes:**
- `200 OK` - Agent is running
- `503 Service Unavailable` - Agent is not healthy

#### GET /readyz

Readiness probe endpoint. Returns HTTP 200 if the agent is ready to accept requests.

**Request:**
```bash
curl http://localhost:8080/readyz
```

**Response:**
```json
{
  "status": "ready",
  "checks": {
    "api_connection": "ok",
    "kubernetes": "ok",
    "tunnel": "ok"
  },
  "timestamp": "2024-01-15T10:30:45Z"
}
```

**Status Codes:**
- `200 OK` - Agent is ready
- `503 Service Unavailable` - Agent is not ready

#### GET /livez

Combined liveness check with detailed component status.

**Request:**
```bash
curl http://localhost:8080/livez
```

**Response:**
```json
{
  "status": "alive",
  "components": {
    "api_client": {
      "status": "healthy",
      "last_ping": "2024-01-15T10:30:40Z"
    },
    "tunnel_manager": {
      "status": "healthy",
      "active_tunnels": 3
    },
    "kubernetes_client": {
      "status": "healthy",
      "cluster_reachable": true
    }
  },
  "uptime_seconds": 3600
}
```

### Metrics Endpoint

#### GET /metrics

Prometheus-compatible metrics endpoint.

**Request:**
```bash
curl http://localhost:9091/metrics
```

**Response:**
```text
# HELP pipeops_agent_up Agent running status
# TYPE pipeops_agent_up gauge
pipeops_agent_up 1

# HELP pipeops_agent_connected Connection status to PipeOps API
# TYPE pipeops_agent_connected gauge
pipeops_agent_connected 1

# HELP pipeops_api_requests_total Total API requests
# TYPE pipeops_api_requests_total counter
pipeops_api_requests_total{method="GET",endpoint="/clusters",status="200"} 150

# HELP pipeops_api_request_duration_seconds API request duration
# TYPE pipeops_api_request_duration_seconds histogram
pipeops_api_request_duration_seconds_bucket{le="0.1"} 100
pipeops_api_request_duration_seconds_bucket{le="0.5"} 145
pipeops_api_request_duration_seconds_bucket{le="1.0"} 150

# HELP pipeops_tunnel_active Active tunnel count
# TYPE pipeops_tunnel_active gauge
pipeops_tunnel_active 3

# HELP pipeops_agent_memory_bytes Agent memory usage
# TYPE pipeops_agent_memory_bytes gauge
pipeops_agent_memory_bytes 268435456

# HELP pipeops_agent_goroutines Number of goroutines
# TYPE pipeops_agent_goroutines gauge
pipeops_agent_goroutines 42
```

**Available Metrics:**

| Metric | Type | Description |
|--------|------|-------------|
| `pipeops_agent_up` | Gauge | Agent running status (1=up, 0=down) |
| `pipeops_agent_connected` | Gauge | Connection to PipeOps API (1=connected, 0=disconnected) |
| `pipeops_agent_start_time_seconds` | Gauge | Unix timestamp of agent start time |
| `pipeops_api_requests_total` | Counter | Total API requests by method, endpoint, status |
| `pipeops_api_request_duration_seconds` | Histogram | API request latency |
| `pipeops_api_errors_total` | Counter | Total API errors by type |
| `pipeops_tunnel_active` | Gauge | Number of active tunnels |
| `pipeops_tunnel_bytes_sent` | Counter | Total bytes sent through tunnels |
| `pipeops_tunnel_bytes_received` | Counter | Total bytes received through tunnels |
| `pipeops_kubernetes_api_requests_total` | Counter | Kubernetes API requests |
| `pipeops_agent_memory_bytes` | Gauge | Agent memory usage in bytes |
| `pipeops_agent_cpu_seconds_total` | Counter | Total CPU time consumed |
| `pipeops_agent_goroutines` | Gauge | Number of goroutines |

### Information Endpoints

#### GET /info

Returns agent version and configuration information.

**Request:**
```bash
curl http://localhost:8080/info
```

**Response:**
```json
{
  "version": "1.2.3",
  "git_commit": "a1b2c3d4",
  "build_date": "2024-01-10T12:00:00Z",
  "go_version": "go1.21.5",
  "cluster_name": "production-cluster",
  "cluster_id": "cls-123abc",
  "kubernetes_version": "v1.28.4",
  "features": {
    "monitoring": true,
    "tunneling": true,
    "auto_scaling": false
  }
}
```

#### GET /config

Returns current agent configuration (sensitive values redacted).

**Request:**
```bash
curl http://localhost:8080/config
```

**Response:**
```json
{
  "agent": {
    "cluster_name": "production-cluster",
    "namespace": "pipeops-system",
    "labels": {
      "environment": "production",
      "region": "us-east-1"
    }
  },
  "pipeops": {
    "api_url": "https://api.pipeops.sh",
    "token": "***REDACTED***",
    "timeout": "30s"
  },
  "tunnel": {
    "enabled": true,
    "forwards": [
      {
        "name": "kubernetes-api",
        "local_addr": "localhost:6443"
      }
    ]
  },
  "monitoring": {
    "enabled": true,
    "prometheus": {
      "enabled": true
    }
  }
}
```

## WebSocket API

The agent uses WebSocket for real-time bidirectional communication with the PipeOps platform.

### Connection

**Endpoint:** `wss://api.pipeops.sh/v1/agent/connect`

**Authentication:** Bearer token in header

**Connection Example:**
```javascript
const ws = new WebSocket('wss://api.pipeops.sh/v1/agent/connect', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'X-Cluster-ID': 'cls-123abc'
  }
});
```

### Message Format

All messages use JSON format:

```json
{
  "type": "message_type",
  "id": "unique-message-id",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    // Message-specific data
  }
}
```

### Message Types

#### Agent → Platform

**Heartbeat:**
```json
{
  "type": "heartbeat",
  "id": "msg-001",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    "status": "healthy",
    "metrics": {
      "cpu_usage": 0.25,
      "memory_usage": 0.35,
      "active_pods": 15
    }
  }
}
```

**Cluster Status:**
```json
{
  "type": "cluster_status",
  "id": "msg-002",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    "nodes": 3,
    "pods": 45,
    "services": 12,
    "health": "healthy"
  }
}
```

**Event Report:**
```json
{
  "type": "event",
  "id": "msg-003",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    "event_type": "pod_created",
    "namespace": "default",
    "resource": "my-app-pod",
    "details": {
      "image": "my-app:v1.0.0",
      "node": "node-1"
    }
  }
}
```

#### Platform → Agent

**Deploy Application:**
```json
{
  "type": "deploy",
  "id": "cmd-001",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    "project_id": "proj-123",
    "manifest": "apiVersion: apps/v1\nkind: Deployment\n...",
    "namespace": "default"
  }
}
```

**Execute Command:**
```json
{
  "type": "exec",
  "id": "cmd-002",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    "pod": "my-app-pod",
    "namespace": "default",
    "container": "app",
    "command": ["ls", "-la", "/app"]
  }
}
```

**Get Logs:**
```json
{
  "type": "logs",
  "id": "cmd-003",
  "timestamp": "2024-01-15T10:30:45Z",
  "payload": {
    "pod": "my-app-pod",
    "namespace": "default",
    "container": "app",
    "tail_lines": 100,
    "follow": false
  }
}
```

## Configuration API

### Environment Variables API

Set via environment variables or Kubernetes ConfigMap/Secret.

**Example ConfigMap:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: pipeops-agent-config
  namespace: pipeops-system
data:
  CLUSTER_NAME: "production-cluster"
  PIPEOPS_API_URL: "https://api.pipeops.sh"
  LOG_LEVEL: "info"
  MONITORING_ENABLED: "true"
```

**Example Secret:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: pipeops-agent-config
  namespace: pipeops-system
type: Opaque
stringData:
  PIPEOPS_TOKEN: "your-api-token-here"
```

### YAML Configuration API

**Configuration File Location:**
- Kubernetes: ConfigMap mounted at `/config/config.yaml`
- Binary: `/etc/pipeops/config.yaml`
- Docker: Mounted volume

**Schema Validation:**

The agent validates configuration against a JSON schema. Example validation:

```bash
# Validate configuration
pipeops-agent validate --config /etc/pipeops/config.yaml
```

**Output:**
```
✓ Configuration is valid
✓ All required fields present
✓ All values within acceptable ranges
```

## Integration Examples

### Kubernetes Deployment Integration

**Deploy with Agent Configuration:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-application
  namespace: default
  labels:
    managed-by: pipeops
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-application
  template:
    metadata:
      labels:
        app: my-application
        pipeops.io/project: "proj-123"
      annotations:
        pipeops.io/auto-scale: "true"
        pipeops.io/min-replicas: "2"
        pipeops.io/max-replicas: "10"
    spec:
      containers:
        - name: app
          image: my-app:v1.0.0
          ports:
            - containerPort: 8080
          env:
            - name: PIPEOPS_PROJECT_ID
              value: "proj-123"
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
```

### Prometheus ServiceMonitor Integration

**Monitor Custom Application:**

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-app-monitor
  namespace: default
  labels:
    prometheus: pipeops
spec:
  selector:
    matchLabels:
      app: my-application
  endpoints:
    - port: metrics
      interval: 30s
      path: /metrics
```

### Grafana Dashboard Integration

**Custom Dashboard via API:**

```json
{
  "dashboard": {
    "title": "My Application Dashboard",
    "tags": ["pipeops", "application"],
    "timezone": "browser",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{app='my-application'}[5m])",
            "legendFormat": "{{method}} {{status}}"
          }
        ],
        "type": "graph"
      }
    ]
  },
  "overwrite": true
}
```

**Import via API:**
```bash
curl -X POST http://grafana:3000/api/dashboards/db \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GRAFANA_API_KEY" \
  -d @dashboard.json
```

### Loki LogQL Integration

**Query Application Logs:**

```bash
# Using Loki API
curl -G -s "http://loki:3100/loki/api/v1/query_range" \
  --data-urlencode 'query={app="my-application"} | json | line_format "{{.level}}: {{.message}}"' \
  --data-urlencode 'start=1609459200' \
  --data-urlencode 'end=1609545600' \
  | jq
```

**LogQL Examples:**

```logql
# All logs from application
{app="my-application"}

# Error logs only
{app="my-application"} |= "error" | json | level="error"

# Logs from specific pod
{app="my-application", pod="my-app-abc123"}

# Rate of errors
rate({app="my-application"} |= "error" [5m])

# Pattern matching
{app="my-application"} |~ "timeout|connection refused"
```

### Tunnel API Integration

**Access Kubernetes API through Tunnel:**

```bash
# The agent creates secure tunnels accessible via PipeOps platform
# Tunnel endpoint format: https://tunnel-{cluster-id}.pipeops.sh/{service}

# Example: Access Kubernetes API
curl https://tunnel-cls123.pipeops.sh/kubernetes/api/v1/namespaces \
  -H "Authorization: Bearer $PIPEOPS_TOKEN"

# Example: Access Grafana
curl https://tunnel-cls123.pipeops.sh/grafana/api/health \
  -H "Authorization: Bearer $PIPEOPS_TOKEN"
```

### CI/CD Integration

**GitHub Actions Example:**

```yaml
name: Deploy to PipeOps
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to PipeOps Cluster
        env:
          PIPEOPS_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
          CLUSTER_NAME: production-cluster
        run: |
          # Install kubectl
          curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
          chmod +x kubectl
          
          # Deploy via PipeOps API
          curl -X POST https://api.pipeops.sh/v1/clusters/$CLUSTER_NAME/deploy \
            -H "Authorization: Bearer $PIPEOPS_TOKEN" \
            -H "Content-Type: application/json" \
            -d @deployment.json
```

**GitLab CI Example:**

```yaml
deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl jq
    - |
      curl -X POST https://api.pipeops.sh/v1/clusters/$CLUSTER_NAME/deploy \
        -H "Authorization: Bearer $PIPEOPS_TOKEN" \
        -H "Content-Type: application/json" \
        -d @deployment.json
  only:
    - main
```

## SDK Examples

### Go SDK

```go
package main

import (
    "context"
    "fmt"
    "log"
    
    "github.com/PipeOpsHQ/pipeops-go-sdk/agent"
)

func main() {
    // Create agent client
    client := agent.NewClient(agent.Config{
        Token:   "your-api-token",
        BaseURL: "https://api.pipeops.sh",
    })
    
    // Get cluster info
    ctx := context.Background()
    cluster, err := client.Clusters.Get(ctx, "production-cluster")
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Cluster: %s, Status: %s\n", cluster.Name, cluster.Status)
    
    // Deploy application
    deployment := &agent.Deployment{
        ProjectID: "proj-123",
        Manifest:  manifestYAML,
        Namespace: "default",
    }
    
    result, err := client.Deployments.Create(ctx, "production-cluster", deployment)
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Deployment created: %s\n", result.ID)
}
```

### Python SDK

```python
from pipeops import AgentClient

# Initialize client
client = AgentClient(
    token="your-api-token",
    base_url="https://api.pipeops.sh"
)

# Get cluster info
cluster = client.clusters.get("production-cluster")
print(f"Cluster: {cluster.name}, Status: {cluster.status}")

# Deploy application
deployment = client.deployments.create(
    cluster="production-cluster",
    project_id="proj-123",
    manifest=manifest_yaml,
    namespace="default"
)

print(f"Deployment created: {deployment.id}")

# Stream logs
for log_line in client.logs.stream(
    cluster="production-cluster",
    pod="my-app-pod",
    namespace="default"
):
    print(log_line)
```

### JavaScript/TypeScript SDK

```typescript
import { AgentClient } from '@pipeops/agent-sdk';

// Initialize client
const client = new AgentClient({
  token: 'your-api-token',
  baseURL: 'https://api.pipeops.sh'
});

// Get cluster info
const cluster = await client.clusters.get('production-cluster');
console.log(`Cluster: ${cluster.name}, Status: ${cluster.status}`);

// Deploy application
const deployment = await client.deployments.create('production-cluster', {
  projectId: 'proj-123',
  manifest: manifestYaml,
  namespace: 'default'
});

console.log(`Deployment created: ${deployment.id}`);

// Watch deployment status
client.deployments.watch('production-cluster', deployment.id, (event) => {
  console.log(`Status: ${event.status}`);
});
```

## Rate Limits

The agent API has the following rate limits:

| Endpoint | Rate Limit | Burst |
|----------|------------|-------|
| `/healthz` | Unlimited | - |
| `/readyz` | Unlimited | - |
| `/metrics` | 60/minute | 10 |
| `/info` | 60/minute | 10 |
| `/config` | 10/minute | 5 |
| WebSocket messages | 1000/minute | 100 |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1609459200
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request format or parameters |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Agent not ready |

**Error Response Format:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid cluster name",
    "details": {
      "field": "cluster_name",
      "reason": "must match pattern ^[a-z0-9-]+$"
    }
  }
}
```

## Next Steps

- **[Agent Overview](/docs/kubernetes-agent/agent-overview)** — Learn about agent capabilities
- **[Installation Guide](/docs/kubernetes-agent/installation)** — Install the agent
- **[Configuration Reference](/docs/kubernetes-agent/configuration)** — Complete configuration options
- **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Common issues and solutions
