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

### Step 1: Connect To Your Next.js Project

1. On your dashboard, under the "My projects" tab, click on the "Deploy a new Project" button and select "Web project."

![2.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/24/new_Project_29ea7d1e9a.png)

Connecting a repository to your account is essential for seamless deployment. If you created your account using any of the repository providers (GitHub, GitLab, Bitbucket), you can skip this step, as your account is already linked.

### Step 1: Check Repository Connection

- If you created your account with GitHub, GitLab, or Bitbucket, your repository is already linked.
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

1. Select "Linked repository", then select the "Select repo source" drop-down. Choose the repo you will use for the project. If you would like to use a different repository, click on "Link new repo" and select from any of the repo providers.
2. Select your repo organization from the "Select organization" drop down.
3. Select your source repository, and the branch you would like to deploy. In my example, [Ohansck/react-portfolio](https://github.com/ohansck/react-portfolio) and the main branch. Click on proceed.

![4.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/24/linked_Repo_2ec2af8fb9.png)

### Step 2: Configure Your Project

1. Your project has been created, and your summary dashboard is shown to you. It contains your project name and environment, server, project repository, project source and cost. Leave as default and click proceed.

![5.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/summary_8b19b61bb6.png)

1. Your project build settings dashboard is now shown to you. In the build settings > framework dropdown, select ReactJs
2. Your build method dropdown is automatically set to 'NodeJs (Static frontend) Recommended'. If it is not, please select it as your build framework.
3. Enter your custom application build command. Use the default if your application builds with

```bash
npm run build
```

1. Enter your custom build path. Leave as default if your application uses a “/build” build path.
2. If applicable, enter your application's life cycle release command.
3. Review your configuration settings.

![6.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/build_Settings_66afc8e813.png)

### Step 3: Deploy Your React Application

1. Click deploy.
2. Monitor the logs on the build logs section. After a successful build, click on the "View project" button to view your successfully deployed application.

![7.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/build_Logs_d7cdb4958e.png)

### Step 4: Celebrate Your Swift Deployment!

Congratulations! You have successfully deployed your React application using PipeOps. Your app is now live and accessible to users worldwide.

![8.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/deployed_Modal_8ad6a070dd.png)

![9.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/35/view_Project_513c97b6f1.png)

![10.png](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//12/10_e678a4ad6b.png)
