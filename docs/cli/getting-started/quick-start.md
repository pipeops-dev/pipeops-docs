---
sidebar_position: 2
title: Quick Start
---

# Quick Start Guide

This guide will help you get up and running with the PipeOps CLI in minutes. You'll learn how to authenticate, create a project, and deploy your first application.

## Prerequisites

- PipeOps CLI installed ([Installation Guide](/docs/cli/getting-started/installation))
- A PipeOps account ([Sign up here](https://console.pipeops.io/auth/signup))
- A Git repository with your application code

## Step 1: Authentication

First, authenticate with your PipeOps account:

```bash
pipeops auth login
```

This will:
1. Open your browser for OAuth authentication
2. Prompt you to authorize the CLI
3. Save your authentication token locally

You should see output similar to:

```
Opening browser for authentication...
✓ Successfully authenticated as user@example.com
```

### Verify Authentication

Check your authentication status:

```bash
pipeops auth status
```

View your account information:

```bash
pipeops auth me
```

## Step 2: Create Your First Project

List your existing projects:

```bash
pipeops project list
```

Create a new project:

```bash
pipeops project create
```

The CLI will interactively ask you for:
- Project name
- Git repository URL
- Branch to deploy
- Environment variables (optional)
- Build configuration

Alternatively, create a project with flags:

```bash
pipeops project create \
  --name my-app \
  --repo https://github.com/username/my-app \
  --branch main \
  --framework nodejs
```

## Step 3: View Your Projects

Once authenticated, view your projects:

```bash
pipeops list
```

Get detailed status for a specific project:

```bash
pipeops status proj-123
```

View project logs in real-time:

```bash
pipeops logs proj-123 --follow
```

## Step 4: Deploy Addons

You can deploy addons (like databases) to your existing projects:

```bash
# List available addons
pipeops list --addons

# Deploy an addon to a project
pipeops deploy --addon postgres --project proj-123
```

:::note
For creating new projects and deploying application code, use the [Web UI](https://app.pipeops.io) or the `pipeops deploy pipeline` command for local directory deployments.
:::

## Common Workflows

### Monitoring Projects

View project status and logs:

```bash
# Check project status
pipeops status proj-123

# View logs in real-time
pipeops logs proj-123 --follow

# View last 100 lines of logs
pipeops logs proj-123 --lines 100
```

### Deploying Addons

Deploy addons like databases to your projects:

```bash
# List available addons
pipeops list --addons

# Deploy an addon
pipeops deploy --addon postgres --project proj-123

# Deploy with environment variables
pipeops deploy --addon redis --project proj-123 --env REDIS_PASSWORD=secret

# List addon deployments
pipeops list --deployments --project proj-123
```

### Viewing Logs

View project logs:

```bash
# Recent logs
pipeops logs proj-123

# Follow logs in real-time
pipeops logs proj-123 --follow

# Filter logs by service
pipeops logs proj-123 --service web-service

# View last 100 lines
pipeops logs proj-123 --lines 100
```

### Checking Status

Check overall system status:

```bash
pipeops status
```

Check project status:

```bash
pipeops list
```

Check specific project status:

```bash
pipeops status proj-123
```

## Using JSON Output

All commands support `--json` flag for machine-readable output:

```bash
# List projects in JSON format
pipeops project list --json

# Use with jq for filtering
pipeops project list --json | jq '.[] | select(.status=="running")'
```

This is useful for:
- Scripting and automation
- CI/CD pipelines
- Integration with other tools

## Next Steps

### Learn More About Commands

- **[Authentication Commands](/docs/cli/commands/authentication)**: Manage your account and sessions
- **[Project Commands](/docs/cli/commands/projects)**: Full project lifecycle management
- **[Deployment Commands](/docs/cli/commands/deployments)**: Advanced deployment operations
- **[Server Commands](/docs/cli/commands/servers)**: Server management and provisioning

### Advanced Usage

- **[Configuration](/docs/cli/getting-started/configuration)**: Customize CLI behavior
- **[Docker Integration](/docs/cli/advanced/docker)**: Use CLI in containers
- **[CI/CD Integration](/docs/cli/advanced/cicd)**: Automate deployments
- **[Agent Management](/docs/cli/commands/agents)**: Manage PipeOps agents

### Get Help

- **Command Help**: Run `pipeops <command> --help` for detailed information
- **Troubleshooting**: Check the [Troubleshooting Guide](/docs/cli/reference/troubleshooting)
- **Community**: Join our [Slack community](https://join.slack.com/t/pipeopscommunity/shared_invite/zt-23gmjrl0k-Pzm2cBgIMTsUu5Az73PYKg)
- **Support**: Visit [PipeOps Support](https://pipeops.io/support)

## Tips and Best Practices

### Use Environment Variables

Store sensitive information in environment variables instead of hardcoding:

```bash
export PIPEOPS_PROJECT="proj-123"
pipeops status $PIPEOPS_PROJECT
```

### Using Aliases

Create shell aliases for frequently used commands:

```bash
alias ppo='pipeops'
alias ppo-status='pipeops status'
alias ppo-logs='pipeops logs --follow'
alias ppo-list='pipeops list'
```

Add these to your `~/.bashrc` or `~/.zshrc`.

### Use Tab Completion

Enable tab completion for the CLI (if supported):

```bash
# Bash
pipeops completion bash > /etc/bash_completion.d/pipeops

# Zsh
pipeops completion zsh > "${fpath[1]}/_pipeops"
```

### Keep CLI Updated

Regularly update the CLI to get the latest features:

```bash
pipeops update
```

## CLI vs Web UI Comparison

| Task | CLI Command | Web UI |
|------|-------------|--------|
| Create Project | Use Web UI | Projects > New Project |
| View Projects | `pipeops list` | Projects Dashboard |
| Deploy Addons | `pipeops deploy --addon <addon>` | Project > Addons |
| View Logs | `pipeops logs --follow` | Project > Logs |
| Manage Servers | `pipeops server list` | Servers Dashboard |
| Check Status | `pipeops status` | Project > Overview |

## Example: Complete Workflow

Here's a complete workflow from authentication to monitoring:

```bash
# 1. Authenticate
pipeops auth login

# 2. List your projects
pipeops list

# 3. Check project status
pipeops status proj-123

# 4. View logs in real-time
pipeops logs proj-123 --follow

# 5. List available addons
pipeops list --addons

# 6. Deploy an addon
pipeops deploy --addon postgres --project proj-123

# 7. List addon deployments
pipeops list --deployments --project proj-123
```

You're now ready to use the PipeOps CLI effectively! Explore the other sections of the documentation to learn about advanced features and workflows.
