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

Handle addon deployments and local directory deployments.

```bash
pipeops deploy <command>
```

| Command | Description |
|---------|-------------|
| `deploy` | Deploy addons to existing projects |
| `pipeline` | Deploy current directory to PipeOps |

**Learn more**: [Deployment Commands](/docs/cli/commands/deployments)

### Monitoring Commands

Monitor projects and view logs.

| Command | Description |
|---------|-------------|
| `list` | List projects, addons, or deployments |
| `status` | Check project or addon status |
| `logs` | View project logs |

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
pipeops list --json

# Verbose mode
pipeops status proj-123 --verbose

# Quiet mode
pipeops list --quiet

# Custom config
pipeops --config /path/to/config.json list
```

## Common Patterns

### Interactive vs Non-Interactive

Most commands support both interactive and non-interactive modes:

**Interactive** (prompts for input):
```bash
pipeops auth login
```

**Non-Interactive** (all options via flags):
```bash
pipeops list
pipeops status proj-123
```

### Output Formats

#### Text Format (Default)

Human-readable formatted output:

```bash
pipeops list
```

```
NAME        STATUS    UPDATED
my-app      running   2024-01-15 10:30:00
other-app   stopped   2024-01-14 15:20:00
```

#### JSON Format

Machine-readable JSON for scripting:

```bash
pipeops list --json
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
pipeops list --status running

# Limit results
pipeops list --limit 10

# View addon deployments
pipeops list --deployments --project proj-123
```

### Real-Time Updates

Some commands support following output in real-time:

```bash
# Follow logs
pipeops logs --follow

# Follow logs for specific project
pipeops logs proj-123 --follow
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
$ pipeops auth --help

Authenticate with PipeOps

Usage:
  pipeops auth <command> [flags]

Available Commands:
  login       Authenticate with PipeOps using OAuth
  logout      Sign out and remove local credentials
  status      Check current authentication status
  me          Display current user information

Flags:
  -h, --help   help for auth

Global Flags:
      --json      Output in JSON format
  -v, --verbose   Enable verbose output
  -q, --quiet     Suppress non-essential output

Use "pipeops auth <command> --help" for more information about a command.
```

## Command Aliases

Some commands have shorter aliases for convenience:

```bash
# Full command
pipeops list

# Using command shortcuts
pipeops logs proj-123 --follow
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
if pipeops status proj-123; then
  echo "Project is running"
else
  echo "Project check failed with code $?"
fi
```

## Environment Variables

Commands respect environment variables for configuration:

```bash
# Set default project
export PIPEOPS_DEFAULT_PROJECT=proj-123
pipeops status  # Uses proj-123 automatically

# Set API endpoint
export PIPEOPS_API_URL=https://api.staging.pipeops.io
pipeops list

# Set output format
export PIPEOPS_OUTPUT_FORMAT=json
pipeops list  # Outputs JSON by default
```

See [Configuration](/docs/cli/getting-started/configuration) for more details.

## Scripting with the CLI

### Basic Script Example

```bash
#!/bin/bash
set -e  # Exit on error

# Authenticate
pipeops auth status || pipeops auth login

# List projects
pipeops list

# Check project status
PROJECT_ID="proj-123"
pipeops status "$PROJECT_ID"

# View logs
pipeops logs "$PROJECT_ID" --lines 50
```

### Using JSON Output

```bash
# Get project count
COUNT=$(pipeops list --json | jq 'length')
echo "You have $COUNT projects"

# Get running projects
pipeops list --json | \
  jq -r '.[] | select(.status=="running") | .name'

# Get project URLs
pipeops list --json | \
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
