# Chapter 5: SCSS Partials and Imports

In the previous chapters, we learned about the basics of SCSS, variables, mixins, and nesting. As our stylesheets grow larger and more complex, organizing our code becomes essential for maintainability and readability. In this chapter, we will explore SCSS partials and imports, powerful features that allow us to split our stylesheets into smaller, manageable files.

## Table of Contents

1. Introduction to Partials
2. Creating Partial Files
3. Importing Partial Files
4. Variable Scope in Partial Files
5. Benefits of Using Partials
6. Managing Vendor Styles
7. Combining Multiple SCSS Files
8. Import Order and Best Practices
9. Example: Creating a Responsive Grid System
10. Conclusion

## 1. Introduction to Partials

In SCSS, a partial is a file that contains CSS rules and declarations, but its filename starts with an underscore (e.g., `_partial.scss`). Partials are not meant to be compiled into standalone CSS files; instead, they are intended to be imported into other SCSS files.

## 2. Creating Partial Files

Let's start by creating a partial file for our project. We'll name it `_variables.scss`, and it will contain all our global variables:

```scss
// _variables.scss

$primary-color: #007bff;
$secondary-color: #6c757d;
```

By organizing our variables in a partial file, we can easily reuse them throughout our project.

## 3. Importing Partial Files

To use the variables defined in `_variables.scss`, we need to import the partial into our main SCSS file:

```scss
// main.scss

@import 'variables';

body {
  background-color: $primary-color;
  color: $secondary-color;
}
```

When we compile `main.scss`, the `@import 'variables';` statement will include the variables from `_variables.scss` into our main CSS file.

## 4. Variable Scope in Partial Files

Variables defined in a partial are only accessible within the file where they are defined and any files imported after that. They are not available in files imported before the partial.

## 5. Benefits of Using Partials

- **Modularity**: Partials allow us to break our stylesheets into smaller, manageable chunks, making it easier to organize and maintain our code.

- **Reusability**: By separating our styles into partials, we can reuse components, variables, and mixins across different pages and sections of our website.

- **Readability**: Splitting our code into smaller files enhances code readability, as we can focus on specific sections of our stylesheets at a time.

- **Improved Collaboration**: With SCSS partials, multiple developers can work on different parts of the stylesheet without conflicting changes.

## 6. Managing Vendor Styles

Using SCSS partials is especially useful when dealing with vendor stylesheets. For example, if we are using a CSS framework like Bootstrap or a third-party library, we can create a partial for each vendor and then import them into our main SCSS file:

```scss
// main.scss

@import 'variables';
@import 'bootstrap';
@import 'font-awesome';
@import 'custom-styles';
```

This way, our main SCSS file remains clean and organized, and we can easily manage and update vendor styles.

## 7. Combining Multiple SCSS Files

As our project grows, we may have multiple SCSS files for different components and sections. By using partials and imports, we can combine all these files into a single CSS output. This helps reduce the number of HTTP requests and improves page load time.

## 8. Import Order and Best Practices

When importing partials, it's essential to follow a specific order to avoid unintended consequences. Generally, it's best to import variables first, followed by mixins, and then the rest of the styles.

```scss
// main.scss

@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';
@import 'layouts';
```

## 9. Example: Creating a Responsive Grid System

Let's apply what we've learned to create a responsive grid system using SCSS partials.

### Step 1: Create a Variables Partial

In `_variables.scss`, define our grid-related variables:

```scss
// _variables.scss

$grid-columns: 12;
$grid-gutter: 20px;
```

### Step 2: Create a Mixins Partial

In `_mixins.scss`, define our grid-related mixins:

```scss
// _mixins.scss

@mixin container {
  max-width: 1140px;
  margin: 0 auto;
}

@mixin row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -$grid-gutter / 2;
  margin-right: -$grid-gutter / 2;
}

@mixin column($columns) {
  flex: 0 0 calc

((100% / #{$grid-columns}) * #{$columns});
  padding-left: $grid-gutter / 2;
  padding-right: $grid-gutter / 2;
}
```

### Step 3: Create a Base Partial

In `_base.scss`, include our variables and mixins, and define the base styles for the grid system:

```scss
// _base.scss

@import 'variables';
@import 'mixins';

.container {
  @include container;
}

.row {
  @include row;
}

.column {
  @include column(1);
}
```

### Step 4: Create a Components Partial

In `_components.scss`, define styles for specific components using the grid system:

```scss
// _components.scss

.header {
  background-color: #f0f0f0;
}

.sidebar {
  background-color: #ebebeb;
}

.main-content {
  background-color: #fff;
}

.footer {
  background-color: #f0f0f0;
}
```

### Step 5: Import Partials into the Main SCSS File

In `main.scss`, import all the partials:

```scss
// main.scss

@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';
```

Now we have a fully functional responsive grid system in our project!

## 10. Conclusion

In this chapter, we explored the power of SCSS partials and imports in organizing and managing our stylesheets. By breaking our code into smaller, modular pieces, we can create more maintainable and scalable CSS for our web projects. Additionally, we learned how to create a responsive grid system using SCSS partials, mixins, and variables.

In the next chapter, we will dive into advanced SCSS techniques, including advanced mixins, functions, and control directives. Stay tuned for Chapter 6: SCSS Functions and Operations.

Happy coding!