---
slug: monitoring
sidebar_position: 5
title: Monitoring & Observability
---

# Monitoring & Observability

The PipeOps Kubernetes Agent includes a comprehensive monitoring and observability stack built on industry-standard open-source tools. This guide covers setup, configuration, and usage of the monitoring components.

## Overview

The agent's monitoring stack provides complete visibility into your Kubernetes cluster and workloads through:

- **Prometheus** — Metrics collection, storage, and alerting
- **Grafana** — Visualization, dashboards, and analysis
- **Loki** — Log aggregation and querying
- **OpenCost** — Kubernetes cost monitoring and optimization
- **Node Exporter** — Node-level system metrics
- **kube-state-metrics** — Kubernetes object metrics

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Grafana Dashboard                   │
│         (Visualization & Analysis)                   │
└─────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
┌─────────▼────────┐ ┌───▼────────┐ ┌────▼──────┐
│   Prometheus     │ │    Loki    │ │ OpenCost  │
│  (Metrics DB)    │ │ (Logs DB)  │ │  (Costs)  │
└─────────┬────────┘ └───┬────────┘ └────┬──────┘
          │              │               │
    ┌─────┴──────┬───────┴──────┬────────┴─────┐
    │            │              │              │
┌───▼──────┐ ┌──▼────────┐ ┌───▼────────┐ ┌───▼─────┐
│ K8s API  │ │   Nodes   │ │   Pods     │ │ Kubelet │
└──────────┘ └───────────┘ └────────────┘ └─────────┘
```

## Installation

### Enable Monitoring During Initial Setup

**Intelligent Installer:**
```bash
export PIPEOPS_TOKEN="your-api-token"
export PIPEOPS_MONITORING_ENABLED="true"

curl -sSL https://get.pipeops.io/agent | bash
```

**Helm Installation:**
```bash
helm install pipeops-agent pipeops/pipeops-agent \
  --set agent.pipeops.token="your-api-token" \
  --set monitoring.enabled=true \
  --set monitoring.prometheus.enabled=true \
  --set monitoring.grafana.enabled=true \
  --set monitoring.loki.enabled=true \
  --namespace pipeops-system \
  --create-namespace
```

### Add Monitoring to Existing Installation

If you initially installed without monitoring:

```bash
helm upgrade pipeops-agent pipeops/pipeops-agent \
  --set monitoring.enabled=true \
  --namespace pipeops-system \
  --reuse-values
```

## Prometheus Configuration

Prometheus collects and stores time-series metrics from your cluster.

### Basic Setup

```yaml
monitoring:
  prometheus:
    enabled: true
    port: 9090
    
    # Metric retention period
    retention: "15d"
    
    # Storage configuration
    persistence:
      enabled: true
      storageClass: "standard"
      size: "10Gi"
    
    # Scrape interval
    scrape_interval: "30s"
    
    # Resource limits
    resources:
      requests:
        cpu: "250m"
        memory: "512Mi"
      limits:
        cpu: "500m"
        memory: "1Gi"
```

### Custom Scrape Configurations

Add custom scrape targets:

```yaml
monitoring:
  prometheus:
    additionalScrapeConfigs:
      - job_name: 'custom-app'
        kubernetes_sd_configs:
          - role: pod
            namespaces:
              names:
                - my-app-namespace
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
            action: replace
            regex: ([^:]+)(?::\d+)?;(\d+)
            replacement: $1:$2
            target_label: __address__
```

### Accessing Prometheus

**Port Forward (Local Access):**
```bash
kubectl port-forward svc/prometheus-server 9090:9090 -n pipeops-monitoring
```

Then open http://localhost:9090

**Ingress (Production):**
```yaml
monitoring:
  prometheus:
    ingress:
      enabled: true
      className: "nginx"
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-prod"
      hosts:
        - host: prometheus.example.com
          paths:
            - path: /
              pathType: Prefix
      tls:
        - secretName: prometheus-tls
          hosts:
            - prometheus.example.com
```

### Common Prometheus Queries

**CPU Usage by Pod:**
```promql
sum(rate(container_cpu_usage_seconds_total{namespace="default"}[5m])) by (pod)
```

**Memory Usage by Namespace:**
```promql
sum(container_memory_working_set_bytes{namespace!=""}) by (namespace)
```

**Pod Restart Count:**
```promql
kube_pod_container_status_restarts_total
```

**Node CPU Usage:**
```promql
100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

## Grafana Configuration

Grafana provides powerful visualization and dashboarding capabilities.

### Basic Setup

```yaml
monitoring:
  grafana:
    enabled: true
    port: 3000
    
    # Admin credentials
    adminUser: "admin"
    adminPassword: "changeme"  # Change in production!
    
    # Persistence for dashboards
    persistence:
      enabled: true
      storageClass: "standard"
      size: "5Gi"
    
    # Resource limits
    resources:
      requests:
        cpu: "100m"
        memory: "128Mi"
      limits:
        cpu: "200m"
        memory: "256Mi"
```

### Accessing Grafana

**Port Forward (Local Access):**
```bash
kubectl port-forward svc/grafana 3000:3000 -n pipeops-monitoring
```

Then open http://localhost:3000

Default credentials:
- Username: `admin`
- Password: `pipeops` (or as configured)

**Ingress (Production):**
```yaml
monitoring:
  grafana:
    ingress:
      enabled: true
      className: "nginx"
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-prod"
        nginx.ingress.kubernetes.io/rewrite-target: /
      hosts:
        - host: grafana.example.com
          paths:
            - path: /
              pathType: Prefix
      tls:
        - secretName: grafana-tls
          hosts:
            - grafana.example.com
```

### Pre-configured Dashboards

The agent includes several pre-configured Grafana dashboards:

#### Kubernetes Cluster Overview
- **ID**: `kubernetes-cluster-overview`
- **Metrics**: Node status, pod counts, resource usage
- **Use Case**: High-level cluster health monitoring

#### Node Metrics
- **ID**: `node-exporter-full`
- **Metrics**: CPU, memory, disk, network per node
- **Use Case**: Node-level performance analysis

#### Pod Resources
- **ID**: `kubernetes-pod-resources`
- **Metrics**: CPU, memory, network per pod
- **Use Case**: Application resource monitoring

#### Persistent Volumes
- **ID**: `kubernetes-persistent-volumes`
- **Metrics**: Volume usage, capacity, status
- **Use Case**: Storage monitoring

#### Cost Analysis (OpenCost)
- **ID**: `opencost-overview`
- **Metrics**: Cost per namespace, pod, label
- **Use Case**: Cost optimization and budgeting

### Importing Custom Dashboards

**Via UI:**
1. Navigate to Dashboards → Import
2. Enter dashboard ID from [Grafana.com](https://grafana.com/grafana/dashboards/)
3. Select Prometheus data source
4. Click Import

**Via Configuration:**
```yaml
monitoring:
  grafana:
    dashboardProviders:
      dashboardproviders.yaml:
        apiVersion: 1
        providers:
          - name: 'default'
            orgId: 1
            folder: ''
            type: file
            disableDeletion: false
            editable: true
            options:
              path: /var/lib/grafana/dashboards/default
    
    dashboards:
      default:
        kubernetes-cluster:
          gnetId: 7249
          revision: 1
          datasource: Prometheus
        node-exporter:
          gnetId: 1860
          revision: 27
          datasource: Prometheus
```

### Creating Alerts in Grafana

Navigate to Alerting → Alert rules → New alert rule:

**Example: High CPU Alert**
```yaml
Alert name: High CPU Usage
Query: avg by (namespace) (rate(container_cpu_usage_seconds_total[5m])) > 0.8
Condition: WHEN avg() OF query(A, 5m, now) IS ABOVE 0.8
For: 5m
Annotations:
  summary: High CPU usage detected in {{ $labels.namespace }}
```

## Loki Configuration

Loki provides log aggregation and querying capabilities.

### Basic Setup

```yaml
monitoring:
  loki:
    enabled: true
    port: 3100
    
    # Log retention
    retention: "168h"  # 7 days
    
    # Storage
    persistence:
      enabled: true
      storageClass: "standard"
      size: "10Gi"
    
    # Resource limits
    resources:
      requests:
        cpu: "100m"
        memory: "256Mi"
      limits:
        cpu: "200m"
        memory: "512Mi"
```

### Accessing Loki

Loki is primarily accessed through Grafana:

1. In Grafana, go to Configuration → Data Sources
2. Loki should be pre-configured as a data source
3. Use the Explore view to query logs

### LogQL Query Examples

**All logs from a namespace:**
```logql
{namespace="default"}
```

**Logs from a specific pod:**
```logql
{namespace="default", pod="my-app-xyz"}
```

**Error logs:**
```logql
{namespace="default"} |= "error" | json
```

**Rate of errors:**
```logql
rate({namespace="default"} |= "error" [5m])
```

**Logs filtered by label:**
```logql
{app="nginx"} | json | line_format "{{.message}}"
```

### Log Shipping to Loki

The agent automatically configures Promtail to ship logs to Loki. For custom applications, add the Loki label:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
    loki: "true"  # Enable log collection
spec:
  containers:
    - name: app
      image: my-app:latest
```

## OpenCost Configuration

OpenCost provides Kubernetes cost monitoring and optimization insights.

### Basic Setup

```yaml
monitoring:
  opencost:
    enabled: true
    port: 9003
    
    # Cloud provider pricing (optional)
    cloudProvider: "aws"  # aws, gcp, azure
    
    # Custom pricing (optional)
    customPricing:
      cpu: "0.031611"  # USD per CPU-hour
      memory: "0.004237"  # USD per GB-hour
      storage: "0.00005"  # USD per GB-hour
```

### Accessing OpenCost

**Port Forward:**
```bash
kubectl port-forward svc/opencost 9003:9003 -n pipeops-monitoring
```

Then open http://localhost:9003

**Via Grafana Dashboard:**
The OpenCost dashboard is pre-configured in Grafana showing:
- Cost by namespace
- Cost by deployment
- Cost by label
- Cost trends over time

### Cost Optimization Tips

1. **Identify expensive namespaces:**
   ```bash
   kubectl top nodes
   kubectl top pods --all-namespaces
   ```

2. **Right-size resources:**
   - Review actual CPU/memory usage vs. requests/limits
   - Adjust resource specifications based on actual usage

3. **Use cost labels:**
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     labels:
       team: "engineering"
       cost-center: "product"
       environment: "production"
   ```

## Alerting

### Prometheus Alerting Rules

Configure alerts in Prometheus:

```yaml
monitoring:
  prometheus:
    alerting:
      enabled: true
    
    serverFiles:
      alerting_rules.yml:
        groups:
          - name: kubernetes-alerts
            interval: 30s
            rules:
              - alert: PodCrashLooping
                expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
                for: 5m
                labels:
                  severity: warning
                annotations:
                  summary: "Pod {{ $labels.namespace }}/{{ $labels.pod }} is crash looping"
              
              - alert: HighCPUUsage
                expr: sum(rate(container_cpu_usage_seconds_total[5m])) by (namespace) > 0.8
                for: 10m
                labels:
                  severity: warning
                annotations:
                  summary: "High CPU usage in namespace {{ $labels.namespace }}"
              
              - alert: HighMemoryUsage
                expr: sum(container_memory_working_set_bytes) by (namespace) / sum(kube_node_status_allocatable{resource="memory"}) > 0.8
                for: 10m
                labels:
                  severity: warning
                annotations:
                  summary: "High memory usage in namespace {{ $labels.namespace }}"
              
              - alert: NodeDiskPressure
                expr: kube_node_status_condition{condition="DiskPressure",status="true"} == 1
                for: 5m
                labels:
                  severity: critical
                annotations:
                  summary: "Node {{ $labels.node }} has disk pressure"
```

### Alertmanager Configuration

Configure alert routing and notifications:

```yaml
monitoring:
  prometheus:
    alertmanagerFiles:
      alertmanager.yml:
        global:
          resolve_timeout: 5m
          slack_api_url: 'YOUR_SLACK_WEBHOOK_URL'
        
        route:
          group_by: ['alertname', 'namespace']
          group_wait: 10s
          group_interval: 10s
          repeat_interval: 12h
          receiver: 'slack-notifications'
          
          routes:
            - match:
                severity: critical
              receiver: 'pagerduty'
              continue: true
            
            - match:
                severity: warning
              receiver: 'slack-notifications'
        
        receivers:
          - name: 'slack-notifications'
            slack_configs:
              - channel: '#kubernetes-alerts'
                title: 'Kubernetes Alert'
                text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
          
          - name: 'pagerduty'
            pagerduty_configs:
              - service_key: 'YOUR_PAGERDUTY_KEY'
```

## Best Practices

### Resource Management

1. **Set appropriate retention periods:**
   - Development: 7 days
   - Staging: 15 days
   - Production: 30+ days

2. **Configure storage:**
   - Use persistent volumes for production
   - Set appropriate storage class and size
   - Monitor disk usage regularly

3. **Resource limits:**
   - Set requests and limits for all components
   - Monitor actual usage and adjust accordingly

### Security

1. **Change default passwords:**
   ```yaml
   monitoring:
     grafana:
       adminPassword: "strong-password-here"
   ```

2. **Use HTTPS/TLS:**
   - Configure ingress with TLS certificates
   - Use cert-manager for automated certificate management

3. **Implement RBAC:**
   - Restrict access to monitoring namespace
   - Use Grafana organizations and teams

### Performance

1. **Optimize scrape intervals:**
   - Balance between data granularity and storage
   - Use longer intervals for less critical metrics

2. **Use recording rules:**
   ```yaml
   groups:
     - name: aggregation_rules
       interval: 30s
       rules:
         - record: namespace:container_cpu_usage:sum
           expr: sum(rate(container_cpu_usage_seconds_total[5m])) by (namespace)
   ```

3. **Limit cardinality:**
   - Avoid high-cardinality labels
   - Use label dropping/keeping judiciously

## Troubleshooting

### Prometheus Issues

**Prometheus not scraping targets:**
```bash
# Check Prometheus targets
kubectl port-forward svc/prometheus-server 9090:9090 -n pipeops-monitoring
# Open http://localhost:9090/targets

# Check service monitor
kubectl get servicemonitor -n pipeops-monitoring
```

**High memory usage:**
- Reduce retention period
- Increase memory limits
- Optimize queries and recording rules

### Grafana Issues

**Dashboards not loading:**
- Verify Prometheus data source connection
- Check Grafana logs: `kubectl logs deployment/grafana -n pipeops-monitoring`

**Login issues:**
- Reset admin password:
  ```bash
  kubectl exec -it deployment/grafana -n pipeops-monitoring -- grafana-cli admin reset-admin-password newpassword
  ```

### Loki Issues

**Logs not appearing:**
- Verify Promtail is running:
  ```bash
  kubectl get pods -n pipeops-monitoring -l app=promtail
  ```
- Check Promtail logs:
  ```bash
  kubectl logs -n pipeops-monitoring -l app=promtail
  ```

## Next Steps

- **[Management & Operations](/docs/kubernetes-agent/management)** — Manage agent lifecycle
- **[Troubleshooting](/docs/kubernetes-agent/troubleshooting)** — Common issues and solutions
- **[API Reference](/docs/kubernetes-agent/api-reference)** — Agent API documentation
