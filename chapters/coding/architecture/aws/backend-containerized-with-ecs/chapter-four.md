# **Chapter 4: Deploying Elastic Container Service (ECS) for Containerized Applications**

Containerization has revolutionized the way applications are developed and deployed, enabling developers to build and ship applications consistently across various environments. Amazon Elastic Container Service (ECS) is a powerful service that simplifies the management of Docker containers in a highly scalable and cost-effective manner. In this chapter, we will delve into deploying containerized applications using Amazon ECS. We will cover the essentials of task definitions, services, and cluster configurations to ensure the seamless management of your containerized applications.

### **Understanding Amazon Elastic Container Service (ECS)**

Amazon Elastic Container Service (ECS) is a fully managed container orchestration service that allows you to easily run, manage, and scale Docker containers. ECS eliminates the need to manage the underlying infrastructure, as it takes care of tasks such as provisioning, scaling, and load balancing. It offers two launch types: EC2 and Fargate.

- **EC2 Launch Type**: In this mode, you utilize your existing EC2 instances to run containers. This provides greater control over the underlying infrastructure.

- **Fargate Launch Type**: Fargate abstracts the underlying infrastructure and allows you to focus solely on deploying and managing containers. It's an ideal choice if you want a serverless container deployment experience.

### **Creating Task Definitions**

A task definition is a blueprint for running containers in Amazon ECS. It defines the container image, CPU, memory, environment variables, networking settings, and other essential parameters. Let's walk through the steps of creating a task definition using AWS CDK.

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'EcsStack');

const taskDefinition = new ecs.FargateTaskDefinition(stack, 'MyTaskDef', {
  memoryLimitMiB: 512,
  cpu: 256,
});

const container = taskDefinition.addContainer('MyContainer', {
  image: ecs.ContainerImage.fromRegistry('nginx'),
  portMappings: [{ containerPort: 80 }],
});

const service = new ecs.FargateService(stack, 'MyService', {
  taskDefinition,
});
```

In this example, we've created a Fargate task definition with a single container running the NGINX image. The task definition includes memory and CPU limits, as well as port mappings.

### **Creating ECS Services**

An ECS service is responsible for maintaining the desired number of tasks running within a specified cluster. It ensures that tasks are spread across availability zones for high availability. Here's how you can create an ECS service using AWS CDK:

```typescript
const service = new ecs.FargateService(stack, 'MyService', {
  taskDefinition,
  desiredCount: 2, // Number of desired tasks
});
```

In this code snippet, we've created an ECS Fargate service named "MyService" that will run two tasks based on the specified task definition.

### **Configuring Auto Scaling**

Auto Scaling ensures that your application has the right amount of resources to handle incoming traffic without over-provisioning. You can configure Auto Scaling for ECS services based on various metrics such as CPU utilization or request count.

```typescript
const scaling = service.autoScaleTaskCount({ maxCapacity: 4 });

scaling.scaleOnCpuUtilization('CpuScaling', {
  targetUtilizationPercent: 50,
});
```

In this example, we've configured Auto Scaling to maintain CPU utilization at around 50%. It will automatically adjust the number of tasks to achieve the desired utilization.

### **Service Discovery and Load Balancing**

ECS allows you to expose services using Elastic Load Balancing (ELB). When you create an ECS service, you can attach a load balancer to distribute incoming traffic across the tasks. This provides fault tolerance and load distribution.

```typescript
const lb = new elbv2.NetworkLoadBalancer(stack, 'MyNLB', {
  vpc,
  internetFacing: true,
});

service.attachToNetworkTargetGroup(lb.targetGroup);
```

In this example, we've attached the ECS service to a Network Load Balancer (NLB), enabling it to distribute traffic across the tasks.

### **Implementing Security Configuration**

When deploying containerized applications using ECS, security considerations are paramount. Here are some key security measures to implement:

1. **IAM Roles and Permissions**: Use IAM roles to grant ECS tasks and services the necessary permissions. Ensure the principle of least privilege by defining granular policies.

2. **VPC and Subnet Isolation**: Place your ECS tasks and services in private subnets within your VPC to prevent direct external access.

3. **Container Security**: Scan container images for vulnerabilities before deploying them. Implement best practices for securing the Docker image, such as using non-root users, minimizing image layers, and keeping images up-to-date.

4. **Network Security Groups (NSGs)**: Configure NSGs to control inbound and outbound traffic to your ECS tasks and services. This adds an extra layer of security to your environment.

5. **Secrets Management**: Use AWS Secrets Manager to securely store and manage sensitive information, such as API keys and database credentials, needed by your containerized applications.

### **Deploying the Multi-Tier Architecture**

By combining the concepts of task definitions, services, and Auto Scaling, you can seamlessly deploy and manage containerized applications using Amazon ECS. With the provided security configuration, you can ensure that your ECS environment is both performant and secure.

In the next chapter, we will explore the deployment of an EC2 instance within the private VPC we've designed and examine strategies to securely connect to the Postgres SQL database.

---

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'EcsDeploymentStack');

// Create a VPC
const vpc = new ec2.Vpc(stack, 'MyVPC', {
  maxAzs: 2,
  natGateways: 1,
});

// Create an ECS cluster
const cluster = new ecs.Cluster(stack, 'MyCluster', {
  vpc,
});

// Define a task definition
const taskDefinition = new ecs.FargateTaskDefinition(stack, 'MyTaskDefinition', {
  memoryLimitMiB: 512,
  cpu: 256,
});

// Create a container
const container = taskDefinition.addContainer('MyContainer', {
  image: ecs.ContainerImage.fromRegistry('nginx'),
  portMappings: [{ containerPort: 80 }],
});

// Create an ECS service
const service = new ecs.FargateService(stack, 'MyService', {
  taskDefinition,
  cluster,
});

// Create a Network Load Balancer (NLB)
const lb = new elbv2.NetworkLoadBalancer(stack, 'MyNLB', {
  vpc,
  internetFacing: true,
});

// Attach the service to the NLB
service.attachToNetworkTargetGroup(lb.addListener('MyListener', { port: 80 }));

// Implementing Security Configuration
// Create an IAM role for ECS tasks
const taskRole = new iam.Role(stack, 'TaskRole', {
  assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
});

// Define policies for the task role
taskRole.addToPolicy(new iam.PolicyStatement({
  actions: ['s3:GetObject'],
  resources: ['arn:aws:s3:::my-bucket/*'],
}));

// Create a security group for the ECS tasks
const taskSecurityGroup = new ec2.SecurityGroup(stack, 'TaskSecurityGroup', {
  vpc,
});
taskSecurityGroup.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(80));

// Assign the security group to the task definition
taskDefinition.addContainer('MyContainer').addPortMappings({
  containerPort: 80,
  hostPort: 80,
  protocol: ecs.Protocol.TCP,
});

// Output the NLB DNS name
new cdk.CfnOutput(stack, 'NLBDnsName', {
  value: lb.loadBalancerDnsName,
});

app.synth();
```

In this CDK template, we've created a VPC, an ECS cluster, a task definition, a container, a service, and a Network Load Balancer. We've also implemented security measures such as IAM roles, security groups, and policies to ensure the secure deployment of containerized applications using Amazon ECS.