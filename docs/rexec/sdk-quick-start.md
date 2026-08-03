---
sidebar_position: 2
title: SDK Quick Start
description: "Create and delete a Rexec sandbox with an official SDK in about five minutes."
---

# Rexec SDK Quick Start

**~5 minutes** to list, create, inspect, and delete a **sandbox** with an official client.

Official language SDKs wrap the same REST + WebSocket API. Current line: **v1.0.1**.

| | |
|--|--|
| **Hosted API** | `https://rexec.sh` |
| **Auth** | `Authorization: Bearer <token>` |
| **Full reference** | [SDK & API Reference](./sdk-reference.md) |
| **Upstream docs** | [SDK_GETTING_STARTED.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK_GETTING_STARTED.md) · [SDK.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK.md) |

:::tip Sandbox = container in the API
SDK methods are named `containers.*` (e.g. `client.containers.create()`). That creates a **sandbox**.
:::

---

## 1. Prerequisites

1. Base URL: hosted `https://rexec.sh` or your self-hosted origin.  
2. Bearer token:
   - **API token** (apps / agents): Rexec UI → **Settings** → **API Tokens**  
   - **Guest JWT** (short smoke tests):

```bash
export REXEC_URL=https://rexec.sh
export REXEC_TOKEN=$(curl -sS -X POST "$REXEC_URL/api/auth/guest" \
  -H 'Content-Type: application/json' \
  -d '{"username":"docs_demo","email":"you@example.com"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
```

Guest sessions are limited — prefer API tokens for real workloads.

---

## 2. Install (v1.0.1)

| Language | Install |
|----------|---------|
| **JavaScript / TypeScript** | `npm install pipeops-rexec` |
| **Python** | `pip install pipeops-rexec` |
| **Go** | `go get github.com/PipeOpsHQ/rexec-go@v1.0.1` |
| **Rust** | `cargo add pipeops-rexec` |
| **Ruby** | `gem install pipeops-rexec` |
| **C# / .NET** | `dotnet add package PipeOps.Rexec` |
| **Java / Kotlin** | `io.pipeops:rexec:1.0.1` (Maven/Gradle) |
| **PHP** | `composer require pipeopshq/rexec` |

:::note Package names
Registries use prefixed names (`pipeops-rexec`, `PipeOps.Rexec`, `pipeopshq/rexec`) because bare `rexec` is taken. Python/Rust still **import** as `rexec`.
:::

**Fallbacks**

```bash
# PHP from GitHub if Packagist is not linked yet
composer config repositories.rexec-php vcs https://github.com/PipeOpsHQ/rexec-php
composer require pipeopshq/rexec:^1.0

# Java from monorepo
cd sdk/java && mvn install -DskipTests   # in PipeOpsHQ/Rexec checkout
```

---

## 3. Image aliases (critical)

| Do use | Don’t use on hosted |
|--------|---------------------|
| `ubuntu`, `ubuntu-24`, `debian`, `alpine`, … | `ubuntu:24.04`, random Hub tags |

Catalog: `GET /api/images`.

Create may return `status: "creating"` — poll `get(id)` until `"running"` if you need a ready shell.

---

## 4. Minimal happy path

Every language:

1. **List** sandboxes  
2. **Create** with `image: "ubuntu"` (optional name)  
3. **Get** by id  
4. **Delete** when finished  

There is **no** primary HTTP `exec()` — use the [terminal WebSocket](./sdk-reference.md#terminal).

### JavaScript / TypeScript

```bash
npm install pipeops-rexec
# Node: npm install ws   # if you use the terminal helper
```

```typescript
import { RexecClient } from 'pipeops-rexec';

const client = new RexecClient({
  baseURL: process.env.REXEC_URL!,
  token: process.env.REXEC_TOKEN!,
});

// List sandboxes (SDK returns a plain array)
const list = await client.containers.list();

// Create a sandbox
const sandbox = await client.containers.create({
  image: 'ubuntu',
  name: 'demo',
});
console.log(sandbox.id, sandbox.status); // often "creating" first

await client.containers.get(sandbox.id);
await client.containers.delete(sandbox.id);
```

### Python

```bash
pip install pipeops-rexec
```

```python
import asyncio, os
from rexec import RexecClient

async def main():
    async with RexecClient(os.environ["REXEC_URL"], os.environ["REXEC_TOKEN"]) as client:
        print(await client.containers.list())
        sandbox = await client.containers.create(image="ubuntu", name="demo")
        print(sandbox.id, sandbox.status)
        await client.containers.get(sandbox.id)
        await client.containers.delete(sandbox.id)

asyncio.run(main())
```

### Other languages (same four steps)

<details>
<summary>Go</summary>

```go
client := rexec.NewClient(os.Getenv("REXEC_URL"), os.Getenv("REXEC_TOKEN"))
c, _ := client.Containers.Create(ctx, &rexec.CreateContainerRequest{Image: "ubuntu", Name: "demo"})
_ = client.Containers.Delete(ctx, c.ID)
```

</details>

<details>
<summary>Rust</summary>

```rust
use rexec::{CreateContainerRequest, RexecClient};
let client = RexecClient::new(url, token);
let c = client.containers().create(CreateContainerRequest::new("ubuntu").name("demo")).await?;
client.containers().delete(&c.id).await?;
```

</details>

<details>
<summary>Ruby</summary>

```ruby
require "rexec"
client = Rexec::Client.new(ENV["REXEC_URL"], ENV["REXEC_TOKEN"])
c = client.containers.create(image: "ubuntu", name: "demo")
client.containers.delete(c.id)
```

</details>

<details>
<summary>C# / .NET</summary>

```csharp
using Rexec;
using var client = new RexecClient(url, token);
var c = await client.Containers.CreateAsync(new CreateContainerRequest("ubuntu") { Name = "demo" });
await client.Containers.DeleteAsync(c!.Id);
```

</details>

<details>
<summary>Java / Kotlin</summary>

```java
RexecClient client = new RexecClient(url, token);
Container c = client.containers().create(new CreateContainerRequest("ubuntu").setName("demo"));
client.containers().delete(c.getId());
```

</details>

<details>
<summary>PHP</summary>

```php
$client = new Rexec\RexecClient(getenv('REXEC_URL'), getenv('REXEC_TOKEN'));
$c = $client->containers()->create('ubuntu', ['name' => 'demo']);
$client->containers()->delete($c->id);
```

</details>

---

## 5. What the SDKs cover

| Surface | Capabilities |
|---------|----------------|
| **Sandboxes** (`containers`) | list, create, get, start, stop, delete |
| **Files** | list dir, read, write, mkdir (some SDKs), delete |
| **Terminal** | WebSocket connect, write / onData, resize, close |

## 6. Next steps

- [SDK & API Reference](./sdk-reference.md) — endpoints, models, errors, registries  
- [What are sandboxes?](./overview.md)  
- Product: [rexec.sh](https://rexec.sh) · In-app: [/docs/sdk](https://rexec.sh/docs/sdk)  
- E2E runners in the monorepo: `scripts/sdk-e2e/`
