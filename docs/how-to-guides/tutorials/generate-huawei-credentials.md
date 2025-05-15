---
sidebar_position: 8
title: Generate Huawei credentials
slug: generate-huawei-credentials
---

Creating a Huwei credentials is required to connect your Huawei Account to PipeOps. The followings steps would highlight how to generate the credentials to be securely added on PipeOps platform.

1. [Connect to your Huawei console](https://console-intl.huaweicloud.com).

2. Create a new IAM User by clicking on the "Create User" button by the top right of the page.

![Huawei New IAM User](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/CreateHuaweiIAMUser.png)

3. Provide a unique **username** e.g PipeOpsIAMUser and ensure the followings
    - Allow "Access Type" to be **__Programmatic access__**
    - Enable  "Management console access"
    - Credential Type should be enabled to use **__Access key__**
    - Login Protection enabled

![Set Huawei IAM User Details](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/SetHuaweiIAMUserDetails.png)

Click on the "Next" button at the bottom right of the page.

4. Select the check box for admin "Full permissions" and click the "Create" button at the bottom right of the page.

![Set Huawei IAM User Permission](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/HuaweiIAMPermission.png)


5. Ensure you download the created credentials which is a CSV file, by clicking the "OK" button first and "Download" button . The CSV contains your "User Name", "Access Key Id" and "Secret Access Key".

![Set Huawei IAM User Permission](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/HuaweiCredentialsDownload.png)

Congratulations you have successfully created your Huawei credentials.