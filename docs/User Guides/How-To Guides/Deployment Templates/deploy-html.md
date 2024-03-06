---
slug: deploy-an-html-template
title: Deploy HTML Template on PipeOps!
sidebar_position: 9
tags: [deployment, guide, html]
---

# Deploying HTML on PipeOps

To deploy HTML application, you must ensure that you are already Signed up on PipeOps and Signed into your PipeOps account.
Use the following link to [Sign Up](https://console.pipeops.io/auth/signup) and [Sign In](https://console.pipeops.io/auth/signin) to PipeOps

## Pre-requisites

1. Create a Workspace where the application will be deployed. You can follow the guide on how to create a Workspace [here](/docs/Collaboration/workspaces#creating-a-new-workspace). If you already have an existing workspace you can use it
1. Ensure the Git (Github, Gitlab, Bitbucket) integration is done, so that PipeOps can retrieve the repositories.
1. The source code is available on the Git repository.

## Deploying your App

1. Click on the “Proceed” button to access the repository you have configured access to

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/proceed_51891a7d83.png)

1. For this example, we shall test with the template project provided, which is on the right pane of the screen. Select **Pipeops HTML Demo.**.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/template_061e995a0b.png)
   This will lead to the next stage of configuring the deployment.

1. PipeOps automatically generates a name for the project to be deployed (which can be edited later, see: [How to Edit a Project Name](/docs/intro.md)). Configures a default server and environment for the project deployment.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/summary_4ab76b53c8.png)
   Click **Proceed** to continue to the next stage

1. In the next stage, we shall select the Framework we are building with, and the Build method, in this case we shall choose **NextJS** as the Framework.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/build_Settings_1788b2c095.png)
   Click the **Deploy Project** button to start the build and deploy the project.

1. PipeOps will start the build and deployment process, and show the logs of the build and deployment process, to enable tracking of the process.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/build_Logs_05043ce639.png)
   Build process

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/deployed_de592c98b7.png)
   Deployment process

1. When the deployment is done, you get a notification stating that the deployment is complete and successful

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/deployed_Modal_5c93d02e5c.png)
   Click the **Got it** button to return to the project

1. In returning to the project, we can see all the details of the project that has been configured, and some added information that tells us the status of the project.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/overview_75827f76e8.png)

There are various; [History](/docs/User%20Guides/Project/project-history), [Observability](/docs/User%20Guides/For%20Startups/cluster-observability), [Logs](/docs/User%20Guides/Project/logs-and-events#accessing-logs), [Events](/docs/User%20Guides/Project/logs-and-events#accessing-events), [Terminal] and [Settings](/docs/User%20Guides/Project/project-setting) are used to monitor, observe, debug and re-configure the project.

1. To view the application that was deployed, click the **View Project** link.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/view_Project_15079e6d20.png)

1. This will automatically launch the application on a new tab

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/34/sample_ca27f571b8.png)

1. This setup has some basic configurations applied by default
   1. Application Network Port
   1. Network Access Port ([Environment Variable])
   1. Single Replica with 0.5 CPU and 512MB RAM ([Scaling and Replication])
   1. Auto Deploy a branch when a code change is checked-in.

To delete a project, use the Delete Project guide [here](/docs/User%20Guides/Project/project-actions#delete-project).
