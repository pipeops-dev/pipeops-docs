---
sidebar_position: 1
slug: bad-gateway
title: 502 Bad Gateway Error
---

# 502 Bad Gateway Error

The **502 Bad Gateway** error is a common HTTP status code indicating a communication issue between web servers. It arises when a server, often acting as a gateway or proxy, receives an invalid response from another server. This guide will walk you through diagnosing and resolving the 502 Bad Gateway error for your website or web application hosted on PipeOps.

![Guide Image](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/21/bad_Gateway_002ce9cba5.png)

## Step 1: Project Port

Before we dive in, let's verify the port your project uses. If you're deploying your project using a Dockerfile on PipeOps, you can easily find your project's port by inspecting your Dockerfile.

![Guide Image](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/21/docker_18f0da94ed.png)

## Step 2: Networking Port

Once you know your project's port, let's ensure that the networking port corresponds to the one specified in your Dockerfile or project settings. To do this, follow these steps:

1. Access your project on PipeOps.
2. Click on the "Settings" tab.
3. Locate the "Networking" section, where you will find your project's port.
4. If the ports don't match, update the networking port to match your project's port.
5. Click the "Save" button to trigger a new deployment.

![Guide Image](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/21/port_a310a1fb51.png)

## Step 3: Environment Variable (PORT and HOST)

With the networking port in sync, it's time to confirm that the `PORT` and `HOST` environment variables are correctly configured. Here's how to check:

1. Access your project settings.
2. Navigate to the "Environment Variables" tab.
3. Verify that the `PORT` and `HOST` variables are correctly set. Ensure that the `HOST` is set to `0.0.0.0` to allow access from any IP address.
4. If the `PORT` doesn't match your project's port, update it.
5. Click the "Save" button to initiate a new deployment.

![Guide Image](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/21/environment_d1b12a884c.png)

## Step 4: Final Verification

After the new deployment, revisit your project to check if it's functioning correctly:

![Guide Image](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/21/fixed_90358d368b.png)

### Additional Tip: Checking Project Logs

For further debugging assistance, you can review your project's logs tab to examine the `PORT` and `HOST` settings.

![Guide Image](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/21/logs_14a0dd485b.png)

**👍 Awesome!**

You have now fixed your Bad Gateway error. Your website or web application should be up and running smoothly.
