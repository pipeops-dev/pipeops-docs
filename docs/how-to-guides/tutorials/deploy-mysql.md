---
slug: how to deploy mysql
title: MySQL Database Deployment and Management on PipeOps!
sidebar_position: 4
---




# MySQL Database Deployment and Management on PipeOps

MySQL is an open-source Relational Database Management System (RDBMS) that organizes data into structured tables of rows and columns. Initially developed by MySQL AB and now owned by Oracle Corporation, MySQL is renowned for its reliability, performance, scalability, and compatibility with various programming languages and frameworks. It is widely used across industries for efficient data storage and retrieval.

## How to Deploy a MySQL Add-on

Follow these steps to deploy a MySQL database on PipeOps:

1. **Login to Your PipeOps Dashboard**
   - Navigate to the "AddOns" menu.

2. **Search and Select MySQL Add-on**
   - Click on AddOns and search for MySQL. Select it from the list: [PipeOps AddOns Store](https://console.pipeops.io/dashboard/addons/store).
   ![addons homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20222914/1-1.png)

3. **Deploy the MySQL Add-on**
   - Click on “Deploy App.”
   ![mysql addon homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20223546/2.png)

4. **Configure Database Environment Variables**
   - Click on “Configure,” set your database environment variables, and save the configurations.
   ![mysql deployment homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20224554/3.png)

   ![setting environment variables](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20224743/4b.png)

5. **Start Deployment**
   - Click on “Deploy” to begin deploying your MySQL instance. It will be ready in a few seconds.
   ![deployment page](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20225130/5.png)

Congratulations! Your MySQL database instance is now deployed. You can access and manage it through the AddOns menu.

## Adminer: A Simple Database Management Tool

Adminer, formerly known as phpMinAdmin, is a powerful database management tool written in PHP. Unlike phpMyAdmin, which requires multiple files and a complex setup, Adminer is a single file that can be easily deployed to your server. It supports a variety of database systems, including MySQL, PostgreSQL, SQLite, MS SQL, Oracle, Firebird, SimpleDB, Elasticsearch, and MongoDB. Its simplicity and versatility make it a popular choice for managing databases across different platforms.

## How to Deploy Adminer Add-on for Connecting to Your DB Instance

Follow these steps to deploy Adminer on PipeOps:

1. **Login to Your PipeOps Dashboard**
   - Navigate to the "AddOns" menu.

2. **Search and Select Adminer Add-on**
   - Click on AddOns and search for Adminer. Select it from the list: [PipeOps AddOns Store](https://console.pipeops.io/dashboard/addons/store).
   ![addons homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20222914/1-1.png)

3. **Deploy the Adminer Add-on**
   - Click on “Deploy App.”
   ![adminer addon homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20225315/7.png)

4. **Configure the Port**
   - Click on “Configure,” leave the default port as 8080, and save.
   ![adminer deployment homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20225906/8.png)

   ![setting environment variables](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20225946/9.png)

5. **Start Deployment**
   - Click on “Deploy.” Your Adminer instance will be ready in a few seconds.
   
6. **Access Adminer**
   - Click on your deployed Adminer app and select “ViewAddon” to see the landing page, which will be used to connect to your DB instance.
   ![deployed adminer homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20230112/10.png)

   ![adminer landing page](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20230453/11-1.png)

## How to Connect to Your DB Instance Using Adminer

1. **Login to Your PipeOps Dashboard**
   - Navigate to the "AddOns" menu.

2. **Access Adminer**
   - Click on AddOns, select your Adminer app, and click on “ViewAddon.”

3. **Get Database Host Information**
   - Navigate to the AddOns menu, select your MySQL DB app, click on the “Overview” tab, and copy the host information.
   ![deployed mysql addon homepage](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20230658/12-1.png)

4. **Enter Database Credentials**
   - On the Adminer landing page, enter the database instance credentials correctly and click on “Login” to connect.
   ![adminer landing page](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20230730/13-1.png)

   ![connected database](https://d23lxlhhocltbo.cloudfront.net/wp-content/uploads/2024/06/20230753/14-1.png)

Congratulations! You have successfully deployed a MySQL DB instance, deployed Adminer, and connected to your DB instance using the Adminer DB client/app.