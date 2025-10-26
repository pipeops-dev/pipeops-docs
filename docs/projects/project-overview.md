---
slug: project-overview
sidebar_position: 2
title: Project Overview
---

# Project Overview

Welcome to the Project Overview feature in PipeOps! This dashboard provides a convenient snapshot of your application's essential details, empowering you with insights into its status, resource usage, HTTP path, and recent activity.



## Accessing Project Overview

The Project Overview page serves as the default landing page when accessing your project. It offers a convenient dashboard providing basic details about your application at a glance. Here's what you can find on this page:

 ![Project Overview Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-overview.png)

1. **App Status**:
   In the App Status section, you can quickly assess the state of your application. Whether it's live or not, you'll know at a glance. Additionally, you'll have access to the server name and the region where your application is deployed, ensuring you have visibility into its infrastructure.

2. **Resource Usage**:
   Understanding resource usage is crucial for maintaining optimal performance. PipeOps offers intuitive charts detailing memory, CPU, and disk usage. You'll receive automatic alerts if any of these resources reach critical levels, helping you proactively manage your application's performance and stability.
   For more information about resource usage, refer to the Project Metrics documentation, which delves deeper into the different project metrics that are being monitored by PipeOps

3. **HTTP Path**:
   You can quickly locate and reference the path your application is hosted on, facilitating seamless access for both users and administrators.

4. **Recent Activity**:
   Stay informed about recent deployments and changes to your application with the Recent Activity section. Short notes provide key details such as the commit ID, repository name, and timestamps, giving you insights into the evolution of your project.
   For a more comprehensive view, refer to the [Project History documentation](/docs/projects/project-history.md), which delves into the detailed history of your project's changes.
   

### Exploring Further

For more detailed information on any specific aspect mentioned in the overview, you can explore the corresponding tabs on the project page. These tabs are dedicated to different areas such as Metrics, terminal access, and project history, allowing you to delve deeper into the aspects that require your attention. Thus, the Project Overview provides a convenient starting point for monitoring your project's status and facilitates further exploration as needed.

## Managing Projects via CLI

You can also manage your projects using the PipeOps CLI for automation and scripting:

- **List projects**: `pipeops project list` - View all your projects
- **View logs**: `pipeops project logs --project my-app` - Access project logs from the terminal
- **Manage environment variables**: `pipeops project env` - Configure environment settings

For more information, see the [CLI Project Commands documentation](/docs/cli/commands/projects).
