---
sidebar_position: 1
slug: cli/overview
title: CLI Overview
---

# PipeOps CLI Overview

The PipeOps Command Line Interface (CLI) is a powerful tool that enables you to manage your entire PipeOps infrastructure directly from your terminal. Whether you're deploying applications, managing servers, or automating workflows, the CLI provides a fast and efficient way to interact with the PipeOps platform.

## Why Use the PipeOps CLI?

- **Speed and Efficiency**: Execute commands faster than navigating through the web interface
- **Automation**: Integrate PipeOps operations into your CI/CD pipelines and scripts
- **Developer-Friendly**: Designed for developers who prefer command-line workflows
- **Cross-Platform**: Native support for Linux, macOS, Windows, and FreeBSD
- **Secure**: OAuth authentication with PKCE for device-friendly login
- **Rich Output**: Real-time status updates, formatted output, and JSON mode for scripting

## Key Features

### Authentication & Security
- Secure OAuth authentication with PKCE flow
- Token-based session management
- Multi-account support

### Project Management
- Create and manage projects
- View project logs and status
- Configure project settings

### Deployment Operations
- Deploy applications with a single command
- Manage deployment pipelines
- View deployment logs and status
- Monitor deployments in real-time

### Server Management
- List and manage servers
- Provision new server environments
- Configure server settings

### Agent Management
- Install PipeOps agents on your infrastructure
- Set up and manage Kubernetes clusters
- Join worker nodes to clusters
- View cluster information

### Developer Experience
- Real-time progress indicators
- Colored and formatted output
- JSON output mode for scripting
- Comprehensive help system
- Auto-update functionality

## Command Categories

The PipeOps CLI organizes commands into logical categories:

- **Authentication** (`pipeops auth`) - Login, logout, and account management
- **Projects** (`pipeops project`) - Project lifecycle management
- **Deployments** (`pipeops deploy`) - Deployment operations and pipeline management
- **Servers** (`pipeops server`) - Server provisioning and management
- **Agents** (`pipeops agent`) - Agent installation and cluster management
- **Utilities** - Status checks, version info, updates, and proxy management

## Getting Started

To get started with the PipeOps CLI:

1. **[Install the CLI](/docs/cli/getting-started/installation)** - Quick installation on any platform
2. **[Quick Start Guide](/docs/cli/getting-started/quick-start)** - Deploy your first project using the CLI
3. **[Configuration](/docs/cli/getting-started/configuration)** - Configure the CLI for your environment

## Next Steps

- **New to PipeOps?** Start with the [Quick Start Guide](/docs/cli/getting-started/quick-start)
- **Need Command Reference?** Check the [Commands Overview](/docs/cli/commands/overview)
- **Advanced Usage?** Explore [Docker Integration](/docs/cli/advanced/docker) and [CI/CD Integration](/docs/cli/advanced/cicd)
- **Having Issues?** Visit the [Troubleshooting Guide](/docs/cli/reference/troubleshooting)

## CLI vs Web UI

The PipeOps CLI and Web UI provide complementary ways to interact with the platform:

| Feature | CLI | Web UI |
|---------|-----|--------|
| **Speed** | Fast command execution | Visual navigation |
| **Automation** | Scriptable, CI/CD ready | Manual workflows |
| **Learning Curve** | Command syntax | Visual interface |
| **Use Cases** | Development, automation, scripting | Monitoring, exploration, configuration |

Many users find it beneficial to use both: the Web UI for exploration and monitoring, and the CLI for day-to-day development and automation tasks.

## Support and Community

- **Documentation**: You're here! Explore the CLI section for comprehensive guides
- **GitHub**: [pipeops-dev on GitHub](https://github.com/pipeops-dev)
- **Community**: Join our [Slack Community](https://join.slack.com/t/pipeopscommunity/shared_invite/zt-23gmjrl0k-Pzm2cBgIMTsUu5Az73PYKg)
- **Support**: Visit [PipeOps Support](https://pipeops.io/support)

Ready to dive in? Head to the [Installation Guide](/docs/cli/getting-started/installation) to get started!
