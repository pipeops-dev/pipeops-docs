---
sidebar_position: 3
title: SDK & API Reference
description: "Rexec sandboxes API surface, official SDKs, terminal WebSocket, errors, and registry links."
---

# Rexec SDK & API Reference

Official clients for the Rexec **sandbox** API (files + terminals). Shared REST + WebSocket surface across languages. **SDK version line: v1.1.0+**.

Upstream (source of truth):  
[SDK.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK.md) · [SDK_GETTING_STARTED.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK_GETTING_STARTED.md) · [SDK_PUBLISHING.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK_PUBLISHING.md)

| | |
|--|--|
| **Hosted base URL** | `https://rexec.sh` |
| **Auth** | `Authorization: Bearer <token>` |
| **Monorepo** | [PipeOpsHQ/Rexec](https://github.com/PipeOpsHQ/Rexec) (`sdk/{js,python,go,rust,ruby,dotnet,java,php}`) |
| **Runnable examples** | [PipeOpsHQ/sandbox-example](https://github.com/PipeOpsHQ/sandbox-example) |

---

## Available SDKs

| Language | Package | Install | Import notes |
|----------|---------|---------|--------------|
| **JS / TS** | [pipeops-rexec](https://www.npmjs.com/package/pipeops-rexec) | `npm install pipeops-rexec` | `import { RexecClient } from 'pipeops-rexec'` |
| **Python** | [pipeops-rexec](https://pypi.org/project/pipeops-rexec/) | `pip install pipeops-rexec` | `from rexec import RexecClient` |
| **Go** | [rexec-go](https://github.com/PipeOpsHQ/rexec-go) | `go get github.com/PipeOpsHQ/rexec-go@v1.1.0` | `import rexec "github.com/PipeOpsHQ/rexec-go"` |
| **Rust** | [pipeops-rexec](https://crates.io/crates/pipeops-rexec) | `cargo add pipeops-rexec` | `use rexec::{…}` |
| **Ruby** | [pipeops-rexec](https://rubygems.org/gems/pipeops-rexec) | `gem install pipeops-rexec` | `require "rexec"` |
| **C# / .NET** | [PipeOps.Rexec](https://www.nuget.org/packages/PipeOps.Rexec) | `dotnet add package PipeOps.Rexec` | `using Rexec;` |
| **Java / Kotlin** | `io.pipeops:rexec:1.1.0` | Maven/Gradle | `import io.pipeops.rexec.*` |
| **PHP** | [pipeopshq/rexec](https://packagist.org/packages/pipeopshq/rexec) | `composer require pipeopshq/rexec:^1.1` | `use Rexec\RexecClient` |

**PHP fallback (VCS):**

```bash
composer config repositories.rexec-php vcs https://github.com/PipeOpsHQ/rexec-php
composer require pipeopshq/rexec:^1.1
```

---

## Auth

1. **API token** — Rexec UI → Settings → API Tokens (production).  
2. **Guest JWT** — `POST /api/auth/guest` with `{ "username", "email" }` (smoke tests only).

SDKs attach `Authorization: Bearer <token>` on REST and terminal WebSockets. Use env vars (`REXEC_URL`, `REXEC_TOKEN`) — never hardcode secrets.

---

## Shared API surface (sandboxes)

### Sandboxes (HTTP: `/api/containers`)

| Method | HTTP | Notes |
|--------|------|--------|
| **List** | `GET /api/containers` | Body often `{ containers: [...] \| null, count, limit }`. **SDKs return a plain array.** |
| **Create** | `POST /api/containers` `{ image, name? }` | May return `status: "creating"` (**async**). Prefer image **aliases**. |
| **Get** | `GET /api/containers/:id` | Poll until `running` if you need a shell. |
| **Start** | `POST /api/containers/:id/start` | |
| **Stop** | `POST /api/containers/:id/stop` | |
| **Delete** | `DELETE /api/containers/:id` | Always clean up in `finally` / `defer`. |

### Files (per sandbox)

| Method | HTTP |
|--------|------|
| **List dir** | `GET /api/containers/:id/files/list?path=` |
| **Read** | `GET /api/containers/:id/files?path=` |
| **Write** | `POST /api/containers/:id/files` (content often base64; language-dependent) |
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

Prefer **`sandboxes`** (v1.1.0+). `containers` is a deprecated alias to the same service.

| Lang | Construct | Sandboxes (preferred) |
|------|-----------|------------------------|
| **JS** | `new RexecClient({ baseURL, token })` | `client.sandboxes.list()` / `.create({ image, name? })` |
| **Python** | `async with RexecClient(url, token)` | `await client.sandboxes.list()` / `.create(image=…)` |
| **Go** | `rexec.NewClient(url, token)` | `client.Sandboxes.List(ctx)` / `.Create(ctx, &CreateSandboxRequest{…})` |
| **Rust** | `RexecClient::new(url, token)` | `client.sandboxes().list().await` / `.create(…)` |
| **Ruby** | `Rexec::Client.new(url, token)` | `client.sandboxes.list` / `.create(…)` |
| **.NET** | `new RexecClient(url, token)` | `await client.Sandboxes.ListAsync()` / `.CreateAsync(…)` |
| **Java** | `new RexecClient(url, token)` | `client.sandboxes().list()` / `.create(…)` |
| **PHP** | `new Rexec\RexecClient($url, $token)` | `$client->sandboxes()->list()` / `->create(…)` |

### Wait until running (pattern)

```typescript
async function waitRunning(client: RexecClient, id: string, ms = 120_000) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    const s = await client.sandboxes.get(id);
    if (s.status === 'running') return s;
    if (s.status === 'error') throw new Error('sandbox failed');
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error('timeout waiting for running');
}
```

Complete, multi-language happy paths (create → poll → get → delete + cleanup):  
**[PipeOpsHQ/sandbox-example](https://github.com/PipeOpsHQ/sandbox-example)**

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

## Examples & E2E

### Public example repo (recommended)

```bash
git clone https://github.com/PipeOpsHQ/sandbox-example.git
cd sandbox-example
export REXEC_TOKEN=rexec_...   # never commit
# See per-language folders: javascript, python, go, ruby, rust, java, php, dotnet
```

### Monorepo smoke tests

```bash
cd scripts/sdk-e2e   # in PipeOpsHQ/Rexec
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
| **Sandbox examples** | https://github.com/PipeOpsHQ/sandbox-example |
| npm | https://www.npmjs.com/package/pipeops-rexec |
| PyPI | https://pypi.org/project/pipeops-rexec/ |
| crates.io | https://crates.io/crates/pipeops-rexec |
| RubyGems | https://rubygems.org/gems/pipeops-rexec |
| NuGet | https://www.nuget.org/packages/PipeOps.Rexec |
| Maven | https://repo1.maven.org/maven2/io/pipeops/rexec/ |
| Go module | https://github.com/PipeOpsHQ/rexec-go |
| PHP source (Packagist) | https://github.com/PipeOpsHQ/rexec-php |
