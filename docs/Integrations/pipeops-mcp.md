---
slug: /integrations/pipeops-mcp
sidebar_position: 0
title: Connect AI assistants with PipeOps MCP
description: "Connect Codex, ChatGPT, Claude, Cursor, VS Code, Gemini CLI, Windsurf, and Zed to PipeOps through the hosted MCP server."
---

# Connect AI assistants with PipeOps MCP

PipeOps MCP lets AI assistants inspect and manage resources in your PipeOps account. The hosted server exposes projects, deployments, environments, add-ons, servers, workspaces, teams, registries, and billing operations as Model Context Protocol (MCP) tools.

You do not need to install or run a local MCP server.

| Setting | Value |
| --- | --- |
| Name | `pipeops` |
| MCP endpoint | `https://mcp.pipeops.app/mcp` |
| Transport | Streamable HTTP |
| Recommended authentication | OAuth |
| Alternative authentication | Bearer service token |

## Find PipeOps MCP in the Console

1. Sign in to the [PipeOps Console](https://console.pipeops.io/).
2. Select the workspace you want the assistant to access.
3. Open **Developer Tools** from the dashboard sidebar.
4. Select **PipeOps MCP**.

You can also open [Developer Tools](https://console.pipeops.io/dashboard/developer-tools) directly. The **PipeOps MCP** card opens this setup guide.

To create or revoke credentials for an MCP client, open [Integrations → Service Tokens](https://console.pipeops.io/dashboard/integrations?cloudIntegrations=tokens). If **Service Tokens** is not visible, confirm that you have permission to manage integrations for the workspace or contact PipeOps support.

## Before you connect

Create a dedicated service token for your AI client:

1. Open [Integrations → Service Tokens](https://console.pipeops.io/dashboard/integrations?cloudIntegrations=tokens).
2. Select **Create Service Token**.
3. Create a token with `api:read` for read-only tools.
4. Add `api:write` only if the client needs to deploy, restart, stop, create, update, or delete resources.
5. Copy the token when it is shown. Store it securely because it should not be pasted into an AI conversation or committed to source control.

:::tip Least privilege
Start with `api:read`. Create a separate, short-lived token for write access instead of granting `api:full` to a general-purpose assistant.
:::

## Choose an authentication method

### OAuth (recommended)

Use OAuth when your client supports remote MCP authorization. Add the PipeOps MCP endpoint and select **Connect**, **Sign in**, or **Authorize**. The client discovers the PipeOps authorization endpoints automatically.

The PipeOps authorization page asks for the dedicated service token you created. This one-time exchange happens on `https://mcp.pipeops.app`; the AI client does not receive or store the raw PipeOps token. The client receives short-lived OAuth credentials instead.

OAuth access is read-only by default. If the client lets you select scopes, request `api:write` only when you want it to expose mutating tools. The consent page shows the requested access before approval.

### Bearer service token

Use a static Bearer token when your client supports custom HTTP headers or environment-variable secrets. The client sends the service token directly to PipeOps MCP on each request. Prefer an environment variable, password input, or client secret store over a token written directly in a configuration file.

## Client compatibility

| Client | OAuth | Bearer token | Recommended setup |
| --- | --- | --- | --- |
| ChatGPT | Yes | No custom static header | OAuth |
| Claude web/Desktop custom connector | Yes | No custom static header | OAuth |
| Cursor | Yes | Client support varies | OAuth |
| Codex CLI/app | Yes | Yes | Bearer token or OAuth |
| Claude Code | Yes | Yes | Bearer header with environment variable |
| VS Code / GitHub Copilot | Yes | Yes | Bearer header with secure input |
| Gemini CLI | Yes | Yes | Bearer header with environment variable |
| Windsurf | Yes | Yes | Bearer header with environment variable |
| Zed | Remote MCP | Yes | Bearer header |

Client menus and availability can vary by version, plan, or organization policy. The linked client documentation is the source of truth for those product-specific requirements.

## ChatGPT

ChatGPT custom MCP apps use the OAuth flow:

1. Open **Settings → Apps**. In a managed workspace, an administrator may need to open **Workspace settings → Apps**.
2. Create a custom app or connector.
3. Enter `PipeOps` as the name and `https://mcp.pipeops.app/mcp` as the MCP endpoint.
4. Select OAuth when authentication options are shown, then connect.
5. On the PipeOps authorization page, paste the dedicated service token and approve the requested access.

See [ChatGPT developer mode and custom MCP apps](https://help.openai.com/en/articles/12584461) for current availability and controls.

## Claude web and Claude Desktop

Claude custom connectors use OAuth:

1. Open **Settings → Connectors**.
2. Select **Add custom connector**.
3. Enter `PipeOps` and `https://mcp.pipeops.app/mcp`.
4. Select **Connect**, complete the PipeOps authorization page, and approve access.

Team or Enterprise owners may need to add the connector before members can use it. See [Anthropic's remote MCP connector guide](https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp).

## Cursor

Add a remote MCP server named `pipeops` with URL `https://mcp.pipeops.app/mcp`, then use Cursor's **Connect** or **Login** action to complete OAuth. See [Cursor's MCP documentation](https://docs.cursor.com/context/model-context-protocol) for the current settings UI and project configuration format.

## Codex

For a static service token, store it in an environment variable:

```bash
export PIPEOPS_TOKEN="sat_your_token_here"
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

Start a new Codex task after adding the server so its PipeOps tools are loaded. See the [Codex CLI repository](https://github.com/openai/codex) for current MCP commands and OAuth support.

## Claude Code

Keep the token in `PIPEOPS_TOKEN`, then add this user-scoped remote server:

```bash
claude mcp add-json --scope user pipeops \
  '{"type":"http","url":"https://mcp.pipeops.app/mcp","headers":{"Authorization":"Bearer ${PIPEOPS_TOKEN}"}}'
```

See [Claude Code MCP configuration](https://docs.anthropic.com/en/docs/claude-code/mcp).

## VS Code and GitHub Copilot

Add this to your user or workspace `mcp.json`. VS Code prompts for the token and stores it as a password input instead of placing it in source control:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "pipeops-token",
      "description": "PipeOps service token",
      "password": true
    }
  ],
  "servers": {
    "pipeops": {
      "type": "http",
      "url": "https://mcp.pipeops.app/mcp",
      "headers": {
        "Authorization": "Bearer ${input:pipeops-token}"
      }
    }
  }
}
```

See [VS Code MCP configuration](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

## Gemini CLI

Add PipeOps to the `mcpServers` object in Gemini CLI settings:

```json
{
  "mcpServers": {
    "pipeops": {
      "httpUrl": "https://mcp.pipeops.app/mcp",
      "headers": {
        "Authorization": "Bearer $PIPEOPS_TOKEN"
      }
    }
  }
}
```

Export `PIPEOPS_TOKEN` before starting Gemini CLI. See [Gemini CLI MCP servers](https://geminicli.com/docs/tools/mcp-server/).

## Windsurf

Add PipeOps to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "pipeops": {
      "serverUrl": "https://mcp.pipeops.app/mcp",
      "headers": {
        "Authorization": "Bearer ${env:PIPEOPS_TOKEN}"
      }
    }
  }
}
```

See [Windsurf MCP configuration](https://docs.windsurf.com/windsurf/cascade/mcp).

## Zed

Add PipeOps to your Zed settings:

```json
{
  "context_servers": {
    "pipeops": {
      "url": "https://mcp.pipeops.app/mcp",
      "headers": {
        "Authorization": "Bearer sat_your_token_here"
      }
    }
  }
}
```

Zed's public configuration currently documents literal header values. This places the token in your user settings, so protect the file and do not use a project-shared configuration. See [Zed MCP servers](https://zed.dev/docs/ai/mcp).

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

Start with these read-only prompts:

```text
What's on my PipeOps account?
List my PipeOps projects and their current deployment status.
Show the environments in my current workspace.
```

### Service-token restrictions

Some sensitive operations remain unavailable even when a token has `api:write` or `api:full`:

- Service tokens cannot list, create, update, rotate, or revoke other service tokens. Manage them in the PipeOps Console.
- Project environment-value dumps and environment-variable mutations are blocked for service-token authentication.
- Workspace creation, deletion, SSO changes, billing-email changes, cluster credential access, team membership changes, and observability access are blocked.

These restrictions apply to the authenticated request even when the MCP server exposes a similarly named tool.

## Security recommendations

- Start with `api:read` and enable write access only for a specific task.
- Review tool calls before approving deploy, restart, stop, create, update, delete, billing, or invitation operations.
- Use a separate token per AI client so you can revoke one integration without affecting others.
- Never paste a service token into the assistant's chat. Enter it only in the PipeOps authorization page or the client's protected secret input.
- Revoke tokens you no longer use and rotate any token that may have been exposed.

## Troubleshooting

### OAuth does not open

Confirm the endpoint is exactly `https://mcp.pipeops.app/mcp`. Remove and re-add the connection so the client repeats protected-resource and authorization-server discovery. Your client must support remote Streamable HTTP MCP and OAuth.

### The server is unauthorized

For OAuth, reconnect or sign in again. For Bearer-token setup, check that `PIPEOPS_TOKEN` is exported in the environment that starts your MCP client, then restart the client. Confirm that the service token has not expired or been revoked.

### A tool is unavailable or forbidden

An OAuth connection with only `api:read` intentionally hides mutating tools. The underlying service token may also be missing a required scope, the operation may be intentionally unavailable to service-token authentication, or the resource may belong to a different workspace.

### Revoke access

Disconnect the MCP integration in your AI client to remove its stored OAuth credentials. To guarantee that all server-side access stops immediately, also open [Integrations → Service Tokens](https://console.pipeops.io/dashboard/integrations?cloudIntegrations=tokens) and revoke the underlying token. Remove `PIPEOPS_TOKEN` from client environments and settings if you used static Bearer authentication.
