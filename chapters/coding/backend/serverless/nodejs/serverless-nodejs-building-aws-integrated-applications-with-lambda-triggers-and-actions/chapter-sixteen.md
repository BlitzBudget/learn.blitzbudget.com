# Chapter 16: Creating a Node.js Lambda Function with S3 Event Trigger

Amazon Simple Storage Service (S3) is a highly scalable and durable object storage service provided by AWS. S3 allows you to store and retrieve any amount of data at any time, making it ideal for various use cases, such as hosting static websites, storing backups, and handling large amounts of multimedia data. In this chapter, we'll explore how to create a serverless Node.js Lambda function with an S3 event trigger. This trigger enables the Lambda function to process data from an S3 bucket in real-time, making it a powerful tool for automating data processing tasks.

## Why Use S3 Event Triggers with Lambda

S3 event triggers provide a seamless way to execute serverless functions whenever certain events occur within an S3 bucket. When a new object is uploaded to the bucket or an existing object is modified, S3 can automatically invoke the Lambda function associated with the event. This capability is incredibly useful for processing files, performing data transformations, and integrating S3 with other AWS services.

## How S3 Event Triggers Lambda

When an S3 event occurs, such as a new object being uploaded to an S3 bucket, S3 generates an event notification. This notification is then sent to the Lambda service, which invokes the specified Lambda function with the event data. The Lambda function can then process the data, perform the desired tasks, and even write the processed data back to another S3 bucket or other storage systems.

## Step-by-Step: Creating a Node.js Lambda Function with S3 Event Trigger

In this section, we'll guide you through the process of creating a serverless Node.js Lambda function with an S3 event trigger. We'll assume that you have already set up an S3 bucket and have the necessary permissions to create Lambda functions.

### Step 1: Set Up the S3 Bucket

1. Go to the AWS Management Console and navigate to the S3 service.

2. Click on "Create bucket."

3. Provide a unique name for your bucket, choose the region, and click "Create."

### Step 2: Create the Lambda Function

1. Go to the AWS Management Console and navigate to the Lambda service.

2. Click on "Create function."

3. Choose "Author from scratch."

4. Provide a name for your Lambda function.

5. For the runtime, select "Node.js."

6. Under "Permissions," choose an existing role with the necessary permissions or create a new role with the `lambda.amazonaws.com` service as a trusted entity and the required permissions for S3.

7. Click "Create function" to create the Lambda function.

### Step 3: Configure the S3 Event Trigger

1. In the Lambda function page, go to the "Designer" section and click on "Add trigger."

2. Select "S3" from the trigger options.

3. In the "Configure triggers" section, choose the S3 bucket you created in Step 1.

4. For the "Event type," choose "All object create events" to trigger the Lambda function whenever a new object is uploaded to the bucket.

5. Optionally, you can specify a prefix or a suffix for the objects that will trigger the function.

6. Click "Add" to add the trigger.

### Step 4: Implement the Lambda Function

Now that we have set up the Lambda function with the S3 event trigger, let's implement the function's code to handle the incoming S3 events.

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  try {
    // Retrieve the bucket name and object key from the S3 event
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = event.Records[0].s3.object.key;

    // Get the object data from S3
    const getObjectParams = {
      Bucket: bucketName,
      Key: objectKey,
    };
    const s3Object = await s3.getObject(getObjectParams).promise();

    // Your custom logic based on the S3 object data goes here
    console.log('S3 object data:', s3Object.Body.toString());

    return {
      statusCode: 200,
      body: JSON.stringify('S3 event processed successfully.'),
    };
  } catch (error) {
    console.error('Error processing S3 event:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error processing S3 event.'),
    };
  }
};
```

In this example, the Lambda function receives the S3 event data from the `event` parameter. The code retrieves the bucket name and object key from the event using `event.Records[0].s3.bucket.name` and `event.Records[0].s3.object.key`, respectively. It then uses the AWS SDK to fetch the object data from S3 using `s3.getObject()`.

You can perform any custom logic on the object data based on your application's requirements. For instance, you could process images, validate file formats, extract information, or trigger other AWS services based on the object's contents.

### Step 5: Test the S3 Event Trigger

With the Lambda function and S3 event trigger set up, you can now test the trigger by uploading a new object to the S3 bucket.

1. Go to the AWS Management Console and navigate to the S3 service.

2. Select the bucket you created in Step 1.

3. Click on "Upload" and select a file to upload to the bucket.

4

. Click "Upload" to upload the object.

### Step 6: Monitor the Lambda Function

After uploading the object to the S3 bucket, the Lambda function will be triggered automatically. You can monitor the function's execution and view the logs in the AWS Management Console under the Lambda service. Check the logs to see the output of the custom logic executed by the Lambda function based on the S3 object data.

## Conclusion

In this chapter, we explored how to create a serverless Node.js Lambda function with an S3 event trigger. By integrating S3 event triggers with Lambda, you can automate data processing tasks and respond to changes in your S3 buckets in real-time. This enables you to build powerful serverless applications that efficiently handle data in a scalable and event-driven manner.

With S3 event triggers, you can extend the capabilities of your Node.js Lambda functions and seamlessly integrate them with other AWS services. In the next chapter, we'll dive into using DynamoDB streams as triggers for Lambda functions, allowing you to process data changes in your DynamoDB tables in real-time. Let's continue our journey to master serverless Node.js development!