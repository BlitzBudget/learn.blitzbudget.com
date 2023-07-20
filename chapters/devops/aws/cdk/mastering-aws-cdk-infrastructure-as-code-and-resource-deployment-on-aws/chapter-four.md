#Chapter 4: Configuring Custom Domains - Managing Domain Names for API Endpoints

Key Topics:

1. Understanding Custom Domains in API Gateway:
   - Custom domains allow you to associate your API with a human-readable domain name, making it easier for clients to access your API.
   - Instead of using the default API Gateway URL, you can configure a custom domain name that aligns with your brand or application.

2. Setting Up a Custom Domain in AWS CDK:
   - To configure a custom domain for your API Gateway in CDK, you need to use the `aws-apigateway` and `aws-route53` modules.
   - First, create an instance of `apigateway.DomainName` and associate it with your API.

   Example:
   ```typescript
   import * as cdk from 'aws-cdk-lib';
   import * as apigateway from 'aws-cdk-lib/aws-apigateway';
   import * as route53 from 'aws-cdk-lib/aws-route53';
   import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';

   // Inside your CDK Stack constructor
   const domainName = 'api.example.com';
   const certificateArn = 'arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-mnopqrstuvwx';
   
   const apiGatewayDomainName = new apigateway.DomainName(this, 'ApiGatewayDomainName', {
     domainName,
     certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', certificateArn),
     endpointType: apigateway.EndpointType.EDGE,
   });

   apiGatewayDomainName.addBasePathMapping(api);
   ```

3. Associating the Custom Domain with Route 53:
   - After creating the custom domain, you can associate it with a Route 53 hosted zone to handle DNS resolution.
   - Use the `aws-route53` module to create an `ARecord` and point it to your API Gateway custom domain.

   Example:
   ```typescript
   const hostedZoneId = 'Z1ABCDEF123456';
   const domainName = 'api.example.com';

   // Inside your CDK Stack constructor
   const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
     hostedZoneId,
     zoneName: domainName,
   });

   new route53.ARecord(this, 'ApiGatewayAliasRecord', {
     zone: hostedZone,
     recordName: domainName,
     target: route53.RecordTarget.fromAlias(new route53Targets.ApiGatewayDomain(apiGatewayDomainName)),
     comment: 'API Gateway A Record for ' + domainName,
   });
   ```

4. Deploying the API with the Custom Domain:
   - After configuring the custom domain and linking it with Route 53, you need to deploy the API.
   - Deploying the API creates a mapping between the custom domain and the deployed API stage.

   Example:
   ```typescript
   // Deploy the API to a stage called 'prod'
   const deployment = new apigateway.Deployment(this, 'Deployment', {
     api,
     description: 'Deployment for the production stage',
   });
   new apigateway.Stage(this, 'ProdStage', {
     deployment,
     stageName: 'prod',
   });
   ```

5. Accessing Your API with the Custom Domain:
   - Once the deployment is complete, your API will be accessible through the custom domain name.
   - Clients can now interact with your API using the custom domain, which enhances the user experience.

   Example:
   ```
   GET https://api.example.com/prod/items
   POST https://api.example.com/prod/items
   PUT https://api.example.com/prod/items/{id}
   DELETE https://api.example.com/prod/items/{id}
   ```

6. Managing Custom Domain Certificates:
   - When setting up a custom domain, you need to provide an SSL/TLS certificate for secure connections.
   - AWS Certificate Manager (ACM) provides free SSL/TLS certificates that you can use with your custom domain.

   Example:
   ```
   import * as acm from 'aws-cdk-lib/aws-certificatemanager';

   const certificateArn = 'arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-mnopqrstuvwx';

   const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', certificateArn);
   ```

7. Updating and Deleting Custom Domains:
   - If you need to change or remove a custom domain, you can update or delete the corresponding `DomainName` construct in your CDK application.

   Example:
   ```
   // Update domain name if required
   apiGatewayDomainName.domainName = 'api.newexample.com';

   // Delete the custom domain
   apiGatewayDomainName.delete();
   ```