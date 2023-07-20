# Chapter 8: Linking the API Domain Name with an HTTP Certificate

In this chapter, we'll continue building on our previous work and use AWS CloudFormation to link the custom domain name "api.example.com" with the SSL/TLS certificate we generated in Chapter 7. By associating the certificate with the custom domain in the API Gateway, we enable secure communication over HTTPS for our API.

## Prerequisites

Before linking the domain name with the certificate, ensure you have completed the steps from the previous chapters to set up the custom domain name and generate the SSL/TLS certificate using CloudFormation.

## Creating a CloudFormation Template for Domain Name and Certificate Association

Let's create a CloudFormation template to associate the custom domain name with the SSL/TLS certificate in API Gateway.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for Linking Domain Name with Certificate'

Resources:
  MyDomainName:
    Type: AWS::ApiGateway::DomainName
    Properties:
      DomainName: api.example.com
      CertificateArn: arn:aws:acm:us-east-1:123456789012:certificate/abcdefg-1234-5678-90ab-cdef12345678

  MyBasePathMapping:
    Type: AWS::ApiGateway::BasePathMapping
    Properties:
      DomainName: !Ref MyDomainName
      RestApiId: !Ref MyApiGateway
      BasePath: ''
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. We create an API Gateway domain name resource named "MyDomainName" and associate it with the SSL/TLS certificate using the "CertificateArn" property.

- `Type: AWS::ApiGateway::DomainName` specifies the resource type for API Gateway domain name.

- `Properties` section contains the configuration for the domain name. We define the domain name as "api.example.com" and provide the ARN of the SSL/TLS certificate for HTTPS encryption.

- We then create a `MyBasePathMapping` resource of type `AWS::ApiGateway::BasePathMapping`. This resource maps the custom domain to the root path of the API Gateway, so requests to "api.example.com" will be directed to the API Gateway.

- `DomainName: !Ref MyDomainName` references the custom domain name resource we created earlier.

- `RestApiId: !Ref MyApiGateway` references the API Gateway resource.

- `BasePath: ''` sets the base path mapping to the root path.

## Deploying the Domain Name and Certificate Association

To associate the custom domain name with the certificate in the API Gateway using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `domain-certificate-association-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyDomainCertificateStack --template-body file://domain-certificate-association-template.yaml
```

This command creates a new CloudFormation stack named "MyDomainCertificateStack" using the "domain-certificate-association-template.yaml" template.

## Conclusion

In this chapter, we successfully linked the custom domain name "api.example.com" with the SSL/TLS certificate using AWS CloudFormation. This association enables secure communication over HTTPS for our API, ensuring that client requests are encrypted and protected.

In the next chapters, we'll further enhance our infrastructure by configuring DNS records using AWS Route 53 to point to the API Gateway and exploring advanced features such as WAF integration for additional security.