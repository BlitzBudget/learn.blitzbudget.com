# Chapter 5: Working with AWS S3

In this chapter, we'll dive deep into AWS S3 (Simple Storage Service) and explore how to interact with it using Node.js. AWS S3 is a highly scalable and durable object storage service that allows you to store and retrieve any amount of data from anywhere on the web. We'll walk through the process of uploading, downloading, and managing files in S3 from our Node.js serverless functions.

## Prerequisites

Before we begin, ensure you have the following prerequisites:

1. An AWS account with the AWS CLI installed and configured. If you haven't set up an AWS account and the AWS CLI, refer to Chapter 2 for instructions.

2. Node.js and npm installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

3. Basic knowledge of JavaScript and Node.js.

## Setting Up AWS SDK

To interact with AWS services, including S3, we need the AWS SDK for JavaScript. Install it as a project dependency using npm:

```bash
npm install aws-sdk
```

## Uploading Files to AWS S3

Let's start by uploading a file to AWS S3. First, ensure you have an AWS S3 bucket created. If not, you can create one using the AWS Management Console.

Create a new file named `upload.js` and add the following code:

```javascript
// upload.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const s3 = new AWS.S3();

const bucketName = 'your-bucket-name'; // Replace 'your-bucket-name' with your S3 bucket name
const filePath = './path/to/your/file.txt'; // Replace with the path to the file you want to upload
const key = 'file.txt'; // Replace 'file.txt' with the desired key for the file in S3

const fileContent = fs.readFileSync(filePath);

const params = {
  Bucket: bucketName,
  Key: key,
  Body: fileContent,
};

s3.upload(params, (err, data) => {
  if (err) {
    console.log("Error uploading to S3:", err);
  } else {
    console.log("File uploaded successfully to S3:", data.Location);
  }
});
```

In this code, we use the AWS SDK to create an instance of the S3 service. We then specify the `Bucket` and `Key` properties in the `params` object, indicating the S3 bucket name and the desired key for the file in S3.

We read the content of the file specified by `filePath` using `fs.readFileSync()` and pass it as the `Body` in the `params` object.

The `s3.upload()` method is used to upload the file to the specified S3 bucket. When the upload is successful, the `data` object will contain the URL of the uploaded file, which we log to the console.

## Downloading Files from AWS S3

Next, let's explore how to download files from AWS S3. Create a new file named `download.js` and add the following code:

```javascript
// download.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const s3 = new AWS.S3();

const bucketName = 'your-bucket-name'; // Replace 'your-bucket-name' with your S3 bucket name
const key = 'file.txt'; // Replace 'file.txt' with the key of the file in S3 that you want to download

const params = {
  Bucket: bucketName,
  Key: key,
};

s3.getObject(params, (err, data) => {
  if (err) {
    console.log("Error downloading from S3:", err);
  } else {
    fs.writeFileSync('downloaded-file.txt', data.Body);
    console.log("File downloaded successfully from S3");
  }
});
```

In this code, we use the `s3.getObject()` method to download the file from the specified S3 bucket. The `data` object will contain the file content in the `Body` property, which we write to a new file named `downloaded-file.txt` using `fs.writeFileSync()`.

## Listing Files in AWS S3 Bucket

To list the files in an S3 bucket, we can use the `s3.listObjects()` method. Create a new file named `listFiles.js` and add the following code:

```javascript
// listFiles.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const s3 = new AWS.S3();

const bucketName = 'your-bucket-name'; // Replace 'your-bucket-name' with your S3 bucket name

const params = {
  Bucket: bucketName,
};

s3.listObjects(params, (err, data) => {
  if (err) {
    console.log("Error listing files in S3:", err);
  } else {
    console.log("Files in S3 bucket:", data.Contents);
  }
});
```

In this code, we use the `s3.listObjects()` method to list the objects (files) in the specified S3 bucket. The `data` object will contain an array of `Contents`, each representing a file in the bucket.

## Deleting Files from AWS S3

To delete a file from an S3 bucket, we can use the `s3.deleteObject()` method. Create a new file named `deleteFile.js` and add the following code:

```javascript
// deleteFile.js
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const s3 = new AWS.S3();

const bucketName = 'your-bucket-name'; // Replace 'your-bucket-name' with your S3 bucket name
const key = 'file.txt'; // Replace 'file.txt' with the key of the file in S3 that you want to delete

const params = {
  Bucket: bucketName,
  Key: key,
};

s3.deleteObject(params, (err, data) => {
  if (err) {
    console.log("Error deleting file from S3:", err);
  } else {
    console.log("File deleted successfully from S3");
  }
});
```

In this code, we use the `s3.deleteObject()` method to delete the file with the specified `key` from the specified S3 bucket.

## Conclusion

In this chapter, we've explored how to work with AWS S3 in Node.js. We learned how to upload, download, list, and delete files in an S3 bucket using the AWS SDK for JavaScript.

AWS S3 is a powerful and reliable storage service that can be used for a wide range of applications, such as storing media files, hosting static websites, and serving as a data lake for big data analytics. With the knowledge gained in this chapter, you can now start building more sophisticated serverless applications that leverage the capabilities of AWS S3.

In the next chapters, we

'll continue to explore other AWS services and demonstrate how to integrate them into our Node.js serverless applications to build robust and dynamic cloud-native solutions. Stay tuned for more exciting tutorials and examples!