---
sidebar_position: 14
title: GitOps Deployments
description: Deploy applications using GitOps principles with declarative configuration
---

# GitOps Deployments

GitOps is a declarative approach to infrastructure and application deployment where the desired state of your system is defined in a Git repository. PipeOps GitOps enables you to manage your deployments using a `pipeops.yaml` manifest file, similar to ArgoCD.

## Overview

With GitOps enabled, PipeOps:

- **Watches your repository** for changes to the manifest file
- **Automatically syncs** your deployment to match the desired state
- **Detects drift** between git and live state with automatic healing
- **Provides visibility** into sync status and history
- **Supports sync waves** for ordered deployments with dependencies
- **Creates preview environments** automatically for pull requests

## Quick Start

### 1. Create a pipeops.yaml File

Add a `pipeops.yaml` file to the root of your repository:

```yaml
apiVersion: pipeops.io/v1
kind: Application
metadata:
  name: my-app
  labels:
    team: backend
    environment: production
spec:
  build:
    framework: nodejs
    builder: nixpacks
    dockerfile: Dockerfile
    context: .
  deploy:
    replicas: 3
    strategy: rolling
  env:
    - name: NODE_ENV
      value: production
    - name: DATABASE_URL
      valueFrom: doppler://production/DATABASE_URL
  resources:
    cpu: "500m"
    memory: "512Mi"
  autoscale:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
  network:
    port: 3000
    public: true
    domains:
      - app.example.com
```

### 2. Enable GitOps for Your Project

When creating a new project, select **GitOps** as the project type:

1. Navigate to **Projects** → **Create Project**
2. Select **GitOps** as the project type
3. Connect your repository
4. Configure the manifest path (default: `/pipeops.yaml`)
5. Set your sync policy

### 3. Deploy

Once configured, PipeOps will:
- Detect the `pipeops.yaml` in your repository
- Parse and validate the manifest
- Deploy your application according to the specification

## Manifest Reference

### Metadata

```yaml
metadata:
  name: my-app                    # Application name
  labels:                         # Optional labels
    team: backend
    environment: production
```

### Build Configuration

```yaml
spec:
  build:
    framework: nodejs             # Framework: nodejs, python, go, etc.
    builder: nixpacks             # Builder: nixpacks, dockerfile, buildpack
    dockerfile: Dockerfile        # Dockerfile path (if using dockerfile builder)
    context: .                    # Build context directory
    args:                         # Build arguments
      - NODE_ENV=production
```

### Deployment Configuration

```yaml
spec:
  deploy:
    replicas: 3                   # Number of replicas
    strategy: rolling             # Deployment strategy: rolling, recreate
```

### Environment Variables

```yaml
spec:
  env:
    - name: NODE_ENV              # Plain value
      value: production
    - name: DATABASE_URL          # From Doppler
      valueFrom: doppler://production/DATABASE_URL
    - name: API_KEY               # From secret
      valueFrom:
        secretRef:
          name: api-secrets
          key: api-key
```

### Resources

```yaml
spec:
  resources:
    cpu: "500m"                   # CPU request/limit
    memory: "512Mi"               # Memory request/limit
```

### Autoscaling

```yaml
spec:
  autoscale:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    targetCPU: 80                 # Target CPU utilization %
```

### Networking

```yaml
spec:
  network:
    port: 3000                    # Container port
    public: true                  # Expose publicly
    domains:                      # Custom domains
      - app.example.com
      - www.example.com
```

## Sync Policies

| Policy | Description |
|--------|-------------|
| **Manual** | Sync only when explicitly triggered |
| **Auto** | Automatically sync on a schedule (every 5 minutes) |
| **Webhook** | Sync when git push webhook is received (recommended) |

### Configuring Sync Policy

In the project settings:

1. Navigate to **Project Settings** → **GitOps**
2. Select your preferred sync policy
3. Enable additional options:
   - **Auto Prune**: Delete resources removed from manifest
   - **Self Heal**: Automatically correct drift from desired state

## Sync Status

| Status | Description |
|--------|-------------|
| **Synced** | Deployment matches git state |
| **OutOfSync** | Changes detected, sync needed |
| **Syncing** | Sync in progress |
| **Failed** | Sync failed - check logs |
| **Unknown** | Status not yet determined |

## Viewing Diff

Before syncing, you can preview changes:

1. Navigate to your GitOps project
2. Click **View Diff** to see pending changes
3. Review added, modified, and removed configurations
4. Click **Sync** to apply changes

## Custom Kubernetes Manifests (BYOC Only)

For users with their own Kubernetes clusters (BYOC - Bring Your Own Cluster), PipeOps supports deploying raw Kubernetes manifests.

:::warning Important
Custom Kubernetes manifests are **NOT allowed** on PipeOps-managed clusters (PKS) for security and stability reasons.
:::

### Cluster Type Support

| Cluster Type | `pipeops` Manifest | `kubernetes` Manifest |
|--------------|-------------------|----------------------|
| PKS (PipeOps Managed) | ✅ Allowed | ❌ Not Allowed |
| AWS (User Account) | ✅ Allowed | ✅ Allowed |
| GCP (User Account) | ✅ Allowed | ✅ Allowed |
| Azure (User Account) | ✅ Allowed | ✅ Allowed |
| BYOC (Agent-managed) | ✅ Allowed | ✅ Allowed |

### Using Custom K8s Manifests

1. Create a directory with your Kubernetes YAML files:

```
your-repo/
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   └── ingress.yaml
└── README.md
```

2. When creating the GitOps project, set:
   - **Manifest Type**: `kubernetes`
   - **Manifest Path**: `/k8s`

3. PipeOps will apply all YAML files in the specified directory

### Supported Kubernetes Resources

All standard Kubernetes resources are supported:

- Deployments, StatefulSets, DaemonSets
- Services, Ingresses
- ConfigMaps, Secrets
- PersistentVolumeClaims
- CronJobs, Jobs
- ServiceAccounts, Roles, RoleBindings
- NetworkPolicies
- Custom Resource Definitions (CRDs)

## Best Practices

### 1. Use Environment-Specific Manifests

Organize your manifests by environment:

```
your-repo/
├── manifests/
│   ├── base/
│   │   └── pipeops.yaml
│   ├── staging/
│   │   └── pipeops.yaml
│   └── production/
│       └── pipeops.yaml
```

### 2. Version Your Manifests

Use the `apiVersion` field to track manifest schema versions:

```yaml
apiVersion: pipeops.io/v1
```

### 3. Use Secrets Safely

Never commit secrets directly. Use:

- **Doppler integration**: `valueFrom: doppler://project/SECRET_NAME`
- **Secret references**: Reference secrets managed in PipeOps

### 4. Enable Self-Heal for Production

Enable self-heal to automatically correct any manual changes or drift:

```
Sync Policy: webhook
Auto Prune: true
Self Heal: true
```

### 5. Review Diffs Before Syncing

Always review the diff before syncing to production to understand what changes will be applied.

## Advanced Features

### Sync Waves (Ordering)

Sync Waves allow you to control the order in which resources are deployed. This is essential when you have dependencies between resources (e.g., databases must be ready before applications).

#### How Sync Waves Work

Resources are grouped into "waves" using annotations. Lower wave numbers are deployed first, and PipeOps waits for resources to become healthy before moving to the next wave.

```yaml
apiVersion: pipeops.io/v1
kind: Application
metadata:
  name: database
  annotations:
    pipeops.io/sync-wave: "0"    # Deployed first
spec:
  # ... database configuration
---
apiVersion: pipeops.io/v1
kind: Application
metadata:
  name: cache
  annotations:
    pipeops.io/sync-wave: "1"    # Deployed after database
spec:
  # ... cache configuration
---
apiVersion: pipeops.io/v1
kind: Application
metadata:
  name: api
  annotations:
    pipeops.io/sync-wave: "2"    # Deployed after cache
spec:
  # ... api configuration
```

#### Wave Ordering Rules

| Wave | Typical Use Case | Example Resources |
|------|------------------|-------------------|
| `-1` | Pre-deployment hooks | Migrations, schema updates |
| `0` | Infrastructure | Databases, message queues |
| `1` | Dependencies | Caches, service meshes |
| `2` | Applications | APIs, web servers |
| `3` | Post-deployment | Monitoring, cleanup jobs |

#### Enabling Sync Waves

1. Navigate to **Project Settings** → **GitOps**
2. Enable **Sync Waves**
3. Set **Wave Timeout** (default: 5 minutes per wave)

### Drift Detection

Drift detection continuously monitors your deployments to identify when the live state differs from the desired state defined in Git.

#### Types of Drift

| Drift Type | Description | Example |
|------------|-------------|---------|
| **Configuration Drift** | Resource configuration changed | Replica count manually increased |
| **Resource Drift** | Resources added or removed | Manual secret creation |
| **Image Drift** | Container image changed | Emergency hotfix deployed |

#### How Drift Detection Works

1. **Scheduled Scans**: PipeOps scans live resources every 5 minutes by default
2. **Comparison**: Live state is compared against the Git manifest
3. **Reporting**: Differences are reported in the project dashboard
4. **Alerting**: Optional notifications for detected drift

#### Configuring Drift Detection

```yaml
spec:
  gitops:
    driftDetection:
      enabled: true
      interval: 5m              # Scan frequency
      ignoreFields:             # Fields to ignore in comparison
        - metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"]
        - status
```

#### Drift Response Options

| Option | Behavior |
|--------|----------|
| **Alert Only** | Notify but don't auto-correct |
| **Self Heal** | Automatically revert to Git state |
| **Manual Review** | Require approval before correction |

#### Viewing Drift Details

1. Navigate to your GitOps project
2. Click the **Drift** tab
3. View detailed comparison of each drifted resource
4. Choose to **Sync** (apply Git state) or **Ignore** (mark as accepted)

### Preview Environments

Preview environments automatically create temporary deployments for pull requests, enabling you to test changes before merging.

#### How Preview Environments Work

1. **PR Created**: Developer opens a pull request
2. **Detection**: PipeOps detects the PR via webhook
3. **Build**: Application is built from the PR branch
4. **Deploy**: Temporary environment is provisioned
5. **URL**: Unique preview URL is posted as PR comment
6. **Cleanup**: Environment is automatically deleted when PR is closed/merged

#### Enabling Preview Environments

1. Navigate to **Project Settings** → **GitOps** → **Preview Environments**
2. Enable **Preview Environments**
3. Configure settings:

| Setting | Description | Default |
|---------|-------------|---------|
| **Auto Deploy** | Automatically deploy on PR creation | `true` |
| **URL Pattern** | Preview URL format | `pr-{number}.preview.{domain}` |
| **TTL** | Maximum lifetime | `72 hours` |
| **Resources** | Resource limits for previews | `50%` of production |

#### Manifest Configuration

```yaml
spec:
  gitops:
    preview:
      enabled: true
      urlPattern: "pr-{{.PRNumber}}.preview.example.com"
      ttl: 72h
      resources:
        cpu: "250m"
        memory: "256Mi"
      autoStop:
        enabled: true
        idleTimeout: 2h         # Stop after 2 hours of inactivity
```

#### Preview Environment Features

- **Isolated Database**: Optional isolated database per preview
- **Seeded Data**: Populate with test data automatically
- **Branch-Specific Secrets**: Use branch-specific environment variables
- **Collaboration**: Share preview URLs in PR comments

#### Example PR Comment

When a preview environment is ready, PipeOps posts a comment:

```
🚀 Preview Environment Ready!

**URL**: https://pr-123.preview.example.com
**Status**: Healthy
**Branch**: feature/new-login
**Expires**: 72 hours

[View Logs](https://app.pipeops.io/...) | [View Deployment](https://app.pipeops.io/...)
```

#### Cleanup Policies

| Trigger | Behavior |
|---------|----------|
| **PR Merged** | Environment deleted immediately |
| **PR Closed** | Environment deleted after grace period (default: 1 hour) |
| **TTL Expired** | Environment deleted after max lifetime |
| **Manual** | Delete via dashboard or API |

## Troubleshooting

### Sync Failed

1. Check the sync history for error messages
2. Validate your `pipeops.yaml` syntax
3. Ensure all referenced secrets exist
4. Check if the target cluster is accessible

### Manifest Not Found

1. Verify the manifest path is correct
2. Ensure the file is committed to the correct branch
3. Check file permissions in the repository

### OutOfSync After Deploy

1. Someone may have made manual changes
2. Enable **Self Heal** to auto-correct drift
3. Click **Sync** to reconcile

### Sync Wave Timeout

1. Check if the wave's resources are becoming healthy
2. Increase the wave timeout in settings
3. Verify resource dependencies are correct
4. Check resource health probes and startup times

### Drift Detection Not Working

1. Verify drift detection is enabled in project settings
2. Check if the scan interval is appropriate
3. Ensure the cluster is accessible for scans
4. Review the ignored fields configuration

### Preview Environment Not Created

1. Verify webhooks are configured correctly
2. Check if preview environments are enabled
3. Ensure the PR branch has a valid `pipeops.yaml`
4. Check cluster resources for preview quota limits

## Related Documentation

- [Project Deployment](./project-deployment.md)
- [Project Settings](./project-settings.md)
- [Environment Variables](./project-settings.md#environment-variable)
