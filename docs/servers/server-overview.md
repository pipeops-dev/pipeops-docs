---
slug: server-overview
sidebar_position: 2
title: Server Overview
---

# Server Overview

Here, we’ll talk about the Server Overview feature on PipeOps. This dashboard provides a snapshot of your server’s essential details and associated resources.

The Overview tab is the default landing page when you select a server. Some details may vary depending on whether you created your server using **PipeOps** or a **cloud provider**.

On this page, you will see your server's name and a banner containing the following information:

- **Created**: The date and time your server was created.
- **Region**: The location where your server is currently deployed.
- **Provider**: The cloud provider on which your server is hosted.
- **Kubernetes Version**: The current Kubernetes version running on your server.

Additionally, you will find cards displaying the following server-related information:

- **Nodes**: The number of active nodes currently running on your server.
- **Deployments**: The total number of deployments on your server, including both projects and add-ons.
- **Total Resources**: Get a summary of your server’s capacity and utilization here. Stay informed about the number of unused environments, active subscriptions, team members, ypur current plan, and available credits.
- **Current Usage**: This field provides a cost breakdown of your infrastructure usage powered by **OpenCost**.
 - **Grafana Labs:** This metric is available for servers deployed via a cloud provider. You can open the Grafana dashboard and monitor your server in real time.

From the overview page, you will also see a **navigation menu** to other sections related to your server.

- If you created a server on **PipeOps**, your navigation menu will include:

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

You can also view real-time server events with a **Severity** filter to display specific event types. Events are displayed in a table with the following columns:

- **Severity**: Filters events by severity level (**Normal**, **Warning**, and **Error**).
- **Time**: Displays the timestamp of when the event occurred.
- **Summary**: Provides a brief summary of the incident details.

## Conclusion

This page serves as a central hub for managing and monitoring your server, providing all the essential information at a glance. Use the tab navigation menu to explore additional aspects of your server.
