---
slug: project-actions
sidebar_position: 8
title: Project Actions
---

# Project Actions

This documentation provides a comprehensive guide to navigating and utilizing project actions within PipeOps. With PipeOps, you can efficiently manage project deployments, maintenance, and resource optimization, ensuring seamless project operations.

## Prerequisites

Before proceeding with project actions, ensure you have the following prerequisites:

1. **A PipeOps account**. Use the link [here](https://console.pipeops.io/signup) to sign up on PipeOps if you do not currently have an account.
2. **A deployed project**. This can be a PipeOps template or a project from your Git (Github, Gitlab, Bitbucket) account. You can select a PipeOps template [here](https://github.com/orgs/pipeops-dev/repositories).

## Accessing Project Actions

To access project actions:

- Navigate to the main page of your project within PipeOps.
- Locate the "**Actions**" button and click on it to access project actions.

![Project Actions](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/43/Actions_d80b8a4011.png)

## Exploring Available Options

### Deploy

- Click on the "**Deploy**" button to initiate the redeployment of your application.
- This option redeploys your application to update changes or deploy a new version.
- Allows for seamless integration of new features or bug fixes into your live application.

### Force Rebuild and Deploy

- Use the "**Force Rebuild and Deploy**" button if you need to force a rebuild and redeploy your application.
- Forces a rebuild of your application before deploying, ensuring updates are applied.
- This option is especially helpful in situations where you need to ensure all changes are pushed to production, regardless of any potential errors.

### Pause Project

- Click on "**Pause Project**" to temporarily pause your application, reducing resource usage and costs.
  Temporarily halts your project's operations to conserve resources.
  It is useful for maintenance tasks or during periods of low activity to save on cloud computing costs.

### Rollback

- View the Rollback guide [here](/docs/projects/rollback) for more information concerning this
- Allows you to revert to a previous state or version of your application if needed.
- Enables quick recovery from errors or issues introduced by recent deployments.

### Delete Project

- Click on the "**Delete Project**" button to permanently remove the project and its associated resources from PipeOps.
- A pop-up will appear, prompting you to input the project name to confirm the deletion process.
- Provide the project name as instructed and click the delete button to finalize the deletion process.

![Delete Project](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/43/1_Delete_Project_4865fe9c62.png)
Ensure careful consideration before deletion, as this action is irreversible.

By following these steps, you can efficiently manage project deployments, maintenance, and resource allocation within PipeOps, ensuring smooth project operations and optimization.
