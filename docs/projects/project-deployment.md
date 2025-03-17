---
slug: project-deployment
title: Project Deployment
tags: [deployment, guide, reactjs]
sidebar_position: 1
---

# Deploying A Project

This walkthrough will take you through the steps to deploy a project on PipeOps. For this guide, we will be using a sample React application to show the seamless deployment process. You can follow along with a personal project and achieve similar results.

## Prerequisites:

- Basic understanding of React and web development concepts.
- [Navigate to your PipeOps dashboard](https://console.pipeops.io/dashboard/projects).

### Step 1: Navigate to the Projects Page

Log in to your PipeOps dashboard. Once you are logged in, you can access **Projects** by using one of the following methods:
- **Side Navbar:** Click on “Projects” from the sidebar menu.
- **Top Navbar:** Alternatively, click the ‘’New” button on the top right corner of your screen. Select “Deploy Project” from the dropdown menu.


##  Step 2: Confirm Repository Connection

The next step is to check your repository connection. Connecting your repository to PipeOps allows for automatic deployment.

- If you created your account using a repository provider (GitHub, GitLab, or Bitbucket), skip this step. 
- However, if you created an account with an email address, follow the steps below to link your repository to PipeOps:

1. Select your preferred repository provider (GitHub, GitLab, or Bitbucket).

![Repository Provider Selection](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/30/connect_Repo_db9ef645c0.png)


2. Authenticate your account to establish a connection between PipeOps and your repository.
3. Once authenticated, your repository will be visible on your dashboard. You can now proceed to deploy your first project.

![Repository Authentication](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/30/connected_Repo_19af41e4b2.png)



## Step 3: Choose your Project Type

After connecting your repository, you'll be presented with several project-type options, each designed for different kinds of applications and services. Select the option that best aligns with your project's needs.


Here's an overview of some of the available project types:
- **Web:** This is ideal if you are deploying a website, full-stack solution, single-page application, or API.
- **Worker (Runner):** Suitable for applications that require asynchronous task execution, background processing, or handling of job queues.
- **Cron Job:** This is best for automating tasks that need to run on a schedule, like generating reports or backing up data. 
- **Database:** You can deploy a database service to manage and store data for your applications.

## Step 4: Select Git Account and Organization

- Choose the provider you just linked from the dropdown. If you linked your GitHub repository, select GitHub. 
- After that, choose the organization from which you’ll be deploying. Doing this will open a field showing a list of repositories.
- Search and select the repository and branch you would like to deploy.  
Click **Proceed** to continue.


### Test with Templates  
PipeOps provides multiple template projects for users. If you are not ready to deploy your custom project, you can test how the service works with any of the provided templates. Here is how to get started:


1. Select from the template projects on the right pane of the screen. For this guide, we’ll use PipeOps React Javascript.

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/13101848/21.png)

2. Click on the desired template. This takes you to the configuration page. 


## Step 5: Configure Project 

Whether you're using a template project or deploying your custom project, the configuration process will look very similar.
Once you've selected your repository and branch (or a template), you'll be taken to the **Project Summary** page. 

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/13101938/22.png)

Here, you can:  
- Choose a custom name for your project. PipeOps generates a name automatically for you, but you can edit it to your liking.
- Select a deployment environment. Example: staging, development, or production.
- Specify which of your servers you want to deploy into.
- Configure general resources, including CPU and memory.


Click the **Proceed** button to continue.

## Step 6: Configure Build Settings

In this section, we will configure the project build settings. For this guide, we will choose the ReactJS framework and Node (Static Frontend) build method.

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/13102034/23.png)

Click the **Deploy Project** button to start the build process.


## Step 7: Monitor Deployment Progress

- PipeOps will start the build process, and you’ll be able to view the build logs to track progress. 

   ![2.png](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/11205137/14.png)


- Once the deployment is complete, you’ll get a notification stating the project has been deployed successfully.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/deployed_Modal_8ad6a070dd.png)


  Click “Got it” to return to the project’s dashboard.


- The dashboard provides an overview of all the project details. You can view the status of the project - whether it’s running or not, and access additional information like resource usage.


    ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/overview_ebc3bc62d7.png)



PipeOps provides various metrics to help you monitor, de-bug, and re-configure deployed projects. These include [History](/docs/projects/project-history), [Metrics](/docs/projects/project-metrics), [Logs](/docs/projects/logs-and-events#accessing-logs), [Events](/docs/projects/logs-and-events#accessing-events), [Terminal](/docs/projects/terminal) and [Settings](/docs/projects/project-setting).


### Accessing Deployed Project

Here’s how to view your deployed project:
- Click the **View Project** link at the top right corner of your screen.

   ![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/view_Project_513c97b6f1.png)

- This automatically launches the application in a new tab.

 This setup has some basic configurations applied by default
   1. Application Network Port
   1. Network Access Port ([Environment Variable])
   1. Single Replica with 0.1 CPU and 212MB RAM ([Scaling and Replication])
   1. Auto Deploy a branch when a code change is checked in.

To delete a project, use the Delete Project guide [here](/docs/projects/project-actions#delete-project).
