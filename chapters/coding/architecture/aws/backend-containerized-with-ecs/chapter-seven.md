# Chapter 7: **Enforcing EC2 Access Control to PostgreSQL Database**

In this chapter, we will explore the critical aspect of enforcing access control between EC2 instances and a PostgreSQL database within a private VPC. Ensuring that only authorized resources can interact with the database is crucial for maintaining the security and integrity of your architecture. We will delve into security groups, IAM roles, and database authentication mechanisms that collectively contribute to a comprehensive access control strategy.

## Understanding Access Control Challenges

When designing a secure multi-tier architecture, controlling and restricting access is fundamental. In the context of an AWS environment, access control involves regulating interactions between different resources, such as EC2 instances and a PostgreSQL database. Unauthorized access can lead to data breaches, unauthorized modifications, and various security vulnerabilities.

The challenges of access control in a multi-tier architecture include:

1. **Network Segmentation**: How do we ensure that only designated resources can communicate with each other while keeping potential attackers at bay?

2. **Authentication and Authorization**: How can we verify the identity of users or services and grant them the appropriate permissions to perform specific actions?

3. **Secure Communication**: How do we establish secure channels for data transmission between resources, protecting information from interception or tampering?

4. **Least Privilege**: How can we follow the principle of least privilege, granting only the necessary permissions to resources?

## Security Groups: Network-Level Access Control

Security groups are a crucial tool for controlling inbound and outbound traffic to resources within your VPC. They act as virtual firewalls that filter traffic based on rules you define. To enforce access control between EC2 instances and the PostgreSQL database, you can configure security group rules to allow only specific IP ranges or security groups to access the database.

For example, you can create a security group for your EC2 instances and another for the PostgreSQL database. Then, configure the security group associated with the database to allow inbound traffic only from the security group of your EC2 instances. This way, you ensure that only resources within the specified security group can access the database.

## IAM Roles: Identity-Based Access Control

While security groups regulate network traffic, IAM roles handle identity-based access control. With IAM roles, you can grant permissions to AWS services, resources, or external identities without the need for long-term credentials like access keys. This enhances security by reducing the attack surface.

When it comes to EC2 instances, you can assign an IAM role to them. This role can include permissions to interact with the PostgreSQL database, ensuring that only authorized instances have access. IAM roles also enable you to follow the principle of least privilege by granting only the necessary permissions to instances.

## Database Authentication Mechanisms

Within the PostgreSQL database itself, there are authentication mechanisms that contribute to access control. You can enforce strong password policies, implement SSL/TLS encryption for secure communication, and configure client authentication based on certificates.

Additionally, PostgreSQL provides the ability to define fine-grained access control at the database and schema levels. This means you can grant specific privileges to individual users or roles, allowing them to perform certain actions on specific tables, views, or functions.

## Putting It All Together: A Comprehensive Example

To illustrate the concepts discussed, let's walk through a comprehensive example of enforcing EC2 access control to a PostgreSQL database within a private VPC using AWS CDK.

### Step 1: Security Groups

In your CDK template, create security groups for the EC2 instances and the PostgreSQL database. Configure the database security group to allow inbound traffic only from the EC2 instances security group.

```typescript
// Define security groups
const ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SecurityGroup', {
  vpc,
});

const databaseSecurityGroup = new ec2.SecurityGroup(this, 'DatabaseSecurityGroup', {
  vpc,
});
databaseSecurityGroup.addIngressRule(ec2SecurityGroup, ec2.Port.tcp(5432));
```

### Step 2: IAM Roles

Create an IAM role for your EC2 instances that includes permissions to access the PostgreSQL database.

```typescript
// Define an IAM role for EC2 instances
const ec2Role = new iam.Role(this, 'EC2Role', {
  assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
});

// Attach policy granting permissions to interact with the database
const databasePolicy = new iam.PolicyStatement({
  actions: ['rds:Connect'],
  resources: [databaseInstance.instanceArn],
});
ec2Role.addToPolicy(databasePolicy);
```

### Step 3: Database Authentication

Configure the PostgreSQL database to require SSL/TLS encryption for connections and set up strong password policies.

```typescript
// Enable SSL for the PostgreSQL instance
databaseInstance.addRotationSingleUser();

// Set up strong password policy
databaseInstance.parameterGroup?.setParameter('password_encryption', 'on');
databaseInstance.parameterGroup?.setParameter('password_min_length', '12');
// Add more password policy parameters as needed
```

## Conclusion

Enforcing access control between EC2 instances and a PostgreSQL database requires a multi-layered approach. By combining network-level security with identity-based access

 control and database-specific mechanisms, you can build a robust defense against unauthorized access and potential security threats.

In this chapter, we've covered the core concepts of access control and demonstrated how to implement them using AWS CDK. By understanding and implementing these security measures, you'll contribute to the overall security and reliability of your multi-tier architecture.

In the next chapter, we will dive deeper into securing communication between components using encryption techniques and private networking.

Stay tuned for **Chapter 8: Integrating Private VPC with API Gateway**.

---

### CDK template

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as iam from 'aws-cdk-lib/aws-iam';

export class EC2ToPostgreSQLStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,
    });

    // Create EC2 security group
    const ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SecurityGroup', {
      vpc,
    });

    // Create RDS security group
    const databaseSecurityGroup = new ec2.SecurityGroup(this, 'DatabaseSecurityGroup', {
      vpc,
    });
    databaseSecurityGroup.addIngressRule(ec2SecurityGroup, ec2.Port.tcp(5432));

    // Create an RDS instance
    const databaseInstance = new rds.DatabaseInstance(this, 'DatabaseInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_12_7,
      }),
      vpc,
      securityGroups: [databaseSecurityGroup],
    });

    // Create IAM role for EC2 instances
    const ec2Role = new iam.Role(this, 'EC2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    // Attach policy granting permissions to interact with the database
    const databasePolicy = new iam.PolicyStatement({
      actions: ['rds:Connect'],
      resources: [databaseInstance.instanceArn],
    });
    ec2Role.addToPolicy(databasePolicy);

    // Output EC2 instance security group ID
    new cdk.CfnOutput(this, 'EC2SecurityGroupId', {
      value: ec2SecurityGroup.securityGroupId,
    });

    // Output RDS instance endpoint
    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: databaseInstance.dbInstanceEndpointAddress,
    });
  }
}

const app = new cdk.App();
new EC2ToPostgreSQLStack(app, 'EC2ToPostgreSQLStack');
```

This CDK template creates a VPC, EC2 instance, RDS instance, security groups, and IAM role. The security group rules enforce access control between the EC2 instance and the PostgreSQL database. The IAM role ensures that the EC2 instance has permission to interact with the database.

Remember to install the necessary AWS CDK libraries and deploy the stack using the CDK CLI.

For a comprehensive security configuration, make sure to follow AWS best practices, configure encryption, and implement other security measures as needed for your specific use case.

### Cloudformation Template

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
  EC2SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      VpcId: !Ref VPC
  DatabaseSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: '5432'
          ToPort: '5432'
          SourceSecurityGroupId: !Ref EC2SecurityGroup
  DatabaseInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      Engine: postgres
      EngineVersion: 12.7
      DBInstanceClass: db.t2.micro
      AllocatedStorage: '20'
      DBName: mydb
      MasterUsername: admin
      MasterUserPassword: P@ssw0rd123
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
  EC2Role:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ec2.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: EC2DatabaseAccessPolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: rds:Connect
                Resource: !GetAtt DatabaseInstance.Arn
Outputs:
  EC2SecurityGroupId:
    Value: !Ref EC2SecurityGroup
  DatabaseEndpoint:
    Value: !GetAtt DatabaseInstance.Endpoint.Address
```

This CloudFormation template creates a VPC, EC2 instance security group, RDS instance security group, RDS instance, and IAM role. It enforces access control between the EC2 instance and the PostgreSQL database by allowing traffic only from the EC2 instance's security group to the RDS security group.

Please customize the template parameters, settings, and resources to match your environment and requirements. Remember to deploy the stack using the AWS CloudFormation console or CLI.

For a comprehensive security configuration, you should consider enabling encryption, implementing fine-grained access controls, and following AWS security best practices.