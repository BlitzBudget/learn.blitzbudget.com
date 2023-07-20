#Chapter 13: Configuring API Gateway Methods - Customizing Endpoint Behavior

Key Topics:

1. Introduction to API Gateway Methods:
   - In API Gateway, methods define the actions that can be performed on a resource, such as GET, POST, PUT, DELETE, etc.
   - Each method is associated with a specific HTTP verb and represents an endpoint that clients can call to interact with your API.

2. Configuring API Gateway Methods with AWS CDK:
   - In the provided CDK code, we create API Gateway methods using the `aws-apigateway` module.
   - The methods are associated with Lambda functions to execute the desired serverless code when a request is made.

   Example - Creating an API Gateway Method:
   ```typescript
   import * as apigateway from 'aws-cdk-lib/aws-apigateway';
   import * as lambda from 'aws-cdk-lib/aws-lambda';

   // Inside your CDK Stack constructor
   // Create a Lambda function
   const myLambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
     functionName: 'MyLambdaFunction',
     runtime: lambda.Runtime.NODEJS_14_X,
     handler: 'index.handler',
     code: lambda.Code.fromAsset('lambda'),
   });

   // Create the API Gateway REST API
   const api = new apigateway.RestApi(this, 'MyApi', {
     restApiName: 'My API Gateway',
   });

   // Create a new resource "/my-resource"
   const myResource = api.root.addResource('my-resource');

   // Associate a method (e.g., GET) with the Lambda function
   myResource.addMethod('GET', new apigateway.LambdaIntegration(myLambdaFunction));
   ```
3. Endpoint Customization:
   - Method Request: Customize the request parameters, headers, and query strings before they reach the integration.
   - Integration Request: Transform and map the incoming request before it is sent to the backend integration (e.g., Lambda function).
   - Method Response: Customize the response headers and body before they are sent back to the client.
   - Integration Response: Transform and map the response from the backend integration before it is sent back to the client.

4. Request and Response Mapping Templates:
   - Mapping templates are used in integration requests and responses to transform data between the client and backend.
   - API Gateway supports several mapping templates, including Velocity templates and JSON schemas.

   Example - Using Mapping Templates in Integration Request:
   ```typescript
   import * as apigateway from 'aws-cdk-lib/aws-apigateway';

   // Inside your CDK Stack constructor
   const myIntegration = new apigateway.LambdaIntegration(myLambdaFunction);

   // Associate the integration with the API method
   myResource.addMethod('POST', myIntegration, {
     requestTemplates: {
       'application/json': '{ "statusCode": 200 }',
     },
     integrationResponses: [
       {
         statusCode: '200',
         responseTemplates: {
           'application/json': '{ "message": "Success" }',
         },
       },
     ],
   });
   ```

5. Method Throttling and Rate Limiting:
   - API Gateway allows you to control the rate at which clients can call your methods to prevent abuse and ensure performance.
   - Throttling and rate limiting can be configured using API Gateway usage plans.

6. Method Caching:
   - API Gateway provides caching functionality to reduce the number of requests forwarded to the backend.
   - By enabling caching for specific methods, you can improve the API's responsiveness and reduce latency.

API Gateway methods offer a powerful way to define and customize your API's behavior. By configuring method requests, integration requests, and responses, you can tailor your API's behavior to suit the needs of your application. Additionally, endpoint customization, request and response mapping, and caching capabilities allow you to optimize your API's performance and provide a seamless experience to your clients.