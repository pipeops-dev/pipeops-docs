---
sidebar_position: 1
title: What are Rexec sandboxes?
description: "Rexec sandboxes are instant, isolated Linux environments for development, AI agents, demos, and safe code execution."
---

# What are Rexec sandboxes?

**Rexec** is PipeOps’ **AI-native sandbox** platform. A **sandbox** is an isolated Linux environment (backed by a container) that you can create in seconds, use from the browser terminal or API, then tear down when you are done.

Sandboxes are ideal for:

- Running untrusted or AI-generated code safely  
- Ephemeral dev/test shells (no local Docker setup)  
- Agent workflows that need a real Linux filesystem and shell  
- Demos, workshops, and CI-style throwaway environments  

| | |
|--|--|
| **Product** | [rexec.sh](https://rexec.sh) |
| **Hosted API** | `https://rexec.sh` |
| **Auth** | `Authorization: Bearer <token>` |
| **Open source** | [github.com/PipeOpsHQ/Rexec](https://github.com/PipeOpsHQ/Rexec) |
| **In-app SDK docs** | [rexec.sh/docs/sdk](https://rexec.sh/docs/sdk) |

## Sandbox vs container (terminology)

| Term | Meaning in Rexec |
|------|------------------|
| **Sandbox** | Product concept: your isolated Linux workspace (what you create, share, and delete) |
| **Container** | Implementation / API resource name (`/api/containers`, SDK methods like `containers.list()`) |

Docs and SDKs may say **sandbox** and **container** interchangeably. The REST paths still use `/api/containers`.

## Lifecycle

```text
create → creating → running ⇄ stopped → delete
                 ↘ error
```

- **Create** is often **async**: the API may return immediately with `status: "creating"`.  
- Poll **get** until `status === "running"` before assuming a ready shell.  
- **Guest** sessions have limited concurrent sandboxes and shorter lifetime; use **API tokens** for production.

## Image aliases

Hosted Rexec uses a fixed catalog of **image aliases**, not arbitrary Docker Hub tags.

| Prefer | Avoid on hosted |
|--------|-----------------|
| `ubuntu`, `ubuntu-24`, `ubuntu-22` | `ubuntu:24.04`, `ubuntu:latest` |
| `debian`, `alpine`, `fedora`, `archlinux`, … | Random Hub tags |

Full catalog: **`GET /api/images`**.

## How you interact with sandboxes

| Surface | Use case |
|---------|----------|
| **Web console** | Browser UI, terminal, settings, API tokens |
| **Official SDKs** | Automate create/list/delete from app or agent code |
| **REST + WebSocket** | Custom clients against the same API |
| **Self-hosted** | Run the open-source stack on your infra |

## What you can do with a sandbox

1. **Manage lifecycle** — list, create, get, start, stop, delete  
2. **Files** — list directories, read/write/delete paths inside the sandbox  
3. **Terminal** — interactive PTY over WebSocket (`wss://…/ws/terminal/:id`)  

There is **no** primary HTTP `exec()` API on hosted Rexec. Run commands through the **terminal WebSocket** (or your own tooling).

## Next steps

- [SDK Quick Start](./sdk-quick-start.md) — install a client and create a sandbox in ~5 minutes  
- [SDK & API Reference](./sdk-reference.md) — languages, endpoints, errors, registries  
- Product UI: [rexec.sh](https://rexec.sh)  
- Upstream API reference: [Rexec SDK.md](https://github.com/PipeOpsHQ/Rexec/blob/main/docs/SDK.md)
