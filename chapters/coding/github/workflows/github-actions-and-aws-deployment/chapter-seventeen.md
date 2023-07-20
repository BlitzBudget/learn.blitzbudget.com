# Chapter 17: Deploying AWS Infrastructure with CloudFormation and GitHub Actions

## Overview

AWS CloudFormation is a powerful service that allows you to define and provision your AWS infrastructure as code. By using CloudFormation templates, you can create, update, and delete AWS resources in a repeatable and automated manner. In this chapter, we'll explore how to use CloudFormation and GitHub Actions to deploy AWS infrastructure as code.

## Creating a CloudFormation Template

Before we begin, you need to create a CloudFormation template that defines the AWS resources you want to provision. The template is written in JSON or YAML format and can include AWS resources such as EC2 instances, S3 buckets, DynamoDB tables, and more.

Here's an example CloudFormation template that provisions an S3 bucket:

```yaml
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-unique-bucket-name
```

Save this template as `cloudformation-template.yml` in your project repository.

## Using GitHub Actions for CloudFormation Deployment

To deploy the CloudFormation template using GitHub Actions, you'll need to create a workflow YAML file that defines the deployment steps.

Here's an example workflow YAML file named `cloudformation-deploy.yml`:

```yaml
name: Deploy CloudFormation Stack

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

    - name: Deploy CloudFormation Stack
      uses: aws-actions/aws-cloudformation-deploy@v1
      with:
        stack-name: MyStack
        template-file: cloudformation-template.yml
        capabilities: CAPABILITY_NAMED_IAM
        region: us-east-1
```

In this example:

- The workflow is named "Deploy CloudFormation Stack."

- The workflow is triggered on pushes to the "main" branch.

- The job named "deploy" runs on the `ubuntu-latest` virtual environment.

- The job consists of two steps: checking out the repository and deploying the CloudFormation stack using the `aws-actions/aws-cloudformation-deploy` action.

## GitHub Secrets for AWS Credentials

To securely deploy the CloudFormation stack, you need to configure your AWS credentials as GitHub secrets:

1. Go to your GitHub repository.

2. Click on "Settings" in the top navigation bar.

3. In the left sidebar, click on "Secrets."

4. Click on "New repository secret."

5. Enter the name and value for your AWS access key ID (`AWS_ACCESS_KEY_ID`) and secret access key (`AWS_SECRET_ACCESS_KEY`), and click "Add secret."

## Running the CloudFormation Deployment

With the CloudFormation template and workflow in place, any push to the "main" branch will trigger the deployment of the CloudFormation stack. GitHub Actions will automatically run the workflow, using the provided AWS credentials to authenticate and deploy the infrastructure.

## Best Practices for CloudFormation Deployments

Here are some best practices for CloudFormation deployments:

1. Use version control: Store your CloudFormation templates in version control to track changes and manage updates.

2. Parameterize your templates: Use parameters to make your CloudFormation templates reusable and flexible.

3. Validate templates before deployment: Use the AWS CLI or SDK to validate your templates before deploying them.

4. Enable logging and monitoring: Enable AWS CloudTrail and CloudWatch to log and monitor CloudFormation stack events.

## Conclusion

In this chapter, we explored how to use CloudFormation and GitHub Actions to deploy AWS infrastructure as code. With CloudFormation, you can automate the provisioning and management of your AWS resources, making it easier to maintain a consistent and reliable infrastructure.

By leveraging GitHub Actions, you can automate the deployment process, enabling continuous integration and continuous deployment (CI/CD) for your AWS infrastructure.

In the next chapters, we'll delve deeper into Using GitHub Actions for Blue-Green Deployments on AWS.

---