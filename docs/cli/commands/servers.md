---
sidebar_position: 5
title: Server Commands
---

# Server Commands

The `pipeops server` commands manage your server infrastructure and provisioning.

## `pipeops server list`

List all servers in your account.

### Usage

```bash
pipeops server list [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--status` | string | Filter by status (running, stopped, provisioning) |
| `--region` | string | Filter by region |

### Examples

```bash
# List all servers
pipeops server list

# Filter by status
pipeops server list --status running

# JSON output
pipeops server list --json
```

**See also**: [Server Overview (Web UI)](/docs/servers/server-overview)

---

## `pipeops server create`

Provision a new server.

### Usage

```bash
pipeops server create [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--name` | string | Server name |
| `--provider` | string | Cloud provider (aws, gcp, azure, digitalocean) |
| `--region` | string | Region/datacenter |
| `--size` | string | Instance size |

### Examples

```bash
# Interactive mode
pipeops server create

# With flags
pipeops server create \
  --name prod-server \
  --provider aws \
  --region us-east-1 \
  --size t3.medium
```

**See also**: [Server Provisioning (Web UI)](/docs/servers/server-provisioning)

---

## `pipeops server delete`

Remove a server.

### Usage

```bash
pipeops server delete <server-name> [flags]
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--force` | boolean | Skip confirmation |

### Examples

```bash
# Delete with confirmation
pipeops server delete my-server

# Force delete
pipeops server delete my-server --force
```

---

## `pipeops server info`

Get detailed server information.

### Usage

```bash
pipeops server info <server-name> [flags]
```

### Examples

```bash
# View server details
pipeops server info my-server

# JSON output
pipeops server info my-server --json
```

---

## Related Documentation

- [Server Overview (Web UI)](/docs/servers/server-overview)
- [Server Provisioning](/docs/servers/server-provisioning)
- [Server Environments](/docs/servers/server-environments)
- [Agent Commands](/docs/cli/commands/agents)
