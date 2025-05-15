---
sidebar_position: 7
title: Generate GCP JSON credentials
slug: generate-gcp-json-credentials
---

Creating a GCP JSON credentials is required to connect your GCP Account to PipeOps. The followings steps would highlight how to generate the JSON credentials to be securely uploaded on PipeOps platform.

1. [Connect to your GCP console](https://console.cloud.google.com/).

2. Create a new Project or open an existing one

![GCP New Project](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/PipeOpsCreateGCPProject.png)

3. Open the embedded Google shell

![GCP Embedded Shell](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/gcp_shell_1.webp)

4. Run the following command in the Google Shell to create the service account and generate the json key

    
        ```bash
           curl https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/create_credentials_gcp.sh | \
           bash -s -- $GOOGLE_CLOUD_PROJECT pipeops_role pipeops-service-account
        ```
    
       You can modify:
          - the service account name by replacing **pipeops-service-account** by the name of your choice
          - the role name by replacing **pipeops_role** by the role name of your choice
      

5. Once the script is finished, you will see the following message:

        ```
        created key [xxxx] of type [json] as [key.json] for [pipeops-service-account@<your-project.iam.gserviceaccount.com]
        Operations completed. You can now download your json key to upload in PipeOps
        ```
    So you can download it by clicking on the **Download** in the **Cloud Terminal Shell** window.

    ![GCP JSON Credentials Download Step](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/gcp_shell_5.webp)

    And specify the name of the file /your/home/key.json and click on Download.

    ![GCP JSON Credentials Download Path](https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/GCPJSONCredentialsDownload.png)
    
Congratulations you have successfully created your GCP JSON credentials.