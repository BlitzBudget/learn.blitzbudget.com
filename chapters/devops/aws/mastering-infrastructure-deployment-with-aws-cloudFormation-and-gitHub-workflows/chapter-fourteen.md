# Chapter 14: Setting Up AWS Identity and Access Management (IAM) Roles

In this chapter, we'll walk through a CloudFormation example that sets up AWS Identity and Access Management (IAM) roles for a serverless application. We'll create a Lambda function, an API Gateway, and a DynamoDB table, and then establish permissions between these resources using IAM roles and policies.

## Prerequisites

Before proceeding, ensure you have the AWS CLI installed and configured with appropriate credentials.

## CloudFormation Template

Let's begin by creating a CloudFormation template that defines the Lambda function, API Gateway, and DynamoDB table, along with the necessary IAM roles and permissions.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for Lambda, API Gateway, and DynamoDB'

Resources:
  MyLambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: MyLambdaFunction
      Runtime: nodejs14.x
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            // Your Lambda function code here
          }

  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: LambdaExecutionRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: LambdaDynamoDBAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - lambda:InvokeFunction
                Resource: !GetAtt MyLambdaFunction.Arn
        - PolicyName: DynamoDBAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                  - dynamodb:GetItem
                  - dynamodb:UpdateItem
                  - dynamodb:DeleteItem
                Resource: !GetAtt MyDynamoDBTable.Arn

  MyDynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: MyTable
      AttributeDefinitions:
        - AttributeName: ID
          AttributeType: N
      KeySchema:
        - AttributeName: ID
          KeyType: HASH
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5

  MyApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyApiGateway

  MyApiGatewayResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref MyApiGateway
      ParentId: !GetAtt MyApiGateway.RootResourceId
      PathPart: 'myresource'

  MyApiGatewayMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref MyApiGateway
      ResourceId: !Ref MyApiGatewayResource
      HttpMethod: GET
      AuthorizationType: NONE
      Integration:
        IntegrationHttpMethod: POST
        Type: AWS_PROXY
        Uri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${MyLambdaFunction.Arn}/invocations

Outputs:
  LambdaFunctionName:
    Value: !Ref MyLambdaFunction
  ApiGatewayUrl:
    Value: !Sub 'https://${MyApiGateway}.execute-api.${AWS::Region}.amazonaws.com/prod/myresource'
```

## Explanation

1. We define a Lambda function named "MyLambdaFunction" with the specified runtime and code in the CloudFormation template.

2. We create an IAM role named "LambdaExecutionRole" with permissions for the Lambda function to invoke other Lambda functions (e.g., for recursive operations) using the "LambdaDynamoDBAccess" policy. Additionally, we grant the Lambda function permissions to perform operations (PutItem, GetItem, UpdateItem, DeleteItem) on the DynamoDB table using the "DynamoDBAccess" policy.

3. The DynamoDB table "MyDynamoDBTable" is created with the specified attributes and throughput.

4. We set up an API Gateway named "MyApiGateway" with a resource "MyApiGatewayResource" and a GET method "MyApiGatewayMethod." The method is integrated with the Lambda function "MyLambdaFunction" using an AWS_PROXY integration to directly invoke the Lambda function.

5. The "Outputs" section provides the Lambda function name and the API Gateway URL.

## Deploying the Stack

To deploy the CloudFormation stack, follow these steps:

1. Save the CloudFormation template to a file (e.g., `serverless-app-template.yaml`).

2. Use the AWS CLI to create the stack:

```bash
aws cloudformation create-stack --stack-name ServerlessAppStack --template-body file://serverless-app-template.yaml
```

The CloudFormation stack will create the Lambda function, API Gateway, DynamoDB table, and set up the necessary IAM roles and permissions.

## Conclusion

In this chapter, we used AWS CloudFormation to create a serverless application with a Lambda function, an API Gateway, and a DynamoDB table. By defining IAM roles and policies, we granted the necessary permissions to the Lambda function to access other AWS resources. This approach ensures secure access control and promotes best practices for managing AWS Identity and Access Management (IAM) roles in your serverless applications.