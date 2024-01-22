---
sidebar_position: 2
slug: Kubernetes Cluster Upgrade to Version 1.24
title: Kubernetes Cluster Upgrade to Version 1.24
tags: [deployment, guide, reactjs]
---

# Pipeops Platform Update: Kubernetes Cluster Upgrade to Version 1.24 - Technical Changelogs

## **Kubernetes 1.24: Stargazer**

![](https://d33wubrfki0l68.cloudfront.net/d818eb4633bfbaf36c89d3c776e1d3817c66c361/f3082/images/blog/2022-05-03-kubernetes-release-1.24/kubernetes-1.24.png)

## Some Key Highlights of Kubernetes 1.24

### **1. New Beta APIs Management**

In this version, new beta APIs aren’t enabled in clusters by default. But don’t worry, your existing beta APIs and newer versions of existing beta APIs will continue to work seamlessly. We’ve aligned our behavior with the best practices of Kubernetes, ensuring a stable environment while giving you the freedom to embrace new features at your pace.

### **2. Dockershim Removal: Embracing Containerd**

Kubernetes 1.24 bids farewell to Dockershim (Container Runtime Interface for Docker). Our official Amazon EKS AMIs now exclusively use containerd as runtime. For your smooth transition, it’s essential to remove unsupported bootstrap script flags and ensure IP forwarding on your worker nodes. This upgrade marks a step toward enhanced performance and security.

### **3. Fluentd to Fluent Bit Migration**

If you're using Fluentd for Container Insights, it’s time to migrate to Fluent Bit before the update. Fluentd parsers are now tailored to JSON log messages, while containerd produces logs in a different format. Don’t worry; we have a straightforward migration guide to ensure your logs continue to flow seamlessly.

### **4. Certificate Signing Changes**

In version 1.24, kubelet serving certificates are more secure. Certificates won’t be issued if any Subject Alternative Name (SAN) can't be verified. While this boosts security, it means you need to check your configurations, especially if you rely on unverifiable SANs. Rest assured, this change ensures a robust and secure environment for your applications.

### **5. Fluent Bit Version Compatibility**

If you’re running Fluent Bit in your Amazon EKS 1.23 cluster, make sure it's k8s/1.3.12 or later. Updating the Fluent Bit YAML file from GitHub ensures compatibility, ensuring your logs are seamlessly transferred during the upgrade process.

For the complete Kubernetes 1.24 changelog, see https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#changelog-since-v1230.

[Release notes for standard support versions - Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions-standard.html)

Thank you for choosing Pipeops Platform. Your no-code and hassle-free deployment platform!