---
slug: server-environments
sidebar_position: 10
title: Server Environments
---

# Server Environments 

Server environments in PipeOps allow you to organize and manage different stages of your application, such as development, staging, and production. Each environment is isolated and can have its own configuration, including environment variables, making it easier to maintain and deploy projects across various stages.

This section will guide you through creating, managing, and deleting server environments directly from your PipeOps dashboard.

## Accessing Environments

To access server environments, follow these steps:

1. Navigate to the **Servers** section from the sidebar menu.
2. Select the desired server for which you want to manage environments.
3. Click on the **Environments** tab.

There are two environments created for you by default: **beta** and **production**. 


![Environments](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-environments.png)


## Creating a New Environment

1. Click on the "+ New Environment" button located on the right-hand side of the screen.

![New Environment Button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/new-server-environment-btn.png)

2. Fill in Environment Details:

    A modal will appear where you can:

    - Enter a unique name for your environment (e.g., Development, Staging).

    - Add environment variables. For each variable, specify the name (key) and value.

![Edit Environment](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/new-server-environment.png)

3. Click Save to finalize.

    Once all details are filled in, click the **Save** button to create your new environment. The newly created environment will appear alongside existing ones.


## Managing Environments

For each of your environments, you can perform any of the following actions:

1. Edit Environment

2. Delete Environment

### Edit an Environment:

To edit your environment, follow these steps:

1. Click on the three-dot menu (...) next to the environment name. 

2. Select **Edit Environment** from the dropdown.

![Edit Environment](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/edit-server-env.png)


This will open a modal where you can edit your environment name and manage environment variables.

![Edit Modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/edit-server-modal.png)

3. Click **Save** to apply changes.


### Delete an Environment:

To delete an environment, follow these steps:

1. Click on the three-dot menu (...) next to the environment name.

2. Select **Delete Environment** from the dropdown.

![Delete Env](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/delete-server-env.png)

3. A confirmation prompt will appear asking you to confirm deletion. Confirm by typing in the environment name and clicking **Delete**.

![Delete Env Modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/delete-server-env-modal.png)



Server environments simplify organizing and managing different stages of your application lifecycle. Whether you're managing existing environments or creating new ones, PipeOps provides a user-friendly interface to edit, delete, or customize environments as needed.
