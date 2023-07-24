**Chapter 17: Creating a Golang Lambda Function with DynamoDB Stream Trigger**

Welcome to Chapter 17 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on creating a Golang Lambda function triggered by Amazon DynamoDB Streams. DynamoDB is a fully managed NoSQL database service provided by AWS, and DynamoDB Streams allows you to capture changes to your data in real-time.

**Why Use DynamoDB Stream Triggers with Lambda?**

DynamoDB Streams provide a way to capture changes to items in a DynamoDB table. By using DynamoDB Streams as a trigger for your Lambda function, you can react to data changes in real-time and perform actions based on those changes. DynamoDB Stream triggers are useful for use cases such as data replication, real-time analytics, and data validation.

**Prerequisites**

Before we dive into creating the Golang Lambda function with a DynamoDB Stream trigger, ensure you have the following prerequisites:

1. An AWS account: You need an AWS account to access the AWS Management Console and create AWS resources.
2. The AWS Command Line Interface (CLI) installed and configured with your AWS credentials.

**Step 1: Create a DynamoDB Table**

The first step is to create a DynamoDB table in your AWS account. The table will be the source of the DynamoDB Stream that triggers our Lambda function. To create a DynamoDB table:

1. Open the AWS Management Console and navigate to the Amazon DynamoDB service.
2. Click on "Create table."
3. Provide a name for the table and a primary key.
4. Click "Create" to create the DynamoDB table.

**Step 2: Enable the DynamoDB Stream**

After creating the DynamoDB table, enable the DynamoDB Stream for the table. To enable the stream:

1. In the AWS Management Console, navigate to the Amazon DynamoDB service.
2. Select the table you created in the previous step.
3. Click on the "Manage Stream" button in the "Overview" tab.
4. Choose the desired stream settings (e.g., New and old images, New images) and click "Enable."

**Step 3: Write the Golang Lambda Function**

Next, we'll write a Golang Lambda function that will be triggered by the DynamoDB Stream. In this example, we'll create a function that processes the records in the DynamoDB Stream.

Create a new file named "dynamodb_stream_trigger.go" in your Go project directory, and add the following code:

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleDynamoDBStream(ctx context.Context, event events.DynamoDBEvent) error {
	for _, record := range event.Records {
		// Get the type of event (INSERT, MODIFY, REMOVE)
		eventType := record.EventName

		// Get the new image of the item (the item after the change)
		newImage := record.Change.NewImage

		// Get the old image of the item (the item before the change)
		oldImage := record.Change.OldImage

		// Process the record based on the event type and new/old images
		log.Printf("Received DynamoDB event of type %s\n", eventType)
		log.Printf("New Image: %+v\n", newImage)
		log.Printf("Old Image: %+v\n", oldImage)

		// Your data processing logic here
	}

	return nil
}

func main() {
	lambda.Start(handleDynamoDBStream)
}
```

In this code, we import the necessary libraries for AWS Lambda events, including the "events" package, which contains the `DynamoDBEvent` type for handling DynamoDB Streams.

The `handleDynamoDBStream` function is the entry point of our Lambda function. It takes the context and a `DynamoDBEvent` as input. The function loops through the `Records` in the `DynamoDBEvent` and retrieves the type of event (INSERT, MODIFY, REMOVE), as well as the new and old images of the item that triggered the event. It then logs the received event information to the console.

**Step 4: Build and Deploy the Lambda Function**

Before deploying the Lambda function, ensure you have the AWS CLI installed and configured with your AWS credentials.

To build the Lambda function binary, use the following command:

```
GOOS=linux GOARCH=amd64 go build -o main dynamodb_stream_trigger.go
```

This command sets the environment variables `GOOS` and `GOARCH` to target the Linux environment (required for Lambda) and compiles the code into a binary named "main."

Next, create a deployment package by zipping the binary:

```
zip deployment.zip main
```

The deployment package contains the Lambda function binary and any additional files required for execution.

Finally, deploy the Lambda function using the AWS CLI:

```
aws lambda create-function --function-name MyDynamoDBStreamLambdaFunction --runtime go1.x --handler main --zip-file fileb://deployment.zip --role YourExecutionRoleARN
```

Replace `MyDynamoDBStreamLambdaFunction` with a suitable name for your Lambda function, and `YourExecutionRoleARN` with the ARN of an IAM role that allows the Lambda function to log messages to CloudWatch Logs and access the DynamoDB Stream.

**Step 5: Add the DynamoDB Stream Trigger**

After deploying the Lambda function, we need to configure the DynamoDB Stream trigger to connect it to the DynamoDB table we created earlier.

1. Open the AWS Management Console and navigate to the AWS Lambda service.
2. Select your Lambda function and click on the "Designer" tab.
3. Click on "Add trigger" and select "DynamoDB" from the trigger options.
4. In the "Configure triggers" section, choose the DynamoDB table you created earlier from the "DynamoDB table" dropdown.
5. Optionally, specify a batch size for the number of records the function receives in each invocation.
6. Click "Add" to add the trigger.

The Lambda function is now connected to the DynamoDB Stream and will be triggered whenever changes occur to items in the DynamoDB table.

**Step 6: Test the DynamoDB Stream Trigger**

To test the DynamoDB Stream trigger, make changes to items in the DynamoDB table. You can add, modify, or remove items to trigger the Lambda function.

After making the changes, check the CloudWatch Logs for your Lambda function to see the logged output.

**Conclusion**

Congratulations! In this chapter, you've learned how to create a Golang Lambda function triggered by Amazon DynamoDB Streams. By using DynamoDB Streams as an event source for your Lambda function, you can process data changes in real-time and perform actions based on

 those changes.

In this example, we demonstrated a simple Lambda function that logs the event information and the new and old images of the item received from the DynamoDB Stream. However, you can customize the function to perform various data processing tasks based on the events and data changes.

In the next chapter, we'll explore more advanced topics, such as working with AWS Step Functions to orchestrate complex workflows and manage long-running processes in your serverless Go applications. Stay tuned for more exciting content on serverless Go development and AWS cloud services!