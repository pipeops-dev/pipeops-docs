---
slug: project-history
sidebar_position: 3
title: Project History
description: "View deployment history records in PipeOps including build SHA, commit SHA, build duration, deployment status, and timestamps."
---

# Project History

The **History** tab gives you a full record of all deployments made to your project. Use it to track what was deployed, when, by whom, and whether it succeeded.

## Accessing Project History

Navigate to your project and click the **History** tab. The **Deployment History** table lists all past deployments in reverse chronological order, with pagination at the bottom for navigating older records.

![Project History](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-deployment/project-history.png)

## Deployment History Table

Each row in the table represents a single deployment and includes the following columns:

| Column             | Description                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Build SHA**      | A unique identifier for the build artefact used in the deployment. Click the external link icon to view more details. |
| **Commit SHA**     | The Git commit that triggered the deployment, linking the build to a specific code change.                            |
| **URL**            | The public URL associated with the deployment, if available. Displays `N/A` if no URL is configured.                  |
| **Author**         | The user or action that triggered the deployment (e.g. a username or `Redeployment`).                                 |
| **Build Duration** | How long the build took to complete (e.g. `3m 54s`).                                                                  |
| **Created At**     | When the deployment was created.                                                                                      |
| **Status**         | The outcome of the deployment. See possible values below.                                                             |

## Deployment Statuses

| Status        | Description                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Deployed**  | The deployment completed successfully and is live.                                                                             |
| **Failed**    | The deployment encountered an error and did not complete. Check the [Logs](/docs/projects/logs-and-events.md) tab for details. |
| **Cancelled** | The deployment was cancelled before it could complete.                                                                         |

## Rolling Back a Deployment

Deployments with a **Deployed** status may show a **Rollback** button alongside their status. Click it to revert your project to that specific deployment version. For a full walkthrough, see the [Rollback guide](/docs/projects/rollback).
