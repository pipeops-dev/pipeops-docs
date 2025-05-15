---
sidebar_position: 13
slug: understanding-project-states
title: Understanding Project States
---

# Understanding Project States in PipeOps

Your PipeOps projects can exist in a variety of system states, such as **Running**, **Paused**, **Deploying,** and more. These states reflect the current status of your project’s lifecycle — from initial creation to deployment, maintenance, or failure.

**Note**: While this section focuses on project states, many of the definitions below also apply to servers on PipeOps.


## Deployment States

These states indicate the lifecycle of your application or server from creation to active execution.

- **Creating** – The project is in the process of being created.
- **Deploying** – The project is being deployed and is not yet operational.
- **Updating** – The project is undergoing updates, which may affect availability.
- **Running** – The project is actively running and operational.
- **Active** – Similar to "Running," indicating full functionality.
- **Deployed** – The deployment process has been completed successfully.


## Paused & Inactive States
These states indicate that the project is not currently running but has not encountered a failure.

- **Paused** – The project has been intentionally paused by the user.
- **Inactive** – The project is in a dormant state but not deleted.
- **Deactivated** – The project has been turned off but can be reactivated.


## Error & Failure States
These states indicate issues that require user intervention.

- **Failed** – The project failed to deploy or encountered a critical issue.
- **Crashed** – The project stopped running unexpectedly.
- **OutOfMemory** – The project ran out of available memory.
- **Maxed_Out** – The allocated resources (such as CPU or memory) have been exceeded, potentially affecting performance or stability.


## Deletion States
These states indicate user-initiated actions to remove or stop a project.

- **Cancelled** – The project has been successfully canceled.
- **Deleting** – The project is being deleted and will no longer be available.


## Success States
These confirm that a project or server has completed an action successfully.
- **Successful** – The project or server has completed deployment without issues.


## Restricted & Special States
- **Cordorned** – New changes cannot be made to your project or server.
- **Degraded** – This shows the last or recent deployment has issues and might affect your current running project.


### How to Use States for Monitoring
- Regularly check the state of your applications on the dashboard to ensure smooth operations.

- Investigate error states such as "Out of Memory" or "Crashed" by accessing logs via the [Logs](/docs/projects/logs-and-events.md) tab for troubleshooting.

- Use action states like "Updating" or "Deleting" to track ongoing processes and avoid interruptions.

## Conclusion
Understanding these states allows you to effectively monitor your applications and servers on PipeOps, ensuring timely responses to issues and maintaining optimal performance.