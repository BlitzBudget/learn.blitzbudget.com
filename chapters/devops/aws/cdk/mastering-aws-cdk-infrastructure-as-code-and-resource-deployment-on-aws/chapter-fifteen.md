#Chapter 15: Creating a Lambda Subscription - Receiving Notifications on Resource Changes

Key Topics:

1. Introduction to AWS Simple Notification Service (SNS):
   - AWS Simple Notification Service (SNS) is a fully managed messaging service that enables the publishing and subscribing to messages, notifications, and alerts.
   - SNS provides a flexible and scalable way to send messages to a large number of subscribers simultaneously, using various delivery protocols.

2. Integrating AWS Lambda with SNS:
   - AWS Lambda allows you to execute code in response to events and triggers, such as S3 bucket changes, API Gateway requests, or database updates.
   - By integrating Lambda with SNS, you can easily invoke Lambda functions whenever a new message is published to an SNS topic.

   Example - Creating an SNS Topic:
   ```typescript
   import * as sns from 'aws-cdk-lib/aws-sns';

   // Inside your AWS CDK Stack constructor
   const groupNotificationTopic = new sns.Topic(this, 'GroupNotificationTopic', {
     displayName: 'Notification for Resource Changes',
     topicName: 'admin-resource-notification',
   });
   ```

3. Subscribing Lambda Functions to SNS Topics:
   - Once you have created an SNS topic, you can subscribe Lambda functions to receive notifications on resource changes or events of interest.
   - In the provided CDK code, we demonstrate how to subscribe Lambda functions to the SNS topic for various resource changes.

   Example - Subscribing a Lambda Function to SNS:
   ```typescript
   import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';

   // Inside your AWS CDK Stack constructor
   // Lambda function for processing resource changes
   const lambdaFunction = new lambda.Function(this, 'ResourceChangeLambda', {
     // Lambda function configuration
   });

   // Create a Lambda subscription and add it to the SNS topic's subscriptions
   const subscriptionPolicy = new subscriptions.LambdaSubscription(lambdaFunction);
   groupNotificationTopic.addSubscription(subscriptionPolicy);
   ```

4. Customizing the Subscription Filter Policy:
   - SNS allows you to apply subscription filter policies to control which messages are delivered to subscribers.
   - Subscription filter policies enable you to filter messages based on attributes or message content.

   Example - Applying Subscription Filter Policy:
   ```typescript
   // Inside your AWS CDK Stack constructor
   // Define the filter policy object
   const addFilterPolicy: { [key: string]: sns.SubscriptionFilter } = {
     'ResourceType': sns.SubscriptionFilter.stringFilter({
       allowlist: ['S3Bucket', 'DynamoDBTable'], // Allow specific resource types
     }),
     'ResourceAction': sns.SubscriptionFilter.stringFilter({
       allowlist: ['Create', 'Update', 'Delete'], // Allow specific resource actions
     }),
   };

   // Create a Lambda subscription with the filter policy
   const subscriptionPolicy = new subscriptions.LambdaSubscription(lambdaFunction, {
     filterPolicy: addFilterPolicy,
   });

   // Add the subscription to the SNS topic
   groupNotificationTopic.addSubscription(subscriptionPolicy);
   ```

5. Handling Dead Letter Queues for SNS Subscriptions:
   - You can configure a Dead Letter Queue (DLQ) to capture failed Lambda function executions or messages that cannot be delivered to subscribers.
   - DLQs help you troubleshoot and process messages that encounter errors or are undeliverable.

   Example - Configuring Dead Letter Queue for Lambda Subscriptions:
   ```typescript
   import * as sqs from 'aws-cdk-lib/aws-sqs';

   // Inside your AWS CDK Stack constructor
   // Create a Dead Letter Queue
   const deadLetterQueue = new sqs.Queue(this, 'DeadLetterQueue', {
     queueName: 'MyDLQ',
   });

   // Create the Lambda subscription with the Dead Letter Queue
   const subscriptionPolicy = new subscriptions.LambdaSubscription(lambdaFunction, {
     deadLetterQueue,
   });

   // Add the subscription to the SNS topic
   groupNotificationTopic.addSubscription(subscriptionPolicy);
   ```

6. Monitoring and Logging Lambda Subscriptions:
   - Monitoring Lambda subscriptions involves setting up CloudWatch metrics and alarms to track the performance of your Lambda functions.
   - Use CloudWatch Logs to capture Lambda function logs and monitor the processing of SNS notifications.

By integrating AWS Lambda with AWS SNS, you can create powerful event-driven architectures that efficiently handle resource changes and trigger Lambda functions to process those changes. The flexibility of SNS allows you to customize subscription filter policies, ensuring that only relevant messages are delivered to your subscribers. Configuring Dead Letter Queues provides a safety net to capture and manage failed Lambda executions and undeliverable messages. Monitoring and logging Lambda subscriptions using CloudWatch metrics and logs enables you to gain insights into the performance and processing of SNS notifications.