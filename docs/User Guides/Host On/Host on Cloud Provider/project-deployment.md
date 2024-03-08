---
sidebar_position: 4
title: Project Deployment
slug: project-deployment
---

# Project Deployment on Your Kubernetes Cluster

Deploying your application on our platform is easy and straightforward. Before you embark on this ensure you've completed the prerequisite steps by [creating and configuring your server](cluster-provisioning.md) and connecting your repository. If you haven't connected your repository yet, don't worry; we'll guide you through it.

:::info

Our sample project for deployment contains a **Dockerfile**

:::

## Connect to Your Repo

If you haven't already connected your repository, follow the steps in [Step 2 - Connect a Repository](connect-repo.md) to ensure your repo is linked to your account.

## Select Repository Account and Organisation

1. Navigate to the **Repository Settings** section in your dashboard.
2. Choose your repository account and organisation from the available options.

   ![Repository Account Selection](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/repo_Account_Org_caf8c5ba8e.png)

## Choose Repository and Branch

1. Select the repository that contains your project.
2. Choose the desired branch for deployment.

   ![Repository and Branch Selection](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/branch_d93ad904bc.png)

## Configure Docker Framework and Dockerfile Location

1. In the **Deployment Environment**, select the Docker framework (recommended by default).
2. Choose the location within your repository (root as default).

   ![Docker Configuration](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/build_Settings_cb426e2b01.png)

## View Project Summary

1. View the project summary of your application to confirm repo details, project name and other project details.

   ![Project Summary](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/project_Summary_d130eba6b2.png)

## Set Container Port

1. Set the container port to the desired port number for your application.

## Deploy

Click the **Deploy** button to initiate the deployment process.

## Monitor Deployment Logs

You can monitor the progress of your deployment through three stages: commit, build, and deploy. Navigate to the **Deployment Logs** section to view detailed information.

![Deployment Logs Commit](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/commit_b07d384497.png)

![Deployment Logs Build](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/build_b89a91bda5.png)

## Receive Notification

After successful deployment, you will receive a notification.
![Project Success](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/deployed_5956ca3836.png)

## View Live Deployment

1. Click on the **View Project** button to access your live deployment.

   ![View Project](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/23/view_Project_e969a59c85.png)

Congratulations! Your application is now deployed on your Kubernetes cluster. Feel free to explore additional features and configurations within your dashboard.
