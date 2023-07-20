#Chapter 6: Storing Data in DynamoDB - Using NoSQL Database for Your Application

Key Topics:

1. Introducing Amazon DynamoDB:
   - Amazon DynamoDB is a fully managed NoSQL database service provided by AWS.
   - It offers seamless scalability, high availability, and low-latency performance, making it suitable for a wide range of applications.

2. Creating DynamoDB Tables with AWS CDK:
   - In CDK, you can define and provision DynamoDB tables using the `aws-dynamodb` module.
   - Specify the table name, primary key schema, and read/write capacity units.

   Example:
   ```typescript
   import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

   // Inside your CDK Stack constructor
   const myTable = new dynamodb.Table(this, 'MyTable', {
     tableName: 'MyTable',
     partitionKey: {
       name: 'userId',
       type: dynamodb.AttributeType.STRING,
     },
     readCapacity: 5,
     writeCapacity: 5,
   });
   ```

3. Global Secondary Indexes (GSI) in DynamoDB:
   - GSIs allow you to create alternate query patterns for your data in DynamoDB.
   - They provide flexibility in querying data based on different attributes other than the primary key.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myTable.addGlobalSecondaryIndex({
     indexName: 'EmailIndex',
     partitionKey: {
       name: 'email',
       type: dynamodb.AttributeType.STRING,
     },
     readCapacity: 5,
     writeCapacity: 5,
   });
   ```

4. Working with DynamoDB Items:
   - Items in DynamoDB are the individual data records stored in a table.
   - Each item consists of attributes, and the primary key uniquely identifies each item in the table.

   Example:
   ```typescript
   // Inside your Lambda function code
   const AWS = require('aws-sdk');
   const dynamoDB = new AWS.DynamoDB.DocumentClient();

   exports.handler = async (event) => {
     const params = {
       TableName: 'MyTable',
       Item: {
         userId: 'user123',
         name: 'John Doe',
         email: 'john.doe@example.com',
         age: 30,
       },
     };

     await dynamoDB.put(params).promise();
     return 'Item added successfully.';
   };
   ```

5. Querying and Scanning Data in DynamoDB:
   - DynamoDB provides two primary ways to retrieve data: Query and Scan.
   - Query is used to retrieve items based on the primary key, while Scan fetches items by filtering the entire table.

   Example - Query:
   ```typescript
   // Inside your Lambda function code
   const params = {
     TableName: 'MyTable',
     KeyConditionExpression: 'userId = :userId',
     ExpressionAttributeValues: {
       ':userId': 'user123',
     },
   };

   const result = await dynamoDB.query(params).promise();
   return result.Items;
   ```

   Example - Scan:
   ```typescript
   // Inside your Lambda function code
   const params = {
     TableName: 'MyTable',
     FilterExpression: 'age > :age',
     ExpressionAttributeValues: {
       ':age': 25,
     },
   };

   const result = await dynamoDB.scan(params).promise();
   return result.Items;
   ```

6. Batch Writes in DynamoDB:
   - DynamoDB allows you to perform batch writes to put or delete multiple items simultaneously.
   - This can help optimize the performance and reduce the number of API calls.

   Example:
   ```typescript
   // Inside your Lambda function code
   const AWS = require('aws-sdk');
   const dynamoDB = new AWS.DynamoDB.DocumentClient();

   exports.handler = async (event) => {
     const params = {
       RequestItems: {
         'MyTable': [
           {
             PutRequest: {
               Item: {
                 userId: 'user456',
                 name: 'Jane Smith',
                 email: 'jane.smith@example.com',
                 age: 28,
               },
             },
           },
           {
             DeleteRequest: {
               Key: {
                 userId: 'user789',
               },
             },
           },
         ],
       },
     };

     await dynamoDB.batchWrite(params).promise();
     return 'Batch writes completed successfully.';
   };
   ```

7. Managing Read and Write Capacity Units:
   - DynamoDB allows you to provision read and write capacity units to manage the throughput for your table.
   - Monitor and adjust the capacity units based on your application's demand.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myTable.scaleReadCapacityUtilization({ targetUtilizationPercent: 70 });
   myTable.scaleWriteCapacityUtilization({ targetUtilizationPercent: 70 });
   ```

8. DynamoDB Auto Scaling:
   - DynamoDB Auto Scaling automatically adjusts the table's read and write capacity based on the actual traffic and demand.
   - Configure Auto Scaling to handle varying workloads and optimize cost.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myTable.autoScaleReadCapacity({ minCapacity: 5, maxCapacity: 100 });
   myTable.autoScaleWriteCapacity({ minCapacity: 5, maxCapacity: 100 });
   ```

9. Data Modeling in DynamoDB:
   - Design your DynamoDB tables to efficiently store and retrieve data based on your application's requirements.
   - Optimize the table schema and choose the right attributes as primary keys and indexes.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   const myTable = new dynamodb.Table(this, 'MyTable', {
     tableName: 'MyTable',
     partitionKey: {
       name: 'userId',
       type: dynamodb.AttributeType.STRING,
     },
     sortKey: {
       name: 'creationDate',
       type: dynamodb.AttributeType.STRING,
     },
     billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
   });
   ```

10. Best Practices for DynamoDB:
    - Follow best practices to optimize DynamoDB performance and cost efficiency.
    - Consider factors like capacity planning, data modeling, and efficient queries.

    Example:
    - Use sparse indexes to minimize costs and improve performance for specific queries.
    - Leverage caching mechanisms to reduce the number of expensive DynamoDB calls.

Understanding how to use Amazon DynamoDB effectively with AWS CDK will enable you to create robust and scalable data storage solutions for your applications. With DynamoDB's flexible NoSQL database model and CDK's infrastructure-as-code capabilities, you can efficiently manage and query data in a serverless and cost-effective manner.