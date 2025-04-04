---
slug: gcp-on-pipeops
sidebar_position: 2
title: Connect GCP to PipeOps
---

# Connecting GCP Account to PipeOps

## Overview

This documentation will guide you through the process of connecting your GCP account to PipeOps. By following these steps, you’ll be able to create a GCP server on PipeOps and deploy projects on the server directly from your PipeOps dashboard.


## Steps to follow

To connect your GCP account to PipeOps, follow these steps:

1. Ensure you have downloaded your GCP JSON credentials. If not, you can follow this guide [here](/docs/how-to-guides/tutorials/generate-gcp-json-credentials).

2. On the left menu, click on the "Integrations" tab.

![PipeOps Cloud Integration Tab](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsCloudIntegrationTab.png)

3. Select "Google Cloud Platform" from the list of cloud providers shown and click the "Proceed" button at the bottom right.

![PipeOps Cloud Providers List](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsConnectCloudProviderList.png)


4. On the "Upload Credentials JSON" screen, you can provide an optional name to identify your uploaded GCP JSON credentials. The optional field is useful in scenarios when you want to connect more than one(1) GCP account on PipeOps.

![PipeOps GCP JSON Credentials Upload Screen](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsGCPJSONCredentialsFilled.png)

5. Click on the submit button at the bottom right, and if the JSON credentials are valid, your GCP Account is successfully connected.

![PipeOps GCP Connection screen](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsGCPCredentialsUploaded.png)

Now that you've connected your GCP account to PipeOps, you can create a server on your connected GCP account using this guide [here](/docs/servers/server-provisioning).
