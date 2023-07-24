**Chapter 19: Sending SMS with Golang Lambda Function using SNS**

Welcome to Chapter 19 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on sending SMS (Short Message Service) using a Golang Lambda function with Amazon Simple Notification Service (SNS). SMS is a powerful communication channel for sending important alerts and notifications to users.

**Prerequisites**

Before we dive into creating the Golang Lambda function for sending SMS with SNS, ensure you have the following prerequisites:

1. An AWS account: You need an AWS account to access the AWS Management Console and create AWS resources.
2. The AWS Command Line Interface (CLI) installed and configured with your AWS credentials.

**Step 1: Set Up Amazon SNS**

Amazon Simple Notification Service (SNS) is a fully managed messaging service provided by AWS. Before we proceed, we need to set up Amazon SNS to send SMS messages on our behalf. To set up Amazon SNS:

1. Open the AWS Management Console and navigate to the Amazon SNS service.
2. Click on "Text messaging (SMS)" in the left sidebar.
3. Click on "Create topic" to create a new topic for sending SMS messages.
4. Provide a name for the topic and click "Create topic."
5. After creating the topic, click on "Create subscription" to subscribe a phone number to the topic. Follow the instructions to confirm the subscription.

**Step 2: Write the Golang Lambda Function**

Next, we'll write a Golang Lambda function that will send SMS messages using Amazon SNS. In this example, we'll create a function that sends a simple SMS message to a specified phone number.

Create a new file named "send_sms.go" in your Go project directory, and add the following code:

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sns"
)

func sendSMS(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Get the phone number and message from the request body
	requestBody := event.Body
	phoneNumber := "your_phone_number" // Replace with the destination phone number
	message := requestBody

	// Configure the AWS session
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"), // Replace with your desired AWS region
	})
	if err != nil {
		log.Printf("Error creating AWS session: %v\n", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error creating AWS session",
		}, nil
	}

	// Create a new SNS client
	svc := sns.New(sess)

	// Send the SMS
	input := &sns.PublishInput{
		Message:     aws.String(message),
		PhoneNumber: aws.String(phoneNumber),
	}

	_, err = svc.Publish(input)
	if err != nil {
		log.Printf("Error sending SMS: %v\n", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error sending SMS",
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "SMS sent successfully",
	}, nil
}

func main() {
	lambda.Start(sendSMS)
}
```

In this code, we import the necessary libraries for AWS Lambda events, including the "events" package for handling API Gateway requests, and the "sns" package for interacting with Amazon SNS.

The `sendSMS` function is the entry point of our Lambda function. It takes the context and an `APIGatewayProxyRequest` as input. The function extracts the phone number and message from the request body.

The AWS session and SNS client are configured. Then, the function calls the `Publish` method of the SNS client to send the SMS message. If there's an error, the function returns an error response with the appropriate status code and message.

**Step 3: Build and Deploy the Lambda Function**

Before deploying the Lambda function, ensure you have the AWS CLI installed and configured with your AWS credentials.

To build the Lambda function binary, use the following command:

```
GOOS=linux GOARCH=amd64 go build -o main send_sms.go
```

This command sets the environment variables `GOOS` and `GOARCH` to target the Linux environment (required for Lambda) and compiles the code into a binary named "main."

Next, create a deployment package by zipping the binary:

```
zip deployment.zip main
```

The deployment package contains the Lambda function binary and any additional files required for execution.

Finally, deploy the Lambda function using the AWS CLI:

```
aws lambda create-function --function-name MySendSMSLambdaFunction --runtime go1.x --handler main --zip-file fileb://deployment.zip --role YourExecutionRoleARN
```

Replace `MySendSMSLambdaFunction` with a suitable name for your Lambda function, and `YourExecutionRoleARN` with the ARN of an IAM role that allows the Lambda function to log messages to CloudWatch Logs and send SMS messages through Amazon SNS.

**Step 4

: Create an API Gateway Endpoint**

To invoke the Lambda function and send SMS messages, we need to create an API Gateway endpoint. This endpoint will act as the interface for our clients to interact with the Lambda function.

1. Open the AWS Management Console and navigate to the Amazon API Gateway service.
2. Click on "Create API" and choose "REST API."
3. Provide a name for your API and click "Create API."
4. Click on "Create Resource" and choose a resource name.
5. Click on "Create Method" and select "POST" from the dropdown.
6. Choose "Lambda Function" as the integration type and select the region where your Lambda function is deployed.
7. Enter the Lambda function name in the "Lambda Function" field.
8. Click "Save" to create the integration.
9. Click on "Method Request" and set "Request Validator" to "Validate body" to ensure that the request body is present and in the correct format.
10. Click on "Integration Request" and set "Content Handling" to "Passthrough."
11. Click on "Integration Response" and set the "Content Handling" to "Passthrough."
12. Click on "Method Response" and set the response status codes (e.g., 200, 500).
13. Deploy the API to a stage by clicking on "Deploy API" and creating a new stage.

After deploying the API, you'll get an endpoint URL that you can use to invoke the Lambda function and send SMS messages.

**Step 5: Test Sending SMS**

To test sending SMS messages, you can use a tool like Postman or curl to make a POST request to the API Gateway endpoint with the recipient phone number and message as the request body.

For example, using curl:

```
curl -X POST -H "Content-Type: application/json" -d '{"phoneNumber": "+1234567890", "message": "Hello from your Golang Lambda function! This is a test SMS."}' https://your-api-gateway-endpoint-url
```

Replace `+1234567890` with the destination phone number you want to send the test SMS to, and `your-api-gateway-endpoint-url` with the endpoint URL of your API Gateway.

After making the request, check your phone to verify that the test SMS has been successfully sent.

**Conclusion**

In this chapter, you've learned how to create a Golang Lambda function that sends SMS messages using Amazon SNS. By integrating SMS functionality into your serverless application, you can send important alerts and notifications to users.

In this example, we demonstrated a simple Lambda function that sends an SMS message to a specified phone number. However, you can customize the function to send different types of SMS messages, including multimedia messages (MMS), Unicode messages, and more.

In the next chapter, we'll explore more advanced topics, such as working with AWS Step Functions to orchestrate complex workflows and manage long-running processes in your serverless Go applications. Stay tuned for more exciting content on serverless Go development and AWS cloud services!