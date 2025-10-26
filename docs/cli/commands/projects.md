---
sidebar_position: 3
title: Project Commands
---

# Project Commands

The `pipeops project` commands manage the full lifecycle of your projects - from creation to deployment monitoring and configuration.

## `pipeops project list`

List all projects in your PipeOps account.

### Usage

```bash
pipeops project list [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--status` | string | Filter by status (running, stopped, deploying, failed) |
| `--limit` | int | Limit number of results |
| `--sort` | string | Sort by field (name, created, updated) |

### Examples

```bash
# List all projects
pipeops project list

# Filter by status
pipeops project list --status running

# JSON output
pipeops project list --json

# With jq filtering
pipeops project list --json | jq '.[] | select(.status=="running")'
```

---

## `pipeops project create`

Create a new project.

### Usage

```bash
pipeops project create [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--name` | string | Project name (required in non-interactive mode) |
| `--repo` | string | Git repository URL |
| `--branch` | string | Git branch (default: main) |
| `--framework` | string | Framework type (nodejs, python, go, etc.) |
| `--env` | string | Environment variables (KEY=VALUE) (repeatable) |

### Examples

```bash
# Interactive mode
pipeops project create

# Non-interactive with flags
pipeops project create \
  --name my-app \
  --repo https://github.com/user/repo \
  --branch main \
  --framework nodejs

# With environment variables
pipeops project create \
  --name my-app \
  --repo https://github.com/user/repo \
  --env NODE_ENV=production \
  --env PORT=3000
```

**See also**: [Web UI Project Creation](/docs/projects/project-overview)

---

## `pipeops project logs`

View project logs.

### Usage

```bash
pipeops project logs [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--project` | string | Project name (required) |
| `--follow` | boolean | Follow logs in real-time |
| `--since` | string | Show logs since duration (e.g., 1h, 30m) |
| `--tail` | int | Number of lines to show from end (default: 100) |

### Examples

```bash
# View recent logs
pipeops project logs --project my-app

# Follow logs in real-time
pipeops project logs --project my-app --follow

# Logs from last hour
pipeops project logs --project my-app --since 1h

# Last 50 lines
pipeops project logs --project my-app --tail 50
```

**See also**: [Web UI Project Logs](/docs/projects/logs-and-events)

---

## `pipeops project env`

Manage project environment variables.

### Usage

```bash
pipeops project env <command> [flags]
```

### Subcommands

#### `env list`
List all environment variables.

```bash
pipeops project env list --project my-app
```

#### `env set`
Set an environment variable.

```bash
pipeops project env set \
  --project my-app \
  --key DATABASE_URL \
  --value "postgresql://..."
```

#### `env delete`
Delete an environment variable.

```bash
pipeops project env delete \
  --project my-app \
  --key DATABASE_URL
```

---

## Related Documentation

- [Project Overview (Web UI)](/docs/projects/project-overview)
- [Project Deployment](/docs/projects/project-deployment)
- [Deployment Commands](/docs/cli/commands/deployments)
