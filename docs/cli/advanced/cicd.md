---
sidebar_position: 2
title: CI/CD Integration
---

# CI/CD Integration

Integrate the PipeOps CLI into your CI/CD pipelines for automated deployments and infrastructure management.

## General Principles

### Authentication in CI/CD

Use environment variables for authentication:

```bash
export PIPEOPS_AUTH_TOKEN="your-token-here"
pipeops deploy create --project my-app
```

**Security Best Practices**:
- Store tokens in your CI/CD platform's secrets manager
- Never commit tokens to version control
- Use read-only tokens when possible
- Rotate tokens regularly

### JSON Output for Scripting

Always use `--json` flag in CI/CD scripts:

```bash
STATUS=$(pipeops deploy status --project my-app --json | jq -r '.status')
if [ "$STATUS" = "success" ]; then
  echo "Deployment successful"
  exit 0
else
  echo "Deployment failed"
  exit 1
fi
```

## GitHub Actions

### Basic Deployment

```yaml
name: Deploy to PipeOps

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install PipeOps CLI
        run: |
          curl -fsSL https://cli.pipeops.io/install.sh | bash
          echo "$HOME/.local/bin" >> $GITHUB_PATH

      - name: Deploy application
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          pipeops deploy create --project ${{ github.event.repository.name }}
```

### Advanced GitHub Actions Workflow

```yaml
name: Build, Test, and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  deploy:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Install PipeOps CLI
        run: |
          curl -fsSL https://cli.pipeops.io/install.sh | bash
          echo "$HOME/.local/bin" >> $GITHUB_PATH
      
      - name: Verify authentication
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: pipeops auth status
      
      - name: Deploy to production
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          pipeops deploy create \
            --project my-app \
            --branch main
      
      - name: Monitor deployment
        env:
          PIPEOPS_AUTH_TOKEN: ${{ secrets.PIPEOPS_TOKEN }}
        run: |
          for i in {1..30}; do
            STATUS=$(pipeops deploy status --project my-app --json | jq -r '.status')
            echo "Deployment status: $STATUS"
            
            if [ "$STATUS" = "success" ]; then
              echo "✓ Deployment successful!"
              exit 0
            elif [ "$STATUS" = "failed" ]; then
              echo "✗ Deployment failed!"
              pipeops deploy logs --project my-app
              exit 1
            fi
            
            sleep 10
          done
          
          echo "Deployment timeout"
          exit 1
      
      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ Deployment failed. Check the logs for details.'
            })
```

### Reusable GitHub Action

Create `.github/actions/pipeops-deploy/action.yml`:

```yaml
name: 'PipeOps Deploy'
description: 'Deploy to PipeOps'
inputs:
  project:
    description: 'Project name'
    required: true
  token:
    description: 'PipeOps auth token'
    required: true
runs:
  using: 'composite'
  steps:
    - name: Install PipeOps CLI
      shell: bash
      run: |
        curl -fsSL https://cli.pipeops.io/install.sh | bash
        echo "$HOME/.local/bin" >> $GITHUB_PATH
    
    - name: Deploy
      shell: bash
      env:
        PIPEOPS_AUTH_TOKEN: ${{ inputs.token }}
      run: |
        pipeops deploy create --project ${{ inputs.project }}
```

Use it:

```yaml
- uses: ./.github/actions/pipeops-deploy
  with:
    project: my-app
    token: ${{ secrets.PIPEOPS_TOKEN }}
```

## GitLab CI

### Basic Pipeline

```yaml
stages:
  - deploy

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl bash
    - curl -fsSL https://cli.pipeops.io/install.sh | bash
    - export PATH=$PATH:/root/.local/bin
  script:
    - pipeops auth status
    - pipeops deploy create --project $CI_PROJECT_NAME
  variables:
    PIPEOPS_AUTH_TOKEN: $PIPEOPS_TOKEN
  only:
    - main
```

### Multi-Environment Pipeline

```yaml
stages:
  - build
  - test
  - deploy

variables:
  PIPEOPS_PROJECT: my-app

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

test:
  stage: test
  script:
    - npm test

deploy-staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl bash jq
    - curl -fsSL https://cli.pipeops.io/install.sh | bash
    - export PATH=$PATH:/root/.local/bin
  script:
    - pipeops deploy create --project ${PIPEOPS_PROJECT}-staging
  environment:
    name: staging
    url: https://staging.example.com
  variables:
    PIPEOPS_AUTH_TOKEN: $PIPEOPS_STAGING_TOKEN
  only:
    - develop

deploy-production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl bash jq
    - curl -fsSL https://cli.pipeops.io/install.sh | bash
    - export PATH=$PATH:/root/.local/bin
  script:
    - pipeops deploy create --project ${PIPEOPS_PROJECT}
    - |
      for i in {1..30}; do
        STATUS=$(pipeops deploy status --project ${PIPEOPS_PROJECT} --json | jq -r '.status')
        if [ "$STATUS" = "success" ]; then
          exit 0
        elif [ "$STATUS" = "failed" ]; then
          exit 1
        fi
        sleep 10
      done
  environment:
    name: production
    url: https://example.com
  variables:
    PIPEOPS_AUTH_TOKEN: $PIPEOPS_PRODUCTION_TOKEN
  only:
    - main
  when: manual
```

## Jenkins

### Declarative Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        PIPEOPS_AUTH_TOKEN = credentials('pipeops-token')
        PROJECT_NAME = 'my-app'
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
        
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    export PATH=$PATH:$HOME/.local/bin
                    pipeops deploy create --project $PROJECT_NAME
                '''
            }
        }
        
        stage('Monitor') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def deployed = false
                    for (int i = 0; i < 30; i++) {
                        def status = sh(
                            script: 'pipeops deploy status --project $PROJECT_NAME --json | jq -r .status',
                            returnStdout: true
                        ).trim()
                        
                        if (status == 'success') {
                            deployed = true
                            break
                        } else if (status == 'failed') {
                            error('Deployment failed')
                        }
                        sleep(10)
                    }
                    
                    if (!deployed) {
                        error('Deployment timeout')
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
            sh 'pipeops deploy logs --project $PROJECT_NAME'
        }
    }
}
```

## CircleCI

```yaml
version: 2.1

jobs:
  build-and-test:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - run:
          name: Install PipeOps CLI
          command: |
            curl -fsSL https://cli.pipeops.io/install.sh | bash
            echo 'export PATH=$PATH:$HOME/.local/bin' >> $BASH_ENV
      
      - run:
          name: Deploy to PipeOps
          command: |
            pipeops deploy create --project my-app
          environment:
            PIPEOPS_AUTH_TOKEN: ${PIPEOPS_TOKEN}
      
      - run:
          name: Wait for deployment
          command: |
            for i in {1..30}; do
              STATUS=$(pipeops deploy status --project my-app --json | jq -r '.status')
              if [ "$STATUS" = "success" ]; then
                exit 0
              elif [ "$STATUS" = "failed" ]; then
                exit 1
              fi
              sleep 10
            done
            exit 1

workflows:
  build-test-deploy:
    jobs:
      - build-and-test
      - deploy:
          requires:
            - build-and-test
          filters:
            branches:
              only: main
```

## Travis CI

```yaml
language: node_js
node_js:
  - '18'

cache:
  directories:
    - node_modules

install:
  - npm ci

script:
  - npm test
  - npm run build

before_deploy:
  - curl -fsSL https://cli.pipeops.io/install.sh | bash
  - export PATH=$PATH:$HOME/.local/bin

deploy:
  provider: script
  script: pipeops deploy create --project my-app
  on:
    branch: main

env:
  global:
    - secure: "encrypted-pipeops-token"
```

## Azure Pipelines

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: |
      npm ci
      npm test
      npm run build
    displayName: 'Build and test'

  - script: |
      curl -fsSL https://cli.pipeops.io/install.sh | bash
      export PATH=$PATH:$HOME/.local/bin
      pipeops deploy create --project my-app
    displayName: 'Deploy to PipeOps'
    env:
      PIPEOPS_AUTH_TOKEN: $(PIPEOPS_TOKEN)
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
```

## Best Practices

### 1. Use Dedicated Service Accounts

Create dedicated tokens for CI/CD:
- Separate tokens per environment (staging, production)
- Limit permissions to minimum required
- Name tokens clearly (e.g., "GitHub Actions Production")

### 2. Implement Deployment Gates

```bash
# Wait for health checks
pipeops deploy create --project my-app
sleep 30

# Verify deployment
HEALTH=$(curl -s https://my-app.example.com/health | jq -r '.status')
if [ "$HEALTH" != "ok" ]; then
  pipeops deploy rollback --project my-app
  exit 1
fi
```

### 3. Log Deployment Information

```bash
# Capture deployment details
DEPLOY_ID=$(pipeops deploy create --project my-app --json | jq -r '.id')
echo "Deployment ID: $DEPLOY_ID" >> deployment-info.txt

# Save logs
pipeops deploy logs --project my-app --deployment-id $DEPLOY_ID > deploy.log
```

### 4. Handle Failures Gracefully

```bash
set +e  # Don't exit on error

pipeops deploy create --project my-app
DEPLOY_RESULT=$?

if [ $DEPLOY_RESULT -ne 0 ]; then
  echo "Deployment failed, fetching logs..."
  pipeops deploy logs --project my-app
  
  # Notify team
  curl -X POST $SLACK_WEBHOOK \
    -d '{"text":"Deployment failed for my-app"}'
  
  exit 1
fi
```

### 5. Use Retries for Transient Failures

```bash
# Retry logic
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if pipeops deploy create --project my-app; then
    echo "Deployment successful"
    break
  else
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Retry $RETRY_COUNT/$MAX_RETRIES"
    sleep 30
  fi
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "Deployment failed after $MAX_RETRIES attempts"
  exit 1
fi
```

## See Also

- [Docker Integration](/docs/cli/advanced/docker)
- [Configuration](/docs/cli/getting-started/configuration)
- [Authentication Commands](/docs/cli/commands/authentication)
- [Deployment Commands](/docs/cli/commands/deployments)
