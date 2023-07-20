# Chapter 14: Managing Secrets and Credentials for AWS Deployment

## Overview

When deploying applications to AWS, it's crucial to manage sensitive information, such as API keys, access credentials, and other secrets securely. In this chapter, we'll explore how to use environment variables, GitHub organization secrets, and repository secrets to manage secrets and credentials for AWS deployment with GitHub Actions.

## Environment Variables

Environment variables are a convenient way to store configuration values and sensitive information in your GitHub Actions workflows. You can set environment variables in your workflow YAML or using GitHub's UI.

To set an environment variable in your workflow YAML:

```yaml
name: Deploy to AWS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_REGION: us-east-1

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Deploy to AWS
        run: |
          aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
          aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
          aws configure set region $AWS_REGION
          # Additional AWS CLI commands for deployment
```

In this example, we set three environment variables for AWS deployment: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`. These values are retrieved from GitHub secrets and used by the AWS CLI to authenticate and interact with AWS services.

## GitHub Organization Secrets and Repository Secrets

GitHub Actions allows you to store secrets at the organization or repository level securely. Organization secrets can be used across all repositories within the organization, while repository secrets are specific to a single repository.

To create organization secrets:

1. Go to your organization's GitHub page.

2. Click on "Settings."

3. In the left sidebar, click on "Secrets."

4. Click on "New organization secret."

5. Enter the name and value for your secret, and click "Add secret."

To create repository secrets:

1. Go to your repository on GitHub.

2. Click on "Settings."

3. In the left sidebar, click on "Secrets."

4. Click on "New repository secret."

5. Enter the name and value for your secret, and click "Add secret."

## Using Secrets in GitHub Actions

To use secrets in your workflow YAML, you can reference them using the `${{ secrets.SECRET_NAME }}` syntax. For example:

```yaml
name: Deploy to AWS

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

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to AWS
        run: |
          # AWS CLI commands for deployment
```

In this example, we use the `aws-actions/configure-aws-credentials` action to configure AWS credentials using the secrets defined in the repository.

## Best Practices for Secrets Management

Here are some best practices for managing secrets and credentials:

1. Limit access: Only grant access to secrets to users or workflows that require them for deployment.

2. Regularly rotate secrets: Rotate secrets periodically to minimize the risk of exposure.

3. Avoid hardcoding: Never hardcode secrets in your code or workflows directly.

4. Store secrets securely: Use GitHub secrets or other secure secret management tools to store sensitive information.

5. Audit and monitor: Regularly audit and monitor access to secrets to detect potential security breaches.

## Conclusion

In this chapter, we explored how to manage secrets and credentials for AWS deployment with GitHub Actions using environment variables, GitHub organization secrets, and repository secrets. By securely managing sensitive information, you can ensure the confidentiality and integrity of your AWS deployments.

By following best practices for secrets management, you can minimize the risk of security breaches and maintain a robust security posture for your AWS infrastructure.

In the next chapters, we'll delve deeper into Securely Accessing AWS Services with IAM Roles.

---