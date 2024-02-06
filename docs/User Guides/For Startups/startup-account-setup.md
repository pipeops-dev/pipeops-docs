---
slug: configure-cloud-provider
sidebar_position: 1
title: Configure Your Cloud Provider
---

In this section, we will show how you can set up your startup account. Follow these steps to set up your Startup account and seamlessly deploy your applications on AWS.

### Step 1: Choose A Cloud Provider

1. Log in to your dashboard.
2. Navigate to the **Choose a cloud Provider** section.

   ![Cluster Provider Section](https://docImages/configureCloud/connectAWS.png.png)

3. Select **AWS** as your cloud provider (integration to more cloud providers coming soon).

### Step 2: Enter AWS ID

1. In the AWS section, enter your AWS account ID.
2. Click **Add** to proceed with the account verification process.

    ![AWS ID](https://docImages/configureCloud/connectAWSID.png)

### Step 3: Authorize IAM

1. Once your account ID is verified, click on the **Authorize IAM** button.
2. This action redirects you to AWS CloudFormation on your AWS account to create a stack.
3. The stack created by AWS CloudFormation includes an IAM role that allows us to create servers and other necessary infrastructure on your behalf.

    ![AWS CloudFormation](https://docImages/configureCloud/stackCreated.png)

### Step 4: Account Verification

1. Wait for the CloudFormation stack creation to complete.
2. Once the process is done, you'll see an "Account Connected" sign on your dashboard.

   ![Account Connected](https://docImages/configureCloud/awsConnected.png)

### Step 5: Proceed

1. With the "Account Connected" confirmation, click on the **Proceed** button to move to the next steps in the setup process.