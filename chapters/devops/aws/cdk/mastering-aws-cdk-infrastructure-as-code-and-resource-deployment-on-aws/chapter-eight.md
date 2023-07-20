#Chapter 8: Using SNS for Notifications - Publish and Subscribe to Events

Key Topics:

1. Amazon SNS Overview:
   - Amazon SNS (Simple Notification Service) is a fully managed pub/sub messaging service provided by AWS.
   - It enables you to send messages or notifications to distributed systems and microservices.

2. Creating an SNS Topic with AWS CDK:
   - In CDK, you can create an SNS topic using the `aws-sns` module.
   - An SNS topic serves as a communication channel where messages can be published and delivered to subscribers.

   Example:
   ```typescript
   import * as sns from 'aws-cdk-lib/aws-sns';

   // Inside your CDK Stack constructor
   const notificationTopic = new sns.Topic(this, 'NotificationTopic', {
     displayName: 'My Notification Topic',
     topicName: 'my-notification-topic',
   });
   ```

3. Subscribing to an SNS Topic:
   - Subscribers receive messages published to an SNS topic based on their preferred communication protocols (e.g., email, SMS, Lambda, HTTP, etc.).
   - To subscribe, you need to provide an endpoint or an ARN depending on the type of subscription.

   Example - Email Subscription:
   ```typescript
   // Inside your CDK Stack constructor
   notificationTopic.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.EMAIL,
     endpoint: 'example@example.com',
   }));
   ```

   Example - Lambda Subscription:
   ```typescript
   // Inside your CDK Stack constructor
   notificationTopic.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: myLambdaFunction.functionArn,
   }));
   ```

4. Publishing Messages to an SNS Topic:
   - You can publish messages to an SNS topic using the AWS SDK or SDK clients for various platforms.
   - Once published, SNS delivers the message to all its subscribers based on their subscription preferences.

   Example - Publishing from Node.js:
   ```javascript
   const AWS = require('aws-sdk');
   const sns = new AWS.SNS();

   const params = {
     Message: 'Hello, this is a test message!',
     TopicArn: 'arn:aws:sns:us-east-1:123456789012:my-notification-topic',
   };

   sns.publish(params, (err, data) => {
     if (err) console.error('Error publishing message:', err);
     else console.log('Message published:', data.MessageId);
   });
   ```

5. Filtering Messages with Subscription Filter Policies:
   - SNS allows you to filter messages using subscription filter policies.
   - Subscribers will only receive messages that match the specified filter criteria.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   notificationTopic.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: myLambdaFunction.functionArn,
     filterPolicy: {
       'attribute1': sns.SubscriptionFilter.stringFilter({
         whitelist: ['value1', 'value2'],
       }),
       'attribute2': sns.SubscriptionFilter.numericFilter({
         greaterThan: 100,
       }),
     },
   }));
   ```

6. Managing SNS Access Control:
   - You can control access to SNS topics using AWS Identity and Access Management (IAM).
   - Use IAM policies to grant permissions for topics and subscriptions to specific users or roles.

   Example - Adding IAM Policy to Topic:
   ```typescript
   // Inside your CDK Stack constructor
   notificationTopic.addToResourcePolicy(new iam.PolicyStatement({
     effect: iam.Effect.ALLOW,
     actions: ['sns:Publish'],
     principals: [new iam.AccountRootPrincipal()],
     resources: [notificationTopic.topicArn],
   }));
   ```

7. Fanout Pattern with SNS:
   - The fanout pattern is a common use case in SNS where a single message is sent to a topic, and multiple subscribers receive their copies of the message.
   - It enables easy decoupling and scaling of microservices.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   const topicA = new sns.Topic(this, 'TopicA');
   const topicB = new sns.Topic(this, 'TopicB');

   topicA.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: lambdaFunctionA.functionArn,
   }));

   topicA.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: lambdaFunctionB.functionArn,
   }));

   topicA.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: lambdaFunctionC.functionArn,
   }));

   topicA.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: lambdaFunctionD.functionArn,
   }));

   topicB.addSubscription(new sns.Subscription({
     protocol: sns.SubscriptionProtocol.LAMBDA,
     endpoint: lambdaFunctionE.functionArn,
   }));
   ```

Amazon SNS simplifies the process of sending and receiving notifications or messages across distributed systems. By understanding how to create topics, subscribe to them, publish messages, and apply filtering, you can build scalable and event-driven architectures for your applications using AWS CDK. With its flexibility and ease of use, SNS becomes a powerful tool for enabling communication between microservices and decoupling your application components.