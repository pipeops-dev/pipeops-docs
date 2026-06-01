---
slug: project-metrics
sidebar_position: 4
title: Project Metrics
description: "Access and explore performance metrics for deployed projects in PipeOps including CPU, memory, storage, and network I/O."
---

# Project Metrics

The **Metrics** tab gives you a real-time and historical view of your project's performance across CPU, memory, storage, and network activity. Use these charts to spot usage trends, identify resource bottlenecks, and track how your project behaves over time.

## Accessing Metrics

Navigate to your project and click the **Metrics** tab. The **Overview** section loads by default, showing a summary of all key metrics at a glance — including current CPU and memory usage gauges, used/total resource tiles, and time-series charts for storage and memory.

![project Metrics Overview](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-server-metrics.png)

## Filtering by Time Period

Use the **Period** dropdown at the top of the page to filter all charts by a relative time window (e.g. `5m`, `15m`, `1h`). All charts update simultaneously when the period changes.

## Metric Sections

Use the left sidebar to navigate between metric categories. Each section provides a dedicated time-series chart for that resource.

### CPU

Shows the processing power consumed by your project over the selected period. Use this to identify compute spikes or sustained high load that may require scaling.

![CPU Metric](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-cpu-metrics.png)

### Memory

Shows how much memory your project is consuming over time. The Overview also surfaces a **Restart Count** chart — a flat line at zero indicates no unexpected restarts. Rising memory that doesn't level off may indicate a memory leak or a need to increase your resource allocation.

![Memory Metric](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-memory-metrics.png)

### Storage

Tracks disk space usage over time. Particularly useful for database projects where storage is expected to grow steadily. Monitor this to avoid running out of disk space unexpectedly.

![Storage Metric](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-storage-metrics.png)

### Network I/O

Shows inbound (**Data Received**) and outbound (**Data Sent**) transfer activity over time. Use this to understand traffic patterns and detect unusual spikes in data transfer.

![Network I/O Metric](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-network-metrics.png)
