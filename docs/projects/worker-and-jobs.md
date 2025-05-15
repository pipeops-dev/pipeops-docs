---
sidebar_position: 12
slug: worker-and-jobs
title: Worker And Jobs
---

# Worker and Jobs

This guide provides detailed instructions on how to navigate the Worker and Jobs functionalities within PipeOps. These features help you efficiently manage background processes and scheduled tasks for your project. 



## Accessing Worker
To access Worker:

- Navigate to your project's main page in PipeOps.
- Click on the "Worker" tab to access its dashboard.

The Worker section in PipeOps allows users to define and manage background processes or tasks. Workers are useful for running asynchronous jobs, scheduled tasks, or any other type of processing that doesn’t require direct user interaction.

### Setting Up a Worker
If no workers are available, you’ll see a message “No workers are available yet.” 
1. Click the **+ New Worker** button.

![New Worker](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-add-worker.png)

2. A modal appears where you can customize the following:
    - Run Command: The command to be executed by the worker.
    - Replicas: The number of instances of the worker to run concurrently.
    - Memory: The amount of memory allocated to each worker instance.
    - CPU: The number of CPU cores allocated to each worker instance.


![Worker Modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-add-worker-modal.png)

3. Click the **Create** button to deploy your worker.


## Accessing Jobs
To access Jobs:

- Navigate to your project's main page in PipeOps.
- Click on the "Jobs" tab to access its dashboard.

The Jobs section in PipeOps allows users to schedule and manage recurring tasks or processes within their projects. Jobs are useful for automating routine operations, running maintenance tasks, or triggering processes at specific intervals.

### Scheduling Jobs
If no Jobs have been created yet, you’ll see a message “No Jobs are available yet.” 
1. Click the **+ New Job** button.

![New Job](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-add-job.png)


2. A modal appears where you can configure the following:

- **Command:** The command to be executed by the job.

- **Timezone:** Select the timezone for the job schedule.

- **Schedule:** Define the job schedule using either:

    1. Cron syntax. The format is minute, hour, day of month, month, and day of week. For example: 30 5 * * 1,6 to run at 5:30 AM on Mondays and Saturdays.

    2.  A user-friendly interface to set recurring schedules on specific days and times.

 - **Allocation:** Configure resource allocation for the job, including VCPU and Memory.


 
![Job Modal](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/Documentation%20Images/project-add-job-modal.png)


3. Click the **Create** button to deploy your job.

In summary, Workers handle background processing, enabling you to execute tasks asynchronously and independently from the main application. Jobs, on the other hand, are designed for scheduling recurring operations, ensuring consistent and timely execution of routine processes. Both workers and jobs can be created and customized with specific configurations in PipeOps. By  utilizing Workers and Jobs, you can streamline project workflows and automate processes.