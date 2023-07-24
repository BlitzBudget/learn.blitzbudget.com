# Chapter 10: Subscribing to Amazon SNS and Triggering a Lambda Function

In this chapter, we'll explore how to subscribe to an Amazon Simple Notification Service (SNS) topic and trigger a Lambda function written in Node.js when a new message is published to the topic. Subscribing to an SNS topic allows you to receive notifications and perform specific actions based on the messages sent to the topic.

By combining the power of SNS and Lambda, you can create sophisticated event-driven architectures that respond to various events and trigger actions in real-time. This enables you to build scalable and responsive applications that can adapt to changing conditions and user interactions.

## Understanding SNS Subscriptions

Before we proceed with the example, let's briefly understand SNS subscriptions. When you subscribe to an SNS topic, you're indicating that you want to receive messages published to that topic. SNS supports multiple subscription types, such as Lambda, HTTP/HTTPS, email, SMS, mobile push notifications, and more.

For this chapter, we'll focus on subscribing to an SNS topic using a Lambda function. This means that when a new message is published to the topic, the Lambda function will be automatically invoked to process the message and execute your custom logic.

## Prerequisites

Before we dive into the example, ensure you have the following prerequisites in place:

1. An AWS account with the necessary permissions to create and manage resources like SNS and Lambda.

2. The AWS CLI installed and configured on your development machine. If you haven't set up the AWS CLI yet, refer to Chapter 2 for instructions.

3. Node.js and npm (Node Package Manager) installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

4. Basic knowledge of JavaScript and Node.js.

5. An existing SNS topic that you want to subscribe to. If you haven't created an SNS topic yet, refer to Chapter 9 for instructions on how to create one.

## Creating a Lambda Function for SNS Subscription

The first step is to create a Lambda function that will be triggered when a new message is published to the SNS topic.

1. Open the AWS Management Console and navigate to the Lambda service.

2. Click on "Create function."

3. Choose the "Author from scratch" option.

4. Provide a name for your function (e.g., "MySnsSubscriber").

5. Choose "Node.js" as the runtime.

6. In the "Permissions" section, choose "Use an existing role" and select the IAM role that has the necessary permissions to execute Lambda functions and access the SNS topic.

7. Click on "Create function" to create the Lambda function.

Once the function is created, you'll be redirected to the Lambda function's configuration page. Here, you can add the code for the Lambda function and set up the SNS trigger.

## Setting up SNS Trigger for Lambda Function

Now that we have created the Lambda function, let's configure the SNS trigger.

1. Scroll down to the "Add triggers" section on the Lambda function configuration page and click on the "SNS" trigger.

2. In the "Configure triggers" popup, choose the SNS topic you want to subscribe to.

3. Click on "Add" to add the SNS trigger to the Lambda function.

The Lambda function is now subscribed to the SNS topic, and it will be invoked automatically whenever a new message is published to the topic.

## Processing Messages in the Lambda Function

With the Lambda function set up as an SNS subscriber, let's write the code to process the incoming messages.

Create a new file named `snsSubscriber.js` and add the following code:

```javascript
// snsSubscriber.js
exports.handler = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;
  console.log('Received message:', message);

  // Add your custom logic here to process the message
};
```

In this code, we extract the message from the `event` object, which is automatically passed to the Lambda function by SNS when a new message is published to the topic. We then log the received message to the console.

At this point, the Lambda function is ready to process incoming messages from the SNS topic.

## Testing the SNS Subscription

To test the SNS subscription and trigger the Lambda function, follow these steps:

1. Open the AWS Management Console and navigate to the SNS service.

2. Click on "Topics" in the left navigation pane.

3. Select the SNS topic to which you subscribed the Lambda function.

4. Click on "Publish message."

5. In the "Message details" section, provide a subject and message body for the test message.

6. Click on "Publish message" to publish the message to the topic.

7. Check the CloudWatch Logs for your Lambda function to see the log output, including the received message.

Congratulations! You have successfully subscribed to an SNS topic and triggered a Lambda function in response to a published message.

## Real-World Use Cases

Subscribing to an SNS topic and triggering Lambda functions opens up a world of possibilities for real-world use cases:

1. **Notification and Alerting:** Use SNS to notify users or administrators about critical events or system changes. For example, you can subscribe an email endpoint to an SNS topic to receive alerts when certain conditions are met.

2. **Event-Driven Workflows:** Create event-driven workflows by chaining multiple Lambda functions together through SNS topics. Each function can process the message and trigger subsequent actions based on the outcome.

3. **Distributed Architecture:** Use SNS to decouple components in a distributed architecture. For example, when a new record is added to a database, the Lambda function subscribed to the SNS topic can process the data and update other components accordingly.

4. **Mobile Push Notifications:** Use SNS to send mobile push notifications to Android and iOS devices. By subscribing mobile endpoints to an SNS topic, you can easily send notifications to multiple devices simultaneously.

## Cleanup

After testing the SNS subscription and trigger, it's essential to clean up the resources to avoid unnecessary costs.

1. Open the AWS Management Console and navigate to the Lambda service.

2. Select the Lambda function you created for the SNS subscription.

3. Click on "Delete" to remove the Lambda function.

4. Open the AWS Management Console and navigate to the SNS service.

5. Select the SNS topic to which you subscribed the Lambda function.

6. Click on "Delete topic" to remove the SNS topic.

By cleaning up these resources, you ensure that you won't be billed for unused resources in your AWS account.

## Conclusion

In this chapter, we explored how to subscribe to an Amazon SNS topic and trigger a Lambda function in response to a new message being published. We set up a Lambda function as an SNS subscriber, processed incoming messages, and executed custom logic based on the content of the messages.

Subscribing to SNS topics and triggering Lambda functions opens up a wide range of possibilities for building scalable and responsive serverless applications. By leveraging SNS's pub/sub messaging model, you can easily integrate different components of your architecture and create event-driven workflows that respond to real-time events and user interactions.

In the next chapter, we'll delve into handling S3 events with Node.js Lambdas, where we'll explore how to set up

 S3 event triggers and process data from S3 buckets using serverless Node.js functions. Stay tuned for more exciting tutorials and examples!