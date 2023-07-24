# Chapter 18: Error Handling and Validation

In this chapter, we'll explore how to handle errors and perform data validation and input sanitation in Golang web applications. Proper error handling ensures that our applications respond gracefully to unexpected situations, while data validation and input sanitation help maintain data integrity and security.

## Custom Error Handling for APIs

When building APIs in Golang, it's essential to handle errors effectively to provide meaningful feedback to clients. Custom error handling allows us to generate consistent and informative error responses.

One approach to custom error handling is to define a custom error type that includes error codes and messages. We can then use this custom error type throughout our application to manage different error scenarios.

Here's an example of custom error handling for an API:

```go
package main

import (
    "fmt"
    "net/http"
)

type APIError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}

func (e APIError) Error() string {
    return e.Message
}

func errorHandler(w http.ResponseWriter, r *http.Request, statusCode int, message string) {
    err := APIError{Code: statusCode, Message: message}
    w.WriteHeader(statusCode)
    fmt.Fprintf(w, "%s", err)
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    // Simulate an error for demonstration purposes
    errorHandler(w, r, http.StatusInternalServerError, "Something went wrong")
}

func main() {
    http.HandleFunc("/user", userHandler)
    http.ListenAndServe(":8080", nil)
}
```

In this example, we defined a custom `APIError` type and an `errorHandler` function to handle errors and send custom error responses.

## Data Validation and Input Sanitation

Data validation is crucial for ensuring that the data received from clients is valid and meets specific requirements. Input sanitation is the process of cleaning and formatting user inputs to prevent security issues like SQL injection and Cross-Site Scripting (XSS) attacks.

To perform data validation and input sanitation in Golang, we can use packages like `validator` and `html/template`.

Here's an example of data validation and input sanitation for an API using the `validator` package:

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/go-playground/validator/v10"
)

type User struct {
    Name  string `json:"name" validate:"required"`
    Email string `json:"email" validate:"required,email"`
}

var validate = validator.New()

func createUserHandler(w http.ResponseWriter, r *http.Request) {
    var newUser User
    // Decode the request body into the User struct
    // ...

    // Validate the user data
    err := validate.Struct(newUser)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        fmt.Fprintf(w, "Invalid data: %v", err)
        return
    }

    // Save the user data to the database
    // ...

    w.WriteHeader(http.StatusCreated)
    fmt.Fprintf(w, "User created successfully")
}

func main() {
    http.HandleFunc("/user", createUserHandler)
    http.ListenAndServe(":8080", nil)
}
```

In this example, we use the `validator` package to define validation tags for the `User` struct fields. We then validate the data received from the client before proceeding with further processing.

### Conclusion

In this chapter, we explored how to handle errors effectively by implementing custom error handling for APIs. We also learned about data validation and input sanitation to ensure that the data received from clients is valid and secure.

Proper error handling and data validation are essential for building robust and secure web applications, providing a better user experience and reducing the risk of security vulnerabilities.

In the next chapter, we'll dive into performance optimization techniques for Golang web applications, improving the application's speed and efficiency. Let's continue our journey to master Golang web development!

---