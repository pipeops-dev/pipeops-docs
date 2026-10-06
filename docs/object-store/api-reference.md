---
sidebar_position: 2
title: API Reference
description: "PipeOps Object Store management API — status, buckets, keys, objects, domains."
---

# Object Store API Reference

Management API for workspace Object Store. Base path:

```text
https://api.pipeops.io/api/v1/workspace/{workspace_uuid}/object-store
```

All responses use the usual PipeOps envelope:

```json
{ "success": true, "message": "ok", "data": { } }
```

For app uploads and downloads, prefer the **S3 data plane** with access keys — see [SDK Quick Start](./sdk-quick-start.md).

---

## Auth

| | |
|--|--|
| **Header** | `Authorization: Bearer <pipeops_jwt_or_sa_token>` |
| **Team members** | Add `?team_uuid=<team_uuid>` (required for non-owners so the workspace resolves) |
| **Roles** | Workspace owner, or team **admin** / **member** / **guest** |
| **Service accounts** | Workspace-scoped SA tokens work; middleware skips team membership for matching SA |

```bash
export API=https://api.pipeops.io/api/v1
export TOKEN=...          # PipeOps JWT or sat_* service account
export WS=...             # workspace UUID
export TEAM=...           # optional team UUID for members

AUTH=(-H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")
QS=""
[ -n "$TEAM" ] && QS="?team_uuid=$TEAM"
```

:::tip Never commit tokens
Use env vars or a secrets manager. Access key **secrets** are shown once at create time.
:::

---

## Status & URLs

### Get status

`GET /workspace/{ws}/object-store`

```bash
curl -sS "${AUTH[@]}" "$API/workspace/$WS/object-store$QS" | jq .
```

**`data` highlights**

| Field | Description |
|-------|-------------|
| `enabled` | Feature + provider configured |
| `backend` | `tigris` |
| `tenant_id` | Workspace UUID |
| `s3_endpoint` | SigV4 S3 API host (e.g. `https://t3.storage.dev`) |
| `white_label_domain` | Public host apex (e.g. `objects.pipeops.run`) |
| `tigris_configured` | Provider credentials present |

### Public URLs

`GET /workspace/{ws}/object-store/urls?bucket={name}`

Returns CDN / white-label helpers for a bucket (when configured).

---

## Buckets

### List

`GET /workspace/{ws}/object-store/buckets`

### Create

`POST /workspace/{ws}/object-store/buckets`

```bash
curl -sS "${AUTH[@]}" -X POST "$API/workspace/$WS/object-store/buckets$QS" \
  -d '{"name":"my-assets"}' | jq .
```

| Body field | Required | Notes |
|------------|----------|--------|
| `name` | yes | Sanitized to `[a-z0-9-]`, 3–63 chars, **globally unique** |
| `encryption_mode` | no | Default `none` |
| `location_hint` | no | Provider location hint when supported |

### Delete

`DELETE /workspace/{ws}/object-store/buckets/{name}`

Soft-delete when enabled on the provider (restore window depends on config).

### Soft-deleted / restore

| Method | Path |
|--------|------|
| `GET` | `/buckets/deleted` |
| `POST` | `/buckets/{name}/restore` |

### Settings / versioning / location / lifecycle

| Method | Path |
|--------|------|
| `GET` / `PUT` | `/buckets/{name}/settings` |
| `GET` / `PUT` | `/buckets/{name}/versioning` |
| `GET` | `/buckets/{name}/location` |
| `GET` / `PUT` / `DELETE` | `/buckets/{name}/lifecycle` |

Settings may include `publicDefault` and cache hints used for public object URLs.

### Custom domain (per bucket)

| Method | Path |
|--------|------|
| `GET` / `PUT` / `POST` / `DELETE` | `/buckets/{name}/custom-domain` |

Point a hostname (CNAME) at the provider target for that bucket, then register it here.

---

## Access keys

### List

`GET /workspace/{ws}/object-store/keys`

Secrets are **never** listed—only metadata (`accessKeyId`, `label`, `permissions`, `buckets`).

### Create {#create-access-key}

`POST /workspace/{ws}/object-store/keys`

```bash
curl -sS "${AUTH[@]}" -X POST "$API/workspace/$WS/object-store/keys$QS" \
  -d '{
    "label": "ci-bot",
    "permissions": ["read", "write"],
    "buckets": ["my-assets"]
  }' | jq .
```

| Body field | Required | Notes |
|------------|----------|--------|
| `label` | no | Defaults to `dashboard` |
| `permissions` | no | `read`, `write`, and/or `admin`. Default `read`+`write` |
| `buckets` | no | Omit or `[]` → all buckets (`*`). Otherwise only listed bucket names |

**Response `data` (secret once)**

```json
{
  "accessKeyId": "tid_...",
  "secretAccessKey": "tsec_...",
  "s3_endpoint": "https://t3.storage.dev",
  "region": "auto",
  "tenant_id": "<workspace_uuid>",
  "key": {
    "accessKeyId": "tid_...",
    "secretAccessKey": "tsec_...",
    "permissions": ["read", "write"],
    "buckets": ["my-assets"],
    "label": "ci-bot"
  }
}
```

Copy `secretAccessKey` immediately. Use `s3_endpoint` + `region: auto` in SDKs.

### Revoke

`DELETE /workspace/{ws}/object-store/keys`

```bash
curl -sS "${AUTH[@]}" -X DELETE "$API/workspace/$WS/object-store/keys$QS" \
  -d '{"accessKeyId":"tid_..."}' | jq .
```

:::note Policies
`/keys/policy*` routes exist for compatibility but **IAM-style attach/detach is not implemented** in the current Object Store path. Use `buckets` on create for scope.
:::

---

## Objects (management proxy)

Useful for console/tools. Apps should prefer **direct S3** with access keys.

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/buckets/{name}/objects?prefix=&delimiter=/&cursor=` | List |
| `POST` | `/buckets/{name}/objects` | Upload (multipart form) |
| `POST` | `/buckets/{name}/objects/presign` | Get upload URL(s) |
| `PUT` | `/buckets/{name}/objects/content` | Raw body put |
| `POST` | `/buckets/{name}/objects/multipart` | Start multipart |
| `PUT` | `/buckets/{name}/objects/multipart/{uploadId}/parts/{n}` | Upload part |
| `POST` | `/buckets/{name}/objects/multipart/{uploadId}/complete` | Complete |
| `DELETE` | `/buckets/{name}/objects/multipart/{uploadId}` | Abort |
| `DELETE` | `/buckets/{name}/objects?key=` | Delete object |
| `GET` | `/buckets/{name}/objects/download?key=` | Download |
| `GET` | `/buckets/{name}/objects/versions?key=` | Versions |
| `POST` | `/buckets/{name}/folders` | Create folder prefix `{ "path": "dir/" }` |

---

## Domains (workspace list helpers)

| Method | Path |
|--------|------|
| `GET` | `/domains?bucket=` |
| `POST` | `/domains` |
| `GET` | `/domains/{hostname}/status` |
| `DELETE` | `/domains/{hostname}` |

Prefer per-bucket **custom-domain** routes above for new integrations.

---

## Public object reads (no JWT)

When a bucket has public defaults (or the object is public):

```text
GET https://api.pipeops.io/api/v1/public/object-store/t/{tenant_id}/objects/{key}?bucket={bucket}
```

White-label browser URLs typically look like:

```text
https://{bucket}.objects.pipeops.run/{key}
```

---

## Errors

| HTTP | Typical meaning |
|------|-----------------|
| `400` | Validation (bucket name, body) |
| `401` / `403` | Missing/invalid auth or not a team member |
| `404` | Workspace / bucket not found |
| `409` | Bucket name taken / tenant not provisioned (create a bucket first) |
| `503` | Object Store disabled or provider unavailable |

Team members who omit `team_uuid` may see **404** on the workspace before membership is checked—always pass `team_uuid` from the active team context.

---

## Next

[SDK Quick Start](./sdk-quick-start.md) — use the access key with AWS SDK / CLI.
