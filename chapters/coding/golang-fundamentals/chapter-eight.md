# Chapter 8: Error Handling

In this chapter, we'll explore error handling in Go, which is a crucial aspect of writing robust and reliable code. We'll learn how to handle errors effectively, work with custom error types, and follow best practices for error handling in Go.

## Handling Errors in Go

In Go, errors are a first-class citizen, and handling them correctly is essential for maintaining the reliability of our programs. Go's error handling philosophy emphasizes explicit error checking rather than exceptions.

Let's see an example of handling an error in Go:

```go
package main

import (
    "fmt"
    "errors"
)

// Function to divide two numbers and return an error if the denominator is zero
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero is not allowed")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err) // Output: Error: division by zero is not allowed
    } else {
        fmt.Println("Result:", result) // Output: Result: 5
    }
}
```

## Custom Error Types and Error Wrapping

In addition to using the built-in `errors.New()` function, we can create custom error types to provide more context and information about the error. Error wrapping allows us to add context to an existing error while preserving its original information.

Here's an example demonstrating custom error types and error wrapping:

```go
package main

import (
    "fmt"
    "errors"
)

// Custom error type with additional context
type DivisionError struct {
    numerator   float64
    denominator float64
    msg         string
}

// Implementing the Error() method for the custom error type
func (e *DivisionError) Error() string {
    return fmt.Sprintf("division error: %s, numerator: %f, denominator: %f", e.msg, e.numerator, e.denominator)
}

// Function to divide two numbers and return a custom error if the denominator is zero
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, &DivisionError{numerator: a, denominator: b, msg: "division by zero is not allowed"}
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err) // Output: Error: division error: division by zero is not allowed, numerator: 10.000000, denominator: 0.000000
    } else {
        fmt.Println("Result:", result)
    }
}
```

## Error Handling Best Practices

When handling errors in Go, consider the following best practices:

1. Always check for errors explicitly using `if err != nil`.

2. Use descriptive error messages to provide helpful information about the error.

3. Create custom error types to provide more context and make error handling more expressive.

4. Prefer error wrapping to preserve original error information while adding more context.

5. Consider using sentinel errors (predefined error variables) for common error scenarios.

6. Avoid returning `nil` as an error. Instead, use `errors.New()` or custom error types.

7. Handle errors as close to their occurrence as possible to ensure clear error propagation.

### Conclusion

In this chapter, we explored error handling in Go, a critical aspect of writing reliable software. We learned how to handle errors explicitly, work with custom error types and error wrapping, and follow best practices for error handling.

In the next chapter, we'll dive into concurrency in Go, exploring goroutines and channels, which enable efficient and concurrent programming. Let's continue our journey to master Golang!

---