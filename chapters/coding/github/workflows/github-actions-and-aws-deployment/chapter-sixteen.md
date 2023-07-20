# Chapter 16: Creating and Configuring AWS Access Keys for Deployment

## Overview

AWS access keys are used to securely authenticate and interact with AWS services programmatically. In this chapter, we'll explore how to create and configure AWS access keys for deployment, and demonstrate how to use them in GitHub Actions workflows.

## Creating AWS Access Keys

To create an AWS access key, you need to have the necessary permissions in the AWS Identity and Access Management (IAM) service. By default, IAM users don't have access keys, so you'll need to create them manually or through the AWS Management Console.

Here's how you can create an AWS access key through the AWS Management Console:

1. Go to the IAM service in the AWS Management Console.

2. Click on "Users" in the left navigation pane.

3. Select the IAM user for which you want to create an access key.

4. Click on the "Security credentials" tab.

5. Under the "Access keys" section, click "Create access key."

6. Save the access key ID and secret access key. You won't be able to retrieve the secret access key again, so make sure to save it securely.

## Using AWS Access Keys in GitHub Actions

Once you have created an AWS access key, you can use it in your GitHub Actions workflows to authenticate and interact with AWS services. Here's an example workflow YAML file that uses AWS access keys to deploy an AWS Lambda function:

```yaml
name: Deploy Lambda Function

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

    - name: Configure AWS credentials from access keys
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Deploy Lambda function
      run: |
        # Use AWS CLI or SDK to deploy your Lambda function
        # Example: aws lambda update-function-code --function-name MyLambdaFunction --zip-file fileb://function-code.zip
```

In this example:

- The workflow is named "Deploy Lambda Function."

- The workflow is triggered on pushes to the "main" branch.

- The job named "deploy" runs on the `ubuntu-latest` virtual environment.

- The job consists of three steps: checking out the repository, configuring AWS credentials using the access keys, and deploying the Lambda function using the AWS CLI.

## GitHub Secrets for AWS Access Keys

To securely use the AWS access keys in your workflow, you can store them as GitHub secrets:

1. Go to your GitHub repository.

2. Click on "Settings" in the top navigation bar.

3. In the left sidebar, click on "Secrets."

4. Click on "New repository secret."

5. Enter the name and value for your AWS access key ID (`AWS_ACCESS_KEY_ID`) and secret access key (`AWS_SECRET_ACCESS_KEY`), and click "Add secret."

## Best Practices for AWS Access Keys

Here are some best practices for managing AWS access keys:

1. Limit access: Only assign access keys to IAM users or roles that require them for deployment.

2. Rotate keys regularly: Periodically rotate AWS access keys to enhance security.

3. Use IAM roles when possible: Whenever possible, use IAM roles with temporary security credentials instead of long-term access keys.

4. Monitor activity: Use AWS CloudTrail to monitor access key activity and detect any unauthorized actions.

## Conclusion

In this chapter, we explored how to create and configure AWS access keys for deployment and demonstrated how to use them in GitHub Actions workflows. Access keys provide a way to programmatically access AWS services, but it's essential to manage them securely to avoid potential security risks.

By following best practices for managing AWS access keys and using them in your GitHub Actions workflows, you can securely deploy AWS resources and maintain the integrity of your cloud infrastructure.

In the next chapters, we'll delve deeper into Deploying AWS Infrastructure with CloudFormation and GitHub Actions.

---