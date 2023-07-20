# Chapter 9: Uploading and Syncing Files to AWS S3 with GitHub Actions

## Overview

In the previous chapters, we learned about AWS S3 and how to create a bucket and upload objects manually. In this chapter, we'll explore how to automate the process of uploading and syncing files to AWS S3 using GitHub Actions. With GitHub Actions, you can automatically deploy your application's build artifacts, static files, or any other data to an S3 bucket, making it readily available for distribution.

## Prerequisites

Before proceeding, ensure you have the following prerequisites:

1. A GitHub repository containing the files you want to upload to AWS S3.

2. An AWS account with appropriate IAM permissions to access the target S3 bucket.

3. AWS CLI installed on your development machine with appropriate access credentials.

## Setting Up the Workflow

To upload and sync files to AWS S3 with GitHub Actions, you need to create a workflow YAML file named `s3-upload.yml` in the `.github/workflows` directory of your repository.

```yaml
name: Upload to AWS S3

on:
  push:
    branches:
      - main

jobs:
  upload:
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

    - name: Install AWS CLI
      run: sudo apt-get install -y awscli

    - name: Upload to S3
      run: aws s3 sync ./build s3://your-bucket-name --delete
```

In this example:

- The workflow is named "Upload to AWS S3."

- The workflow is triggered on pushes to the "main" branch.

- The job named "upload" runs on the `ubuntu-latest` virtual environment.

- The job consists of four steps: checking out the repository, setting up AWS CLI with the access credentials stored as GitHub secrets, installing AWS CLI on the virtual environment, and syncing the "build" directory to the specified S3 bucket using the `aws s3 sync` command.

## Configuring GitHub Secrets

To use the AWS access credentials in your workflow, you need to configure them as GitHub secrets:

1. Go to your GitHub repository.

2. Click on "Settings" in the top navigation bar.

3. In the left sidebar, click on "Secrets."

4. Click on "New repository secret."

5. Enter the name and value for your AWS access key ID, and click "Add secret."

6. Repeat the process to add the secret for your AWS secret access key.

## Enabling GitHub Actions

Once you have created the `s3-upload.yml` file and configured the GitHub secrets, GitHub Actions will automatically pick it up and start running the workflow whenever code changes are pushed to the "main" branch.

## Viewing Workflow Results

To view the results of your workflow:

1. Go to the "Actions" tab in your GitHub repository.

2. Click on the latest workflow run to see its details, including the status of each step and any logs generated during the process.

## Conclusion

In this chapter, we demonstrated how to upload and sync files to AWS S3 using GitHub Actions. By automating the process of deploying files to S3, you can streamline your development workflow and make your application's artifacts readily available for distribution.

GitHub Actions combined with AWS services offers a powerful platform for automating various tasks in your software development lifecycle. In the next chapters, we'll explore more advanced topics, such as deploying applications to AWS Lambda, managing AWS resources with GitHub Actions, and creating custom actions for your specific use cases.

---