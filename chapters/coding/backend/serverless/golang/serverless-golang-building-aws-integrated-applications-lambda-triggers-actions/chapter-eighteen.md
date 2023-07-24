**Chapter 18: Sending Emails with Golang Lambda Function**

Welcome to Chapter 18 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on sending emails using a Golang Lambda function. Email communication is an essential aspect of many applications, and integrating email functionality into your serverless application can enhance user engagement and provide critical notifications.

**Prerequisites**

Before we dive into creating the Golang Lambda function for sending emails, ensure you have the following prerequisites:

1. An AWS account: You need an AWS account to access the AWS Management Console and create AWS resources.
2. The AWS Command Line Interface (CLI) installed and configured with your AWS credentials.

**Step 1: Set Up Amazon SES**

Amazon Simple Email Service (SES) is a fully managed email sending service provided by AWS. Before we proceed, we need to set up Amazon SES to send emails on our behalf. To set up Amazon SES:

1. Open the AWS Management Console and navigate to the Amazon SES service.
2. Click on "Email Addresses" in the left sidebar.
3. Click on "Verify a New Email Address" and follow the instructions to verify an email address you own. This step ensures that SES can send emails from this address.
4. After verifying the email address, you're ready to start sending emails through Amazon SES.

**Step 2: Write the Golang Lambda Function**

Next, we'll write a Golang Lambda function that will send emails using Amazon SES. In this example, we'll create a function that sends a simple text-based email to a specified recipient.

Create a new file named "send_email.go" in your Go project directory, and add the following code:

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
	"github.com/aws/aws-sdk-go/service/ses"
)

func sendEmail(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Get the recipient email address from the request body
	recipient := event.Body

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

	// Create a new SES client
	svc := ses.New(sess)

	// Configure the email parameters
	source := "your_verified_email@example.com" // Replace with your verified email address from Amazon SES
	destination := &ses.Destination{
		ToAddresses: []*string{
			aws.String(recipient),
		},
	}
	message := &ses.Message{
		Body: &ses.Body{
			Text: &ses.Content{
				Data: aws.String("Hello from your Golang Lambda function! This is a test email."),
			},
		},
		Subject: &ses.Content{
			Data: aws.String("Test Email from Golang Lambda"),
		},
	}
	input := &ses.SendEmailInput{
		Destination: destination,
		Message:     message,
		Source:      aws.String(source),
	}

	// Send the email
	_, err = svc.SendEmail(input)
	if err != nil {
		log.Printf("Error sending email: %v\n", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error sending email",
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Email sent successfully",
	}, nil
}

func main() {
	lambda.Start(sendEmail)
}
```

In this code, we import the necessary libraries for AWS Lambda events, including the "events" package for handling API Gateway requests, and the "ses" package for interacting with Amazon SES.

The `sendEmail` function is the entry point of our Lambda function. It takes the context and an `APIGatewayProxyRequest` as input. The function extracts the recipient email address from the request body and configures the AWS session and SES client.

The email parameters are set up, including the source (the verified email address from Amazon SES), the destination (the recipient email address), the email body, and the subject.

Finally, the function calls the `SendEmail` method of the SES client to send the email. If there's an error, the function returns an error response with the appropriate status code and message.

**Step 3: Build and Deploy the Lambda Function**

Before deploying the Lambda function, ensure you have the AWS CLI installed and configured with your AWS credentials.

To build the Lambda function binary, use the following command:

```
GOOS=linux GOARCH=amd64 go build -o main send_email.go
```

This command sets the environment variables `GOOS` and `GOARCH` to target the Linux environment (required for Lambda) and compiles the code into a binary named "main."

Next, create a deployment package by zipping the binary:

```
zip deployment.zip main
```

The deployment package contains the Lambda function binary and any additional files required for execution.

Finally, deploy the Lambda function using the AWS CLI:

```
aws lambda create-function --function-name MySendEmailLambdaFunction --runtime go1.x --handler main --zip-file fileb://deployment.zip --role YourExecutionRoleARN
```

Replace `MySendEmailLambdaFunction` with a suitable name for your Lambda function, and `YourExecutionRoleARN` with the ARN of an IAM role that allows the Lambda function to log messages to CloudWatch Logs and send emails through Amazon SES.

**Step 4: Create an API Gateway Endpoint**

To invoke the Lambda function and trigger the email sending process, we need to create an API Gateway endpoint. This endpoint will act as the interface for our clients to interact with the Lambda function.

1. Open the AWS Management Console and navigate to the Amazon API Gateway service.
2. Click on "Create API" and choose "REST API."
3. Provide a name for your API and click "Create API."
4. Click on "Create Resource" and choose a resource name.
5. Click on "Create Method" and select "POST"

 from the dropdown.
6. Choose "Lambda Function" as the integration type and select the region where your Lambda function is deployed.
7. Enter the Lambda function name in the "Lambda Function" field.
8. Click "Save" to create the integration.
9. Click on "Method Request" and set "Request Validator" to "Validate body" to ensure that the request body is present and in the correct format.
10. Click on "Integration Request" and set "Content Handling" to "Passthrough."
11. Click on "Integration Response" and set the "Content Handling" to "Passthrough."
12. Click on "Method Response" and set the response status codes (e.g., 200, 500).
13. Deploy the API to a stage by clicking on "Deploy API" and creating a new stage.

After deploying the API, you'll get an endpoint URL that you can use to invoke the Lambda function and send emails.

**Step 5: Test Sending Emails**

To test sending emails, you can use a tool like Postman or curl to make a POST request to the API Gateway endpoint with the recipient email address as the request body.

For example, using curl:

```
curl -X POST -H "Content-Type: application/json" -d '{"email": "recipient@example.com"}' https://your-api-gateway-endpoint-url
```

Replace `recipient@example.com` with the recipient email address you want to send the test email to, and `your-api-gateway-endpoint-url` with the endpoint URL of your API Gateway.

After making the request, check the email address you provided to verify that the test email has been successfully sent.

**Conclusion**

In this chapter, you've learned how to create a Golang Lambda function that sends emails using Amazon SES. By integrating email functionality into your serverless application, you can enhance user engagement and provide critical notifications.

In this example, we demonstrated a simple Lambda function that sends a text-based email to a specified recipient. However, you can customize the function to send different types of emails, including HTML-based emails, attachments, and more.

In the next chapter, we'll explore more advanced topics, such as working with AWS Step Functions to orchestrate complex workflows and manage long-running processes in your serverless Go applications. Stay tuned for more exciting content on serverless Go development and AWS cloud services!