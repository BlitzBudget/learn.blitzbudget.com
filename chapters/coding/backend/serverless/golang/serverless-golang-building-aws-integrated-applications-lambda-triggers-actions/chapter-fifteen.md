**Chapter 15: Creating a Golang Lambda Function with SNS Trigger**

Welcome to Chapter 15 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on creating a Golang Lambda function triggered by Amazon Simple Notification Service (SNS). SNS is a fully managed pub/sub messaging service provided by AWS, and it allows you to send messages to multiple subscribers, including Lambda functions, HTTP endpoints, and more.

**Why Use SNS with Lambda?**

SNS provides a scalable and reliable way to trigger Lambda functions in response to events or messages. By using SNS as a trigger for your Lambda function, you can decouple your application's components, making it easier to manage and scale. Additionally, SNS supports fan-out patterns, enabling you to send messages to multiple Lambda functions simultaneously.

**Prerequisites**

Before we dive into creating the Golang Lambda function with an SNS trigger, ensure you have the following prerequisites:

1. An AWS account: You need an AWS account to access the AWS Management Console and create AWS resources.
2. The AWS Command Line Interface (CLI) installed and configured with your AWS credentials.

**Step 1: Create an SNS Topic**

The first step is to create an SNS topic in your AWS account. The SNS topic will be the event source for our Lambda function. To create an SNS topic:

1. Open the AWS Management Console and navigate to the Amazon SNS service.
2. Click on "Create topic."
3. Provide a name and a display name for the topic, and click "Create topic."

Once the topic is created, note down its ARN (Amazon Resource Name) as we'll need it when configuring the Lambda function.

**Step 2: Write the Golang Lambda Function**

Next, we'll write a Golang Lambda function that will be triggered by the SNS topic. In this example, we'll create a simple function that logs the message received from the SNS topic.

Create a new file named "sns_trigger.go" in your Go project directory, and add the following code:

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleSNSMessage(ctx context.Context, snsEvent events.SNSEvent) error {
	for _, record := range snsEvent.Records {
		snsRecord := record.SNS
		message := snsRecord.Message

		log.Printf("Received SNS message: %s\n", message)
	}

	return nil
}

func main() {
	lambda.Start(handleSNSMessage)
}
```

In this code, we import the necessary libraries for AWS Lambda events, including the "events" package, which contains the `SNSEvent` type for handling SNS messages.

The `handleSNSMessage` function is the entry point of our Lambda function. It takes the context and an `SNSEvent` as input. The function loops through the `Records` in the `SNSEvent` and retrieves the message from each record's `SNS` object. It then logs the received message to the console.

**Step 3: Build and Deploy the Lambda Function**

Before deploying the Lambda function, ensure you have the AWS CLI installed and configured with your AWS credentials.

To build the Lambda function binary, use the following command:

```
GOOS=linux GOARCH=amd64 go build -o main sns_trigger.go
```

This command sets the environment variables `GOOS` and `GOARCH` to target the Linux environment (required for Lambda) and compiles the code into a binary named "main."

Next, create a deployment package by zipping the binary:

```
zip deployment.zip main
```

The deployment package contains the Lambda function binary and any additional files required for execution.

Finally, deploy the Lambda function using the AWS CLI:

```
aws lambda create-function --function-name MySNSLambdaFunction --runtime go1.x --handler main --zip-file fileb://deployment.zip --role YourExecutionRoleARN
```

Replace `MySNSLambdaFunction` with a suitable name for your Lambda function, and `YourExecutionRoleARN` with the ARN of an IAM role that allows the Lambda function to log messages to CloudWatch Logs and access the SNS topic.

**Step 4: Add the SNS Trigger**

After deploying the Lambda function, we need to configure the SNS trigger to connect it to the SNS topic we created earlier.

1. Open the AWS Management Console and navigate to the AWS Lambda service.
2. Select your Lambda function and click on the "Designer" tab.
3. Click on "Add trigger" and select "SNS" from the trigger options.
4. In the "Configure triggers" section, choose the SNS topic you created earlier from the "SNS topic" dropdown.
5. Click "Add" to add the trigger.

The Lambda function is now connected to the SNS topic and will be triggered whenever a message is published to the topic.

**Step 5: Test the SNS Trigger**

To test the SNS trigger, publish a message to the SNS topic using the AWS Management Console or the AWS CLI.

Using the AWS CLI, you can publish a message as follows:

```
aws sns publish --topic-arn YourSNSTopicARN --message "Hello from SNS!"
```

Replace `YourSNSTopicARN` with the ARN of the SNS topic you created earlier.

After publishing the message, check the CloudWatch Logs for your Lambda function to see the logged output.

**Conclusion**

Congratulations! In this chapter, you've learned how to create a Golang Lambda function triggered by Amazon SNS. By using SNS as an event source for your Lambda function, you can easily decouple components in your serverless application and respond to messages in real-time.

In this example, we demonstrated a simple Lambda function that logs the messages received from the SNS topic. However, you can customize the function to perform various tasks based on the content of the messages.

In the next chapter, we'll explore more advanced topics, such as working with AWS Step Functions to orchestrate complex workflows and managing long-running processes in your serverless Go applications. Stay tuned for more exciting content on serverless Go development and AWS cloud services!