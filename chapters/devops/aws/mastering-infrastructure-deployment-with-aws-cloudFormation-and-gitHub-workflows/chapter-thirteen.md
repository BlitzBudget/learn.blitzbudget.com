# Chapter 13: Implementing Lambda Triggers for DynamoDB Events

In this chapter, we'll explore how to implement AWS Lambda triggers for DynamoDB events. DynamoDB triggers allow you to automatically invoke a Lambda function in response to specific changes or events on your DynamoDB table. This powerful combination enables you to build event-driven applications that react to data changes in real-time.

## Prerequisites

Before proceeding, ensure you have completed Chapter 12 and have the Lambda function and DynamoDB table available in your AWS account. Additionally, you should have some experience with DynamoDB streams and AWS Lambda.

## Creating a DynamoDB Stream

To set up a Lambda trigger for DynamoDB events, we need to enable a DynamoDB stream on the table. A stream is an ordered flow of information representing changes to items in the table. Follow the steps below to enable the stream:

1. Open the AWS DynamoDB console and navigate to your existing DynamoDB table.

2. Click on the "Manage Stream" button under the "Overview" tab.

3. Choose "New and old images" as the stream view type and click "Enable."

## Implementing the Lambda Trigger

With the DynamoDB stream enabled, let's modify our Lambda function to handle the incoming events. In this example, we'll update our function to log the details of the changes whenever an item is added, updated, or deleted from the DynamoDB table.

```javascript
const AWS = require('aws-sdk');

exports.handler = async (event) => {
  for (const record of event.Records) {
    const eventName = record.eventName;
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    if (eventName === 'INSERT') {
      // Handle new item added to the table
      const newItem = record.dynamodb.NewImage;
      console.log('New item added:', newItem);
    } else if (eventName === 'MODIFY') {
      // Handle item modification
      const oldItem = record.dynamodb.OldImage;
      const newItem = record.dynamodb.NewImage;
      console.log('Item modified - Old:', oldItem, ' New:', newItem);
    } else if (eventName === 'REMOVE') {
      // Handle item deletion
      const oldItem = record.dynamodb.OldImage;
      console.log('Item deleted:', oldItem);
    } else {
      // Unsupported event
      console.log('Unsupported event:', eventName);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Lambda trigger executed successfully!'),
  };
};
```

## Updating the CloudFormation Template

Now, let's update the CloudFormation template to add the Lambda trigger for DynamoDB events.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for Lambda Function with DynamoDB Trigger'

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

          exports.handler = async (event) => {
            // Lambda function code (updated as shown above)
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
                  - dynamodb:GetItem
                  - dynamodb:UpdateItem
                  - dynamodb:DeleteItem
                Resource: !GetAtt MyDynamoDBTable.Arn

  MyDynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: MyTable
      AttributeDefinitions:
        - AttributeName: ID
          AttributeType: N
      KeySchema:
        - AttributeName: ID
          KeyType: HASH
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
      StreamSpecification:
        StreamViewType: NEW_AND_OLD_IMAGES

  MyDynamoDBEventMapping:
    Type: AWS::Lambda::EventSourceMapping
    Properties:
      EventSourceArn: !GetAtt MyDynamoDBTable.StreamArn
      FunctionName: !GetAtt MyLambdaFunction.Arn

Outputs:
  LambdaFunctionName:
    Value: !Ref MyLambdaFunction
```

In this updated template:

- We add the `StreamSpecification` property to the DynamoDB table resource, enabling the stream with the `NEW_AND_OLD_IMAGES` view type.

- We introduce a new resource named `MyDynamoDBEventMapping` of type `AWS::Lambda::EventSourceMapping`, which creates a mapping between the Lambda function and the DynamoDB stream.

- The `EventSourceArn` property of `MyDynamoDBEventMapping` references the ARN of the DynamoDB stream we created in the previous steps.

- The `FunctionName` property of `MyDynamoDBEventMapping` references the ARN of the Lambda function that will handle the DynamoDB events.

## Deploying the Lambda Trigger

To deploy the Lambda trigger using the updated CloudFormation template, follow these steps:

1. Save the updated template

 to a file (e.g., `lambda-dynamodb-trigger-template.yaml`).

2. Use the AWS CLI to update the existing CloudFormation stack:

```bash
aws cloudformation update-stack --stack-name LambdaDynamoDBTriggerStack --template-body file://lambda-dynamodb-trigger-template.yaml
```

This command updates the existing CloudFormation stack named "LambdaDynamoDBTriggerStack" with the changes made in the updated template.

## Testing the Lambda Trigger

To test the Lambda trigger, perform operations (add, modify, delete items) on the DynamoDB table. Each operation should trigger the Lambda function, and you should see corresponding logs in the AWS Lambda console.

## Conclusion

In this chapter, we successfully implemented AWS Lambda triggers for DynamoDB events using AWS CloudFormation. By enabling and configuring the DynamoDB stream and updating our Lambda function, we can now react to changes in the DynamoDB table in real-time. This capability opens up various possibilities for building event-driven and serverless applications. In the next chapters, we'll continue enhancing our serverless application by adding more components and linking them together in a comprehensive CloudFormation template.