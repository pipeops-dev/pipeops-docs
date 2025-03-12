---
slug: server-provisioning
sidebar_position: 1
title: Server Provisioning
---

In this section, we’ll guide you through how to create a new server from your PipeOps dashboard.

### Step 1: Navigate to the server creation page

Log in to your [PipeOps dashboard](https://console.pipeops.io/auth/signin).

Once you are logged in, you can create a new server by using one of the following methods:

1. **Top Navbar:** Click the **New** button on the top right corner of your screen. Select “Provision a Server” from the dropdown menu.
2. **Side Navbar:** Alternatively, you can click on **Servers** from the sidebar menu.

![Dashboard](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/Dashboard_1_393ee1240f.png)
Either of the above steps will redirect you to a page where you will select your server hosting platform. 


### Step 2: Choose a Hosting Method
After completing the previous step, the page below will appear. There are two options when creating a new server: **On PipeOps** and **On Cloud Provider**.

![Select Path](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/Select_Path_1_1d8bfb7a63.png)

The **On PipeOps** option allows you to deploy applications on servers managed by PipeOps, hosted on  cloud providers like Digital Ocean, AWS, Google Cloud, and Azure. Choosing **On Cloud** lets you host applications in your own cloud account.

Check out [Deployment path](/docs/getting-started/choose-your-deployment-path/on-pipeops.md) if you are provisioning your server On PipeOps.

### Step 3: Connect Your Cloud Account

To create a server on your chosen cloud provider, you must first connect your account to PipeOps:
- Select from AWS, Digital Ocean, Azure, Google Cloud, or Huawei Cloud. 
- Click on the **Connect** button to begin the integration process.

Check out [Integrations](/docs/category/Integrations) for detailed steps on how to link your cloud provider with PipeOps.

### Step 4: Configure Cloud Server
Now that you’ve successfully connected your cloud account to PipeOps, let’s configure your server:
1. Select your preferred deployment region.
2. Define security standards: Select the appropriate option for compliance: 

- **PMS:** A security standard suitable for general deployments, including containers, databases, Terraform, Helm, and other applications.
- **HIPAA Compliance:** A higher standard designed for users handling healthcare data, ensuring compliance with the Health Insurance Portability and Accountability Act (HIPAA).
- **PCI DSS Compliance:** Provides security measures for businesses processing, storing, or transmitting credit card information.

3. Select **Next** to proceed.

### Step 5: Configure Method
There are two configuration methods when provisioning your server:
- **Custom configuration:** This option allows you to manually configure CPU, memory, storage, and other specifications.  

- **Karpenter:** This automatically provisions and deprovisions resources based on demand. Consider Karpenter if you prefer automated scaling.


### Step 6: Configure Resources
The next step is to configure server resources. The details that appear on this tab depend on your chosen configuration method.

**Custom configuration**  
If you opt for Custom Configuration, you will be presented with predefined server templates. You can create a server for development, staging, and production.

- **Choose a deployment environment:** Dev, Staging, or Production.
- **Select your preferred instance category:** General purpose, Compute optimized, or Memory optimized.

You can also explore **Expert Settings** for advanced configurations. Here, you can select from over ten instance types, specify node architecture, and define the minimum and maximum number of nodes.

**Karpenter configuration**  
If you select Karpenter, you’ll have additional options to define how your infrastructure scales. Alternatively, you can leave everything on default and proceed to the next step.


### Step 7: Finish Set Up
A modal will appear showing the server creation is in progress. After the creation is complete, you’ll see a confirmation message. You can now proceed to deploy applications to the newly created server.


![Server Creation Progress](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/creation_In_Progress_3fab10c0e8.png)

![Server Creation Successful](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/server_Created_dd33edd741.png)

![Created Server](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/26/server_Overview_e7518cfacb.png)


## Deleting Servers
To permanently remove a server and all the projects deployed on it, follow the steps below:

1. Go to your dashboard and select **“servers”** from the sidebar menu.
2. Click on the server you want to delete.
3. On the top right corner of your screen, click on the three dots. This reveals the delete option.
4. Select **Delete Server**. A modal appears, prompting you to enter the name of the server to confirm deletion. 
5. Type in the name of your server and hit the delete button.
