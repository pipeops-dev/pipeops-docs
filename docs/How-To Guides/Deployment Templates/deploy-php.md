---
slug: deploy-a-php-template
title: How to deploy a PHP application with PipeOps!
sidebar_position: 2
tags: [deployment, guide, php]
---

# Deploying PHP on PipeOps

Deploying your PHP applications on PipeOps is a seamless process, thanks to its robust support. In this guide, you'll discover just how easy it is to deploy your PHP project.

## Getting Started

For a quick and hassle-free start, clone our pre-built PHP template from [here](https://github.com/pipeops-dev/pipeops-php). This template includes a Dockerfile that will be used during deployment. If you already have a project to deploy, create a Dockerfile and copy relevant information from our PHP template Dockerfile into your project's Dockerfile.

Here's an example Dockerfile based on our PHP template:

```dockerfile
# Use an official PHP runtime as the base image
FROM php:7.4-apache
# Set the working directory in the container
WORKDIR /var/www/html
# Copy the application code to the container
COPY . /var/www/html
# Install any necessary PHP extensions or dependencies
RUN apt-get update && \
    apt-get install -y \
        # Add any additional dependencies here
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && a2enmod rewrite
# Expose port 80 for the Apache web server
EXPOSE 80
# Define environment variables if needed
# ENV MY_ENV_VAR=value
# Start the Apache web server
CMD ["apache2-foreground"]
```

## Deploy Your Project

Assuming you have completed our [get started guide](/docs/User%20Guides/For%20Developers/dev-account-setup), but if not, proceed to connect your PipeOps account to your preferred git provider and select your project. In the image below, you'll find the necessary configurations for your Django project. After completing these configurations, click on the "Deploy Project" button to initiate the deployment.

![2.png](https://docs.pipeops.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnodejs.fad7dd92.png&w=1200&q=75)

![2.png](https://res.cloudinary.com/djhh4kkml/image/upload/v1678875019/Pipeops/image_5_bhabno.png)

**👍 Awesome!**

Congratulations! Your PHP project is now successfully deployed.
