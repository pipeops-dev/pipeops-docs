---
sidebar_position: 4
title: Deployment Commands
---

# Deployment Commands

The `pipeops deploy` commands handle deployment operations, pipeline management, and deployment monitoring.

## `pipeops deploy create`

Create and trigger a new deployment.

### Usage

```bash
pipeops deploy create [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--project` | string | Project name (required) |
| `--branch` | string | Git branch to deploy (default: project default) |
| `--commit` | string | Specific commit SHA to deploy |
| `--env` | string | Override environment variables |

### Examples

```bash
# Deploy latest commit
pipeops deploy create --project my-app

# Deploy specific branch
pipeops deploy create --project my-app --branch develop

# Deploy specific commit
pipeops deploy create --project my-app --commit abc123

# With environment override
pipeops deploy create \
  --project my-app \
  --env DEBUG=true
```

**See also**: [Web UI Deployment](/docs/projects/project-deployment)

---

## `pipeops deploy status`

Check deployment status.

### Usage

```bash
pipeops deploy status [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--project` | string | Project name (required) |
| `--deployment-id` | string | Specific deployment ID |
| `--watch` | boolean | Watch status updates |

### Examples

```bash
# Get latest deployment status
pipeops deploy status --project my-app

# Watch deployment progress
pipeops deploy status --project my-app --watch

# Specific deployment
pipeops deploy status \
  --project my-app \
  --deployment-id dep_123
```

---

## `pipeops deploy logs`

View deployment logs.

### Usage

```bash
pipeops deploy logs [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--project` | string | Project name (required) |
| `--deployment-id` | string | Specific deployment ID |
| `--follow` | boolean | Follow logs in real-time |

### Examples

```bash
# View latest deployment logs
pipeops deploy logs --project my-app

# Follow deployment logs
pipeops deploy logs --project my-app --follow

# Specific deployment
pipeops deploy logs \
  --project my-app \
  --deployment-id dep_123
```

---

## `pipeops deploy pipeline`

Manage deployment pipelines.

### Usage

```bash
pipeops deploy pipeline [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--project` | string | Project name (required) |
| `--trigger` | boolean | Trigger the pipeline |
| `--status` | boolean | Show pipeline status |

### Examples

```bash
# Trigger pipeline
pipeops deploy pipeline --project my-app --trigger

# Check pipeline status
pipeops deploy pipeline --project my-app --status
```

---

## Related Documentation

- [Project Deployment (Web UI)](/docs/projects/project-deployment)
- [Deployment History](/docs/projects/project-history)
- [Rollback](/docs/projects/rollback)
- [Project Commands](/docs/cli/commands/projects)
