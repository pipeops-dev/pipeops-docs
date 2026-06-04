---
slug: server-dashboard
sidebar_position: 7
title: Server Dashboard
description: "Access the Prometheus monitoring 
tool for your PipeOps server."
---

# Server Dashboard

The **Dashboard** tab gives you direct access to the Prometheus monitoring tool for your server. Use it to
inspect cluster resources in real time and review performance metrics
without leaving PipeOps.

:::note
The Dashboard tab is not available on all server types. Availability
depends on your provisioning method and server configuration.
:::

## Accessing the Dashboard

From the **Servers** section, select a server and click the
**Dashboard** tab.

## Dashboard Tools

### Prometheus

Prometheus is a monitoring and alerting system that collects
real-time metrics from your Kubernetes cluster. In PipeOps, it gives
you access to:

- Resource usage trends for CPU, memory, and storage.
- Custom metric queries for deeper performance analysis.
- Alerting data for conditions you want to track over time.

<!-- PLACEHOLDER: Screenshot of the Prometheus view or metrics interface -->

:::note
If the tool is unavailable for your server, the relevant section
will indicate that it has not been configured or is not supported
for your server type.
:::
