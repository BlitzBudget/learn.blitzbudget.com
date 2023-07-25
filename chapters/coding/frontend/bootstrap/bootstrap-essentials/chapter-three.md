# Chapter 3: Basic HTML Structure with Bootstrap

In this chapter, we will explore the basic HTML structure required for using Bootstrap effectively. Bootstrap is designed to be easy to integrate into your web project, and it relies on a specific HTML structure to leverage its powerful grid system and responsive design features. By the end of this chapter, you will have a solid understanding of the essential HTML elements and classes needed to kickstart your Bootstrap-based website.

## Creating a New HTML File

Before we start building our basic HTML structure with Bootstrap, let's create a new HTML file in your preferred code editor. You can name it `index.html` or any other relevant name. Here's a simple starting point for our new HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bootstrap Website</title>
    <!-- Link Bootstrap CSS from CDN or local file -->
    <link rel="stylesheet" href="path/to/bootstrap.min.css">
</head>
<body>
    <!-- Your content goes here -->
    <!-- Link Bootstrap JavaScript from CDN or local file -->
    <script src="path/to/bootstrap.min.js"></script>
</body>
</html>
```

Replace `path/to/bootstrap.min.css` and `path/to/bootstrap.min.js` with the actual paths to the Bootstrap CSS and JavaScript files. You can either link to the files locally or use a Content Delivery Network (CDN) as we discussed in Chapter 2.

## The Basic Structure

At the heart of any Bootstrap-based web page is a set of essential HTML elements and CSS classes. These elements and classes help create a responsive layout and provide a solid foundation for your website.

### 1. The `<body>` Element

The `<body>` element is where the content of your web page resides. It contains all the visible elements that users interact with. Within the `<body>` element, you will add various HTML components, such as headers, sections, navigation bars, and more.

### 2. Containers

Bootstrap utilizes the concept of containers to create responsive and centered content. Containers are the top-level structural elements in Bootstrap and help to contain, pad, and align the content within.

There are two types of containers in Bootstrap: `.container` and `.container-fluid`.

#### a. `.container`

The `.container` class creates a fixed-width container that is centered on the screen. It provides a responsive layout with a maximum width at different breakpoints.

Here's an example of a basic container:

```html
<body>
    <div class="container">
        <!-- Your content goes here -->
    </div>
</body>
```

#### b. `.container-fluid`

The `.container-fluid` class creates a full-width container that spans the entire width of the viewport. It adapts its width based on the screen size, making it suitable for responsive designs.

Here's an example of a full-width container:

```html
<body>
    <div class="container-fluid">
        <!-- Your content goes here -->
    </div>
</body>
```

### 3. Rows and Columns

Bootstrap's powerful grid system is based on the concept of rows and columns. The grid system enables you to create responsive layouts that adapt to different screen sizes.

#### a. Rows

A row is a horizontal container that holds columns. It ensures that the columns within it are properly aligned and responsive.

To create a row, use the `.row` class:

```html
<body>
    <div class="container">
        <div class="row">
            <!-- Your columns go here -->
        </div>
    </div>
</body>
```

#### b. Columns

Columns are the building blocks of Bootstrap's grid system. They are used to divide the available horizontal space within a row.

Bootstrap supports 12 columns in a row, allowing you to create flexible layouts. To create columns, use the `.col` class along with the desired column size.

For example, to create three equal-width columns, you can use the following:

```html
<body>
    <div class="container">
        <div class="row">
            <div class="col">Column 1</div>
            <div class="col">Column 2</div>
            <div class="col">Column 3</div>
        </div>
    </div>
</body>
```

The above code will create three equal-width columns within the row.

You can also specify different column sizes based on the screen size. For example, to create three columns that take up the full width on small screens and two columns on medium and larger screens, you can use the following:

```html
<body>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">Column 1</div>
            <div class="col-12 col-md-6">Column 2</div>
            <div class="col-12 col-md-6">Column 3</div>
        </div>
    </div>
</body>


```

In the above example, on small screens, each column will take up the full width (`col-12`). On medium and larger screens, each column will take up half of the width (`col-md-6`).

### 4. Navigation Bar

The navigation bar, commonly known as the navbar, is an essential component in any website. Bootstrap provides a simple and effective way to create a responsive navbar.

To create a basic navbar, use the following structure:

```html
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">My Website</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</body>
```

In the above example, the navbar will collapse into a hamburger menu on smaller screens, providing a mobile-friendly navigation experience.

### 5. Typography

Bootstrap provides a set of default typography styles to improve the readability and visual appeal of your text. You can use various typography classes to style your text, headings, and paragraphs.

Here's an example of using Bootstrap's typography classes:

```html
<body>
    <div class="container">
        <h1 class="display-4">Welcome to My Website</h1>
        <p class="lead">This is a lead paragraph. Use it to introduce your website or provide a brief description.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
    </div>
</body>
```

In the above example, the `display-4` class sets the heading to have a large font size, making it stand out. The `lead` class styles the paragraph to have increased font size and font weight, making it suitable for introductory text.

## Conclusion

In this chapter, we learned the basic HTML structure required for using Bootstrap in your web project. We covered essential elements such as the `<body>` element, containers, rows, columns, navigation bars, and typography classes.

The core of Bootstrap's power lies in its grid system and responsive design features, which enable you to create flexible and visually appealing layouts. By leveraging Bootstrap's pre-built classes and components, you can significantly speed up your web development process and ensure a consistent and professional look for your website.

In the next chapter, we will delve deeper into Bootstrap's grid system, understanding how to create responsive layouts and work with different column sizes. So, stay tuned for Chapter 4: Bootstrap Grid System: Creating Responsive Layouts!