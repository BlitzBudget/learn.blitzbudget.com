# Chapter 5: Pointers and Structs

In this chapter, we'll explore pointers and structs in Go. Pointers allow us to work with memory addresses directly, while structs provide a way to create custom data types with multiple fields. Additionally, we'll learn how to work with methods on structs and how to build custom data structures using them.

## Understanding Pointers

A pointer is a variable that holds the memory address of another variable. It enables us to indirectly access and modify the value of that variable. In Go, we use the `*` symbol to declare and work with pointers.

Let's take a look at an example to understand pointers better:

```go
package main

import "fmt"

func main() {
    num := 10
    ptr := &num // Declaring a pointer to the memory address of 'num'

    fmt.Println("Value of num:", num)   // Output: Value of num: 10
    fmt.Println("Memory address of num:", ptr) // Output: Memory address of num: 0xc0000140c8

    // Dereferencing the pointer to access the value it points to
    fmt.Println("Value pointed by ptr:", *ptr) // Output: Value pointed by ptr: 10

    // Modifying the value of 'num' indirectly through the pointer
    *ptr = 20
    fmt.Println("New value of num:", num) // Output: New value of num: 20
}
```

## Working with Structs and Methods

Structs in Go are user-defined data types that allow us to group together variables of different types. They provide a convenient way to create custom data structures.

Here's an example of defining a struct and working with its instances:

```go
package main

import "fmt"

// Defining a struct named 'Person'
type Person struct {
    Name    string
    Age     int
    Address string
}

func main() {
    // Creating an instance of 'Person' struct
    person := Person{
        Name:    "John Doe",
        Age:     30,
        Address: "123 Main Street",
    }

    // Accessing struct fields
    fmt.Println("Name:", person.Name)          // Output: Name: John Doe
    fmt.Println("Age:", person.Age)            // Output: Age: 30
    fmt.Println("Address:", person.Address)    // Output: Address: 123 Main Street

    // Modifying struct fields
    person.Age = 31
    person.Address = "456 Broad Avenue"
    fmt.Println("Updated Age:", person.Age)    // Output: Updated Age: 31
    fmt.Println("Updated Address:", person.Address) // Output: Updated Address: 456 Broad Avenue
}
```

## Building Custom Data Structures

With structs, we can build custom data structures that suit our application's specific needs. Let's create a simple example of a Point data structure to represent coordinates:

```go
package main

import "fmt"

// Point is a custom data structure to represent 2D coordinates
type Point struct {
    X, Y float64
}

func main() {
    // Creating a Point instance
    p := Point{X: 2.5, Y: 1.7}

    // Accessing the fields of the Point
    fmt.Println("X coordinate:", p.X) // Output: X coordinate: 2.5
    fmt.Println("Y coordinate:", p.Y) // Output: Y coordinate: 1.7
}
```

### Conclusion

In this chapter, we explored pointers and structs in Go. Pointers allow us to work with memory addresses directly, while structs provide a way to create custom data types with multiple fields. We also learned how to work with methods on structs and build custom data structures using them.

In the next chapter, we'll dive deeper into arrays and slices in Go, essential for managing collections of data. Let's continue our journey to master Golang!

---