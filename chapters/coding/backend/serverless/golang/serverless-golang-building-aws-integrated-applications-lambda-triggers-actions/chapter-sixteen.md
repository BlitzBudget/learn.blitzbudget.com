**Chapter 16: Creating a Golang Lambda Function with S3 Event Trigger**

Welcome to Chapter 16 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on creating a Golang Lambda function triggered by Amazon Simple Storage Service (S3) events. S3 is a highly scalable and durable object storage service provided by AWS, and it allows you to store and retrieve any amount of data at any time.

**Why Use S3 Event Triggers with Lambda?**

S3 event triggers enable you to automatically invoke a Lambda function in response to events on an S3 bucket. This makes it easy to process data as soon as it's uploaded to or deleted from the bucket. S3 event triggers are useful for a wide range of use cases, such as image or video processing, data validation, and data backups.

**Prerequisites**

Before we dive into creating the Golang Lambda function with an S3 event trigger, ensure you have the following prerequisites:

1. An AWS account: You need an AWS account to access the AWS Management Console and create AWS resources.
2. The AWS Command Line Interface (CLI) installed and configured with your AWS credentials.

**Step 1: Create an S3 Bucket**

The first step is to create an S3 bucket in your AWS account. The bucket will be the event source for our Lambda function. To create an S3 bucket:

1. Open the AWS Management Console and navigate to the Amazon S3 service.
2. Click on "Create bucket."
3. Provide a name for the bucket and select the region.
4. Click "Create bucket" to create the S3 bucket.

**Step 2: Write the Golang Lambda Function**

Next, we'll write a Golang Lambda function that will be triggered by S3 events. In this example, we'll create a function that processes data whenever a new object is uploaded to the S3 bucket.

Create a new file named "s3_event_trigger.go" in your Go project directory, and add the following code:

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleS3Event(ctx context.Context, s3Event events.S3Event) error {
	for _, record := range s3Event.Records {
		s3Record := record.S3
		objectKey := s3Record.Object.Key

		log.Printf("Received S3 event for object: %s\n", objectKey)

		// Your data processing logic here
	}

	return nil
}

func main() {
	lambda.Start(handleS3Event)
}
```

In this code, we import the necessary libraries for AWS Lambda events, including the "events" package, which contains the `S3Event` type for handling S3 events.

The `handleS3Event` function is the entry point of our Lambda function. It takes the context and an `S3Event` as input. The function loops through the `Records` in the `S3Event` and retrieves the key of each object from the S3 event record. It then logs the received object key to the console.

**Step 3: Build and Deploy the Lambda Function**

Before deploying the Lambda function, ensure you have the AWS CLI installed and configured with your AWS credentials.

To build the Lambda function binary, use the following command:

```
GOOS=linux GOARCH=amd64 go build -o main s3_event_trigger.go
```

This command sets the environment variables `GOOS` and `GOARCH` to target the Linux environment (required for Lambda) and compiles the code into a binary named "main."

Next, create a deployment package by zipping the binary:

```
zip deployment.zip main
```

The deployment package contains the Lambda function binary and any additional files required for execution.

Finally, deploy the Lambda function using the AWS CLI:

```
aws lambda create-function --function-name MyS3EventLambdaFunction --runtime go1.x --handler main --zip-file fileb://deployment.zip --role YourExecutionRoleARN
```

Replace `MyS3EventLambdaFunction` with a suitable name for your Lambda function, and `YourExecutionRoleARN` with the ARN of an IAM role that allows the Lambda function to log messages to CloudWatch Logs and access the S3 bucket.

**Step 4: Add the S3 Event Trigger**

After deploying the Lambda function, we need to configure the S3 event trigger to connect it to the S3 bucket we created earlier.

1. Open the AWS Management Console and navigate to the AWS Lambda service.
2. Select your Lambda function and click on the "Designer" tab.
3. Click on "Add trigger" and select "S3" from the trigger options.
4. In the "Configure triggers" section, choose the S3 bucket you created earlier from the "Bucket" dropdown.
5. Optionally, specify a prefix and/or suffix for the objects that should trigger the Lambda function.
6. Click "Add" to add the trigger.

The Lambda function is now connected to the S3 bucket and will be triggered whenever a new object is uploaded to the bucket.

**Step 5: Test the S3 Event Trigger**

To test the S3 event trigger, upload a new object to the S3 bucket using the AWS Management Console or the AWS CLI.

Using the AWS CLI, you can upload an object as follows:

```
aws s3 cp path/to/local/file s3://your-bucket-name/object-key
```

Replace `path/to/local/file` with the path to the file you want to upload, `your-bucket-name` with the name of your S3 bucket, and `object-key` with the desired key for the object.

After uploading the object, check the CloudWatch Logs for your Lambda function to see the logged output.

**Conclusion**

Congratulations! In this chapter, you've learned how to create a Golang Lambda function triggered by Amazon S3 events. By using S3 event triggers, you can process data as soon as it's uploaded to or deleted from the S3 bucket, enabling real-time data processing and automation.

In this example, we demonstrated a simple Lambda function that logs the object keys received from the S3 events. However, you can customize the function to perform various data processing tasks based on the content of the objects.

In the next chapter, we'll explore more advanced topics, such as working with AWS Step Functions to orchestrate complex workflows and manage long-running processes in your serverless Go applications. Stay tuned for more exciting content on serverless Go development and AWS cloud services!