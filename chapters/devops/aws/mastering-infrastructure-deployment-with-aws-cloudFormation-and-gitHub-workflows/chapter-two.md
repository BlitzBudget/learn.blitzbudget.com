# Chapter 2: Creating a Lambda Function with CloudFormation

In this chapter, we'll learn how to use AWS CloudFormation to create an AWS Lambda function. AWS Lambda is a serverless compute service that allows you to run code without provisioning or managing servers. With CloudFormation, you can define the Lambda function's properties and deployment settings as code, making it easier to manage and reproduce.

## Creating a CloudFormation Template for Lambda Function

Let's create a CloudFormation template to provision an AWS Lambda function. The function will be triggered by an API Gateway endpoint, which we'll set up in later chapters.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for AWS Lambda Function'

Resources:
  MyLambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      Code:
        ZipFile: |
          const handler = async (event) => {
            return {
              statusCode: 200,
              body: JSON.stringify('Hello from AWS Lambda!'),
            };
          };
          exports.handler = handler;
      Handler: index.handler
      Runtime: nodejs14.x
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. In this case, it creates an AWS Lambda function named "MyLambdaFunction."

- `Type: AWS::Lambda::Function` specifies the resource type for Lambda function.

- `Code` section contains the code for the Lambda function, written in Node.js. The `ZipFile` property includes the function code directly in the template.

- `Handler` specifies the name of the file containing the Lambda function code (`index.js`) and the exported function name (`handler`).

- `Runtime` defines the runtime environment for the Lambda function. In this example, we use `nodejs14.x`.

## Deploying the Lambda Function

To deploy the Lambda function using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `lambda-function-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyLambdaStack --template-body file://lambda-function-template.yaml
```

This command creates a new CloudFormation stack named "MyLambdaStack" using the "lambda-function-template.yaml" template.

## Conclusion

In this chapter, we learned how to create an AWS Lambda function using AWS CloudFormation. We defined the function's properties and code within the CloudFormation template and deployed the stack using the AWS CLI.

Using CloudFormation to manage Lambda functions offers several advantages, including version control, reproducibility, and scalability. In the next chapters, we'll expand on this foundation and explore more advanced use cases, such as integrating the Lambda function with an API Gateway and securing it with authentication and authorization mechanisms.

---