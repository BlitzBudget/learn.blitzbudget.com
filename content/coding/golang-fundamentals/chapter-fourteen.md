# Chapter 14: Golang Web Development - Part 2

In this chapter, we'll dive deeper into Golang web development, focusing on handling HTTP requests and responses effectively. We'll also explore routing and middleware, essential concepts for building dynamic and interactive web applications.

## Handling HTTP Requests and Responses

In Golang web development, handling HTTP requests and responses is fundamental. The `net/http` package provides various functions and types to help us work with these HTTP interactions.

### Handling Requests

To handle HTTP requests, we use the `http.HandleFunc` function or the `http.HandlerFunc` type, which allows us to define functions to respond to specific URL paths.

```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    http.ListenAndServe(":8080", nil)
}
```

### Handling Responses

For handling HTTP responses, we use the `http.ResponseWriter` interface. We can write data to this interface to send a response back to the client.

```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK) // Set the status code to 200
    fmt.Fprint(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    http.ListenAndServe(":8080", nil)
}
```

## Routing and Middleware

Routing is the process of matching the URL path of an incoming request to a specific handler function. In Golang web development, we use the `http.ServeMux` type or third-party packages like Gorilla Mux for more advanced routing capabilities.

Middleware, on the other hand, are functions that can be used to preprocess requests or post-process responses before reaching the actual handler function. Middleware can be used for authentication, logging, CORS handling, etc.

Here's an example using Gorilla Mux for routing and a simple logging middleware:

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/gorilla/mux"
)

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Println("Request received:", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprint(w, "Hello, World!")
}

func main() {
    r := mux.NewRouter()

    // Use the loggingMiddleware for all routes
    r.Use(loggingMiddleware)

    // Define the handler for the "/hello" path
    r.HandleFunc("/hello", helloHandler)

    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}
```

### Conclusion

In this chapter, we delved deeper into Golang web development, focusing on handling HTTP requests and responses effectively. We learned how to define handlers for specific URL paths and send responses back to clients.

Additionally, we explored routing and middleware, important concepts for building dynamic and interactive web applications. We used Gorilla Mux for more advanced routing and implemented a simple logging middleware.

In the next chapter, we'll dive into templates and rendering HTML to create more sophisticated web pages with dynamic content. Let's continue our journey to master Golang web development!

---