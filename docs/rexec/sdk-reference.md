---
sidebar_position: 3
title: SDK & API Reference
description: "Rexec sandboxes API surface, official SDKs, terminal WebSocket, errors, and registry links."
---

# Rexec SDK & API Reference

Official clients for the Rexec **sandbox** API (files + terminals). Shared REST + WebSocket surface across languages. **SDK version line: v1.0.1**.

Upstream (source of truth):  
[SDK.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK.md) · [SDK_GETTING_STARTED.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK_GETTING_STARTED.md) · [SDK_PUBLISHING.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK_PUBLISHING.md)

| | |
|--|--|
| **Hosted base URL** | `https://rexec.sh` |
| **Auth** | `Authorization: Bearer <token>` |
| **Monorepo** | [PipeOpsHQ/Rexec](https://github.com/PipeOpsHQ/Rexec) (`sdk/{js,python,go,rust,ruby,dotnet,java,php}`) |

---

## Available SDKs

| Language | Package | Install | Import notes |
|----------|---------|---------|--------------|
| **JS / TS** | [pipeops-rexec](https://www.npmjs.com/package/pipeops-rexec) | `npm install pipeops-rexec` | `import { RexecClient } from 'pipeops-rexec'` |
| **Python** | [pipeops-rexec](https://pypi.org/project/pipeops-rexec/) | `pip install pipeops-rexec` | `from rexec import RexecClient` |
| **Go** | [rexec-go](https://github.com/PipeOpsHQ/rexec-go) | `go get github.com/PipeOpsHQ/rexec-go@v1.0.1` | `import rexec "github.com/PipeOpsHQ/rexec-go"` |
| **Rust** | [pipeops-rexec](https://crates.io/crates/pipeops-rexec) | `cargo add pipeops-rexec` | `use rexec::{…}` |
| **Ruby** | [pipeops-rexec](https://rubygems.org/gems/pipeops-rexec) | `gem install pipeops-rexec` | `require "rexec"` |
| **C# / .NET** | [PipeOps.Rexec](https://www.nuget.org/packages/PipeOps.Rexec) | `dotnet add package PipeOps.Rexec` | `using Rexec;` |
| **Java / Kotlin** | `io.pipeops:rexec:1.0.1` | Maven/Gradle | `import io.pipeops.rexec.*` |
| **PHP** | [pipeopshq/rexec](https://packagist.org/packages/pipeopshq/rexec) | `composer require pipeopshq/rexec` | `use Rexec\RexecClient` |

**PHP fallback (VCS):**

```bash
composer config repositories.rexec-php vcs https://github.com/PipeOpsHQ/rexec-php
composer require pipeopshq/rexec:^1.0
```

---

## Auth

1. **API token** — Rexec UI → Settings → API Tokens (production).  
2. **Guest JWT** — `POST /api/auth/guest` with `{ "username", "email" }` (smoke tests only).

SDKs attach `Authorization: Bearer <token>` on REST and terminal WebSockets.

---

## Shared API surface (sandboxes)

### Sandboxes (`/api/containers`)

| Method | HTTP | Notes |
|--------|------|--------|
| **List** | `GET /api/containers` | Body often `{ containers: [...] \| null, count, limit }`. **SDKs return a plain array.** |
| **Create** | `POST /api/containers` `{ image, name? }` | May return `status: "creating"` (**async**). |
| **Get** | `GET /api/containers/:id` | Poll until `running` if you need a shell. |
| **Start** | `POST /api/containers/:id/start` | |
| **Stop** | `POST /api/containers/:id/stop` | |
| **Delete** | `DELETE /api/containers/:id` | |

### Files (per sandbox)

| Method | HTTP |
|--------|------|
| **List dir** | `GET /api/containers/:id/files/list?path=` |
| **Read** | `GET /api/containers/:id/files?path=` |
| **Write** | `POST /api/containers/:id/files` (content often base64) |
| **Mkdir** | `POST /api/containers/:id/files/mkdir` (language-dependent) |
| **Delete** | `DELETE /api/containers/:id/files?path=` |

### Terminal {#terminal}

| | |
|--|--|
| **Connect** | `wss://<host>/ws/terminal/:id?cols=&rows=` + Bearer |
| **Helpers** | `write`, `onData`, `resize` (JSON `{ type: "resize", cols, rows }`), `close` |

:::warning No primary HTTP exec()
Hosted Rexec does **not** document a first-class `exec()` RPC. Run commands via the **terminal WebSocket**.
:::

---

## Image aliases

| Prefer | Avoid on hosted |
|--------|-----------------|
| `ubuntu`, `ubuntu-24`, `debian`, `alpine`, … | `ubuntu:24.04`, arbitrary Hub tags |

Catalog: **`GET /api/images`**.

---

## Sandbox model

| Field | Description |
|-------|-------------|
| `id` | Sandbox id |
| `name` | Display name |
| `image` | Alias used at create |
| `status` | `creating` \| `running` \| `stopped` \| `error` |
| `created_at` / `started_at` | Timestamps |
| `labels` / `environment` | Optional maps |

### Lifecycle

```text
create → creating → running ⇄ stopped → delete
                 ↘ error
```

### List payload quirk

```json
{ "containers": [ /* or null */ ], "count": 0, "limit": 1 }
```

SDKs normalize so callers never special-case `null`.

---

## Client construction

| Lang | Construct | Sandboxes |
|------|-----------|-----------|
| **JS** | `new RexecClient({ baseURL, token })` | `client.containers.list()` / `.create({ image, name? })` |
| **Python** | `async with RexecClient(url, token)` | `await client.containers.list()` / `.create(image=…)` |
| **Go** | `rexec.NewClient(url, token)` | `client.Containers.List(ctx)` / `.Create(ctx, &…)` |
| **Rust** | `RexecClient::new(url, token)` | `client.containers().list().await` |
| **Ruby** | `Rexec::Client.new(url, token)` | `client.containers.list` / `.create(…)` |
| **.NET** | `new RexecClient(url, token)` | `await client.Containers.ListAsync()` |
| **Java** | `new RexecClient(url, token)` | `client.containers().list()` / `.create(…)` |
| **PHP** | `new Rexec\RexecClient($url, $token)` | `$client->containers()->list()` |

### Wait until running (pattern)

```typescript
async function waitRunning(client: RexecClient, id: string, ms = 60_000) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    const c = await client.containers.get(id);
    if (c.status === 'running') return c;
    if (c.status === 'error') throw new Error('sandbox failed');
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('timeout waiting for running');
}
```

---

## Errors

| SDK | Type |
|-----|------|
| JS | `RexecError` (`statusCode`, `message`) |
| Python | `RexecAPIError`, `RexecConnectionError` |
| Go | `*rexec.APIError` |
| Rust | `rexec::Error` |
| Ruby | `Rexec::APIError` |
| .NET / Java / PHP | `RexecException` |

---

## E2E smoke tests

In the monorepo:

```bash
cd scripts/sdk-e2e
# list → create(image: ubuntu) → get → delete
# Runners: test-js.mjs, test_py.py, go/, rust_e2e, test_rb.rb,
#          dotnet_e2e, java_e2e, test_php.php
```

---

## Registry & source links

| Resource | URL |
|----------|-----|
| Product | https://rexec.sh |
| In-app SDK docs | https://rexec.sh/docs/sdk |
| Monorepo | https://github.com/PipeOpsHQ/Rexec |
| npm | https://www.npmjs.com/package/pipeops-rexec |
| PyPI | https://pypi.org/project/pipeops-rexec/ |
| crates.io | https://crates.io/crates/pipeops-rexec |
| RubyGems | https://rubygems.org/gems/pipeops-rexec |
| NuGet | https://www.nuget.org/packages/PipeOps.Rexec |
| Maven | https://repo1.maven.org/maven2/io/pipeops/rexec/ |
| Go module | https://github.com/PipeOpsHQ/rexec-go |
| PHP source (Packagist) | https://github.com/PipeOpsHQ/rexec-php |
