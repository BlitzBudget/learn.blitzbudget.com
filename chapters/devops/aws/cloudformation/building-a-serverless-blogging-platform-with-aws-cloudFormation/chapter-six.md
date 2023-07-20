Chapter 6: Securing API Gateway with Cognito Authorization using AWS CloudFormation

In this chapter, we will explore how to secure an Amazon API Gateway using Amazon Cognito for authorization with the help of AWS CloudFormation. Amazon API Gateway provides a fully managed service to create, deploy, and manage APIs at any scale. By integrating Amazon Cognito with API Gateway, we can control access to our APIs and secure them using user identities and authentication.

1. **Understanding Cognito Authorization**:

Amazon Cognito allows us to create an identity pool and user pool to manage user identities and permissions. With Cognito Authorization, we can grant specific users or groups access to our APIs and define custom authorization rules for different API methods.

2. **Defining the Cognito User Pool and Identity Pool**:

Before securing our API Gateway with Cognito Authorization, we need to create a Cognito User Pool and an Identity Pool. In our CloudFormation template, we define these resources as follows:

```yaml
CognitoUserPool:
  Type: AWS::Cognito::UserPool
  Properties:
    UserPoolName: MyCognitoUserPool
    # Other properties for user pool configuration

CognitoIdentityPool:
  Type: AWS::Cognito::IdentityPool
  Properties:
    IdentityPoolName: MyCognitoIdentityPool
    AllowUnauthenticatedIdentities: false
    CognitoIdentityProviders:
      - ClientId: !Ref CognitoUserPool.ClientId
        ProviderName: !GetAtt CognitoUserPool.ProviderName
```

In the above template snippet, we create both the Cognito User Pool and Identity Pool. The Identity Pool references the User Pool as an authentication provider.

3. **Defining API Gateway with Cognito Authorization**:

Now, let's take a look at how we can secure our API Gateway using Cognito Authorization:

```yaml
ApiGatewayRestApi:
  Type: AWS::ApiGateway::RestApi
  Properties:
    Name: MySecureAPIGateway
    # Other properties for API Gateway configuration

ApiGatewayAuthorizer:
  Type: AWS::ApiGateway::Authorizer
  Properties:
    Name: CognitoAuthorizer
    Type: COGNITO_USER_POOLS
    IdentitySource: method.request.header.Authorization
    RestApiId: !Ref ApiGatewayRestApi
    ProviderARNs:
      - !GetAtt CognitoUserPool.Arn

ApiGatewayResource:
  Type: AWS::ApiGateway::Resource
  Properties:
    ParentId: !GetAtt ApiGatewayRestApi.RootResourceId
    PathPart: secure

ApiGatewayMethod:
  Type: AWS::ApiGateway::Method
  Properties:
    RestApiId: !Ref ApiGatewayRestApi
    ResourceId: !Ref ApiGatewayResource
    HttpMethod: GET
    AuthorizationType: COGNITO_USER_POOLS
    AuthorizerId: !Ref ApiGatewayAuthorizer
    # Other properties for method configuration
```

In the above CloudFormation resource definitions, we create an API Gateway with the name "MySecureAPIGateway" and an Authorizer named "CognitoAuthorizer." This authorizer is configured to use Cognito User Pools for authentication. The "IdentitySource" property specifies the source of the authorization token (in this case, the "Authorization" header).

4. **Securing API Resources**:

To secure specific resources within our API, we create an API Gateway resource with the path "secure" and a method (e.g., GET) that requires Cognito User Pools for authorization. The "AuthorizationType" and "AuthorizerId" properties in the "ApiGatewayMethod" resource ensure that requests to this endpoint are authorized using Cognito.

5. **Deploying the Secured API Gateway**:

Once the API Gateway is configured with Cognito Authorization, we can deploy it using the Deployment resource provided in the CloudFormation template.

By following these steps, we can secure our Amazon API Gateway using Cognito Authorization. This ensures that only authenticated and authorized users can access specific resources within the API, adding an additional layer of security to our application.