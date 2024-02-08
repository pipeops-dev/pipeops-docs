---
slug: deploy-a-nodejs-template
title: Deploy NodeJS Template on PipeOps!
sidebar_position: 3
tags: [deployment, guide, nodejs]
---

# Deploying Node.js on PipeOps

To deploy a Node.js application, you must ensure that you are already Signed up on PipeOps and Signed into your PipeOps account.
Use the following link to [Sign Up](https://console.pipeops.io/auth/signup) and [Sign In](https://console.pipeops.io/auth/signin) to PipeOps

## Pre-requisites

1. Create a Workspace where the application will be deployed. You can follow the guide on how to create a Workspace [here](/docs/Collaboration/workspaces#creating-a-new-workspace). If you already have an existing workspace you can use it
1. Ensure the Git (Github, Gitlab, Bitbucket) integration is done, so that PipeOps can retrieve the repositories.
1. The source code is available on the Git repository.
1. The following versions are supported
   1. 14
   1. 16
   1. 18
   1. 20

## Deploying your App

1. Click on the “Proceed” button to access the repository you have configured access to

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/proceed_4e8dfc66f2.png)

1. For this example, we shall test with the template project provided, which is on the right pane of the screen. Select **PipeOps NodeJs Demo**.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/template_8a1c265404.png)
   This will lead to the next stage of configuring the deployment.

1. PipeOps automatically generates a name for the project to be deployed (which can be edited later, see: [How to Edit a Project Name](/docs/intro.md)).Configures a default server and environment for the project deployment.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/summary_fd223d655a.png)
   Click **Proceed** to continue to the next stage

1. In the next stage, we shall select the Framework we are building with, and the Build method, in this case we shall choose **NodeJs** and **Paketo-Buildpack** respectively. On the **Environment Variables** side, add the port the NodeJS app is starting on (by clicking on the **Add Env** button). For our example the port is 3000. So on the environment variable we shall create a new entry for **PORT** and value **3000**, as shown in the screenshot below

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/build_Settings_842bf7649d.png)
   Click the **Deploy Project** button to start the build and deploy the project.

1. PipeOps will start the build and deployment process, and show the logs of the build and deployment process, to enable tracking of the process.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/build_Logs_223a2e7e2e.png)
   Build process

1. When the deployment is done, you get a notification stating that the deployment is complete and successful

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/deployed_Modal_20b632ef6d.png)
   Click the **Got it** button to return to the project

1. In returning to the project, we can see all the details of the project that has been configured, and some added information that tells us the status of the project.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/overview_6db59d7a90.png)

There are various; [History], [Observability](/docs/User%20Guides/For%20Startups/cluster-observability), [Logs], [Events], [Terminal] and [Settings] are used to monitor, observe, debug and re-configure the project.

1. To view the application that was deployed, click the **View Project** link.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/view_Project_b3e7e22e44.png)

1. This will automatically launch the application on a new tab

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/33/sample_bfe91564ed.png)

1. This setup has some basic configurations applied by default
   1. Application Network Port
   1. Network Access Port ([Environment Variable])
   1. Single Replica with 0.5 CPU and 512MB RAM ([Scaling and Replication])
   1. Auto Deploy a branch when a code change is checked-in.

To delete a project, use the Delete Project guide [here].
