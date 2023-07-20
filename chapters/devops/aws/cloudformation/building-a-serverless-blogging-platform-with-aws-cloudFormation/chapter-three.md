#Chapter 3: Setting up API Gateway with AWS CloudFormation

In this chapter, we will explore the process of setting up an API Gateway using AWS CloudFormation. API Gateway is a fully managed service that allows you to create, publish, maintain, monitor, and secure APIs at any scale. By using CloudFormation to configure API Gateway, you can efficiently define the API's structure, authentication, and integration with other AWS services.

1. **Understanding API Gateway**:

AWS API Gateway acts as a front-door for applications to access data, business logic, or functionality provided by backend services, such as Lambda functions, EC2 instances, or HTTP endpoints. It facilitates the creation of RESTful APIs, WebSocket APIs, and other types of APIs, enabling you to expose your services to external clients or applications securely.

2. **Defining the API Gateway**:

In our CloudFormation template, the API Gateway setup begins with the "ApiGatewayRestApi" resource:

```yaml
ApiGatewayRestApi:
  Type: AWS::ApiGateway::RestApi
  Properties:
    Name: !Ref ApiGatewayRestApiName
    Description: An API to handle administrator methods and resources
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: YourName
      - Key: purpose
        Value: Admin
```

Here, we define the "ApiGatewayRestApi" resource with its name, description, and optional tags. This resource represents the REST API itself and serves as the container for resources and methods.

3. **Creating API Resources**:

API Gateway uses resources to represent the different components of your API, such as URLs and paths. We can create resources like "blog" and "learn" using the "ApiGatewayResourceBlog" and "ApiGatewayResourceLearn" resources:

```yaml
ApiGatewayResourceBlog:
  Type: AWS::ApiGateway::Resource
  Properties:
    RestApiId: !Ref ApiGatewayRestApi
    ParentId: !GetAtt ApiGatewayRestApi.RootResourceId
    PathPart: blog

ApiGatewayResourceLearn:
  Type: AWS::ApiGateway::Resource
  Properties:
    RestApiId: !Ref ApiGatewayRestApi
    ParentId: !GetAtt ApiGatewayRestApi.RootResourceId
    PathPart: learn
```

Each resource is defined with its corresponding path, and we specify the API Gateway to which it belongs using the "!Ref ApiGatewayRestApi" expression.

4. **Creating API Methods**:

After defining the resources, we proceed to create API methods. Methods define the actions that clients can perform on resources. In our template, we have "ApiGatewayMethodBlog" and "ApiGatewayMethodLearn" methods:

```yaml
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

These methods are associated with the "blog" and "learn" resources and are configured to handle HTTP POST requests. The "Integration" section specifies the type of integration and the AWS Lambda function responsible for processing the requests.

5. **API Gateway Stage and Deployment**:

We finalize the API Gateway setup by defining the stage and deployment:

```yaml
ApiGatewayStage:
  Type: AWS::ApiGateway::Stage
  DependsOn: 
    - ApiGatewayRestApi
    - ApiGatewayDeployment
  Properties:
    StageName: Prod
    RestApi