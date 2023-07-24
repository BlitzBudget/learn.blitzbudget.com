# Chapter 3: Control Flow

In this chapter, we'll explore control flow in Go, which allows us to alter the flow of program execution based on certain conditions. We'll cover conditional statements like `if`, `else`, and `switch`, as well as different types of loops - `for` and `range`. Additionally, we'll learn about the `defer` statement for deferred function execution.

## Conditional Statements

### The `if` Statement

The `if` statement in Go allows us to execute a block of code if a given condition evaluates to true. Here's the basic syntax:

```go
package main

import "fmt"

func main() {
    age := 25

    if age >= 18 {
        fmt.Println("You are an adult.")
    } else {
        fmt.Println("You are a minor.")
    }
}
```

### The `else` Statement

We can use the `else` statement to execute a different block of code when the condition in the `if` statement is false:

```go
package main

import "fmt"

func main() {
    num := 15

    if num%2 == 0 {
        fmt.Println("The number is even.")
    } else {
        fmt.Println("The number is odd.")
    }
}
```

### The `switch` Statement

The `switch` statement provides an efficient way to compare a single value against multiple possible values. Each case represents a possible value, and the first matching case will be executed.

```go
package main

import "fmt"

func main() {
    day := "Monday"

    switch day {
    case "Monday":
        fmt.Println("It's the start of the week.")
    case "Friday", "Saturday", "Sunday":
        fmt.Println("It's the weekend.")
    default:
        fmt.Println("It's a regular weekday.")
    }
}
```

## Loops

### The `for` Loop

The `for` loop is used to repeat a block of code until a certain condition is met. Here's the basic syntax of a `for` loop:

```go
package main

import "fmt"

func main() {
    // Print numbers from 1 to 5
    for i := 1; i <= 5; i++ {
        fmt.Println(i)
    }
}
```

### The `range` Loop

The `range` keyword is used to iterate over elements in an array, slice, map, string, or channel.

```go
package main

import "fmt"

func main() {
    // Iterate over elements in a slice
    fruits := []string{"apple", "banana", "orange"}
    for index, fruit := range fruits {
        fmt.Printf("Index: %d, Fruit: %s\n", index, fruit)
    }
}
```

## Control Flow with `defer`

The `defer` statement is used to schedule a function call to be executed later, usually when the surrounding function returns. It's commonly used for cleanup tasks or actions that need to be deferred until the end of a function's execution.

```go
package main

import "fmt"

func main() {
    defer fmt.Println("This will be printed last.")
    fmt.Println("This will be printed first.")
}
```

### Conclusion

In this chapter, we explored control flow in Go, which allows us to alter the flow of program execution based on conditions. We covered conditional statements (`if`, `else`, `switch`), different types of loops (`for`, `range`), and how to control the execution flow with `defer`.

In the next chapter, we'll dive deeper into functions and packages in Go, which are essential building blocks for structuring and organizing code. Let's continue our journey to master Golang!