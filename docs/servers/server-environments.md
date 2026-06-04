---
slug: server-environments
sidebar_position: 10
title: Server Environments
description: "Create, manage, and delete isolated server environments 
for development, staging, and production workloads in PipeOps."
---

# Server Environments

Server environments let you organize deployments into isolated stages
— such as development, staging, and production — each with its own
configuration and environment variables. Variables set at the
environment level are shared across all projects deployed within
that environment.

:::note
The number of environments you can create on a server depends on
your subscription plan. See [Pricing](/docs/pricing.md) for plan limits.
:::

## Accessing Environments

From the **Servers** section, select a server and click the
**Environments** tab.

By default, every server has two environments: **beta** and
**production**.

![Server Environments tab showing default beta and production environments](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environment-page.png)

## Create an Environment

1. Click **+ New Environment** on the right side of the page.

![New Environment button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environment-new-button.png)

2. A modal will appear. Enter a unique name for the environment
   (e.g. Development, Staging) and add any environment variables
   the environment requires. For each variable, provide a **Name**
   (key) and a **Value**.

![New environment modal showing name field and environment variables](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environments-create-modal.png)

3. Click **Save**. The new environment will appear alongside
   the existing ones.

## Edit an Environment

1. Click the three-dot menu (⋮) next to the environment you want
   to update.
2. Select **Edit Environment** from the dropdown.

![Three-dot menu with Edit Environment option highlighted](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environment-delete.png)

3. A modal will open where you can update the environment name
   and manage its environment variables.

![Edit environment modal showing name and variable fields](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environment-rename-modal.png)

4. Click **Save** to apply your changes.

## Delete an Environment

:::warning
Deleting an environment is permanent. Ensure no active projects
depend on the environment before proceeding.
:::

1. Click the three-dot menu (⋮) next to the environment you want
   to remove.
2. Select **Delete Environment** from the dropdown.

![Three-dot menu with Delete Environment option highlighted](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environment-edit.png)

3. A confirmation modal will appear. Type the environment name
   to confirm, then click **Delete**.

![Delete environment confirmation modal with name input field](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-environments-delete-modal.png)
