# Chapter 20: Bringing it All Together - The Complete CloudFormation Template

In this final chapter, we'll bring together all the components we created throughout the course and assemble them into a comprehensive CloudFormation template. This template will encapsulate the entire infrastructure of our serverless application, including the Lambda function, API Gateway, Cognito User Pool, custom domain name, SSL/TLS certificate, Route 53 configuration, Web Application Firewall (WAF), DynamoDB table, IAM roles, CloudTrail, CloudWatch Logs, and CodePipeline.

By combining all these elements into a single CloudFormation template, we'll achieve a streamlined and reproducible deployment process. The template will define the complete AWS infrastructure and configurations required for our serverless application, making it easy to provision and manage the resources consistently.

Throughout this chapter, we'll guide you step-by-step through the creation of the mega CloudFormation template. You'll gain insights into organizing the template for readability and maintainability, using parameterization for flexibility, and employing outputs to extract essential information from the stack. With this powerful template, you'll be able to deploy your entire serverless application in a matter of minutes, efficiently orchestrating AWS services and ensuring a robust and scalable architecture.

By completing this chapter, you'll have achieved a deep understanding of AWS CloudFormation's potential and its role in managing complex infrastructures. You'll also have the skills to develop and maintain comprehensive templates, aligning your deployment process with the principles of infrastructure as code. Congratulations on your journey of mastering AWS CloudFormation!

Below is a CloudFormation template that includes a Lambda function, DynamoDB table, Lambda function role with DynamoDB permissions, API Gateway, API HTTP POST to link the Lambda function, Lambda function permissions, API domain name, and Base mapping, as well as Route 53 configuration to link the domain name:

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: CloudFormation Template for Lambda Function, DynamoDB, API Gateway, and Route 53

Resources:
  DynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: MyDynamoDBTable
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5

  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: "sts:AssumeRole"
      Path: "/"
      Policies:
        - PolicyName: DynamoDBPermissions
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: Allow
                Action:
                  - "dynamodb:PutItem"
                  - "dynamodb:GetItem"
                  - "dynamodb:UpdateItem"
                  - "dynamodb:DeleteItem"
                Resource: !GetAtt DynamoDBTable.Arn

  LambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: MyLambdaFunction
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Runtime: nodejs14.x
      Code:
        ZipFile: |
          // Your Lambda function code here
      Environment:
        Variables:
          DYNAMODB_TABLE: !Ref DynamoDBTable

  LambdaPermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !GetAtt LambdaFunction.Arn
      Action: lambda:InvokeFunction
      Principal: apigateway.amazonaws.com
      SourceArn: !Sub "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiGatewayRestApi}/*/*/"

  ApiGatewayRestApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyApiGateway

  ApiGatewayResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      ParentId: !GetAtt ApiGatewayRestApi.RootResourceId
      PathPart: "myresource"

  ApiGatewayMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref ApiGatewayRestApi
      ResourceId: !Ref ApiGatewayResource
      HttpMethod: POST
      AuthorizationType: NONE
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub "arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${LambdaFunction.Arn}/invocations"

  ApiGatewayDeployment:
    Type: AWS::ApiGateway::Deployment
    Properties:
      RestApiId: !Ref ApiGatewayRestApi

  ApiGatewayStage:
    Type: AWS::ApiGateway::Stage
    Properties:
      RestApiId: !Ref ApiGatewayRestApi
      DeploymentId: !Ref ApiGatewayDeployment
      StageName: Prod

  ApiGatewayDomainName:
    Type: AWS::ApiGateway::DomainName
    Properties:
      DomainName: mydomain.example.com

  ApiGatewayBasePathMapping:
    Type: AWS::ApiGateway::BasePathMapping
    Properties:
      DomainName: !Ref ApiGatewayDomainName
      RestApiId: !Ref ApiGatewayRestApi
      Stage: !Ref ApiGatewayStage

  Route53HostedZone:
    Type: AWS::Route53::HostedZone
    Properties:
      Name: example.com.

  Route53RecordSet:
    Type: AWS::Route53::RecordSet
    Properties:
      HostedZoneId: !Ref Route53HostedZone
      Name: mydomain.example.com.
      Type: A
      AliasTarget:
        DNSName: !Select [2, !Split ["/", !GetAtt ApiGatewayDomainName.RegionalDomainName]]
        EvaluateTargetHealth: false
        HostedZoneId: !Select [3, !Split ["/", !GetAtt ApiGatewayDomainName.RegionalDomainName]]

Outputs:
  ApiUrl:
    Value: !Sub "https://${ApiGatewayDomainName.DomainName}"
```

This CloudFormation template will create a Lambda function, DynamoDB table, IAM role for the Lambda function with DynamoDB permissions, an API Gateway with a POST method linked to the Lambda function, a custom domain name for the API Gateway, and a Route 53 record set linking the domain name to the API Gateway. The Lambda function will have permissions to interact with the DynamoDB table, and the API Gateway will be set up to invoke the Lambda function upon receiving a POST request. The template also outputs the API URL, making it easy to access the API after the stack is created.