---
sidebar_position: 1
title: Commands Overview
---

# PipeOps CLI Commands Overview

The PipeOps CLI provides a comprehensive set of commands for managing your infrastructure, applications, and deployments. All commands follow a consistent structure and support common flags for output formatting and verbosity.

## Command Structure

```bash
pipeops <category> <command> [options] [flags]
```

### Examples

```bash
pipeops auth login
pipeops project create --name my-app
pipeops deploy logs --project my-app --follow
```

## Command Categories

### Authentication Commands

Manage authentication and user accounts.

```bash
pipeops auth <command>
```

| Command | Description |
|---------|-------------|
| `login` | Authenticate with PipeOps using OAuth |
| `logout` | Sign out and remove local credentials |
| `status` | Check current authentication status |
| `me` | Display current user information |

**Learn more**: [Authentication Commands](/docs/cli/commands/authentication)

### Project Commands

Manage project lifecycle and configuration.

```bash
pipeops project <command>
```

| Command | Description |
|---------|-------------|
| `list` | List all projects |
| `create` | Create a new project |
| `logs` | View project logs |
| `env` | Manage environment variables |

**Learn more**: [Project Commands](/docs/cli/commands/projects)

### Deployment Commands

Handle deployments and pipeline operations.

```bash
pipeops deploy <command>
```

| Command | Description |
|---------|-------------|
| `create` | Create a new deployment |
| `status` | Check deployment status |
| `logs` | View deployment logs |
| `pipeline` | Manage deployment pipelines |

**Learn more**: [Deployment Commands](/docs/cli/commands/deployments)

### Server Commands

Manage servers and infrastructure.

```bash
pipeops server <command>
```

| Command | Description |
|---------|-------------|
| `list` | List all servers |
| `create` | Provision a new server |
| `delete` | Remove a server |
| `info` | Get server details |

**Learn more**: [Server Commands](/docs/cli/commands/servers)

### Agent Commands

Install and manage PipeOps agents on your infrastructure.

```bash
pipeops agent <command>
```

| Command | Description |
|---------|-------------|
| `install` | Install PipeOps agent and Kubernetes cluster |
| `join` | Join a worker node to an existing cluster |
| `info` | Display cluster information |

**Learn more**: [Agent Commands](/docs/cli/commands/agents)

### Utility Commands

General utility and system commands.

| Command | Description |
|---------|-------------|
| `status` | Overall system status |
| `version` | Display CLI version |
| `update` | Update CLI to latest version |
| `proxy` | Manage proxy connections |

## Global Flags

These flags work with all commands:

| Flag | Short | Description |
|------|-------|-------------|
| `--json` | - | Output in JSON format |
| `--verbose` | `-v` | Enable verbose output |
| `--quiet` | `-q` | Suppress non-essential output |
| `--help` | `-h` | Display help information |
| `--config` | - | Specify custom configuration file |

### Example Usage

```bash
# JSON output
pipeops project list --json

# Verbose mode
pipeops deploy create --project my-app --verbose

# Quiet mode
pipeops deploy create --project my-app --quiet

# Custom config
pipeops --config /path/to/config.json project list
```

## Common Patterns

### Interactive vs Non-Interactive

Most commands support both interactive and non-interactive modes:

**Interactive** (prompts for input):
```bash
pipeops project create
```

**Non-Interactive** (all options via flags):
```bash
pipeops project create --name my-app --repo https://github.com/user/repo
```

### Output Formats

#### Text Format (Default)

Human-readable formatted output:

```bash
pipeops project list
```

```
NAME        STATUS    UPDATED
my-app      running   2024-01-15 10:30:00
other-app   stopped   2024-01-14 15:20:00
```

#### JSON Format

Machine-readable JSON for scripting:

```bash
pipeops project list --json
```

```json
[
  {
    "name": "my-app",
    "status": "running",
    "updated": "2024-01-15T10:30:00Z"
  }
]
```

### Filtering and Selection

Use command-specific flags to filter results:

```bash
# Filter by status
pipeops project list --status running

# Filter by date
pipeops deploy logs --since 1h

# Limit results
pipeops project list --limit 10
```

### Real-Time Updates

Some commands support following output in real-time:

```bash
# Follow logs
pipeops project logs --follow

# Watch deployment status
pipeops deploy status --watch
```

## Getting Help

### Command Help

Get help for any command:

```bash
# General help
pipeops --help

# Category help
pipeops auth --help
pipeops project --help

# Specific command help
pipeops project create --help
pipeops deploy logs --help
```

### Example Output

```bash
$ pipeops project --help

Manage PipeOps projects

Usage:
  pipeops project <command> [flags]

Available Commands:
  list        List all projects
  create      Create a new project
  logs        View project logs
  env         Manage environment variables

Flags:
  -h, --help   help for project

Global Flags:
      --json      Output in JSON format
  -v, --verbose   Enable verbose output
  -q, --quiet     Suppress non-essential output

Use "pipeops project <command> --help" for more information about a command.
```

## Command Aliases

Some commands have shorter aliases for convenience:

```bash
# Full command
pipeops project list

# Using common abbreviations (if supported)
pipeops proj list
```

## Exit Codes

The CLI uses standard exit codes:

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 130 | Interrupted by user (Ctrl+C) |

Use in scripts:

```bash
if pipeops deploy create --project my-app; then
  echo "Deployment succeeded"
else
  echo "Deployment failed with code $?"
fi
```

## Environment Variables

Commands respect environment variables for configuration:

```bash
# Set default project
export PIPEOPS_DEFAULT_PROJECT=my-app
pipeops deploy create  # Uses my-app automatically

# Set API endpoint
export PIPEOPS_API_URL=https://api.staging.pipeops.io
pipeops project list

# Set output format
export PIPEOPS_OUTPUT_FORMAT=json
pipeops project list  # Outputs JSON by default
```

See [Configuration](/docs/cli/getting-started/configuration) for more details.

## Scripting with the CLI

### Basic Script Example

```bash
#!/bin/bash
set -e  # Exit on error

# Authenticate
pipeops auth status || pipeops auth login

# Create project
PROJECT_NAME="my-app"
pipeops project create \
  --name "$PROJECT_NAME" \
  --repo "https://github.com/user/repo" \
  --branch main

# Deploy
pipeops deploy create --project "$PROJECT_NAME"

# Wait for deployment
while true; do
  STATUS=$(pipeops deploy status --project "$PROJECT_NAME" --json | jq -r '.status')
  if [ "$STATUS" = "success" ]; then
    echo "Deployment successful!"
    break
  elif [ "$STATUS" = "failed" ]; then
    echo "Deployment failed!"
    exit 1
  fi
  sleep 10
done
```

### Using JSON Output

```bash
# Get project count
COUNT=$(pipeops project list --json | jq 'length')
echo "You have $COUNT projects"

# Get running projects
pipeops project list --json | \
  jq -r '.[] | select(.status=="running") | .name'

# Get project URLs
pipeops project list --json | \
  jq -r '.[] | "\(.name): \(.url)"'
```

## Next Steps

Explore detailed documentation for each command category:

- **[Authentication Commands](/docs/cli/commands/authentication)** - Login, logout, and account management
- **[Project Commands](/docs/cli/commands/projects)** - Full project lifecycle
- **[Deployment Commands](/docs/cli/commands/deployments)** - Deploy and manage releases
- **[Server Commands](/docs/cli/commands/servers)** - Infrastructure management
- **[Agent Commands](/docs/cli/commands/agents)** - Agent and cluster management

Or continue learning:

- **[Configuration Guide](/docs/cli/getting-started/configuration)** - Customize CLI behavior
- **[Advanced Usage](/docs/cli/advanced/docker)** - Docker and CI/CD integration
- **[Troubleshooting](/docs/cli/reference/troubleshooting)** - Common issues and solutions
