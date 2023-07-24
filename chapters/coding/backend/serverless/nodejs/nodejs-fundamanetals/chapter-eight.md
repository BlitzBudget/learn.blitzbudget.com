# Chapter 8: File System and Streams in Node.js

Node.js provides powerful modules for working with the file system and streams, enabling efficient handling of files and data streams. In this chapter, we'll explore the built-in File System module (`fs`) and Streams API in Node.js. We'll learn how to read and write files, work with directories, and leverage streams for processing large amounts of data. Understanding these features is essential for building scalable and performant applications that deal with file-based operations and data processing.

## Table of Contents
1. Introduction to File System in Node.js
2. Reading Files with fs.readFile()
3. Writing Files with fs.writeFile()
4. Asynchronous vs. Synchronous File Operations
5. Working with Directories
6. File System Events with fs.watch()

## 1. Introduction to File System in Node.js

The File System module in Node.js (`fs`) provides an API for interacting with the file system. It allows you to perform various file-related operations, such as reading, writing, deleting, and renaming files, as well as working with directories.

To use the `fs` module, you need to require it at the beginning of your script:

```javascript
const fs = require('fs');
```

## 2. Reading Files with fs.readFile()

The `fs.readFile()` method allows you to read the contents of a file asynchronously. It takes the file path and an optional encoding as arguments and returns the file content in the form of a buffer or a decoded string.

```javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    console.log('File content:', data);
  }
});
```

## 3. Writing Files with fs.writeFile()

The `fs.writeFile()` method allows you to write data to a file asynchronously. If the file already exists, it will be replaced with the new content. If the file does not exist, a new file will be created.

```javascript
const fs = require('fs');

const content = 'Hello, this is a sample content.';

fs.writeFile('file.txt', content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
  } else {
    console.log('File has been written successfully.');
  }
});
```

## 4. Asynchronous vs. Synchronous File Operations

Node.js provides both asynchronous (`fs.readFile()`, `fs.writeFile()`) and synchronous (`fs.readFileSync()`, `fs.writeFileSync()`) file operation methods.

It's generally recommended to use the asynchronous methods as they don't block the execution of other tasks and are more suitable for applications with multiple concurrent operations.

However, in some cases, synchronous methods might be useful, such as during application startup or when you need to read a configuration file before proceeding further.

## 5. Working with Directories

The `fs` module also allows you to interact with directories, such as creating or removing them.

### Creating a Directory:

```javascript
const fs = require('fs');

fs.mkdir('new-directory', (err) => {
  if (err) {
    console.error('Error creating directory:', err);
  } else {
    console.log('Directory created successfully.');
  }
});
```

### Removing a Directory:

```javascript
const fs = require('fs');

fs.rmdir('directory-to-remove', (err) => {
  if (err) {
    console.error('Error removing directory:', err);
  } else {
    console.log('Directory removed successfully.');
  }
});
```

## 6. File System Events with fs.watch()

The `fs.watch()` method allows you to monitor changes in files or directories. It returns an object that emits events when changes occur.

```javascript
const fs = require('fs');

const watcher = fs.watch('file.txt', (eventType, filename) => {
  console.log(`Event type: ${eventType}`);
  console.log(`File name: ${filename}`);
});

// To stop watching, call the close() method on the watcher object.
// watcher.close();
```

The `eventType` can be `'rename'` or `'change'`. The `'rename'` event is emitted when a file is renamed or removed, while the `'change'` event is emitted when the file

's content changes.

## Conclusion

In this chapter, we explored the File System module (`fs`) and Streams API in Node.js. We learned how to read and write files, work with directories, and utilize streams for efficient data processing. Understanding these features is crucial for building robust and scalable applications that deal with file-based operations and data manipulation.

In the next chapters, we'll dive deeper into the world of Node.js streams and explore various use cases and best practices for handling data streams effectively. Additionally, we'll build practical examples to solidify our understanding of these concepts.