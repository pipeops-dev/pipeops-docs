---
sidebar_position: 2
slug: no-buildpack-detected
title: No Buildpack Detected
---

# Resolving the "No Buildpack Detected" Error

Encountering the "No Buildpack Detected" error during application deployment can be a common issue. This error typically arises when using unsupported or misconfigured buildpacks within the PipeOps platform. This guide is designed to assist you in diagnosing and resolving the "No Buildpack Detected" error for your application deployment on PipeOps.

![Guide Image](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbdc.090841f9.png&w=1920&q=75)

## Step 1: Verify Project Structure

Before you begin troubleshooting, it's essential to ensure that your project adheres to the expected directory structure and contains the necessary configuration files. These commonly include `manifest.yml`, `Dockerfile`, `Procfile`, or `buildpacks.toml`. Proper configuration is vital. For detailed information on configuring your application, please refer to our [guide](https://pipeops.io/resources/guides).

## Step 2: Update Buildpacks Selection

If the specified buildpack is unavailable or incompatible with your application, it's necessary to update your configuration to use a supported buildpack. You may also need to adjust your application to accommodate the required buildpack.

## Step 3: Test Locally

Before proceeding with deployment, rigorously test your application on your local environment. This step will help you identify and rectify any code or dependency issues.

## Step 4: Deploy To PipeOps

Once you've ensured that your application functions correctly locally and have configured the appropriate buildpack settings, you can proceed with deploying your application to PipeOps.

**👍 Congratulations!**

By following these steps, you can effectively resolve the "No Buildpack Detected" error and achieve a successful deployment of your application on PipeOps.
