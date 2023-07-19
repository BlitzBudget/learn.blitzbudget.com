# Chapter 10: Goroutine Scheduling and Context

In this chapter, we'll delve deeper into Goroutine scheduling and resource management in Go. We'll also explore how to use the `context` package to handle cancellation and timeouts, ensuring efficient and controlled execution of Goroutines.

## Goroutine Scheduling and Resource Management

Go's runtime scheduler is responsible for managing Goroutines on available CPU cores. The scheduler uses a technique called work-stealing to efficiently distribute Goroutines across multiple cores, maximizing CPU utilization.

The Go scheduler automatically switches Goroutines based on blocking operations (e.g., I/O) or when a Goroutine's time slice is used up.

Here's an example demonstrating Goroutine scheduling:

```go
package main

import (
    "fmt"
    "time"
)

// Function to print numbers from 1 to 5 and show Goroutine scheduling
func printNumbers(id int) {
    for i := 1; i <= 5; i++ {
        fmt.Printf("Goroutine %d: %d\n", id, i)
        time.Sleep(time.Millisecond * 100) // Introducing some delay
    }
}

func main() {
    // Creating three Goroutines
    for i := 1; i <= 3; i++ {
        go printNumbers(i)
    }

    // All Goroutines are executed concurrently
    time.Sleep(time.Second)
}
```

## Using the Context Package for Cancellation and Timeouts

The `context` package in Go provides a powerful mechanism for handling cancellation, timeouts, and passing values between Goroutines safely.

A `context.Context` carries deadlines, cancellation signals, and other values across API boundaries to facilitate proper Goroutine termination.

Let's see an example of using the `context` package for cancellation:

```go
package main

import (
    "fmt"
    "time"
    "context"
)

// Function to perform a task with cancellation support
func performTask(ctx context.Context) {
    select {
    case <-ctx.Done():
        fmt.Println("Task was cancelled.")
    case <-time.After(time.Second * 3):
        fmt.Println("Task completed successfully.")
    }
}

func main() {
    // Creating a context with a timeout of 2 seconds
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
    defer cancel() // Cancel the context to release resources when the main function returns

    // Start the task with the context
    performTask(ctx)

    // Wait for a while to ensure the task has time to complete or be cancelled
    time.Sleep(time.Second * 5)
}
```

### Conclusion

In this chapter, we delved deeper into Goroutine scheduling and resource management in Go. We explored the runtime scheduler's efficient work-stealing mechanism, which allows Goroutines to be distributed across multiple CPU cores effectively.

We also learned about the `context` package, a powerful tool for handling cancellation, timeouts, and values between Goroutines safely. By using the `context` package, we can create more robust and well-managed concurrent programs.

In the next chapter, we'll explore testing in Go, understanding how to write and run tests for our code to ensure its correctness. Let's continue our journey to master Golang!

---