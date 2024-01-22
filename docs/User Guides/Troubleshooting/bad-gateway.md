---
sidebar_position: 1
slug: bad-gateway
title: 502 Bad Gateway Error
---

# 502 Bad Gateway Error

The **502 Bad Gateway** error is a common HTTP status code indicating a communication issue between web servers. It arises when a server, often acting as a gateway or proxy, receives an invalid response from another server. This guide will walk you through diagnosing and resolving the 502 Bad Gateway error for your website or web application hosted on PipeOps.

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgateway.06b07a62.png&w=1920&q=75)

## Step 1: Project Port

Before we dive in, let's verify the port your project uses. If you're deploying your project using a Dockerfile on PipeOps, you can easily find your project's port by inspecting your Dockerfile.

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdocker.f5ee7f8e.png&w=1080&q=75)

## Step 2: Networking Port

Once you know your project's port, let's ensure that the networking port corresponds to the one specified in your Dockerfile or project settings. To do this, follow these steps:

1. Access your project on PipeOps.
2. Click on the "Settings" tab.
3. Locate the "Networking" section, where you will find your project's port.
4. If the ports don't match, update the networking port to match your project's port.
5. Click the "Save" button to trigger a new deployment.

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnetworking.49d38ce4.png&w=1080&q=75)

## Step 3: Environment Variable (PORT and HOST)

With the networking port in sync, it's time to confirm that the `PORT` and `HOST` environment variables are correctly configured. Here's how to check:

1. Access your project settings.
2. Navigate to the "Environment Variables" tab.
3. Verify that the `PORT` and `HOST` variables are correctly set. Ensure that the `HOST` is set to `0.0.0.0` to allow access from any IP address.
4. If the `PORT` doesn't match your project's port, update it.
5. Click the "Save" button to initiate a new deployment.

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenv.732c6bd0.png&w=828&q=75)

## Step 4: Final Verification

After the new deployment, revisit your project to check if it's functioning correctly:

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffinal.5399c765.png&w=1920&q=75)

### Additional Tip: Checking Project Logs

For further debugging assistance, you can review your project's logs tab to examine the `PORT` and `HOST` settings.

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogs.d7407001.png&w=1080&q=75)

**👍 Awesome!**

You have now fixed your Bad Gateway error. Your website or web application should be up and running smoothly.
