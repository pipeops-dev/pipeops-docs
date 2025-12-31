---
sidebar_position: 1
title: Docker Integration
---

# Docker Integration

Run the PipeOps CLI in Docker containers for isolated, reproducible environments.

## Using the Official Docker Image

### Pull the Image

```bash
docker pull pipeops/cli:latest
```

### Run a Single Command

```bash
docker run --rm pipeops/cli:latest --version
```

### Interactive Session

```bash
docker run -it --rm pipeops/cli:latest
```

## Persistent Configuration

To maintain authentication between container runs, mount the configuration directory:

```bash
docker run -it --rm \
  -v ~/.pipeops:/root/.pipeops \
  pipeops/cli:latest auth login
```

### Using Environment Variables

Pass authentication tokens via environment variables:

```bash
docker run -it --rm \
  -e PIPEOPS_AUTH_TOKEN=$PIPEOPS_AUTH_TOKEN \
  pipeops/cli:latest project list
```

## Creating a Docker Alias

For convenience, create a shell alias:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias pipeops='docker run -it --rm -v ~/.pipeops:/root/.pipeops pipeops/cli:latest'
```

Usage:
```bash
pipeops auth login
pipeops list
pipeops status proj-123
```

## CI/CD with Docker

### GitHub Actions

```yaml
name: Monitor with PipeOps CLI

on:
  schedule:
    - cron: '0 */6 * * *'

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check project status
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          docker run --rm \
            -e PIPEOPS_AUTH_TOKEN \
            pipeops/cli:latest \
            status proj-123
```

### GitLab CI

```yaml
monitor:
  image: pipeops/cli:latest
  script:
    - pipeops auth status
    - pipeops list
    - pipeops status proj-123
  variables:
    PIPEOPS_AUTH_TOKEN: $CI_PIPEOPS_TOKEN
  only:
    - main
```

### Jenkins

```groovy
pipeline {
    agent {
        docker {
            image 'pipeops/cli:latest'
        }
    }
    environment {
        PIPEOPS_AUTH_TOKEN = credentials('pipeops-token')
    }
    stages {
        stage('Monitor') {
            steps {
                sh 'pipeops list'
                sh 'pipeops status proj-123'
            }
        }
    }
}
```

## Building Custom Images

Create a custom image with pre-configured settings:

```dockerfile
FROM pipeops/cli:latest

# Copy configuration
COPY .pipeops.json /root/.pipeops.json

# Set default project
ENV PIPEOPS_DEFAULT_PROJECT=my-app

# Set entrypoint
ENTRYPOINT ["pipeops"]
```

Build and use:

```bash
docker build -t my-pipeops-cli .
docker run --rm my-pipeops-cli project list
```

## Dockerfile for Development

```dockerfile
FROM pipeops/cli:latest

# Install additional tools
RUN apk add --no-cache \
    git \
    jq \
    curl

# Copy scripts
COPY scripts/ /scripts/
RUN chmod +x /scripts/*

# Set working directory
WORKDIR /workspace

ENTRYPOINT ["/scripts/deploy.sh"]
```

## Docker Compose

Use Docker Compose for complex workflows:

```yaml
version: '3.8'

services:
  pipeops-cli:
    image: pipeops/cli:latest
    environment:
      - PIPEOPS_AUTH_TOKEN=${PIPEOPS_AUTH_TOKEN}
      - PIPEOPS_DEFAULT_PROJECT=proj-123
    volumes:
      - ~/.pipeops:/root/.pipeops
      - ./scripts:/scripts
    command: status
```

Run with:
```bash
docker-compose run pipeops-cli
```

## Volume Mounts for Local Access

When working with local configuration:

```bash
docker run -it --rm \
  -v ~/.pipeops:/root/.pipeops \
  -v $(pwd):/workspace \
  -w /workspace \
  pipeops/cli:latest \
  list --json
```

## Multi-Stage Builds

For CI/CD pipelines with testing:

```dockerfile
# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm test

# Deploy stage
FROM pipeops/cli:latest
COPY --from=build /app/dist /dist
ENV PIPEOPS_AUTH_TOKEN=${PIPEOPS_AUTH_TOKEN}
CMD ["deploy", "create", "--project", "my-app"]
```

## Troubleshooting Docker

### Permission Issues

If you encounter permission errors with volume mounts:

```bash
# Run as current user
docker run -it --rm \
  -u $(id -u):$(id -g) \
  -v ~/.pipeops:/home/.pipeops \
  -e HOME=/home \
  pipeops/cli:latest
```

### Network Issues

If the container can't reach the PipeOps API:

```bash
# Use host network
docker run -it --rm \
  --network host \
  -v ~/.pipeops:/root/.pipeops \
  pipeops/cli:latest project list
```

### Cache Issues

Clear Docker cache if pulling stale images:

```bash
docker pull pipeops/cli:latest --no-cache
```

## Best Practices

1. **Use Specific Tags**: Pin to specific versions in production
   ```bash
   docker pull pipeops/cli:v1.0.0
   ```

2. **Secure Secrets**: Use Docker secrets or environment files
   ```bash
   docker run --rm --env-file .env pipeops/cli:latest
   ```

3. **Minimal Images**: Use Alpine-based images for smaller size

4. **Layer Caching**: Optimize Dockerfile for build cache

5. **Health Checks**: Add health checks in production

## See Also

- [CI/CD Integration](/docs/cli/advanced/cicd)
- [Configuration](/docs/cli/getting-started/configuration)
- [Troubleshooting](/docs/cli/reference/troubleshooting)
