---
sidebar_position: 2
title: SDK Quick Start
description: "Create and delete a Rexec sandbox with an official SDK in about five minutes."
---

# Rexec SDK Quick Start

**~5 minutes** to create, wait until ready, inspect, and delete a **sandbox** with an official client.

Official language SDKs wrap the same REST + WebSocket API. Current line: **v1.1.0+**.

| | |
|--|--|
| **Hosted API** | `https://rexec.sh` |
| **Auth** | `Authorization: Bearer <token>` (`REXEC_TOKEN`) |
| **Full reference** | [SDK & API Reference](./sdk-reference.md) |
| **Runnable examples** | [PipeOpsHQ/sandbox-example](https://github.com/PipeOpsHQ/sandbox-example) |
| **Upstream docs** | [SDK.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK.md) |

:::tip Prefer `sandboxes.*` (v1.1.0+)
Use `client.sandboxes.create()` / `.get()` / `.delete()`.  
`containers.*` still works as a **deprecated alias**. Wire paths remain `/api/containers`.
:::

---

## 1. Prerequisites

1. Base URL: hosted `https://rexec.sh` or your self-hosted origin (`REXEC_URL`).  
2. Bearer token (`REXEC_TOKEN`):
   - **API token** (apps / agents): Rexec UI → **Settings** → **API Tokens**  
   - **Guest JWT** (short smoke tests):

```bash
export REXEC_URL=https://rexec.sh
export REXEC_TOKEN=$(curl -sS -X POST "$REXEC_URL/api/auth/guest" \
  -H 'Content-Type: application/json' \
  -d '{"username":"docs_demo","email":"you@example.com"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
```

Guest sessions are limited — prefer API tokens for real workloads. **Never commit tokens.**

---

## 2. Install (v1.1.0+)

| Language | Install |
|----------|---------|
| **JavaScript / TypeScript** | `npm install pipeops-rexec` (+ `ws` on Node for terminal) |
| **Python** | `pip install pipeops-rexec` |
| **Go** | `go get github.com/PipeOpsHQ/rexec-go@v1.1.0` |
| **Rust** | `cargo add pipeops-rexec` |
| **Ruby** | `gem install pipeops-rexec` |
| **C# / .NET** | `dotnet add package PipeOps.Rexec` |
| **Java / Kotlin** | `io.pipeops:rexec:1.1.0` (Maven/Gradle) |
| **PHP** | `composer require pipeopshq/rexec:^1.1` |

:::note Package names
Registries use prefixed names (`pipeops-rexec`, `PipeOps.Rexec`, `pipeopshq/rexec`) because bare `rexec` is taken. Python/Rust still **import** as `rexec`.
:::

---

## 3. Image aliases (critical)

| Do use | Don’t use on hosted |
|--------|---------------------|
| `ubuntu`, `ubuntu-24`, `debian`, `alpine`, … | `ubuntu:24.04`, random Hub tags |

Catalog: `GET /api/images`.

Create is often **async** — poll `get(id)` until `status === "running"` before using the terminal.

There is **no** primary HTTP `exec()` — use the [terminal WebSocket](./sdk-reference.md#terminal).

---

## 4. Minimal happy path

Every language:

1. **Create** with `image: "ubuntu"` (optional name)  
2. **Poll get** until `status === "running"`  
3. **Get** (optional explicit check)  
4. **Delete** in `finally` / `defer` so sandboxes are not leaked  

### Runnable multi-language repo

Copy-paste, env-based examples for **all** official SDKs:

**[github.com/PipeOpsHQ/sandbox-example](https://github.com/PipeOpsHQ/sandbox-example)**

```text
sandbox-example/
  javascript/   # npm start
  python/       # python happy_path.py
  go/           # go run .
  ruby/         # bundle exec ruby happy_path.rb
  rust/         # cargo run
  java/         # mvn -q exec:java
  php/          # php happy_path.php
  dotnet/       # dotnet run
```

```bash
git clone https://github.com/PipeOpsHQ/sandbox-example.git
cd sandbox-example
export REXEC_TOKEN=rexec_...   # never commit
# optional: export REXEC_URL=https://rexec.sh

cd javascript && npm install && npm start
# or: cd python && pip install -r requirements.txt && python happy_path.py
```

### JavaScript / TypeScript

```bash
npm install pipeops-rexec
# Node WebSockets (terminal): npm install ws
```

```javascript
import { RexecClient } from 'pipeops-rexec';

const client = new RexecClient({
  baseURL: process.env.REXEC_URL || 'https://rexec.sh',
  token: process.env.REXEC_TOKEN,
});

const sb = await client.sandboxes.create({ image: 'ubuntu', name: 'demo' });
console.log(sb.id, sb.status); // often "creating" first

// Poll until ready (create is async)
let got = await client.sandboxes.get(sb.id);
while (got.status !== 'running') {
  if (got.status === 'error') throw new Error('sandbox failed');
  await new Promise((r) => setTimeout(r, 2000));
  got = await client.sandboxes.get(sb.id);
}
console.log('status', got.status);

await client.sandboxes.delete(sb.id);
```

Always wrap delete in `try/finally` in real agents so cleanup runs on failure. See the full pattern in [sandbox-example/javascript](https://github.com/PipeOpsHQ/sandbox-example/tree/main/javascript).

### Python

```bash
pip install pipeops-rexec
```

```python
import asyncio, os
from rexec import RexecClient

async def main():
    async with RexecClient(
        os.environ.get("REXEC_URL", "https://rexec.sh"),
        os.environ["REXEC_TOKEN"],
    ) as client:
        sb = await client.sandboxes.create(image="ubuntu", name="demo")
        print(sb.id, sb.status)
        got = await client.sandboxes.get(sb.id)
        print("status", got.status)
        await client.sandboxes.delete(sb.id)

asyncio.run(main())
```

Full poll + `finally` cleanup: [sandbox-example/python](https://github.com/PipeOpsHQ/sandbox-example/tree/main/python).

### Other languages (same recipe)

| Language | Prefer | Example folder |
|----------|--------|----------------|
| **Go** | `client.Sandboxes.Create` / `Get` / `Delete` | [go/](https://github.com/PipeOpsHQ/sandbox-example/tree/main/go) |
| **Rust** | `client.sandboxes().create` / `get` / `delete` | [rust/](https://github.com/PipeOpsHQ/sandbox-example/tree/main/rust) |
| **Ruby** | `client.sandboxes.create` / `get` / `delete` | [ruby/](https://github.com/PipeOpsHQ/sandbox-example/tree/main/ruby) |
| **.NET** | `client.Sandboxes.CreateAsync` / `GetAsync` / `DeleteAsync` | [dotnet/](https://github.com/PipeOpsHQ/sandbox-example/tree/main/dotnet) |
| **Java** | `client.sandboxes().create` / `get` / `delete` | [java/](https://github.com/PipeOpsHQ/sandbox-example/tree/main/java) |
| **PHP** | `$client->sandboxes()->create` / `get` / `delete` | [php/](https://github.com/PipeOpsHQ/sandbox-example/tree/main/php) |

<details>
<summary>Go (snippet)</summary>

```go
client := rexec.NewClient(env("REXEC_URL", "https://rexec.sh"), os.Getenv("REXEC_TOKEN"))
sb, err := client.Sandboxes.Create(ctx, &rexec.CreateSandboxRequest{Image: "ubuntu", Name: "demo"})
// defer client.Sandboxes.Delete(ctx, sb.ID)
got, _ := client.Sandboxes.Get(ctx, sb.ID)
fmt.Println("status", got.Status)
```

</details>

<details>
<summary>Rust (snippet)</summary>

```rust
use rexec::{CreateSandboxRequest, RexecClient};
let client = RexecClient::new(url, token);
let sb = client.sandboxes()
    .create(CreateSandboxRequest::new("ubuntu").name("demo"))
    .await?;
let got = client.sandboxes().get(&sb.id).await?;
println!("status {}", got.status);
client.sandboxes().delete(&sb.id).await?;
```

</details>

<details>
<summary>Ruby (snippet)</summary>

```ruby
require "rexec"
client = Rexec::Client.new(ENV.fetch("REXEC_URL", "https://rexec.sh"), ENV.fetch("REXEC_TOKEN"))
sb = client.sandboxes.create(image: "ubuntu", name: "demo")
got = client.sandboxes.get(sb.id)
puts "status #{got.status}"
client.sandboxes.delete(sb.id)
```

</details>

<details>
<summary>C# / .NET (snippet)</summary>

```csharp
using Rexec;
using var client = new RexecClient(url, token);
var sb = await client.Sandboxes.CreateAsync(new CreateSandboxRequest("ubuntu") { Name = "demo" });
var got = await client.Sandboxes.GetAsync(sb!.Id);
Console.WriteLine($"status {got!.Status}");
await client.Sandboxes.DeleteAsync(sb.Id);
```

</details>

<details>
<summary>Java (snippet)</summary>

```java
RexecClient client = new RexecClient(url, token);
Sandbox sb = client.sandboxes().create(new CreateSandboxRequest("ubuntu").setName("demo"));
Sandbox got = client.sandboxes().get(sb.getId());
System.out.println("status " + got.getStatus());
client.sandboxes().delete(sb.getId());
```

</details>

<details>
<summary>PHP (snippet)</summary>

```php
$client = new Rexec\RexecClient(getenv('REXEC_URL') ?: 'https://rexec.sh', getenv('REXEC_TOKEN'));
$sb = $client->sandboxes()->create('ubuntu', ['name' => 'demo']);
$got = $client->sandboxes()->get($sb->id);
echo "status {$got->status}\n";
$client->sandboxes()->delete($sb->id);
```

</details>

---

## 5. What the SDKs cover

| Surface | Capabilities |
|---------|----------------|
| **Sandboxes** (`sandboxes.*`, wire `/api/containers`) | list, create, get, start, stop, delete |
| **Files** | list dir, read/download, write (language-dependent), mkdir, delete |
| **Terminal** | WebSocket connect, write / onData, resize, close — **not** HTTP `exec()` |

## 6. Next steps

- [SDK & API Reference](./sdk-reference.md) — endpoints, models, errors, registries  
- [What are sandboxes?](./overview.md)  
- **Examples:** [PipeOpsHQ/sandbox-example](https://github.com/PipeOpsHQ/sandbox-example)  
- Product: [rexec.sh](https://rexec.sh) · In-app: [/docs/sdk](https://rexec.sh/docs/sdk)  
