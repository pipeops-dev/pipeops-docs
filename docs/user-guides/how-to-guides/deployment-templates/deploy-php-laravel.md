---
slug: deploy-php-laravel-template
title: Deploy PHP Laravel Template on PipeOps!
sidebar_position: 10
tags: [deployment, guide, php laravel]
---

# Deploying PHP Laravel on PipeOps

To deploy PHP Laravel application, you must ensure that you are already Signed up on PipeOps and Signed into your PipeOps account.
Use the following link to [Sign Up](https://console.pipeops.io/auth/signup) and [Sign In](https://console.pipeops.io/auth/signin) to PipeOps

## Pre-requisites

1. Create a Workspace where the application will be deployed. You can follow the guide on how to create a Workspace [here](/docs/Collaboration/workspaces#creating-a-new-workspace). If you already have an existing workspace you can use it
1. Ensure the Git (Github, Gitlab, Bitbucket) integration is done, so that PipeOps can retrieve the repositories.
1. The source code is available on the Git repository.
1. The following versions are supported
   1. 8.1
   1. 8.2
   1. 8.3

## Deploying your App

1. Click on the “Proceed” button to access the repository you have configured access to

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/proceed_db1553f760.png)

1. For this example, we shall test with the template project provided, which is on the right pane of the screen. Select **Pipeops PHP Laravel Demo**.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/template_717b551069.png)
   This will lead to the next stage of configuring the deployment.

1. PipeOps automatically generates a name for the project to be deployed (which can be edited later, see: [How to Edit a Project Name](/docs/user-guides/Project/project-setting#general-settings)). Configures a default server and environment for the project deployment.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/summary_5b5b76e441.png)
   Click **Proceed** to continue to the next stage

1. In the next stage, we shall select the Framework we are building with, and the Build method, in this case we shall choose **PHP (Laravel)** and **Nixpack** respectively. Add Environment variables needed for Laravel Application to run. For this example, the following variables will suffice

   ```dockerfile
    APP_NAME=Laravel
    APP_ENV=production
    APP_KEY=base64:HEwBIIcem2OCoHaJevoQXqPD3qnM0Nv6bBSWjHa8HI4=
    APP_DEBUG=true
    APP_URL=http://localhost
   PORT=8000
   ```

   Follow this link on [adding environment variables](/docs/user-guides/Project/project-setting#environment-variable) to a project

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/build_9f4b4c9ce4.png)
   Click the **Deploy Project** button to start the build and deploy the project.

1. PipeOps will start the build and deployment process, and show the logs of the build and deployment process, to enable tracking of the process.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/build_Logs_deb214bb19.png)
   Build process

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/deployed_Logs_4cd50f2672.png)
   Deployment process

1. When the deployment is done, you get a notification stating that the deployment is complete and successful

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/deployed_40a49704f7.png)
   Click the **Got it** button to return to the project

1. In returning to the project, we can see all the details of the project that has been configured, and some added information that tells us the status of the project.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/overview_86ba4f276b.png)
   There are various; [History](/docs/user-guides/project/project-history), [Observability](/docs/user-guides/servers/server-observability), [Logs](/docs/user-guides/Project/logs-and-events#accessing-logs), [Events](/docs/user-guides/Project/logs-and-events#accessing-events), [Terminal](/docs/user-guides/project/terminal) and [Settings](/docs/user-guides/Project/project-setting) are used to monitor, observe, debug and re-configure the project.

1. To view the application that was deployed, click the **View Project** link.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/view_8e7fe46fde.png)

1. This will automatically launch the application on a new tab

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/38/sample_924a43cc70.png)

1. This setup has some basic configurations applied by default
   1. Application Network Port
   1. Network Access Port ([Environment Variable])
   1. Single Replica with 0.5 CPU and 512MB RAM ([Scaling and Replication])
   1. Auto Deploy a branch when a code change is checked-in.

To delete a project, use the Delete Project guide [here](/docs/user-guides/Project/project-actions#delete-project).
