---
slug: azure-on-pipeops
sidebar_position: 5
title: Connect Azure to PipeOps
description: "Integrate your Azure account with PipeOps by providing 
your Azure credentials to enable server creation and deployment."
---

# Connect Azure to PipeOps

Connecting your Azure account to PipeOps requires a set of Azure
service principal credentials. Once connected, you can provision
Azure servers and deploy projects directly from your PipeOps dashboard.

## Connect Your Azure Account

### Step 1: Open the Integrations Page

In the left sidebar, click **Integrations**.

![Steps to navigate to the integrations page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/navigating-to-integrations-page.png)

:::note
You can also get here by clicking **+ New** in the top-right corner
of your dashboard and selecting **Add Server** under **Action**, then
choosing to connect a new cloud provider.
:::

### Step 2: Select Azure

Select **Azure** from the list, then click **Connect**.

![Connect Azure Cloud modal showing setup instructions](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-azure-page.png)

A modal titled **Connect Azure Cloud** will appear.

### Step 3: Review the Setup Instructions

The first screen in the modal outlines the two steps required to
connect your Azure account.

1. **Create an IAM User** — Log in to the
   [Azure Cloud Console](https://portal.azure.com), create an IAM
   user with programmatic access, and download the Access Key and
   Secret Key.

2. **Enter Credentials on PipeOps** — Return to PipeOps and input
   your Access Key, Secret Key, and Region ID to complete the
   connection.

:::note
For a step-by-step walkthrough of generating your Azure credentials,
see [Generate Azure Credentials](/docs/how-to-guides/tutorials/generate-azure-credentials).
:::

![Connect Azure Cloud modal showing setup instructions](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-azure-modal-step-1.png)

Click **Proceed** to continue to the credentials screen.

### Step 4: Enter Your Azure Credentials

On the **Enter Access Credentials** screen, fill in the following fields.

- **Name** _(optional)_ — A label to identify this Azure account in
  PipeOps. Useful if you plan to connect more than one Azure account.

**Resource Information**

- **Resource Group Name** — The name of the Azure resource group
  PipeOps will deploy resources into.

**Authentication Details**

- **Tenant ID** — Your Azure Active Directory tenant ID.
- **Client ID** — The application (client) ID of your registered
  Azure app.
- **Client Secret** — The client secret generated for your Azure app
  registration.
- **Subscription ID** — The ID of the Azure subscription to deploy
  resources under.

  ![Connect Azure Cloud modal showing Enter Access Credentials form](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-azure-modal-step-2.png)

Once all fields are filled in, click **Connect Account**.

If the credentials are valid, your Azure account will be connected
and appear under Azure on the Integrations page.

![Connected Azure account in PipeOps](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connected-azure-integration.png)

Your Azure account is now connected to PipeOps. You can proceed to
provision a server on your connected account — see
[Server Provisioning](/docs/servers/server-provisioning).
