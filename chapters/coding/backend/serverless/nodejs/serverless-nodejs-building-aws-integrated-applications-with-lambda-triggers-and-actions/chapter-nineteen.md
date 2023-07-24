# Chapter 19: Sending SMS with Node.js Lambda Function using SNS

SMS (Short Message Service) messages are a convenient way to send instant notifications, alerts, or OTP (One-Time Passwords) to users. In this chapter, we'll explore how to create a Node.js Lambda function that sends SMS messages using Amazon SNS (Simple Notification Service).

## Introduction to Amazon SNS

Amazon SNS is a fully managed pub/sub (publish/subscribe) messaging service provided by AWS. It enables you to send messages or notifications to multiple recipients or subscribers through various communication channels, including SMS, email, and mobile push notifications.

## Prerequisites

Before we start, make sure you have the following prerequisites:

1. An AWS account with appropriate permissions to create Lambda functions and use Amazon SNS.

2. Node.js and npm installed on your local development machine.

3. A verified phone number for SMS delivery in Amazon SNS. You can verify phone numbers in the AWS Management Console.

## Step-by-Step: Creating a Node.js Lambda Function to Send SMS

In this section, we'll guide you through the process of creating a serverless Node.js Lambda function that sends SMS messages using Amazon SNS.

### Step 1: Set Up the Node.js Project

1. Create a new directory for your Node.js Lambda function project and navigate to it.

```bash
mkdir send-sms-lambda
cd send-sms-lambda
```

2. Initialize a new Node.js project and install the necessary dependencies.

```bash
npm init -y
npm install aws-sdk --save
```

### Step 2: Implement the Lambda Function

Create a new file named `index.js` in your project directory and implement the Lambda function code as follows:

```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });

exports.handler = async (event, context) => {
  try {
    // Send the SMS using Amazon SNS
    await sendSMS();

    return {
      statusCode: 200,
      body: JSON.stringify('SMS sent successfully.'),
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error sending SMS.'),
    };
  }
};

async function sendSMS() {
  // Create the SMS parameters
  const params = {
    Message: 'This is a test SMS message sent from Amazon SNS using Node.js Lambda function.',
    PhoneNumber: '+1234567890', // Replace with the recipient's phone number
  };

  // Send the SMS using Amazon SNS
  await sns.publish(params).promise();
}
```

In this example, we use the `aws-sdk` package to interact with Amazon SNS. The Lambda function sends a simple text SMS message to the phone number specified in the `PhoneNumber` field of the `params` object. You'll need to replace `'RecipientPhoneNumber'` with the recipient's phone number, including the country code (e.g., '+1234567890').

### Step 3: Create the Lambda Function

1. Zip the project files, including `index.js` and `node_modules`, into a ZIP file.

```bash
zip -r send-sms-lambda.zip .
```

2. Go to the AWS Management Console and navigate to the Lambda service.

3. Click on "Create function."

4. Choose "Author from scratch."

5. Provide a name for your Lambda function.

6. For the runtime, select "Node.js."

7. Under "Function code," choose "Upload a .zip file" and upload the `send-sms-lambda.zip` file you created.

8. Under "Permissions," choose an existing role with the necessary permissions or create a new role with the `lambda.amazonaws.com` service as a trusted entity and the required permissions for SNS.

9. Click "Create function" to create the Lambda function.

### Step 4: Test the Lambda Function

1. In the Lambda function page, click on "Test."

2. Choose "Create new test event" and give it a name.

3. Replace the event template with the following test event to trigger the Lambda function:

```json
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```

4. Click "Create" and then click "Test" to test the Lambda function.

If everything is set up correctly, the Lambda function will send an SMS message to the specified recipient using Amazon SNS.

### Step 5: Monitor the Lambda Function

After testing the Lambda function, you can monitor its execution and view the logs in the AWS Management Console under the Lambda service. Check the logs to see the output and any potential errors or issues during the execution.

## Conclusion

In this chapter, we explored how to create a serverless Node.js Lambda function that sends SMS messages using Amazon SNS. Amazon SNS provides a reliable and scalable solution for sending SMS messages to mobile devices worldwide. By integrating Amazon SNS with your serverless Node.js applications, you can efficiently deliver time-sensitive notifications and alerts to your users.

With Node.js and AWS Lambda, you have a powerful combination for building serverless applications with various functionalities. In the next chapter, we'll explore how to process S3 event data and store it in DynamoDB using a Node.js Lambda function. Let's continue our journey to master serverless Node.js development!