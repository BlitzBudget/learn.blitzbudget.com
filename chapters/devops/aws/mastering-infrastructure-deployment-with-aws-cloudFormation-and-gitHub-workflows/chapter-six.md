# Chapter 6: Creating a Custom Domain Name for API Gateway

In this chapter, we'll explore how to create a custom domain name for our API Gateway using AWS CloudFormation. A custom domain name provides a branded and user-friendly URL for your API, making it easier for clients to access and interact with your API.

## Prerequisites

Before creating a custom domain name, make sure you have completed the steps from the previous chapters to set up the API Gateway with Cognito authorization.

## Creating a CloudFormation Template for Custom Domain Name

Let's create a CloudFormation template to set up a custom domain name for our API Gateway.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for Custom Domain Name'

Resources:
  MyApiGateway:
    Type: AWS::ApiGateway::DomainName
    Properties:
      DomainName: api.example.com
      CertificateArn: arn:aws:acm:us-east-1:123456789012:certificate/abcdefg-1234-5678-90ab-cdef12345678
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. In this case, it creates an API Gateway domain name with the name "api.example.com".

- `Type: AWS::ApiGateway::DomainName` specifies the resource type for API Gateway domain name.

- `Properties` section contains the configuration for the domain name. We define the domain name as "api.example.com" and provide the ARN of the SSL/TLS certificate from AWS Certificate Manager (ACM) for HTTPS encryption.

## Deploying the Custom Domain Name

To deploy the custom domain name for the API Gateway using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `custom-domain-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyCustomDomainStack --template-body file://custom-domain-template.yaml
```

This command creates a new CloudFormation stack named "MyCustomDomainStack" using the "custom-domain-template.yaml" template.

## Configuring DNS for the Custom Domain

After the CloudFormation stack is successfully created, you need to configure DNS settings for the custom domain name "api.example.com" to point to the API Gateway endpoint. This typically involves creating a CNAME record or an A record in your DNS provider's settings.

## Conclusion

In this chapter, we learned how to create a custom domain name for our API Gateway using AWS CloudFormation. By associating a custom domain with our API, we provide a more user-friendly and branded URL for clients to access our API.

In the next chapters, we'll further enhance our infrastructure by adding SSL certificate management, integrating the custom domain with the API Gateway, and managing DNS records using AWS Route 53.