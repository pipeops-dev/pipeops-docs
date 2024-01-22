---
slug: deploy-a-django-template
title: How to deploy a Django application with PipeOps!
sidebar_position: 1
tags: [deployment, guide, django]
---

# Deploying Django on PipeOps

Deploying your Django applications on PipeOps is a seamless process, thanks to its robust support. In this guide, you'll discover just how easy it is to deploy your Django project.

## Getting Started

For a quick and hassle-free start, you can clone our pre-built Django template from [here](https://github.com/pipeops-dev/pipeops-django). This template comes with a Dockerfile that will be utilized during deployment. If you already have a project to deploy, create a Dockerfile and copy the relevant information from our Django template Dockerfile into your project's Dockerfile.

Here's an example Dockerfile based on our Django template:

```dockerfile
# Set the base image to Python 3.9
FROM python:3.11.0
# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
# Set the working directory to /app
WORKDIR /app
# Copy the requirements file into the container and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the application code into the container
COPY . .
# Run database migrations
RUN python manage.py migrate
# Expose port 8000 for the Django application
EXPOSE 8000
# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## Deploy Your Project

Assuming you have completed our [get started guide](/docs/User%20Guides/For%20Developers/dev-account-setup), but if not, proceed to connect your PipeOps account to your preferred git provider and select your project. In the image below, you'll find the necessary configurations for your Django project. After completing these configurations, click on the "Deploy Project" button to initiate the deployment.

![2.png](https://res.cloudinary.com/djhh4kkml/image/upload/v1678874959/Pipeops/django_u8mv1l.png)

![2.png](https://res.cloudinary.com/djhh4kkml/image/upload/v1678875019/Pipeops/image_5_bhabno.png)

**👍 Awesome!**

Congratulations! Your Django project is now successfully deployed.
