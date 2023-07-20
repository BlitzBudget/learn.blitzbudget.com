# Chapter 9: Linking the API Domain Name with Route 53

In this chapter, we'll use AWS CloudFormation to create an API Gateway and an API Domain Name together. Then, we'll link the custom domain name "api.example.com" with the API Gateway using Amazon Route 53.

## Creating a CloudFormation Template for API Gateway and API Domain Name

Let's create a CloudFormation template to set up the API Gateway and API Domain Name.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for API Gateway and API Domain Name'

Parameters:
  HostedZoneId:
    Type: String
    Description: 'Route 53 Hosted Zone ID for the domain'
    Default: 'your_hosted_zone_id'

Resources:
  MyApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyAPIGateway

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

  MyDomainRecordSet:
    Type: AWS::Route53::RecordSet
    Properties:
      HostedZoneId: !Ref HostedZoneId
      Name: api.example.com.
      Type: A
      AliasTarget:
        HostedZoneId: !GetAtt MyDomainName.RegionalHostedZoneId
        DNSName: !GetAtt MyDomainName.RegionalDomainName
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Parameters` section defines the input parameters for the template. We create a parameter named "HostedZoneId," which represents the Route 53 hosted zone ID for the domain. You can either provide this ID during stack creation or use the default value and update it later.

- `Resources` section defines the resources to be created. We create an API Gateway resource named "MyApiGateway" and an API Gateway domain name resource named "MyDomainName." We associate the domain name with the SSL/TLS certificate using the "CertificateArn" property.

- `Type: AWS::ApiGateway::RestApi` specifies the resource type for the API Gateway.

- `Properties` section contains the configuration for the API Gateway. We set the API Gateway name as "MyAPIGateway."

- We then create a `MyBasePathMapping` resource of type `AWS::ApiGateway::BasePathMapping`. This resource maps the custom domain to the root path of the API Gateway, so requests to "api.example.com" will be directed to the API Gateway.

- `DomainName: !Ref MyDomainName` references the custom domain name resource we created earlier.

- `RestApiId: !Ref MyApiGateway` references the API Gateway resource.

- `BasePath: ''` sets the base path mapping to the root path.

- Finally, we create a Route 53 record set named "MyDomainRecordSet" that points the custom domain "api.example.com" to the API Gateway endpoint.

## Deploying the API Gateway and API Domain Name

To create the API Gateway and link the custom domain name "api.example.com" with the API Gateway using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `api-gateway-and-domain-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyAPIGatewayStack --template-body file://api-gateway-and-domain-template.yaml --parameter ParameterKey=HostedZoneId,ParameterValue=your_hosted_zone_id
```

Replace `your_hosted_zone_id` with the actual Route 53 hosted zone ID for your domain.

This command creates a new CloudFormation stack named "MyAPIGatewayStack" using the "api-gateway-and-domain-template.yaml" template and provides the `HostedZoneId` parameter.

## Conclusion

In this chapter, we successfully created an API Gateway and an API Domain Name using AWS CloudFormation. We also linked the custom domain name "api.example.com" with the API Gateway using Amazon Route 53, making our API accessible through the custom domain with secure HTTPS communication.

In the next chapters, we'll explore additional security measures, such as implementing Web Application Firewall (WAF) rules and securing the API using AWS Identity and Access Management (IAM) policies. We'll also deploy a Lambda function and configure it to work with the API Gateway.