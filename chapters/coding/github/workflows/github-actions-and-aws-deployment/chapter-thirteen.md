# Chapter 13: Using OIDC for Role-Based Deployment in AWS

## Overview

AWS Identity and Access Management (IAM) allows you to manage access to AWS resources. One way to control access is by using OpenID Connect (OIDC) federated identities. OIDC enables you to grant permissions to users authenticated by an external identity provider (IdP). In this chapter, we'll explore how to use OIDC to implement role-based deployment in AWS using GitHub Actions.

## Prerequisites

Before proceeding, ensure you have the following prerequisites:

1. An AWS account.

2. An identity provider that supports OIDC, such as Google or Okta.

3. An existing AWS IAM role that you want to assume using OIDC.

## Configuring OIDC Identity Provider

Before you can use OIDC for role-based deployment, you need to configure your identity provider (IdP) to integrate with AWS. The specific steps may vary depending on the IdP you are using. Generally, you'll need to create an OIDC application on your IdP and obtain the client ID and client secret.

## Setting Up AWS IAM Role

Next, you need to set up an IAM role that will be assumed by users authenticated via OIDC. This role defines the permissions users will have when assuming it.

1. Go to the IAM service in the AWS Management Console.

2. Click on "Roles" in the left navigation pane.

3. Click the "Create role" button.

4. Select "Web identity" as the type of trusted entity.

5. Choose your OIDC provider (e.g., Google, Okta) from the list.

6. Enter your OIDC provider's audience (client ID) and issuer URL.

7. Click "Next" and proceed to define the permissions for this role.

8. Review and create the role.

## Automating AWS Lambda Deployment with GitHub Actions

To use OIDC for role-based deployment in AWS Lambda with GitHub Actions, you can leverage the AWS CLI's `sts` command to assume the IAM role with your OIDC identity.

Here's an example workflow YAML file named `oidc-deploy.yml`:

```yaml
name: OIDC Role-Based Deployment

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

    - name: Configure AWS credentials from Production account
      uses: aws-actions/configure-aws-credentials@v2
      with:
        role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
        aws-region: ${{ secrets.AWS_REGION }}
        role-session-name: SessionRetrieveAndValidateAPIKey

    - name: Production - Upload to S3
      run: |
        aws s3 sync . s3://${{ env.BUCKET_NAME }}/
```

In this example:

- The workflow is named "OIDC Role-Based Deployment."

- The workflow is triggered on pushes to the "main" branch.

- The job named "deploy" runs on the `ubuntu-latest` virtual environment.

- The job consists of three steps: checking out the repository, configuring AWS credentials to assume the IAM role with OIDC, and deploying the code to an S3 bucket using the `aws s3 sync` command.

## Configuring GitHub Secrets

To use the OIDC token in your workflow, you need to configure the necessary GitHub secrets:

1. Go to your GitHub repository.

2. Click on "Settings" in the top navigation bar.

3. In the left sidebar, click on "Secrets."

4. Click on "New repository secret."

5. Enter the name and value for your AWS role to assume (`AWS_ROLE_TO_ASSUME`) and AWS region (`AWS_REGION`), and click "Add secret."

## Enabling GitHub Actions

Once you have created the `oidc-deploy.yml` file and configured the GitHub secrets, GitHub Actions will automatically pick it up and start running the workflow whenever code changes are pushed to the "main" branch.

## Conclusion

In this chapter, we demonstrated how to use OIDC for role-based deployment in AWS Lambda using GitHub Actions. By leveraging OIDC identities from an external IdP, you can implement fine-grained access control and ensure secure deployments in your AWS environment.

OIDC enables you to extend your existing identity management solution to control access to AWS resources, making it easier to manage permissions and maintain security.

In the next chapters, we'll delve deeper into Managing Secrets and Credentials for AWS Deployment.

---