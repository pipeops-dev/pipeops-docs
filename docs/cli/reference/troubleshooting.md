---
sidebar_position: 1
title: Troubleshooting
---

# Troubleshooting the PipeOps CLI

Common issues and solutions when using the PipeOps CLI.

## Installation Issues

### Command Not Found

**Problem**: After installation, `pipeops` command is not found.

**Solution**:

1. Check if the binary is in your PATH:
   ```bash
   echo $PATH
   ```

2. Add the installation directory to PATH:
   ```bash
   # For bash
   echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
   source ~/.bashrc
   
   # For zsh
   echo 'export PATH=$PATH:/usr/local/bin' >> ~/.zshrc
   source ~/.zshrc
   ```

3. Verify the binary location:
   ```bash
   which pipeops
   ls -l /usr/local/bin/pipeops
   ```

### Permission Denied

**Problem**: Cannot execute the CLI binary.

**Solution**:

```bash
# Make the binary executable
sudo chmod +x /usr/local/bin/pipeops

# Or reinstall with proper permissions
sudo curl -fsSL https://cli.pipeops.io/install.sh | bash
```

### Wrong Architecture

**Problem**: "cannot execute binary file: Exec format error"

**Solution**:

1. Check your system architecture:
   ```bash
   uname -m
   ```

2. Download the correct binary:
   - `x86_64` or `amd64`: Intel/AMD processors
   - `arm64` or `aarch64`: ARM processors (e.g., Apple Silicon)

---

## Authentication Issues

### Authentication Failed

**Problem**: `pipeops auth login` fails.

**Solutions**:

1. **Check network connectivity**:
   ```bash
   curl -v https://api.pipeops.io/health
   ```

2. **Clear existing configuration**:
   ```bash
   rm ~/.pipeops.json
   pipeops auth login
   ```

3. **Use manual browser authentication**:
   ```bash
   pipeops auth login --no-browser
   # Copy and paste the URL into your browser
   ```

### Token Expired

**Problem**: "authentication token has expired"

**Solution**:

```bash
# Re-authenticate
pipeops auth logout
pipeops auth login
```

### Invalid Token

**Problem**: Commands fail with "invalid token" error.

**Solution**:

1. **Check token in configuration**:
   ```bash
   cat ~/.pipeops.json
   ```

2. **Verify token format**:
   ```bash
   # Token should be a JWT (starts with eyJ)
   echo $PIPEOPS_AUTH_TOKEN
   ```

3. **Re-authenticate**:
   ```bash
   pipeops auth login
   ```

---

## Command Execution Issues

### Command Timeout

**Problem**: Commands hang or timeout.

**Solutions**:

1. **Check API connectivity**:
   ```bash
   curl -v https://api.pipeops.io/health
   ```

2. **Retry the request**:
   ```bash
   pipeops list --json
   ```

3. **Check for proxy issues**:
   ```bash
   # Verify proxy settings
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   
   # Temporarily disable proxy
   unset HTTP_PROXY HTTPS_PROXY
   pipeops list
   ```

### Rate Limiting

**Problem**: "Too many requests" or 429 error.

**Solution**:

1. Wait and retry:
   ```bash
   sleep 60
   pipeops list
   ```

2. Implement retry logic in scripts:
   ```bash
   for i in {1..3}; do
     if pipeops status proj-123; then
       break
     fi
     sleep 30
   done
   ```

### API Errors

**Problem**: 500, 502, 503 errors from API.

**Solution**:

1. Check PipeOps status page
2. Retry after a few moments
3. Use verbose mode to see details:
   ```bash
   pipeops project list --verbose
   ```

---

## Project and Deployment Issues

### Project Not Found

**Problem**: "project not found" error.

**Solutions**:

1. **List available projects**:
   ```bash
   pipeops list
   ```

2. **Check project ID**:
   ```bash
   # Get the correct project ID
   pipeops list --json | jq '.[] | {id, name}'
   ```

3. **Set default project**:
   ```bash
   export PIPEOPS_DEFAULT_PROJECT=proj-123
   ```

### Deployment Failures

**Problem**: Deployment fails.

**Solutions**:

1. **Check deployment logs**:
   ```bash
   pipeops deploy logs --project my-app
   ```

2. **Verify build configuration**:
   ```bash
   pipeops project info --project my-app
   ```

3. **Check environment variables**:
   ```bash
   pipeops project env list --project my-app
   ```

4. **Try manual deployment from web UI** to isolate CLI issues

---

## Configuration Issues

### Config File Errors

**Problem**: "invalid config file" or JSON parse errors.

**Solution**:

1. **Validate JSON**:
   ```bash
   cat ~/.pipeops.json | jq .
   ```

2. **Reset configuration**:
   ```bash
   mv ~/.pipeops.json ~/.pipeops.json.backup
   echo '{}' > ~/.pipeops.json
   pipeops auth login
   ```

### Environment Variables Not Working

**Problem**: Environment variables are ignored.

**Solutions**:

1. **Verify variable is exported**:
   ```bash
   export PIPEOPS_API_URL=https://api.pipeops.io
   echo $PIPEOPS_API_URL
   ```

2. **Check variable precedence**:
   - Command flags override environment variables
   - Environment variables override config file

3. **Use correct variable names**:
   ```bash
   # Correct
   export PIPEOPS_AUTH_TOKEN="..."
   
   # Incorrect
   export PIPEOPS_TOKEN="..."  # Wrong name
   ```

---

## Network Issues

### Proxy Problems

**Problem**: Cannot connect through corporate proxy.

**Solution**:

```bash
# Set proxy environment variables
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1

# With authentication
export HTTP_PROXY=http://user:pass@proxy.company.com:8080
```

### SSL Certificate Errors

**Problem**: SSL verification failures.

**Solutions**:

1. **Update CA certificates**:
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install ca-certificates
   
   # macOS
   brew install ca-certificates
   ```

2. **Verify PipeOps certificate**:
   ```bash
   openssl s_client -connect api.pipeops.io:443
   ```

### DNS Resolution Issues

**Problem**: Cannot resolve api.pipeops.io.

**Solution**:

```bash
# Test DNS resolution
nslookup api.pipeops.io
dig api.pipeops.io

# Try alternate DNS
# Google DNS
export PIPEOPS_API_URL=https://8.8.8.8  # Not recommended
```

---

## Agent Installation Issues

### Agent Install Fails

**Problem**: `pipeops agent install` fails.

**Solutions**:

1. **Check prerequisites**:
   ```bash
   # Verify system requirements
   free -h  # Check memory (min 2GB)
   df -h    # Check disk space (min 20GB)
   ```

2. **Run with sudo**:
   ```bash
   sudo pipeops agent install
   ```

3. **Check port availability**:
   ```bash
   # Verify ports are not in use
   sudo lsof -i :6443
   sudo lsof -i :10250
   ```

4. **View installation logs**:
   ```bash
   sudo pipeops agent install --verbose
   ```

### Agent Join Fails

**Problem**: Cannot join worker node to cluster.

**Solutions**:

1. **Verify join token**:
   ```bash
   # Get new token from control plane
   sudo pipeops agent info --show-join-token
   ```

2. **Check network connectivity**:
   ```bash
   # Test connection to control plane
   telnet <control-plane-ip> 6443
   ```

3. **Check firewall rules**:
   ```bash
   # Ensure required ports are open
   sudo ufw status
   ```

---

## Performance Issues

### Slow Command Execution

**Problem**: Commands are very slow.

**Solutions**:

1. **Check network latency**:
   ```bash
   ping api.pipeops.io
   ```

2. **Use quiet mode**:
   ```bash
   pipeops project list --quiet
   ```

3. **Disable verbose logging**:
   ```bash
   export PIPEOPS_LOG_LEVEL=error
   ```

### High Memory Usage

**Problem**: CLI uses excessive memory.

**Solution**:

This is usually not an issue with the CLI itself. Check:

1. Running processes
2. System memory availability
3. Consider using Docker for isolation

---

## Debugging

### Enable Debug Logging

```bash
# Set log level
export PIPEOPS_LOG_LEVEL=debug

# Or use flag
pipeops project list --verbose
```

### Capture Debug Information

```bash
# Capture all output
pipeops project list --verbose > output.log 2>&1

# Or separate stdout and stderr
pipeops project list --verbose > output.log 2> errors.log
```

### Check CLI Version

```bash
pipeops --version
```

### Verify Configuration

```bash
# Show current configuration
cat ~/.pipeops.json | jq .

# Show environment variables
env | grep PIPEOPS
```

---

## Getting Help

### Built-in Help

```bash
# General help
pipeops --help

# Command-specific help
pipeops list --help
pipeops status --help
pipeops logs --help
```

### Check API Status

Visit the PipeOps status page or:

```bash
curl https://api.pipeops.io/health
```

### Community Support

- **Slack**: [PipeOps Community](https://join.slack.com/t/pipeopscommunity/shared_invite/zt-23gmjrl0k-Pzm2cBgIMTsUu5Az73PYKg)
- **Discord**: [PipeOps Discord](https://discord.gg/PQscGtfFD2)
- **GitHub**: [Report issues](https://github.com/pipeops-dev/cli/issues)

### Contact Support

For persistent issues:
- Email: support@pipeops.io
- Support page: [PipeOps Support](https://pipeops.io/support)

---

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `command not found: pipeops` | CLI not in PATH | Add to PATH or reinstall |
| `not authenticated` | No valid auth token | Run `pipeops auth login` |
| `token expired` | Auth token expired | Re-authenticate |
| `project not found` | Invalid project name | Check project name with `project list` |
| `permission denied` | Insufficient permissions | Use `sudo` or check file permissions |
| `connection refused` | API unreachable | Check network/firewall |
| `invalid configuration` | Corrupt config file | Reset configuration |

---

## Still Having Issues?

If you've tried the solutions above and still have problems:

1. **Collect debug information**:
   ```bash
   pipeops --version
   pipeops auth status
   cat ~/.pipeops.json
   env | grep PIPEOPS
   ```

2. **Create a minimal reproduction**:
   ```bash
   # Document exact steps to reproduce
   pipeops auth login
   pipeops project list
   # etc.
   ```

3. **Contact support** with:
   - CLI version
   - Operating system
   - Error messages
   - Steps to reproduce
   - Debug logs (with sensitive data removed)

## See Also

- [Configuration Guide](/docs/cli/getting-started/configuration)
- [Installation Guide](/docs/cli/getting-started/installation)
- [Commands Overview](/docs/cli/commands/overview)
