---
slug: project-migration
sidebar_position: 10
title: Project Migration
---

In this section, we will show you how you can easily migrate your projects from one server to another. Follow these steps to seamlessly move your projects between servers.

## Prerequisites

Before delving into exploring Project migration, ensure you have the following prerequisites:

1. **A PipeOps account**. Use the link [here](https://console.pipeops.io/signup) to sign up on PipeOps if you do not have an account.
2. **A deployed project**. This can be a PipeOps template or a project from your Git (GitHub, GitLab, Bitbucket) account. You can select a PipeOps template [here](https://github.com/orgs/pipeops-dev/repositories).

## Accessing Project Migration

Project migration is the process of transferring your projects from one server to another. This process is essential for tasks such as upgrading server resources, changing hosting locations, or optimizing performance. By migrating projects, you ensure that your applications remain accessible and operational while adjusting to changing requirements or infrastructure configurations.

To access Project Migration:

1. Navigate to your project's main page in PipeOps.
2. Select the “**Actions**” button to access the project actions dropdown menu.
3. Click on the "**Migrate Project**" button to view the options.

<!-- ![Project migration]() -->

![Migrate Projectt](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-actions-dropdown-migration.png)

### Migration Options
A pop-up will appear after clicking the **Migrate Project** button, revealing two options:

![Migration Options](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-migration-options.png)

1. **Migrate Server** 
- Select the server your project is currently hosted on and the server that you would be moving your project to.
- Click the **Start Migration** button at the bottom of the page.  

![Migrate Server](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-migration-migrate-server.png)

2. **Promote Environment**

![Promote Environment](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/promote-project.png)


- This moves the project to a different environment within the same server. For instance, you can move your project from beta to production.
- Select your current environment and choose the destination environment from the Promotion Environment dropdown.
- Click the **Start Migration** button at the bottom of the page.

Wait for the process to be completed. You will receive a notification once the migration is complete.

By following these steps, you can seamlessly migrate your projects between servers or environments, ensuring continuous operation and efficient management of your projects.
