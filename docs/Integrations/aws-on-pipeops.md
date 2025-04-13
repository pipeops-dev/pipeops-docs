---
slug: aws-on-pipeops
sidebar_position: 1
title: Connect AWS to PipeOps
---


# Connecting AWS Account to PipeOps

## Overview

This documentation will guide you through the process of connecting your AWS account to PipeOps. By following these steps, you’ll be able to create an AWS server on PipeOps and deploy projects on the server directly from your PipeOps dashboard.

## Steps to follow

To connect your AWS account to PipeOps, follow these steps:

1. On the left menu, click on the "Integrations" tab.

![PipeOps Cloud Integration Tab](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsCloudIntegrationTab.png)

2. Select AWS from the list of cloud providers shown and click the "Connect" button.

![PipeOps Cloud Providers List](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsConnectCloudProviderList.png)

3. On the "Connect AWS" screen, you can provide an optional name to identify your AWS account. The optional field is useful in scenarios where you want to connect more than one(1) AWS account on PipeOps.

![PipeOps AWS Connection screen](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSConnectionTab.png)

4. Fill in your AWS Account ID found at the top-right corner of your AWS account and an optional name.

![PipeOps AWS Connection screen filled](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSConnectionFormFilled.png)

5. After filling out the form, click on the "Add" button. A spinner loads, enabling the "Authorize IAM" button.

6. Click on the "Authorize IAM" button. It should open a "Create Stacks" page in a new tab in your AWS account, which will prompt you to acknowledge "that AWS CloudFormation might create IAM resources with customised names" on the bottom of the page. 

Click on the "Create stack" button at the bottom right of the page.

![PipeOps AWS Create Cloud Formation Stacks Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSCreateStacksPage.png)

7. After clicking the "Create stack" button. You will have a page similar to this.

![PipeOps AWS Create Cloud Formation Stack In Progess Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSCreateStackInProgress.png)

8. You can switch back to your PipeOps tab to the left and wait for a few seconds and your AWS account will automatically get connected.

![PipeOps AWS Create Cloud Formation Stack In Progess Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsAWSAccountConnected.png)

Now that you've connected your AWS account to PipeOps, you can create a server on your connected AWS account using this [guide](/docs/servers/server-provisioning).

