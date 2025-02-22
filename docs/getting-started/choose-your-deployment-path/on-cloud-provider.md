---
slug: on-cloud-provider
sidebar_position: 2
title: On Cloud Provider
---

This section guides you through provisioning a server on your preferred cloud provider via your PipeOps dashboard.

### Step 1: Select Your Server Hosting Platform

Whether you are just continuing your account creation process or just trying to deploy an extra server, The below guide still applies to both cases. After choosing to proceed from the previous step, you will be navigated to this page.

1. You will be prompted to choose where you want to create your server on.
2. Select "**On Cloud Provider**" as your server creation method.

![Choose path](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/25/Deploy_On_Cloud_d5e1edc1a2.png)

### Step 2: Choose Your Preferred Cloud Provider

After you choose to provision a server on a cloud provider, you will be navigated to this page, where you would see the list of supported cloud providers. You can proceed to do the either of the following:

1. Pick a cloud provider, click on the **Connect** account button, then follow the on-screen instructions to connect to the cloud provider you have chosen.
2. Pick a cloud provider, and select one of the accounts you have previously connected.

After successfully completing any of the above steps you will be navigated to a screen where you can configure and customize the specifications of the server you want to create.

![Server Management Level](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/25/Choose_Tier_37f13610a8.png)

![Payment modal](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/07/02055408/92.png)

### Step 3: Payment Completion

After successfully subscribing to a plan, you'll receive a confirmation stating "Congratulations! Your subscription is active." Click on the **Done** button to proceed to the next steps in the setup process.

### Step 4: AWS Account

If you have your **AWS account** linked already, proceed directly to creating your server.

If your **AWS account** is not linked yet, see the [Server Provisioning](/docs/servers/server-provisioning#step-2-connecting-your-aws-account) page to make the necessary connections and come back here to continue on your server creation journey.

You can create your server for development, staging, or production environments. Each environment has different EC2 instance types and associated prices for the provisioned EKS server.

1. Choose the deployment environment: **Dev**, **Stage**, or **Prod**.
2. Choose your preferred server type
3. Select your preferred AWS region for deployment.
4. Click **Proceed** to move to the next step.

![Configure Server](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/create_Server_4395dd99a4.png)

### Step 5: Confirm Server Configuration

1. A modal will appear, summarizing your server configuration settings.
2. Review the details carefully to ensure accuracy.

![Server Configuration Summary](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/confirm_Create_Server_0b25266fac.png)

3. Click **Yes Create Server** to proceed with creating your server.

### Step 6: Server creation in progress

After reviewing your server details on the confirmation modal and choose to proceed, another modal will appear showing your server creation progress in realtime.

![Server Creation Progress](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/creation_In_Progress_3fab10c0e8.png)

### Step 7: Server Creation Complete

1. After the server creation is complete, a confirmation message will appear.
2. Click **Proceed** to get to the server overview page of the server you just created.

![Server Creation Successful](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/Done_daa41dcdec.png)

![Server Overview](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/Overview_027a244c0c.png)

### Step 8: Proceed to project deployment

After successfully creating a server, you can now proceed to deploy your applications into that server. See the [project deployment guide](/docs/projects/project-deployment.md) for a comprehensive guide to getting your applications up and running with PipeOps.
