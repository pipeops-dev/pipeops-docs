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

## Step 3: Deploy Your Application

Once your project is created, deploy it:

```bash
pipeops deploy create --project my-app
```

Monitor the deployment progress:

```bash
pipeops deploy status --project my-app
```

View deployment logs in real-time:

```bash
pipeops deploy logs --project my-app --follow
```

## Step 4: View Your Deployed Application

Get project information including the deployment URL:

```bash
pipeops project list --json | jq '.[] | select(.name=="my-app")'
```

Or view project details in the web UI:

```bash
# The CLI will show you the project URL in the output
```

## Common Workflows

### Deploying Updates

After making changes to your code and pushing to Git:

```bash
# Trigger a new deployment
pipeops deploy create --project my-app --branch main

# Or use the pipeline command
pipeops deploy pipeline --project my-app --trigger
```

### Viewing Logs

View project logs:

```bash
# Recent logs
pipeops project logs --project my-app

# Follow logs in real-time
pipeops project logs --project my-app --follow

# Filter logs
pipeops project logs --project my-app --since 1h
```

View deployment logs:

```bash
# Latest deployment logs
pipeops deploy logs --project my-app

# Specific deployment
pipeops deploy logs --project my-app --deployment-id abc123
```

### Managing Environment Variables

Set environment variables:

```bash
pipeops project env set --project my-app \
  --key DATABASE_URL \
  --value "postgresql://user:pass@host:5432/db"
```

List environment variables:

```bash
pipeops project env list --project my-app
```

### Checking Status

Check overall system status:

```bash
pipeops status
```

Check project status:

```bash
pipeops project list
```

Check deployment status:

```bash
pipeops deploy status --project my-app
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
export PIPEOPS_PROJECT="my-app"
pipeops deploy create --project $PIPEOPS_PROJECT
```

### Alias Common Commands

Create shell aliases for frequently used commands:

```bash
alias ppo='pipeops'
alias ppo-deploy='pipeops deploy create'
alias ppo-logs='pipeops project logs --follow'
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
| Create Project | `pipeops project create` | Projects > New Project |
| Deploy | `pipeops deploy create` | Project > Deploy |
| View Logs | `pipeops project logs --follow` | Project > Logs |
| Manage Servers | `pipeops server list` | Servers Dashboard |
| Environment Variables | `pipeops project env set` | Project > Settings > Environment |

## Example: Complete Workflow

Here's a complete workflow from authentication to deployment:

```bash
# 1. Authenticate
pipeops auth login

# 2. Create a project
pipeops project create \
  --name my-node-app \
  --repo https://github.com/myuser/node-app \
  --branch main \
  --framework nodejs

# 3. Set environment variables
pipeops project env set --project my-node-app \
  --key NODE_ENV \
  --value production

# 4. Deploy
pipeops deploy create --project my-node-app

# 5. Monitor deployment
pipeops deploy logs --project my-node-app --follow

# 6. Check status
pipeops deploy status --project my-node-app
```

You're now ready to use the PipeOps CLI effectively! Explore the other sections of the documentation to learn about advanced features and workflows.
