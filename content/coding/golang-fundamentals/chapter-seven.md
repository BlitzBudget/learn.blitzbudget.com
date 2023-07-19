# Chapter 7: Maps and Hash Tables

In this chapter, we'll explore maps and hash tables in Go. Maps provide a powerful way to store key-value pairs, allowing efficient data retrieval based on unique keys.

## Creating and Using Maps

A map in Go is a collection of key-value pairs, where each key is unique. To create a map, use the following syntax:

```go
package main

import "fmt"

func main() {
    // Creating and initializing a map of string keys and int values
    scores := map[string]int{
        "John":  90,
        "Alice": 85,
        "Bob":   78,
    }

    // Accessing elements in the map
    fmt.Println("John's score:", scores["John"]) // Output: John's score: 90

    // Modifying values in the map
    scores["Alice"] = 92
    fmt.Println("Updated Alice's score:", scores["Alice"]) // Output: Updated Alice's score: 92

    // Adding new key-value pairs to the map
    scores["Eve"] = 88
    fmt.Println("Eve's score:", scores["Eve"]) // Output: Eve's score: 88

    // Deleting a key-value pair from the map
    delete(scores, "Bob")
    fmt.Println("Bob's score:", scores["Bob"]) // Output: Bob's score: 0 (value for non-existent key is the zero value of the value type)
}
```

## Hash Tables and Key-Value Pairs

Internally, maps in Go are implemented as hash tables. A hash table is a data structure that uses a hash function to map keys to specific locations (buckets) in the underlying array. This allows fast access to the associated values using the keys.

The hash function ensures that keys are uniformly distributed across the buckets, minimizing collisions where multiple keys map to the same bucket.

## Advanced Map Operations

Maps in Go provide several advanced operations to check for the existence of a key and safely retrieve values:

```go
package main

import "fmt"

func main() {
    scores := map[string]int{
        "John":  90,
        "Alice": 85,
        "Bob":   78,
    }

    // Checking if a key exists in the map
    _, found := scores["Eve"]
    if found {
        fmt.Println("Eve's score:", scores["Eve"])
    } else {
        fmt.Println("Eve's score not found.")
    }

    // Safely retrieving a value and handling non-existent keys
    if score, exists := scores["Alice"]; exists {
        fmt.Println("Alice's score:", score)
    } else {
        fmt.Println("Alice's score not found.")
    }
}
```

### Conclusion

In this chapter, we explored maps and hash tables in Go. Maps provide an efficient way to store key-value pairs, and they are widely used in various applications for data retrieval and storage. We learned how to create and use maps, as well as perform advanced operations such as checking for key existence and safely retrieving values.

In the next chapter, we'll dive into functions as first-class citizens, exploring their advanced features and use cases. Let's continue our journey to master Golang!

---