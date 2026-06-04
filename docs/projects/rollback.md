---
slug: rollback
sidebar_position: 10
title: Rollback
description: "Revert a PipeOps deployment to a previous version using git commit history or deployment action history."
---

# Rollback

Rollback lets you revert your project to a previously deployed version. Use it to quickly recover from a bad deployment without waiting for a new build.

## Triggering a Rollback

There are two ways to initiate a rollback:

- **From the Actions menu** — Click the **Actions** button on any project page and select **Rollback**.
- **From the History tab** — Locate the deployment you want to revert to and click the **Rollback** button on that row. Only rows with a **Deployed** status show this option.

![Project Actions Rollback](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-rollback-option.png)

## Selecting a Version

Both entry points open the **Rollback Project** modal, which offers two methods for selecting the target version:

### By Git

Rolls back using your Git commit history. Each entry shows the commit SHA, commit message, deployment status, and timestamp. Select the commit you want to revert to and click **Rollback**.

![Rollback By Git](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-rollback-modal.png)

### By Action

Rolls back using your deployment action history. Each entry shows the build SHA, the action that triggered it, deployment status, and timestamp. Select the build you want to revert to and click **Rollback**.

![Rollback By Action](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-rollback-by-actions.png)

Click **Cancel** at any point to close the modal without making changes.

## After Rollback

Once confirmed, a new deployment is triggered immediately using the selected version.

The rollback deployment will appear as a new entry in the **History** tab once complete. You can then verify that the intended version is live via the **Live Url** button.
