#Chapter 7: Uploading Files to S3 - Managing Objects in Amazon S3 Buckets

Key Topics:

1. Amazon S3 Overview:
   - Amazon S3 (Simple Storage Service) is a scalable object storage service provided by AWS.
   - It allows you to store and retrieve any amount of data, making it ideal for various use cases such as backup, data archiving, and content distribution.

2. Creating S3 Buckets with AWS CDK:
   - In CDK, you can define and provision Amazon S3 buckets using the `aws-s3` module.
   - Specify the bucket name, access control, and optional configurations like encryption and versioning.

   Example:
   ```typescript
   import * as s3 from 'aws-cdk-lib/aws-s3';

   // Inside your CDK Stack constructor
   const myBucket = new s3.Bucket(this, 'MyBucket', {
     bucketName: 'my-unique-bucket-name',
     accessControl: s3.BucketAccessControl.PRIVATE,
     encryption: s3.BucketEncryption.S3_MANAGED,
     versioned: true,
   });
   ```

3. Uploading Files to S3 Buckets:
   - You can upload files to S3 using the AWS SDK or SDK clients for different programming languages.
   - Consider using the AWS SDK for JavaScript/TypeScript (AWS SDK for Node.js) within AWS Lambda functions for serverless file uploads.

   Example - Uploading from Node.js:
   ```javascript
   const AWS = require('aws-sdk');
   const s3 = new AWS.S3();

   exports.handler = async (event) => {
     const params = {
       Bucket: 'my-unique-bucket-name',
       Key: 'example-file.txt',
       Body: 'This is the content of the file.',
     };

     await s3.putObject(params).promise();
     return 'File uploaded successfully.';
   };
   ```

4. Managing Objects in S3 Buckets:
   - Amazon S3 objects are the individual files stored within a bucket.
   - You can perform various operations on objects, such as copying, moving, and deleting.

   Example - Copying an Object:
   ```javascript
   const params = {
     Bucket: 'my-unique-bucket-name',
     CopySource: '/source-bucket/source-file.txt',
     Key: 'destination-file.txt',
   };

   await s3.copyObject(params).promise();
   ```

   Example - Deleting an Object:
   ```javascript
   const params = {
     Bucket: 'my-unique-bucket-name',
     Key: 'file-to-delete.txt',
   };

   await s3.deleteObject(params).promise();
   ```

5. Setting Object Permissions:
   - You can control who has access to your S3 objects using S3 bucket policies and object ACLs (Access Control Lists).
   - Use bucket policies to define fine-grained access controls, and ACLs for object-level permissions.

   Example - Bucket Policy:
   ```typescript
   // Inside your CDK Stack constructor
   myBucket.addToResourcePolicy(new iam.PolicyStatement({
     actions: ['s3:GetObject'],
     principals: [new iam.AccountRootPrincipal()],
     resources: [myBucket.arnForObjects('private/*')],
   }));
   ```

   Example - Object ACL:
   ```javascript
   const params = {
     Bucket: 'my-unique-bucket-name',
     Key: 'public-file.txt',
     ACL: 'public-read',
   };

   await s3.putObjectAcl(params).promise();
   ```

6. Enabling Versioning for S3 Buckets:
   - S3 versioning allows you to preserve, retrieve, and restore every version of every object stored in a bucket.
   - This can be helpful for data protection and compliance.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   const myBucket = new s3.Bucket(this, 'MyBucket', {
     versioned: true,
   });
   ```

7. Configuring Lifecycle Policies:
   - Lifecycle policies in S3 enable you to automatically transition objects to different storage classes or delete them based on predefined rules.
   - Use lifecycle policies to optimize storage costs and data management.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myBucket.addLifecycleRule({
     transitions: [
       {
         storageClass: s3.StorageClass.INFREQUENT_ACCESS,
         transitionAfter: cdk.Duration.days(30),
       },
       {
         storageClass: s3.StorageClass.GLACIER,
         transitionAfter: cdk.Duration.days(90),
       },
     ],
     expiration: cdk.Duration.days(365),
   });
   ```

8. Enabling Server Access Logging:
   - S3 provides server access logging, which allows you to capture detailed records of all requests made to the bucket.
   - Analyze these logs to monitor bucket activity and security.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myBucket.logAccessLogsToBucket(accessLogsBucket);
   ```

9. Cross-Region Replication (CRR):
   - CRR in S3 enables automatic and asynchronous replication of objects from one bucket to another in a different AWS region.
   - Implement CRR for disaster recovery and high availability.

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   myBucket.addCrossRegionReplicationDestination({
     bucket: destinationBucket,
     storageClass: s3.StorageClass.INFREQUENT_ACCESS,
   });
   ```

10. Managing Object Metadata:
    - S3 allows you to attach custom metadata to your objects using key-value pairs.
    - Metadata provides additional information about the objects and can be useful for indexing and categorizing data.

    Example:
    ```typescript
    // Inside your CDK Stack constructor
    myBucket.addObjectMetadata('example-object-key', {
      'custom-metadata-key': 'custom-metadata-value',
    });
    ```

Understanding how to use Amazon S3 with AWS CDK will empower you to efficiently store, manage, and secure your objects at scale. With CDK's declarative approach to defining S3 buckets and objects, you can easily set up a robust and cost-effective storage solution for your applications and data.