---
slug: gcp-on-pipeops
sidebar_position: 2
title: Connect GCP to PipeOps
description: "Integrate your GCP account with PipeOps by uploading JSON 
credentials to enable server creation and project deployment."
---

# Connect GCP to PipeOps

Connecting your GCP account to PipeOps lets you provision GCP servers
and deploy projects directly from your PipeOps dashboard. The
connection requires a GCP service account JSON key file, which you
can generate directly from within the connection flow.

## Connect Your GCP Account

### Step 1: Open the Integrations Page

In the left sidebar, click **Integrations**.

![Steps to navigate to the integrations page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/navigating-to-integrations-page.png)

:::note
You can also get here by clicking **+ New** in the top-right corner
of your dashboard and selecting **Add Server** under **Action**, then
choosing to connect a new cloud provider.
:::

### Step 2: Select Google Cloud Platform

From the list of cloud providers, find **Google Cloud Platform** and click **Connect**.

![Integrations Page With GCP selected](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-gcp-page.png)

A side drawer labeled **Connect GCP** will open.

### Step 3: Generate Your GCP Credentials

The first screen in the drawer — **Generate GCP Credentials** — walks
you through creating a service account and downloading your JSON key
file. Follow the three steps shown:

1. **Open Google Cloud Console** — Log in to the
   [Google Cloud Console](https://console.cloud.google.com) and create
   a new project or open an existing one.

2. **Run the Setup Command** — Open Google Cloud Shell in your project,
   paste the command below, and run it to create a service account and
   generate the `key.json` file.

```bash
   curl -fsSL https://get.pipeops.dev/create_credentials | bash
```

Click **Copy** in the drawer to copy the command to your clipboard.

3. **Download & Upload the Key File** — In Cloud Shell, click
   **Download**, enter the path `~/key.json`, and download the file
   to your machine.

   ![Connect GCP drawer showing Generate GCP Credentials steps and curl command](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-gcp-modal-step-1.png)

Once you have your `key.json` file downloaded, click **Proceed** in
the drawer to continue.

:::note
For a detailed walkthrough of the credential generation process, see
[Generate GCP JSON Credentials](/docs/how-to-guides/tutorials/generate-gcp-json-credentials).
:::

### Step 4: Upload Your Credentials

The second drawer screen — **Upload Credentials JSON** — is where you
connect the account.

1. **Name** _(optional)_ — Enter a label to identify this GCP account
   in PipeOps. This is useful if you plan to connect more than one
   GCP account.
2. **Upload the JSON key file** — Click **Upload File** and select the
   `key.json` file you downloaded in the previous step.
3. Click **Connect Account**.

![Connect GCP drawer showing Upload Credentials JSON screen](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-gcp-modal-step-2.png)

If the credentials are valid, your GCP account will be connected and
appear under Google Cloud Platform on the Integrations page.

![Connected GCP Integration](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connected-gcp-integration.png)

Your GCP account is now connected to PipeOps. You can proceed to
provision a server on your connected GCP account — see
[Server Provisioning](/docs/servers/server-provisioning).
