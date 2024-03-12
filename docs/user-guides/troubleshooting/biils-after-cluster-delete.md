---
sidebar_position: 3
slug: bills-post-cluster-delete
title: Resolving AWS Bills Post PipeOps Cluster Deletion
---

# Resolving AWS Bills Post PipeOps Cluster Deletion

After deleting a cluster in PipeOps, some users have reported unexpected AWS bills due to lingering resources. This guide outlines the steps to identify and effectively resolve these billing issues. By following this guide, you can ensure that all associated resources are appropriately terminated to prevent further charges.

## Step 1: Understand the Issue

When you delete a cluster in PipeOps, it ideally removes all associated resources like EC2 instances, load balancers, and EBS volumes. However, in certain scenarios, disconnecting your AWS account from PipeOps before deleting your cluster may prevent automatic deletion of resources, potentially resulting in ongoing AWS charges.

## Step 2: Access the AWS Management Console

To address the issue, start by accessing the AWS Management Console using your AWS account credentials.

## Step 3: Review Running Resources

Once in the AWS Management Console, navigate to the EC2 dashboard or the specific service dashboards where your cluster resources were provisioned. Check for any running resources that should have been terminated along with your PipeOps cluster.

## Step 4: Terminate Lingering Resources

Identify the resources that are still running and should have been deleted with your cluster. These resources might include EC2 instances, load balancers, security groups, and EBS volumes. Follow these steps to terminate them:

a. Select the resource(s) you want to terminate.

b. Click the "Actions" button.

c. Choose "Terminate" from the dropdown menu.

d. Confirm the termination.

Repeat this process for all resources that are no longer needed. Be cautious when terminating resources, as this action is irreversible, and data may be lost.

## Step 5: Review and Monitor

After terminating lingering resources, regularly review your AWS account billing details to ensure no unexpected charges. Continue to monitor your AWS resources to prevent similar issues in the future.

## Step 6: Preventive Measures

To prevent unexpected AWS bills after deleting a PipeOps cluster in the future, avoid disconnecting your AWS account from PipeOps before attempting to delete your active cluster.

**👍 Congratulations!**

You have successfully resolved the issue of AWS bills after deleting a PipeOps cluster and learned how to prevent similar occurrences in the future.
