**Chapter 20: Creating a Golang Lambda Function to Process S3 Event Data and Store it in DynamoDB**

Welcome to Chapter 20 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on creating a Golang Lambda function that processes S3 event data and stores it in Amazon DynamoDB. This combination of services allows you to build scalable and efficient data processing pipelines for handling large volumes of data.

**Prerequisites**

Before we dive into creating the Golang Lambda function for processing S3 event data and storing it in DynamoDB, ensure you have the following prerequisites:

1. An AWS account: You need an AWS account to access the AWS Management Console and create AWS resources.
2. The AWS Command Line Interface (CLI) installed and configured with your AWS credentials.
3. A pre-configured S3 bucket and DynamoDB table: For this chapter's example, we assume you already have an S3 bucket configured to generate event notifications and a DynamoDB table created to store the processed data.

**Step 1: Set Up S3 Event Notifications**

To start processing S3 event data, we need to set up S3 event notifications on our bucket. S3 event notifications allow us to trigger a Lambda function whenever objects are created, updated, or deleted in the bucket.

1. Open the AWS Management Console and navigate to the Amazon S3 service.
2. Select your S3 bucket and click on the "Properties" tab.
3. Scroll down to the "Events" section and click on "Create event notification."
4. Provide a name for the event notification and select "All object create events."
5. Under "Send to," choose "Lambda function" and select the Golang Lambda function you want to use for processing the data.
6. Click "Save" to create the event notification.

**Step 2: Write the Golang Lambda Function**

Next, we'll write a Golang Lambda function that processes the S3 event data and stores it in DynamoDB. In this example, we'll assume that the S3 objects contain JSON data, and we'll extract and store specific fields from the JSON data into DynamoDB.

Create a new file named "process_s3_event.go" in your Go project directory, and add the following code:

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type S3Record struct {
	S3 struct {
		Object struct {
			Key string `json:"key"`
		} `json:"object"`
	} `json:"s3"`
}

type DataItem struct {
	ID      string `json:"id"`
	Message string `json:"message"`
}

func processS3Event(ctx context.Context, event events.S3Event) error {
	// Create a new DynamoDB session
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"), // Replace with your desired AWS region
	})
	if err != nil {
		log.Printf("Error creating AWS session: %v\n", err)
		return err
	}

	// Create a new DynamoDB client
	svc := dynamodb.New(sess)

	for _, record := range event.Records {
		// Unmarshal the S3 event data to get the object key
		var s3Record S3Record
		err := json.Unmarshal([]byte(record.S3.JSON), &s3Record)
		if err != nil {
			log.Printf("Error unmarshaling S3 event data: %v\n", err)
			continue
		}

		// Read the JSON data from the S3 object
		result, err := svc.GetItem(&dynamodb.GetItemInput{
			TableName: aws.String("your_dynamodb_table"), // Replace with the name of your DynamoDB table
			Key: map[string]*dynamodb.AttributeValue{
				"id": {
					S: aws.String(s3Record.S3.Object.Key),
				},
			},
		})
		if err != nil {
			log.Printf("Error reading item from DynamoDB: %v\n", err)
			continue
		}

		// Check if the item already exists in DynamoDB
		if len(result.Item) == 0 {
			// Item does not exist, process and store the data in DynamoDB
			var dataItem DataItem
			err = json.Unmarshal([]byte(record.S3.JSON), &dataItem)
			if err != nil {
				log.Printf("Error unmarshaling JSON data: %v\n", err)
				continue
			}

			// Create a new item in DynamoDB
			_, err = svc.PutItem(&dynamodb.PutItemInput{
				TableName: aws.String("your_dynamodb_table"), // Replace with the name of your DynamoDB table
				Item: map[string]*dynamodb.AttributeValue{
					"id": {
						S: aws.String(s3Record.S3.Object.Key),
					},
					"message": {
						S: aws.String(dataItem.Message),
					},
				},
			})
			if err != nil {
				log.Printf("Error storing item in DynamoDB: %v\n", err)
				continue
			}

			log.Printf("Item with ID %s stored in DynamoDB\n", s3Record.S3.Object.Key)
		} else {
			// Item already exists, skip processing
			log.Printf("Item with ID %s already exists in DynamoDB. Skipping processing.\n", s3Record.S3.Object.Key)
		}
	}

	return nil
}

func main() {
	lambda.Start(processS3Event)
}
```

In this code, we import the necessary libraries for AWS Lambda events, including the "events" package for handling S3 events, and the "dynamodb" package for interacting with Amazon DynamoDB.

The `S3Record` struct is used to unmarshal the S3 event data and extract the object key from the JSON data. The `DataItem` struct represents the structure of the data we want to store in DynamoDB.

The `processS3Event` function is the entry point of our Lambda function. It takes the context and an `S3Event` as input. The function loops through the S3 event records and extracts the object key from the JSON data using the `S3Record` struct.

It then reads the JSON data from the S3 object and checks if the item already exists in DynamoDB. If the item does not exist, the function unmarshals the JSON data into the `DataItem` struct and creates a new item in DynamoDB with the object key as the ID and the message from the JSON data.

If the item already exists in DynamoDB, the function logs a message indicating that the item is already present and skips processing.

**Step 3: Build and Deploy the Lambda Function**

Before deploying the Lambda function, ensure you have the AWS CLI installed and configured with your AWS credentials.

To build the Lambda function binary, use the following command:

```
GOOS=linux GOARCH=amd64 go build -o main process_s3_event.go
```

This command sets the environment variables `GOOS` and `GOARCH`

 to target the Linux environment (required for Lambda) and compiles the code into a binary named "main."

Next, create a deployment package by zipping the binary:

```
zip deployment.zip main
```

The deployment package contains the Lambda function binary and any additional files required for execution.

Finally, deploy the Lambda function using the AWS CLI:

```
aws lambda create-function --function-name MyProcessS3EventLambdaFunction --runtime go1.x --handler main --zip-file fileb://deployment.zip --role YourExecutionRoleARN
```

Replace `MyProcessS3EventLambdaFunction` with a suitable name for your Lambda function, and `YourExecutionRoleARN` with the ARN of an IAM role that allows the Lambda function to log messages to CloudWatch Logs and interact with DynamoDB.

**Step 4: Test the Data Processing**

To test the data processing, upload a JSON file containing the data you want to process to your S3 bucket. The Lambda function will automatically be triggered by the S3 event notification and process the data.

After the Lambda function execution, check your DynamoDB table to verify that the processed data has been stored successfully.

**Conclusion**

In this chapter, you've learned how to create a Golang Lambda function that processes S3 event data and stores it in DynamoDB. By combining S3 event notifications and DynamoDB, you can build powerful data processing pipelines for handling large volumes of data efficiently.

In this example, we demonstrated a simple data processing pipeline that extracts specific fields from JSON data stored in S3 objects and stores them in DynamoDB. However, you can customize the function to process different types of data and perform more complex data transformations.

With the knowledge gained from this chapter, you're now equipped to build sophisticated serverless applications using Go and AWS cloud services. Congratulations on completing this guide, and we hope you continue to explore and build innovative serverless applications!