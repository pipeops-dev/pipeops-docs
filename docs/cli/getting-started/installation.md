---
sidebar_position: 1
title: Installation
---

# Installing the PipeOps CLI

The PipeOps CLI is available for Linux, macOS, Windows, and FreeBSD. Choose the installation method that works best for your platform and workflow.

## Quick Install

### macOS and Linux

Install the PipeOps CLI with a single command:

```bash
curl -fsSL https://cli.pipeops.io/install.sh | bash
```

This script will:
- Detect your operating system and architecture
- Download the appropriate binary
- Install it to `/usr/local/bin/pipeops`
- Make it executable and ready to use

### Windows

Install using PowerShell:

```powershell
irm https://cli.pipeops.io/install.ps1 | iex
```

This script will:
- Download the Windows executable
- Add it to your system PATH
- Make it available from any command prompt

## Package Managers

### Homebrew (macOS and Linux)

If you have Homebrew installed, you can install the PipeOps CLI using:

```bash
brew tap pipeops-dev/tap
brew install pipeops
```

To update:

```bash
brew upgrade pipeops
```

### Go Install

If you have Go 1.21 or later installed:

```bash
go install github.com/pipeops-dev/cli/cmd/pipeops@latest
```

Make sure `$GOPATH/bin` is in your PATH.

## Manual Installation

### Download Pre-built Binaries

Download the latest release for your platform from the [GitHub Releases page](https://github.com/pipeops-dev/cli/releases).

#### Linux

```bash
# Download (replace VERSION with the latest version)
wget https://github.com/pipeops-dev/cli/releases/download/VERSION/pipeops_Linux_x86_64.tar.gz

# Extract
tar -xzf pipeops_Linux_x86_64.tar.gz

# Move to a directory in your PATH
sudo mv pipeops /usr/local/bin/

# Make it executable
sudo chmod +x /usr/local/bin/pipeops
```

#### macOS

```bash
# Download (replace VERSION with the latest version)
curl -LO https://github.com/pipeops-dev/cli/releases/download/VERSION/pipeops_Darwin_x86_64.tar.gz

# Extract
tar -xzf pipeops_Darwin_x86_64.tar.gz

# Move to a directory in your PATH
sudo mv pipeops /usr/local/bin/

# Make it executable
sudo chmod +x /usr/local/bin/pipeops
```

For Apple Silicon (M1/M2):
```bash
curl -LO https://github.com/pipeops-dev/cli/releases/download/VERSION/pipeops_Darwin_arm64.tar.gz
```

#### Windows

1. Download `pipeops_Windows_x86_64.zip` from the [releases page](https://github.com/pipeops-dev/cli/releases)
2. Extract the ZIP file
3. Move `pipeops.exe` to a directory in your PATH (e.g., `C:\Program Files\PipeOps\`)
4. Add the directory to your PATH environment variable if needed

#### FreeBSD

```bash
# Download (replace VERSION with the latest version)
wget https://github.com/pipeops-dev/cli/releases/download/VERSION/pipeops_FreeBSD_x86_64.tar.gz

# Extract
tar -xzf pipeops_FreeBSD_x86_64.tar.gz

# Move to a directory in your PATH
sudo mv pipeops /usr/local/bin/

# Make it executable
sudo chmod +x /usr/local/bin/pipeops
```

## Docker

You can also run the PipeOps CLI using Docker:

```bash
docker pull pipeops/cli:latest

# Run a command
docker run -it --rm pipeops/cli:latest --help

# Run with persistent configuration
docker run -it --rm -v ~/.pipeops:/root/.pipeops pipeops/cli:latest auth login
```

For convenience, create an alias:

```bash
alias pipeops='docker run -it --rm -v ~/.pipeops:/root/.pipeops pipeops/cli:latest'
```

Add this to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.) to make it permanent.

## Verifying Installation

After installation, verify that the CLI is working:

```bash
pipeops --version
```

You should see output similar to:

```
PipeOps CLI version v1.0.0
```

Check that all commands are available:

```bash
pipeops --help
```

## Platform-Specific Notes

### Linux

- The CLI requires `glibc` 2.17 or later
- Some distributions may require additional permissions for installation
- If you encounter permission errors, use `sudo` for installation commands

### macOS

- On macOS 10.15 (Catalina) and later, you may need to allow the binary in **System Preferences > Security & Privacy**
- The first time you run the CLI, macOS may show a security warning
- For Apple Silicon Macs, use the `arm64` binary for better performance

### Windows

- The CLI requires Windows 10 or later
- PowerShell 5.1 or later is recommended
- You may need to run PowerShell as Administrator for installation
- If you see "execution policy" errors, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### FreeBSD

- The CLI has been tested on FreeBSD 12.x and later
- Ensure you have `bash` installed for the best experience

## Updating the CLI

The PipeOps CLI includes a built-in update command:

```bash
pipeops update
```

This will check for the latest version and update automatically.

Alternatively, use your package manager:

```bash
# Homebrew
brew upgrade pipeops

# Go install
go install github.com/pipeops-dev/cli/cmd/pipeops@latest
```

## Troubleshooting Installation

### Command not found

If you see "command not found" after installation:

1. **Check your PATH**: Ensure `/usr/local/bin` (or the directory where you installed) is in your PATH
   ```bash
   echo $PATH
   ```

2. **Reload your shell configuration**:
   ```bash
   source ~/.bashrc  # or ~/.zshrc, ~/.bash_profile, etc.
   ```

3. **Verify the binary exists**:
   ```bash
   ls -l /usr/local/bin/pipeops
   ```

### Permission denied

If you see permission errors:

1. **Make the binary executable**:
   ```bash
   sudo chmod +x /usr/local/bin/pipeops
   ```

2. **Check ownership**:
   ```bash
   ls -l /usr/local/bin/pipeops
   ```

3. **Reinstall with proper permissions**:
   ```bash
   sudo mv pipeops /usr/local/bin/
   ```

### Binary won't run on macOS

If macOS blocks the binary:

1. Try to run the command
2. Open **System Preferences > Security & Privacy**
3. Click "**Allow Anyway**" next to the message about pipeops
4. Run the command again and click "**Open**"

Alternatively, remove the quarantine attribute:
```bash
xattr -d com.apple.quarantine /usr/local/bin/pipeops
```

### Wrong architecture

If you see "cannot execute binary file" or similar errors:

1. Check your system architecture:
   ```bash
   uname -m
   ```

2. Download the correct binary for your architecture:
   - `x86_64` or `amd64` for Intel/AMD processors
   - `arm64` for Apple Silicon (M1/M2) or ARM processors

## Uninstalling

To uninstall the PipeOps CLI:

### Manual installation or quick install
```bash
sudo rm /usr/local/bin/pipeops
rm -rf ~/.pipeops  # Optional: removes configuration
```

### Homebrew
```bash
brew uninstall pipeops
```

### Go install
```bash
rm $(which pipeops)
```

## Next Steps

Now that you have the CLI installed:

1. **[Authenticate](/docs/cli/getting-started/quick-start#authentication)**: Log in to your PipeOps account
2. **[Configure](/docs/cli/getting-started/configuration)**: Set up your CLI preferences
3. **[Quick Start](/docs/cli/getting-started/quick-start)**: Deploy your first project

Need help? Check the [Troubleshooting Guide](/docs/cli/reference/troubleshooting) or join our [Slack community](https://join.slack.com/t/pipeopscommunity/shared_invite/zt-23gmjrl0k-Pzm2cBgIMTsUu5Az73PYKg).
