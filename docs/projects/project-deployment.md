---
slug: project-deployment
title: Project Deployment
tags: [deployment, guide, reactjs]
sidebar_position: 1
---

# Deploying A Project

In this section, we will walk through deploying a project. We will be using a sample react application for this deployment, showing swift and effortless deployments are on PipeOps.

## Prerequisites:

- Basic understanding of React and web development concepts.
- [Navigate to your PipeOps dashboard](https://console.pipeops.io/dashboard/projects).

### Step 1: Check Repository Connection

Connecting a repository to your account is essential for seamless deployment.

- If you created your account using any of the repository providers (GitHub, GitLab, Bitbucket), you can skip this step, as your account is already linked.
- You can proceed to the next step if your account is pre-linked.

### Step 2: Connect Repository

1. If you need to connect a repository manually, click on your preferred repository provider (GitHub, GitLab, Bitbucket).

![Repository Provider Selection](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/30/connect_Repo_db9ef645c0.png)

2. Authenticate your account to establish a connection between your repository provider and your dashboard.

![Repository Authentication](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/30/connected_Repo_19af41e4b2.png)

3. Once authenticated, your repository is successfully connected.

### Note

- Connecting your repository allows for automatic deployment and other repository-related functionalities.

Congratulations! Your repository is now linked to your account. You can proceed with deploying your first project and leveraging the full power of our platform.

1. For this example, we shall test with the template project provided, which is on the right pane of the screen. Select **Pipeops ReactJS**.

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/13101848/21.png)
   This will lead to the next stage of configuring the deployment.

1. PipeOps automatically generates a name for the project to be deployed (which can be edited later, see: [How to Edit a Project Name](/docs/projects/project-setting#general-settings)). Configures a default server and environment for the project deployment.

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/13101938/22.png)
   Click **Proceed** to continue to the next stage

1. In the next stage, we shall select the Framework we are building with, and the Build method, in this case we shall choose **ReactJS** and **Node (Static Frontend)** respectively.

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/13102034/23.png)
   Click the **Deploy Project** button to start the build and deploy the project.

1. PipeOps will start the build and deployment process, and show the logs of the build and deployment process, to enable tracking of the process.

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/11205137/14.png)

1. When the deployment is done, you get a notification stating that the deployment is complete and successful

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/deployed_Modal_8ad6a070dd.png)
   Click the **Got it** button to return to the project

1. In returning to the project, we can see all the details of the project that has been configured, and some added information that tells us the status of the project.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/overview_ebc3bc62d7.png)

There are various; [History](/docs/projects/project-history), [Metrics](/docs/projects/project-metrics), [Logs](/docs/projects/logs-and-events#accessing-logs), [Events](/docs/projects/logs-and-events#accessing-events), [Terminal](/docs/projects/terminal) and [Settings](/docs/projects/project-setting) are used to monitor, observe, debug and re-configure the project.

1. To view the application that was deployed, click the **View Project** link.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/view_Project_513c97b6f1.png)

1. This will automatically launch the application on a new tab

1. This setup has some basic configurations applied by default
   1. Application Network Port
   1. Network Access Port ([Environment Variable])
   1. Single Replica with 0.1 CPU and 212MB RAM ([Scaling and Replication])
   1. Auto Deploy a branch when a code change is checked-in.

To delete a project, use the Delete Project guide [here](/docs/projects/project-actions#delete-project).
