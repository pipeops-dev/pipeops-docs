---
slug: /integrations/pipeops-mcp
sidebar_position: 0
title: Connect AI assistants with PipeOps MCP
description: "Connect Codex and other MCP clients to your PipeOps account through the hosted PipeOps MCP server."
---

# Connect AI assistants with PipeOps MCP

PipeOps MCP lets AI assistants inspect and manage resources in your PipeOps account. The hosted server exposes projects, deployments, environments, add-ons, servers, workspaces, teams, registries, and billing operations as Model Context Protocol (MCP) tools.

You do not need to install or run a local MCP server.

| Setting        | Value                         |
| -------------- | ----------------------------- |
| MCP endpoint   | `https://mcp.pipeops.app/mcp` |
| Transport      | Streamable HTTP               |
| Authentication | Bearer service token          |

## Before you connect

Create a dedicated service token for your AI client:

1. Open **Developer Tools** in the [PipeOps Console](https://console.pipeops.io/dashboard/developer-tools).
2. Select **PipeOps MCP**.
3. Open [Integrations → Service Tokens](https://console.pipeops.io/dashboard/integrations?cloudIntegrations=tokens).
4. Create a token with `api:read` for read-only tools.
5. Add `api:write` only if the client needs to deploy, restart, stop, create, update, or delete resources.
6. Copy the token when it is shown. Store it securely because it should not be pasted into an AI conversation or committed to source control.

:::tip Least privilege
Start with `api:read`. Create a separate, short-lived token for write access instead of granting `api:full` to a general-purpose assistant.
:::

## Connect Codex

Store the token in an environment variable:

```bash
export PIPEOPS_TOKEN="your-service-token"
```

Register the hosted server:

```bash
codex mcp add pipeops \
  --url https://mcp.pipeops.app/mcp \
  --bearer-token-env-var PIPEOPS_TOKEN
```

Verify the saved configuration:

```bash
codex mcp get pipeops
```

Start a new Codex task after adding the server so its PipeOps tools are loaded. You can begin with read-only prompts such as:

```text
What's on my PipeOps account?
List my PipeOps projects and their current deployment status.
Show the environments in my current workspace.
```

Before allowing write operations, confirm that the service token includes `api:write`. PipeOps MCP marks mutating and destructive tools so compatible clients can request confirmation.

## Connect another MCP client

Use these connection values in any client that supports remote Streamable HTTP MCP servers:

- **Name:** `pipeops`
- **URL:** `https://mcp.pipeops.app/mcp`
- **Authorization header:** `Bearer <service-token>`

Configuration formats differ between MCP clients. Keep the token in the client's secret store or an environment variable when supported.

## Discover setup from the PipeOps CLI

Recent versions of the PipeOps CLI include a setup command:

```bash
pipeops mcp
```

For scripts or tooling that need the connection details:

```bash
pipeops mcp --json
```

The command prints setup instructions and public connection metadata. It never reads or prints your PipeOps login token.

## What can PipeOps MCP do?

Tool availability depends on the token scopes and the resources available in its workspace. Current tool groups include:

- Account and bound-workspace inspection
- Project creation, deployment, restart, stop, configuration, logs, and history
- Environment resource inspection
- Server details, connection status, and cost allocation
- Add-on catalog search, deployment, configuration, and domains
- External and public container registry discovery
- Billing plan, subscription, invoice, and card operations

Start with list and get operations before enabling write access for an assistant.

### Service-token restrictions

Some sensitive operations remain unavailable even when a token has `api:write` or `api:full`:

- Service tokens cannot list, create, update, rotate, or revoke other service tokens. Manage them in the PipeOps Console.
- Project environment-value dumps and environment-variable mutations are blocked for service-token authentication.
- Workspace creation, deletion, SSO changes, billing-email changes, cluster credential access, team membership changes, and observability access are blocked.

These restrictions apply to the authenticated request even when the MCP server exposes a similarly named tool.

## Troubleshooting

### The server is unauthorized

Check that `PIPEOPS_TOKEN` is exported in the environment that starts your MCP client, then restart the client. Confirm that the token has not expired or been revoked.

### A tool is unavailable or forbidden

The service token may be missing a required scope, or the operation may be intentionally unavailable to service-token authentication. Use `api:read` for supported read operations and `api:write` for supported changes. The token is also restricted to its workspace. See [Service-token restrictions](#service-token-restrictions).

### Revoke access

Open [Integrations → Service Tokens](https://console.pipeops.io/dashboard/integrations?cloudIntegrations=tokens) and revoke the token. Remove `PIPEOPS_TOKEN` from the client environment as well.
