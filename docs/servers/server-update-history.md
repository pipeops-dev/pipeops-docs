---
slug: server-update-history
sidebar_position: 9
title: Server Update History
description: "View the log of all server updates including version 
changes, deployment status, build SHAs, and execution details."
---

# Server Update History

The **Update History** tab shows a log of all updates applied to
your server, including version changes, build details, and the
outcome of each update. Use it to track when updates ran, confirm
which Kubernetes version is active, and investigate failed updates
through their logs.

## Accessing Update History

From the **Servers** section, select a server and click the
**Update History** tab.

![Server Update History tab showing the update log](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-update-history.png)

## Update Log Fields

Each entry in the update log includes the following:

| Field           | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| **Build SHA**   | The unique identifier for the build. Click the link to open the specific build log for that update.           |
| **Server Type** | The type of server used during the update.                                                                    |
| **Version**     | The Kubernetes version applied or attempted during the update.                                                |
| **Start Time**  | When the update process began.                                                                                |
| **End Time**    | When the update process completed or stopped.                                                                 |
| **Status**      | The outcome of the update — such as **Success** or **Failed**.                                                |
| **Action**      | A **View Logs** button that opens the full execution log for that update, including any errors that occurred. |

:::note
The **Build SHA** link and the **View Logs** button both provide
access to build log information. The Build SHA link opens the log
for that specific build, while **View Logs** opens the full
execution log for the update process.
:::

## Using Update History for Troubleshooting

When an update shows a **Failed** status, click **View Logs** to
review the execution log for that entry. The log shows what occurred
during the update process and where it stopped, giving you the
context needed to identify the cause before retrying or escalating.

Cross-reference the **Version** and **Start Time** columns to
confirm which Kubernetes version is currently running and when it
was last successfully applied.
