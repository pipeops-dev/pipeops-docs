---
sidebar_position: 11
slug: pipeops-cli
title: PipeOps CLI
---

# PipeOps CLI

The PipeOps CLI lets you inspect PipeOps resources from your terminal. This page lists the commands that are currently verified for read/list workflows.

For automation, prefer JSON output:

```bash
pipeops <command> --json
```

If your account has multiple workspaces, set the workspace explicitly before running workspace-scoped commands:

```bash
export PIPEOPS_WORKSPACE_UUID=<workspace-uuid>
```

You can get the workspace UUID from:

```bash
pipeops workspace list --json
```

## Authentication

```bash
pipeops login
pipeops status --json
pipeops me --json
```

Use `pipeops login` to authenticate through the browser. Use `status` and `me` to verify the active CLI session.

## Workspaces

```bash
pipeops workspace list --json
pipeops workspace get <workspace-uuid> --json
```

`workspace list` returns the workspaces available to your account. `workspace get` returns details for one workspace.

## Projects

```bash
pipeops project list --json
pipeops list --json
pipeops project get <project-id> --json
pipeops project env get <project-id> --json
pipeops project deployments <project-id> --json
pipeops project deployment-history <project-id> --json
```

`pipeops list` is a top-level shortcut for listing projects. `project env get` returns the project's environment variables as key/value pairs.

## Environments

```bash
pipeops environment list --json
pipeops environment get <environment-id> --json
```

`environment list` returns environments in the selected workspace. `environment get` returns one environment by UUID or ID.

## Add-ons

Use `pipeops addons` to list add-ons that can be deployed from the PipeOps catalog:

```bash
pipeops addons --json
pipeops addons available --json
pipeops addons catalog --json
pipeops addons categories --json
pipeops addons info <addon-id> --json
```

Use `pipeops addons list` to list add-ons already deployed in your current workspace:

```bash
pipeops addons list --json
pipeops addons ls --json
pipeops addons deployments --json
pipeops addons deployment get <deployment-id> --json
```

## Servers

```bash
pipeops server list --json
pipeops server status <server-id> --json
pipeops server connection <server-id> --json
pipeops server cost <server-id> --json
```

These commands return servers in the current workspace, server details, connection status, and cost allocation data. If OpenCost does not have allocation data yet, `server cost` returns a structured JSON response with `available: false`.

## Service account tokens

```bash
pipeops token list --json
pipeops token get <token-id> --json
```

These commands list service account tokens for the selected workspace and return details for a single token.

## MCP setup

Use the CLI to discover the hosted PipeOps MCP endpoint and copy client setup instructions:

```bash
pipeops mcp
pipeops mcp --json
```

The command does not expose your CLI login token. Create a dedicated service token and follow the [PipeOps MCP guide](/docs/integrations/pipeops-mcp).

## Removed placeholder commands

The following placeholder commands are not currently available in the CLI:

```bash
pipeops connect
pipeops proxy
pipeops exec
pipeops shell
```
