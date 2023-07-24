# Chapter 6: Leveraging DynamoDB with Node.js

In this chapter, we'll dive into Amazon DynamoDB, a fully managed NoSQL database service provided by AWS. DynamoDB is known for its low-latency performance, seamless scalability, and automatic data replication across multiple Availability Zones. We'll explore how to interact with DynamoDB using Node.js to perform CRUD (Create, Read, Update, Delete) operations, set up DynamoDB streams, and utilize the power of NoSQL for our serverless applications.

## Prerequisites

Before we begin, ensure you have the following prerequisites:

1. An AWS account with the AWS CLI installed and configured. If you haven't set up an AWS account and the AWS CLI, refer to Chapter 2 for instructions.

2. Node.js and npm installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

3. Basic knowledge of JavaScript and Node.js.

## Setting Up AWS SDK

To interact with AWS services, including DynamoDB, we need the AWS SDK for JavaScript. Install it as a project dependency using npm:

```bash
npm install aws-sdk
```

## Creating a DynamoDB Table

Before we can interact with DynamoDB, we need to create a table. Let's create a new file named `createTable.js` and add the following code:

```javascript
// createTable.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB();

const tableName = 'your-table-name'; // Replace 'your-table-name' with the desired table name
const primaryKey = 'userId'; // Replace 'userId' with the desired primary key

const params = {
  TableName: tableName,
  KeySchema: [
    { AttributeName: primaryKey, KeyType: 'HASH' },
  ],
  AttributeDefinitions: [
    { AttributeName: primaryKey, AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.log("Error creating table:", err);
  } else {
    console.log("Table created successfully:", data);
  }
});
```

In this code, we create an instance of the DynamoDB service using the AWS SDK. We define the `tableName` and `primaryKey` variables to specify the desired table name and primary key for the table.

The `params` object contains the configuration details for the table. We specify the table name, primary key attribute name and type, and the provisioned throughput (capacity) for read and write operations.

When you run this script, it will create a new DynamoDB table with the specified configuration.

## Adding Data to DynamoDB

Now that we have a table, let's add some data to it. Create a new file named `addData.js` and add the following code:

```javascript
// addData.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'your-table-name'; // Replace 'your-table-name' with the table name

const item = {
  userId: 'user123', // Replace 'user123' with the desired user ID
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
};

const params = {
  TableName: tableName,
  Item: item,
};

dynamodb.put(params, (err, data) => {
  if (err) {
    console.log("Error adding data to DynamoDB:", err);
  } else {
    console.log("Data added successfully to DynamoDB:", data);
  }
});
```

In this code, we create an instance of the `DocumentClient` class from the AWS SDK. The `DocumentClient` simplifies interacting with DynamoDB by automatically converting JSON objects to the correct DynamoDB data types.

We define the `tableName` variable to specify the table where we want to add the data. The `item` object contains the data that we want to add to DynamoDB.

The `dynamodb.put()` method is used to put (add) the item to the DynamoDB table. When the data is successfully added, the `data` object will contain information about the operation, which we log to the console.

## Retrieving Data from DynamoDB

Now that we have added data to DynamoDB, let's retrieve it. Create a new file named `getData.js` and add the following code:

```javascript
// getData.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'your-table-name'; // Replace 'your-table-name' with the table name
const primaryKey = 'user123'; // Replace 'user123' with the desired user ID to retrieve

const params = {
  TableName: tableName,
  Key: {
    userId: primaryKey,
  },
};

dynamodb.get(params, (err, data) => {
  if (err) {
    console.log("Error retrieving data from DynamoDB:", err);
  } else {
    console.log("Data retrieved successfully from DynamoDB:", data.Item);
  }
});
```

In this code, we use the `dynamodb.get()` method to retrieve an item from the DynamoDB table based on its primary key. The `data` object will contain the retrieved item, which we log to the console.

## Updating Data in

 DynamoDB

Let's update the data in DynamoDB. Create a new file named `updateData.js` and add the following code:

```javascript
// updateData.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'your-table-name'; // Replace 'your-table-name' with the table name
const primaryKey = 'user123'; // Replace 'user123' with the desired user ID to update

const params = {
  TableName: tableName,
  Key: {
    userId: primaryKey,
  },
  UpdateExpression: 'set age = :age',
  ExpressionAttributeValues: {
    ':age': 35, // Replace 35 with the new age value
  },
  ReturnValues: 'UPDATED_NEW',
};

dynamodb.update(params, (err, data) => {
  if (err) {
    console.log("Error updating data in DynamoDB:", err);
  } else {
    console.log("Data updated successfully in DynamoDB:", data.Attributes);
  }
});
```

In this code, we use the `dynamodb.update()` method to update an item in the DynamoDB table. We specify the `UpdateExpression` to indicate which attribute we want to update and the `ExpressionAttributeValues` to provide the new value for the attribute.

The `ReturnValues` parameter is set to `'UPDATED_NEW'`, which means that the method will return the updated attributes of the item. The `data` object will contain the updated attributes, which we log to the console.

## Deleting Data from DynamoDB

Finally, let's delete data from DynamoDB. Create a new file named `deleteData.js` and add the following code:

```javascript
// deleteData.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'your-table-name'; // Replace 'your-table-name' with the table name
const primaryKey = 'user123'; // Replace 'user123' with the desired user ID to delete

const params = {
  TableName: tableName,
  Key: {
    userId: primaryKey,
  },
};

dynamodb.delete(params, (err, data) => {
  if (err) {
    console.log("Error deleting data from DynamoDB:", err);
  } else {
    console.log("Data deleted successfully from DynamoDB:", data);
  }
});
```

In this code, we use the `dynamodb.delete()` method to delete an item from the DynamoDB table based on its primary key.

## DynamoDB Streams

DynamoDB Streams allow you to capture changes (insertions, updates, and deletions) to items in a DynamoDB table. You can then process these changes using AWS Lambda or other services. Let's set up a DynamoDB Stream for our table.

Create a new file named `setupStream.js` and add the following code:

```javascript
// setupStream.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB();

const tableName = 'your-table-name'; // Replace 'your-table-name' with the table name

const params = {
  TableName: tableName,
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: 'NEW_AND_OLD_IMAGES',
  },
};

dynamodb.updateTable(params, (err, data) => {
  if (err) {
    console.log("Error setting up DynamoDB Stream:", err);
  } else {
    console.log("DynamoDB Stream set up successfully:", data);
  }
});
```

In this code, we use the `dynamodb.updateTable()` method to set up a DynamoDB Stream for the specified table. We enable the stream and specify the `StreamViewType` as `'NEW_AND_OLD_IMAGES'`, which means the stream will capture both the new and old images of the changed items.

## Conclusion

In this chapter, we explored how to leverage DynamoDB with Node.js to perform CRUD operations, set up DynamoDB Streams, and interact with the NoSQL database service in our serverless applications.

DynamoDB is a powerful and versatile database service that can handle a wide range of use cases, from low-latency, high-throughput applications to real-time data analytics. With the knowledge gained in this chapter, you can now build serverless applications that utilize the scalability and flexibility of DynamoDB to meet your specific needs.

In the next chapters, we'll continue our exploration of AWS services and demonstrate how to integrate them into our Node.js serverless applications to create even more sophisticated and dynamic cloud-native solutions. Stay tuned for more exciting tutorials and examples!