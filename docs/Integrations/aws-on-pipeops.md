---
slug: aws-on-pipeops
sidebar_position: 1
title: Connect AWS to PipeOps
description: "Integrate your AWS account with PipeOps to create servers 
and deploy projects from the PipeOps dashboard."
---

# Connect AWS to PipeOps

Connecting your AWS account to PipeOps lets you provision AWS servers
and deploy projects directly from your PipeOps dashboard.

## Connect Your AWS Account

### Step 1: Open the Integrations Page

In the left sidebar, click **Integrations**.

![Steps to navigate to the integrations page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/navigating-to-integrations-page.png)

:::note
You can also get here by clicking **+ New** in the top-right corner
of your dashboard and selecting **Add Server** under **Action**, then
choosing to connect a new cloud provider.
:::

### Step 2: Select Amazon Web Services

From the list of cloud providers, find **Amazon Web Services** and click **Connect**.

![AWS selected from the integrations list](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-aws-page.png)

### Step 3: Enter Your AWS Account Details

After clicking Connect, a side drawer will appear. Enter the following:

- **AWS Account ID** — Found in the top-right corner of your AWS
  Management Console.
- **Name** _(optional)_ — A label to identify this AWS account in
  PipeOps. This is useful if you plan to connect more than one AWS
  account.

![PipeOps AWS Connection screen](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-aws-modal.png)

Click **Add**. PipeOps will process your details and activate the
**Authorize IAM** button.

### Step 4: Authorize IAM Access

Click **Authorize IAM**. This opens a **Create Stack** page in a new
tab in your AWS account.

On the AWS CloudFormation page:

1. Scroll to the bottom of the page.
2. Check the acknowledgement box confirming that AWS CloudFormation
   may create IAM resources with customized names.
3. Click **Create stack**.

![AWS CloudFormation Create Stack page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSCreateStacksPage.png)

AWS will begin creating the stack. You'll see a progress page while
the process runs — this typically takes a minute or two.

![AWS CloudFormation stack creation in progress](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSCreateStackInProgress.png)

### Step 5: Confirm the Connection

Switch back to your PipeOps tab. Once the stack creation completes,
your AWS account will be automatically detected and marked as
connected.

![Connected AWS account in PipeOps](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connected-aws-integration.png)

Your AWS account is now connected to PipeOps. You can proceed to
provision a server on your connected AWS account — see
[Server Provisioning](/docs/servers/server-provisioning).
