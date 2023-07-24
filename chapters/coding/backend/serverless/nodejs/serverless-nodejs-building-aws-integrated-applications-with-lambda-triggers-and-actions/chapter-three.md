# Chapter 3: Building Your First Serverless Node.js Function

In this chapter, we'll guide you through the process of building your first serverless function with Node.js and deploying it to AWS Lambda. By the end of this chapter, you'll have a fully functional serverless function that responds to HTTP requests.

## Prerequisites

Before we begin, make sure you have the following prerequisites:

1. Node.js and npm installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

2. An AWS account with the AWS CLI installed and configured. If you haven't set up an AWS account and the AWS CLI, refer to Chapter 2 for instructions.

## Setting Up the Project

Let's start by creating a new directory for our serverless project and initializing a new Node.js package using npm.

```bash
mkdir my-serverless-project
cd my-serverless-project
npm init
```

This will prompt you to provide some information about your project, such as the package name, version, description, and entry point. You can accept the default values for now, but feel free to customize them as needed.

## Installing Dependencies

Next, we'll install the required dependencies for our serverless project. We'll use the Serverless Framework to manage our serverless functions, and the `aws-sdk` package to interact with AWS services from our Node.js code.

```bash
npm install serverless aws-sdk
```

The Serverless Framework is a powerful tool for managing and deploying serverless applications, while the `aws-sdk` package provides the official AWS SDK for JavaScript, allowing us to interact with AWS services.

## Creating the Serverless Function

Now that our project is set up and the dependencies are installed, let's create our first serverless function.

In the root of your project directory, create a new file called `handler.js`. This file will contain the code for our serverless function.

```javascript
// handler.js
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};
```

This is a simple function named `hello`, which receives an `event` object as a parameter. The function returns an HTTP response with a `200` status code and a JSON object containing the "Hello World!" message.

## Configuring Serverless Framework

To deploy our serverless function to AWS Lambda, we need to configure the Serverless Framework. Create a new file called `serverless.yml` in the root of your project directory.

```yaml
# serverless.yml
service: my-serverless-service

provider:
  name: aws
  runtime: nodejs14.x
  stage: dev
  region: us-east-1

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /
          method: get
```

In this configuration file, we define the name of our service (`my-serverless-service`) and specify that we are using AWS as the provider. We set the runtime to `nodejs14.x`, which is the Node.js version we'll use for our functions.

The `functions` section defines our serverless function named `hello`. We specify the handler as `handler.hello`, which means the function is located in the `handler.js` file and exports the `hello` function. The `events` section defines the events that trigger our function. In this case, we use an HTTP event that responds to HTTP GET requests to the root URL (`/`).

## Deploying the Serverless Function

With the Serverless Framework configured, we are ready to deploy our serverless function to AWS Lambda. Run the following command in your project directory:

```bash
serverless deploy
```

The Serverless Framework will package your function and its dependencies, and deploy them to AWS Lambda. It will also create an API Gateway endpoint that allows you to trigger the function via an HTTP request.

Once the deployment is complete, you'll see the URL of the API Gateway endpoint in the output. You can use tools like `curl` or Postman to make an HTTP GET request to this URL and receive the "Hello World!" response.

## Testing the Serverless Function

Let's test our serverless function locally before making an actual HTTP request. The Serverless Framework provides a convenient command for running functions locally:

```bash
serverless invoke local --function hello
```

This command will invoke our `hello` function locally and return the response. You should see the "Hello World!" message in the output.

## Updating the Serverless Function

If you make changes to your serverless function, you can update it on AWS Lambda using the following command:

```bash
serverless deploy function -f hello
```

This will only update the `hello` function without redeploying the entire service.

## Cleaning Up

To avoid incurring unnecessary costs, don't forget to remove the resources when you're done with this tutorial. Use the following command to remove the entire service:

```bash
serverless remove
```

This will delete the serverless function and associated resources from AWS Lambda.

## Conclusion

Congratulations! You've successfully built your first serverless function with Node.js and deployed it to AWS Lambda. We've covered the basic steps of creating a serverless function, configuring the Serverless Framework, and deploying the function to AWS. In the next chapters, we'll explore more advanced serverless concepts and demonstrate how to integrate Node.js with various AWS services to build more complex and powerful serverless applications. Stay tuned for more exciting tutorials and examples!