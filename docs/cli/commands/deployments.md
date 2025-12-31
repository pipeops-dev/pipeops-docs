---
sidebar_position: 4
title: Deployment Commands
---

# Deployment Commands

The `pipeops deploy` commands handle addon deployment operations and local directory deployments.

:::note
The CLI currently focuses on **read operations** for monitoring projects and **addon deployments**. For project code deployments, use the [Web UI](/docs/projects/project-deployment) or the `pipeops deploy pipeline` command for local directory deployments.
:::

## `pipeops deploy`

Deploy addons to existing projects.

### Usage

```bash
pipeops deploy --addon <addon-id> --project <project-id> [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--addon` | string | Addon ID to deploy (required) |
| `--project` | string | Project ID (required or use linked project) |
| `--env` | map | Environment variables for the addon |

### Examples

```bash
# Deploy an addon to a project
pipeops deploy --addon postgres --project proj-123

# Deploy addon with environment variables
pipeops deploy --addon redis --project proj-123 --env REDIS_PASSWORD=secret

# Deploy addon to linked project
pipeops deploy --addon postgres --env POSTGRES_DB=myapp
```

**See also**: [List Available Addons](#listing-addons)

---

## `pipeops deploy pipeline`

Deploy the current directory to PipeOps using a linked project.

### Usage

```bash
pipeops deploy pipeline [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--source, -s` | string | Source directory to deploy (default: current directory) |
| `--name, -n` | string | Custom name for deployment |

### Examples

```bash
# Deploy current directory
pipeops deploy pipeline

# Deploy with custom source
pipeops deploy pipeline --source ./my-app

# Deploy with custom name
pipeops deploy pipeline --name "My App v2.0"
```

:::tip
Make sure you have linked a project first using `pipeops link`.
:::

---

## Monitoring Deployments

### Viewing Project Status

Check the status of your projects:

```bash
# Show status for linked project
pipeops status

# Show status for specific project
pipeops status proj-123

# Show status in JSON format
pipeops status proj-123 --json
```

### Viewing Project Logs

View and stream logs from your project services:

```bash
# View logs for linked project
pipeops logs

# View logs for specific project
pipeops logs proj-123

# Stream logs in real-time
pipeops logs --follow

# View last 100 lines
pipeops logs --lines 100

# Filter logs by service
pipeops logs --service web-service
```

### Listing Addon Deployments

List addon deployments for a project:

```bash
# List addon deployments for a project
pipeops list --deployments --project proj-123

# List addon deployments for linked project
pipeops list --deployments

# Output in JSON format
pipeops list --deployments --project proj-123 --json
```

### Listing Addons

View available addons that can be deployed:

```bash
# List all available addons
pipeops list --addons

# Get information about a specific addon
pipeops status --addon redis

# Output in JSON format
pipeops list --addons --json
```

---

## Related Documentation

- [Project Deployment (Web UI)](/docs/projects/project-deployment)
- [Deployment History](/docs/projects/project-history)
- [Rollback](/docs/projects/rollback)
- [Project Commands](/docs/cli/commands/projects)
