---
slug: project-overview
sidebar_position: 2
title: Project Overview
description: "View your project dashboard in PipeOps including application status, resource usage, and recent deployment activity."
---

# Project Overview

The **Overview** tab is the default landing page for any project in PipeOps. It gives you a quick snapshot of your application's current state, resource consumption, and recent deployment activity.

![Project Overview Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/deploy-project-11.png)

## App Status

Shows whether your application is currently running, along with the server it is deployed on and its region. A green indicator and the message **Your App Is Running!** confirms a healthy deployment.

Your application can be in a number of different states depending on its current condition — such as deploying, failed, or paused. [Learn more →](/docs/projects/project-states.md)

## Resource Usage

Displays real-time CPU and memory consumption as gauge charts. Click **Full resource metrics** to navigate to the Metrics tab for a more detailed breakdown of your application's performance over time.

## Recent Activity

Lists recent deployments with key details for each entry: the commit hash, the branch deployed from, the linked repository, the timestamp, and the deployment status (e.g. **Live**). Click **View all deployments** to see the full deployment history on the History tab.

## Page Actions

Two persistent controls are available in the top-right corner of the page regardless of which tab is active:

- **Live Url** — Opens your application's public URL directly in a new tab.
- **Terminal** — Opens an in-browser shell connected to your application's container.

## Actions Menu

The **Actions** button in the top-right corner provides controls for managing your project's deployment lifecycle, including redeploying, pausing, rolling back, and deleting the project. [See Project Actions](/docs/projects/project-actions.md) for a full breakdown of each option.

## Exploring Further

The project page includes the following tabs for deeper inspection:

| Tab          | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| **History**  | Full deployment history with logs and status for each deploy.                     |
| **Metrics**  | Detailed CPU, memory, and network usage charts.                                   |
| **Logs**     | Real-time and historical application log output.                                  |
| **Events**   | Infrastructure-level events such as pod scheduling and restarts.                  |
| **Worker**   | Configuration and status of background worker processes.                          |
| **Jobs**     | Scheduled and on-demand job management.                                           |
| **Settings** | Project configuration including environment variables, networking, and resources. |

## Managing Projects via CLI

You can also manage your projects using the PipeOps CLI for automation and scripting:

- **List projects**: `pipeops project list` - View all your projects
- **View logs**: `pipeops project logs --project my-app --follow` - Access project logs in real-time
- **Manage environment variables**: `pipeops project env list --project my-app` - Configure environment settings

For more information, see the [CLI Project Commands documentation](/docs/cli/commands/projects).
