Chapter 1: Introduction to AWS CDK - Getting Started with Infrastructure as Code

Key Topics:

1. Understanding Infrastructure as Code (IaC):
   - Infrastructure as Code (IaC) is a method of managing cloud resources using code instead of manual configurations. It allows developers to define and create infrastructure in a consistent and repeatable manner.
   - With IaC, we can use programming languages to describe the desired state of our cloud resources. This approach ensures that our infrastructure is version-controlled and easily auditable.
   - The benefits of IaC include faster and more reliable deployments, reduced risk of human errors, and the ability to track changes to infrastructure over time.

2. The Advantages of AWS CDK:
   - AWS CDK (Cloud Development Kit) is a tool that simplifies the creation and management of cloud resources on Amazon Web Services (AWS).
   - Unlike other IaC tools that use domain-specific languages, AWS CDK allows developers to use familiar programming languages like TypeScript, Python, Java, and others to define their infrastructure.
   - This advantage of AWS CDK makes it easier for developers to adopt and leverage their existing skills to create cloud resources more efficiently.

3. Installing and Setting Up AWS CDK:
   - To get started with AWS CDK, you'll need to install the necessary software and set up your AWS credentials.
   - You can install AWS CDK by following simple instructions for your operating system.
   - After installation, you need to configure your AWS credentials, so CDK can interact with your AWS account securely.

4. Building Your First AWS CDK Application:
   - Creating your first AWS CDK application involves setting up a new project and defining the resources you want to create on AWS.
   - This process is similar to starting a new software project, but instead of writing code for an application, you'll be writing code to describe cloud resources.
   - AWS CDK provides constructs that represent different types of resources like S3 buckets, DynamoDB tables, and more.

5. Defining Infrastructure Components as Code:
   - When defining infrastructure with AWS CDK, you'll use code to declare the desired resources and their configurations.
   - For example, you can use code to define an S3 bucket with specific settings like access permissions and encryption options.
   - CDK provides a variety of constructs, each representing different AWS resources, making it easy to create and configure your infrastructure.

6. Deploying AWS CDK Stacks:
   - After defining your infrastructure using AWS CDK, you can deploy it to AWS using CDK's deployment feature.
   - During the deployment process, AWS CDK will create the specified resources based on your code's definitions.
   - If you make changes to your code, CDK allows you to easily update your infrastructure without manual intervention.

7. Common CDK Constructs and Patterns:
   - AWS CDK offers a wide range of constructs that simplify the process of creating common AWS resources.
   - These constructs encapsulate complex configurations and make it easier for developers to manage their infrastructure.
   - Using reusable patterns, developers can organize and structure their code to ensure scalability and maintainability.

8. Overview of AWS CDK Libraries:
   - AWS CDK libraries are collections of pre-built constructs and patterns contributed by the AWS community.
   - Developers can browse and select from a variety of libraries to enhance their infrastructure with additional functionality.
   - Additionally, developers can contribute to existing libraries or create their own libraries to share with others.

By exploring these key topics, you'll gain a clear understanding of AWS CDK and its significance in simplifying cloud resource management using familiar programming languages. With AWS CDK, you can efficiently create and manage your infrastructure as code on Amazon Web Services.

Here is the CDK template that we would create at the end of this course but not limited to the contents of this template. We will also diverge a little and choose some interesting topics. 

```
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import * as crypto from 'crypto';

export interface AdminAPIProps extends cdk.StackProps {
  hostedZoneId: string;
  domainName: string;
  apiGatewayRestApiName: string;
  s3LearnBucketName: string;
  s3BlogBucketName: string;
  certificateArn: string;
  deadLetterTopicArn: string;
  tableName: string;
  audioBucketName: string;
  adminDashboardDomainName: string;
}

const audioContentLambdaFunctionName = 'AdminCreateAudioContentProcessor';

export class AdminAPIResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AdminAPIProps) {
    super(scope, id, props);

    const domainName = props.domainName;
    const { api } = this.createAPIResources(props);

    // Create SNS topic to notify the users about the new data
    const groupNotificationTopic = new sns.Topic(this, 'Notification', {
      displayName: domainName + ' Notification',
      topicName: 'admin-resource-notification',
    });

    // Fetch the s3 bucket
    const { lambdaFunction } = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3LearnBucketName,
      'AdminAddLearnBlogProcessor'
    );
    const blogLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3BlogBucketName,
      'AdminAddBlogBlogProcessor'
    );
    const deleteBlogLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3BlogBucketName,
      'AdminDeleteBlogBlogProcessor'
    );
    const deleteLearnLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3LearnBucketName,
      'AdminDeleteLearnBlogProcessor'
    );
    const categorizeBlogLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3BlogBucketName,
      'AdminCategorizeBlogProcessor'
    );
    const categorizeLearnLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3LearnBucketName,
      'AdminCategorizeLearnProcessor'
    );
    const createAudioContentLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3BlogBucketName,
      audioContentLambdaFunctionName
    );
    const deleteCategorizeBlogLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3BlogBucketName,
      'AdminDeleteCategorizeBlogProcessor'
    );
    const deleteCategorizeLearnLambdaFunctionAndRole = this.createLambdaFunctionAndRole(
      domainName,
      props,
      groupNotificationTopic,
      props.s3LearnBucketName,
      'AdminDeleteCategorizeLearnProcessor'
    );

    // Add additional custom managed policies to lambda functions
    this.additionalPermissionsForAudioLambda(createAudioContentLambdaFunctionAndRole, props);

    // Create an API Gateway method "POST" and link it with the Lambda function
    const learAPIResource = this.createAPIMethodAndUsagePlan(api.root, 'learn-blitzbudget-com', lambdaFunction, props, api);
    const blogAPIResource = this.createAPIMethodAndUsagePlan(api.root, 'blog-blitzbudget-com', blogLambdaFunctionAndRole.lambdaFunction, props, api);
    this.createAPIMethodAndUsagePlan(blogAPIResource.apiResource, 'delete', deleteBlogLambdaFunctionAndRole.lambdaFunction, props, api);
    this.createAPIMethodAndUsagePlan(learAPIResource.apiResource, 'delete', deleteLearnLambdaFunctionAndRole.lambdaFunction, props, api);

    // Create a Lambda subscription and add it to the topic's subscriptions
    this.createSubscriptionPolicy(categorizeBlogLambdaFunctionAndRole.lambdaFunction, props.s3BlogBucketName, groupNotificationTopic);
    this.createSubscriptionPolicy(categorizeLearnLambdaFunctionAndRole.lambdaFunction, props.s3LearnBucketName, groupNotificationTopic);
    this.createSubscriptionPolicy(deleteCategorizeBlogLambdaFunctionAndRole.lambdaFunction, props.s3BlogBucketName, groupNotificationTopic, true);
    this.createSubscriptionPolicy(deleteCategorizeLearnLambdaFunctionAndRole.lambdaFunction, props.s3LearnBucketName, groupNotificationTopic, true);
    this.createAudioSubscriptionPolicy(createAudioContentLambdaFunctionAndRole, groupNotificationTopic);
  }

  
    private additionalPermissionsForAudioLambda(createAudioContentLambdaFunctionAndRole: { lambdaFunction: cdk.aws_lambda.Function; lambdaRole: cdk.aws_iam.Role; }, props: AdminAPIProps) {
        createAudioContentLambdaFunctionAndRole.lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonPollyReadOnlyAccess'));
        const existingBucket = s3.Bucket.fromBucketName(this, audioContentLambdaFunctionName + 'ExistingBucket' + props.s3LearnBucketName, props.s3LearnBucketName);
        const audioBucket = s3.Bucket.fromBucketName(this, audioContentLambdaFunctionName + 'ExistingBucket' + props.audioBucketName, props.audioBucketName);
        // Allow the Lambda function to put objects in the S3 bucket
        existingBucket.grantReadWrite(createAudioContentLambdaFunctionAndRole.lambdaRole);
        audioBucket.grantReadWrite(createAudioContentLambdaFunctionAndRole.lambdaRole);
    }

    private createAudioSubscriptionPolicy(createAudioContentLambdaFunctionAndRole: { lambdaFunction: cdk.aws_lambda.Function; }, groupNotificationTopic: cdk.aws_sns.Topic) {
        // Define the filter policy object
        const addFilterPolicy: { [key: string]: sns.SubscriptionFilter; } = {
            'CreateAudio': sns.SubscriptionFilter.stringFilter({
                allowlist: ["true"],
            }),
        };
        const subscriptionPolicy = new subscriptions.LambdaSubscription(createAudioContentLambdaFunctionAndRole.lambdaFunction, {
            filterPolicy: addFilterPolicy,
        });

        groupNotificationTopic.addSubscription(subscriptionPolicy);
    }

    private createSubscriptionPolicy(lambdaFunction: cdk.aws_lambda.Function, bucketName: string, groupNotificationTopic: cdk.aws_sns.Topic, deleted: boolean = false) {
        // Define the filter policy object
        const addFilterPolicy: { [key: string]: sns.SubscriptionFilter } = {
            'Bucket': sns.SubscriptionFilter.stringFilter({
                allowlist: [bucketName],
            }),
        };

        if (deleted) {
            addFilterPolicy['Deleted'] = sns.SubscriptionFilter.stringFilter({
                allowlist: ["true"],
            });
        }

        const subscriptionPolicy = new subscriptions.LambdaSubscription(lambdaFunction, {
            filterPolicy: addFilterPolicy,
        });

        groupNotificationTopic.addSubscription(subscriptionPolicy);
    }

    private createAPIMethodAndUsagePlan(resource: apigateway.IResource, resourceName: string, lambdaFunction: cdk.aws_lambda.Function, props: AdminAPIProps, api: cdk.aws_apigateway.RestApi) {
        // Create an API Gateway resource "/learn-blitzbudget-com"
        const apiResource = resource.addResource(resourceName);
        apiResource.addMethod('POST', new apigateway.LambdaIntegration(lambdaFunction), {
            apiKeyRequired: true,
        });
        // Add OPTIONS method to the API Gateway resource
        apiResource.addMethod('OPTIONS', this.mockOptionsIntegration(props), {
            methodResponses: [
                {
                    statusCode: '200',
                    responseParameters: {
                        'method.response.header.Access-Control-Allow-Headers': true,
                        'method.response.header.Access-Control-Allow-Methods': true,
                        'method.response.header.Access-Control-Allow-Origin': true,
                    },
                },
            ],
        });

        // Create a Lambda permission for API Gateway to invoke the Lambda function
        const lambdaPermission = new lambda.CfnPermission(this, resourceName + crypto.randomBytes(8).toString('hex') + 'LambdaPermission', {
            action: 'lambda:InvokeFunction',
            functionName: lambdaFunction.functionArn,
            principal: 'apigateway.amazonaws.com',
            sourceArn: api.arnForExecuteApi(),
        });

        // Add tags to the Lambda Permission
        cdk.Tags.of(lambdaPermission).add('site', "admin.api.blitzbudget.com");
        cdk.Tags.of(lambdaPermission).add('author', Config.author);

        return { apiResource }
    }

    private createAPIResources(props: AdminAPIProps) {
        const certificateArn = props.certificateArn;
        const domainName = props.domainName;
        const certificate = acm.Certificate.fromCertificateArn(this, domainName + 'Certificate', certificateArn);

        const apiGatewayDomainName = new apigateway.DomainName(this, domainName + 'ApiGatewayDomainName', {
            domainName: props.domainName,
            certificate,
            endpointType: apigateway.EndpointType.EDGE,
        });

        // Inside the constructor of your this class
        const api = new apigateway.RestApi(this, domainName + 'ApiGatewayRestApi', {
            restApiName: props.apiGatewayRestApiName,
            description: 'An API to handle administrator methods and resources',
        });

        // Add the base mapping
        apiGatewayDomainName.addBasePathMapping(api);

        // Create a usage plan
        const usagePlan = api.addUsagePlan('MyUsagePlan', {
            name: props.domainName + 'UsagePlan',
            description: props.domainName + ' Usage plan for My API',
            throttle: {
                rateLimit: 2000,
                burstLimit: 1000,
            },
            quota: {
                limit: 10000,
                period: apigateway.Period.MONTH,
            },
        });

        // Create an API key
        const apiKey = api.addApiKey('MyApiKey');

        // Associate the API key with the usage plan
        usagePlan.addApiKey(apiKey);

        // Grant the usage plan access to the API
        usagePlan.addApiStage({
            api: api,
            stage: api.deploymentStage,
        });


        // Create a hosted zone object using the hosted zone ID
        const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
            hostedZoneId: props.hostedZoneId,
            zoneName: props.domainName,
        });

        // Create a A record in Route 53 for the custom domain name
        new route53.ARecord(this, domainName + 'ApiCaRecord', {
            zone: hostedZone,
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGatewayDomain(apiGatewayDomainName)),
            comment: 'API Gateway A Record for ' + domainName,
        });

        // Add tags to the API
        cdk.Tags.of(api).add('site', "admin.api.blitzbudget.com");
        cdk.Tags.of(api).add('author', Config.author);
        // Add tags to the Domain NAme
        cdk.Tags.of(apiGatewayDomainName).add('site', "admin.api.blitzbudget.com");
        cdk.Tags.of(apiGatewayDomainName).add('author', Config.author);

        return { api };
    }

    private createLambdaFunctionAndRole(domainName: string, props: AdminAPIProps, groupNotificationTopic: sns.Topic, bucketName: string, functionName: string) {
        const existingBucket = s3.Bucket.fromBucketName(this, functionName + 'ExistingBucket', bucketName);

        // Fetch the s3 code bucket
        const existingCodeBucket = s3.Bucket.fromBucketName(this, functionName + 'ExistingCodeBucket', 'sample-project-for-cloudformation');

        // Fetch the Dead Letter Queue
        const deadLetterQueue = sns.Topic.fromTopicArn(this, functionName + 'DeadLetterTopic', props.deadLetterTopicArn);

        // DynamoDB Table to store the data
        const existingTable = dynamodb.Table.fromTableName(this, functionName + 'ExistingTable', props.tableName);

        // Create IAM Role for the lambda function
        const lambdaRole = this.createLambdaRole(existingBucket, existingTable, groupNotificationTopic, deadLetterQueue, props, functionName);

        const lambdaFunction = new lambda.Function(this, functionName, {
            functionName: functionName,
            description: domainName + ' Add ' + functionName,
            runtime: lambda.Runtime.GO_1_X,
            memorySize: 512,
            timeout: cdk.Duration.seconds(10),
            retryAttempts: 0,
            handler: 'main',
            code: lambda.Code.fromBucket(existingCodeBucket, 'golang-sample.zip'),
            environment: {
                S3_BUCKET_NAME: existingBucket.bucketName,
                DYNAMODB_TABLE_NAME: existingTable.tableName,
                SNS_TOPIC_ARN: groupNotificationTopic.topicArn,
                S3_AUDIO_BUCKET_NAME: props.audioBucketName,
            },
            role: lambdaRole,
            deadLetterTopic: deadLetterQueue,
        });

        // Add CloudWatch logs permission to the Lambda function's role
        const logGroupArn = `arn:aws:logs:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:log-group:/aws/lambda/${lambdaFunction.functionName}:*`;
        const createLogGroupStatement = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
            resources: [logGroupArn],
        })

        lambdaFunction.role?.attachInlinePolicy(
            new iam.Policy(this, functionName + 'createLogGroupPolicy', {
                statements: [createLogGroupStatement],
            }),
        );

        // Add tags to the Lambda Function
        cdk.Tags.of(lambdaFunction).add('site', "admin.api.blitzbudget.com");
        cdk.Tags.of(lambdaFunction).add('author', Config.author);
        // Add tags to the Lambda Role
        cdk.Tags.of(lambdaRole).add('site', "admin.api.blitzbudget.com");
        cdk.Tags.of(lambdaRole).add('author', Config.author);

        return { lambdaFunction, lambdaRole };
    }

    private createLambdaRole(bucket: s3.IBucket, dynamoTable: dynamodb.ITable, groupNotificationTopic: sns.Topic, deadLetterTopic: sns.ITopic, props: AdminAPIProps, functionName: string): iam.Role {
        // Create an IAM role for the Lambda function
        const lambdaRole = new iam.Role(this, functionName + 'Role', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            description: functionName + "Lambda Function Role",
            roleName: functionName + "LambdaFunctionRole",
        });

        // Add additional permissions
        dynamoTable.grantWriteData(lambdaRole);
        groupNotificationTopic.grantPublish(lambdaRole);
        deadLetterTopic.grantPublish(lambdaRole);
        // Allow the Lambda function to put objects in the S3 bucket
        bucket.grantReadWrite(lambdaRole);

        return lambdaRole
    }


    private mockOptionsIntegration(props: AdminAPIProps): apigateway.MockIntegration {
        return new apigateway.MockIntegration({
            integrationResponses: [
                {
                    statusCode: '200',
                    responseParameters: {
                        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
                        'method.response.header.Access-Control-Allow-Methods': "'GET,POST,OPTIONS'",
                        'method.response.header.Access-Control-Allow-Origin': "'" + props.adminDashboardDomainName + "'",
                    },
                },
            ],
            passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_MATCH,
            requestTemplates: {
                'application/json': '{"statusCode": 200}',
            },
        });
    }
}
```