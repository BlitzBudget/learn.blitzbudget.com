# Chapter 10: Creating a Web Application Firewall (WAF) for Security

In this chapter, we'll enhance the security of our API by creating a Web Application Firewall (WAF) using AWS CloudFormation. The WAF will help protect our API from common web application attacks and provide additional security layers.

## Prerequisites

Before creating the WAF, ensure you have completed the steps from the previous chapters to set up the API Gateway, API Domain Name, API Stage, API Deployment, link the API Domain Name with an HTTP Certificate, and create a Route 53 Alias.

## Creating a CloudFormation Template for Web Application Firewall (WAF)

Let's create a CloudFormation template to set up the WAF for our API.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for Web Application Firewall (WAF)'

Resources:
  MyWAFWebACL:
    Type: AWS::WAFv2::WebACL
    Properties:
      Name: MyWAFWebACL
      Scope: REGIONAL
      DefaultAction:
        Allow: {}
      Rules:
        - Name: MyIPRule
          Priority: 1
          Statement:
            IPSetReferenceStatement:
              Arn: !ImportValue 'MyIPSet'
        - Name: MyRateBasedRule
          Priority: 2
          Action:
            Block: {}
          Statement:
            RateBasedStatement:
              Limit: 1000
              AggregateKeyType: IP
        - Name: MySqlInjectionRule
          Priority: 3
          Action:
            Block: {}
          Statement:
            SqlInjectionMatchStatement:
              FieldToMatch:
                SingleHeader:
                  Name: 'User-Agent'
              TextTransformations:
                - Priority: 0
                  Type: NONE
              SqlInjectionMatchTuples:
                - FieldToMatch:
                    SingleHeader:
                      Name: 'User-Agent'
                  TextTransformation: NONE
        - Name: MyXSSRule
          Priority: 4
          Action:
            Block: {}
          Statement:
            XssMatchStatement:
              FieldToMatch:
                SingleHeader:
                  Name: 'User-Agent'
              TextTransformations:
                - Priority: 0
                  Type: NONE
              XssMatchTuples:
                - FieldToMatch:
                    SingleHeader:
                      Name: 'User-Agent'
                  TextTransformation: NONE

  MyWebACLAssociation:
    Type: AWS::WAFv2::WebACLAssociation
    Properties:
      WebACLArn: !Ref MyWAFWebACL
      ResourceArn: !Ref MyAPIStage

Outputs:
  WebACLARN:
    Value: !Ref MyWAFWebACL
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. We create a WAF resource named "MyWAFWebACL" with multiple rules to protect against IP-based attacks, rate-based attacks, SQL injection, and cross-site scripting (XSS) attacks.

- `Type: AWS::WAFv2::WebACL` specifies the resource type for the WAF.

- `Properties` section contains the configuration for the WAF. We set the WAF's name as "MyWAFWebACL" and scope it to "REGIONAL," which means it applies to the specified region.

- `DefaultAction: Allow` sets the default action for the WAF to allow all requests that do not match any rules.

- We then define multiple rules with different priorities. The first rule ("MyIPRule") allows only requests from IP addresses specified in the IP set referred to by "MyIPSet."

- The second rule ("MyRateBasedRule") is a rate-based rule that blocks requests when the request rate exceeds a specified limit for a given IP.

- The third rule ("MySqlInjectionRule") is a rule that blocks requests containing SQL injection attempts in the "User-Agent" header.

- The fourth rule ("MyXSSRule") is a rule that blocks requests containing cross-site scripting (XSS) attempts in the "User-Agent" header.

- `MyWebACLAssociation` resource is an association between the WAF WebACL and the API Gateway Stage to apply the WAF rules to the API traffic.

- `WebACLARN` is an output that provides the ARN of the created WAF WebACL, which we can use for reference in other parts of our infrastructure.

## Deploying the Web Application Firewall (WAF)

To create the Web Application Firewall (WAF) for our API using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `waf-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyWAFStack --template-body file://waf-template.yaml
```

This command creates a new CloudFormation stack named "MyWAFStack" using the "waf-template.yaml" template.

## Conclusion

In this chapter, we successfully set up a Web Application Firewall (WAF) using AWS CloudFormation to enhance the security of our API. The WAF helps protect the API against common web application attacks, such as SQL injection and cross-site scripting (XSS).

In the next chapters, we'll explore additional security measures and best practices to further secure our API and AWS infrastructure.