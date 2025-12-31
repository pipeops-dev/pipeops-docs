---
sidebar_position: 2
title: Authentication Commands
---

# Authentication Commands

The `pipeops auth` commands manage authentication and user account information. These commands handle login, logout, and session management for the PipeOps CLI.

## `pipeops auth login`

Authenticate with PipeOps using OAuth 2.0 with PKCE flow.

### Usage

```bash
pipeops auth login [flags]
```

### Description

Opens your default web browser to complete OAuth authentication. Once authenticated, the CLI stores your access token locally for future commands.

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--browser` | boolean | Open browser automatically (default: true) |
| `--no-browser` | boolean | Display auth URL without opening browser |

### Examples

**Standard login**:
```bash
pipeops auth login
```

**Login without opening browser**:
```bash
pipeops auth login --no-browser
```

Output:
```
Please open this URL in your browser to authenticate:
https://console.pipeops.io/cli-auth?code=ABC123

Waiting for authentication...
✓ Successfully authenticated as user@example.com
```

### What Happens

1. CLI generates a secure PKCE code challenge
2. Opens browser to PipeOps authentication page
3. You authorize the CLI application
4. CLI receives authorization code
5. Exchanges code for access token
6. Stores token in `~/.pipeops.json`

### Authentication Flow

The CLI uses OAuth 2.0 with PKCE (Proof Key for Code Exchange) for secure authentication:

- **Secure**: No passwords stored locally
- **Device-friendly**: Works on headless servers with `--no-browser`
- **Token-based**: Automatic token refresh
- **Scoped**: Minimal required permissions

### Troubleshooting

**Browser doesn't open**:
```bash
# Manually copy and open the URL
pipeops auth login --no-browser
```

**Authentication timeout**:
```bash
# Restart the process
pipeops auth login
```

**Permission denied**:
```bash
# Check file permissions
chmod 600 ~/.pipeops.json
```

---

## `pipeops auth logout`

Sign out and remove local credentials.

### Usage

```bash
pipeops auth logout [flags]
```

### Description

Removes the authentication token from local configuration. After logout, you'll need to run `pipeops auth login` again to use authenticated commands.

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--force` | boolean | Skip confirmation prompt |

### Examples

**Standard logout**:
```bash
pipeops auth logout
```

Output:
```
Are you sure you want to logout? [y/N] y
✓ Successfully logged out
```

**Force logout without confirmation**:
```bash
pipeops auth logout --force
```

### What Gets Removed

- Access token from `~/.pipeops.json`
- Session information
- Cached credentials

:::note
Logging out does **not** revoke the token on the server. To fully revoke access, log in to the web console and revoke the CLI application under Settings > Security > Authorized Applications.
:::

---

## `pipeops auth status`

Check current authentication status.

### Usage

```bash
pipeops auth status [flags]
```

### Description

Verifies if you're currently authenticated and displays session information.

### Examples

**Check auth status**:
```bash
pipeops auth status
```

Output when authenticated:
```
✓ Authenticated as user@example.com
Token expires: 2024-12-31 23:59:59
```

Output when not authenticated:
```
✗ Not authenticated
Run 'pipeops auth login' to authenticate
```

**JSON output**:
```bash
pipeops auth status --json
```

```json
{
  "authenticated": true,
  "email": "user@example.com",
  "expires_at": "2024-12-31T23:59:59Z",
  "token_valid": true
}
```

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Authenticated and token is valid |
| 1 | Not authenticated or token is invalid |

### Usage in Scripts

```bash
# Check if authenticated before running commands
if pipeops auth status > /dev/null 2>&1; then
  echo "Authenticated, proceeding..."
  pipeops project list
else
  echo "Not authenticated, please login"
  pipeops auth login
fi
```

---

## `pipeops auth me`

Display current user information.

### Usage

```bash
pipeops auth me [flags]
```

### Description

Shows detailed information about the currently authenticated user.

### Examples

**View user info**:
```bash
pipeops auth me
```

Output:
```
Email:        user@example.com
Name:         John Doe
Organization: Acme Corp
Role:         Admin
Account ID:   usr_1234567890
```

**JSON output**:
```bash
pipeops auth me --json
```

```json
{
  "id": "usr_1234567890",
  "email": "user@example.com",
  "name": "John Doe",
  "organization": "Acme Corp",
  "role": "admin",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Use Cases

- Verify which account you're using
- Check your role and permissions
- Get your user ID for API operations
- Confirm organization membership

---

## Common Usage Patterns

### CI/CD Authentication

For CI/CD pipelines, use environment variables instead of interactive login:

```bash
# Set token from secrets
export PIPEOPS_AUTH_TOKEN=${{ secrets.PIPEOPS_TOKEN }}

# Verify authentication
pipeops auth status

# Run commands
pipeops list
pipeops status proj-123
```

### Multiple Accounts

Manage multiple PipeOps accounts using different config files:

```bash
# Login to production account
PIPEOPS_CONFIG_PATH=~/.pipeops-prod.json pipeops auth login

# Login to staging account
PIPEOPS_CONFIG_PATH=~/.pipeops-staging.json pipeops auth login

# Use specific account
alias pipeops-prod='PIPEOPS_CONFIG_PATH=~/.pipeops-prod.json pipeops'
alias pipeops-staging='PIPEOPS_CONFIG_PATH=~/.pipeops-staging.json pipeops'
```

### Token Security

Best practices for token management:

1. **Never commit tokens** to version control:
   ```bash
   echo ".pipeops.json" >> .gitignore
   ```

2. **Protect config file**:
   ```bash
   chmod 600 ~/.pipeops.json
   ```

3. **Use secrets management** in CI/CD:
   - GitHub Actions: Use encrypted secrets
   - GitLab CI: Use masked variables
   - Jenkins: Use credentials plugin

4. **Rotate tokens regularly**:
   ```bash
   pipeops auth logout
   pipeops auth login
   ```

### Headless Servers

For servers without a browser:

```bash
# On the headless server
pipeops auth login --no-browser

# Copy the URL and open it on your local machine
# After authorization, the server CLI will authenticate automatically
```

Or use a pre-generated token:

```bash
# Set token directly
export PIPEOPS_AUTH_TOKEN="your-token-here"

# Or add to config file
echo '{"auth_token":"your-token-here"}' > ~/.pipeops.json
```

---

## Error Messages

### Common Errors

**"Not authenticated"**:
```
Error: not authenticated
Run 'pipeops auth login' to authenticate
```
**Solution**: Run `pipeops auth login`

**"Token expired"**:
```
Error: authentication token has expired
Run 'pipeops auth login' to re-authenticate
```
**Solution**: Run `pipeops auth login` to refresh

**"Invalid token"**:
```
Error: invalid authentication token
Run 'pipeops auth login' to re-authenticate
```
**Solution**: Run `pipeops auth logout` then `pipeops auth login`

**"Permission denied"**:
```
Error: failed to write config file: permission denied
```
**Solution**: Check file permissions: `chmod 600 ~/.pipeops.json`

---

## Related Commands

- **[Configuration](/docs/cli/getting-started/configuration)**: Configure authentication settings
- **[Troubleshooting](/docs/cli/reference/troubleshooting)**: Authentication troubleshooting

---

## See Also

- [Quick Start Guide](/docs/cli/getting-started/quick-start)
- [Project Commands](/docs/cli/commands/projects)
