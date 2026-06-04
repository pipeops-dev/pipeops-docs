---
slug: do-on-pipeops
sidebar_position: 4
title: Connect DigitalOcean to PipeOps
description: "Connect your DigitalOcean account to PipeOps via OAuth 
authorization to enable server creation and deployment."
---

# Connect DigitalOcean to PipeOps

Connecting your DigitalOcean account to PipeOps uses OAuth
authorization, which grants PipeOps secure access to your DigitalOcean
account for resource management. Once connected, you can provision
DigitalOcean servers and deploy projects directly from your PipeOps
dashboard.

## Connect Your DigitalOcean Account

### Step 1: Open the Integrations Page

In the left sidebar, click **Integrations**.

![Steps to navigate to the integrations page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/navigating-to-integrations-page.png)

:::note
You can also get here by clicking **+ New** in the top-right corner
of your dashboard and selecting **Add Server** under **Action**, then
choosing to connect a new cloud provider.
:::

### Step 2: Select DigitalOcean

Select **Digital Ocean** from the list, then click **Connect**.

![DigitalOcean selected from the list of CSP's](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-do-page.png)

A modal titled **Connect Digital Ocean Cloud** will appear.

### Step 3: Authorize PipeOps

In the modal, click **Authorize**. You will be redirected to
DigitalOcean's OAuth authorization page, where you can review and
approve the access PipeOps is requesting.

![Connect Digital Ocean modal showing the Authorize button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-do-modal.png)

### Step 4: Confirm the Connection

After approving access on DigitalOcean's page, you will be redirected
back to PipeOps. Your DigitalOcean account will appear as a connected
provider under the Digital Ocean section on the Integrations page.

![Connected DigitalOcean account in PipeOps](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connected-do-integration.png)

Your DigitalOcean account is now connected to PipeOps. You can proceed
to provision a server on your connected account — see
[Server Provisioning](/docs/servers/server-provisioning).
