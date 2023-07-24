# Chapter 8: Fetching Secrets from Node.js using AWS Secrets Manager

In this chapter, we'll dive into the world of secrets management and explore how to securely fetch secrets, such as API keys, database passwords, or other sensitive information, from our Node.js serverless functions using AWS Secrets Manager. As serverless applications often require access to various external resources, handling secrets securely is crucial to ensure the confidentiality and integrity of our data and resources.

## Why Secrets Management?

In modern application development, it's common to rely on external services and APIs that require authentication credentials, such as API keys, access tokens, or usernames and passwords for databases. However, hardcoding these secrets directly into the source code poses significant security risks. If an attacker gains access to the source code or the deployment artifacts, they can extract these credentials, potentially leading to unauthorized access to sensitive resources.

Using a centralized and secure secrets management service, like AWS Secrets Manager, allows us to store and retrieve secrets securely, reducing the risk of accidental exposure or unauthorized access.

## Introducing AWS Secrets Manager

AWS Secrets Manager is a fully managed service provided by Amazon Web Services (AWS) that enables you to store, manage, and retrieve secrets securely. It provides an easy-to-use API for retrieving secrets in a programmatic manner, making it ideal for serverless applications.

Secrets Manager offers several key benefits:

1. **Secure Storage:** Secrets Manager stores secrets encrypted at rest using AWS Key Management Service (KMS). This ensures that even if an unauthorized user gains access to the underlying storage, they won't be able to decrypt the secrets without the appropriate KMS key.

2. **Automatic Rotation:** Secrets Manager allows you to set up automatic rotation for your secrets. This means that the service can automatically change the values of secrets at regular intervals, reducing the impact of a potential security breach.

3. **Fine-Grained Access Control:** You can control access to secrets by using AWS Identity and Access Management (IAM) policies, ensuring that only authorized entities can retrieve specific secrets.

4. **Integration with AWS Services:** Secrets Manager can be easily integrated with other AWS services like Lambda, RDS, or ECS, making it seamless to fetch and use secrets in your serverless applications.

## Prerequisites

Before we proceed with the example, make sure you have the following prerequisites in place:

1. An AWS account with the necessary permissions to create and manage resources like Secrets Manager and Lambda.

2. The AWS CLI installed and configured on your development machine. If you haven't set up the AWS CLI yet, refer to Chapter 2 for instructions.

3. Node.js and npm (Node Package Manager) installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

4. Basic knowledge of JavaScript and Node.js.

## Creating a Secret in AWS Secrets Manager

Before we can fetch secrets from Secrets Manager, we need to create a secret. For this example, let's assume we want to store a database password for a MySQL database.

1. Open the AWS Management Console and navigate to the AWS Secrets Manager service.

2. Click on "Store a new secret."

3. Select "Credentials for RDS database" as the type of secret.

4. Provide the necessary details, such as the username and password for the MySQL database.

5. Optionally, you can add additional configuration for automatic rotation and tags.

6. Click on "Next."

7. Provide a name for the secret, and click on "Next."

8. Review the settings and click on "Store secret" to create the secret.

Once the secret is created, note down the ARN (Amazon Resource Name) of the secret. We'll need this ARN to fetch the secret from our Node.js application.

## Fetching Secrets from Node.js using AWS SDK

To fetch secrets from AWS Secrets Manager in our Node.js application, we need to use the AWS SDK for JavaScript. The SDK provides APIs for interacting with various AWS services, including Secrets Manager.

Let's get started by installing the AWS SDK for JavaScript using npm:

```bash
npm install aws-sdk
```

Next, create a new file named `fetchSecret.js` and add the following code:

```javascript
// fetchSecret.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const secretsManager = new AWS.SecretsManager();

const secretName = 'your-secret-name'; // Replace 'your-secret-name' with the name of your secret

const params = {
  SecretId: secretName,
};

secretsManager.getSecretValue(params, (err, data) => {
  if (err) {
    console.log('Error fetching secret:', err);
  } else {
    if ('SecretString' in data) {
      const secret = JSON.parse(data.SecretString);
      console.log('Fetched secret:', secret);
      // Use the secret in your application
    } else {
      console.log('Binary secret not supported.');
    }
  }
});
```

In this code, we create an instance of the `AWS.SecretsManager` class from the AWS SDK and use the `getSecretValue()` method to fetch the secret from Secrets Manager. We provide the `SecretId` parameter with the name of the secret we want to fetch.

If the secret is successfully retrieved, we parse the `SecretString` property to get the secret value, which is typically stored as a JSON string. You can then use the secret in your application as needed.

## IAM Role and Permissions

To enable your Node.js application to access Secrets Manager, you need to ensure that it has the necessary IAM role and permissions.

1. Open the AWS Management Console and navigate to the IAM service.

2. Click on "Roles" in the left navigation pane.

3. Click on "Create role."

4. Choose the service that will use this role (e.g., Lambda).

5. Click "Next: Permissions."

6. Search for and select the "SecretsManagerReadWrite" managed policy to grant read and write access to Secrets Manager.

7. Click "Next: Tags" (optional) and "Next: Review."

8. Provide a name

 for the role (e.g., "LambdaSecretsManagerRole") and click "Create role."

9. Once the role is created, open the role and copy the Role ARN.

10. Now, associate this IAM role with your Node.js Lambda function, either through the AWS Management Console or by updating your serverless deployment configuration.

## Integrating with a Serverless Application

Now that we know how to fetch secrets from Secrets Manager using the AWS SDK for JavaScript, let's integrate it into a serverless application.

Assuming you already have a serverless application set up with the AWS Serverless Application Model (SAM) or any other serverless framework, follow these steps:

1. Add the necessary IAM role and permissions to your serverless application's deployment configuration. Ensure that the IAM role has the "SecretsManagerReadWrite" managed policy attached or a custom policy with similar permissions.

2. Install the AWS SDK for JavaScript in your Node.js Lambda function using npm.

3. Use the `fetchSecret.js` code from earlier in your Lambda function code to fetch the necessary secrets from Secrets Manager.

4. Use the fetched secrets in your application code as needed.

Here's an example of how your Lambda function code might look like:

```javascript
// index.js (your Lambda function)
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const secretsManager = new AWS.SecretsManager();

exports.handler = (event, context, callback) => {
  // Fetch secret code here (using fetchSecret.js)

  // Your application code here
};
```

By following these steps, your Node.js serverless application will be able to securely fetch and use secrets from AWS Secrets Manager.

## Conclusion

In this chapter, we explored the importance of secrets management and how AWS Secrets Manager provides a secure and scalable solution for storing and retrieving secrets in our serverless Node.js applications. We learned how to create a secret in Secrets Manager and how to use the AWS SDK for JavaScript to fetch the secret from our Node.js code.

By securely managing secrets, we can better protect our application's sensitive information, reduce the risk of security breaches, and ensure the confidentiality and integrity of our resources and data.

In the next chapter, we'll dive into Amazon Simple Notification Service (SNS) and explore how to publish messages to topics using Node.js. Stay tuned for more exciting tutorials and examples!