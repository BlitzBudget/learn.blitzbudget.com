## Chapter 9: Creating API Gateway Base Mapping and Domain Name

In this chapter, we will dive into the process of creating a base mapping and domain name for your API Gateway. This step is crucial for customizing the API URL and enabling secure HTTPS communication. By the end of this chapter, you'll have a clear understanding of how to set up a user-friendly API endpoint and configure secure domain mappings.

### 1. Customizing API Gateway URL with Base Mapping

When you create an API in Amazon API Gateway, it is assigned a default base mapping. The default base mapping has a URL structure like `https://<api-id>.execute-api.<region>.amazonaws.com`, which may not be user-friendly or representative of your application. Creating a custom base mapping allows you to define a more user-friendly base path for your API.

#### CDK Example

To demonstrate the process of customizing the API Gateway URL with a base mapping, we'll use the AWS Cloud Development Kit (CDK) and TypeScript.

```typescript
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

class ApiGatewayBaseMappingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an API Gateway
    const api = new apigateway.RestApi(this, 'MyApi', {
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    // Create a base mapping for the API Gateway
    const baseMapping = api.addBasePathMapping('myapi', {
      basePath: 'v1', // Customize the base path
    });
  }
}

const app = new cdk.App();
new ApiGatewayBaseMappingStack(app, 'ApiGatewayBaseMappingStack');
```

#### CloudFormation Template Equivalent

Here's the equivalent CloudFormation template for the same setup:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyApi
      FailOnWarnings: true
  MyApiBaseMapping:
    Type: AWS::ApiGateway::BasePathMapping
    Properties:
      DomainName: !GetAtt MyApi.DefaultDomainName
      RestApiId: !Ref MyApi
      BasePath: v1
Outputs:
  ApiGatewayId:
    Value:
      Ref: MyApi
```

### 2. Enabling HTTPS with Custom Domain Name

To enable secure HTTPS communication for your API Gateway, you need to configure a custom domain name and associate it with your API. This involves obtaining an SSL/TLS certificate and setting up the domain name mapping.

#### CDK Example

Let's use CDK to demonstrate the process of enabling HTTPS with a custom domain name.

```typescript
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';

class ApiGatewayCustomDomainStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a custom domain for the API Gateway
    const domainName = 'api.example.com';
    const certificateArn = 'arn:aws:acm:us-east-1:123456789012:certificate/abcdef12-3456-7890-abcd-ef1234567890';
    const customDomain = new apigateway.DomainName(this, 'CustomDomain', {
      domainName,
      certificate: certificatemanager.Certificate.fromCertificateArn(this, 'Certificate', certificateArn),
    });

    // Create a DNS record in Route 53 for the custom domain
    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: 'example.com' });
    new route53.ARecord(this, 'AliasRecord', {
      zone,
      target: route53.RecordTarget.fromAlias(new route53targets.ApiGateway(customDomain)),
    });

    // Create an API Gateway
    const api = new apigateway.RestApi(this, 'MyApi', {
      domainName: {
        domainName,
        certificate: customDomain.certificate!,
      },
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });
  }
}

const app = new cdk.App();
new ApiGatewayCustomDomainStack(app, 'ApiGatewayCustomDomainStack');
```

#### CloudFormation Template Equivalent

Here's the equivalent CloudFormation template for enabling HTTPS with a custom domain name:

```yaml
AWSTemplateFormatVersion:

 '2010-09-09'
Resources:
  CustomDomain:
    Type: AWS::ApiGateway::DomainName
    Properties:
      DomainName: api.example.com
      CertificateArn: arn:aws:acm:us-east-1:123456789012:certificate/abcdef12-3456-7890-abcd-ef1234567890
  DnsRecord:
    Type: AWS::Route53::RecordSet
    Properties:
      HostedZoneName: example.com.
      Name: api.example.com.
      Type: A
      AliasTarget:
        HostedZoneId: Z2FDTNDATAQYW2
        DNSName:
          Fn::GetAtt:
            - CustomDomain
            - DistributionDomainName
  MyApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyApi
      DomainName:
        DomainName: api.example.com
        CertificateArn: arn:aws:acm:us-east-1:123456789012:certificate/abcdef12-3456-7890-abcd-ef1234567890
      FailOnWarnings: true
Outputs:
  ApiGatewayId:
    Value:
      Ref: MyApi
```

### Conclusion

In this chapter, we explored how to create a base mapping and custom domain name for your API Gateway. We covered the process of customizing the API URL using base mappings and enabling secure HTTPS communication with a custom domain. The provided CDK examples and CloudFormation templates demonstrate practical ways to achieve these configurations. By customizing your API URL and enabling HTTPS, you can enhance the user experience and ensure secure communication with your API.

In the next chapter, we'll focus on securing communication between your API Gateway and backend resources by implementing authentication and authorization mechanisms.

---

This chapter covered the process of creating a base mapping and custom domain name for your Amazon API Gateway. By customizing the API URL and enabling HTTPS communication, you enhance the usability and security of your API. The CDK examples and CloudFormation templates provided in this chapter offer practical guidance for achieving these configurations in your own projects.

With the base mapping, you can create a more user-friendly URL structure that aligns with your application's branding and organization. Additionally, enabling HTTPS with a custom domain name ensures that communication between clients and the API Gateway is encrypted and secure.

As you proceed to the next chapter, you'll delve into implementing authentication and authorization mechanisms for your API, further enhancing its security and access control.

Remember to replace placeholder values in the code examples with actual values relevant to your setup, and review the AWS documentation for the latest updates and best practices.

---
Certainly, here's an example CDK code for creating an API Gateway with a base mapping and custom domain:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

class ApiGatewayDomainStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an API Gateway
    const api = new apigateway.RestApi(this, 'MyApi', {
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    // Create a domain name for the API
    const domainName = new apigateway.DomainName(this, 'MyApiDomain', {
      domainName: 'api.example.com',
      certificate: apigateway.Certificate.fromCertificateArn(this, 'Certificate', 'arn:aws:acm:us-east-1:123456789012:certificate/abcdef12-3456-7890-abcd-ef1234567890'),
    });

    // Add base mapping for the domain
    api.addDomainName('ApiDomain', {
      domainName,
    });
  }
}

const app = new cdk.App();
new ApiGatewayDomainStack(app, 'ApiGatewayDomainStack');
```

And here's a CloudFormation template equivalent for creating the same setup:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyApi
      FailOnWarnings: true
  MyApiDomain:
    Type: AWS::ApiGateway::DomainName
    Properties:
      DomainName: api.example.com
      CertificateArn: arn:aws:acm:us-east-1:123456789012:certificate/abcdef12-3456-7890-abcd-ef1234567890
    DependsOn: MyApi
  MyApiBaseMapping:
    Type: AWS::ApiGateway::BasePathMapping
    Properties:
      DomainName: !Ref MyApiDomain
      RestApiId: !Ref MyApi
      Stage: prod
    DependsOn: MyApiDomain
Outputs:
  ApiGatewayId:
    Value:
      Ref: MyApi
```

This code creates an API Gateway with a base mapping and a custom domain name. Replace the certificate ARN with your own valid certificate ARN and adjust the configurations as needed.