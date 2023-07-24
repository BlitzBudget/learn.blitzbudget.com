# Chapter 7: Accessing RDS in a VPC with Node.js

In this chapter, we'll explore how to access Amazon Relational Database Service (RDS) within a Virtual Private Cloud (VPC) from our Node.js serverless applications. Amazon RDS is a fully managed database service that supports various database engines, including MySQL, PostgreSQL, Oracle, and SQL Server. By using RDS within a VPC, we can enhance security and control network traffic between our serverless application and the database.

## Prerequisites

Before we begin, make sure you have the following prerequisites in place:

1. An AWS account with the necessary permissions to create and manage resources like RDS and VPC.

2. The AWS CLI installed and configured on your development machine. If you haven't set up the AWS CLI yet, refer to Chapter 2 for instructions.

3. Node.js and npm (Node Package Manager) installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

4. Basic knowledge of JavaScript and Node.js.

## Setting Up the VPC

To access RDS within a VPC, we need to create a VPC with subnets and security groups. If you already have an existing VPC with appropriate settings, you can skip this section and use your existing VPC. Otherwise, let's create a new VPC using the AWS Management Console.

1. Open the AWS Management Console and navigate to the Amazon VPC service.

2. Click on "Create VPC."

3. Provide a name for your VPC and specify the IPv4 CIDR block for the VPC. For example, you can use "10.0.0.0/16."

4. Click "Create."

Next, we need to create two subnets within the VPC - one for the public subnet and another for the private subnet.

1. In the VPC dashboard, navigate to "Subnets."

2. Click on "Create subnet."

3. Choose the VPC you created earlier.

4. Provide a name for the subnet and specify the IPv4 CIDR block. For example, you can use "10.0.1.0/24" for the public subnet.

5. Select an availability zone for the subnet.

6. Click "Create."

Repeat the above steps to create the private subnet with a different CIDR block, such as "10.0.2.0/24."

## Setting Up RDS in the VPC

Now that we have a VPC with subnets, let's set up the RDS instance within the VPC.

1. In the AWS Management Console, navigate to the Amazon RDS service.

2. Click on "Create database."

3. Choose the database engine you want to use (e.g., MySQL, PostgreSQL, etc.) and select the "Standard Create" option.

4. Under "Templates," choose the "Free tier" template if you're eligible for the free tier.

5. In the "Settings" section:

   - Specify a name for the database instance.
   - Set the username and password for the database.
   - Choose the VPC you created earlier from the "Virtual Private Cloud (VPC)" dropdown.
   - Choose the private subnet from the "Subnet group" dropdown.

6. In the "Database instance size" section, select the appropriate instance size for your needs.

7. Expand the "Additional configuration" section and provide a name for the initial database.

8. Leave the rest of the settings as default or configure them according to your requirements.

9. Click "Create database" to create the RDS instance within the VPC.

Once the RDS instance is created, note down its endpoint URL and port number. We'll need this information to connect to the database from our Node.js application.

## Configuring Security Groups

To allow our Node.js serverless application to access the RDS instance, we need to configure security groups. A security group acts as a virtual firewall to control inbound and outbound traffic for the resources associated with it.

1. In the AWS Management Console, navigate to the Amazon VPC service.

2. Click on "Security Groups."

3. Click "Create security group."

4. Provide a name and description for the security group.

5. Choose the VPC you created earlier from the "VPC" dropdown.

6. In the "Inbound rules" tab, add a new rule to allow incoming traffic from your Node.js application. For example, if you're using MySQL, you can add a rule to allow inbound traffic on port 3306 (default port for MySQL).

7. In the "Outbound rules" tab, you can leave the default rule to allow all outbound traffic.

8. Click "Create security group" to create the security group.

Next, associate the security group with the RDS instance.

1. In the Amazon RDS dashboard, select the RDS instance you created earlier.

2. In the "Connectivity & security" tab, find the "Security groups" section and click "Edit."

3. Add the security group you created earlier to the RDS instance.

4. Click "Save rules."

## Connecting to RDS from Node.js

Now that we have set up the VPC, RDS instance, and security groups, let's connect to the database from our Node.js application.

First, let's install the `mysql` module using npm:

```bash
npm install mysql
```

Next, create a new file named `dbConfig.js` to store the configuration for connecting to the RDS instance:

```javascript
// dbConfig.js
module.exports = {
  host: 'your-rds-endpoint',
  port: 'your-rds-port',
  user: 'your-db-username',
  password: 'your-db-password',
  database: 'your-db-name',
};
```

Replace the placeholders (`your-rds-endpoint`, `your-rds-port`, `your-db-username`, `your-db-password`, and `your-db-name`) with the actual values for your RDS instance.

Now, let's create a new file named `app.js` for our Node.js application:

```javascript
// app.js
const mysql = require('mysql');
const dbConfig = require('./dbConfig');

const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }

  console.log('Connected to the database as ID:', connection.threadId);
});

// Perform a sample query
const query = 'SELECT * FROM users';

connection.query(query, (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }

  console.log('Query results:', results);
});

// Close the database connection
connection.end((err) => {
  if (err) {
    console.error('Error closing the database connection:', err.stack);
    return;
  }

  console.log('Database connection closed.');
});
```

In this code, we use the `mysql` module to create a connection to the RDS instance using the configuration from `dbConfig.js`. The `connection.connect()` method establishes the connection, and the `connection.query()` method performs a sample query to retrieve data from the database.

Finally, we close the database connection using the `connection.end()` method

.

## Running the Node.js Application

To run the Node.js application, execute the following command in your project directory:

```bash
node app.js
```

If everything is set up correctly, you should see the output indicating that the application has connected to the database and executed the query successfully.

## Conclusion

In this chapter, we learned how to access Amazon RDS within a Virtual Private Cloud (VPC) from our Node.js serverless applications. We set up a VPC with subnets and security groups, created an RDS instance within the VPC, and configured security groups to allow our Node.js application to communicate with the database.

Connecting to RDS in a VPC ensures that our database resources are protected and accessible only from authorized sources, adding an additional layer of security to our serverless architecture.

In the next chapter, we'll explore how to securely fetch and manage secrets, such as API keys or database passwords, from our Node.js serverless functions using AWS Secrets Manager. Stay tuned for more exciting tutorials and examples!