---
slug: rollback
sidebar_position: 8
title: Rollback
---

# Rollback

This guide introduces PipeOps' rollback feature for easy deployment management. Recent updates offer a user-friendly option with visual confirmation for swift reversals and notifications for conflicts. Detailed logs aid monitoring, and integration with monitoring tools provides real-time insights.

## Prerequisites

Before delving into Rollback, ensure you have the following prerequisites:

1. **A PipeOps account**. Use the following link to sign up to PipeOps if you do not currently have an account.
2. **A deployed project**. This can be a PipeOps template or a project from your Git (Github, Gitlab, Bitbucket) account. You can select a PipeOps template [here](https://github.com/orgs/pipeops-dev/repositories).

## Accessing Rollback

To access Rollback:
1. Navigate to your project's main page in PipeOps.
2. Select the “**Actions**” button to access the project actions dropdown menu
3. Click on the "**Rollback**" button to trigger a rollback.

Rollback refers to the process of reverting a deployment to a previous state, typically to address issues or errors that arise after a new deployment. This feature allows users to undo changes made during deployment quickly and efficiently.

Key aspects of the rollback feature in PipeOps include:

- **User-Friendly Interface**: PipeOps provides a user-friendly interface for initiating rollbacks, making the process quick and straightforward.

- **Instant Confirmation**: After initiating a rollback, you'll receive instant confirmation, so you always know what's happening throughout the process.

- **Notifications**: After the successful completion of a rollback, you'll get notifications, including alerts for any issues that might affect it.

- **Detailed Logging**: PipeOps offers detailed logs for all rollback operations, allowing users to monitor progress and track changes effectively.

- **Manual Version Selection**: Users have the flexibility to manually select a previous version for rollback, providing full control over deployment management.

![Rollback Page](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/46/Rollback_7e9c90eb84.png)


A pop-up appears after clicking on the rollback button, there are 2 ways you can rollback your project.

1. **By Git**

If you select the **By Git** tab, you will be able to rollback your project using your git commit history. You can simply select the specific commit that you want to rollback to and click **Rollback** on the bottom-right side of the pop-up page.

![Rollback By Git](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/46/Rollback_By_Git_757041d1ff.png)


2. **By Action**

If you select the **By Action** tab, you will be able to rollback your project using your build history. You can simply select the specific build that you want to rollback to and click **Rollback** on the bottom-right side of the pop-up page.

![Rollback By Action](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/46/Rollback_By_Action_70b7d9199d.png)


This immediately triggers a redeployment and you get a “**Rollback triggered successfully**” notification. A new deployment is initiated and the notification appears on the bottom left corner of the screen.

![Rollback In Progress](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/46/Rollback_In_Progress_f1ccc130cb.png)

After the deployment has been successfully completed, you can view it under deployment history. You can also go to confirm that the version of your project that you rolled back to is now live.


In summary, PipeOps' rollback feature offers a seamless solution for effective deployment management. With its user-friendly interface, instant confirmation, detailed logging, and manual version selection, users can confidently address issues or errors by reverting to previous states.
