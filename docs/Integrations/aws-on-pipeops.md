---
slug: aws-on-pipeops
sidebar_position: 1
title: Connect AWS to PipeOps
---

note: this is an excerpt from former server provisioning page
proceed to connect your AWS account

If you have connected your AWS account to PipeOps already, skip to [step 6](/docs/servers/server-provisioning#step-6-configure-your-server) of this guide otherwise proceed to select your cloud provider.

![Connect AWS](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/connect_AWS_fb14c2f4c4.png)

Select **AWS** as your cloud provider (integration to more cloud providers coming soon).

### Step 3: Enter AWS ID

1. In the AWS section, enter your AWS account ID.
2. Click **Add** to proceed with the account verification process.

![AWS ID](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/connect_AWSID_3ad56c1473.png)

### Step 4: Authorize IAM

1. Once your account ID is verified, click on the **Authorize IAM** button.
2. This action redirects you to AWS CloudFormation on your AWS account to create a stack.
3. The stack created by AWS CloudFormation includes an IAM role that allows us to create servers and other necessary infrastructure on your behalf.

![AWS CloudFormation](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/stack_Created_78b52004e0.png)

### Step 5: Account Verification

1. Wait for the CloudFormation stack creation to complete.
2. Once the process is done, you'll see an "Account Connected" sign on your dashboard. You can then click on **Proceed** to continue with your server creation process.

![Account Connected](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/29/aws_Connected_c23029cc2c.png)