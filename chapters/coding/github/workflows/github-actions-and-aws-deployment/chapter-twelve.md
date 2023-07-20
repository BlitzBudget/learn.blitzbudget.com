# Chapter 12: Automating AWS Lambda Deployment with GitHub Actions

## Overview

Automating the deployment of AWS Lambda functions is essential to streamline the development workflow and ensure consistent deployments. In this chapter, we'll explore how to use GitHub Actions to automate the deployment of AWS Lambda functions whenever code changes are pushed to the repository.

## Prerequisites

Before proceeding, ensure you have the following prerequisites:

1. An AWS Lambda function that you want to deploy.

2. An AWS account with appropriate IAM permissions to deploy Lambda functions.

3. AWS CLI installed on your development machine with appropriate access credentials.

## Setting Up the Deployment Workflow

To automate AWS Lambda deployment with GitHub Actions, you need to create a workflow YAML file named `lambda-deploy.yml` in the `.github/workflows` directory of your repository.

```yaml
name: Deploy AWS Lambda

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

    - name: Setup AWS CLI
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Deploy Lambda function
      run: |
        # Replace with your actual deployment command
        aws lambda update-function-code --function-name YourFunctionName --zip-file fileb://./path/to/your/function-code.zip
```

In this example:

- The workflow is named "Deploy AWS Lambda."

- The workflow is triggered on pushes to the "main" branch.

- The job named "deploy" runs on the `ubuntu-latest` virtual environment.

- The job consists of three steps: checking out the repository, setting up AWS CLI with the access credentials stored as GitHub secrets, and deploying the Lambda function using the `aws lambda update-function-code` command (replace `YourFunctionName` and `./path/to/your/function-code.zip` with your actual Lambda function name and the path to your function code ZIP file).

## Configuring GitHub Secrets

To use the AWS access credentials in your workflow, you need to configure them as GitHub secrets:

1. Go to your GitHub repository.

2. Click on "Settings" in the top navigation bar.

3. In the left sidebar, click on "Secrets."

4. Click on "New repository secret."

5. Enter the name and value for your AWS access key ID, and click "Add secret."

6. Repeat the process to add the secret for your AWS secret access key.

## Enabling GitHub Actions

Once you have created the `lambda-deploy.yml` file and configured the GitHub secrets, GitHub Actions will automatically pick it up and start running the workflow whenever code changes are pushed to the "main" branch.

## Viewing Workflow Results

To view the results of your workflow:

1. Go to the "Actions" tab in your GitHub repository.

2. Click on the latest workflow run to see its details, including the status of each step and any logs generated during the process.

## Conclusion

In this chapter, we demonstrated how to automate the deployment of AWS Lambda functions using GitHub Actions. By automatically deploying Lambda functions whenever code changes are pushed to the repository, you can speed up the development process and ensure consistent deployments.

GitHub Actions combined with AWS CLI offers a powerful platform for automating various tasks in your software development lifecycle. In the next chapters, we'll explore more advanced topics, such as managing Lambda function configurations, integrating Lambda functions with other AWS services, and setting up continuous deployment pipelines for Lambda-based applications.

---