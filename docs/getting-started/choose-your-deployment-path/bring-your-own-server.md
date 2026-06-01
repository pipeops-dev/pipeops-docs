---
slug: bring-your-own-server
sidebar_position: 3
title: Bring Your Own Server
description: "Connect an existing machine to PipeOps using the Bring Your Own Server (BYOS) feature and deploy projects to it without switching cloud providers."
---

The **Bring Your Own Server (BYOS)** feature lets you connect almost any machine to PipeOps and manage it alongside your other servers. This includes physical hardware, on-premise servers, and virtual machines from any cloud provider.

Before you begin, make sure your machine meets the following requirements:

- It has a stable internet connection so it can communicate with the PipeOps control plane.
- If you are on Windows, you must have **WSL (Windows Subsystem for Linux)** installed. See the [WSL setup guide](https://agents.pipeops.io/getting-started/windows-installation) before continuing.

### Step 1: Choose Bring Your Own Server

On the **Choose Your Deployment Path** page, select **Bring Your Own Server**, then click **Proceed**.

![Choose Your Deployment Path page with Bring Your Own Server selected](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/byos-1.png)

### Step 2: Configure Server Details

Enter a name for your server, then select a **Gateway Region** — this is the region PipeOps will use to route traffic to your machine. Each region displays its bandwidth cost so you can choose based on your location and budget.

<!-- ![BYOS configuration page with server name field and Gateway Region dropdown showing regions and bandwidth costs](#) -->

Click **Generate Token**. PipeOps generates a registration token and a pre-filled installation command tied to your server name and selected region.

<!-- ![BYOS configuration page after token generation, showing the installation command](#) -->

### Step 3: Install and Connect

Open a terminal on your target machine and run the installation commands. The steps vary slightly depending on your operating system.

Where possible, copy the command directly from your PipeOps dashboard — it includes your token and server name pre-filled. If you are entering the commands manually, replace `YOUR_GENERATED_TOKEN` and `YOUR_SERVER_NAME` with your actual values.

**Linux (native or remote VM via SSH)**

Install the PipeOps CLI:

```bash
curl -fsSL https://get.pipeops.dev/cli.sh | bash
```

Then run the agent installer using your token and server name:

```bash
export PIPEOPS_TOKEN="YOUR_GENERATED_TOKEN"
export CLUSTER_NAME="YOUR_SERVER_NAME"
pipeops agent install
```

**Windows (via WSL)**

Open your **Ubuntu or WSL terminal** — not PowerShell — and run:

![WSL terminal open and ready for commands](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/BOYS_Guide_images/opening-wsl-for-byos.png)

```bash
export PIPEOPS_TOKEN="YOUR_GENERATED_TOKEN"
export CLUSTER_NAME="YOUR_SERVER_NAME"
sudo PIPEOPS_TOKEN="$PIPEOPS_TOKEN" CLUSTER_NAME="$CLUSTER_NAME" bash -c "curl -fsSL https://get.pipeops.dev/k8-install.sh | bash"
```

### Step 4: Monitor Installation Progress

After running the commands, your terminal displays the installation progress. PipeOps provisions a K3S environment on your machine automatically.

![Terminal showing agent installation starting](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/BOYS_Guide_images/byos-setup-starting-successfully.png)
![Terminal showing K3S being installed](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/BOYS_Guide_images/connecting-to-pipeops-dashboard.png)
![Terminal showing installation complete](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/BOYS_Guide_images/byos-setup-complete.png)

### Step 5: Confirm Registration

Once the terminal shows a success message, return to the PipeOps dashboard. Your server will show a **Registered** status badge or a success modal. Click **Complete** to view your server details.

![PipeOps dashboard showing the BYOS server with a Registered status badge](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/BOYS_Guide_images/byos-registered-successfully.png)
![BYOS setup complete modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/BOYS_Guide_images/byos-setup-complete-modal.png)
![BYOS Server List Page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/byos-server-list.png)

Your server is now connected and ready for deployments.

### Step 6: Connect a Git Provider and Select a Source

On the project deployment page, select **From Repository** or **From Templates**.

To deploy from a repository, select your Git provider. If your repository is not connected yet, click **Link New Repo** and follow the prompts. Then select or add the organization that owns the repository. If prompted, install the PipeOps Git app to grant access to your repositories.

![Deploy from repository page with Git provider selection](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/onboarding-select-git-provider.png)
![Git organization selection and PipeOps Git app installation prompt](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/onboarding-select-organization.png)

### Step 7: Select a Repository and Branch

Choose the repository you want to deploy, then select the branch PipeOps should build from. Click **Proceed**.

![Repository selection list with search field](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/onboarding-select-repo.png)
![Branch selection page with a selected branch](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/onboarding-select-branch.png)

### Step 8: Review the Project Summary

Before deploying, confirm your project configuration:

- **Project name** — update if needed
- **Deployment environment** — select from your available environments, or create a new one. PipeOps includes Production and Beta by default, but you can create additional environments up to the limit your plan allows
- **Target server** — the BYOS server registered in Step 5
- **CPU and memory** — adjust resource allocation as needed
- **Project source** — verify the correct repository and branch

Click **Proceed** when everything looks correct.

![Project Summary page showing the BYOS server as the target](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/byos-project-summary.png)
![Environment dropdown](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/byos-project-env-dropdown.png)

### Step 9: Configure Build Settings

PipeOps detects your framework and recommends build settings automatically. Review and adjust the following before deploying:

- **Build method and release command**
- **Networking** — enable public access, configure generated or custom domains, or set up TCP proxy settings
- **Environment variables** — add any variables your application requires at runtime

Click **Deploy Project** to start the deployment.

![Project Build Settings page](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/byos-project-build-settings.png)

### Step 10: Monitor the Deployment

Track progress in the deployment pipeline. Build logs and app logs update in real time so you can catch any issues as they happen.

![Deployment pipeline with live build logs](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/onboarding-project-build-logs.png)

### Step 11: Deployment Complete

When the deployment succeeds, PipeOps confirms that your project is live.

![Project Deployed success modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/onboarding/byos-project-success-modal.png)

Your project is now running on your BYOS server. To manage environments, configure custom domains, or set up CI/CD triggers, see the [Project Deployment guide](/docs/projects/project-deployment.md).

## Troubleshooting

**Permission denied errors**
Run the installation commands with `sudo` on Linux and WSL.

**Connection timeouts**
Check that your machine's firewall allows outbound connections to `pipeops.dev`.

For further help, see the [agent documentation](https://agents.pipeops.io).
