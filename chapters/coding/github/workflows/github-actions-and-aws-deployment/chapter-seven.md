# Chapter 7: Continuous Deployment (CD) with GitHub Actions and AWS

## Overview

Continuous Deployment (CD) is an extension of Continuous Integration (CI) that automatically deploys code changes to a production environment after passing the CI tests. In this chapter, we'll explore how to set up Continuous Deployment with GitHub Actions and AWS to automate the deployment process to an AWS environment.

## Prerequisites

Before proceeding, ensure you have the following prerequisites:

1. A GitHub repository with a Node.js application.

2. An AWS account with appropriate IAM permissions to create resources like EC2 instances and S3 buckets.

3. AWS CLI configured on your development machine with appropriate access credentials.

## Setting Up Continuous Deployment Workflow

To set up Continuous Deployment with GitHub Actions and AWS, we'll create a workflow YAML file named `cd.yml` in the `.github/workflows` directory of your repository.

```yaml
name: Continuous Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy to EC2
      run: |
        # Deploy your application to an EC2 instance here
        # Example: scp -r ./dist user@your-ec2-instance-ip:/path/to/your/app

    - name: Sync to S3
      run: |
        # Sync your application build artifacts to an S3 bucket here
        # Example: aws s3 sync ./dist s3://your-bucket-name

    - name: Deploy Lambda Function
      run: |
        # Deploy your Lambda function here
        # Example: aws lambda update-function-code --function-name YourFunction --zip-file fileb://./dist/lambda-function.zip
```

In this example:

- The workflow is named "Continuous Deployment."

- The workflow is triggered on pushes to the "main" branch.

- The job named "deploy" runs on the `ubuntu-latest` virtual environment.

- The job consists of several steps: checking out the repository, setting up Node.js with version 14, installing dependencies, building the application, and deploying the artifacts to an EC2 instance, syncing the build artifacts to an S3 bucket, and deploying a Lambda function (note that the actual deployment commands may vary depending on your application and AWS setup).

## Enabling GitHub Actions for CD

Once you have created the `cd.yml` file and committed it to your repository, GitHub Actions will automatically pick it up and start running the CD workflow whenever code changes are pushed to the "main" branch.

## Viewing CD Workflow Results

To view the results of your CD workflow:

1. Go to the "Actions" tab in your GitHub repository.

2. Click on the latest CD workflow run to see its details, including the status of each step and any logs generated during the process.

## Conclusion

In this chapter, we explored how to set up Continuous Deployment with GitHub Actions and AWS. By automating the deployment process to an AWS environment, you can efficiently deliver new features and updates to your users.

GitHub Actions provides a powerful platform for orchestrating CD workflows. By combining GitHub Actions with AWS services, you can create a seamless deployment pipeline for your applications.

In the next chapters, we'll delve deeper into more advanced topics, such as integrating with other AWS services and creating custom actions to enhance your CD workflows.

---