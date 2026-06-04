---
slug: server-provisioning
sidebar_position: 1
title: Server Provisioning
description: "Create and provision a new server on PipeOps using 
PipeOps-managed Nova hosting, your own cloud account, or your 
own server."
---

# Server Provisioning

Servers in PipeOps are the infrastructure layer your projects run on.
PipeOps gives you three ways to provision a server depending on how
much control you want over the underlying infrastructure.

## Navigate to Server Creation

1. Log in to your [PipeOps dashboard](https://console.pipeops.io/auth/signin).
2. Create a new server using one of the following methods:
   - Click **+ New** in the top-right corner and select
     **Add Server** from the dropdown.
   - Click **Servers** in the left sidebar to open the Servers list,
     then click **+ Create new Server** in the top-right corner.

![Servers list page showing existing servers and the Create new Server button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-nav.png)

## Select a Hosting Method

Select how you want to provision your server.

![Server hosting method selection showing On PipeOps, Bring Your Own Cloud, and Bring Your Own Server options](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-choose-path.png)

| Option                    | Description                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **On PipeOps**            | Provision servers managed by PipeOps (Nova), hosted on Digital Ocean, AWS, Google Cloud, or Azure. No cloud account required. |
| **Bring Your Own Cloud**  | Provision a server on your existing cloud account by connecting PipeOps to your preferred cloud provider.                     |
| **Bring Your Own Server** | Connect your own private or public machine, or a VM you control, directly to PipeOps.                                         |

Select your preferred option and click **Proceed**.

---

## Provisioning on PipeOps (Nova)

### Step 1: Choose a Provider and Region

Select your preferred cloud provider and deployment region. Once you
select a region, PipeOps displays the per-hour resource rates for
that region:

- **Provider** — Choose from Azure or Google Cloud.
- **Region** — Select the geographic location for your server.
  PipeOps uses geo-location pricing to bill you in your local
  currency, protecting you from exchange rate fluctuations.
- **Per-hour rates** — CPU, Memory, and Storage rates are shown
  for the selected region so you can estimate your usage costs
  before proceeding.

  ![Nova server configuration showing provider selection, region, and per-hour pricing](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-nova.png)

Click **Proceed** to create the server.

### Step 2: View Your Server

Once provisioning is complete, your server will appear on the
Servers list and is ready for project deployments. Click the server
to open its overview page.

From the server overview, you can monitor activity across the
following tabs:

| Tab              | Description                                             |
| ---------------- | ------------------------------------------------------- |
| **Overview**     | Nodes, deployments, current resource usage, and events. |
| **Metrics**      | CPU, memory, and storage usage over time.               |
| **Events**       | Infrastructure-level events for the server.             |
| **Nodes**        | Node-level details and status.                          |
| **Environments** | Environments configured on this server.                 |
| **Settings**     | Server configuration and management options.            |

![Nova server overview page showing nodes, deployments, usage, and events](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-nova-server-details..png)

## Provisioning with Bring Your Own Cloud (BYOC)

### Step 1: Connect Your Cloud Account

Select your cloud provider from the list — Google Cloud Platform,
Amazon Web Services, Digital Ocean, or Azure — and click **Connect**
to link your account.

![AWS selected from the integrations list](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/connect-csp-integrations/connect-aws-page.png)

For detailed steps on connecting each provider, see
[Integrations](/docs/category/integrations). Once your account is
connected, click **Proceed** to continue.

### Step 2: Select Region and Security Standard

Configure the deployment settings for your cloud server.

![Create A New Server page showing region selection and security specification](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-region-config.png)

1. **Select Region** — Choose the geographic location to deploy
   your server.
2. **Security Specification** — Select the standard that matches
   your compliance requirements:

| Standard               | Best For                                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **PMS Standard**       | General deployments including containers, databases, Terraform, Helm, and other applications.                              |
| **HIPAA Compliance**   | Deployments that handle healthcare data, ensuring compliance with the Health Insurance Portability and Accountability Act. |
| **PCI DSS Compliance** | Businesses that process, store, or transmit credit card information.                                                       |

Click **Next: Configure Method** to proceed.

### Step 3: Choose a Configuration Method

Select how you want to manage server resources.

![Create A New Server page showing Custom Configuration and Karpenter options](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-custom-config.png)

| Method                   | Description                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Custom Configuration** | Manually configure CPU, memory, storage, and other specifications for precise control.                |
| **Karpenter** _(Beta)_   | Automated scaling based on demand. Recommended for teams that prefer a hands-off approach to scaling. |

Click **Next: Configure Resources** to proceed.

### Step 4: Configure Resources

The options available on this step depend on the configuration
method you selected.

**Custom Configuration**

Choose from predefined instance templates suited for different
environments.

![Configure Scaling and Resources Management page showing Dev/Staging, Production, and Expert Settings tabs with instance options and estimated cost](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-custom-config-2.png)

- **Environment Tab** — Switch between **Dev/Staging**,
  **Production**, or **Expert Settings** to see relevant
  instance options for each.
- **Instance Category** — Select from **General purpose** or
  **Compute optimized** instance types. Each card shows the
  instance name, vCPUs, RAM, and Storage for that option.
- **Estimated Cost** — An estimated monthly cost is displayed on
  the right based on your current selection. Click **View
  Breakdown** for a detailed cost summary.

For advanced control, switch to the **Expert Settings** tab to
select from a wider range of instance types, specify node
architecture, and define minimum and maximum node counts.

**Karpenter** _(Beta)_

Configure how your infrastructure scales, or leave settings on
default and proceed.

![Karpenter configuration screen](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-karpenter-config-2.png)

### Step 5: Create the Server

Click **Create Server** to complete provisioning.

Once provisioning is complete, your server will appear on the
Servers list and its overview page will reflect the configuration
method you chose.

**Custom Configuration:**

![Server overview page for a Custom Configuration server](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-created-custom-overview-details.png)

**Karpenter:**

![Server overview page for a Karpenter server](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-created-karpenta-overview-details.png)

## Provisioning with Bring Your Own Server (BYOS)

The **Bring Your Own Server** option lets you connect an existing
private or public machine, or a VM you control, directly to PipeOps.
See [Bring Your Own Server](/docs/getting-started/choose-your-deployment-path/bring-your-own-server.md) for
the full setup steps.

## Deleting a Server

:::warning
Deleting a server is permanent and cannot be undone. All projects
and add-ons on the server must be removed before deletion can proceed.
:::

1. Delete all projects and add-ons associated with the server.
2. In the left sidebar, click **Servers** and select the server
   you want to delete.
3. Click the three-dot menu in the top-right corner of the server
   page.

![Three-dot menu on the server page revealing the delete option](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-delete.png)

4. Select **Delete Server**. A confirmation modal will appear.

![Server deletion confirmation modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-create-delete-modal.png)

5. Type the server name to confirm, then click **Delete**.
