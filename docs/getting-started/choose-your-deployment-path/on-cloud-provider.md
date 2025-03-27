---
slug: on-cloud-provider
sidebar_position: 2
title: On Cloud Provider
---

PipeOps supports Bring Your Own Cloud (BYOC) deployment model, allowing you to integrate your existing cloud accounts while leveraging PipeOps' features.  
This section walks you through provisioning a server on your preferred cloud provider via the PipeOps dashboard.  


### Step 1: Choose Cloud Hosting

Whether you are continuing your account creation process or just trying to deploy an additional server, The following guide still applies to both cases. After choosing to proceed from the previous step, you will be directed to this page.

-  You will be prompted to choose where you want to create your server.
-  Select "**On Cloud Provider**" as your server creation method.

![Choose path](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/25/Deploy_On_Cloud_d5e1edc1a2.png)

### Step 2: Choose Your Preferred Cloud Provider

You can provision a server on different cloud providers, including:
- Amazon Web Services (AWS)
- Azure
- Digital Ocean
- Google Cloud
- Huawei Cloud

Choose your preferred provider from the list. Click **Connect** and follow the on-screen instructions to link your cloud account with PipeOps.

Check out the [Integrations](/docs/category/Integrations) section for details on how to link your account.

### Step 3: Select a Plan

The next step is to choose a subscription that best fits your needs. PipeOps offers three pricing plans: **Growth, Scale,** and **Custom**. You can choose monthly or yearly billing.

To learn more about each plan, its features, and billing methods, check out our [pricing section](/docs/pricing.md).


### Step 4: Select Payment Method
After choosing your preferred plan, the Payment Tab will open, allowing you to complete your subscription. Choose a payment method and proceed to checkout.


### Step 5: Server Creation
Once the payment is successful, you will be redirected to your dashboard. Click the **Proceed** button to start setting up your server. 

To set up your cloud server:  
1. Select your preferred region and click **Next**.
2. Choose a configuration method: 
- Select **custom configuration** to manually set up CPU, storage, and memory.
- Otherwise, select **Karpenter** for automatic scaling. 

### Step 6: Configure Resources
The next step is to customize your server resources. The options available on this page depend on your chosen configuration method.

**Custom Configuration:** Choose a deployment environment (Dev, Staging, or Production) and an instance category (General Purpose, Compute Optimized, or Memory Optimized).

**Karpenter Configuration:** Choose a preferred node architecture or proceed with default settings. You can also enable Spot instances to use cheaper cloud services.

Once configured, click the **Create Server** button to proceed. A modal will appear showing server creation progress in real time.

### Step 7: Proceed to Project Deployment

Once your server creation is complete, you’ll see a modal indicating that. You can now deploy applications to the newly created server. 
See the [project deployment guide](/docs/projects/project-deployment.md) for a comprehensive guide to getting your applications up and running with PipeOps.
