---
slug: configure-cloud-provider
sidebar_position: 1
title: Configure Your Cloud Provider
---

In this section, we will show how you can set up your PipeOps account using your cloud Provider. Follow these steps to set up your account and seamlessly deploy your applications on AWS.

### Step 1: Select Your Server Hosting Platform

1. Log in to your dashboard.
2. You'll be prompted to choose where you want to create your server.
3. Select "**On Cloud Provider**" as your server creation method.

   ----Attach Image

### Step 2: Choose Your Cloud Server Management Level

Here you can configure your PipeOps account plan. this will determine the number of environments, servers, team seats and deployment that would be available to you. You can select either the StartUp, Growth or Enterprise plan.

---Attach Image

### Step 3: Choose A Cloud Provider

After confirming your subscription, proceed to choose your cloud Provider

   ----Attach Image

3. Select **AWS** as your cloud provider (integration to more cloud providers coming soon).

### Step 4: Enter AWS ID

1. In the AWS section, enter your AWS account ID.
2. Click **Add** to proceed with the account verification process.

   ![AWS ID](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/connect_AWSID_3ad56c1473.png)

### Step 5: Authorize IAM

1. Once your account ID is verified, click on the **Authorize IAM** button.
2. This action redirects you to AWS CloudFormation on your AWS account to create a stack.
3. The stack created by AWS CloudFormation includes an IAM role that allows us to create servers and other necessary infrastructure on your behalf.

   ![AWS CloudFormation](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/stack_Created_78b52004e0.png)

### Step 6: Account Verification

1. Wait for the CloudFormation stack creation to complete.
2. Once the process is done, you'll see an "Account Connected" sign on your dashboard.

   ![Account Connected](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/aws_Connected_c23029cc2c.png)

### Step 7: Proceed

1. With the "Account Connected" confirmation, click on the **Proceed** button to move to the next steps in the setup process.
