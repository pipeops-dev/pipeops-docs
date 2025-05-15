---
sidebar_position: 9
title: Generate Azure credentials
slug: generate-azure-credentials
---

Creating Azure credentials is required to connect your Azure Account to PipeOps. You need the following details to integrate your Azure account successfully:

    - Resource Group Name
    - Subscription ID
    - Tenant ID
    - Client ID
    - Client Secret

The steps below highlight how to generate the credentials you'll securely add on PipeOps.


#### Step 1: Create a resource group

- Log in to the [Azure portal](https://portal.azure.com/)

- In the search bar, type **Resource Groups** and select it.

- Click **+ Create** to add a new resource group.

- Fill in the required details:

    - Subscription: Select your active subscription.

    - Resource Group Name: Enter a name (e.g., PipeOpsRG).

    - Region: Choose a region

- Click **Review + Create** to create your resource group.


#### Step 2: Get your subscription ID

- In the Azure portal, search for **Subscriptions**.

- Click on your active subscription

- Copy the Subscription ID from the overview page


#### Step 3: Get your tenant ID

- In the Azure portal, search for Microsoft Entra ID (formerly Azure Active Directory).

- On the Overview tab, locate and copy the Tenant ID.


#### Step 4: Register an application (client ID and client secret)
- Navigate to Microsoft Entra ID. Click the "+ Add" tab and select **App registration** from the dropdown menu.

- Enter a name of choice. Under "Supported account types," choose **Single Tenant**. After that, click the "Register" button.

- After registering, copy the Application (Client) ID from the Overview page.

- In your newly created app, go to "Manage" and select **Certificates & secrets**.

- Under "**Client secrets**", click **+ New client secret**. Enter a description (e.g., PipeOpsSecret), select an expiration period, and click Add.

- Copy the **Client Secret** value immediately, as it won’t be visible later.


#### Step 5: Assign Contributor Role

- Navigate to Resource Groups and select your created resource group.

- Go to **Access control (IAM)** and click on **Add role assignment**.

- Under Role, go to "privileged administrator roles" and select Contributor.

- Click Next, then select "User, group, or service principal".

- In the "Members" tab, select the name of the application you created earlier and click **Review + Assign**.


Congratulations, you have successfully created your Azure credentials. These credentials will allow PipeOps to access and manage your Azure resources securely.

