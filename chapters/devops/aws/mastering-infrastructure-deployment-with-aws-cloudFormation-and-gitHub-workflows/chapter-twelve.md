# Chapter 12: Integrating Lambda with DynamoDB using CloudFormation

In this chapter, we'll take our serverless application to the next level by integrating AWS Lambda with the DynamoDB table we created in the previous chapter. AWS Lambda allows you to run code without provisioning or managing servers, making it a perfect companion to DynamoDB for real-time data processing.

## Prerequisites

Before proceeding, ensure you have completed Chapter 11 and have the DynamoDB table available in your AWS account. Additionally, you should have some experience with AWS Lambda and its basic concepts.

## Creating the Lambda Function

First, let's create a simple Lambda function that interacts with our DynamoDB table. In this example, we'll create a function that puts an item into the table whenever it is invoked.

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const params = {
    TableName: 'MyTable',
    Item: {
      ID: { N: '12345' },
      Name: { S: 'John Doe' },
      Email: { S: 'john.doe@example.com' },
    },
  };

  try {
    await dynamodb.putItem(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify('Item added to DynamoDB successfully!'),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Error adding item to DynamoDB.'),
    };
  }
};
```

## Creating the CloudFormation Template

Next, let's create a CloudFormation template to define our Lambda function and the necessary permissions to interact with DynamoDB.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for Lambda Function and Permissions'

Resources:
  MyLambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: MyLambdaFunction
      Runtime: nodejs14.x
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          const AWS = require('aws-sdk');
          const dynamodb = new AWS.DynamoDB();

          exports.handler = async (event) => {
            // Lambda function code (same as above)
          }

  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: LambdaExecutionRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: DynamoDBAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                Resource: !GetAtt MyDynamoDBTable.Arn

Outputs:
  LambdaFunctionName:
    Value: !Ref MyLambdaFunction
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the Lambda function and the IAM role required for the function.

- `MyLambdaFunction` resource creates the Lambda function. We specify the function name, runtime (Node.js 14.x), handler, and the IAM role to be used by the function.

- `Code` property provides the Lambda function code inline within the template.

- `LambdaExecutionRole` resource creates an IAM role for the Lambda function. We define an AssumeRolePolicyDocument that allows Lambda to assume this role and access the DynamoDB table.

- `Policies` specify the permissions granted to the IAM role. In this example, we grant permission to perform the `PutItem` action on the DynamoDB table created in Chapter 11.

## Deploying the Lambda Function

To deploy the Lambda function using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `lambda-dynamodb-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name LambdaDynamoDBStack --template-body file://lambda-dynamodb-template.yaml
```

This command creates a new CloudFormation stack named "LambdaDynamoDBStack" using the "lambda-dynamodb-template.yaml" template.

## Testing the Integration

Now that our Lambda function and DynamoDB table are deployed, let's test the integration:

1. Navigate to the AWS Lambda console, find the Lambda function named "MyLambdaFunction," and click "Test."

2. Create a new test event with the following JSON payload:

```json
{
  "key1": "value1",
  "key2": "value2"
}
```

3. Click "Test" to invoke the Lambda function. The function will put a new item into the DynamoDB table.

## Conclusion

In this chapter, we successfully integrated AWS Lambda with our DynamoDB table using AWS CloudFormation. By creating a Lambda function and granting it the appropriate permissions, we can now interact with DynamoDB seamlessly. In the next chapters, we'll continue building our serverless application by adding more components and linking them together in a comprehensive CloudFormation template.