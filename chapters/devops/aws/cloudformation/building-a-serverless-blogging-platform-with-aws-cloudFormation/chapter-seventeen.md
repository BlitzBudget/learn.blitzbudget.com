Chapter 17: Using Nested Stacks for Modularity

AWS CloudFormation allows you to create reusable and modular templates by using Nested Stacks. Nested Stacks are separate templates that you can reference from within a main CloudFormation template. This modular approach enhances the organization, reusability, and maintainability of your infrastructure as code.

**Understanding Nested Stacks:**

A Nested Stack can be any CloudFormation template stored in Amazon S3 or locally on your system. It can contain a specific set of AWS resources and their configurations. The main stack, also known as the parent stack, references these Nested Stacks using the `AWS::CloudFormation::Stack` resource type. The Nested Stacks, in turn, can have their own parameters and outputs.

**Example Scenario:**

Let's consider an example scenario where you want to create a scalable web application infrastructure using Nested Stacks. The infrastructure includes a VPC, subnets, an Auto Scaling Group, and an Application Load Balancer (ALB). To keep things organized, we'll use Nested Stacks for each component.

**Step 1: Create Child Templates**

First, we'll create three separate child templates, one for each component:

**vpc.yml**:
```yaml
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: "10.0.0.0/16"
```

**subnets.yml**:
```yaml
Resources:
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: "10.0.0.0/24"
      AvailabilityZone: "us-east-1a"

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: "10.0.1.0/24"
      AvailabilityZone: "us-east-1b"
```

**autoscaling.yml**:
```yaml
Resources:
  AutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      VPCZoneIdentifier:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      LaunchConfigurationName: !Ref LaunchConfiguration
      MinSize: 2
      MaxSize: 5
      DesiredCapacity: 2

  LaunchConfiguration:
    Type: AWS::AutoScaling::LaunchConfiguration
    Properties:
      ImageId: "ami-0c55b159cbfafe1f0"
      InstanceType: "t2.micro"
```

**Step 2: Create the Main Stack**

Now, we'll create the main stack that references the Nested Stacks.

**main-stack.yml**:
```yaml
AWSTemplateFormatVersion: '2010-09-09'

Resources:
  VPCStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: 'https://<S3 Bucket>/vpc.yml'  # Replace with the actual URL to the vpc.yml template

  SubnetsStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: 'https://<S3 Bucket>/subnets.yml'  # Replace with the actual URL to the subnets.yml template

  AutoScalingStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: 'https://<S3 Bucket>/autoscaling.yml'  # Replace with the actual URL to the autoscaling.yml template
```

**Step 3: Deploy the Stacks**

To deploy the stacks, you can use the AWS CloudFormation console, AWS CLI, or SDKs. Make sure to upload the "vpc.yml," "subnets.yml," and "autoscaling.yml" templates to an S3 bucket and replace the placeholder `<S3 Bucket>` in the "main-stack.yml" with the actual S3 bucket URL.

When you deploy the main stack, CloudFormation will automatically create the VPC stack first, followed by the Subnets stack, and finally the Auto Scaling stack, ensuring the dependencies are resolved correctly.

**Benefits of Nested Stacks:**

1. **Modularity:** By breaking down your infrastructure into smaller components, it becomes easier to manage and maintain.

2. **Reusability:** Nested Stacks can be used across multiple main templates, promoting code reuse.

3. **Parallelization:** CloudFormation can create multiple Nested Stacks in parallel, speeding up the overall deployment.

4. **Clear Hierarchical Structure:** Nested Stacks offer a clear hierarchical structure, making your templates more organized and easier to understand.

Using Nested Stacks in AWS CloudFormation helps you build complex infrastructures while keeping your templates modular, maintainable, and scalable.