# Chapter 12: Processing S3 Event Data and Storing it in DynamoDB

In this chapter, we will continue building on the concepts we explored in the previous chapters. Specifically, we will focus on how to process data from S3 event triggers using serverless Node.js Lambda functions and store that data in Amazon DynamoDB. DynamoDB is a fully managed NoSQL database service provided by AWS, offering high performance and seamless scalability for handling large volumes of data. By combining S3 events with DynamoDB, we can create a powerful serverless architecture that efficiently processes and stores data in real-time.

## Understanding the Scenario

Let's consider a scenario where users upload images to an S3 bucket. Each time a new image is uploaded, we want to capture metadata about the image, such as its filename, size, and timestamp, and store this information in DynamoDB. Additionally, we'll create a unique identifier for each image and use it as the primary key in the DynamoDB table to ensure uniqueness.

## Prerequisites

Before we dive into the example, make sure you have completed the following steps:

1. Set up an S3 bucket with an event trigger as explained in Chapter 11.

2. Create a new DynamoDB table to store the image metadata. Ensure the table has an appropriate primary key to uniquely identify each item.

3. Install the AWS SDK for Node.js in your development environment. You can do this by running the following command:

```bash
npm install aws-sdk
```

4. Basic knowledge of JavaScript, Node.js, S3, and DynamoDB.

## Implementing the Lambda Function

Let's create a new Lambda function to process the S3 event data and store it in DynamoDB.

1. Open your code editor and create a new file named `processS3Event.js`.

2. Import the necessary AWS SDK modules and configure the SDK with your AWS credentials:

```javascript
// processS3Event.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'your-aws-region' }); // Replace 'your-aws-region' with your preferred AWS region
const dynamoDB = new AWS.DynamoDB.DocumentClient();
```

3. Define the Lambda function that will process the S3 event:

```javascript
exports.handler = async (event, context) => {
  try {
    const records = event.Records;

    for (const record of records) {
      if (record.eventName === 'ObjectCreated:Put') {
        const bucketName = record.s3.bucket.name;
        const objectKey = record.s3.object.key;
        const size = record.s3.object.size;
        const timestamp = record.eventTime;

        const imageId = generateImageId(); // Function to generate a unique image ID

        // Store the image metadata in DynamoDB
        await storeImageMetadata(imageId, bucketName, objectKey, size, timestamp);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify('Successfully processed S3 events.'),
    };
  } catch (error) {
    console.error('Error processing S3 events:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error processing S3 events.'),
    };
  }
};
```

4. Implement the `generateImageId` function to create a unique image ID. You can use various techniques to generate a unique identifier, such as using UUIDs or timestamp-based IDs. For this example, we'll use a simple timestamp-based ID:

```javascript
function generateImageId() {
  const timestamp = Date.now();
  return `img_${timestamp}`;
}
```

5. Implement the `storeImageMetadata` function to store the image metadata in DynamoDB:

```javascript
async function storeImageMetadata(imageId, bucketName, objectKey, size, timestamp) {
  const params = {
    TableName: 'your-dynamodb-table-name', // Replace 'your-dynamodb-table-name' with your DynamoDB table name
    Item: {
      imageId,
      bucketName,
      objectKey,
      size,
      timestamp,
    },
  };

  await dynamoDB.put(params).promise();
}
```

6. Save the `processS3Event.js` file.

## Deploying the Lambda Function

Now that we have implemented the Lambda function, let's deploy it to AWS:

1. Zip the `processS3Event.js` file along with the `node_modules` folder containing the AWS SDK:

```bash
zip -r processS3Event.zip processS3Event.js node_modules
```

2. Open the AWS Management Console and navigate to the Lambda service.

3. Click on "Create function."

4. Choose the "Author from scratch" option.

5. Provide a name for your function (e.g., "ProcessS3Event").

6. Choose "Node.js" as the runtime.

7. In the "Function code" section, upload the `processS3Event.zip` file as the deployment package.

8. In the "Environment variables" section, you can set any environment variables required for your function (if applicable). For this example, we don't need any environment variables.

9. In the "Permissions" section, choose "Use an existing role" and select the IAM role that has the necessary permissions to execute Lambda functions and access DynamoDB.

10. Click on "Create function" to deploy the Lambda function.

## Testing the S3 Event Trigger and DynamoDB Storage

Now, let's test the Lambda function by uploading an image to the S3 bucket:

1. Open the AWS Management Console and navigate to the S3 service.

2. Select the S3 bucket with the event trigger.

3. Click on "Upload."

4. Choose an image file to upload.

5. Click on "Upload" to upload the image to the bucket.

6. Open the AWS Management Console and navigate to the DynamoDB service.

7. Select the DynamoDB table where the image metadata is stored.

8. Verify that the image metadata, such as the unique image ID, bucket name, object key, size, and timestamp, is correctly stored in the table.

Congratulations! You have successfully processed S3 event data using a serverless Node.js Lambda function and stored the image metadata in DynamoDB.

## Real-World Use Cases

Processing S3 event data and storing it in DynamoDB opens up various real-world use cases:

1. **Media Processing Pipeline:** Build a media processing pipeline that automatically processes uploaded media files, such as images or videos, and stores their metadata in DynamoDB for future reference.

2. **Document Indexing:** Automatically index and catalog documents uploaded to an S3 bucket, and store their metadata in DynamoDB for efficient document retrieval and search.

3. **Data Archiving and Backup:** Use S3 event triggers to archive and back up data automatically, and store metadata about archived files in DynamoDB for easy tracking and recovery.

## Cleanup

After testing the Lambda function and DynamoDB storage, remember to clean up the resources to avoid unnecessary costs:

1. Open the AWS Management Console and navigate to the Lambda service.

2. Select the Lambda function you created.

3. Click on "Delete" to remove the Lambda function.

4. Open the AWS Management Console and navigate to the DynamoDB service.

5. Select the DynamoDB table you created.

6. Click on "Delete table" to remove the DynamoDB table.

By cleaning up these resources, you ensure that you won't be billed for unused resources in

 your AWS account.

## Conclusion

In this chapter, we explored how to process S3 event data using serverless Node.js Lambda functions and store the data in DynamoDB. We walked through a practical example of capturing image metadata upon image uploads to an S3 bucket and storing that metadata in DynamoDB. We also discussed real-world use cases for combining S3 events with DynamoDB to build scalable and efficient serverless applications.

In the next chapter, we will explore best practices for error handling and logging in serverless Node.js applications. Error handling is crucial for building robust and reliable applications, and logging helps with debugging and monitoring. Let's continue our journey to master serverless Node.js development!