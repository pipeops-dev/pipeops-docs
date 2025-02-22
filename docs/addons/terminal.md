---
slug: terminal
sidebar_position: 6
title: Terminal
---

# Addon Terminal

Welcome to the guide for PipeOps' Add-on Terminal feature! With the Add-on Terminal, you can access your add-on's command line interface directly. This empowers you to execute commands, manage resources, and streamline workflows effectively. This guide covers the basics of using the terminal, accessing it within your add-on, and working with different terminal types and pods.

## Prerequisites

Before delving into working with the terminal, ensure you have the following prerequisites:

1. **A PipeOps account**. Use the link [here](https://console.pipeops.io/signup) to sign up on PipeOps if you do not currently have an account.
2. **A deployed add-on**. This can be a PipeOps template or a add-on from your Git (Github, Gitlab, Bitbucket) account. You can select a PipeOps template [here](https://github.com/orgs/pipeops-dev/repositories).

## Accessing the Terminal

The terminal is a command line interface that provides users with direct access to the command line interface of their add-ons.

Accessing the terminal in PipeOps is straightforward:

1. Navigate to your add-on's main page in PipeOps.
2. Click on the "**Terminal**" tab to access the add-on terminal dashboard.

![Terminal](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/48/1_692685a378.png)

## Terminal Types and Pods

The terminal in PipeOps offers various command line interface types, such as shell (SH), Bourne Again Shell (BASH), and Almquist Shell (ASH). Users can choose the terminal type that best suits their requirements and familiarity. Additionally, the terminal is associated with specific pods within the add-on's environment, allowing users to execute commands within the context of a particular pod.

![Terminal](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/48/2_716fca11ef.png)

## Working with Commands

Once inside the terminal, users can run a wide range of commands to manage their add-on effectively. Some commonly used commands include:

- **ls**: List directory contents.
- **pwd**: Print the current working directory.
- **df**: Display disk space usage.
- **du**: Estimate file space usage.

Users can execute these commands and more to inspect files, manage directories, monitor resource usage, and perform various administrative tasks within their add-on's environment.

Here's an example of using the terminal in PipeOps to list directory contents (ls) and print the current working directory (pwd)

![Terminal](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/48/3_46645af740.png)

The best part is that the terminal feature includes a convenient selection of commonly used commands, each accompanied by a description of its functionality. This makes it easy for users to find and execute commands, even if they don't remember the exact name. Some of these pre-added commands include **PS, FREE, DU**, and **PRINTENV**, providing users with essential tools for managing their add-ons effectively.

![Terminal](https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/48/1_692685a378.png)

## Benefits of the Terminal Feature

- **Efficient Resource Management**: The terminal provides direct access to add-on resources, allowing users to manage files, directories, and system processes efficiently.
- **Streamlined Workflow**: By executing commands directly within the add-on's environment, users can streamline their workflow and perform tasks without switching between different interfaces or platforms.
- **Enhanced Control**: With access to the command line interface, users have greater control over their add-on's environment, enabling them to troubleshoot issues, install dependencies, and customize configurations as needed.

In summary, the terminal feature in PipeOps offers a powerful interface for managing add-ons, enabling users to execute commands directly within their add-on's environment and streamline their workflow effectively. Whether inspecting files, monitoring resources, or performing administrative tasks, the terminal provides a versatile and efficient tool for add-on management.
