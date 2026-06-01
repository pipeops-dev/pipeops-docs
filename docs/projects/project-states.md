---
sidebar_position: 13
slug: understanding-project-states
title: Understanding Project States
description: "Reference guide for all PipeOps project lifecycle states including deployment, paused, error, and pending states."
---

# Understanding Project States

PipeOps projects can exist in a variety of states that reflect where they are in their lifecycle — from initial creation through active deployment, maintenance, and failure recovery.

:::note
While this page focuses on project states, most of the states described below also apply to servers on PipeOps.
:::

## Deployment States

States that reflect the lifecycle of your project from creation to active execution.

| State         | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| **Creating**  | The project is being created and is not yet ready.                      |
| **Deploying** | A deployment is in progress. The project is not yet operational.        |
| **Updating**  | The project is being updated. Availability may be temporarily affected. |
| **Deployed**  | The deployment completed successfully.                                  |
| **Running**   | The project is active and fully operational.                            |
| **Active**    | The project is fully functional. Equivalent to Running.                 |

## Paused & Inactive States

States indicating the project is not running but has not encountered a failure.

| State           | Description                                             |
| --------------- | ------------------------------------------------------- |
| **Paused**      | The project was intentionally paused by the user.       |
| **Inactive**    | The project is dormant but has not been deleted.        |
| **Deactivated** | The project has been turned off but can be reactivated. |

## Error & Failure States

States that indicate an issue requiring your attention.

| State             | Description                                                                                                                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Failed**        | The project failed to deploy or encountered a critical error.                                                                                                                                                                                                               |
| **Crashed**       | The project stopped running unexpectedly. PipeOps will typically attempt to recover a crashed project automatically — however, the status may take some time to reflect the latest state. Check your project directly to confirm whether it has recovered or is still down. |
| **OutOfMemory**   | The project ran out of available memory.                                                                                                                                                                                                                                    |
| **Maxed Out**     | Allocated resources such as CPU or memory have been exceeded, which may affect performance or stability.                                                                                                                                                                    |
| **Unschedulable** | The workload cannot be assigned to any available node due to resource constraints or configuration issues. The deployment is blocked. Contact [support](mailto:support@pipeops.io) to resolve this.                                                                         |

Check the [Logs](/docs/projects/logs-and-events.md) tab for details when investigating any of the above states.

## Deletion States

| State         | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **Deleting**  | The project is being removed and will no longer be available once complete.                     |
| **Cancelled** | A specific deployment was cancelled and did not complete. The project itself remains available. |

## Success States

| State          | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| **Successful** | The project or server completed its last action without issues. |

## Restricted & Special States

| State        | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| **Cordoned** | New changes cannot be made to the project or server.                                 |
| **Degraded** | The most recent deployment has issues that may affect the currently running project. |
