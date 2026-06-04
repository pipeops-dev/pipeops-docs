---
slug: deploy-template-projects
sidebar_position: 1
title: Deploy Template Projects
description: "Deploy a starter project from a PipeOps template without connecting a Git repository first."
---

# Deploy Template Projects

Template projects help you deploy a working sample application on
PipeOps without setting up a repository from scratch. Use this option
when you want to try PipeOps quickly, test a supported framework, or
deploy a starter project before connecting your Git provider.

You can deploy a template project during onboarding or from the
PipeOps dashboard after your account has already been created.

## Before You Begin

Make sure you have:

- A PipeOps account.
- At least one server available for deployments.
- Access to the PipeOps dashboard.

:::info
If you do not have a server yet, create one before deploying your
template project. See [Server Provisioning](/docs/servers/server-provisioning)
for the full setup guide.
:::

## Start a Template Deployment

Choose the flow that matches where you are in PipeOps.

### Option 1: During Onboarding

If you are a new user and do not want to connect GitHub, GitLab,
Bitbucket, or Azure DevOps yet, you can deploy a template project
from the Git provider connection step.

1. On the **Connect Your Git Provider** page, click
   **Deploy a template project**.

![Connect Your Git Provider page with the Deploy a template project button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-1.png)

2. In the **Deploy Template Project** modal, browse the available
   templates or use the search field to filter the list.
3. Select the template you want to deploy.
4. Click **Proceed**.

![Deploy Template Project modal showing searchable template options](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-2.png)

### Option 2: From the Dashboard

Use this path if you already have access to the PipeOps dashboard.

1. Click **+ New** in the top-right corner of the dashboard.
2. Select **Deploy Project** from the menu.

![New menu showing the Deploy Project action](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-3.png)

3. On the **Deploy Project** page, choose **Web** as the project
   type.

![Deploy Project page showing project type cards with Web selected](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-4.png)

4. Select the **From Templates** tab.
5. Browse the templates or use the search field to find a specific
   framework or language.
6. Select the template you want to deploy.
7. Click **Proceed**.

![From Templates tab showing the template list and Proceed button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-5.png)

## Configure the Project

After choosing a template, review the project summary before
deployment.

1. In **Project Name**, keep the generated name or enter a new one.
   Choose a clear name that helps you identify the project later.
2. In **Environment**, select the environment where the project
   should run, e.g **Production** or **Beta**.
3. In **Server**, confirm the server that will host the project.
4. Under **General Resources**, review the CPU and memory allocation.
   Adjust the values if your template needs more resources.
5. Under **Project Source**, confirm that the selected template is
   correct.
6. Click **Proceed**.

![Project Summary page showing project name, environment, server, resources, and project source](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-6.png)

:::tip
For a first test deployment, the default resource values are usually
enough. Increase CPU or memory when the project requires more capacity
or if the app becomes slow under load.
:::

## Review Build Settings

PipeOps prepares build settings based on the selected template. Review
these settings before starting the deployment.

1. Confirm the **Build Method** selected by PipeOps.
2. If the project has a release command, add it under
   **Release Command**.
3. Under **Networking**, review the generated public domain and the
   exposed port.
4. To use a different domain, select **Custom Domain** and configure
   your domain settings.
5. Add any required **Environment Variables**. For example, some
   templates may require variables such as `HOST`, `PORT`, database
   URLs, API keys, or application secrets.
6. Click **Deploy Project**.

![Project Build Settings page showing build method, networking, and environment variables](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-7.png)

## Monitor the Deployment

After you click **Deploy Project**, PipeOps opens the deployment
pipeline. The pipeline shows each stage of the deployment process,
including commit preparation, security scan, build, and deploy.

Wait for the pipeline to complete. If a stage fails, review the logs
shown in the pipeline output and update the build settings or
environment variables as needed.

![Deployment Pipeline page showing commit, scan, and build logs](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-8.png)

When the deployment is successful, PipeOps displays a
**Project Deployed!** confirmation message.

![Project Deployed confirmation modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-10.png)

Click **Got it** to open the project page.

## Verify the Running Project

On the project overview page, confirm that the application is running.

1. Check **App Status**. It should show that your app is running.
2. Review **Recent Activity** to confirm that the latest deployment
   went live.
3. Click **Live Url** to open the deployed application in your
   browser.
4. Use the project tabs to inspect deployment history, metrics, logs,
   events, workers, jobs, and settings.

![Project overview page showing app status, recent activity, and Live Url button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/template-deployment-11.png)

## Next Steps

After your template project is running, you can:

- Open the live URL and test the application.
- Review logs and metrics from the project page.
- Add environment variables for template-specific configuration.
- Connect a Git provider when you are ready to deploy your own
  repository.
