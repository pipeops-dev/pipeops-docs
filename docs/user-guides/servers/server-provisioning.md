---
slug: cluster-provisioning
sidebar_position: 2
title: Cluster Provisioning
---

Now that your AWS account is connected, let's create your server for development, staging, or production environments. Each environment has different EC2 instance types and associated prices for the provisioned EKS Cluster.

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

### Step 1: Configure Your Server

1. Choose the deployment environment: **Dev**, **Stage**, or **Prod**.
2. Choose your preferred server type
3. Select your preferred AWS region for deployment.
4. Click **Proceed** to move to the next step.

   ![Configure Server](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/create_Server_4395dd99a4.png)

### Step 2: Confirm Server Configuration

1. A modal will appear, summarizing your server configuration settings.
2. Review the details carefully to ensure accuracy.

   ![Server Configuration Summary](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/confirm_Create_Server_0b25266fac.png)

3. Click **Yes Create Server** to proceed with creating your server.

### Step 3: Create Server

1. On the confirmation, agree to create the server.
2. The platform will display the progress of your server creation on the screen.

   ![Server Creation Progress](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/creation_In_Progress_3fab10c0e8.png)

### Step 4: Completion and Proceed

1. After the server creation is complete, a confirmation message will appear.
2. Click **Proceed** to move forward in the setup process.

    ![Server Creation Successful](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/server_Created_dd33edd741.png)

    ![Created Server](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/server_Overview_e7518cfacb.png)