# Chapter 11: File Handling and I/O

In this chapter, we'll explore file handling and input/output (I/O) operations in Go. We'll learn how to read and write files, work with the `io/ioutil` package for convenient file operations, and parse data from files.

## Reading and Writing Files

Go provides various ways to read and write files. We can use the `os` package to open, read, and write files directly.

Here's an example of reading and writing files using the `os` package:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // Writing data to a file
    file, err := os.Create("data.txt")
    if err != nil {
        fmt.Println("Error creating file:", err)
        return
    }
    defer file.Close()

    data := "Hello, World!"
    _, err = file.WriteString(data)
    if err != nil {
        fmt.Println("Error writing to file:", err)
        return
    }

    // Reading data from a file
    file, err = os.Open("data.txt")
    if err != nil {
        fmt.Println("Error opening file:", err)
        return
    }
    defer file.Close()

    buffer := make([]byte, 1024)
    bytesRead, err := file.Read(buffer)
    if err != nil {
        fmt.Println("Error reading from file:", err)
        return
    }

    fmt.Println("Read:", string(buffer[:bytesRead])) // Output: Read: Hello, World!
}
```

## Working with the io/ioutil Package

Go also provides a higher-level `io/ioutil` package that simplifies file operations. This package makes it easier to read and write files without explicitly managing file opening and closing.

Let's see an example of using `ioutil` to read and write files:

```go
package main

import (
    "fmt"
    "io/ioutil"
)

func main() {
    // Writing data to a file
    data := "Hello, World!"
    err := ioutil.WriteFile("data.txt", []byte(data), 0644)
    if err != nil {
        fmt.Println("Error writing to file:", err)
        return
    }

    // Reading data from a file
    content, err := ioutil.ReadFile("data.txt")
    if err != nil {
        fmt.Println("Error reading from file:", err)
        return
    }

    fmt.Println("Read:", string(content)) // Output: Read: Hello, World!
}
```

## Parsing Data from Files

Often, files contain structured data that we need to parse and process. Go provides various packages and libraries to parse different types of data, such as JSON, XML, CSV, etc.

Here's a simple example of parsing data from a JSON file:

```go
package main

import (
    "fmt"
    "encoding/json"
    "io/ioutil"
)

// Struct to hold data from JSON
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    // Reading JSON data from a file
    content, err := ioutil.ReadFile("data.json")
    if err != nil {
        fmt.Println("Error reading from file:", err)
        return
    }

    // Parsing JSON data into a struct
    var person Person
    err = json.Unmarshal(content, &person)
    if err != nil {
        fmt.Println("Error parsing JSON:", err)
        return
    }

    fmt.Printf("Name: %s, Age: %d\n", person.Name, person.Age) // Output: Name: John Doe, Age: 30
}
```

### Conclusion

In this chapter, we explored file handling and input/output (I/O) operations in Go. We learned how to read and write files using both the `os` package and the higher-level `io/ioutil` package. Additionally, we saw how to parse structured data from files, in this case, using JSON as an example.

With file handling and I/O capabilities in Go, we can efficiently work with files and perform various tasks, such as reading configuration files, processing data, and managing persistent data.

In the next chapter, we'll dive into networking in Go, understanding how to create client-server applications and work with web services. Let's continue our journey to master Golang!

---