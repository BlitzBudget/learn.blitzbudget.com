#Chapter 5: Integrating Lambda Functions - Executing Serverless Code in AWS

Key Topics:

1. Understanding AWS Lambda:
   - AWS Lambda is a serverless compute service that allows you to run code without managing servers.
   - With Lambda, you can execute code in response to events, such as API calls, file uploads, or database updates.

2. Creating Lambda Functions in AWS CDK:
   - In CDK, you can define and deploy Lambda functions using the `aws-lambda` module.
   - Specify the runtime, memory, timeout, and other configurations for your Lambda function.

   Example:
   ```typescript
   import * as lambda from 'aws-cdk-lib/aws-lambda';

   // Inside your CDK Stack constructor
   const myLambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
     runtime: lambda.Runtime.NODEJS_14_X,
     handler: 'index.handler',
     code: lambda.Code.fromAsset('lambda'),
     memorySize: 256,
     timeout: cdk.Duration.seconds(30),
     functionName: 'MyLambdaFunction',
   });
   ```

3. Triggering Lambda Functions with API Gateway:
   - Connect your Lambda functions to API Gateway to handle HTTP requests.
   - Define `LambdaIntegration` to link your API Gateway methods with the Lambda functions.

   Example:
   ```typescript
   import * as apigateway from 'aws-cdk-lib/aws-apigateway';

   // Inside your CDK Stack constructor
   const apiGateway = new apigateway.RestApi(this, 'MyApiGateway');
   const resource = apiGateway.root.addResource('resource');

   resource.addMethod('GET', new apigateway.LambdaIntegration(myLambdaFunction));
   resource.addMethod('POST', new apigateway.LambdaIntegration(myLambdaFunction));
   ```

4. Using Lambda Triggers:
   - Lambda functions can act as triggers for various AWS services.
   - For example, you can use Lambda as an S3 event trigger to execute code whenever a new object is uploaded to an S3 bucket.

   Example:
   ```typescript
   import * as s3 from 'aws-cdk-lib/aws-s3';

   // Inside your CDK Stack constructor
   const bucket = new s3.Bucket(this, 'MyBucket');
   bucket.addObjectCreatedNotification(new s3.LambdaDestination(myLambdaFunction));
   ```

5. Event Sources for Lambda Functions:
   - Lambda supports various event sources, including S3, DynamoDB, SNS, CloudWatch, and more.
   - These event sources can trigger Lambda functions automatically, allowing you to build event-driven architectures.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myLambdaFunction.addEventSourceMapping('S3EventSource', {
     batchSize: 5,
     events: [s3.EventType.OBJECT_CREATED],
     startingPosition: lambda.StartingPosition.TRIM_HORIZON,
     eventSourceArn: bucket.bucketArn,
   });
   ```

6. Managing Permissions for Lambda Functions:
   - Lambda functions require permissions to interact with other AWS resources.
   - Use IAM roles to grant necessary permissions to Lambda functions.

   Example:
   ```typescript
   import * as iam from 'aws-cdk-lib/aws-iam';

   // Inside your CDK Stack constructor
   const lambdaRole = new iam.Role(this, 'LambdaRole', {
     assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
   });

   lambdaRole.addToPolicy(new iam.PolicyStatement({
     actions: ['s3:GetObject'],
     resources: [bucket.bucketArn],
   }));

   myLambdaFunction.role = lambdaRole;
   ```

7. Error Handling in Lambda Functions:
   - Proper error handling is crucial for Lambda functions to maintain reliability.
   - Use try-catch blocks and log errors to CloudWatch or other monitoring systems.

   Example:
   ```typescript
   // Inside your Lambda function code
   exports.handler = async (event) => {
     try {
       // Your Lambda function logic
     } catch (error) {
       console.error('Error:', error);
       throw error;
     }
   };
   ```

8. Managing Versions and Aliases:
   - Lambda functions can have multiple versions and aliases.
   - Versioning and aliases allow you to deploy and manage different variations of your Lambda functions.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   const version = myLambdaFunction.addVersion('Version1');
   const alias = new lambda.Alias(this, 'Alias', {
     aliasName: 'prod',
     version,
   });
   ```

9. Monitoring and Logging Lambda Functions:
   - AWS Lambda provides built-in monitoring and logging through CloudWatch.
   - Use CloudWatch metrics and logs to monitor and troubleshoot your Lambda functions.

   Example:
   ```
   // Enable logging for Lambda function
   myLambdaFunction.logRetention = logs.RetentionDays.ONE_WEEK;

   // Access CloudWatch metrics
   aws lambda get-metric-statistics --metric-name Duration --namespace AWS/Lambda --statistics Average --dimensions FunctionName=MyLambdaFunction --start-time 2023-07-01T00:00:00Z --end-time 2023-07-02T00:00:00Z --period 300
   ```

10. Optimizing Lambda Function Performance:
    - To achieve better performance, consider factors like memory allocation and code optimization.
    - Higher memory allocation can improve the execution time and cost-effectiveness of Lambda functions.

    Example:
    ```typescript
    // Inside your CDK Stack constructor
    myLambdaFunction.currentVersion.addAlias('v2', {
      additionalVersions: [myLambdaFunction],
      provisionedConcurrentExecutions: 2,
    });
    ```

These key topics will help you understand how to use AWS Lambda efficiently with AWS CDK and build serverless applications that respond to various events and triggers in the AWS ecosystem.