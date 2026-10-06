---
sidebar_position: 1
title: What is Object Store?
description: "Managed S3-compatible object storage per PipeOps workspace — buckets, keys, public URLs, and SDK access."
---

# What is Object Store?

**Object Store** is PipeOps’ managed, **S3-compatible** object storage for a workspace. You create buckets in the console or via the PipeOps API, mint access keys, then read and write objects with any AWS S3 SDK or CLI.

It is **not** a server or VM product. Storage lives in a workspace-scoped tenant (one org per workspace). Workspace owners and team members (admin, member, guest) share the same buckets.

| | |
|--|--|
| **Console** | [console.pipeops.io](https://console.pipeops.io) → **Developer Tools** → **Object Store** |
| **Management API** | `https://api.pipeops.io/api/v1/workspace/{workspace_uuid}/object-store` |
| **S3 data plane** | `https://objects.pipeops.run` (region `auto`) |
| **Public object host** | `https://{bucket}.objects.pipeops.run/{key}` |
| **Auth (management)** | PipeOps JWT or workspace service account + optional `team_uuid` |
| **Auth (S3 / SDKs)** | Access key ID + secret from **Create access key** |

## Concepts

| Concept | Meaning |
|---------|---------|
| **Workspace tenant** | One Object Store org per workspace UUID. All buckets belong to that org. |
| **Bucket** | S3 bucket. Names are globally unique (`[a-z0-9-]`, 3–63 chars). |
| **Access key** | SigV4 credentials for the S3 endpoint. Optional **bucket scope** (or all buckets `*`). |
| **Public object URL** | Browser URL for public objects (`{bucket}.objects.pipeops.run`), or a custom domain you attach. |

```text
PipeOps console / Management API
        │  JWT + workspace UUID
        ▼
  Create buckets & access keys
        │
        ▼
  AWS SDK / CLI  ──SigV4──►  S3 endpoint (objects.pipeops.run)
        │
        ▼
  Objects in your buckets
```

## Two APIs

1. **Management API** (this docs site → [API Reference](./api-reference.md))  
   PipeOps-authenticated routes to create buckets, mint/revoke keys, list objects via the console proxy, domains, etc.

2. **S3-compatible data plane** ([SDK Quick Start](./sdk-quick-start.md))  
   Standard S3 operations (`PutObject`, `GetObject`, multipart, …) using access keys against the S3 endpoint. Prefer this for apps, CI, and large uploads.

## Access keys and scope

- Keys are minted under the workspace org.
- **Permissions:** `read`, `write`, or both (and optional admin for org-wide keys).
- **Bucket scope (optional):**
  - Omit / empty → key can access **all** buckets in the workspace (`*`).
  - Pass bucket names → key is limited to those buckets (Editor at most; Admin is only for all buckets).
- There is no separate IAM policy editor in the current product; scope is set when the key is created.

## Regions and residency

- S3 clients should use region **`auto`**.
- Default bucket placement is global / provider-managed. Geography options depend on the underlying storage provider (for example USA / EUR style constraints)—not customer Layer3/MTN nodes.
- **Nigeria / on-prem residency** is not available on the current managed Object Store path.

## Pricing

**Pricing TBD.** Object Store is a workspace add-on (not a Servers SKU). Per-GB storage and egress rates will be published with the rate card—do not quote server plan pricing.

## Custom domains

Map your hostname (for example `cdn.example.com`) to a bucket with a DNS CNAME
and the management API. See [Custom domain](./api-reference.md#custom-domain).

## Next steps

- [API Reference](./api-reference.md) — management endpoints, auth, request shapes  
- [SDK Quick Start](./sdk-quick-start.md) — mint a key and upload with AWS SDK (JS, Python, Go) + CLI  
