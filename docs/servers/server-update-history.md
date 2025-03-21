---
slug: server-update-history
sidebar_position: 9
title: Server Update History
---

# Server Update History
The **Update History** feature provides a detailed log of all server updates, including version changes, deployment status, and execution logs. It helps users track deployment progress, view build logs, and troubleshoot issues.

## Accessing Server Update History
1. Navigate to the **"Servers"** section.
2. Select the desired server from the list.
3. Click on the **"Update History"** tab.


Your server update history consists of the following information per each deployment:

- **Build SHA:** This is the unique identifier for each build or update. Clicking the link allows you to inspect the specific build log.

- **Server Type:** This displays the type of server that was used during each build.

- **Version:** This displays the version of the update applied to the server. It helps you know which Kubernetes version is currently running or failed.

- **Start Time:** The timestamp when the update process began. This is useful for tracking update durations.

- **End Time:**  This indicates when the update process was completed.

- **Action:** This provides a **View Logs** button, allowing you to access detailed deployment logs. Logs provide insights into what occurred during the update process, including errors.

- **Status:** This indicates whether the update was successful or failed.

With PipeOps' **update history** functionality, you can efficiently monitor all your server update records.




