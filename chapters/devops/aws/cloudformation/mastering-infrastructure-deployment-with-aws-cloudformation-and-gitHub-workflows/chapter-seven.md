# Chapter 7: Generating a Certificate in "us-east-1" for the Domain

In this chapter, we'll use AWS CloudFormation to generate an SSL/TLS certificate for our custom domain "api.example.com" in the "us-east-1" region using AWS Certificate Manager (ACM). By automating the certificate generation process with CloudFormation, we can easily manage and update our certificates as part of our infrastructure-as-code practices.

## Creating a CloudFormation Template for Certificate Generation

Let's create a CloudFormation template to request a new SSL/TLS certificate using AWS Certificate Manager.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for SSL/TLS Certificate Generation'

Resources:
  MyCertificate:
    Type: AWS::CertificateManager::Certificate
    Properties:
      DomainName: api.example.com
      SubjectAlternativeNames:
        - www.api.example.com
      ValidationMethod: DNS
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. In this case, it creates an ACM certificate named "MyCertificate" for the domain "api.example.com" and an additional subject alternative name "www.api.example.com."

- `Type: AWS::CertificateManager::Certificate` specifies the resource type for ACM certificate.

- `Properties` section contains the configuration for the certificate. We define the primary domain name as "api.example.com" and add an additional domain name "www.api.example.com" as a subject alternative name.

- `ValidationMethod` is set to "DNS," indicating that we will use DNS validation to verify ownership of the domain names.

## Deploying the Certificate Generation

To request the SSL/TLS certificate using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `certificate-generation-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyCertificateStack --template-body file://certificate-generation-template.yaml
```

This command creates a new CloudFormation stack named "MyCertificateStack" using the "certificate-generation-template.yaml" template.

## DNS Validation

After deploying the CloudFormation stack, AWS ACM will automatically initiate DNS validation for the domain names "api.example.com" and "www.api.example.com." Follow the instructions provided by ACM to complete the validation process.

## Conclusion

In this chapter, we learned how to generate an SSL/TLS certificate for our custom domain "api.example.com" in the "us-east-1" region using AWS CloudFormation. By automating the certificate generation process, we can easily manage our certificates as part of our infrastructure-as-code workflow.

In the next chapters, we'll explore how to Link the API Domain Name with an HTTP Certificate.