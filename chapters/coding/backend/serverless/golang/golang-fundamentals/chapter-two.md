# Chapter 2: Getting Started with Go

In this chapter, we'll dive deeper into Go programming by covering the essentials of writing Go code. We'll start with the classic "Hello World" program and then explore variables, data types, constants, and basic operators in Go.

## Hello World Program in Go

Let's begin with the traditional "Hello World" program in Go:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Save the above code in a file named `hello.go`. Open a terminal, navigate to the directory containing the file, and run the following command to compile and execute the program:

```bash
go run hello.go
```

You should see the output `Hello, World!` displayed in the terminal.

## Variables and Data Types

In Go, variables are used to store values of different data types. Go is statically typed, meaning variable types are known at compile time.

### Declaring Variables

To declare a variable in Go, you use the `var` keyword followed by the variable name and its type:

```go
package main

import "fmt"

func main() {
    var age int // Declaration of an integer variable named "age"
    age = 30    // Assignment of a value to the "age" variable
    fmt.Println("Age:", age)
}
```

### Data Types

Go has several built-in data types, including:

- `int`: Signed integers (e.g., `int8`, `int16`, `int32`, `int64`)
- `uint`: Unsigned integers (e.g., `uint8`, `uint16`, `uint32`, `uint64`)
- `float32` and `float64`: Floating-point numbers
- `bool`: Boolean (`true` or `false`)
- `string`: Sequence of characters

### Constants and Basic Operators

Constants are variables with fixed values that cannot be changed during the program's execution. You can use the `const` keyword to declare constants in Go:

```go
package main

import "fmt"

func main() {
    const pi = 3.14159
    fmt.Println("Value of pi:", pi)
}
```

Go supports various basic operators, such as arithmetic operators (`+`, `-`, `*`, `/`, `%`), comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`), and logical operators (`&&`, `||`, `!`).

```go
package main

import "fmt"

func main() {
    x := 10
    y := 5

    fmt.Println("Sum:", x+y)       // Addition
    fmt.Println("Difference:", x-y) // Subtraction
    fmt.Println("Product:", x*y)    // Multiplication
    fmt.Println("Quotient:", x/y)   // Division
    fmt.Println("Remainder:", x%y)  // Modulus

    fmt.Println("Is x greater than y?", x > y)          // Greater than
    fmt.Println("Is x not equal to y?", x != y)         // Not equal
    fmt.Println("Is x AND y both true?", x > 0 && y > 0) // Logical AND
    fmt.Println("Is x OR y true?", x > 0 || y > 0)       // Logical OR
}
```

### Conclusion

In this chapter, we got started with Go programming by writing our first "Hello World" program. We learned about variables, data types, constants, and basic operators in Go. These fundamental concepts form the building blocks for more complex Go applications.

In the next chapter, we'll explore control flow in Go, including conditional statements and loops. Let's continue our journey to master Golang!