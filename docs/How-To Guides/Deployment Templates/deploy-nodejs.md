---
slug: deploy-a-nodejs-template
title: How to deploy a Django application with PipeOps!
sidebar_position: 3
tags: [deployment, guide, nodejs]
---

# Deploying Node.js on PipeOps

Deploying your Node.js applications on PipeOps is a breeze, thanks to its robust support. In this guide, you'll discover just how easy it is to deploy your Node.js project.

## Getting Started

For a quick and hassle-free start, you can clone our pre-built Node.js template from [here](https://github.com/pipeops-dev/pipeops-nodejs). This template comes with a Dockerfile that will be utilized during deployment. If you already have a project to deploy, create a Dockerfile and copy the relevant information from our Node.js template Dockerfile into your project's Dockerfile.

Here's an example Dockerfile based on our Node.js template:

```dockerfile
FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
```

## Deploy Your Project

Assuming you have completed our [get started guide](/docs/User%20Guides/For%20Developers/dev-account-setup), but if not, proceed to connect your PipeOps account to your preferred git provider and select your project. In the image below, you'll find the necessary configurations for your Django project. After completing these configurations, click on the "Deploy Project" button to initiate the deployment.

![2.png](https://res.cloudinary.com/djhh4kkml/image/upload/v1678874959/Pipeops/django_u8mv1l.png)

![2.png](https://res.cloudinary.com/djhh4kkml/image/upload/v1678875019/Pipeops/image_5_bhabno.png)

**👍 Awesome!**

Congratulations! Your NodeJs project is now successfully deployed.
