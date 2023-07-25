# Chapter 6: Manipulating HTML and CSS with Vanilla JavaScript

In this chapter, we will explore how to manipulate HTML and CSS using vanilla JavaScript. The ability to manipulate the DOM (Document Object Model) allows developers to dynamically update and modify the content and appearance of web pages. By mastering these techniques, you can create dynamic and interactive web applications that respond to user actions and provide a seamless user experience.

## Table of Contents

1. Introduction to DOM Manipulation with JavaScript
   - Understanding the DOM
   - Benefits of DOM Manipulation

2. Selecting Elements from the DOM
   - Using `getElementById()`
   - Using `querySelector()`
   - Using `querySelectorAll()`

3. Modifying HTML Content
   - Changing Element Text with `textContent`
   - Updating HTML with `innerHTML`

4. Creating and Adding Elements
   - Creating Elements with `createElement()`
   - Appending Elements with `appendChild()`
   - Inserting Elements with `insertAdjacentElement()`

5. Removing Elements from the DOM
   - Removing Elements with `removeChild()`
   - Removing Elements with `remove()`

6. Changing Element Attributes and CSS Properties
   - Modifying Attributes with `setAttribute()`
   - Changing CSS Properties with `style`

7. Adding and Removing CSS Classes
   - Adding Classes with `classList.add()`
   - Removing Classes with `classList.remove()`
   - Toggling Classes with `classList.toggle()`

8. Handling Events with DOM Manipulation
   - Registering Event Listeners
   - Event Delegation

9. Case Study: Creating an Interactive Todo List
   - Building the Todo List Structure
   - Adding and Removing Todo Items
   - Marking Todo Items as Completed
   - Filtering Todo Items

10. Best Practices for DOM Manipulation
    - Reducing DOM Manipulation
    - Caching Elements
    - Avoiding Global Variables

11. Conclusion

## 1. Introduction to DOM Manipulation with JavaScript

### Understanding the DOM

The Document Object Model (DOM) is a programming interface for HTML and XML documents, representing the structure and content of a web page as a tree-like structure of nodes. Each element, attribute, and text in the HTML document is represented as a node in the DOM tree. JavaScript can interact with the DOM to access, modify, and update these nodes dynamically.

When a web page loads, the browser parses the HTML code and creates the DOM tree, which can then be manipulated using JavaScript. DOM manipulation allows developers to change the content, structure, and style of a web page on the fly, providing a dynamic and interactive user experience.

### Benefits of DOM Manipulation

DOM manipulation is a powerful technique that brings several benefits to web development:

1. **Dynamic Content**: DOM manipulation allows developers to update the content of a web page dynamically. This is particularly useful for creating single-page applications (SPAs) that load content without requiring a full page refresh.

2. **Interactive User Interfaces**: By responding to user actions and events, developers can create interactive user interfaces that provide real-time feedback to users.

3. **Form Handling**: DOM manipulation enables developers to handle form submissions, validate user input, and update form elements based on user interactions.

4. **Animation and Transitions**: By modifying CSS properties, developers can create smooth animations and transitions to enhance the visual appeal of a web page.

5. **Data Binding**: DOM manipulation is essential for data binding, a technique used to synchronize the data model with the user interface, ensuring that changes in the data are reflected in the UI and vice versa.

In the next sections, we will explore different aspects of DOM manipulation using vanilla JavaScript.

## 2. Selecting Elements from the DOM

Before manipulating elements in the DOM, we need to select them using JavaScript. There are several methods to select elements from the DOM, each serving a different purpose.

### Using `getElementById()`

The `getElementById()` method allows us to select an element by its unique ID attribute.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <h1 id="mainHeading">Hello, World!</h1>
    <p>This is a paragraph.</p>
    <script>
      const heading = document.getElementById("mainHeading");
      console.log(heading.textContent); // Output: Hello, World!
    </script>
  </body>
</html>
```

In this example, we selected the `<h1>` element with the ID `mainHeading` using `getElementById()` and then accessed its text content using the `textContent` property.

### Using `querySelector()`

The `querySelector()` method allows us to select an element using CSS selector syntax. It returns the first element that matches the specified selector.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <h1 class="title">Hello, World!</h1>
    <p>This is a paragraph.</p>
    <script>
      const title = document.querySelector(".title");
      console.log(title.textContent); // Output: Hello, World!
    </script>
  </body>
</html>
```

In this example, we

 selected the first element with the class `title` using `querySelector()` and then accessed its text content using the `textContent` property.

### Using `querySelectorAll()`

The `querySelectorAll()` method allows us to select multiple elements that match a given selector. It returns a NodeList containing all matching elements.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <h2 class="subtitle">Subtitle 1</h2>
    <h2 class="subtitle">Subtitle 2</h2>
    <script>
      const subtitles = document.querySelectorAll(".subtitle");
      subtitles.forEach((subtitle) => {
        console.log(subtitle.textContent);
      });
      // Output:
      // Subtitle 1
      // Subtitle 2
    </script>
  </body>
</html>
```

In this example, we selected all elements with the class `subtitle` using `querySelectorAll()` and then looped through the NodeList to access the text content of each subtitle.

## 3. Modifying HTML Content

Once we have selected elements from the DOM, we can modify their HTML content.

### Changing Element Text with `textContent`

The `textContent` property allows us to change the text content of an element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <p id="myParagraph">This is a paragraph.</p>
    <script>
      const paragraph = document.getElementById("myParagraph");
      paragraph.textContent = "This is a new paragraph.";
    </script>
  </body>
</html>
```

In this example, we selected the `<p>` element with the ID `myParagraph` and then changed its text content using the `textContent` property.

### Updating HTML with `innerHTML`

The `innerHTML` property allows us to update the HTML content of an element, including both text and HTML tags.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <div id="myDiv">
      <p>This is a paragraph.</p>
    </div>
    <script>
      const div = document.getElementById("myDiv");
      div.innerHTML = "<p>This is an updated paragraph.</p>";
    </script>
  </body>
</html>
```

In this example, we selected the `<div>` element with the ID `myDiv` and then updated its HTML content using the `innerHTML` property.

## 4. Creating and Adding Elements

In addition to modifying existing elements, we can create new elements and add them to the DOM.

### Creating Elements with `createElement()`

The `createElement()` method allows us to create a new HTML element programmatically.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <div id="myDiv"></div>
    <script>
      const div = document.getElementById("myDiv");
      const paragraph = document.createElement("p");
      paragraph.textContent = "This is a new paragraph.";
      div.appendChild(paragraph);
    </script>
  </body>
</html>
```

In this example, we created a new `<p>` element using `createElement()` and set its text content. We then appended the new paragraph to the `<div>` element with the ID `myDiv` using the `appendChild()` method.

### Appending Elements with `appendChild()`

The `appendChild()` method allows us to add a newly created element as the last child of a parent element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <ul id="myList"></ul>
    <script>
      const list = document.getElementById("myList");
      for (let i = 1; i <= 5; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = "Item " + i;
        list.appendChild(listItem);
      }
    </script>
  </body>
</html>
```

In this example, we created a new `<li>` element for each item in the loop and appended it to the `<ul>` element with the ID `myList`.

### Inserting Elements with `insertAdjacentElement()`

The `insertAdjacentElement()` method allows us to insert an element at a specific position relative to another element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <p>Before</p>
    <p>After</p>
    <script>
      const before = document.querySelector("p:nth-child(1)");
      const newParagraph = document.createElement("p");
      newParagraph.textContent = "Inserted Paragraph";
      before.insertAdjacentElement("beforebegin", newParagraph);
    </script>
  </body>
</html>
```

In this example, we selected the first `<p>` element and used `insertAdjacentElement()` to insert a new paragraph before it.

## 5. Removing Elements from the DOM

In addition to adding elements, we may also need to remove elements from the DOM.

### Removing Elements with `removeChild()`

The `removeChild()` method allows us to remove a child element from its parent.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <script>
      const list = document.getElementById("myList");
      const listItemToRemove = document.querySelector("li:nth-child(2)");
      list.removeChild(listItemToRemove);
    </script>
  </body>
</html>
```

In this example, we selected the second `<li>` element and removed it from the `<ul>` element using the `removeChild()` method.

### Removing Elements with `remove()`

The `remove()` method allows us to remove an element directly, without needing to reference its parent.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <div id="myDiv">
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
      <p>Paragraph 3</p>
    </div>
    <script>
      const paragraphToRemove = document.querySelector("#myDiv p:nth-child(2)");
      paragraphToRemove.remove();
    </script>
  </body>
</html>
```

In this example, we selected the second `<p>` element inside the `<div>` with the ID `myDiv` and removed it directly using the `remove()` method.

## 6. Changing Element Attributes and CSS Properties

In addition to modifying content, we can also change attributes and CSS properties of elements.

### Modifying Attributes with `setAttribute()`

The `setAttribute()` method allows us to set or update an attribute of an element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <

body>
    <img id="myImage" src="image.jpg" alt="A beautiful image" />
    <script>
      const image = document.getElementById("myImage");
      image.setAttribute("src", "newimage.jpg");
      image.setAttribute("alt", "An updated image");
    </script>
  </body>
</html>
```

In this example, we selected the `<img>` element with the ID `myImage` and used `setAttribute()` to change the `src` and `alt` attributes.

### Changing CSS Properties with `style`

The `style` property allows us to change CSS properties of an element directly.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
    <style>
      .myDiv {
        background-color: lightblue;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="myDiv">This is a div element.</div>
    <script>
      const div = document.querySelector(".myDiv");
      div.style.backgroundColor = "lightgreen";
      div.style.color = "white";
    </script>
  </body>
</html>
```

In this example, we selected the `<div>` element with the class `myDiv` and used the `style` property to change its background color and text color.

## 7. Adding and Removing CSS Classes

Adding and removing CSS classes is a common way to apply styles to elements dynamically.

### Adding Classes with `classList.add()`

The `classList.add()` method allows us to add one or more classes to an element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
    <style>
      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>This is a paragraph.</p>
    <script>
      const paragraph = document.querySelector("p");
      paragraph.classList.add("highlight");
    </script>
  </body>
</html>
```

In this example, we selected the `<p>` element and added the class `highlight` to apply the specified styles.

### Removing Classes with `classList.remove()`

The `classList.remove()` method allows us to remove one or more classes from an element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
    <style>
      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p class="highlight">This is a highlighted paragraph.</p>
    <script>
      const paragraph = document.querySelector("p");
      paragraph.classList.remove("highlight");
    </script>
  </body>
</html>
```

In this example, we selected the `<p>` element with the class `highlight` and removed the class to revert to the original styles.

### Toggling Classes with `classList.toggle()`

The `classList.toggle()` method allows us to add a class if it does not exist on the element or remove it if it already exists.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
    <style>
      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>This is a paragraph.</p>
    <button onclick="toggleHighlight()">Toggle Highlight</button>
    <script>
      function toggleHighlight() {
        const paragraph = document.querySelector("p");
        paragraph.classList.toggle("highlight");
      }
    </script>
  </body>
</html>
```

In this example, we created a button with an `onclick` event handler that toggles the `highlight` class on the `<p>` element when clicked.

## 8. Handling Events with DOM Manipulation

Handling events is an integral part of creating interactive web applications. JavaScript allows us to register event listeners to respond to various user actions.

### Registering Event Listeners

The `addEventListener()` method allows us to register an event listener for a specific event on an element.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
    <style>
      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <button id="myButton">Click Me</button>
    <script>
      const button = document.getElementById("myButton");
      button.addEventListener("click", function () {
        alert("Button Clicked!");
      });
    </script>
  </body>
</html>
```

In this example, we selected the `<button>` element with the ID `myButton` and added a click event listener. When the button is clicked, an alert message will be displayed.

### Event Delegation

Event delegation is a technique where a single event listener is added to a parent element to handle events for its child elements. This approach is particularly useful when dealing with dynamic content or a large number of elements.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
    <style>
      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <script>
      const list = document.getElementById("myList");
      list.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
          event.target.classList.toggle("highlight");
        }
      });
    </script>
  </body>
</html>
```

In this example, we added a click event listener to the `<ul>` element with the ID `myList`. When an `<li>` element inside the list is clicked, the event bubbles up to the `<ul>` element, and the event listener checks if the clicked element is an `<li>`. If so, it toggles the `highlight` class on that element.

## 9. Case Study: Creating an Interactive Todo List

Now that we have learned various techniques for DOM manipulation and event handling, let's apply these concepts to build an interactive todo list.

### Building the Todo List Structure

We will start by creating the HTML structure for the todo list.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Todo List</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }

      .todo-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .todo-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }

      .todo-item:last-child {
        border-bottom: none;
      }

      .todo-item .task {
        flex-grow: 1;
        margin-right: 10px;
      }

      .delete-button {
        background-color: #ff0000;
        color: #fff;
        border: none

;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        id="taskInput"
        placeholder="Enter a new task..."
      />
      <button onclick="addTask()">Add Task</button>
      <ul id="taskList"></ul>
    </div>
    <script>
      function addTask() {
        const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");
        const taskText = taskInput.value.trim();

        if (taskText === "") {
          alert("Please enter a task.");
          return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span class="task">${taskText}</span>
          <button class="delete-button" onclick="deleteTask(this)">
            Delete
          </button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";
      }

      function deleteTask(button) {
        const taskList = document.getElementById("taskList");
        taskList.removeChild(button.parentElement);
      }
    </script>
  </body>
</html>
```

In this example, we have created a simple todo list application with an input field to enter tasks, an "Add Task" button to add tasks to the list, and a list to display the tasks. Each task is represented as an `<li>` element with a task description and a "Delete" button.

### Adding and Removing Todo Items

The `addTask()` function is called when the "Add Task" button is clicked. It retrieves the task description from the input field and creates a new `<li>` element to represent the task. The task item is then appended to the task list.

The `deleteTask()` function is called when the "Delete" button is clicked. It removes the corresponding task item from the task list.

### Marking Todo Items as Completed

Now, let's enhance our todo list by allowing users to mark tasks as completed.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Todo List</title>
    <style>
      /* ... Same CSS styles as before ... */

      .completed {
        text-decoration: line-through;
      }
    </style>
  </head>
  <body>
    <div class="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        id="taskInput"
        placeholder="Enter a new task..."
      />
      <button onclick="addTask()">Add Task</button>
      <ul id="taskList"></ul>
    </div>
    <script>
      // ... Same addTask() and deleteTask() functions as before ...

      function toggleCompleted(taskItem) {
        taskItem.classList.toggle("completed");
      }
    </script>
  </body>
</html>
```

In this example, we added a new CSS class `.completed` with a `text-decoration: line-through` property to visually indicate completed tasks.

We also added a new function `toggleCompleted()` to toggle the `.completed` class on a task item when it is clicked. We'll call this function when the user clicks on a task description to mark it as completed.

### Filtering Todo Items

To improve user experience, let's add the ability to filter tasks based on their completion status.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Todo List</title>
    <style>
      /* ... Same CSS styles as before ... */

      .active-filter {
        font-weight: bold;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        id="taskInput"
        placeholder="Enter a new task..."
      />
      <button onclick="addTask()">Add Task</button>
      <div>
        <button onclick="filterTasks('all')">All</button>
        <button onclick="filterTasks('active')">Active</button>
        <button onclick="filterTasks('completed')">Completed</button>
      </div>
      <ul id="taskList"></ul>
    </div>
    <script>
      // ... Same addTask(), deleteTask(), and toggleCompleted() functions as before ...

      function filterTasks(filter) {
        const taskList = document.getElementById("taskList");
        const taskItems = taskList.querySelectorAll("li");

        taskItems.forEach((taskItem) => {
          switch (filter) {
            case "active":
              taskItem.style.display = taskItem.classList.contains("completed") ? "none" : "block";
              break;
            case "completed":
              taskItem.style.display = taskItem.classList.contains("completed") ? "block" : "none";
              break;
            default:
              taskItem.style.display = "block";
              break;
          }
        });
      }
    </script>
  </body>
</html>
```

In this example, we added three filter buttons: "All," "Active," and "Completed." Clicking on these buttons calls the `filterTasks()`

 function with the corresponding filter value.

The `filterTasks()` function iterates through all task items and hides or shows them based on the selected filter. If the "Active" filter is selected, completed tasks are hidden, and vice versa for the "Completed" filter. The "All" filter shows all tasks.

## 10. Best Practices for DOM Manipulation

As you work with DOM manipulation, it's essential to follow best practices to ensure efficient and maintainable code.

### Reducing DOM Manipulation

DOM manipulation can be computationally expensive, especially when working with a large number of elements. Minimize the number of DOM updates and prefer batching changes to minimize layout and rendering thrashing.

### Caching Elements

When performing multiple DOM operations on the same elements, cache the element references to avoid repeatedly querying the DOM for the same elements.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <script>
      // Bad Practice: Querying the DOM multiple times
      const list = document.getElementById("myList");
      const firstItem = list.querySelector("li:nth-child(1)");
      const secondItem = list.querySelector("li:nth-child(2)");

      // Good Practice: Caching the element references
      const items = list.querySelectorAll("li");
      const firstItem = items[0];
      const secondItem = items[1];
    </script>
  </body>
</html>
```

In this example, the good practice caches the `<li>` elements in the `items` variable to avoid multiple queries to the DOM.

### Avoiding Global Variables

Avoid polluting the global scope with variables to reduce the risk of conflicts and unexpected behavior. Instead, use modules or functions to encapsulate and manage the scope of variables.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation</title>
  </head>
  <body>
    <button id="myButton">Click Me</button>
    <script>
      // Bad Practice: Using global variables
      const button = document.getElementById("myButton");

      function handleClick() {
        alert("Button Clicked!");
      }

      button.addEventListener("click", handleClick);

      // Good Practice: Using a module or function scope
      (function () {
        const button = document.getElementById("myButton");

        function handleClick() {
          alert("Button Clicked!");
        }

        button.addEventListener("click", handleClick);
      })();
    </script>
  </body>
</html>
```

In this example, the good practice wraps the code inside a self-invoking function to create a module-like scope for the `button` variable and the `handleClick()` function.

## 11. Conclusion

In this chapter, we explored various aspects of DOM manipulation using vanilla JavaScript. We learned how to select elements from the DOM, modify their content, add and remove elements, change attributes and CSS properties, and handle events to create interactive web applications.

By mastering these techniques and following best practices, you can ensure cross-browser compatibility and deliver seamless user experiences in your web development projects. DOM manipulation is a fundamental skill that empowers you to build dynamic and responsive web applications, opening endless possibilities for creativity and innovation.