---
sidebar_position: 3
title: Configuration
---

# Configuring the PipeOps CLI

The PipeOps CLI can be configured to suit your workflow through configuration files, environment variables, and command-line flags.

## Configuration File

The CLI stores its configuration in a JSON file located at:

```
~/.pipeops.json
```

### Configuration File Structure

```json
{
  "api_url": "https://api.pipeops.io",
  "auth_token": "your-auth-token",
  "default_project": "my-project",
  "output_format": "text",
  "log_level": "info"
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `api_url` | PipeOps API endpoint | `https://api.pipeops.io` |
| `auth_token` | Authentication token (set by `auth login`) | - |
| `default_project` | Default project for commands | - |
| `output_format` | Output format (`text`, `json`) | `text` |
| `log_level` | Logging level (`debug`, `info`, `warn`, `error`) | `info` |

### Editing Configuration

You can manually edit the configuration file:

```bash
# Open in default editor
$EDITOR ~/.pipeops.json

# Or use a specific editor
nano ~/.pipeops.json
vim ~/.pipeops.json
```

## Environment Variables

Environment variables override configuration file settings.

### Available Environment Variables

#### `PIPEOPS_CONFIG_PATH`

Specify a custom location for the configuration file:

```bash
export PIPEOPS_CONFIG_PATH=/path/to/custom/config.json
pipeops auth login
```

#### `PIPEOPS_API_URL`

Override the API endpoint:

```bash
export PIPEOPS_API_URL=https://api.staging.pipeops.io
pipeops project list
```

This is useful for:
- Testing against staging environments
- Using self-hosted PipeOps instances
- Development and debugging

#### `PIPEOPS_LOG_LEVEL`

Set the logging verbosity:

```bash
export PIPEOPS_LOG_LEVEL=debug
pipeops deploy create --project my-app
```

Available levels:
- `debug`: Detailed debugging information
- `info`: General informational messages (default)
- `warn`: Warning messages only
- `error`: Error messages only

#### `PIPEOPS_AUTH_TOKEN`

Provide authentication token directly:

```bash
export PIPEOPS_AUTH_TOKEN=your-token-here
pipeops project list
```

:::caution
Be careful when using this in scripts. Never commit tokens to version control.
:::

#### `PIPEOPS_NO_COLOR`

Disable colored output:

```bash
export PIPEOPS_NO_COLOR=1
pipeops project list
```

#### `PIPEOPS_OUTPUT_FORMAT`

Set default output format:

```bash
export PIPEOPS_OUTPUT_FORMAT=json
pipeops project list
```

## Global Flags

Global flags can be used with any command and override both configuration file and environment variables.

### `--json`

Output in JSON format:

```bash
pipeops project list --json
```

Example output:
```json
[
  {
    "id": "proj_123",
    "name": "my-app",
    "status": "running",
    "url": "https://my-app.pipeops.io"
  }
]
```

### `--verbose` / `-v`

Enable verbose output:

```bash
pipeops deploy create --project my-app --verbose
```

This shows:
- HTTP requests and responses
- Detailed operation steps
- Timing information

### `--quiet` / `-q`

Suppress non-essential output:

```bash
pipeops deploy create --project my-app --quiet
```

Only errors and critical information will be displayed.

### `--help` / `-h`

Display help information:

```bash
pipeops --help
pipeops deploy --help
pipeops deploy create --help
```

### `--version`

Display CLI version:

```bash
pipeops --version
```

### `--config`

Specify a custom configuration file:

```bash
pipeops --config /path/to/config.json project list
```

## Configuration Precedence

Configuration values are resolved in the following order (highest to lowest priority):

1. **Command-line flags** (highest priority)
2. **Environment variables**
3. **Configuration file**
4. **Default values** (lowest priority)

### Example

```bash
# Configuration file has log_level: "info"
# Environment variable sets LOG_LEVEL=warn
# Command-line flag uses --verbose (debug)

# Result: debug level is used
export PIPEOPS_LOG_LEVEL=warn
pipeops project list --verbose
```

## Multiple Environments

Manage multiple PipeOps environments using different configuration files:

### Production Environment

```bash
# ~/.pipeops.production.json
{
  "api_url": "https://api.pipeops.io",
  "default_project": "production-app"
}
```

Use with:
```bash
export PIPEOPS_CONFIG_PATH=~/.pipeops.production.json
pipeops project list
```

### Staging Environment

```bash
# ~/.pipeops.staging.json
{
  "api_url": "https://api.staging.pipeops.io",
  "default_project": "staging-app"
}
```

Use with:
```bash
export PIPEOPS_CONFIG_PATH=~/.pipeops.staging.json
pipeops project list
```

### Using Aliases

Create shell aliases for different environments:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias pipeops-prod='PIPEOPS_CONFIG_PATH=~/.pipeops.production.json pipeops'
alias pipeops-staging='PIPEOPS_CONFIG_PATH=~/.pipeops.staging.json pipeops'
```

Usage:
```bash
pipeops-prod project list
pipeops-staging deploy create --project my-app
```

## Authentication Configuration

### Login Flow

When you run `pipeops auth login`, the CLI:

1. Opens your browser for OAuth authentication
2. Receives an authorization code
3. Exchanges it for an access token
4. Saves the token to `~/.pipeops.json`

### Token Storage

The authentication token is stored securely in the configuration file:

```json
{
  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Manual Token Configuration

For CI/CD or automated environments, you can set the token manually:

```bash
# Using environment variable (recommended for CI/CD)
export PIPEOPS_AUTH_TOKEN="your-token-here"

# Or add to configuration file
echo '{"auth_token":"your-token-here"}' > ~/.pipeops.json
```

:::tip
For CI/CD pipelines, use secrets management to store tokens securely.
:::

### Token Refresh

Tokens are automatically refreshed by the CLI. If authentication expires:

```bash
pipeops auth login
```

## Project-Specific Configuration

Set a default project to avoid specifying it in every command:

### In Configuration File

```json
{
  "default_project": "my-app"
}
```

### Using Environment Variable

```bash
export PIPEOPS_DEFAULT_PROJECT=my-app
pipeops deploy create
```

### Commands without --project flag

Once set, you can omit the `--project` flag:

```bash
# Instead of
pipeops status proj-123

# You can use
pipeops status
```

## Output Customization

### Text Output (Default)

Human-readable formatted output:

```bash
pipeops project list
```

Output:
```
NAME        STATUS    UPDATED              URL
my-app      running   2024-01-15 10:30:00  https://my-app.pipeops.io
other-app   stopped   2024-01-14 15:20:00  https://other-app.pipeops.io
```

### JSON Output

Machine-readable JSON output:

```bash
pipeops project list --json
```

Output:
```json
[
  {
    "name": "my-app",
    "status": "running",
    "updated": "2024-01-15T10:30:00Z",
    "url": "https://my-app.pipeops.io"
  }
]
```

### Using with jq

Process JSON output with `jq`:

```bash
# Get project names only
pipeops project list --json | jq -r '.[].name'

# Filter running projects
pipeops project list --json | jq '.[] | select(.status=="running")'

# Count projects
pipeops project list --json | jq 'length'
```

## Logging Configuration

### Log Levels

Configure logging verbosity:

```bash
# In configuration file
{
  "log_level": "debug"
}

# Or use environment variable
export PIPEOPS_LOG_LEVEL=debug

# Or use command flag
pipeops --verbose project list
```

### Log Output

By default, logs are written to stderr. Redirect as needed:

```bash
# Save logs to file
pipeops project list 2> debug.log

# Separate output and logs
pipeops project list > output.txt 2> errors.log
```

## Proxy Configuration

If you're behind a proxy, configure it using standard environment variables:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1

pipeops project list
```

### Proxy Authentication

For proxies requiring authentication:

```bash
export HTTP_PROXY=http://username:password@proxy.example.com:8080
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

## Configuration Best Practices

### Security

1. **Protect your configuration file**:
   ```bash
   chmod 600 ~/.pipeops.json
   ```

2. **Never commit configuration files** to version control:
   ```bash
   # Add to .gitignore
   echo ".pipeops.json" >> .gitignore
   ```

3. **Use environment variables in CI/CD**:
   - Don't store tokens in configuration files in CI/CD
   - Use your CI/CD platform's secrets management

### Organization

1. **Use separate configurations** for different environments
2. **Document your configuration** in team wikis or README files
3. **Use consistent naming** for projects and environments

### Performance

1. **Set a default project** if you work primarily on one project
2. **Use JSON output** for scripting to avoid parsing text
3. **Adjust log levels** based on your needs (use `error` or `warn` in production scripts)

## Troubleshooting Configuration

### Configuration File Not Found

If the CLI can't find the configuration file:

```bash
# Create directory
mkdir -p ~/.pipeops

# Create configuration file
echo '{}' > ~/.pipeops.json
```

### Invalid Configuration

If the configuration file is corrupted:

```bash
# Backup existing file
mv ~/.pipeops.json ~/.pipeops.json.backup

# Create new configuration
pipeops auth login
```

### Environment Variable Not Working

Check if the variable is set:

```bash
echo $PIPEOPS_API_URL
```

Ensure it's exported:

```bash
export PIPEOPS_API_URL=https://api.pipeops.io
```

### Clear All Configuration

To start fresh:

```bash
rm ~/.pipeops.json
pipeops auth login
```

## Next Steps

- **[Commands Overview](/docs/cli/commands/overview)**: Learn about available commands
- **[Advanced Usage](/docs/cli/advanced/docker)**: Docker and CI/CD integration
- **[Troubleshooting](/docs/cli/reference/troubleshooting)**: Common issues and solutions
