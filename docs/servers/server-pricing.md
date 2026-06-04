---
slug: server-pricing
sidebar_position: 8
title: Server Pricing
description: "Understand estimated cloud cost breakdowns for servers 
deployed through PipeOps including per-resource pricing details."
---

# Server Pricing

The **Pricing** tab shows an estimated monthly cost breakdown for
the resources provisioned on your server through PipeOps.

:::note
The Pricing tab is available on **Bring Your Own Cloud** servers
only. Nova server costs are tracked separately in the
[Usage](/docs/usage) section.
:::

## Accessing Server Pricing

From the **Servers** section, select a BYOC server and click the
**Pricing** tab.

![Server Pricing Breakdown](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/server-creation/server-pricing.png)

## Pricing Information

The Pricing tab displays the following:

| Field              | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| **Total Costs**    | The total estimated monthly cost for all provisioned resources on this server. |
| **Region**         | The geographic region where the server is deployed. Pricing varies by region.  |
| **Default Node**   | The primary node instance type configured for the server.                      |
| **Cost Breakdown** | An itemized estimate of monthly costs per resource type.                       |

## Cost Breakdown

The cost breakdown lists estimated monthly costs for each resource
component provisioned through PipeOps. The specific line items
depend on the cloud provider your server is connected to.

For example, an AWS-connected server may show:

- Memory
- Dedicated instance
- Storage volume
- Elastic Kubernetes Service (EKS)
- Elastic Load Balancer

A GCP or Azure-connected server will display equivalent cost
components for those providers.

:::note
All costs shown are **estimates** based on the resources currently
provisioned. Actual charges are determined by your cloud provider
and may differ based on usage, reserved pricing, or provider
discounts.
:::
