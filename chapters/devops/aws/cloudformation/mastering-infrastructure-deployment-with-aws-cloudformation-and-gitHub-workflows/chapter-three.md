# Chapter 3: Setting up API Gateway with CloudFormation

In this chapter, we'll explore how to use AWS CloudFormation to set up an API Gateway, a fully managed service that makes it easy to create, publish, maintain, monitor, and secure APIs. We'll create a CloudFormation template to define the API Gateway and configure its resources.

## Creating a CloudFormation Template for API Gateway

Let's create a CloudFormation template to provision an API Gateway with a simple REST API and one resource.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation Template for API Gateway'

Resources:
  MyApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyRESTApi

  MyApiResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      ParentId: !GetAtt MyApiGateway.RootResourceId
      RestApiId: !Ref MyApiGateway
      PathPart: 'myresource'
```

In this template:

- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.

- `Resources` section defines the resources to be created. In this case, it creates an API Gateway named "MyRESTApi" and a resource named "myresource."

- `Type: AWS::ApiGateway::RestApi` specifies the resource type for API Gateway.

- `Properties` section contains the configuration for the API Gateway. In this example, we set the name of the REST API to "MyRESTApi."

- `Type: AWS::ApiGateway::Resource` specifies the resource type for the API Gateway resource.

- `Properties` section contains the configuration for the API Gateway resource. We define its parent resource as the root resource of the API (`!GetAtt MyApiGateway.RootResourceId`) and set the path part to "myresource."

## Deploying the API Gateway

To deploy the API Gateway using the CloudFormation template, follow these steps:

1. Save the template to a file (e.g., `api-gateway-template.yaml`).

2. Use the AWS CLI to create the CloudFormation stack:

```bash
aws cloudformation create-stack --stack-name MyApiGatewayStack --template-body file://api-gateway-template.yaml
```

This command creates a new CloudFormation stack named "MyApiGatewayStack" using the "api-gateway-template.yaml" template.

## Conclusion

In this chapter, we learned how to set up an API Gateway using AWS CloudFormation. We defined the API Gateway and its resources within the CloudFormation template and deployed the stack using the AWS CLI.

AWS CloudFormation allows you to easily manage and version control your API Gateway configurations, making it simpler to replicate and update your APIs across different environments. In the next chapters, we'll explore how to integrate the API Gateway with the previously created Lambda function, and we'll implement authentication and authorization to secure the API.

---