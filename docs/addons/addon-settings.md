---
slug: addon-setting
sidebar_position: 7
title: Addon Settings
---

# Addon Settings

This documentation provides a comprehensive guide to managing and configuring add-on settings in PipeOps. With PipeOps, you can easily customize various aspects of your add-on to meet specific requirements and optimize its performance.

## Access add-on Settings

To access add-on settings:

- Navigate to your add-on's main page on PipeOps.
- Click on the "**Settings**" tab to access the add-on settings dashboard.

## Explore Individual Addon Settings

The add-on settings dashboard is organized into several subsections, each catering to specific configuration areas:

### General Settings

In this section, you can manage basic add-on details such as:

- **Add-on Name:** Rename your add-on. This also customises your PipeOps domain name for you. For more information on this [click here](/docs/addons/customizing-default-domain)

![add-on General Settings](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28040027/5-2.png)

### Environment Variable

Here you can perform either of the following options:

- **Edit Existing Variables:** Modify existing environment variables.
- **Create New Variables:** Add new environment variables individually or in bulk. We will discuss the two ways to create environmental variables in more detail.

![add-on Env](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28041518/8-1.png)

1. **Using the Bulk Edit Button:** After clicking on the bulk edit button, a pop-up appears where you can add all your environment variables at once. This is especially useful if your add-on has a lot of environment variables that it depends on.

![add-on Env Bulk Edit](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/45/add-on_Settings_Bulk_Add_Env_bd3b6c0bd0.png)

2. **Using the Add Button:** After clicking on the Add button, a new row where you can add a new environment variable appears as shown below. Fill in the details for your new environment variable and click the save button on the bottom right corner of the pop-up.

![add-on Env Add Button](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28042155/10-1.png)

### Resources and Replication

There are 2 subsections under this:

1. **General resources:** You can configure preset templates that will determine the CPU cores and the amount of memory that will be allocated to your add-on.

![add-on General Resources](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/45/add-on_Settings_Presets_f701b89f80.png)

2. **Replication:** Here you can select the number of replicas of your add-on that will be created. Replication is especially useful for enhanced redundancy and performance.

![add-on Replication](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/28042204/11-2.png)

### Storage

For database add-ons, this section allows you to add an extra storage space. To do that:

- Click on the "Add Storage" button.
- Specify the path for the additional storage.
- Input the amount of storage you need (in Gigabytes) and click **Save**.


### Domains

When you deploy your application on PipeOps, it comes with a randomly generated name, such as `familiar-team-thoughtless.pipeops.app`. But wouldn't it be great to have a custom and memorable domain like `https://shopmart.pipeops.app`? With PipeOps, you can easily set a unique domain for your add-on.

To customise the URL of your deployed add-on:

- Enter a valid domain name you would like to use.
- Click **Save** and a redeployment will be triggered for your add-on with the custom domain name you set for it.

