# Chapter 5: Securing API Gateway with Cognito Authorization

In this chapter, we'll enhance the security of our API Gateway by integrating it with the Amazon Cognito User Pool we created in the previous chapter. By doing so, we can enforce user authentication and authorization for API access, ensuring that only authenticated users with specific permissions can interact with our API.

## Integrating Cognito User Pool with API Gateway

To enable Cognito-based authorization for our API Gateway, we need to perform the following steps:

### Step 1: Set Up Cognito Authorizer

We'll create an Amazon Cognito Authorizer in API Gateway, which will handle user authentication and verify the identity of incoming requests.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for API Gateway with Cognito Authorizer'

Resources:
  MyCognitoUserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      UserPoolName: MyUserPool
      AutoVerifiedAttributes:
        - email
      Policies:
        PasswordPolicy:
          MinimumLength: 8
          RequireLowercase: true
          RequireNumbers: true
          RequireSymbols: true
          RequireUppercase: true

  MyApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyRESTApi

  MyApiResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      ParentId: !GetAtt MyApiGateway.RootResourceId
      RestApiId: !Ref MyApiGateway
      PathPart: 'myresource'

  MyAuthorizer:
    Type: AWS::ApiGateway::Authorizer
    Properties:
      Name: MyCognitoAuthorizer
      RestApiId: !Ref MyApiGateway
      Type: COGNITO_USER_POOLS
      IdentitySource: method.request.header.Authorization
      ProviderARNs:
        - !GetAtt MyCognitoUserPool.Arn
      AuthorizerResultTtlInSeconds: 300
      AuthorizerUri: !Sub
        - arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/${arn}/invocations
        - region: !Ref AWS::Region
          arn: !Ref MyAuthorizerFunction
```

In this template:

- We define the `MyCognitoUserPool` and `MyApiGateway` resources as before, representing our Cognito User Pool and API Gateway, respectively.

- We create a new resource `MyAuthorizer` of type `AWS::ApiGateway::Authorizer`, which will serve as our Cognito Authorizer for the API Gateway.

- `Type: COGNITO_USER_POOLS` indicates that the Authorizer will use Amazon Cognito User Pools for authentication.

- `IdentitySource` specifies where the Authorizer looks for user identity information. In this case, it will look for the "Authorization" header in incoming requests.

- `ProviderARNs` points to the ARN (Amazon Resource Name) of our Cognito User Pool, which serves as the identity provider.

- `AuthorizerResultTtlInSeconds` sets the time-to-live (TTL) for cached authorizer results.

- `AuthorizerUri` specifies the ARN of the Lambda function that implements the Authorizer logic.

### Step 2: Protect API Resources

Now that we have our Cognito Authorizer set up, we can use it to secure specific API resources. In this example, we'll protect the `MyApiResource` created in the previous chapter.

```yaml
Resources:
  MyApiMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref MyApiGateway
      ResourceId: !Ref MyApiResource
      HttpMethod: POST
      AuthorizationType: COGNITO_USER_POOLS
      AuthorizerId: !Ref MyAuthorizer
```

In this template:

- We define the `MyApiMethod` resource of type `AWS::ApiGateway::Method`, representing the HTTP method for our API resource.

- `RestApiId` and `ResourceId` reference the API Gateway and API resource, respectively.

- `HttpMethod` specifies the HTTP method (e.g., POST) for this resource.

- `AuthorizationType` is set to `COGNITO_USER_POOLS`, indicating that this method requires Cognito-based authorization.

- `AuthorizerId` references the Cognito Authorizer we created earlier, associating it with this API method.

## Deploying the Secured API Gateway

To deploy the secured API Gateway using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `secured-api-gateway-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MySecuredApiGatewayStack --template-body file://secured-api-gateway-template.yaml
```

This command creates a new CloudFormation stack named "MySecuredApiGatewayStack" using the "secured-api-gateway-template.yaml" template.

## Conclusion

In this chapter, we successfully secured our API Gateway using the Amazon Cognito User Pool as an Authorizer. By integrating Cognito-based authorization, we can enforce authentication and control access to our API resources, ensuring that only authenticated users with the appropriate permissions can interact with our API.

In the next chapters, we'll continue to enhance our infrastructure by adding more features, such as custom domain names, SSL certificates, and integration with Route 53 for DNS management.