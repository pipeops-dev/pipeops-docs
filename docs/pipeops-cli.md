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
pipeops project deployments <project-id> --json
pipeops project deployment-history <project-id> --json
```

`pipeops list` is a top-level shortcut for listing projects.

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
```

These commands return the servers available in the current workspace and details for a single server.

## Removed placeholder commands

The following placeholder commands are not currently available in the CLI:

```bash
pipeops connect
pipeops proxy
pipeops exec
pipeops shell
```

## Commands pending API or SDK support

The following read commands are intentionally not listed as working commands yet because they currently depend on API or SDK follow-up work:

- `pipeops environment list --json`
- `pipeops project env get <project-id> --json`
- `pipeops token list --json`
- `pipeops server connection <server-id> --json`
- `pipeops server cost <server-id> --json`

