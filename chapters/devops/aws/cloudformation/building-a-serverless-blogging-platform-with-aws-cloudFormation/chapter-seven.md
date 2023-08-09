# Chapter 7: Building Lambda Functions using AWS CloudFormation

In this chapter, we will learn how to build AWS Lambda functions using AWS CloudFormation. AWS Lambda is a serverless compute service that enables you to run code without provisioning or managing servers. We will walk through the process of defining Lambda functions in a CloudFormation template, specifying the runtime, handler, code, and other essential properties.

1. **Understanding AWS Lambda**:

AWS Lambda allows developers to execute code in response to various events, such as changes to data in an Amazon S3 bucket, updates to a DynamoDB table, or HTTP requests through Amazon API Gateway. With AWS CloudFormation, we can define Lambda functions as part of our infrastructure as code, making it easy to manage and deploy them consistently.

2. **Creating Lambda Functions in CloudFormation**:

To build Lambda functions using AWS CloudFormation, we define the necessary resources in our template. Let's take a look at an example of creating a Lambda function for processing blog data:

```yaml
LambdaFunctionBlog:
  Type: AWS::Lambda::Function
  Properties:
    FunctionName: BlogProcessorFunction
    Runtime: go1.x
    Handler: main
    Code:
      S3Bucket: sample-project-for-cloudformation
      S3Key: golang-sample.zip
    Role: !GetAtt AdminAddBlogBlogProcessorRole.Arn
    Environment:
      Variables:
        S3BlogBucketName: !Ref S3BlogBucketName
    Tags:
      - Key: site
        Value: BlitzBudget
      - Key: author
        Value: Nagarjun
      - Key: purpose
        Value: Admin
```

In the above CloudFormation resource definition, we create a Lambda function named "BlogProcessorFunction." We specify the runtime for the function (in this case, "go1.x"), the entry point "main," and the location of the function code in an S3 bucket. The Lambda function requires an IAM role, which we reference using "!GetAtt" to grant the necessary permissions.

3. **Configuring Lambda Function Environment**:

Lambda functions often require environment variables to customize their behavior. In our CloudFormation template, we can define environment variables specific to the Lambda function:

```yaml
Environment:
  Variables:
    S3BlogBucketName: !Ref S3BlogBucketName
```

In this example, we set an environment variable "S3BlogBucketName" to the value of the CloudFormation parameter "!Ref S3BlogBucketName." This allows us to pass dynamic values to our Lambda function during runtime.

4. **Adding Tags to Lambda Functions**:

Tags are useful for organizing and categorizing Lambda functions. We can assign tags to our Lambda function resources in the CloudFormation template:

```yaml
Tags:
  - Key: site
    Value: BlitzBudget
  - Key: author
    Value: Nagarjun
  - Key: purpose
    Value: Admin
```

The above tags are optional but can provide helpful information when managing multiple Lambda functions in the AWS environment.

5. **Deploying Lambda Functions**:

Once we have defined our Lambda functions in the CloudFormation template, we can deploy the entire stack, including the functions, using AWS CloudFormation. This ensures that our Lambda functions are provisioned, configured, and ready to be invoked.

By following the steps in this chapter, we can build and manage AWS Lambda functions seamlessly using AWS CloudFormation. This approach streamlines the process of deploying serverless code and allows us to maintain consistent infrastructure across different environments.