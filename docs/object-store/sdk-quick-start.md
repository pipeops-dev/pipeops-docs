---
sidebar_position: 3
title: SDK Quick Start
description: "Mint an Object Store access key and upload objects with AWS SDKs (JavaScript, Python, Go) and the AWS CLI."
---

# Object Store SDK Quick Start

**~10 minutes** to create a bucket, mint an access key, and upload an object with a standard **AWS S3 SDK**.

Object Store speaks **S3**. There is no separate PipeOps object SDK—use AWS clients pointed at the PipeOps S3 endpoint.

| | |
|--|--|
| **S3 endpoint** | From status / create-key response (typically `https://objects.pipeops.run`) |
| **Region** | Always `auto` |
| **Addressing** | Virtual-hosted (`https://{bucket}.objects.pipeops.run/...`) |
| **Credentials** | Access key ID + secret from [Create access key](./api-reference.md#create-access-key) |
| **Management API** | [API Reference](./api-reference.md) |

---

## 1. Prerequisites

1. Object Store enabled for your workspace (Feature Preview / early access as required).  
2. PipeOps API token (JWT) to call the management API.  
3. Workspace UUID (`WS`). Team members also need `team_uuid`.

```bash
export API=https://api.pipeops.io/api/v1
export TOKEN=...   # PipeOps JWT
export WS=...      # workspace UUID
# export TEAM=...  # if you are a team member

AUTH=(-H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")
QS=""; [ -n "${TEAM:-}" ] && QS="?team_uuid=$TEAM"
```

---

## 2. Create a bucket

```bash
curl -sS "${AUTH[@]}" -X POST "$API/workspace/$WS/object-store/buckets$QS" \
  -d '{"name":"demo-assets"}' | jq .
```

Bucket names: lowercase alphanumeric + hyphens, 3–63 characters, globally unique.

---

## 3. Mint an access key

### All buckets (default)

```bash
curl -sS "${AUTH[@]}" -X POST "$API/workspace/$WS/object-store/keys$QS" \
  -d '{"label":"sdk-demo","permissions":["read","write"]}' | jq .
```

### Scoped to one bucket

```bash
curl -sS "${AUTH[@]}" -X POST "$API/workspace/$WS/object-store/keys$QS" \
  -d '{
    "label": "sdk-demo",
    "permissions": ["read", "write"],
    "buckets": ["demo-assets"]
  }' | jq .
```

Save from the response:

```bash
export AWS_ACCESS_KEY_ID=tid_...
export AWS_SECRET_ACCESS_KEY=tsec_...
export S3_ENDPOINT=https://objects.pipeops.run   # or data.s3_endpoint from the response
export BUCKET=demo-assets
export AWS_REGION=auto
```

:::warning Secret once
`secretAccessKey` is only returned at create time. Store it in your secret manager; revoke and recreate if lost.
:::

Confirm endpoint from status anytime:

```bash
curl -sS "${AUTH[@]}" "$API/workspace/$WS/object-store$QS" | jq '.data.s3_endpoint'
```

---

## 4. AWS CLI

```bash
aws configure set default.s3.addressing_style virtual

aws s3 ls "s3://$BUCKET" --endpoint-url "$S3_ENDPOINT" --region auto

echo 'hello from pipeops' > /tmp/hello.txt
aws s3 cp /tmp/hello.txt "s3://$BUCKET/hello.txt" \
  --endpoint-url "$S3_ENDPOINT" --region auto

aws s3 cp "s3://$BUCKET/hello.txt" - \
  --endpoint-url "$S3_ENDPOINT" --region auto
```

---

## 5. JavaScript / TypeScript (AWS SDK v3)

```bash
npm install @aws-sdk/client-s3
```

```javascript
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT, // https://objects.pipeops.run
  forcePathStyle: false, // virtual-hosted (required)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const Bucket = process.env.BUCKET;

await client.send(
  new PutObjectCommand({
    Bucket,
    Key: 'hello.txt',
    Body: Buffer.from('hello from pipeops'),
    ContentType: 'text/plain',
  })
);

const listed = await client.send(
  new ListObjectsV2Command({ Bucket, Prefix: '', Delimiter: '/' })
);
console.log(listed.Contents?.map((o) => o.Key));

const got = await client.send(
  new GetObjectCommand({ Bucket, Key: 'hello.txt' })
);
console.log(await got.Body.transformToString());
```

### Presigned upload (browser-friendly)

```bash
npm install @aws-sdk/s3-request-presigner
```

```javascript
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const url = await getSignedUrl(
  client,
  new PutObjectCommand({ Bucket, Key: 'uploads/photo.png' }),
  { expiresIn: 3600 }
);
// Browser: fetch(url, { method: 'PUT', body: file })
```

For console-driven uploads that must never expose raw storage hosts, the management API also returns PipeOps-hosted upload URLs (`POST .../objects/presign`). Prefer direct S3/presigns for apps when CORS allows.

---

## 6. Python (boto3)

```bash
pip install boto3
```

```python
import os
import boto3

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["S3_ENDPOINT"],
    region_name="auto",
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
)

bucket = os.environ["BUCKET"]

s3.put_object(
    Bucket=bucket,
    Key="hello.txt",
    Body=b"hello from pipeops",
    ContentType="text/plain",
)

for obj in s3.list_objects_v2(Bucket=bucket).get("Contents", []):
    print(obj["Key"])

print(s3.get_object(Bucket=bucket, Key="hello.txt")["Body"].read().decode())
```

### Presigned PUT

```python
url = s3.generate_presigned_url(
    "put_object",
    Params={"Bucket": bucket, "Key": "uploads/photo.png"},
    ExpiresIn=3600,
)
print(url)
```

---

## 7. Go (AWS SDK v2)

```bash
go get github.com/aws/aws-sdk-go-v2/aws
go get github.com/aws/aws-sdk-go-v2/credentials
go get github.com/aws/aws-sdk-go-v2/service/s3
```

```go
package main

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
	cfg := aws.Config{
		Region: "auto",
		Credentials: credentials.NewStaticCredentialsProvider(
			os.Getenv("AWS_ACCESS_KEY_ID"),
			os.Getenv("AWS_SECRET_ACCESS_KEY"),
			"",
		),
	}
	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(os.Getenv("S3_ENDPOINT"))
		o.UsePathStyle = false
	})

	bucket := os.Getenv("BUCKET")
	ctx := context.Background()

	_, err := client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String("hello.txt"),
		Body:        strings.NewReader("hello from pipeops"),
		ContentType: aws.String("text/plain"),
	})
	if err != nil {
		panic(err)
	}

	out, err := client.ListObjectsV2(ctx, &s3.ListObjectsV2Input{
		Bucket: aws.String(bucket),
	})
	if err != nil {
		panic(err)
	}
	for _, obj := range out.Contents {
		fmt.Println(aws.ToString(obj.Key))
	}
}
```

---

## 8. Multipart uploads

For large files, use the SDK’s multipart helpers (AWS CLI `aws s3 cp` does this automatically). Keep:

- `endpoint` = Object Store S3 endpoint  
- `region` = `auto`  
- `forcePathStyle` / path-style = **false**  

Do **not** append PipeOps `team_uuid` or Bearer tokens to signed S3 URLs—that breaks signatures.

---

## 9. Public / CDN URLs

After upload, public objects (when the bucket allows) are typically available at:

```text
https://{bucket}.objects.pipeops.run/{key}
```

Custom domains can be attached per bucket via the [management API](./api-reference.md#custom-domain-per-bucket). Use `https://objects.pipeops.run` as the S3 endpoint for authenticated SDK traffic (virtual-hosted: `https://{bucket}.objects.pipeops.run`).

---

## 10. Revoke a key

```bash
curl -sS "${AUTH[@]}" -X DELETE "$API/workspace/$WS/object-store/keys$QS" \
  -d "{\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\"}" | jq .
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `SignatureDoesNotMatch` / network error on PUT | Use region `auto`, virtual-hosted style, and do not add extra query params to signed URLs |
| `403` / `AccessDenied` on one bucket | Key may be scoped to other buckets—mint a new key with the right `buckets` list or omit `buckets` for `*` |
| `404` on management API as a team member | Pass `team_uuid` |
| `409` / tenant not provisioned | Create a bucket first, then mint keys |
| CORS failure in browser | Prefer management presign proxy, or configure bucket CORS / use server-side uploads |

---

## Related

- [What is Object Store?](./overview.md)  
- [API Reference](./api-reference.md)  
