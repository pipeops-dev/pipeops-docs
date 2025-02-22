---
slug: server-overview
sidebar_position: 2
title: Server Overview
---

# Server Overview

On this page, you can view general information about the server you have created. Some details may vary depending on whether your server was created using **PipeOps** or a **cloud provider**.

You will see your server's name and a banner containing the following information:

- **Created**: The date and time when your server was created.
- **Region**: The location where your server is currently deployed.
- **Provider**: The cloud provider on which your server is hosted.
- **Kubernetes Version**: The version of Kubernetes running on your server.

Additionally, you will find cards displaying the following server-related information:

- **Nodes**: The number of active nodes currently running on your server.
- **Deployments**: The total number of deployments on your server, including both projects and add-ons.
- **Total Resources**: The overall count of resources allocated to your server.
- **Cost Per Month**: The estimated monthly cost of running your server.
  - If your server was created on **PipeOps**, this card will display the server tier and associated costs.
  - If your server was created using a **cloud provider**, this card will also include a cost breakdown powered by **OpenCost**.

You will also see a **tab navigation menu**.

- If you chose to create a server on **PipeOps**, the navigation menu will include:

  - **Overview** tab
  - **Metrics** tab
  - **Events** tab
  - **Nodes** tab
  - **Settings** tab

- If you deployed a server using a **cloud provider**, your navigation menu will include everything from the **PipeOps** server, plus:
  - **Add-ons** tab
  - **Dashboard/Prometheus** tab
  - **Pricing** tab
  - **Update History** tab

You can also view real-time server events with a **Severity** filter to display specific event types. Events are presented in a table with the following columns:

- **Severity**: Filters events by severity level (**Normal**, **Warning**, and **Error**).
- **Time**: Displays the timestamp of when the event occurred.
- **Summary**: Provides a brief summary of the incident details.

## Conclusion

This page serves as a central hub for managing and monitoring your server, providing all the essential information at a glance. Use the tab navigation menu to explore additional aspects of your server.
