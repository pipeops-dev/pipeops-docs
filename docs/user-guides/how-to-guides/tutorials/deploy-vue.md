---
slug: how to deploy a VueJs application
title: How to deploy a VueJs application with PipeOps!
authors:
  - name: Kingsley Ohaneme
    title: Technical writer
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
tags: [deployment, guide, reactjs]
sidebar_position: 2
---

# How to deploy a vuejs application | PipeOps

In our fast-paced digital age, where user satisfaction is paramount, Vue.js and Node.js emerge as cornerstones of innovation, driving the dynamic web applications of the future. Vue.js, known for its graceful simplicity, and Node.js, prized for its powerful server-side features, synergize to create a compelling blend. Developers across the globe are embracing this potent alliance to craft web applications that transcend mere functionality, delivering an experience that is both seamless and enjoyable for users. In this hands-on guide, we will walk you through the process of deploying a VueJs application effortlessly and swiftly using PipeOps.

## Prerequisites:

- Good understanding of VueJs framework and web development concepts.
- [Navigate to your PipeOps dashboard](https://console.pipeops.io/dashboard/projects).

### Step 1: Connect To Your React Project

1. On your dashboard, under the "My projects" tab, click on the "Deploy a new Project" button and select "Web project."

![2.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/fd612bd8-eca6-4a8f-94b9-1c18fc70c77d/2.png)

1. Select "Linked repository", then select the "Select repo source" drop-down. Choose the repo you will use for the project. If you would like to use a different repository, click on "Link new repo" and select from any of the repo providers.
2. Select your repo organization from the "Select organization" drop down.
3. Select your source repository, and the branch you would like to deploy. In my example, [Ohansck/vue-port-2](https://github.com/ohansck/vue-port-2) and the main branch. Click on proceed.

![vue-4.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/cd5d1624-c226-46a7-86c3-5bd82bf1f4a3/vue-4.png)

### Step 2: Configure Your Project

1. Your project has been created, and your summary dashboard is shown to you. It contains your project name and environment, server, project repository, project source and cost. Leave as default and click proceed.

![vue-5.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/f5bc02e2-bc4b-4901-9a69-f990d7783d6a/vue-5.png)

1. Your project build settings dashboard is now shown to you. In the build settings > framework dropdown, select VueJs
2. Your build method dropdown is automatically set to 'NodeJs (Static frontend) Recommended'. If it is not, please select it as your build framework.
3. Enter your custom application build command. Use the default if your application builds with 

```bash
npm run build
```

1. Use the default “/dist” build path. However, if your application uses a custom build path, enter your build path.
2. If applicable, enter your application's life cycle release command.
3. Review your configuration settings.

![vue-6.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/d673ef35-0191-414d-9b0f-8b893fc941d6/vue-6.png)

### Step 3: Deploy Your VueJs Application

1. Click deploy.
2. Monitor the logs on the build logs section. After a successful build, click on the "View project" button to view your successfully deployed application.

![Screenshot (677).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/88509808-71af-4990-878e-270db863333f/Screenshot_(677).png)

### Step 4: Celebrate Your Swift Deployment!

Congratulations! You have successfully deployed your VueJs application using PipeOps.

![Screenshot (678).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/fbe600a0-4683-4524-9b94-2cc6fde41ed5/Screenshot_(678).png)

![Screenshot (679).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/f8b97440-88a1-4fdb-8b14-d31ef8af627b/Screenshot_(679).png)

![Screenshot (680).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/477b48f6-2ecc-4458-98c5-9ccc2c2c4430/aec5c3f4-d83f-4dc1-bb80-af0dfdefe0c8/Screenshot_(680).png)

## Why Choose PipeOps for React Deployment?

- **Effortless Deployment:** PipeOps' no-code approach means you don't have to write complex deployment scripts or spend hours configuring settings. Deploying React applications is as simple as a few clicks.
- **Real-Time Feedback:** Instantly preview and debug your application within PipeOps' platform. Identify issues and make corrections on the spot, ensuring a smooth user experience.
- **Scalability and Reliability:** PipeOps' robust infrastructure ensures your deployed applications are scalable, reliable, and performant, regardless of user traffic.
- **Framework Flexibility:** PipeOps supports a wide range of React frameworks, ensuring compatibility with your preferred tools and libraries. Whether you're using React Native for mobile apps or Next.js for server-side rendering, PipeOps handles it all.
- **Time and Cost Efficiency:** By simplifying the deployment process and providing real-time feedback, PipeOps saves you valuable time and resources. You can iterate quickly, leading to higher-quality deployments without the need for extensive manual intervention.

## Ready to Transform Your Deployment Experience?

PipeOps empowers developers to focus on what they do best - building exceptional VueJs applications. With PipeOps, you can deploy faster, iterate quicker, and deliver outstanding user experiences without deployment headaches.

Don't miss out on the future of VueJs deployment. [Deploy your VueJs application for free](https://console.pipeops.io/auth/signin) today, faster and more efficiently than ever before.