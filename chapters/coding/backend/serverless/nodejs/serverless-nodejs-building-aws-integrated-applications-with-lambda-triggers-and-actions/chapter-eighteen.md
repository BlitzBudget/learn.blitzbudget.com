# Chapter 18: Sending Emails with Node.js Lambda Function

Email communication is an essential aspect of many applications. Whether it's sending notifications, alerts, or personalized messages to users, having the ability to send emails from your serverless Node.js applications can be crucial. In this chapter, we'll explore how to create a Node.js Lambda function that sends emails using Amazon SES (Simple Email Service).

## Introduction to Amazon SES

Amazon SES is a scalable and cost-effective email service provided by AWS. It allows you to send both transactional and marketing emails, ensuring reliable delivery and high deliverability rates. Amazon SES offers various features, including email sending, receiving, and managing bounces and complaints.

## Prerequisites

Before we start, make sure you have the following prerequisites:

1. An AWS account with appropriate permissions to create Lambda functions and use Amazon SES.

2. Node.js and npm installed on your local development machine.

## Step-by-Step: Creating a Node.js Lambda Function to Send Emails

In this section, we'll guide you through the process of creating a serverless Node.js Lambda function that sends emails using Amazon SES. We'll assume that you already have an Amazon SES configuration set up and verified.

### Step 1: Set Up the Node.js Project

1. Create a new directory for your Node.js Lambda function project and navigate to it.

```bash
mkdir send-email-lambda
cd send-email-lambda
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
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event, context) => {
  try {
    // Send the email using Amazon SES
    await sendEmail();

    return {
      statusCode: 200,
      body: JSON.stringify('Email sent successfully.'),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error sending email.'),
    };
  }
};

async function sendEmail() {
  // Create the email parameters
  const params = {
    Source: 'your-email@example.com', // Replace with your verified email address
    Destination: {
      ToAddresses: ['recipient@example.com'], // Replace with the recipient's email address
    },
    Message: {
      Subject: {
        Data: 'Hello from Amazon SES!',
      },
      Body: {
        Text: {
          Data: 'This is a test email sent from Amazon SES using Node.js Lambda function.',
        },
      },
    },
  };

  // Send the email using Amazon SES
  await ses.sendEmail(params).promise();
}
```

In this example, we use the `aws-sdk` package to interact with Amazon SES. The Lambda function sends a simple text email to a recipient, whose email address is specified in the `ToAddresses` field of the `params` object. You'll need to replace the `'your-email@example.com'` with your verified email address and `'recipient@example.com'` with the recipient's email address.

### Step 3: Create the Lambda Function

1. Zip the project files, including `index.js` and `node_modules`, into a ZIP file.

```bash
zip -r send-email-lambda.zip .
```

2. Go to the AWS Management Console and navigate to the Lambda service.

3. Click on "Create function."

4. Choose "Author from scratch."

5. Provide a name for your Lambda function.

6. For the runtime, select "Node.js."

7. Under "Function code," choose "Upload a .zip file" and upload the `send-email-lambda.zip` file you created.

8. Under "Permissions," choose an existing role with the necessary permissions or create a new role with the `lambda.amazonaws.com` service as a trusted entity and the required permissions for SES.

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

If everything is set up correctly, the Lambda function will send an email to the specified recipient using Amazon SES.

### Step 5: Monitor the Lambda Function

After testing the Lambda function, you can monitor its execution and view the logs in the AWS Management Console under the Lambda service. Check the logs to see the output and any potential errors or issues during the execution.

## Conclusion

In this chapter, we explored how to create a serverless Node.js Lambda function that sends emails using Amazon SES. Amazon SES provides a reliable and scalable solution for sending transactional and marketing emails from your applications. By integrating Amazon SES with your serverless Node.js applications, you can efficiently send personalized emails and notifications to your users.

With Node.js and AWS Lambda, you have a powerful combination for building serverless applications with various functionalities. In the next chapter, we'll explore how to send SMS messages using a Node.js Lambda function and Amazon SNS (Simple Notification Service). Let's continue our journey to master serverless Node.js development!