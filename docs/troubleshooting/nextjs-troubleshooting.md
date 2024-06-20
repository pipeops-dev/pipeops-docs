---
sidebar_position: 4
slug: nextjs-deployment-troubleshooting
title: NextJS Deployment Troubleshooting Tips
---

# Common Next.js Deployment Troubleshooting Tips

Deploying a Next.js application can sometimes come with challenges. Here are some common problems and solutions to help you troubleshoot and resolve issues during your Next.js deployment on PipeOps.

## Problem: Firebase Setup Error
**Issue:**
You're trying to host your Next.js app on PipeOps but encounter the following error with Firebase setup:
```
FirebaseAppError: Failed to parse private key: Error: Invalid PEM formatted message.
```
You have tried wrapping the key in the environment file with quotes, but the issue persists. The same app works fine on Vercel.

**Solution:**
For PEM files, proper formatting requires newlines. When storing the key in an environment variable, replace newlines with `\n` to ensure it's correctly parsed by your application. You can do this by adding the following code to your project:

```javascript
process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
```

This code snippet will replace `\n` with actual newlines, allowing the key to be parsed correctly.

## Problem: 503 Service Temporarily Unavailable
**Issue:**
After deploying a Next.js app successfully, you encounter a `503 Service Temporarily Unavailable` error when trying to view the app. The application logs indicate the following error:
```
You are using Node.js 16.16.0. For Next.js, Node.js version >= v18.17.0 is required.
```

**Solution:**
To fix the versioning error, change the framework to "Other (Frontend Framework)" and the build method to "Nixpack." This should resolve the issue by using the appropriate Node.js version required by Next.js.

## Problem: Images Not Visible After Deployment
**Issue:**
After deploying your Next.js project, the images are not visible when you click on the live link.

**Solution:**
This issue can be resolved by installing the `sharp` package in your project. `sharp` is a high-performance image processing library that Next.js uses for optimized image handling. You can install it by running:

```bash
npm install sharp
```

After installing `sharp`, redeploy your project to see the images correctly.

## Additional Tips

### Check Your Environment Configuration
Ensure that all your environment variables are correctly set up. Missing or incorrect environment variables can cause deployment issues.

### Review Deployment Logs
Logs provide detailed information about what went wrong during the deployment process. Access the deployment logs from your PipeOps dashboard and look for error messages or warnings.

### Validate Configuration Files
Incorrect settings in configuration files like `next.config.js` or other build configuration files can cause deployment issues. Validate the syntax and settings in your configuration files.

### Ensure Sufficient Resources
Check the resource usage on your target server. If resources are insufficient, consider upgrading your server plan or optimizing your application to use fewer resources.

### Update Dependencies
Outdated dependencies can cause compatibility issues. Ensure that all dependencies are up-to-date using package managers like npm or yarn.

### Network Connectivity
Ensure that your server has a stable internet connection. Verify that all necessary ports are open.

### Build Scripts
Review your build scripts defined in your `package.json`. Ensure they are correctly defined and functioning as expected.


## Conclusion
Deploying a Next.js application on PipeOps can be straightforward with the right troubleshooting steps. By following these tips and solutions, you'll be better equipped to handle common deployment issues and ensure a smooth deployment process for your projects. Happy deploying!