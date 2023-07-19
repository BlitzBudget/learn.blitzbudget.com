# Chapter 17: Authentication and Authorization

In this chapter, we'll explore how to implement user authentication and authorization in Golang web applications. Authentication ensures that users are who they claim to be, while authorization controls what actions users are allowed to perform based on their roles and permissions.

## Implementing User Authentication

User authentication is the process of verifying a user's identity using credentials, such as username and password. To implement user authentication in Golang, we'll typically use techniques like storing hashed passwords, managing session tokens, and utilizing authentication middleware.

Here's a high-level overview of the steps involved in user authentication:

1. **User Registration**: Collect user information (e.g., username, email, password), hash the password securely, and store the user data in a database.

2. **User Login**: Validate user credentials during login by comparing the provided password with the hashed password stored in the database. If the credentials are valid, create a session token to represent the authenticated user.

3. **Session Management**: Manage user sessions using session tokens or JSON Web Tokens (JWT). Store session data securely and revoke sessions upon logout or expiration.

4. **Authentication Middleware**: Implement authentication middleware to protect sensitive routes or endpoints. The middleware checks if the user has a valid session token before allowing access.

## Role-Based Access Control

Role-Based Access Control (RBAC) is a common authorization model used to manage user permissions based on their roles. Each user is assigned one or more roles, and each role has specific permissions associated with it. RBAC helps enforce access control and restrict users from accessing resources they are not authorized to use.

To implement RBAC in Golang, we can create a system that maps users to roles and roles to permissions. Then, we use middleware to check if a user's role has the necessary permissions to access a particular resource or endpoint.

Here's a basic example of implementing RBAC using middleware:

```go
package main

import (
    "fmt"
    "net/http"
)

type User struct {
    ID       int
    Username string
    Role     string
}

// Simulated user data
var users = []User{
    {ID: 1, Username: "user1", Role: "user"},
    {ID: 2, Username: "admin1", Role: "admin"},
}

func checkPermissions(requiredRole string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Get the user role from the request context (you can implement this based on your authentication system)
            userRole := "user"

            if userRole != requiredRole {
                http.Error(w, "Unauthorized", http.StatusUnauthorized)
                return
            }

            // Proceed to the next middleware or the actual handler
            next.ServeHTTP(w, r)
        })
    }
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "User-specific content")
}

func adminHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Admin-specific content")
}

func main() {
    http.HandleFunc("/user", checkPermissions("user")(userHandler))
    http.HandleFunc("/admin", checkPermissions("admin")(adminHandler))

    http.ListenAndServe(":8080", nil)
}
```

In this example, we use middleware to check if the user's role has the required permission to access specific routes. If the user doesn't have the necessary role, we return a "Unauthorized" status.

### Conclusion

In this chapter, we explored how to implement user authentication and authorization in Golang web applications. We learned about user registration, login, and session management for authentication. We also implemented role-based access control (RBAC) using middleware to control user access to specific resources.

Authentication and authorization are crucial aspects of building secure web applications, ensuring that users have proper access to protected resources based on their roles and permissions.

In the next chapter, we'll dive into handling errors and managing logging in Golang web applications, improving the application's reliability and maintainability. Let's continue our journey to master Golang web development!

---