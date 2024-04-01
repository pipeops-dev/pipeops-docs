---
slug: server-provisioning
sidebar_position: 2
title: Server Provisioning
---

In this section, we will show you how you can set up your PipeOps account and use your cloud Provider to create a server. Follow these steps to set up your account and seamlessly provision your server on AWS.

### Step 1: Navigating to the server creation page

Log in to your dashboard.

Once logged in, there are 2 major ways you can create your server. To create a new server, you can choose one of the following methods:

1. **From the Top Navbar:** Click on the **New** button at the upper right corner of your screen and select **Deploy server** from the dropdown menu. Or,
2. **From the Side Navbar:** By selecting **Servers** from the sidebar menu.

![Dashboard](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/Dashboard_1_393ee1240f.png)

Either of the above will redirect you to a page where you will select your server hosting platform. See [Deployment Path](/docs/category/deployment-path) to make the necessary connections and come back here to continue on your server creation journey.

![Select Path](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/Select_Path_1_1d8bfb7a63.png)

### Step 2: Connecting your AWS account

After going through the preferred deployment path of your choice, proceed to connect your AWS account.

If you have connected your AWS account to PipeOps already, skip to [step 6](/docs/servers/server-provisioning#step-6-configure-your-server) of this guide otherwise proceed to select your cloud provider.

![Connect AWS](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/connect_AWS_fb14c2f4c4.png)

Select **AWS** as your cloud provider (integration to more cloud providers coming soon).

### Step 3: Enter AWS ID

1. In the AWS section, enter your AWS account ID.
2. Click **Add** to proceed with the account verification process.

![AWS ID](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/connect_AWSID_3ad56c1473.png)

### Step 4: Authorize IAM

1. Once your account ID is verified, click on the **Authorize IAM** button.
2. This action redirects you to AWS CloudFormation on your AWS account to create a stack.
3. The stack created by AWS CloudFormation includes an IAM role that allows us to create servers and other necessary infrastructure on your behalf.

![AWS CloudFormation](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/stack_Created_78b52004e0.png)

### Step 5: Account Verification

1. Wait for the CloudFormation stack creation to complete.
2. Once the process is done, you'll see an "Account Connected" sign on your dashboard. You can then click on **Proceed** to continue with your server creation process.

![Account Connected](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/aws_Connected_c23029cc2c.png)

### Step 6: Configure Your Server

Now that your AWS account is connected, let's create your server for development, staging, or production environments. Each environment has different EC2 instance types and associated prices for the provisioned EKS server.

1. Choose the deployment environment: **Dev**, **Stage**, or **Prod**.
2. Choose your preferred server type
3. Select your preferred AWS region for deployment.
4. Click **Proceed** to move to the next step.

![Configure Server](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/create_Server_4395dd99a4.png)

### Step 7: Confirm Server Configuration

1. A modal will appear, summarizing your server configuration settings.
2. Review the details carefully to ensure accuracy.

![Server Configuration Summary](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/confirm_Create_Server_0b25266fac.png)

3. Click **Yes Create Server** to proceed with creating your server.

### Step 8: Server creation in progress

After reviewing your server details on the confirmation modal and choose to proceed, another modal will appear showing your server creation progress in realtime.

![Server Creation Progress](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/creation_In_Progress_3fab10c0e8.png)

### Step 9: Completion

Once your server has been successfully created, you will get a modal indicating that. Then you can click on **Proceed** to navigate to the server overview page of your newly created server.

![Server Creation Successful](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/server_Created_dd33edd741.png)

![Created Server](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/server_Overview_e7518cfacb.png)
