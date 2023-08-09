# Chapter 2: Defining Parameters and Resources

In this chapter, we will delve into the fundamental building blocks of AWS CloudFormation templates: parameters and resources. These components play a crucial role in defining the infrastructure and the level of customization offered to users when deploying stacks.

1. **Understanding Parameters**:

Parameters in CloudFormation templates act as customizable inputs, allowing users to provide values at the time of stack creation or update. They enhance the flexibility and reusability of templates by enabling users to modify specific aspects of the infrastructure without altering the template itself.

In our CloudFormation template, you'll notice the "Parameters" section at the beginning, which defines several parameters, each with its type and description. For example:

```yaml
Parameters:
  HostedZoneId:
    Type: String
    Description: The ID of the Route 53 Hosted Zone
  HostedZoneName:
    Type: String
    Description: The Name of the Route 53 Hosted Zone
  DomainName:
    Type: String
    Description: The domain name to use for the API Gateway
```

In this snippet, we have defined three parameters: "HostedZoneId," "HostedZoneName," and "DomainName." The "Type" specifies the data type for each parameter, and the "Description" provides a helpful description for users when deploying the stack.

2. **Utilizing Parameters**:

Parameters can be referenced throughout the template to dynamically configure resources and other sections based on user input. For example, we use the "DomainName" parameter when defining the API Gateway custom domain:

```yaml
ApiGatewayCustomDomain:
  Type: AWS::ApiGateway::DomainName
  DependsOn: 
    - ApiGatewayUsagePlan
    - ApiGatewayDeployment
    - ApiGatewayStage
  Properties:
    DomainName: !Ref DomainName
    CertificateArn: !Ref CertificateArn
    EndpointConfiguration:
      Types:
        - EDGE
    SecurityPolicy: TLS_1_2
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: YourName
      - Key: purpose
        Value: Admin
```

Here, the "!Ref DomainName" expression fetches the value provided by the user during stack creation and applies it to the "DomainName" property of the "ApiGatewayCustomDomain" resource.

3. **Defining Resources**:

Resources represent the AWS components that CloudFormation provisions and manages within a stack. Each resource in the template is declared under the "Resources" section, and its properties determine the configuration.

For example, the "LambdaFunctionBlog" resource creates an AWS Lambda function for processing blog data:

```yaml
LambdaFunctionBlog:
  Type: AWS::Lambda::Function
  DependsOn: AdminAddBlogBlogProcessorRole
  Properties:
    FunctionName: AdminAddBlogBlogProcessor
    Runtime: go1.x
    Handler: main
    Code:
      S3Bucket: sample-project-for-cloudformation
      S3Key: golang-sample.zip
    DeadLetterConfig:
      TargetArn: "arn:aws:sns:eu-west-1:YourAccountNumber:DeadLetterNotification"
    Environment:
      Variables:
        S3BlogBucketName: !Ref S3BlogBucketName
    Role: !GetAtt AdminAddBlogBlogProcessorRole.Arn
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: YourName
      - Key: purpose
        Value: Admin
```

In this resource, we've specified the function name, runtime, handler, code, environment variables, and the IAM role associated with the Lambda function.

Conclusion:

In this chapter, we learned about the significance of parameters and resources in AWS CloudFormation templates. Parameters empower users to customize stack deployments, while resources define the AWS components to be created and managed. By understanding and leveraging these elements effectively, you can create highly adaptable and reusable CloudFormation templates for your AWS infrastructure deployments.