---
slug: on-cloud-provider
sidebar_position: 2
title: On Cloud Provider
---

In this section, we will show how you can set up your PipeOps account using your cloud Provider. Follow these steps to set up your account and seamlessly deploy your applications on AWS.

### Step 1: Select Your Server Hosting Platform

Whether you are just continuing your account creation process or just trying to deploy an extra server, The below guide still applies to both cases. After choosing to proceed from the previous step, you will be brought to this page.

1. You'll be prompted to choose where you want to create your server.
2. Select "**On Cloud Provider**" as your server creation method.

![Choose path](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/25/Deploy_On_Cloud_d5e1edc1a2.png)

### Step 2: Choose Your Cloud Server Management Level

Here you can configure your PipeOps account plan. this will determine the number of environments, servers, team seats and deployment that would be available to you. You can select either the StartUp, Growth or Enterprise plan.

![Server Management Level](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/25/Choose_Tier_37f13610a8.png)

Once you've selected your desired plan, PipeOps will automatically check if your credit balance covers the cost. If you don't have enough credits for your desired plan, you'll be directed to a payment portal where you can make the necessary payment to access seamless deployments with PipeOps.

![Payment modal](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/25/Payment_Confirmation_7fff228669.png)

However, if your credits are sufficient, the transaction will be deducted from your credit balance without any additional charges.

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
