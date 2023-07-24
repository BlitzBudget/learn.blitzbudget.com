# Chapter 11: Database Integration with Node.js

Welcome to Chapter 11 of our comprehensive guide on Node.js application development. In this chapter, we will delve into the world of database integration with Node.js. Databases play a crucial role in most applications as they store and manage data, enabling persistent and scalable data storage.

## Table of Contents
1. [Introduction to Databases](#introduction-to-databases)
2. [Types of Databases](#types-of-databases)
3. [Setting up a Database](#setting-up-a-database)
4. [Connecting to the Database](#connecting-to-the-database)
5. [CRUD Operations with MongoDB](#crud-operations-with-mongodb)
   - 5.1. [Creating Data](#creating-data)
   - 5.2. [Reading Data](#reading-data)
   - 5.3. [Updating Data](#updating-data)
   - 5.4. [Deleting Data](#deleting-data)
6. [CRUD Operations with MySQL](#crud-operations-with-mysql)
   - 6.1. [Installing MySQL](#installing-mysql)
   - 6.2. [Creating a Database Connection](#creating-a-database-connection)
   - 6.3. [Creating a Table](#creating-a-table)
   - 6.4. [Inserting Data](#inserting-data)
   - 6.5. [Querying Data](#querying-data)
   - 6.6. [Updating Data](#updating-data-mysql)
   - 6.7. [Deleting Data](#deleting-data-mysql)
7. [Data Modeling and Validation](#data-modeling-and-validation)
8. [Transactions and Error Handling](#transactions-and-error-handling)
9. [Using an ORM (Object-Relational Mapping)](#using-an-orm-object-relational-mapping)
10. [Conclusion](#conclusion)

Let's get started!

## 1. Introduction to Databases

A database is a structured collection of data that is organized, managed, and accessed electronically. Databases are essential for modern applications as they provide a reliable and efficient way to store and retrieve data. They eliminate the need for data to be stored in flat files or spreadsheets, enabling more advanced querying, indexing, and data manipulation.

Databases come in various types, each suited for different use cases and application requirements. In this chapter, we will focus on two popular types of databases: NoSQL databases (MongoDB) and Relational databases (MySQL). We will explore how to integrate them with Node.js applications and perform CRUD (Create, Read, Update, Delete) operations.

## 2. Types of Databases

There are several types of databases available, each with its own strengths and weaknesses. The two main types we'll cover in this chapter are:

### NoSQL Databases (MongoDB)

NoSQL databases are non-relational databases that offer flexibility and scalability. They store data in a format other than the traditional table-based structure used in relational databases. NoSQL databases are often a better fit for applications dealing with large amounts of unstructured or semi-structured data, as they allow for more dynamic and schema-less data models.

MongoDB is a popular NoSQL database that uses a JSON-like format for data representation, making it easy to work with in JavaScript applications. It is a document-based database, where data is stored in collections of JSON-like documents.

### Relational Databases (MySQL)

Relational databases, on the other hand, use a structured table-based data model. They store data in rows and columns, and each row in a table represents a unique record, while each column represents a specific attribute of that record. Relational databases are well-suited for applications with highly structured data and complex relationships between entities.

MySQL is one of the most widely used open-source relational databases. It is known for its performance, reliability, and ease of use. It uses the SQL (Structured Query Language) for querying and manipulating data.

Both types of databases have their advantages, and the choice of database depends on the specific requirements of your application.

## 3. Setting up a Database

Before we can integrate a database with our Node.js application, we need to set up the database system on our machine and install the necessary libraries.

### Setting up MongoDB

To set up MongoDB, follow these steps:

1. **Install MongoDB**: Visit the official MongoDB website and download the installer for your operating system. Install MongoDB using the appropriate installation instructions.

2. **Start MongoDB**: After installation, start the MongoDB server. On most systems, MongoDB will run as a background service automatically.

3. **Verify Installation**: Open a terminal or command prompt and run the `mongo` command. If MongoDB is installed correctly, you should see the MongoDB shell prompt.

### Setting up MySQL

To set up MySQL, follow these steps:

1. **Install MySQL**: Visit the official MySQL website and download the installer for your operating system. Install MySQL using the appropriate installation instructions.

2. **Start MySQL**: After installation, start the MySQL server. On most systems, MySQL will run as a background service automatically.

3. **Verify Installation**: Open a terminal or command prompt and run the `mysql` command. If MySQL is installed correctly, you should see the MySQL shell prompt.

With MongoDB and MySQL installed and running, we can now proceed to connect our Node.js application to the databases.

## 4. Connecting to the Database

To interact with a database from our Node.js application, we need to establish a connection between the application and the database. In this section, we will explore how to connect to both MongoDB and MySQL databases.

### Connecting to MongoDB

To connect to MongoDB from our Node.js application, we need a MongoDB driver. The official MongoDB Node.js driver is `mongodb`, which allows us to interact with the MongoDB database using JavaScript.

First, let's install the `mongodb` package:

```bash
npm install mongodb --save
```

Now, let's create a module to handle the MongoDB connection. Create a file named `mongoConnection.js` and add the following code:

```javascript
const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017'; // Replace with your MongoDB URL

let db;

async function connect() {
  try {
    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    db = client.db('myDatabase'); // Replace 'myDatabase' with your database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };
```

In this code, we imported the `MongoClient` from the `mongodb` package. We defined the MongoDB URL and the name of the database we want to connect to. The `connect()` function establishes the connection to the MongoDB database and sets the `db` variable to the connected database instance.

To use the MongoDB connection in our application, we need to call the `connect()` function once during the application startup. For example, in our main `app.js` file:

```javascript
const express = require('express');
const app = express();
const { connect } = require('./mongoConnection');

// Connect to MongoDB
connect();

// Rest of the application code
```

Now

 that we have connected to MongoDB, we can perform CRUD operations on our collections.

### Connecting to MySQL

To connect to MySQL from our Node.js application, we need a MySQL driver. The `mysql2` package is a popular MySQL driver for Node.js, providing fast and efficient connectivity.

First, let's install the `mysql2` package:

```bash
npm install mysql2 --save
```

Next, let's create a module to handle the MySQL connection. Create a file named `mysqlConnection.js` and add the following code:

```javascript
const mysql = require('mysql2');

const mysqlConfig = {
  host: 'localhost',
  user: 'yourUsername', // Replace with your MySQL username
  password: 'yourPassword', // Replace with your MySQL password
  database: 'myDatabase', // Replace with your database name
};

const pool = mysql.createPool(mysqlConfig);

function getPool() {
  return pool;
}

module.exports = { getPool };
```

In this code, we defined the MySQL configuration, including the host, username, password, and database name. We created a connection pool using `mysql.createPool()` to efficiently manage multiple connections to the database.

To use the MySQL connection in our application, we need to require the `mysqlConnection.js` module where we want to interact with the database. For example, in our main `app.js` file:

```javascript
const express = require('express');
const app = express();
const { getPool } = require('./mysqlConnection');

// Rest of the application code
```

Now that we have connected to MySQL, we can perform CRUD operations on our tables.

## 5. CRUD Operations with MongoDB

Now that we have connected to MongoDB, let's explore how to perform CRUD (Create, Read, Update, Delete) operations using the `mongodb` package.

### 5.1. Creating Data

To create data in MongoDB, we need to insert documents into a collection. A collection in MongoDB is similar to a table in a relational database. We can insert one or multiple documents into a collection.

```javascript
const { getDb } = require('./mongoConnection');

async function createData(data) {
  const db = getDb();
  const collection = db.collection('myCollection'); // Replace 'myCollection' with your collection name

  try {
    const result = await collection.insertOne(data);
    console.log('Data inserted:', result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}
```

In this example, we defined a function `createData()` that takes a JavaScript object `data` as input. The function retrieves the MongoDB database instance using the `getDb()` function from our connection module.

We then use the `db.collection('myCollection')` method to access the collection where we want to insert the data. Replace `'myCollection'` with the name of your collection.

The `collection.insertOne(data)` method inserts the `data` object into the collection and returns an object with information about the operation, including the ID of the newly inserted document.

### 5.2. Reading Data

To read data from MongoDB, we can use the `find()` method to query the collection. The `find()` method returns a cursor, which we can iterate over to access the documents.

```javascript
const { getDb } = require('./mongoConnection');

async function readData() {
  const db = getDb();
  const collection = db.collection('myCollection'); // Replace 'myCollection' with your collection name

  try {
    const cursor = await collection.find({});
    const data = await cursor.toArray();
    console.log('Read data:', data);
    return data;
  } catch (error) {
    console.error('Error reading data:', error);
  }
}
```

In this example, we defined a function `readData()` that reads all documents from the collection. The function retrieves the MongoDB database instance using the `getDb()` function from our connection module.

We then use the `db.collection('myCollection')` method to access the collection where we want to read the data. Replace `'myCollection'` with the name of your collection.

The `collection.find({})` method retrieves all documents from the collection. The `cursor.toArray()` method converts the cursor to an array of documents.

### 5.3. Updating Data

To update data in MongoDB, we can use the `updateOne()` method to update a single document or the `updateMany()` method to update multiple documents that match the filter.

```javascript
const { getDb } = require('./mongoConnection');

async function updateData(filter, update) {
  const db = getDb();
  const collection = db.collection('myCollection'); // Replace 'myCollection' with your collection name

  try {
    const result = await collection.updateOne(filter, { $set: update });
    console.log('Data updated:', result.modifiedCount);
    return result.modifiedCount;
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
```

In this example, we defined a function `updateData()` that takes two parameters: `filter` and `update`. The `filter` parameter is an object that specifies which documents to update, and the `update` parameter is an object with the new data to set.

We then use the `db.collection('myCollection')` method to access the collection where we want to update the data. Replace `'myCollection'` with the name of your collection.

The `collection.updateOne(filter, { $set: update })` method updates the first document that matches the `filter` with the new data specified in the `update` object. The `$set` operator is used to update specific fields in the document.

### 5.4. Deleting Data

To delete data from MongoDB, we can use the `deleteOne()` method to delete a single document or the `deleteMany()` method to delete multiple documents that match the filter.

```javascript
const { getDb } = require('./mongoConnection');

async function deleteData(filter) {
  const db = getDb();
  const collection = db.collection('myCollection'); // Replace 'myCollection' with your collection name

  try {
    const result = await collection.deleteOne(filter);
    console.log('Data deleted:', result.deletedCount);
    return result.deletedCount;
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
```

In this example, we defined a function `deleteData()` that takes the `filter` parameter. The `filter` parameter is an object that specifies which documents to delete.

We then use the `db.collection('myCollection')` method to access the collection where we want to delete the data. Replace `'myCollection'` with the name of your collection.

The `collection.deleteOne(filter)` method deletes the first document that matches the `filter`. The `result.deletedCount` property contains the number of documents deleted.

With these CRUD operations, we can now interact with MongoDB and manipulate data in our collections.

## 6. CRUD Operations with MySQL

Now that we have connected to MySQL, let's explore how to perform CRUD (Create, Read, Update, Delete) operations using the `mysql2` package.

### 6.1. Installing MySQL

Before we proceed, make sure you have installed MySQL on your system, as described

 in the "Setting up MySQL" section earlier.

### 6.2. Creating a Database Connection

In the MySQL connection module (`mysqlConnection.js`), we have already created a connection pool to efficiently manage connections to the database. Now let's explore how to use this connection pool to perform CRUD operations.

### 6.3. Creating a Table

Before we can insert data into a table, we need to create the table with the desired schema. In this example, we'll create a simple table named `users` with two columns: `id` and `name`.

```javascript
const { getPool } = require('./mysqlConnection');

async function createTable() {
  const pool = getPool();

  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(createTableQuery);
    console.log('Table created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}
```

In this example, we defined a function `createTable()` that creates the `users` table if it does not already exist. The function retrieves the MySQL connection pool using the `getPool()` function from our connection module.

The `pool.query(createTableQuery)` method executes the SQL query to create the table.

### 6.4. Inserting Data

To insert data into the `users` table, we can use parameterized queries to avoid SQL injection vulnerabilities.

```javascript
const { getPool } = require('./mysqlConnection');

async function insertData(name) {
  const pool = getPool();

  try {
    const insertDataQuery = 'INSERT INTO users (name) VALUES (?)';
    const result = await pool.query(insertDataQuery, [name]);
    console.log('Data inserted:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}
```

In this example, we defined a function `insertData()` that takes a `name` parameter. The function inserts the `name` value into the `users` table using a parameterized query.

The `pool.query(insertDataQuery, [name])` method executes the parameterized query and safely inserts the `name` value into the table.

### 6.5. Querying Data

To query data from the `users` table, we can use the `SELECT` statement to retrieve specific records.

```javascript
const { getPool } = require('./mysqlConnection');

async function readData() {
  const pool = getPool();

  try {
    const readDataQuery = 'SELECT * FROM users';
    const [data] = await pool.query(readDataQuery);
    console.log('Read data:', data);
    return data;
  } catch (error) {
    console.error('Error reading data:', error);
  }
}
```

In this example, we defined a function `readData()` that reads all data from the `users` table. The function retrieves the MySQL connection pool using the `getPool()` function from our connection module.

The `pool.query(readDataQuery)` method executes the `SELECT` query and returns the data as an array.

### 6.6. Updating Data

To update data in the `users` table, we can use the `UPDATE` statement with the `SET` clause.

```javascript
const { getPool } = require('./mysqlConnection');

async function updateData(id, name) {
  const pool = getPool();

  try {
    const updateDataQuery = 'UPDATE users SET name = ? WHERE id = ?';
    const result = await pool.query(updateDataQuery, [name, id]);
    console.log('Data updated:', result.affectedRows);
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
```

In this example, we defined a function `updateData()` that takes `id` and `name` parameters. The function updates the `name` value in the `users` table for the specified `id` using a parameterized query.

The `pool.query(updateDataQuery, [name, id])` method executes the parameterized query and safely updates the `name` value for the specified `id`.

### 6.7. Deleting Data

To delete data from the `users` table, we can use the `DELETE` statement with the `WHERE` clause.

```javascript
const { getPool } = require('./mysqlConnection');

async function deleteData(id) {
  const pool = getPool();

  try {
    const deleteDataQuery = 'DELETE FROM users WHERE id = ?';
    const result = await pool.query(deleteDataQuery, [id]);
    console.log('Data deleted:', result.affectedRows);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
```

In this example, we defined a function `deleteData()` that takes an `id` parameter. The function deletes the data from the `users` table for the specified `id` using a parameterized query.

The `pool.query(deleteDataQuery, [id])` method executes the parameterized query and safely deletes the data for the specified `id`.

With these CRUD operations, we can now interact with MySQL and manipulate data in our tables.

## 7. Data Modeling and Validation

In real-world applications, data can be complex and may require modeling to represent relationships between different entities. Additionally, data validation is essential to ensure that only valid data is stored in the database.

To simplify data modeling and validation, we can use libraries such as `mongoose` for MongoDB and `sequelize` for MySQL. These libraries provide powerful features to define data models, validate data, and perform complex queries.

### Data Modeling with Mongoose (MongoDB)

`mongoose` is an Object Data Modeling (ODM) library for MongoDB. It provides a schema-based solution to model data and define the structure of documents in a collection.

Let's install the `mongoose` package:

```bash
npm install mongoose --save
```

Now, let's create a data model for our `users` collection:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

In this example, we defined a data model for the `users` collection using `mongoose.Schema()`. The schema specifies the structure of the document, including the data types and validation rules. The `required: true` option ensures that the `name` and `age` fields are mandatory for every document.

Now, we can use this data model to create, read, update, and delete data in the `users` collection.

### Data Modeling with Sequelize (MySQL)

`sequelize` is an Object-Relational Mapping (ORM) library for Node.js that provides an easy-to-use interface to interact with relational databases like MySQL.

Let's install the `sequelize` package:

```bash
npm install sequelize --save
npm install mysql2 --save
```

Now, let's create a data model for our `users` table:

```javascript


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('myDatabase', 'yourUsername', 'yourPassword', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
```

In this example, we defined a data model for the `users` table using `sequelize.define()`. The model specifies the structure of the table, including the data types and validation rules. The `allowNull: false` option ensures that the `name` and `age` fields are mandatory for every record.

Now, we can use this data model to create, read, update, and delete data in the `users` table.

## 8. Transactions and Error Handling

In some cases, we need to perform multiple database operations as a single unit of work. Transactions allow us to execute a series of database operations that succeed or fail as a whole. This ensures data integrity and consistency in the database.

### Transactions with MongoDB

In MongoDB, we can use the `session` object to perform transactions. Let's explore how to use transactions with MongoDB:

```javascript
const { getDb } = require('./mongoConnection');

async function performTransaction() {
  const db = getDb();

  const session = db.startSession();
  session.startTransaction();

  try {
    const collection = db.collection('myCollection'); // Replace 'myCollection' with your collection name

    // Perform multiple database operations
    await collection.insertOne({ name: 'John' }, { session });
    await collection.insertOne({ name: 'Jane' }, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    console.log('Transaction committed successfully');
  } catch (error) {
    console.error('Error performing transaction:', error);

    // Abort the transaction
    await session.abortTransaction();
    session.endSession();
  }
}
```

In this example, we defined a function `performTransaction()` that starts a transaction using the `startTransaction()` method of the `session` object. We then perform multiple database operations within the transaction. If any of the operations fail, the transaction will be aborted using the `abortTransaction()` method.

Finally, we use the `commitTransaction()` method to commit the transaction if all operations are successful.

### Transactions with MySQL

In MySQL, we can use the `sequelize.transaction()` method to perform transactions. Let's explore how to use transactions with MySQL:

```javascript
const { getPool } = require('./mysqlConnection');
const User = require('./userModel'); // Replace with the path to your data model file

async function performTransaction() {
  const pool = getPool();

  const transaction = await pool.getConnection();
  await transaction.beginTransaction();

  try {
    // Perform multiple database operations
    await User.create({ name: 'John', age: 30 }, { transaction });
    await User.create({ name: 'Jane', age: 25 }, { transaction });

    // Commit the transaction
    await transaction.commit();

    console.log('Transaction committed successfully');
  } catch (error) {
    console.error('Error performing transaction:', error);

    // Rollback the transaction
    await transaction.rollback();
  } finally {
    transaction.release();
  }
}
```

In this example, we defined a function `performTransaction()` that starts a transaction using `pool.getConnection()` and `beginTransaction()`. We then perform multiple database operations within the transaction using the data model's `create()` method. If any of the operations fail, the transaction will be rolled back using the `rollback()` method.

Finally, we use the `commit()` method to commit the transaction if all operations are successful.

## 9. Using an ORM (Object-Relational Mapping)

ORMs (Object-Relational Mappings) provide an abstraction layer between the application and the database, allowing developers to interact with the database using familiar object-oriented paradigms.

We have already used `mongoose` as an ODM for MongoDB and `sequelize` as an ORM for MySQL in previous sections. These libraries simplify data modeling, data validation, and database interactions.

Using an ORM offers several benefits, including:

- Abstracting complex SQL queries into simple method calls
- Automatic data validation and type casting
- Defining relationships between tables (associations)
- Handling migrations and database schema changes
- Improved code maintainability and readability

ORMs make it easier to switch between different database systems without changing the application code significantly.

## 10. Conclusion

In this chapter, we explored database integration with Node.js using MongoDB and MySQL. We learned how to connect to the databases, perform CRUD operations, use transactions for data integrity, and leverage ORMs for data modeling and validation.

Databases play a vital role in modern applications, and understanding how to integrate and interact with them is essential for building robust and scalable Node.js applications.

In the next chapter, we will explore another critical aspect of Node.js development: Authentication and Authorization. Stay tuned!

Thank you for reading, and happy coding! 🚀