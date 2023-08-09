# Chapter 4: Integrating Lambda Functions with AWS API Gateway

In this chapter, we will explore how to integrate AWS Lambda functions with API Gateway using AWS CloudFormation. Lambda functions provide a serverless way to execute code in response to API requests, making it an ideal candidate for implementing business logic and data processing.

1. **Understanding Lambda Integration**:

AWS Lambda is a compute service that allows you to run code without managing servers. It supports various programming languages and can be triggered by various AWS services, including API Gateway. By integrating Lambda functions with API Gateway, you can seamlessly handle incoming requests and respond with dynamic data or perform custom actions.

2. **Defining Lambda Functions**:

In our CloudFormation template, we define two Lambda functions: "LambdaFunctionBlog" and "LambdaFunctionLearn." Let's take a closer look at how they are created:

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
      TargetArn: "arn:aws:sns:eu-west-1:YOUR_ACCOUNT_ID:DeadLetterNotification"
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
      TargetArn: "arn:aws:sns:eu-west-1:YOUR_ACCOUNT_ID:DeadLetterNotification"
    Environment:
      Variables:
        S3LearnBucketName: !Ref S3LearnBucketName
    Role: !GetAtt AdminAddLearnBlogProcessorRole.Arn
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: YourName
      - Key: purpose
        Value: Admin
```

The "LambdaFunctionBlog" and "LambdaFunctionLearn" resources define the Lambda functions responsible for processing API requests related to "blog" and "learn" resources, respectively. The Lambda functions are written in Go (go1.x) and use the "main" handler.

3. **Lambda Execution Role**:

To execute the Lambda functions securely, we define IAM roles for each function. These roles allow the Lambda functions to access AWS resources and services like S3 and CloudWatch Logs:

```yaml
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
              Resource: "arn:aws:logs:eu-west-1:YOUR_ACCOUNT_ID:*"
            - Effect: Allow
              Action:
                - logs:CreateLogStream
                - logs:PutLogEvents
              Resource:
                - "arn:aws:logs:eu-west-1:YOUR_ACCOUNT_ID:log-group:/aws/lambda/AdminAddBlogBlogProcessor:*"
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: YourName
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
              Resource: "arn:aws:logs:eu-west-1:YOUR_ACCOUNT_ID:*"
            - Effect: Allow
              Action:
                - logs:CreateLogStream
                - logs:PutLogEvents
              Resource:
                - "arn:aws:logs:eu-west-1:YOUR_ACCOUNT_ID:log-group:/aws/lambda/AdminAddLearnBlogProcessor:*"
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: YourName
      - Key: purpose
        Value: Admin
```

The "AdminAddBlogBlogProcessorRole" and "AdminAddLearnBlogProcessorRole" resources define IAM roles with specific permissions, such as logging and access to the Dead Letter Queue.

4. **Lambda Function Permissions**:

To allow API Gateway to invoke the Lambda functions, we create permissions using "ApiGatewayLambdaFunctionLearnPermission" and "ApiGatewayLambdaFunctionBlogPermission":

```yaml
ApiGatewayLambdaFunctionLearnPermission:
  Type: AWS::Lambda::Permission
  Properties:
    Action: lambda:InvokeFunction
    FunctionName: !GetAtt LambdaFunctionLearn.Arn
    Principal: apigateway.amazonaws.com
    SourceArn: !Sub "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiGatewayRestApi}/*/POST/learn"

ApiGatewayLambdaFunctionBlogPermission:
  Type: AWS::Lambda::Permission
  Properties:
    Action: lambda:InvokeFunction
    FunctionName: !GetAtt LambdaFunctionBlog.Arn
    Principal: apigateway.amazonaws.com
    SourceArn: !Sub "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiGatewayRestApi}/*/POST/blog"
```

These permissions grant API Gateway the ability to invoke the Lambda functions securely.

5. **Completing the API Gateway Integration**:

Finally, we complete the integration by linking the methods to their respective Lambda functions:

```yaml
ApiGatewayMethodBlog:
  Type: AWS::ApiGateway::Method
  DependsOn: 
    - ApiGatewayResourceBlog
    - LambdaFunctionBlog
  Properties:
    RestApiId:

 !Ref ApiGatewayRestApi
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
```

The "ApiGatewayMethodBlog" and "ApiGatewayMethodLearn" resources configure the integration between the API Gateway methods and their respective Lambda functions. The "Integration" section specifies the type of integration and the URI to invoke the Lambda function securely.

By following the steps above, you can seamlessly integrate AWS Lambda functions with API Gateway using AWS CloudFormation, creating a robust and efficient architecture for your serverless applications.