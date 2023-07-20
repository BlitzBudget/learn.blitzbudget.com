# Chapter 11: Deploying a DynamoDB Table with CloudFormation

In this chapter, we'll explore how to deploy a DynamoDB table using AWS CloudFormation. DynamoDB is a fully managed NoSQL database service that provides fast and scalable storage for structured data. By leveraging CloudFormation, we can define the table's schema, provisioned throughput, and other attributes in a template, making it easy to create and manage our DynamoDB resources as code.

## Prerequisites

Before we begin, ensure you have AWS CLI and CloudFormation CLI (cfn) installed and configured with appropriate permissions to deploy resources. Also, make sure you have basic knowledge of DynamoDB's data model, including primary keys and attribute types.

## Creating the CloudFormation Template

To create the DynamoDB table, we'll use a CloudFormation template to define the resource. Below is an example CloudFormation template for creating a simple DynamoDB table.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for DynamoDB Table'

Resources:
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

Outputs:
  DynamoDBTableName:
    Value: !Ref MyDynamoDBTable
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. We create a DynamoDB table resource named "MyDynamoDBTable."

- `Type: AWS::DynamoDB::Table` specifies the resource type for the DynamoDB table.

- `Properties` section contains the configuration for the DynamoDB table. We set the table name as "MyTable" and define the attribute and key schema.

- `AttributeDefinitions` specify the attributes of the table. In this example, we have a single attribute named "ID" with the attribute type "N" (number).

- `KeySchema` defines the primary key of the table. We set "ID" as the hash key.

- `ProvisionedThroughput` sets the initial capacity for read and write operations. In this case, we provision 5 read and write capacity units.

- `Outputs` section provides an output named "DynamoDBTableName" that exposes the name of the created DynamoDB table.

## Deploying the DynamoDB Table

To deploy the DynamoDB table using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `dynamodb-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyDynamoDBStack --template-body file://dynamodb-template.yaml
```

This command creates a new CloudFormation stack named "MyDynamoDBStack" using the "dynamodb-template.yaml" template.

## Conclusion

In this chapter, we successfully deployed a DynamoDB table using AWS CloudFormation. With CloudFormation, we can easily define and manage our infrastructure as code, making it simpler to create and maintain DynamoDB tables in a repeatable and scalable manner. In the next chapters, we'll continue to explore CloudFormation for deploying other AWS resources and building a comprehensive serverless application.