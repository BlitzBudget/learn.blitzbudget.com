# Chapter 2: Setting Up AWS Account and CLI

## Introduction

Before we can start building and deploying serverless applications with Node.js on AWS, we need to set up an AWS account and install the AWS Command Line Interface (CLI). In this chapter, we'll guide you through the process of creating an AWS account and configuring the CLI to interact with AWS services from the command line.

## Creating an AWS Account

If you don't already have an AWS account, you can sign up for a free account on the AWS website (https://aws.amazon.com/). Click on the "Create a Free Account" button, and you'll be guided through the registration process.

During the account creation, you'll need to provide your email address, password, payment information, and other necessary details. Once your account is set up, you'll have access to the AWS Management Console, where you can manage your resources and services.

## Installing the AWS CLI

The AWS Command Line Interface (CLI) allows you to interact with AWS services from the command line. It provides a unified interface for managing AWS resources, and it's an essential tool for serverless development on AWS.

To install the AWS CLI, follow these steps:

### 1. Install Node.js and npm

The AWS CLI is built using Node.js, so you'll need to have Node.js and npm (Node Package Manager) installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

### 2. Install the AWS CLI

Once Node.js and npm are installed, open your terminal or command prompt and run the following command to install the AWS CLI:

```bash
npm install -g aws-cli
```

This will install the AWS CLI globally on your system, allowing you to access it from any directory.

### 3. Configure the AWS CLI

After the installation is complete, you need to configure the AWS CLI with your AWS credentials. This will allow the CLI to authenticate your requests and interact with AWS services on your behalf.

Run the following command to configure the AWS CLI:

```bash
aws configure
```

You'll be prompted to provide your AWS Access Key ID, Secret Access Key, default region, and default output format. You can find your Access Key ID and Secret Access Key in the AWS Management Console under "My Security Credentials" in the "Identity and Access Management (IAM)" service.

### 4. Verify the Configuration

To verify that the AWS CLI is configured correctly, run the following command:

```bash
aws sts get-caller-identity
```

If everything is set up correctly, you should see the details of your AWS account, including the account ID and the IAM user you are using.

## Interacting with AWS Services using the CLI

With the AWS CLI installed and configured, you can now start interacting with AWS services from the command line. Here are some common AWS CLI commands for managing resources:

### 1. Listing AWS Resources

To list resources of a specific type, such as AWS Lambda functions or S3 buckets, use the `aws <service-name> list` command. For example, to list all Lambda functions, run:

```bash
aws lambda list-functions
```

### 2. Creating AWS Resources

To create a new resource, use the `aws <service-name> create` command followed by the resource-specific parameters. For example, to create a new S3 bucket, run:

```bash
aws s3api create-bucket --bucket my-bucket-name --region us-east-1
```

### 3. Updating AWS Resources

To update an existing resource, use the `aws <service-name> update` command followed by the resource-specific parameters. For example, to update a Lambda function's code, run:

```bash
aws lambda update-function-code --function-name my-function --zip-file fileb://function.zip
```

### 4. Deleting AWS Resources

To delete a resource, use the `aws <service-name> delete` command followed by the resource-specific parameters. For example, to delete an S3 bucket, run:

```bash
aws s3api delete-bucket --bucket my-bucket-name
```

## Conclusion

In this chapter, we've learned how to set up an AWS account and install the AWS Command Line Interface (CLI). We've also configured the CLI with our AWS credentials and demonstrated some common CLI commands for interacting with AWS services.

Having the AWS CLI installed and configured is a crucial step in your journey to building serverless applications with Node.js on AWS. In the next chapters, we'll dive deeper into serverless development and explore how to create, deploy, and manage serverless functions using Node.js and AWS Lambda. Stay tuned for more exciting tutorials and examples!