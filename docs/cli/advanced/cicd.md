---
sidebar_position: 2
title: CI/CD Integration
---

# CI/CD Integration

Integrate the PipeOps CLI into your CI/CD pipelines for monitoring infrastructure and viewing deployment status.

:::note
The CLI currently focuses on **read operations** for monitoring. For deploying applications, use the [PipeOps Web UI](https://app.pipeops.io) or integrate with Git-based deployments. You can use the CLI to monitor project status and view logs during your CI/CD processes.
:::

## General Principles

### Authentication in CI/CD

Use environment variables for authentication:

```bash
export PIPEOPS_AUTH_TOKEN="your-token-here"
pipeops status proj-123
```

**Security Best Practices**:
- Store tokens in your CI/CD platform's secrets manager
- Never commit tokens to version control
- Use read-only tokens when possible
- Rotate tokens regularly

### JSON Output for Scripting

Always use `--json` flag in CI/CD scripts:

```bash
STATUS=$(pipeops status proj-123 --json | jq -r '.status')
if [ "$STATUS" = "running" ]; then
  echo "Project is running"
  exit 0
else
  echo "Project check failed"
  exit 1
fi
```

## GitHub Actions

### Monitor Project Status

```yaml
name: Monitor PipeOps Project

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Install PipeOps CLI
        run: |
          curl -fsSL https://cli.pipeops.io/install.sh | bash
          echo "$HOME/.local/bin" >> $GITHUB_PATH

      - name: Check project status
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          pipeops status proj-123 --json
```

### List Projects and Check Health

```yaml
name: List PipeOps Resources

on:
  workflow_dispatch:

jobs:
  list-resources:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install PipeOps CLI
        run: |
          curl -fsSL https://cli.pipeops.io/install.sh | bash
          echo "$HOME/.local/bin" >> $GITHUB_PATH
      
      - name: List projects
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          pipeops list --json
      
      - name: Check project health
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          PROJECT_STATUS=$(pipeops status proj-123 --json | jq -r '.status')
          echo "Project status: $PROJECT_STATUS"
          if [ "$PROJECT_STATUS" != "running" ]; then
            echo "::warning::Project is not running"
          fi
```

### View Logs During CI/CD

```yaml
name: View Application Logs

on:
  workflow_dispatch:
    inputs:
      project_id:
        description: 'Project ID'
        required: true
        default: 'proj-123'

jobs:
  view-logs:
    runs-on: ubuntu-latest
    steps:
      - name: Install PipeOps CLI
        run: |
          curl -fsSL https://cli.pipeops.io/install.sh | bash
          echo "$HOME/.local/bin" >> $GITHUB_PATH
      
      - name: Fetch logs
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          pipeops logs ${{ github.event.inputs.project_id }} --lines 100
```

## GitLab CI

### Monitor Projects

```yaml
stages:
  - monitor

monitor-projects:
  stage: monitor
  image: alpine:latest
  before_script:
    - apk add --no-cache curl bash jq
    - curl -fsSL https://cli.pipeops.io/install.sh | bash
    - export PATH=$PATH:/root/.local/bin
  script:
    - pipeops list --json
    - pipeops status proj-123
  variables:
    PIPEOPS_AUTH_TOKEN: $PIPEOPS_TOKEN
  only:
    - schedules

check-logs:
  stage: monitor
  image: alpine:latest
  before_script:
    - apk add --no-cache curl bash
    - curl -fsSL https://cli.pipeops.io/install.sh | bash
    - export PATH=$PATH:/root/.local/bin
  script:
    - pipeops logs proj-123 --lines 50
  variables:
    PIPEOPS_AUTH_TOKEN: $PIPEOPS_TOKEN
  when: manual
```

## Jenkins

### Declarative Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        PIPEOPS_AUTH_TOKEN = credentials('pipeops-token')
        PROJECT_ID = 'proj-123'
    }
    
    stages {
        stage('Install CLI') {
            steps {
                sh '''
                    curl -fsSL https://cli.pipeops.io/install.sh | bash
                    export PATH=$PATH:$HOME/.local/bin
                '''
            }
        }
        
        stage('List Projects') {
            steps {
                sh '''
                    export PATH=$PATH:$HOME/.local/bin
                    pipeops list --json
                '''
            }
        }
        
        stage('Check Status') {
            steps {
                sh '''
                    export PATH=$PATH:$HOME/.local/bin
                    pipeops status $PROJECT_ID
                '''
            }
        }
        
        stage('View Logs') {
            steps {
                sh '''
                    export PATH=$PATH:$HOME/.local/bin
                    pipeops logs $PROJECT_ID --lines 100
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Monitoring complete'
        }
    }
}
```

## CircleCI

```yaml
version: 2.1

jobs:
  monitor:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      
      - run:
          name: Install PipeOps CLI
          command: |
            curl -fsSL https://cli.pipeops.io/install.sh | bash
            echo 'export PATH=$PATH:$HOME/.local/bin' >> $BASH_ENV
      
      - run:
          name: List projects
          command: pipeops list --json
      
      - run:
          name: Check project status
          command: pipeops status proj-123

workflows:
  version: 2
  scheduled-monitoring:
    triggers:
      - schedule:
          cron: "0 * * * *"
          filters:
            branches:
              only: main
    jobs:
      - monitor
```

## Azure Pipelines

```yaml
trigger:
  - main

schedules:
  - cron: "0 */6 * * *"
    displayName: Monitor projects every 6 hours
    branches:
      include:
        - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - script: |
      curl -fsSL https://cli.pipeops.io/install.sh | bash
      export PATH=$PATH:$HOME/.local/bin
    displayName: 'Install PipeOps CLI'

  - script: |
      export PATH=$PATH:$HOME/.local/bin
      pipeops list --json
    displayName: 'List projects'
    env:
      PIPEOPS_AUTH_TOKEN: $(PIPEOPS_TOKEN)

  - script: |
      export PATH=$PATH:$HOME/.local/bin
      pipeops status proj-123
    displayName: 'Check project status'
    env:
      PIPEOPS_AUTH_TOKEN: $(PIPEOPS_TOKEN)

  - script: |
      export PATH=$PATH:$HOME/.local/bin
      pipeops logs proj-123 --lines 50
    displayName: 'View recent logs'
    env:
      PIPEOPS_AUTH_TOKEN: $(PIPEOPS_TOKEN)
```

## Bitbucket Pipelines

```yaml
pipelines:
  custom:
    monitor-projects:
      - step:
          name: Monitor PipeOps Projects
          image: alpine:latest
          script:
            - apk add --no-cache curl bash jq
            - curl -fsSL https://cli.pipeops.io/install.sh | bash
            - export PATH=$PATH:/root/.local/bin
            - pipeops list --json
            - pipeops status proj-123
            - pipeops logs proj-123 --lines 50

  schedules:
    hourly-monitor:
      - step:
          name: Scheduled Monitor
          image: alpine:latest
          script:
            - apk add --no-cache curl bash
            - curl -fsSL https://cli.pipeops.io/install.sh | bash
            - export PATH=$PATH:/root/.local/bin
            - pipeops status proj-123
```

## Best Practices

### Error Handling

Always handle errors gracefully:

```bash
#!/bin/bash
set -e

# Check authentication
if ! pipeops auth status > /dev/null 2>&1; then
  echo "Authentication failed"
  exit 1
fi

# List projects with error handling
if ! pipeops list --json > projects.json; then
  echo "Failed to list projects"
  exit 1
fi

# Parse and check project status
PROJECT_COUNT=$(jq 'length' projects.json)
echo "Found $PROJECT_COUNT projects"
```

### Logging and Notifications

Send notifications based on status:

```bash
STATUS=$(pipeops status proj-123 --json | jq -r '.status')

if [ "$STATUS" != "running" ]; then
  # Send notification (example with Slack)
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"⚠️ Project status: $STATUS\"}" \
    $SLACK_WEBHOOK_URL
fi
```

### Caching CLI Installation

Cache the CLI installation to speed up builds:

```yaml
# GitHub Actions example
- name: Cache PipeOps CLI
  uses: actions/cache@v3
  with:
    path: ~/.local/bin
    key: ${{ runner.os }}-pipeops-cli

- name: Install PipeOps CLI
  if: steps.cache.outputs.cache-hit != 'true'
  run: |
    curl -fsSL https://cli.pipeops.io/install.sh | bash
```

## Monitoring Patterns

### Health Check Script

Create a reusable health check script:

```bash
#!/bin/bash
# healthcheck.sh

PROJECT_ID=$1

if [ -z "$PROJECT_ID" ]; then
  echo "Usage: $0 <project-id>"
  exit 1
fi

echo "Checking health of project: $PROJECT_ID"

# Get project status
STATUS=$(pipeops status "$PROJECT_ID" --json | jq -r '.status')

case "$STATUS" in
  "running")
    echo "✓ Project is healthy"
    exit 0
    ;;
  "stopped")
    echo "⚠ Project is stopped"
    exit 1
    ;;
  *)
    echo "✗ Project status unknown: $STATUS"
    exit 2
    ;;
esac
```

Use in CI:

```bash
chmod +x healthcheck.sh
./healthcheck.sh proj-123
```

## Troubleshooting CI/CD

### Common Issues

#### CLI Not Found

```bash
# Ensure PATH is updated
export PATH=$PATH:$HOME/.local/bin
pipeops --version
```

#### Authentication Failed

```bash
# Verify token is set
echo $PIPEOPS_AUTH_TOKEN | wc -c

# Test authentication
pipeops auth status
```

#### JSON Parsing Errors

```bash
# Validate JSON output
pipeops list --json | jq .

# Handle missing jq
if ! command -v jq &> /dev/null; then
  apt-get install -y jq  # Debian/Ubuntu
  # or
  apk add jq  # Alpine
fi
```

## Next Steps

- **[Commands Overview](/docs/cli/commands/overview)** - Full command reference
- **[Configuration](/docs/cli/getting-started/configuration)** - Configure CLI for CI/CD
- **[Troubleshooting](/docs/cli/reference/troubleshooting)** - Common issues and solutions
