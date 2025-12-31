---
sidebar_position: 4
title: Monitoring Commands
---

# Monitoring Commands

The PipeOps CLI provides commands for monitoring and viewing information about your projects and deployments.

:::note
The CLI currently focuses on **read operations** for monitoring projects. For deploying applications, use the [Web UI](/docs/projects/project-deployment).
:::



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
