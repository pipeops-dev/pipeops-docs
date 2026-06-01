---
slug: add-on-deployment
title: Add-on Deployment
description: "Browse the PipeOps Add-ons Marketplace and deploy databases, analytics tools, and other services directly to your server."
tags: [deployment, guide, addon]
sidebar_position: 1
---

# Add-ons

Add-ons are pre-configured services you can deploy alongside your projects — databases, analytics tools, message brokers, and more. This page covers how to find, configure, and deploy an add-on from the PipeOps Marketplace.

### Step 1: Open the Add-ons Marketplace

Log in to your [PipeOps dashboard](https://console.pipeops.io), then click **Add-ons** in the sidebar. This opens the Add-ons Marketplace.

![Add-ons option highlighted in the dashboard sidebar](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment.png)

### Step 2: Browse and Select an Add-on

On the **Add-ons Marketplace** page, you can search, sort, and filter available add-ons by category. Each card shows the add-on name, category, and a **Deploy** button.

To deploy immediately, click **Deploy** on any card. To review more information first, click on the card to open the add-on details page.

![Add-ons Marketplace with featured add-ons, search, category filters, and Deploy buttons](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment-marketplace.png)

### Step 3: Review Add-on Details

The add-on details page shows the name, version, category, deployment count, source repository, and description. Depending on the add-on, it may also include setup notes, required environment variables, or technical documentation pulled from the repository.

When you are ready to continue, click **Deploy App**.

![Add-on details page showing metadata, description, and Deploy App button](https://pub-9-on details page showing metadata, description, and Deploy App button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment-details-page.png)

### Step 4: Configure the Add-on

On the **Configure Add-on** page, choose where the add-on should run and review the services that will be deployed.

- **Server** — select the server where the add-on should be deployed
- **Environment** — select from your available environments, or create a new one. PipeOps includes Production and Beta by default, but you can create additional environments up to the limit your plan allows. [Learn more about environments](/docs/how-to-guides/tutorials/managing-environments)
- **Services** — review the services included in the deployment. Click **Add More** to include additional services if your setup requires them
- **Estimated usage** — review the projected resource cost before deploying

![Configure Add-on page with server, environment, service card, estimated usage, and Deploy button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment-configured-page.png)

To review or update service-specific settings, click **Configure** on the service card. In the configuration modal, you can adjust the volume path, storage size, and environment variables. Click **Save** when done.

![Service configuration modal with storage and environment variable settings](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment-env-config-modal.png)

### Step 5: Deploy the Add-on

Click **Deploy** to start the deployment. The service card updates to show a **Deploying** status. Click **View Logs** to follow the deployment in real time, or **Skip** to leave the screen while the process continues in the background.

![Configure Add-on page showing a service card in Deploying status with View Logs option](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment-configure-page.png)

When deployment completes, a success modal confirms that the add-on is live. Click **Got it** to dismiss it.

![Add-on deployed success modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/add-on-deployment/add-on-deployment-success-modal.png)

Your add-on is now running and available to your project. You can monitor its resource usage and manage its configuration from the **Add-ons** section of your dashboard.
