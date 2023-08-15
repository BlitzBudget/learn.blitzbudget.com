## Chapter 5: Securing the Network with Amazon VPC

In this chapter, we will focus on securing your AWS architecture at the network level by leveraging Amazon Virtual Private Cloud (VPC). VPC allows you to create isolated network environments within the AWS cloud, providing a secure foundation for deploying your ECS-based backend service. We'll explore the key concepts of Amazon VPC, how to set it up, and how to isolate your backend service within a private subnet.

### Understanding Amazon Virtual Private Cloud (VPC)

Amazon VPC is a service that enables you to create isolated network environments in the AWS cloud. It allows you to define your own private IP address range, configure subnets, route tables, and security groups. By creating a VPC, you gain full control over your network environment, including the ability to segment it into public and private subnets.

#### Setting Up Amazon VPC

1. **Navigate to the VPC Dashboard**: Sign in to the AWS Management Console, navigate to the VPC Dashboard, and click on "Create VPC."

2. **Configure Basic VPC Settings**: Provide a name for your VPC, set an IPv4 CIDR block for the VPC, and choose whether to enable IPv6.

3. **Configure Advanced VPC Settings**: Configure additional settings such as DNS hostnames, DNS resolution, and whether to enable hardware tenancy.

4. **Create VPC**: Review your settings and create the VPC.

### Isolating the Backend Service within a Private Subnet

When deploying a backend service, it's often a best practice to isolate it within a private subnet. This ensures that the service is not directly accessible from the internet, enhancing security.

#### Creating Private Subnets

1. **Navigate to Subnets**: In the VPC Dashboard, navigate to "Subnets" and click on "Create Subnet."

2. **Choose VPC and Availability Zone**: Select the VPC you created earlier and choose an availability zone.

3. **Configure Subnet Settings**: Provide a name for the subnet, and choose a CIDR block that falls within the VPC's IP address range. Ensure that this CIDR block is not overlapping with the CIDR block of any existing subnets.

4. **Disable Auto-assign Public IPv4 Addresses**: This step is crucial for creating a private subnet. Disable the auto-assignment of public IPv4 addresses.

5. **Create Subnet**: Review your settings and create the subnet.

#### Launching Backend Service in the Private Subnet

Now that you have a private subnet, you can deploy your ECS-based backend service within it. By launching the service in a private subnet, you ensure that it is not directly accessible from the internet.

### Conclusion

In this chapter, we explored the significance of Amazon Virtual Private Cloud (VPC) in securing your AWS architecture. VPC allows you to create isolated network environments, offering control over your network configuration and topology. By setting up Amazon VPC, you establish a secure foundation for your ECS-based backend service. Additionally, isolating the service within a private subnet further enhances security by restricting direct internet access. This combination of VPC and private subnets plays a vital role in building a robust and secure network infrastructure for your architecture.

---

### AWS CloudFormation Example

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: '10.0.0.0/16'
      EnableDnsSupport: 'true'
      EnableDnsHostnames: 'true'
  PrivateSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId:
        Ref: MyVPC
      CidrBlock: '10.0.1.0/24'
      AvailabilityZone: 'us-east-1a'
      MapPublicIpOnLaunch: 'false'
```

### AWS CDK Example (in TypeScript)

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

class MyVpcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'MyVPC', {
      cidr: '10.0.0.0/16',
      enableDnsSupport: true,
      enableDnsHostnames: true,
    });

    new ec2.Subnet(this, 'PrivateSubnet', {
      vpc,
      availabilityZone: 'us-east-1a',
      cidrBlock: '10.0.1.0/24',
      mapPublicIpOnLaunch: false,
    });
  }
}

const app = new cdk.App();
new MyVpcStack(app, 'MyVpcStack');
```

In both examples, we're creating an Amazon VPC named `MyVPC` with a specified CIDR block. We then create a private subnet named `PrivateSubnet` within the VPC, located in the `us-east-1a` availability zone, and with a specified CIDR block. The `mapPublicIpOnLaunch` property is set to `false` to ensure that instances in this subnet do not receive public IP addresses.

Adjust the settings such as CIDR blocks, availability zones, and subnet configurations based on your requirements.