---
slug: server-provisioning
sidebar_position: 1
title: Server Provisioning
---

In this section, we’ll guide you through how to create a new server from your PipeOps dashboard.

### Navigate to the Server Creation Page

1. Log in to your [PipeOps dashboard](https://console.pipeops.io/auth/signin).

2. Once you are logged in, you can create a new server by using one of the following methods:

- **Top Navbar:** Click the **New** button on the top right corner of your screen. Select “Provision a Server” from the dropdown menu.
- **Side Navbar:** Alternatively, you can click on **Servers** from the sidebar menu.

![Dashboard](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/provision-server-nav.png)
Either of the above steps will redirect you to a page where you will select your server hosting method.

### Choose a Hosting Method

After completing the previous step, the page below will appear. There are two options when creating a new server: **On PipeOps** and **On Cloud Provider**.

![Select Path](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/provision-server-on-pipeops.png)

- **PipeOps Nova Servers:** Deploy applications on servers managed by PipeOps, hosted on cloud providers such as Digital Ocean, AWS, Google Cloud, and Azure.

- **Cloud Provider:** Host applications on your own cloud account by connecting PipeOps to your preferred cloud provider.

Select your desired hosting method to proceed.

### Provisioning On PipeOps Nova Servers

#### Step 1: Customize your server:

    - **Choose a preferred provider:** Digital Ocean, Google Cloud, Amazon Web Services, Azure, or Huawei Cloud.

    - **Select region:** Pick the geographic location for deploying your server. We've implemented a geo-location pricing model to ensure you're billed in your local currency, protecting you from exchange rate fluctuations.

    - **Review the monthly cost:** You can adjust resources such as CPU, memory, and storage to estimate your monthly cost.

![Cost Estimator](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/cost-estimator.png)


#### Step 2: Click "Proceed" to finalize your set up:

Once provisioning is complete, your server will be visible on your dashboard. You can proceed to deploy applications to the newly created server.

![PKS Dashboard](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/pks-server-overview.png)

### Provisioning On Cloud Provider

#### Step 1: Connect Your Cloud Account

To create a server on your chosen cloud provider, you must first connect your account to PipeOps:

- Select from AWS, Digital Ocean, Azure, Google Cloud, or Huawei Cloud.
- Click on the **Connect** button to begin the integration process.

![Connect Cloud Provider](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/integrations-page.png)


Check out [Integrations](/docs/category/Integrations) for detailed steps on how to link your cloud provider with PipeOps.

#### Step 2: Configure Cloud Server

Now that you’ve successfully connected your cloud account to PipeOps, let’s configure your server:

1. Select your preferred deployment region.
2. Define security standards: Select the appropriate option for compliance:

![Region and Specification Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/region-and-security-specification.png)

   - **PMS:** A security standard suitable for general deployments, including containers, databases, Terraform, Helm, and other applications.
   - **HIPAA Compliance:** A higher standard designed for users handling healthcare data, ensuring compliance with the Health Insurance Portability and Accountability Act (HIPAA).
   - **PCI DSS Compliance:** Provides security measures for businesses processing, storing, or transmitting credit card information.

3. Select **Next** to proceed.

#### Step 3: Configure Method

There are two configuration methods when provisioning your server:

![Configuration Method](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/configuration-method.png)

- **Custom configuration:** This option allows you to manually configure CPU, memory, storage, and other specifications.

- **Karpenter:** This automatically provisions and deprovisions resources based on demand. Consider Karpenter if you prefer automated scaling.

#### Step 4: Configure Resources

The next step is to configure server resources. The details that appear on this tab depend on your chosen configuration method.

**Custom configuration**  
If you opt for Custom Configuration, you will be presented with predefined server templates. You can create a server for development, staging, and production.

![Custom Configuration](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/scaling-configuration.png)

- **Choose a deployment environment:** Dev, Staging, or Production.
- **Select your preferred instance category:** General purpose, Compute optimized, or Memory optimized.

You can also explore **Expert Settings** for advanced configurations. Here, you can select from over ten instance types, specify node architecture, and define the minimum and maximum number of nodes.

**Karpenter configuration**  
If you select Karpenter, you’ll have additional options to define how your infrastructure scales. Alternatively, you can leave everything on default and proceed to the next step.

![Karpenter Configuration](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/karpenter-configuration.png)


#### Step 5: Finish Set Up

Click the "Create Server" button to finish set up. After the creation is complete, you can proceed to deploy applications to the newly created server.

If you chose **Custom Configuration**, here’s what the server overview page will look like:

![Created Server](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/no-karpenter-no-opencost.png)


If you selected **Karpenter**, your overview page will appear as shown below:

![Created Server](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/has-karpenter-has-opencost-no-grafana.png)


## Deleting Servers

To permanently remove a server and all the projects deployed on it, follow the steps below:

1. Delete all projects and addons associated with the server. You won’t be able to complete the deletion until these have been removed.

2. After all associated resources are removed, go to your dashboard and select **“servers”** from the sidebar menu.

2. Click on the server you want to delete.

3. On the top right corner of your screen, click on the three dots. This reveals the delete option.

![Delete Server](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/delete-pipeops-server.png)

4. Select **Delete Server**. A modal appears, prompting you to enter the name of the server to confirm deletion.

![Confirm Server Deletion](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/confirm-server-deletion%20modal.png)

5. Type in the name of your server and hit the delete button.
