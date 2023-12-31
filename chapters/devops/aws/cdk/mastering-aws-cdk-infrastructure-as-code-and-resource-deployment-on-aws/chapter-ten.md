#Chapter 10: Deploying a CloudFront Distribution - Accelerating Content Delivery with CDN

Key Topics:

1. Amazon CloudFront Overview:
   - Amazon CloudFront is a Content Delivery Network (CDN) service provided by AWS.
   - It accelerates the delivery of static and dynamic content, such as web pages, images, videos, and APIs, by caching them in multiple global edge locations.

2. Setting Up CloudFront Distribution with AWS CDK:
   - In AWS CDK, you can create and configure a CloudFront distribution using the `aws-cloudfront` and `aws-cloudfront-origins` modules.
   - CloudFront distributions act as the front-end for your content, serving it from the edge locations closest to your users.

   Example:
   ```typescript
   import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
   import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';

   // Inside your CDK Stack constructor
   const bucket = new s3.Bucket(this, 'MyBucket');

   const cloudfrontDistribution = new cloudfront.Distribution(this, 'MyCloudFrontDistribution', {
     defaultBehavior: {
       origin: new cloudfront_origins.S3Origin(bucket),
     },
     // ... other properties
   });
   ```

3. Configuring CloudFront Behavior:
   - CloudFront allows you to define behaviors that determine how the distribution handles incoming requests based on specific path patterns.
   - You can configure caching options, origin settings, SSL certificates, and more for each behavior.

   Example - Setting Up Default Behavior:
   ```typescript
   // Inside your CDK Stack constructor
   const defaultBehavior = cloudfrontDistribution.defaultBehavior;

   defaultBehavior.compress = true;
   defaultBehavior.cachePolicy = cloudfront.CachePolicy.CACHING_OPTIMIZED;
   defaultBehavior.allowedMethods = cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS;
   defaultBehavior.viewerProtocolPolicy = cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS;
   ```

4. Adding Lambda@Edge Functions to CloudFront:
   - CloudFront supports Lambda@Edge, allowing you to run Lambda functions at the edge locations to customize the content delivery process.
   - You can use Lambda@Edge to modify headers, redirect requests, or serve personalized content based on user location.

   Example - Adding Lambda Function to Origin Request:
   ```typescript
   // Inside your CDK Stack constructor
   const lambdaFunctionVersion = lambda.Version.fromVersionArn(this, 'LambdaVersion', 'arn:aws:lambda:us-east-1:123456789012:function:my-lambda-function');

   const edgeLambdaFunction = new cloudfront.FunctionAssociation(lambdaFunctionVersion, {
     eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
   });

   cloudfrontDistribution.addBehavior('/api/*', defaultBehavior);
   cloudfrontDistribution.addLambdaFunctionAssociation(edgeLambdaFunction);
   ```

5. Configuring CloudFront Domain Name:
   - CloudFront provides a default domain name (e.g., d12345x6789.cloudfront.net), but you can also use your custom domain name.
   - To use a custom domain, you need an SSL/TLS certificate, which can be provisioned using AWS Certificate Manager (ACM).

   Example:
   ```typescript
   // Inside your CDK Stack constructor
   const certificateArn = 'arn:aws:acm:us-east-1:123456789012:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

   const customDomain = cloudfrontDistribution.addCustomDomain({
     domainName: 'example.com',
     certificate: cloudfront.CloudFrontCertificate.fromCertificateArn(certificateArn),
   });
   ```

6. CloudFront Logging and Monitoring:
   - CloudFront provides comprehensive logging and monitoring options through Amazon CloudWatch.
   - You can monitor the distribution's performance, track usage, and analyze the access logs generated by CloudFront.

   Example - Configuring Logging:
   ```typescript
   // Inside your CDK Stack constructor
   cloudfrontDistribution.logAccessLogs(new s3.Bucket(this, 'LogsBucket'));
   ```

Amazon CloudFront is a powerful service that accelerates content delivery and improves the user experience by reducing latency and increasing data transfer rates. With AWS CDK, you can easily create and configure CloudFront distributions, leverage Lambda@Edge to customize content delivery, and monitor distribution performance. Whether you are serving web pages, videos, APIs, or other dynamic content, CloudFront can significantly enhance your application's performance and scalability.