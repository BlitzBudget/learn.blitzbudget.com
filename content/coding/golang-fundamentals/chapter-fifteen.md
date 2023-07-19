# Chapter 15: Golang Web Development - Part 3

In this chapter, we'll explore how to implement CRUD (Create, Read, Update, Delete) operations with a database in Golang web development. We'll use GORM, a popular ORM (Object-Relational Mapping) library for Go, to interact with the database efficiently.

## Implementing CRUD Operations with a Database

To perform CRUD operations with a database in a web application, we'll follow these steps:

1. Define the database model: Create a Go struct that represents the database table and its columns.

2. Initialize the database connection: Open a connection to the database using the appropriate driver (e.g., PostgreSQL, MySQL, SQLite).

3. Perform CRUD operations: Use GORM methods to create, read, update, and delete data from the database.

## Using GORM for Database Interactions

GORM is an excellent choice for handling database interactions in Go applications. It supports various databases and provides a rich set of features, including automatic table creation, querying, and data mapping.

To use GORM, first, install the library using:

```
go get -u gorm.io/gorm
```

Here's a simple example of how to perform CRUD operations using GORM:

```go
package main

import (
    "fmt"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

// Define the database model (User)
type User struct {
    gorm.Model
    Name  string
    Email string
}

func main() {
    // Initialize the database connection (SQLite in this example)
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect to database")
    }

    // Create the table (automigrate) and perform CRUD operations
    err = db.AutoMigrate(&User{})
    if err != nil {
        panic("failed to migrate table")
    }

    // Create a new user
    newUser := User{Name: "John Doe", Email: "john@example.com"}
    result := db.Create(&newUser)
    if result.Error != nil {
        panic("failed to create user")
    }

    // Read the user from the database
    var user User
    db.First(&user, newUser.ID)
    fmt.Println("User:", user.Name, user.Email)

    // Update the user
    user.Email = "john.doe@example.com"
    db.Save(&user)

    // Delete the user
    db.Delete(&user)
}
```

### Conclusion

In this chapter, we explored how to implement CRUD operations with a database in Golang web development. We used GORM, a powerful ORM library for Go, to interact with the database efficiently.

We defined the database model, initialized the database connection, and performed CRUD operations using GORM methods.

In the next chapter, we'll dive into handling user authentication and authorization in web applications, ensuring secure access to specific resources. Let's continue our journey to master Golang web development!

---