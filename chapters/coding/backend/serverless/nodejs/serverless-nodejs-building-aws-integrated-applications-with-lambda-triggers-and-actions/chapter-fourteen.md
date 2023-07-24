# Chapter 14: Managing Environment Variables

Environment variables are a crucial aspect of building serverless applications in Node.js. They allow you to store configuration data, sensitive information, and other settings outside of your codebase, making it easier to manage different deployment environments and ensuring that sensitive data remains secure. In this chapter, we'll explore how to manage environment variables in serverless Node.js functions and implement best practices to keep your applications flexible and secure.

## Why Use Environment Variables

Environment variables are a way to pass information to your application at runtime, without hardcoding it within the code itself. Using environment variables offers several benefits:

1. **Security:** Sensitive information, such as API keys, database credentials, or access tokens, can be stored as environment variables, reducing the risk of exposing them accidentally.

2. **Configuration Management:** Environment variables provide an easy way to configure your application for different environments, such as development, staging, and production, without changing the code.

3. **Flexibility:** With environment variables, you can quickly adjust settings without modifying the code, making it easier to adapt to different deployment scenarios.

4. **Version Control:** By keeping sensitive information out of your codebase, you can safely store and version your code in version control systems without exposing sensitive data.

## Implementing Environment Variables in Node.js

In Node.js, you can access environment variables using the `process.env` object. Before we explore how to use environment variables in serverless Node.js functions, let's understand how to set them.

### Setting Environment Variables Locally

When developing your serverless application locally, you can set environment variables in your development environment. On Unix-based systems, you can do this in the terminal using the `export` command:

```bash
export VARIABLE_NAME=value
```

On Windows, you can use the `set` command:

```bash
set VARIABLE_NAME=value
```

### Setting Environment Variables in AWS Lambda

To set environment variables for your Lambda function on AWS, you can do so through the AWS Management Console, AWS CLI, or AWS SDK.

#### AWS Management Console

1. Go to the AWS Management Console and navigate to the Lambda service.

2. Select your Lambda function and click on "Configuration."

3. Scroll down to the "Environment variables" section.

4. Click on "Edit" and add your environment variables and their values.

5. Click "Save" to apply the changes.

#### AWS CLI

You can use the AWS CLI to update your Lambda function's environment variables. Use the `update-function-configuration` command as follows:

```bash
aws lambda update-function-configuration --function-name YourFunctionName --environment "Variables={VARIABLE_NAME=value,ANOTHER_VARIABLE=another_value}"
```

#### AWS SDK

If you prefer to use an AWS SDK, you can set environment variables programmatically. Here's an example using the AWS SDK for Node.js:

```javascript
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const params = {
  FunctionName: 'YourFunctionName',
  Environment: {
    Variables: {
      VARIABLE_NAME: 'value',
      ANOTHER_VARIABLE: 'another_value',
    },
  },
};

lambda.updateFunctionConfiguration(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
```

### Accessing Environment Variables in Node.js

Once you have set the environment variables for your Lambda function, you can access them in your Node.js code using `process.env.VARIABLE_NAME`. For example:

```javascript
const apiKey = process.env.API_KEY;
const databaseUrl = process.env.DATABASE_URL;
```

### Best Practices for Managing Environment Variables

1. **Sensitive Information:** Avoid hardcoding sensitive information directly in your code. Instead, use environment variables to store sensitive data and access them through `process.env`.

2. **Environment-Specific Configurations:** Use environment variables to manage configuration settings for different environments (e.g., development, staging, production).

3. **Defaults and Fail-Safes:** Provide default values for environment variables to handle cases where they are not set explicitly.

4. **Secrets Management:** For highly sensitive information, consider using AWS Secrets Manager or a similar service to securely store and manage secrets.

5. **Don't Commit Environment Files:** Avoid committing environment files (e.g., `.env`) to version control systems to prevent exposing sensitive data.

6. **CI/CD Integration:** Incorporate environment variable configuration into your CI/CD pipeline to ensure consistent settings across deployments.

### Example: Using Environment Variables in a Lambda Function

Let's consider a practical example of a serverless Lambda function that reads data from a DynamoDB table. We'll use environment variables to provide the table name and AWS region dynamically.

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: process.env.AWS_REGION });

exports.handler = async (event, context) => {
  const tableName = process.env.DYNAMODB_TABLE;

  const params = {
    TableName: tableName,
    Key: {
      id: { S: 'example_id' },
    },
  };

  try {
    const data = await dynamodb.getItem(params).promise();
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify('Item not found.'),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (error) {
    console.error('Error reading from DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error reading from DynamoDB.'),
    };
  }
};
```

In this example, we use `process.env.DYNAMODB_TABLE` to access the table name and `process.env.AWS_REGION` to specify the AWS region. By using environment variables, we can easily switch between different DynamoDB tables or AWS regions without modifying the code.

## Conclusion

In this chapter, we explored the importance of managing environment variables in serverless Node.js applications. We discussed the benefits of using environment variables for security, configuration management, flexibility, and version control. We also demonstrated how to set and access environment variables in serverless Lambda functions using `process.env`.

By following best practices for managing environment variables, you can build more secure and adaptable serverless applications. In the next chapter, we will explore how to create a Node.js Lambda function triggered by an SNS topic, allowing you to send notifications and alerts from your serverless applications. Let's continue our journey to master serverless Node.js development!