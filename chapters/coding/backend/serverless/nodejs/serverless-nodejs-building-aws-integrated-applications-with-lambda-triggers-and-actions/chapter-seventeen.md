# Chapter 17: Creating a Node.js Lambda Function with DynamoDB Stream Trigger

Amazon DynamoDB is a fully managed NoSQL database service provided by AWS. It offers fast and predictable performance with seamless scalability, making it a popular choice for applications that require low-latency data access. In this chapter, we'll explore how to create a serverless Node.js Lambda function with a DynamoDB stream trigger. This trigger allows the Lambda function to process data changes in real-time and take appropriate actions based on the modifications to the DynamoDB table.

## Why Use DynamoDB Stream Triggers with Lambda

DynamoDB streams are an ordered sequence of item-level modifications in a DynamoDB table. When an item is created, updated, or deleted in the table, a corresponding event is captured and added to the stream. By using a DynamoDB stream trigger, you can automatically invoke a Lambda function to process these events and update other parts of your application or perform additional tasks.

## How DynamoDB Stream Triggers Lambda

When a data modification occurs in a DynamoDB table, the change is recorded in the table's stream. The stream triggers the associated Lambda function, passing the stream record as the event parameter. The Lambda function can then access the modified item's data and process it accordingly.

## Step-by-Step: Creating a Node.js Lambda Function with DynamoDB Stream Trigger

In this section, we'll guide you through the process of creating a serverless Node.js Lambda function with a DynamoDB stream trigger. We'll assume that you have already set up a DynamoDB table and have the necessary permissions to create Lambda functions.

### Step 1: Set Up the DynamoDB Table

1. Go to the AWS Management Console and navigate to the DynamoDB service.

2. Click on "Create table."

3. Provide a unique name for your table.

4. Choose the primary key for the table (partition key or composite key).

5. Click "Create" to create the DynamoDB table.

### Step 2: Enable the DynamoDB Stream

1. After creating the DynamoDB table, click on the table name to view its details.

2. Go to the "Overview" tab and click on "Manage stream."

3. Choose the stream settings you want. For this example, select "New and old images" to include both the old and new versions of the item in the stream.

4. Click "Enable" to enable the stream for the DynamoDB table.

### Step 3: Create the Lambda Function

1. Go to the AWS Management Console and navigate to the Lambda service.

2. Click on "Create function."

3. Choose "Author from scratch."

4. Provide a name for your Lambda function.

5. For the runtime, select "Node.js."

6. Under "Permissions," choose an existing role with the necessary permissions or create a new role with the `lambda.amazonaws.com` service as a trusted entity and the required permissions for DynamoDB.

7. Click "Create function" to create the Lambda function.

### Step 4: Configure the DynamoDB Stream Trigger

1. In the Lambda function page, go to the "Designer" section and click on "Add trigger."

2. Select "DynamoDB" from the trigger options.

3. In the "Configure triggers" section, choose the DynamoDB table you created in Step 1.

4. For the "Batch size," select the number of stream records to send to the Lambda function in each invocation. A larger batch size can improve efficiency for higher throughput, but it may result in higher costs.

5. Optionally, you can specify a starting position in the stream for the Lambda function to begin processing.

6. Click "Add" to add the trigger.

### Step 5: Implement the Lambda Function

Now that we have set up the Lambda function with the DynamoDB stream trigger, let's implement the function's code to handle the incoming stream records.

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    // Process each record in the stream
    for (const record of event.Records) {
      // Retrieve the modified item's data from the stream record
      const modifiedItem = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

      // Your custom logic based on the modified item's data goes here
      console.log('Modified item:', modifiedItem);

      // Update other parts of your application or perform additional tasks
      // ...
    }

    return {
      statusCode: 200,
      body: JSON.stringify('DynamoDB stream processed successfully.'),
    };
  } catch (error) {
    console.error('Error processing DynamoDB stream:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error processing DynamoDB stream.'),
    };
  }
};
```

In this example, the Lambda function receives the DynamoDB stream event from the `event` parameter. The code processes each record in the stream using a `for...of` loop. It retrieves the modified item's data from the stream record using `AWS.DynamoDB.Converter.unmarshall()`.

You can perform any custom logic based on the modified item's data. For

 example, you could update related items in other DynamoDB tables, send notifications, or trigger other AWS services based on the changes in the DynamoDB table.

### Step 6: Test the DynamoDB Stream Trigger

With the Lambda function and DynamoDB stream trigger set up, you can now test the trigger by making changes to the items in the DynamoDB table.

1. Go to the AWS Management Console and navigate to the DynamoDB service.

2. Select the table you created in Step 1.

3. Click on the "Items" tab and choose an item to modify or delete.

4. Make changes to the item and save the changes.

### Step 7: Monitor the Lambda Function

After making changes to the items in the DynamoDB table, the stream trigger will automatically invoke the Lambda function for each modification. You can monitor the function's execution and view the logs in the AWS Management Console under the Lambda service. Check the logs to see the output of the custom logic executed by the Lambda function based on the modified item's data.

## Conclusion

In this chapter, we explored how to create a serverless Node.js Lambda function with a DynamoDB stream trigger. By using DynamoDB stream triggers, you can build real-time data processing and event-driven applications that respond to changes in your DynamoDB tables.

DynamoDB streams provide an efficient way to capture and process item-level modifications in your tables, while Lambda allows you to react to these changes with custom logic and actions. This powerful combination enables you to build scalable and responsive applications that handle data changes in real-time.

With DynamoDB stream triggers, you can extend the capabilities of your Node.js Lambda functions and seamlessly integrate them with other AWS services. In the next chapter, we'll dive into sending emails using a Node.js Lambda function and Amazon SES (Simple Email Service). Let's continue our journey to master serverless Node.js development!