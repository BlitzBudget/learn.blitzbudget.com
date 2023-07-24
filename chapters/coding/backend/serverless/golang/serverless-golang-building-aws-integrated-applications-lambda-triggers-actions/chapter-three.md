**Chapter 3: Building Your First Serverless Go Function**

Welcome to Chapter 3 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll dive into the exciting world of serverless Go development by creating your first serverless Go function. We'll walk you through the process step-by-step, from setting up a new Go project to deploying your function on AWS Lambda. By the end of this chapter, you'll have a solid understanding of how to build and deploy serverless Go functions, ready to handle real-world scenarios.

**Overview of Serverless Go Functions**

Before we jump into the coding examples, let's briefly understand what a serverless Go function is and how it fits into the serverless architecture.

A serverless function, also known as a serverless compute unit, is a small piece of code designed to perform a specific task or function. It's event-driven and executed in a stateless manner, meaning it does not maintain any persistent state between invocations. When an event occurs, such as an HTTP request or a message being published to a queue, the serverless function is triggered and executed, and it responds with the appropriate output.

Go, the efficient and statically-typed programming language, is a great choice for building serverless functions due to its fast execution speed and low memory footprint. Go functions can be easily deployed on AWS Lambda, which abstracts the underlying infrastructure, allowing developers to focus solely on writing code and building business logic.

**Setting Up a New Go Project**

To get started, let's set up a new Go project for our serverless function. Follow the steps below to create the project structure:

1. Create a new directory for your Go project, and navigate to it using the terminal or command prompt:
   ```
   mkdir my-serverless-function
   cd my-serverless-function
   ```

2. Initialize a new Go module by running the following command:
   ```
   go mod init my-serverless-function
   ```

3. Now, you have a new Go module with the name "my-serverless-function," and it's ready for development.

**Writing the Serverless Go Function**

In this example, we'll create a simple serverless Go function that responds to an HTTP request with a "Hello, World!" message.

Create a new file named "handler.go" in your project directory, and add the following code:

```go
package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	message := "Hello, Serverless with Go!"
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       message,
	}, nil
}

func main() {
	lambda.Start(handler)
}
```

In this code, we import the necessary AWS Lambda libraries for Go and define our handler function. The handler function takes two arguments: a context object and an APIGatewayProxyRequest object. It returns an APIGatewayProxyResponse object containing the HTTP status code and the response body.

Our handler function simply sets the "message" variable to "Hello, Serverless with Go!" and returns it as the response body with a status code of 200.

**Deploying the Serverless Go Function**

With the function code ready, let's move on to deploying it on AWS Lambda.

**Step 1: Building the Go Binary**

Before deploying the function, we need to compile the Go code into a binary that can run on AWS Lambda.

In your project directory, run the following command to build the Go binary:
```
GOARCH=amd64 GOOS=linux go build -o main handler.go
```

This command sets the appropriate environment variables (GOARCH and GOOS) to build the binary for the Linux environment of AWS Lambda.

**Step 2: Creating an IAM Role**

Next, we need to create an IAM (Identity and Access Management) role that grants the necessary permissions to our Lambda function to interact with other AWS services. We'll use the AWS CLI to create the IAM role.

Run the following command to create the IAM role (replace "my-role-name" with a unique name for your role):
```
aws iam create-role --role-name my-role-name --assume-role-policy-document file://trust-policy.json
```

Create a file named "trust-policy.json" in your project directory with the following contents:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

This policy allows the Lambda service to assume the role, enabling our function to run with the necessary permissions.

**Step 3: Attaching the Required Policies**

Now, let's attach the necessary policies to the IAM role we created. In this example, we'll attach the "AWSLambdaBasicExecutionRole," which grants basic permissions for running Lambda functions.

Run the following command to attach the policy to the role:
```
aws iam attach-role-policy --role-name my-role-name --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

**Step 4: Creating the Lambda Function**

With the IAM role set up, we can now create the Lambda function. Run the following command to create the function (replace "my-function-name" with a unique name for your function):
```
aws lambda create-function --function-name my-function-name --runtime go1.x --role arn:aws:iam::123456789012:role/my-role-name --handler main --zip-file fileb://main
```

This command creates the Lambda function with the specified IAM role and handler.

**Step 5: Invoking the Lambda Function**

Congratulations! Your serverless Go function is now deployed on AWS Lambda. To test it, you can invoke the function using the AWS CLI:

Run the following command to invoke the Lambda function (replace "my-function-name" with your actual function name):
```
aws lambda invoke --function-name my-function-name output.json
```

If successful, you should see the response from your function in the "output.json" file.

**Conclusion**

In this chapter, you've successfully built and deployed your first serverless Go function on AWS Lambda. You've learned how to set up a new Go project, write a simple serverless Go function, and deploy it using the AWS CLI.

In the upcoming chapters, we'll explore more advanced serverless Go examples, integrating with other AWS services like Amazon SNS, AWS S3, DynamoDB, and more. Stay tuned to expand your knowledge of serverless Go development and unlock the full potential of AWS cloud services in your applications!