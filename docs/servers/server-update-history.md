---
slug: server-update-history
sidebar_position: 9
title: Server Update History
---

# Server Update History

This documentation provides a comprehensive guide to managing and configuring project settings in PipeOps. With PipeOps, you can easily customize various aspects of your project to meet specific requirements and optimize its performance.

## Prerequisites

Before delving into project settings, ensure you have the following prerequisites:

1. **A PipeOps account**. Use the link [here](https://console.pipeops.io/signup) to sign up on PipeOps if you do not currently have an account.
2. **A deployed project**. This can be a PipeOps template or a project from your Git (Github, Gitlab, Bitbucket) account. You can select a PipeOps template [here](https://github.com/orgs/pipeops-dev/repositories).

## Accessing Project Settings

To access project settings:

- Navigate to your project's main page in PipeOps.
- Click on the "**Settings**" tab to access the project settings dashboard.

## Exploring Individual Project Settings

The project settings dashboard is organized into several subsections, each catering to specific configuration areas:

### General Settings

In this section, you can manage basic project details such as:

- **Project Name:** Rename your project. This also customises your PipeOps domain name for you. For more information on this [click here](/docs/projects/customizing-default-domain)
- **Custom Domain:** Input a custom domain name for your project.

![Project General Settings](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28040027/5-2.png)

### Build Settings

Customize the build process with options including:

- **Framework:** Choose the framework for your project.
- **Build Method:** Select the build method.
- **Lifecycle Command:** Define the command your project runs on.

![Project Build Settings](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28041021/6-2.png)

### Source Control

The settings here are subdivided into 2 sections:

1. **CI/CD Settings:** Here you can decide to manually trigger the deployment process and bypass automatic deployment. You can also auto-rollback on failure, this means that if a deployment fails, it automatically redeploys the last working version of your application.

2. **Branch Rules:** You can specify if deployments are automatically triggered when you make new changes to a branch in your git (github, gitlab and bitbucket) repository. You can also select a production branch that PipeOps will deploy from.

![Project Source Control](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28041243/7-1.png)

### Environment Variable

Here you can perform either of the following options:

- **Edit Existing Variables:** Modify existing environment variables.
- **Create New Variables:** Add new environment variables individually or in bulk. We will discuss the two ways to create environmental variables in more detail.

![Project Env](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28041518/8-1.png)

1. **Using the Bulk Edit Button:** After clicking on the bulk edit button, a pop-up appears where you can add all your environment variables at once. This is especially useful if your project has a lot of environment variables that it depends on.

![Project Env Bulk Edit](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/45/Project_Settings_Bulk_Add_Env_bd3b6c0bd0.png)

2. **Using the Add Button:** After clicking on the Add button, a new row where you can add a new environment variable appears as shown below. Fill in the details for your new environment variable and click the save button on the bottom right corner of the pop-up.

![Project Env Add Button](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28042155/10-1.png)

### Resources and Replication

There are 2 subsections under this:

1. **General resources:** You can configure preset templates that will determine the CPU cores and the amount of memory that will be allocated to your project.

![Project General Resources](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/45/Project_Settings_Presets_f701b89f80.png)

2. **Replication:** Here you can select the number of replicas of your project that will be created. Replication is especially useful for enhanced redundancy and performance.

![Project Replication](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28042204/11-2.png)

### Storage

In this section you can easily add extra storage to meet your needs. Here’s how:

![Project storage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28034712/3-2.png)

1. **Specify the Path**: Determine where you want the extra storage to be added. This could be any directory within your application that requires more space.
2. **Set the Size**: Decide how much additional storage you need. Simply enter the number of Gigabytes required.

![Project storage added](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28035533/4-1.png)

### Collaboration

Here you can input the email address of a friend or colleague that also has a PipeOps account to collaborate on a project with them. Invite collaborators by entering their PipeOps account email addresses to work on the project together.

![Project Collaboration](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28042523/12-2.png)

By navigating through these subsections, you can effectively tailor your project settings to meet specific requirements, ensuring seamless deployment and optimal performance. Make the most of PipeOps project settings to streamline your development process and collaborate efficiently.
