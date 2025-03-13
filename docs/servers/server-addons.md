---
slug: server-addons
sidebar_position: 5
title: Server Add-ons
---

# Server Add-Ons

This guide introduces the **Server Add-ons** functionality on PipeOps. Add-ons are extensions that enhance the functionality, security, and automation of server environments. They are designed to streamline server management, improve performance, and integrate essential services, ensuring that your infrastructure is optimized for efficiency and scalability.

Note that this tab is available only for servers deployed using the **cloud provider** path on PipeOps.

## Accessing Server Add-Ons
To access server add-ons, follow these steps:
1. Navigate to the **"Servers"** section.
2. Select the desired server from the list.
3. Click on the **"Add-ons"** tab.

The following add-ons are pre-installed when you create a server:

- **Cluster autoscaler:** This component minimizes costs by ensuring that nodes are added to the server when needed and are removed when unused.
- **Sealed secret:** This provides a mechanism to securely manage sensitive data in your server.
- **Certificate manager:** This automatically creates and renews <abbr title="Transport Layer Security, or TLS, is a security protocol designed to facilitate privacy and data security for communications over the internet">TLS</abbr> certificates and stores them as Kubernetes secrets for easy use.
- **Ingress-Nginx controller:** This manages external traffic coming into the server. It may also handle <abbr title="Secure Sockets Layer, or SSL, is a security protocol that encrypts data exchanged between a server and a browser (or between two servers)">SSL</abbr> configurations and load-balancing.
- **Metrics server:** A scalable, efficient source of container resource metrics for Kubernetes built-in autoscaling pipelines. It gathers data on how resources like CPU and memory are utilized. This data can be used for autoscaling.
- **K8 dashboard:** A web-based Kubernetes dashboard for managing applications in a cluster.
- **External DNS:** This refers to Domain Name System (DNS) records managed outside of an internal network. Examples of external DNS include Amazon Route 53, Azure DNS, and Google Cloud DNS.
- **Prometheus:** Stores and collects metrics necessary for monitoring and troubleshooting issues. 
For the Prometheus add-on, the "Action" column shows "View Credentials." Clicking this button will display a pop-up window containing the username and password required to access the Prometheus monitoring system.

Check out our [Add-ons section](/docs/addons/addon-deployment.md) for detailed steps on deploying add-ons to your server.
