# Chapter 16: RESTful APIs with Golang

In this chapter, we'll explore how to design and build RESTful APIs in Golang. We'll learn the principles of RESTful API design and how to create API endpoints to handle HTTP requests effectively.

## Designing RESTful APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs adhere to specific principles, making them easy to understand, discover, and use. Key principles of RESTful API design include:

1. Use HTTP methods: Map each API endpoint to an HTTP method (GET, POST, PUT, DELETE) based on the action performed.

2. Use nouns for resources: Represent resources as nouns in the API's URL. For example, `/users`, `/products`, etc.

3. Use plural for resource names: Use plural nouns in the URL to represent collections of resources (e.g., `/users`, `/products`).

4. Use specific endpoints: Make API endpoints specific and avoid long, complex URLs.

5. Versioning: Include version numbers in the API URL to handle future changes gracefully (e.g., `/v1/users`).

6. Use status codes: Return appropriate HTTP status codes for responses (e.g., 200 for success, 404 for not found, etc.).

## Building API Endpoints and Handling Requests

To build RESTful APIs in Golang, we'll use the `net/http` package to handle incoming requests and send responses.

Here's an example of building a simple RESTful API for managing users:

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var users []User

func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func addUser(w http.ResponseWriter, r *http.Request) {
    var newUser User
    err := json.NewDecoder(r.Body).Decode(&newUser)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        fmt.Fprintf(w, "Error decoding request body: %v", err)
        return
    }

    users = append(users, newUser)
    w.WriteHeader(http.StatusCreated)
    fmt.Fprintf(w, "User added successfully")
}

func main() {
    http.HandleFunc("/users", getUsers).Methods("GET")
    http.HandleFunc("/users", addUser).Methods("POST")

    users = append(users, User{ID: 1, Name: "John Doe", Email: "john@example.com"})
    users = append(users, User{ID: 2, Name: "Jane Smith", Email: "jane@example.com"})

    http.ListenAndServe(":8080", nil)
}
```

In this example, we've created two API endpoints: one to fetch users (`GET /users`) and another to add a new user (`POST /users`). We use the `json` package to encode and decode data in JSON format.

### Conclusion

In this chapter, we explored how to design and build RESTful APIs in Golang. We followed RESTful API design principles and used the `net/http` package to handle incoming requests and send responses.

We created API endpoints for managing users, demonstrating how to fetch data and add new records to our users collection.

In the next chapter, we'll dive into handling authentication and securing our API endpoints to protect sensitive resources. Let's continue our journey to master Golang web development!

---