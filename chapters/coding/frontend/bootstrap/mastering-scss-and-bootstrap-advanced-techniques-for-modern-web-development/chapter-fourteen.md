# Chapter 14: SCSS and Theming

In this chapter, we will explore how to use SCSS to create flexible and customizable themes for your web applications. Theming is an essential aspect of web development as it allows you to easily change the look and feel of your application without modifying the underlying code. We will cover various techniques to implement theming using SCSS, including variable-based theming, dynamic theming, and customizing themes for specific components.

## Table of Contents

1. Introduction
2. Variable-Based Theming
3. Dynamic Theming
4. Customizing Themes for Specific Components
5. Switching Themes at Runtime
6. Creating a Dark Mode Theme
7. Theme Previewer Example
8. Conclusion

## 1. Introduction

Theming is the process of customizing the visual appearance of a web application to match the branding or design requirements of a specific project. With SCSS, we can easily create flexible and reusable themes by utilizing variables and mixins. In this chapter, we will learn how to implement theming in SCSS and create themes that can be easily switched at runtime.

## 2. Variable-Based Theming

One of the most common and straightforward ways to implement theming in SCSS is through variable-based theming. This involves defining a set of variables for colors, fonts, spacing, and other design elements that can be easily customized to create different themes.

Let's start by creating a basic color scheme for our theme:

```scss
// _variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$error-color: #dc3545;
```

Now, we can use these variables throughout our SCSS files to apply the color scheme consistently across the application:

```scss
// _buttons.scss
.button {
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &.primary {
    background-color: $primary-color;
  }

  &.secondary {
    background-color: $secondary-color;
  }

  &.success {
    background-color: $success-color;
  }

  &.error {
    background-color: $error-color;
  }
}
```

By using variables for colors and other design elements, we can easily switch between different themes by modifying the variable values in one place.

## 3. Dynamic Theming

Dynamic theming takes theming to the next level by allowing users to customize the application's appearance on the fly. This can be achieved by storing theme settings in a data source (e.g., a database or localStorage) and dynamically applying those settings using SCSS functions.

Let's explore an example of dynamic theming using SCSS functions and localStorage:

```html
<!-- index.html -->
<button id="theme-toggle">Toggle Dark Mode</button>
```

```scss
// main.scss
$dark-mode: false;

// Function to toggle dark mode
@function toggle-dark-mode($mode) {
  @if $mode {
    // Dark mode styles
    body {
      background-color: #333;
      color: #fff;
    }
  } @else {
    // Light mode styles
    body {
      background-color: #fff;
      color: #333;
    }
  }
}

// Apply dynamic theming based on the $dark-mode value
@include toggle-dark-mode($dark-mode);
```

```javascript
// main.js
document.getElementById('theme-toggle').addEventListener('click', function () {
  $dark-mode = !$dark-mode;
  localStorage.setItem('darkMode', $dark-mode);
  location.reload();
});

// Check for dark mode preference in localStorage
if (localStorage.getItem('darkMode') === 'true') {
  $dark-mode: true;
}
```

In this example, we use a button with an event listener to toggle the `$dark-mode` variable and store the preference in localStorage. When the page loads, we check for the dark mode preference in localStorage and apply the appropriate theme using SCSS functions.

## 4. Customizing Themes for Specific Components

In some cases, you may want to customize themes for specific components while keeping the rest of the application consistent. This can be achieved by creating separate SCSS files for each component's theme and importing them when needed.

```scss
// _buttons-light.scss
.button {
  background-color: $primary-color;
  color: white;
}

// _buttons-dark.scss
.button {
  background-color: $secondary-color;
  color: white;
}

// main.scss
@import 'buttons-light'; // Default theme

$dark-mode: false;

// Function to toggle dark mode
@function toggle-dark-mode($mode) {
  @if $mode {
    @import 'buttons-dark'; // Dark mode theme
    // Other dark mode styles...
  } @else {
    @import 'buttons-light'; // Light mode theme
    // Other light mode styles...
  }
}

// Apply dynamic theming based on the $dark-mode value
@include toggle-dark-mode($dark-mode);
```

## 5. Switching Themes at Runtime

To allow users to switch themes at runtime, you can

 create a theme picker component that updates the SCSS variables based on the user's selection. Here's an example of how to implement a theme picker:

```html
<!-- index.html -->
<div id="theme-picker">
  <label for="theme-select">Select Theme:</label>
  <select id="theme-select">
    <option value="default">Default</option>
    <option value="dark">Dark</option>
    <option value="custom">Custom</option>
  </select>
</div>
```

```scss
// main.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$error-color: #dc3545;

// Function to apply custom theme
@function apply-custom-theme($primary, $secondary, $success, $error) {
  $primary-color: $primary;
  $secondary-color: $secondary;
  $success-color: $success;
  $error-color: $error;
}

document.getElementById('theme-select').addEventListener('change', function () {
  const selectedTheme = this.value;

  switch (selectedTheme) {
    case 'default':
      apply-default-theme();
      break;
    case 'dark':
      apply-dark-theme();
      break;
    case 'custom':
      // Prompt user for custom theme colors and pass them to apply-custom-theme function
      const primaryColor = prompt('Enter primary color:');
      const secondaryColor = prompt('Enter secondary color:');
      const successColor = prompt('Enter success color:');
      const errorColor = prompt('Enter error color:');
      apply-custom-theme(primaryColor, secondaryColor, successColor, errorColor);
      break;
    default:
      apply-default-theme();
  }
});

function apply-default-theme() {
  // Apply default theme
  $primary-color: #007bff;
  $secondary-color: #6c757d;
  $success-color: #28a745;
  $error-color: #dc3545;
}

function apply-dark-theme() {
  // Apply dark theme
  $primary-color: #333;
  $secondary-color: #444;
  $success-color: #00ff00;
  $error-color: #ff0000;
}
```

In this example, the theme picker component listens for changes to the theme select element and applies the corresponding theme using SCSS variables. For the custom theme option, the user is prompted to enter custom colors, which are then passed to the `apply-custom-theme` function.

## 6. Creating a Dark Mode Theme

Dark mode is a popular feature that allows users to switch to a darker color scheme for reduced eye strain in low-light environments. Let's create a dark mode theme using SCSS variables and dynamic theming:

```scss
// _variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$error-color: #dc3545;

// _dark-theme.scss
$primary-color: #333;
$secondary-color: #444;
$success-color: #00ff00;
$error-color: #ff0000;
```

```scss
// main.scss
$dark-mode: false;

// Function to toggle dark mode
@function toggle-dark-mode($mode) {
  @if $mode {
    @import 'dark-theme'; // Import dark theme variables
    // Other dark mode styles...
  } @else {
    // Other light mode styles...
  }
}

// Apply dynamic theming based on the $dark-mode value
@include toggle-dark-mode($dark-mode);
```

Now, when the user toggles dark mode, the dark theme variables will be applied, giving the application a sleek and modern look.

## 7. Theme Previewer Example

To provide users with a more immersive theming experience, you can create a theme previewer component that allows them to see a live preview of their chosen theme before applying it.

```html
<!-- index.html -->
<div id="theme-previewer">
  <h3>Theme Previewer</h3>
  <div class="previewer">
    <!-- Add components to preview the theme -->
  </div>
  <div id="theme-picker">
    <label for="theme-select">Select Theme:</label>
    <select id="theme-select">
      <option value="default">Default</option>
      <option value="dark">Dark</option>
      <option value="custom">Custom</option>
    </select>
  </div>
</div>
```

```javascript
// main.js
document.getElementById('theme-select').addEventListener('change', function () {
  const selectedTheme = this.value;

  switch (selectedTheme) {
    case 'default':
      apply-default-theme();
      break;
    case 'dark':
      apply-dark-theme();
      break;
    case 'custom':
      // Prompt user for custom theme colors and pass them to apply-custom-theme function
      const primaryColor = prompt('Enter primary color:');
      const secondaryColor

 = prompt('Enter secondary color:');
      const successColor = prompt('Enter success color:');
      const errorColor = prompt('Enter error color:');
      apply-custom-theme(primaryColor, secondaryColor, successColor, errorColor);
      break;
    default:
      apply-default-theme();
  }

  // Refresh the previewer to show the updated theme
  refreshPreviewer();
});

function refreshPreviewer() {
  // Code to refresh the theme previewer
}
```

In this example, we create a theme previewer component that includes a live preview of the chosen theme. When the user selects a different theme from the theme picker, the `refreshPreviewer` function is called to update the previewer with the new theme.

## 8. Conclusion

Theming is a powerful tool that allows you to customize the visual appearance of your web application to suit your project's requirements. With SCSS, you can easily implement theming using variables, mixins, and dynamic theming techniques. This chapter explored various theming methods and provided examples to help you create flexible and customizable themes for your web projects. With the knowledge gained from this chapter, you can enhance your web applications by providing users with a visually appealing and user-friendly theming experience. Happy theming!