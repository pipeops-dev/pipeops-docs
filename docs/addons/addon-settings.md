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

![add-on General Settings](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-general.png)


### Networking

The Networking section allows you to configure network ports and protocols for your project. This feature gives you control over how your application communicates with external services and users.

- **Add Network Ports:** Specify the port number your application will use.

- **Select Protocol:** Choose the protocol for traffic on this port — either TCP (Transmission Control Protocol) or UDP (User Datagram Protocol).


- **Public Access:** Toggle the Public switch to make the port accessible from outside the cluster. When enabled, external clients can reach your application on this port.


- **Add More Ports:** Click **Add More** to configure additional ports and protocols as needed for your application.

After configuring your networking settings, click **Save** to apply changes or **Discard Changes** to revert.

![Projects-networking](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/projects-networking.png)


### Firewall Rules

The Firewall Rules section lets you manage network access control for your project, enhancing security by restricting which sources can communicate with your application.

- **Traffic Type:**  
Choose to configure rules for Inbound Traffic (incoming requests) or Outbound Traffic (outgoing requests).

- **Allowed Sources:**  
Specify the IP addresses or CIDR blocks allowed to access your deployment. You can enter multiple values separated by commas.  

    CIDR (Classless Inter-Domain Routing) lets you specify IP ranges efficiently using a format like 192.168.1.0/24, which includes all IPs from 192.168.1.0 to 192.168.1.255.

- **Except:**  
Optionally, list IPs or CIDRs that should be explicitly denied, even if they’re included in the allowed sources.


- **Ports & Protocols:**
Define which ports and protocols (TCP/UDP) are permitted. Add multiple rules as needed using the **Add More** button.


Click **Save** to apply your firewall rules or **Discard Changes** to cancel.

![Projects-firewall-rules](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/projects-firewall.png)

Firewall rules are crucial for securing your application by limiting exposure to only trusted sources and required ports, helping protect against unauthorized access and attacks.


### Environment Variable

Here you can perform either of the following options:

- **Edit Existing Variables:** Modify existing environment variables.
- **Create New Variables:** Add new environment variables individually or in bulk. We will discuss the two ways to create environmental variables in more detail.

![add-on Env](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-env.png)

1. **Using the Bulk Edit Button:** After clicking on the bulk edit button, a pop-up appears where you can add all your environment variables at once. This is especially useful if your add-on has a lot of environment variables that it depends on.

![add-on Env Bulk Edit](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-bulk-env.png)

2. **Using the Add Button:** After clicking on the Add button, a new row where you can add a new environment variable appears as shown below. Fill in the details for your new environment variable and click the save button on the bottom right corner of the pop-up.

![add-on Env Add Button](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-add-env.png)

### Resources and Replication

There are 2 subsections under this:

1. **General resources:** You can configure preset templates that will determine the CPU cores and the amount of memory that will be allocated to your add-on.

![add-on General Resources](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-resource.png)

2. **Replication:** Here you can select the number of replicas of your add-on that will be created. Replication is especially useful for enhanced redundancy and performance.


### Storage

For database add-ons, this section allows you to add an extra storage space. To do that:

- Click on the "Add Storage" button.
- Specify the path for the additional storage.
- Input the amount of storage you need (in Gigabytes) and click **Save**.

![addon settings](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-storage.png)

### Domains

When you deploy your application on PipeOps, it comes with a randomly generated name, such as `familiar-team-thoughtless.pipeops.app`. But wouldn't it be great to have a custom and memorable domain like `https://shopmart.pipeops.app`? With PipeOps, you can easily set a unique domain for your add-on.


![add-on domains](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/addon-settings-domain.png)


To customise the URL of your deployed add-on:

- Enter a valid domain name you would like to use.
- Click **Save** and a redeployment will be triggered for your add-on with the custom domain name you set for it.

