---
slug: rollback
sidebar_position: 9
title: Rollback
---

# Rollback

This guide introduces PipeOps' rollback feature for easy deployment management. Recent updates offer a user-friendly option with visual confirmation for swift reversals and notifications for conflicts. Detailed logs aid monitoring, and integration with monitoring tools provides real-time insights.


## Accessing Rollback

To access Rollback:

1. Navigate to your project's main page in PipeOps.
2. Select the “**Actions**” button to access the project actions dropdown menu.
3. Click on the "**Rollback**" button to trigger a rollback.

Rollback refers to the process of reverting a deployment to a previous state, typically to address issues or errors that arise after a new deployment. This feature allows users to undo changes made during deployment quickly and efficiently.

Key aspects of the rollback feature in PipeOps include:

- **User-Friendly Interface**: PipeOps provides a user-friendly interface for initiating rollbacks, making the process quick and straightforward.

- **Instant Confirmation**: After initiating a rollback, you'll receive instant confirmation, so you always know what's happening throughout the process.

- **Notifications**: After the successful completion of a rollback, you'll get notifications, including alerts for any issues that might affect it.

- **Detailed Logging**: PipeOps offers detailed logs for all rollback operations, allowing users to monitor progress and track changes effectively.

- **Manual Version Selection**: Users have the flexibility to manually select a previous version for rollback, providing full control over deployment management.

![Project Actions](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-actions-dropdown-rollback.png)

A pop-up appears after clicking on the rollback button, there are 2 ways you can rollback your project.

1. **By Git**

If you select the **By Git** tab, you will be able to rollback your project using your git commit history. You can simply select the specific commit that you want to rollback to and click **Rollback** on the bottom-right side of the pop-up page.

![Rollback By Git](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-rollback-by-git.png)

2. **By Action**

If you select the **By Action** tab, you will be able to rollback your project using your build history. You can simply select the specific build that you want to rollback to and click **Rollback** on the bottom-right side of the pop-up page.

![Rollback By Action](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-rollback-by-action.png)

This immediately triggers a redeployment and you get a “**Rollback triggered successfully**” notification. A new deployment is initiated and the notification appears on the bottom left corner of the screen.

![Rollback Success](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/rollback-successful.png)

After the deployment has been successfully completed, you can view it under deployment history. You can also go to confirm that the version of your project that you rolled back to is now live.

In summary, PipeOps' rollback feature offers a seamless solution for effective deployment management. With its user-friendly interface, instant confirmation, detailed logging, and manual version selection, users can confidently address issues or errors by reverting to previous states.
