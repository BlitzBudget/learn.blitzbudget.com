#Chapter 20: Best Practices for CloudFormation Templates

AWS CloudFormation is a powerful tool for managing and provisioning AWS resources through infrastructure as code. To ensure the reliability, scalability, and maintainability of your CloudFormation templates, it is essential to follow best practices. In this chapter, we will cover some of the best practices to consider when designing and writing CloudFormation templates.

**1. Use YAML Syntax:** Prefer using YAML over JSON for your CloudFormation templates. YAML is more concise, easier to read, and less error-prone.

**2. Modularize Templates:** Break down large templates into smaller, reusable modules using nested stacks. This improves maintainability and allows you to manage resources separately.

**3. Parameterize Your Templates:** Use parameters to make your templates more flexible and customizable. Parameters allow you to pass input values during stack creation and update.

**4. Use Mapping and Conditions Wisely:** Leverage the Mapping and Conditions sections to define resource configurations based on different scenarios. This makes your templates more dynamic and adaptable.

**5. Validate Your Templates:** Always validate your templates using the AWS CloudFormation Linter (cfn-lint) or AWS CloudFormation Designer before deployment.

**6. Avoid Hardcoding Resource Names and Values:** Instead, use intrinsic functions like `!Ref`, `!Fn::Join`, and `!Sub` to dynamically generate resource names and values.

**7. Tag Your Resources:** Apply relevant tags to your resources for better resource management and cost allocation.

**8. Use IAM Roles and Policies Sparingly:** Assign IAM roles and policies only when necessary to limit permissions and enhance security.

**9. Implement Rollback Triggers and Monitoring Alarms:** Define CloudWatch Alarms and rollback triggers to respond quickly to stack failures and anomalies.

**10. Parameterize Sensitive Information:** For sensitive information like passwords or API keys, use AWS Systems Manager Parameter Store or AWS Secrets Manager, and reference them in your templates.

**11. Utilize CloudFormation Stack Policies:** Implement stack policies to control updates to your stacks and prevent unwanted modifications.

**12. Test Your Templates in Staging Environments:** Before applying changes to production, thoroughly test your templates in staging environments to identify potential issues.

**13. Version Control Your Templates:** Store your templates in version control repositories like AWS CodeCommit or GitHub to track changes and facilitate collaboration.

**14. Use Nested Stacks for Reusability:** Employ nested stacks to build modular and reusable components, reducing duplication and improving readability.

**15. Enable Deletion Policies and Retain Resources:** Set deletion policies for resources to control what happens to them when the stack is deleted. Use "Retain" for resources you want to keep after stack deletion.

**16. Use Cross-Stack References for Inter-Stack Dependencies:** Use `!Export` and `!ImportValue` to enable communication and resource sharing between stacks.

**17. Monitor Stack Drift:** Regularly check for stack drift to identify any changes made outside of CloudFormation.

By following these best practices, you can create well-structured, secure, and maintainable CloudFormation templates, ensuring smooth management and deployment of your AWS infrastructure as code.

Here is the example to bring it all together.

```
AWSTemplateFormatVersion: '2010-09-09'

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
  ApiGatewayRestApiName:
    Type: String
    Description: The name of the API Gateway REST API
  S3BlogBucketName:
    Type: String
    Description: The name of the Blog S3 Bucket where JSON files are stored
  S3LearnBucketName:
    Type: String
    Description: The name of the Blog S3 Bucket where JSON files are stored
  CertificateArn:
    Type: String
    Description: The Certificate ARN created for this resource

Resources:
  ApiGatewayRestApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: !Ref ApiGatewayRestApiName
      Description: An API to handle administrator methods and resources
      Tags:
        - Key: site
          Value: BlitzBudget
        - Key: author
          Value: Nagarjun
        - Key: purpose
          Value: Admin

  ApiGatewayStage:
    Type: AWS::ApiGateway::Stage
    DependsOn: 
      - ApiGatewayRestApi
      - ApiGatewayDeployment
    Properties:
      StageName: Prod
      RestApiId: !Ref ApiGatewayRestApi
      DeploymentId: !Ref ApiGatewayDeployment
      Tags:
        - Key: site
          Value: BlitzBudget
        - Key: author
          Value: Nagarjun
        - Key: purpose
          Value: Admin

  ApiGatewayDeployment:
    Type: AWS::ApiGateway::Deployment
    DependsOn: 
      - ApiGatewayMethodLearn
      - ApiGatewayMethodBlog
    Properties:
      RestApiId: !Ref ApiGatewayRestApi

  ApiGatewayResourceBlog:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref ApiGatewayRestApi
      ParentId: !GetAtt ApiGatewayRestApi.RootResourceId
      PathPart: blog

  ApiGatewayMethodBlog:
    Type: AWS::ApiGateway::Method
    DependsOn: 
      - ApiGatewayResourceBlog
      - LambdaFunctionBlog
    Properties:
      RestApiId: !Ref ApiGatewayRestApi
      ResourceId: !Ref ApiGatewayResourceBlog
      HttpMethod: POST
      AuthorizationType: NONE
      ApiKeyRequired: true
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub
          - arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${LambdaFunctionBlog.Arn}/invocations
          - LambdaFunctionBlog: !Ref LambdaFunctionBlog
      RequestParameters:
        method.request.header.Authorization: true
      MethodResponses:
        - StatusCode: 200
          ResponseParameters:
            method.response.header.Access-Control-Allow-Origin: "'*'"

  ApiGatewayResourceLearn:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref ApiGatewayRestApi
      ParentId: !GetAtt ApiGatewayRestApi.RootResourceId
      PathPart: learn

  ApiGatewayMethodLearn:
    Type: AWS::ApiGateway::Method
    DependsOn: 
      - ApiGatewayResourceLearn
      - LambdaFunctionLearn
    Properties:
      RestApiId: !Ref ApiGatewayRestApi
      ResourceId: !Ref ApiGatewayResourceLearn
      HttpMethod: POST
      AuthorizationType: NONE
      ApiKeyRequired: true
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub
          - arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${LambdaFunctionLearn.Arn}/invocations
          - LambdaFunctionLearn: !Ref LambdaFunctionLearn
      RequestParameters:
        method.request.header.Authorization: true
      MethodResponses:
        - StatusCode: 200
          ResponseParameters:
            method.response.header.Access-Control-Allow-Origin: "'*'"
  
  PublishToDeadLetterQueuePolicy:
    Type: AWS::IAM::ManagedPolicy
    Properties:
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Sid: VisualEditor0
            Effect: Allow
            Action: sns:Publish
            Resource: "arn:aws:sns:eu-west-1:ACCOUNT_ID:DeadLetterNotification"
      ManagedPolicyName: publishToDeadLetterQueue

  AdminAddBlogBlogProcessorRole:
    Type: AWS::IAM::Role
    DependsOn: PublishToDeadLetterQueuePolicy
    Properties:
      RoleName: AdminAddBlogBlogProcessorRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        - !Ref PublishToDeadLetterQueuePolicy
      Policies:
        - PolicyName: awsLambdaBasicExecutionPolicy
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: Allow
                Action: logs:CreateLogGroup
                Resource: "arn:aws:logs:eu-west-1:ACCOUNT_ID:*"
              - Effect: Allow
                Action:
                  - logs:CreateLogStream
                  - logs:PutLogEvents
                Resource:
                  - "arn:aws:logs:eu-west-1:ACCOUNT_ID:log-group:/aws/lambda/AdminAddBlogBlogProcessor:*"
      Tags:
        - Key: site
          Value: BlitzBudget
        - Key: author
          Value: Nagarjun
        - Key: purpose
          Value: Admin
  
  AdminAddLearnBlogProcessorRole:
    Type: AWS::IAM::Role
    DependsOn: PublishToDeadLetterQueuePolicy
    Properties:
      RoleName: AdminAddLearnBlogProcessorRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        - !Ref PublishToDeadLetterQueuePolicy
      Policies:
        - PolicyName: awsLambdaBasicExecutionPolicy
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: Allow
                Action: logs:CreateLogGroup
                Resource: "arn:aws:logs:eu-west-1:ACCOUNT_ID:*"
              - Effect: Allow
                Action:
                  - logs:CreateLogStream
                  - logs:PutLogEvents
                Resource:
                  - "arn:aws:logs:eu-west-1:ACCOUNT_ID:log-group:/aws/lambda/AdminAddLearnBlogProcessor:*"
      Tags:
        - Key: site
          Value: BlitzBudget
        - Key: author
          Value: Nagarjun
        - Key: purpose
          Value: Admin

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
        TargetArn: "arn:aws:sns:eu-west-1:ACCOUNT_ID:DeadLetterNotification"
      Environment:
        Variables:
          S3BlogBucketName: !Ref S3BlogBucketName
      Role: !GetAtt AdminAddBlogBlogProcessorRole.Arn
      Tags:
        - Key: site
          Value: BlitzBudget
        - Key: author
          Value: Nagarjun
        - Key: purpose
          Value: Admin

  LambdaFunctionLearn:
    Type: AWS::Lambda::Function
    DependsOn: AdminAddLearnBlogProcessorRole
    Properties:
      FunctionName: AdminAddLearnBlogProcessor
      Runtime: go1.x
      Handler: main
      Code:
        S3Bucket: sample-project-for-cloudformation
        S3Key: golang-sample.zip
      DeadLetterConfig:
        TargetArn: "arn:aws:sns:eu-west-1:ACCOUNT_ID:DeadLetterNotification"
      Environment:
        Variables:
          S3LearnBucketName: !Ref S3LearnBucketName
      Role: !GetAtt AdminAddLearnBlogProcessorRole.Arn
      Tags:
        - Key: site
          Value: BlitzBudget
        - Key: author
          Value: Nagarjun
        - Key: purpose
          Value: Admin

  ApiGatewayLambdaFunctionLearnPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !GetAtt LambdaFunctionLearn.Arn
      Principal: apigateway.amazonaws.com
      SourceArn: !Sub "arn:aws:execute-api:${AWS::Region}:ACCOUNT_ID:${ApiGatewayRestApi}/*/POST/learn"

  ApiGatewayLambdaFunctionBlogPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !GetAtt LambdaFunctionBlog.Arn
      Principal: apigateway.amazonaws.com
      SourceArn: !Sub "arn:aws:execute-api:${AWS::Region}:ACCOUNT_ID:${ApiGatewayRestApi}/*/POST/blog"

  ApiGatewayUsagePlan:
    Type: AWS::ApiGateway::UsagePlan
    DependsOn:
      - ApiGatewayDeployment
      - ApiGatewayStage
    Properties:
      ApiStages:
        - ApiId: !Ref ApiGatewayRestApi
          Stage: !Ref ApiGatewayStage
      Description: Usage plan for API key authentication
      Quota:
        Limit: 1000
        Period: MONTH
      Throttle:
        BurstLimit: 10
        RateLimit: 5

  ApiGatewayApiKey:
    Type: AWS::ApiGateway::ApiKey
    DependsOn: 
      - ApiGatewayUsagePlan
      - ApiGatewayDeployment
      - ApiGatewayStage
    Properties:
      Name: MyApiKey
      Description: API Key for authentication
      Enabled: true
      GenerateDistinctId: true
      StageKeys:
        - RestApiId: !Ref ApiGatewayRestApi
          StageName: !Ref ApiGatewayStage

  ApiGatewayUsagePlanKey:
    Type: AWS::ApiGateway::UsagePlanKey
    DependsOn:
      - ApiGatewayUsagePlan
      - ApiGatewayApiKey
    Properties:
      KeyId: !Ref ApiGatewayApiKey
      KeyType: API_KEY
      UsagePlanId: !Ref ApiGatewayUsagePlan

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
          Value: Nagarjun
        - Key: purpose
          Value: Admin

  ApiGatewayMapping:
    Type: AWS::ApiGateway::BasePathMapping
    DependsOn: 
      - ApiGatewayCustomDomain
      - ApiGatewayRestApi
      - ApiGatewayStage
      - ApiGatewayDeployment
    Properties:
      DomainName: !Ref DomainName
      RestApiId: !Ref ApiGatewayRestApi
      Stage: !Ref ApiGatewayStage

  ApiGatewayDomainARecordSet:
    Type: AWS::Route53::RecordSet
    DependsOn:
      - ApiGatewayMapping
    Properties:
      HostedZoneId: !Ref HostedZoneId
      Name: !Ref DomainName
      Type: A
      AliasTarget:
        DNSName: !GetAtt ApiGatewayCustomDomain.DistributionDomainName
        HostedZoneId: !GetAtt ApiGatewayCustomDomain.DistributionHostedZoneId

  ApiGatewayDomainAAAARecordSet:
    Type: AWS::Route53::RecordSet
    DependsOn:
      - ApiGatewayMapping
    Properties:
      HostedZoneId: !Ref HostedZoneId
      Name: !Ref DomainName
      Type: AAAA
      AliasTarget:
        DNSName: !GetAtt ApiGatewayCustomDomain.DistributionDomainName
        HostedZoneId: !GetAtt ApiGatewayCustomDomain.DistributionHostedZoneId

Outputs:
  ApiGatewayRestApiId:
    Description: API Gateway RestApi ID
    Value: !Ref ApiGatewayRestApi
  ApiGatewayDomainName:
    Description: Custom domain name for the API Gateway
    Value: !Ref DomainName
  ApiGatewayUsagePlanId:
    Description: API Gateway Usage Plan ID
    Value: !Ref ApiGatewayUsagePlan
  ApiGatewayApiKey:
    Description: API Key for authentication
    Value: !Ref ApiGatewayApiKey
```