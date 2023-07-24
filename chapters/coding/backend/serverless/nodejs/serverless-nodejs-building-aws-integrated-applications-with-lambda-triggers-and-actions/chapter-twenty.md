# Chapter 20: Creating a Node.js Lambda Function to Process S3 Event Data and Store it in DynamoDB

Processing data from Amazon S3 and storing it in DynamoDB is a common use case for serverless applications. In this chapter, we'll explore how to create a Node.js Lambda function that is triggered by S3 events and processes the data to store it in DynamoDB. This powerful combination allows you to build scalable and efficient data processing pipelines.

## Introduction to S3 Event Triggers

Amazon S3 event triggers enable you to respond to changes in your S3 buckets, such as object creations, deletions, or modifications. When an event occurs in the specified S3 bucket, the Lambda function is automatically invoked, allowing you to process the data and take appropriate actions.

## Introduction to DynamoDB

Amazon DynamoDB is a fully managed NoSQL database service provided by AWS. It offers fast and predictable performance with seamless scalability. DynamoDB is ideal for storing and retrieving large volumes of data with low-latency access.

## Prerequisites

Before we start, make sure you have the following prerequisites:

1. An AWS account with appropriate permissions to create Lambda functions, use S3, and DynamoDB.

2. Node.js and npm installed on your local development machine.

3. An S3 bucket with sample data to test the Lambda function. Make sure you have the necessary permissions to read from the bucket.

4. A DynamoDB table to store the processed data. Ensure you have the required IAM permissions to perform CRUD operations on the table.

## Step-by-Step: Creating the Node.js Lambda Function

In this section, we'll guide you through the process of creating a serverless Node.js Lambda function that processes S3 event data and stores it in DynamoDB.

### Step 1: Set Up the Node.js Project

1. Create a new directory for your Node.js Lambda function project and navigate to it.

```bash
mkdir process-s3-event-lambda
cd process-s3-event-lambda
```

2. Initialize a new Node.js project and install the necessary dependencies.

```bash
npm init -y
npm install aws-sdk --save
```

### Step 2: Implement the Lambda Function

Create a new file named `index.js` in your project directory and implement the Lambda function code as follows:

```javascript
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event, context) => {
  try {
    // Process the S3 event data and store it in DynamoDB
    await processAndStoreData(event);

    return {
      statusCode: 200,
      body: JSON.stringify('Data processing and storage successful.'),
    };
  } catch (error) {
    console.error('Error processing data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error processing data.'),
    };
  }
};

async function processAndStoreData(event) {
  // Extract relevant information from the S3 event
  const s3Records = event.Records;
  const processedData = [];

  // Process each S3 record and prepare data for DynamoDB
  for (const record of s3Records) {
    if (record.eventName.startsWith('ObjectCreated:')) {
      const bucketName = record.s3.bucket.name;
      const objectKey = record.s3.object.key;
      const objectSize = record.s3.object.size;
      const objectLastModified = record.s3.object.lastModified;

      // Perform additional processing or data transformation as needed

      // Store the processed data in DynamoDB
      const params = {
        TableName: 'YourDynamoDBTableName', // Replace with your DynamoDB table name
        Item: {
          BucketName: bucketName,
          ObjectKey: objectKey,
          ObjectSize: objectSize,
          ObjectLastModified: objectLastModified,
        },
      };

      await dynamoDB.put(params).promise();
      processedData.push(params.Item);
    }
  }

  return processedData;
}
```

In this example, we use the `aws-sdk` package to interact with S3 and DynamoDB. The Lambda function is triggered by S3 events, and it processes the data from the event to store it in DynamoDB. Make sure to replace `'YourDynamoDBTableName'` with the name of your DynamoDB table where you want to store the data.

### Step 3: Create the Lambda Function

1. Zip the project files, including `index.js` and `node_modules`, into a ZIP file.

```bash
zip -r process-s3-event-lambda.zip .
```

2. Go to the AWS Management Console and navigate to the Lambda service.

3. Click on "Create function."

4. Choose "Author from scratch."

5. Provide a name for your Lambda function.

6. For the runtime, select "Node.js."

7. Under "Function code," choose "Upload a .zip file" and upload the `process-s3-event-lambda.zip` file you created.

8. Under "Permissions," choose an existing role with the necessary permissions or create a new role with the `lambda.amazonaws.com` service as a trusted entity and the required permissions for S3 and DynamoDB.

9. Click "Create function" to create the Lambda function.

### Step 4: Set Up the S3 Event Trigger

1. Go to the AWS Management Console and navigate to the S3 service.

2. Find and click on the S3 bucket from which you want to trigger the Lambda function.

3. Click on the "Properties" tab and then click on "Events."

4. Click on "Add notification."

5. Choose "Lambda function" as the event type.

6. Select the Lambda function you created from the dropdown menu.

7. Configure the event settings as needed (e.g., event name, prefix, suffix).

8. Click "Save" to add the S3 event trigger to the Lambda function.

### Step 5: Test the Lambda Function

1. Upload a sample file to the

 S3 bucket to trigger the Lambda function.

2. In the Lambda function page, click on "Monitoring" and then "View logs in CloudWatch" to view the logs generated during the function's execution.

3. Check the DynamoDB table to ensure that the processed data is stored correctly.

## Conclusion

In this chapter, we learned how to create a Node.js Lambda function that is triggered by S3 events and processes the data to store it in DynamoDB. By leveraging S3 event triggers and DynamoDB's scalability and performance, you can build efficient and powerful data processing pipelines for your serverless applications.

In this example, we focused on processing and storing data from S3, but you can extend this concept to perform various data transformations, analytics, or aggregations based on your specific use case. With AWS Lambda and Node.js, you have the tools to build sophisticated and responsive serverless applications.

Now that you have mastered the process of building AWS-integrated applications with Lambda triggers and actions using Node.js, you are well-equipped to explore more advanced topics and build even more complex serverless architectures. Happy coding!