---
slug: configure-cloud-provider
sidebar_position: 1
title: Configure Your Cloud Provider
---

In this section, we will show how you can set up your startup account. Follow these steps to set up your Startup account and seamlessly deploy your applications on AWS.

### Step 1: Choose A Cloud Provider

1. Log in to your dashboard.
2. Navigate to the **Choose a cloud Provider** section.

   ![Cluster Provider Section](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//12/15/stup_dashboard_7ea9539205.png)

3. Select **AWS** as your cloud provider (integration to more cloud providers coming soon).

### Step 2: Enter AWS ID

1. In the AWS section, enter your AWS account ID.
2. Click **Add** to proceed with the account verification process.

    ![AWS ID](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//12/15/stup_aws_id_54f6ebb5f2.png)

### Step 3: Authorize IAM

1. Once your account ID is verified, click on the **Authorize IAM** button.
2. This action redirects you to AWS CloudFormation on your AWS account to create a stack.
3. The stack created by AWS CloudFormation includes an IAM role that allows us to create servers and other necessary infrastructure on your behalf.

    ![AWS CloudFormation](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//12/15/stup_cloudformation_516d0d93b9.png)

### Step 4: Account Verification

1. Wait for the CloudFormation stack creation to complete.
2. Once the process is done, you'll see an "Account Connected" sign on your dashboard.

   ![Account Connected](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//12/15/stup_aws_connected_b8e0329747.png)

### Step 5: Proceed

1. With the "Account Connected" confirmation, click on the **Proceed** button to move to the next steps in the setup process.