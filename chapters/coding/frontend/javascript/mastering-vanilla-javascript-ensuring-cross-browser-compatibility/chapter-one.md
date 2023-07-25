# Chapter 1: Introduction to Vanilla JavaScript

JavaScript is a powerful and versatile programming language that forms the backbone of modern web development. Vanilla JavaScript refers to the pure, standard version of the language without relying on any additional libraries or frameworks. In this chapter, we will explore the fundamentals of Vanilla JavaScript and its significance in building dynamic and interactive web applications.

## Understanding JavaScript: The Language of the Web

JavaScript was created by Brendan Eich in 1995 while he was working at Netscape Communications. Initially, it was designed to add interactivity to static HTML pages, enabling web developers to create dynamic content that responds to user actions. Over time, JavaScript has evolved into a full-fledged programming language, capable of building complex applications for both front-end and back-end development.

### The Role of JavaScript in Web Development

JavaScript plays a crucial role in web development by allowing developers to create interactive user interfaces, handle data manipulation, and communicate with servers. With the rise of Single Page Applications (SPAs) and Progressive Web Apps (PWAs), JavaScript has become even more critical in delivering a seamless and engaging user experience.

### Advantages of Using Vanilla JavaScript

While there are various libraries and frameworks available to simplify JavaScript development, using Vanilla JavaScript offers several advantages:

1. **Lightweight:** Vanilla JavaScript is lightweight since it does not require additional libraries or frameworks, resulting in faster loading times for web pages.

2. **Flexibility:** Without being tied to any specific library or framework, developers have the freedom to build applications according to their specific requirements and preferences.

3. **Performance:** Using Vanilla JavaScript allows developers to fine-tune code performance and optimize it for better execution.

4. **Learning Fundamentals:** Mastering Vanilla JavaScript helps developers understand the core concepts and principles of the language, making it easier to learn and adapt to new frameworks in the future.

5. **No External Dependencies:** By relying solely on Vanilla JavaScript, projects can avoid potential issues related to library versioning and external dependencies.

### Setting Up a Development Environment

Before we dive into writing JavaScript code, let's set up a basic development environment. You only need a text editor, a web browser, and a local server to get started.

1. **Text Editor:** Choose a text editor that suits your preferences. Popular choices include Visual Studio Code, Sublime Text, Atom, or Notepad++.

2. **Web Browser:** Use the latest version of Google Chrome, Mozilla Firefox, Microsoft Edge, or any modern browser of your choice.

3. **Local Server:** To avoid issues related to cross-origin requests, it's best to run your JavaScript code on a local server. You can use tools like Live Server (a Visual Studio Code extension), Python's SimpleHTTPServer, or Node.js's http-server to set up a local server quickly.

Once your development environment is ready, you can start writing and executing JavaScript code.

## Writing Your First JavaScript Code

Let's begin with a simple example to understand the basic syntax of JavaScript. We'll create an HTML file, add a script tag, and write a "Hello, World!" program.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Vanilla JavaScript</title>
</head>
<body>
    <h1>Hello, World!</h1>

    <script>
        // JavaScript code goes here
        alert("Hello, World!");
    </script>
</body>
</html>
```

In this example, we have an HTML document with a single `h1` heading element and a script tag containing our JavaScript code. The `alert()` function displays an alert dialog with the message "Hello, World!" when the page loads.

## JavaScript Variables and Data Types

JavaScript is a dynamically typed language, meaning you don't need to specify a variable's data type explicitly. Variables in JavaScript can hold various data types, including strings, numbers, booleans, objects, arrays, and functions.

### Declaring Variables

You can declare variables using the `var`, `let`, or `const` keywords:

- `var`: The old way of declaring variables in JavaScript. It has function-level scope.
- `let`: Introduced in ES6, it has block-level scope, making it safer and more predictable.
- `const`: Also introduced in ES6, it declares a constant variable that cannot be reassigned.

```javascript
// Using var
var name = "John";

// Using let
let age = 30;

// Using const
const PI = 3.14;
```

### Data Types in JavaScript

JavaScript has several data types:

1. **Primitive Data Types:** These are immutable data types that represent single values.

- `String`: A sequence of characters, such as "Hello, World!"
- `Number`: Represents numeric values, including integers and floating-point numbers.
- `Boolean`: Represents a true or false value.

2. **Composite Data Types:** These are mutable data types that can hold multiple values.

- `Array`: An ordered collection of values, enclosed in square brackets `[ ]`.
- `Object`: A collection of key-value pairs, enclosed in curly braces `{ }`.

3. **Special Data Types:**

- `undefined`: Represents an uninitialized or absent value.
- `null`: Represents the intentional absence of any object value.

Let's explore some examples of these data types:

```javascript
// Primitive Data Types
let message = "Hello, World!";
let age = 30;
let isStudent = true;

// Composite Data Types
let colors = ["red", "green", "blue"];
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  isStudent: true
};

// Special Data Types
let uninitializedVar;
let nullValue = null;
```

## JavaScript Operators

Operators are symbols that perform operations on variables and values. JavaScript has various types of operators, including arithmetic, assignment, comparison, logical, and more.

### Arithmetic Operators

Arithmetic operators perform mathematical calculations:

- `+`: Addition
- `-`: Subtraction
- `*`: Multiplication
- `/`: Division
- `%`: Modulus (remainder of division)

```javascript
let x = 10;
let y = 5;

let additionResult = x + y; // 15
let subtractionResult = x - y; // 5
let multiplicationResult = x * y; // 50
let divisionResult = x / y; // 2
let modulusResult = x % y; // 0
```

### Assignment Operators

Assignment operators assign values to variables:

- `=`: Assigns a value to a variable.
- `+=`: Adds and assigns the value.
- `-=`: Subtracts and assigns the value.
- `*=`: Multiplies and assigns the value.
- `/=`: Divides and assigns the value.
- `%=`: Modulus and assigns the value.

```javascript
let a = 10;

a += 5; // a is now 15
a -= 3; // a is now 12
a *= 2; // a is now 24
a /= 4; // a is now 6
a %= 3; // a is now 0
```

### Comparison Operators

Comparison operators compare two values and return a Boolean value (`true` or `false`):

- `==`: Equal to
- `!=`: Not equal to
- `>`: Greater than
- `<`: Less than
- `>=`: Greater

 than or equal to
- `<=`: Less than or equal to

```javascript
let x = 10;
let y = 5;

let isEqual = x == y; // false
let isNotEqual = x != y; // true
let isGreater = x > y; // true
let isLess = x < y; // false
let isGreaterOrEqual = x >= y; // true
let isLessOrEqual = x <= y; // false
```

### Logical Operators

Logical operators perform logical operations and return a Boolean value:

- `&&`: Logical AND
- `||`: Logical OR
- `!`: Logical NOT

```javascript
let age = 30;
let isStudent = true;

let isAdultAndStudent = age >= 18 && isStudent; // true
let isAdultOrStudent = age >= 18 || isStudent; // true
let isNotStudent = !isStudent; // false
```

### Conditional (Ternary) Operator

The conditional operator is a shorthand way of writing an `if-else` statement:

```javascript
let isAdult = age >= 18 ? "Adult" : "Minor";
```

In this example, if `age` is greater than or equal to 18, the value of `isAdult` will be "Adult"; otherwise, it will be "Minor".

## Control Flow: Conditional Statements

Conditional statements allow you to control the flow of your code based on certain conditions. The most common conditional statements in JavaScript are `if`, `else if`, and `else`.

### The `if` Statement

The `if` statement executes a block of code if the specified condition is true:

```javascript
let age = 25;

if (age >= 18) {
    console.log("You are an adult.");
}
```

In this example, if `age` is greater than or equal to 18, the message "You are an adult." will be logged to the console.

### The `else` Statement

The `else` statement provides an alternative block of code to execute when the `if` condition is false:

```javascript
let hour = 14;

if (hour < 12) {
    console.log("Good morning!");
} else {
    console.log("Good afternoon!");
}
```

In this example, if `hour` is less than 12, the message "Good morning!" will be logged to the console; otherwise, "Good afternoon!" will be logged.

### The `else if` Statement

The `else if` statement allows you to specify multiple conditions to check:

```javascript
let score = 80;

if (score >= 90) {
    console.log("Excellent!");
} else if (score >= 70) {
    console.log("Good job!");
} else {
    console.log("Keep going!");
}
```

In this example, if `score` is 90 or greater, the message "Excellent!" will be logged. If `score` is between 70 and 89 (inclusive), "Good job!" will be logged. Otherwise, "Keep going!" will be logged.

### Nested Conditional Statements

You can also nest conditional statements inside each other for more complex logic:

```javascript
let num = 15;

if (num % 2 === 0) {
    console.log("Even number.");
} else {
    if (num > 0) {
        console.log("Positive odd number.");
    } else {
        console.log("Negative odd number.");
    }
}
```

In this example, if `num` is even, "Even number." will be logged. Otherwise, if `num` is positive, "Positive odd number." will be logged; otherwise, "Negative odd number." will be logged.

### The Switch Statement

The `switch` statement provides an alternative way to handle multiple conditions:

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the week.");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek days.");
        break;
    case "Friday":
        console.log("End of the week.");
        break;
    default:
        console.log("Weekend day.");
}
```

In this example, the `switch` statement checks the value of `day` and executes the corresponding code block. The `break` keyword is used to exit the `switch` statement once a condition is met. If none of the conditions match, the `default` block will be executed.

## Loops: Repeating Code Blocks

Loops allow you to execute a block of code multiple times. The most commonly used loops in JavaScript are `for`, `while`, and `do-while` loops.

### The `for` Loop

The `for` loop is used to execute a block of code a specified number of times:

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

In this example, the `for` loop will execute five times, and the values of `i` will be printed to the console.

### The `while` Loop

The `while` loop continues to execute a block of code as long as the specified condition is true:

```javascript
let count = 1;

while (count <= 5) {


    console.log(count);
    count++;
}
```

In this example, the `while` loop will execute five times, printing the values of `count` to the console.

### The `do-while` Loop

The `do-while` loop is similar to the `while` loop, but it guarantees that the code block will execute at least once before checking the condition:

```javascript
let num = 1;

do {
    console.log(num);
    num++;
} while (num <= 5);
```

In this example, the `do-while` loop will execute five times, printing the values of `num` to the console.

### Loop Control: `break` and `continue`

JavaScript provides two loop control statements: `break` and `continue`.

- The `break` statement allows you to exit a loop prematurely:
```javascript
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break; // Exit the loop when i is 5
    }
    console.log(i);
}
```

- The `continue` statement allows you to skip the current iteration and move to the next one:
```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue; // Skip iteration when i is 3
    }
    console.log(i);
}
```

## Functions: Reusable Blocks of Code

Functions are reusable blocks of code that perform a specific task. They allow you to break down complex logic into smaller, manageable parts.

### Declaring a Function

You can declare a function using the `function` keyword:

```javascript
function greet() {
    console.log("Hello!");
}
```

In this example, we've declared a function called `greet` that logs "Hello!" to the console.

### Calling a Function

To execute the code inside a function, you need to call it:

```javascript
greet(); // Output: Hello!
```

By calling the `greet` function, we invoke the code inside it, resulting in the output "Hello!" to the console.

### Parameters and Arguments

Functions can take input values called parameters:

```javascript
function greetUser(name) {
    console.log("Hello, " + name + "!");
}
```

In this example, the `greetUser` function has a `name` parameter that allows us to customize the greeting based on the input.

When calling a function with parameters, you provide values called arguments:

```javascript
greetUser("John"); // Output: Hello, John!
greetUser("Alice"); // Output: Hello, Alice!
```

### Return Statement

Functions can also return values using the `return` statement:

```javascript
function add(a, b) {
    return a + b;
}
```

In this example, the `add` function takes two arguments, `a` and `b`, and returns their sum.

```javascript
let result = add(5, 3);
console.log(result); // Output: 8
```

### Function Expressions

Functions can also be assigned to variables, known as function expressions:

```javascript
let sayHello = function() {
    console.log("Hello!");
};

sayHello(); // Output: Hello!
```

In this example, we've assigned an anonymous function to the variable `sayHello`, and then we call the function using the variable name.

### Arrow Functions

ES6 introduced arrow functions, providing a concise syntax for writing functions:

```javascript
let multiply = (a, b) => a * b;
```

In this example, the `multiply` function uses the arrow function syntax to calculate the product of two values.

```javascript
let result = multiply(4, 5);
console.log(result); // Output: 20
```

Arrow functions are particularly useful for writing shorter and more readable code, especially when dealing with functions that have concise expressions.

## Handling Events with Vanilla JavaScript

Event handling is a fundamental aspect of interactive web applications. With Vanilla JavaScript, you can easily add event listeners to HTML elements and respond to user actions, such as clicks, keypresses, mouse movements, and more.

### Adding Event Listeners

You can add event listeners to HTML elements using the `addEventListener` method:

```html
<button id="btnClick">Click Me!</button>

<script>
    let button = document.getElementById("btnClick");
    
    button.addEventListener("click", function() {
        alert("Button clicked!");
    });
</script>
```

In this example, we've added a click event listener to a button element with the id "btnClick". When the button is clicked, the anonymous function will be executed, displaying an alert with the message "Button clicked!".

### Event Object

When an event occurs, an event object is automatically created, containing information about the event and its target element. You can access the event object as a parameter in the event listener function:

```html
<button id="btnClick">

Click Me!</button>

<script>
    let button = document.getElementById("btnClick");
    
    button.addEventListener("click", function(event) {
        alert("Button clicked!");
        console.log(event);
    });
</script>
```

In this example, we've modified the click event listener to log the event object to the console. You can inspect the event object to access properties like `target` (the element that triggered the event) and `type` (the type of event).

### Event Propagation: Bubbling and Capturing

JavaScript events follow a process called "event propagation," which includes two phases: capturing and bubbling.

- **Capturing Phase:** The event starts from the outermost parent element and moves towards the target element.
- **Bubbling Phase:** The event moves from the target element back up to the outermost parent element.

By default, event listeners are added in the bubbling phase. However, you can specify the capturing phase by setting the third parameter of `addEventListener` to `true`:

```html
<div id="outer">
    <div id="inner">
        Click Me!
    </div>
</div>

<script>
    let outer = document.getElementById("outer");
    let inner = document.getElementById("inner");
    
    outer.addEventListener("click", function() {
        console.log("Outer div clicked!");
    }, true);
    
    inner.addEventListener("click", function() {
        console.log("Inner div clicked!");
    }, true);
</script>
```

In this example, when you click the "Click Me!" text, the events will be captured first by the outer `div` (capturing phase) and then by the inner `div` (capturing phase). The output in the console will be:

```
Outer div clicked!
Inner div clicked!
```

### Removing Event Listeners

To remove an event listener, you can use the `removeEventListener` method:

```html
<button id="btnClick">Click Me!</button>

<script>
    let button = document.getElementById("btnClick");
    
    function handleClick() {
        alert("Button clicked!");
    }
    
    button.addEventListener("click", handleClick);
    
    // Later in the code, if you want to remove the event listener
    button.removeEventListener("click", handleClick);
</script>
```

In this example, we've assigned the event listener function to a variable `handleClick`, and then we use `removeEventListener` to remove it when needed.

### Event Delegation

Event delegation is a technique where you attach a single event listener to a parent element to handle events for multiple child elements. This is especially useful when you have dynamically added elements or a large number of elements.

```html
<ul id="taskList">
    <li>Task 1</li>
    <li>Task 2</li>
    <li>Task 3</li>
    <!-- More list items -->
</ul>

<script>
    let taskList = document.getElementById("taskList");
    
    taskList.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            alert("Task: " + event.target.textContent);
        }
    });
</script>
```

In this example, we've added a click event listener to the `taskList` (the parent `ul` element). When you click on any of the list items, the event will bubble up to the `taskList`, and the event listener will check if the target element's tag name is "LI". If it is, an alert will display the task text.

This approach is more efficient than adding separate event listeners to each list item and is particularly useful when the list items are added dynamically.

## Working with the Document Object Model (DOM)

The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of an HTML document as a tree of objects, allowing JavaScript to access and manipulate the content and styles of the web page dynamically.

### DOM Tree Structure

The DOM tree is structured with different types of nodes:

1. **Document Node:** The top-level node representing the entire HTML document.

2. **Element Nodes:** Represent HTML elements, such as `div`, `p`, `ul`, and others.

3. **Attribute Nodes:** Represent attributes of an element.

4. **Text Nodes:** Represent the text content within an element.

5. **Comment Nodes:** Represent comments within the HTML document.

### Accessing DOM Elements

You can access DOM elements using various methods provided by JavaScript. The most common methods are `getElementById`, `getElementsByClassName`, `getElementsByTagName`, and `querySelector`.

```html
<div id="myDiv" class="container">
    <p>Hello, World!</p>
</div>

<script>
    // Using getElementById
    let elementById = document.getElementById("myDiv");

    // Using getElementsByClassName
    let elementsByClassName = document.getElementsByClassName("container");

    // Using getElementsByTagName
    let elementsByTagName = document.getElementsByTagName("p");

    // Using querySelector
    let elementByQuerySelector = document.querySelector("#myDiv");
</script>
```

In this example, we've used different methods to access the `div` element with the id "myDiv", the elements with the class "container", the `p` element, and the `div` element with the id "myDiv" using the `querySelector` method.

### Modifying DOM Elements

Once you've accessed a DOM element, you can modify its content, attributes, and styles.

```html
<div id="

myDiv">
    <p>Hello, World!</p>
</div>

<script>
    let element = document.getElementById("myDiv");

    // Modifying text content
    element.textContent = "Hello, JavaScript!";

    // Modifying HTML content
    element.innerHTML = "<h1>Hello, DOM!</h1>";

    // Modifying attributes
    element.setAttribute("class", "container");

    // Modifying styles
    element.style.backgroundColor = "blue";
    element.style.color = "white";
</script>
```

In this example, we've modified the text content of the `div` element, changed its HTML content, updated the class attribute, and applied some CSS styles to the element.

### Creating New DOM Elements

You can create new DOM elements dynamically using the `createElement` method and append them to the document using `appendChild`.

```html
<div id="myDiv"></div>

<script>
    let parentElement = document.getElementById("myDiv");
    let newElement = document.createElement("p");
    newElement.textContent = "Dynamic Element";
    parentElement.appendChild(newElement);
</script>
```

In this example, we've created a new `p` element, added text content to it, and then appended it as a child of the `div` with the id "myDiv".

### Removing DOM Elements

To remove a DOM element, you can use the `removeChild` method.

```html
<div id="myDiv">
    <p>Hello, World!</p>
</div>

<script>
    let parentElement = document.getElementById("myDiv");
    let childElement = document.querySelector("p");
    parentElement.removeChild(childElement);
</script>
```

In this example, we've removed the `p` element from the `div` with the id "myDiv".

## Handling Forms with Vanilla JavaScript

Forms are a fundamental part of web development, allowing users to input data and interact with web applications. With Vanilla JavaScript, you can work with form elements, validate user input, and handle form submissions.

### Accessing Form Elements

You can access form elements using JavaScript to read user input and perform validations.

```html
<form id="myForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>

<script>
    let form = document.getElementById("myForm");
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
</script>
```

In this example, we've accessed the form element and input elements with their respective ids.

### Form Validation

Form validation is essential to ensure that users provide correct and valid data. You can perform basic validation using JavaScript and prevent the form from being submitted until the input is valid.

```html
<form id="myForm">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Submit</button>
</form>

<script>
    let form = document.getElementById("myForm");
    let emailInput = document.getElementById("email");
    
    form.addEventListener("submit", function(event) {
        if (!emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            event.preventDefault(); // Prevent form submission
        }
    });
</script>
```

In this example, we've added a `required` attribute to the email input, indicating that it must be filled out. Additionally, we've added a submit event listener to the form. When the form is submitted, it checks if the email input is valid using the `checkValidity()` method. If it's not valid, an alert is displayed, and the form submission is prevented using `event.preventDefault()`.

### Submitting Form Data

When a form is submitted, you can access the form data and perform further actions, such as sending the data to a server.

```html
<form id="myForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>

<script>
    let form = document.getElementById("myForm");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        
        let formData = new FormData(form);
        let data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log(data); // Output: Object with form data
    });
</script>
```

In this example, we've added a submit event listener to the form. When the form is submitted, we prevent the default form submission using `event.preventDefault()`. We then create a `FormData` object to access the form data and convert it into a JavaScript object.

### Resetting the Form

You can reset a form to its

 initial state using the `reset()` method.

```html
<form id="myForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
    <button type="button" onclick="resetForm()">Reset</button>
</form>

<script>
    function resetForm() {
        let form = document.getElementById("myForm");
        form.reset();
    }
</script>
```

In this example, we've added a reset button to the form and used the `resetForm()` function to reset the form when the button is clicked.

## Working with Cookies in Vanilla JavaScript

Cookies are small pieces of data stored on the user's device by the browser. They are commonly used to store information about the user or their preferences. With Vanilla JavaScript, you can create, read, and delete cookies.

### Creating Cookies

To create a cookie, you can set the `document.cookie` property:

```javascript
document.cookie = "username=John Doe; expires=Sat, 31 Jul 2023 00:00:00 UTC; path=/";
```

In this example, we're creating a cookie named "username" with the value "John Doe". We've also specified the cookie's expiration date and the path where the cookie is valid. The cookie will expire on 31st July 2023.

### Reading Cookies

To read cookies, you can access the `document.cookie` property and parse the value:

```javascript
function getCookie(name) {
    let cookieValue = document.cookie.split("; ")
        .find(cookie => cookie.startsWith(name + "="));
    return cookieValue ? cookieValue.split("=")[1] : null;
}

let username = getCookie("username");
console.log(username); // Output: "John Doe"
```

In this example, we've defined a `getCookie()` function that takes the cookie name as a parameter and returns its value. The function splits the `document.cookie` string into an array of individual cookies and then finds the one that starts with the specified name.

### Updating Cookies

To update a cookie, you can set it again with a new value or expiration date:

```javascript
document.cookie = "username=Jane Smith; expires=Sat, 31 Jul 2023 00:00:00 UTC; path=/";
```

In this example, we're updating the "username" cookie with the new value "Jane Smith" and the same expiration date.

### Deleting Cookies

To delete a cookie, you can set its expiration date to a past date:

```javascript
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

In this example, we're deleting the "username" cookie by setting its expiration date to 1st January 1970.

### Handling Cookies with Functions

To make working with cookies more convenient, you can create functions to manage them:

```javascript
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function getCookie(name) {
    let cookieValue = document.cookie.split("; ")
        .find(cookie => cookie.startsWith(name + "="));
    return cookieValue ? cookieValue.split("=")[1] : null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
```

In this example, we've defined three functions: `setCookie`, `getCookie`, and `deleteCookie`. The `setCookie` function takes the cookie name, value, and number of days until expiration as parameters. The `getCookie` function returns the value of a cookie by name, and the `deleteCookie` function deletes a cookie by name.

Using these functions, you can easily create, read, update, and delete cookies:

```javascript
setCookie("username", "John Doe", 30); // Set the "username" cookie to expire in 30 days
let username = getCookie("username"); // Get the value of the "username" cookie
deleteCookie("username"); // Delete the "username" cookie
```
