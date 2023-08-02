# Chapter 7: Responsive Design with SCSS Media Queries

In today's world, where websites are accessed on a variety of devices with different screen sizes and resolutions, responsive design has become a crucial aspect of web development. Responsive design ensures that a website adapts and looks great on all devices, whether it's a desktop computer, tablet, or smartphone. In this chapter, we will explore how to implement responsive design using SCSS media queries.

## What are Media Queries?

Media queries are a feature in CSS that allow us to apply different styles based on the characteristics of the device or screen on which a website is being viewed. With media queries, we can create different layouts and styles for different screen sizes, making our website responsive and user-friendly.

In SCSS, we can use media queries to write more maintainable and organized code. Instead of writing separate CSS files for each breakpoint, we can use SCSS to define media queries within our stylesheets, making it easier to manage and update our responsive styles.

## Getting Started with SCSS Media Queries

To use SCSS media queries, we first need to set up our project with SCSS. If you haven't already, you can install SCSS in your project using npm or yarn:

```bash
npm install node-sass --save-dev
```

or

```bash
yarn add node-sass --dev
```

Once SCSS is set up, we can start using media queries in our stylesheets.

## Creating Breakpoints

Before we dive into using media queries, it's essential to define breakpoints for our website. Breakpoints are specific screen sizes at which the layout of our website will change. Common breakpoints include small screens (mobile phones), medium screens (tablets), and large screens (desktops). Let's define some breakpoints in SCSS:

```scss
$small-screen: 576px;
$medium-screen: 768px;
$large-screen: 992px;
$extra-large-screen: 1200px;
```

In this example, we have defined four breakpoints based on popular screen sizes. You can customize these breakpoints to fit your project's needs.

## Writing SCSS Media Queries

Now that we have defined our breakpoints, let's use SCSS media queries to apply different styles based on these breakpoints. In SCSS, we can use the `@media` directive to define media queries.

### Example: Adjusting Font Size for Different Screen Sizes

Suppose we want to adjust the font size for different screen sizes. We can use media queries to increase the font size for larger screens. Let's see how we can achieve this:

```scss
body {
  font-size: 16px; // Default font size for body
}

// Media query for medium screens (768px and above)
@media (min-width: $medium-screen) {
  body {
    font-size: 18px;
  }
}

// Media query for large screens (992px and above)
@media (min-width: $large-screen) {
  body {
    font-size: 20px;
  }
}

// Media query for extra-large screens (1200px and above)
@media (min-width: $extra-large-screen) {
  body {
    font-size: 22px;
  }
}
```

In this example, we have used media queries to increase the font size as the screen size gets larger. The font size will remain 16px for small screens (less than 768px), increase to 18px for medium screens (768px and above), further increase to 20px for large screens (992px and above), and finally, become 22px for extra-large screens (1200px and above).

### Example: Adjusting Column Layout for Different Screen Sizes

Another common use of media queries is adjusting the column layout for different screen sizes. Let's say we have a three-column layout for large screens, but we want to switch to a two-column layout for medium screens and a single-column layout for small screens. We can achieve this using media queries:

```scss
.container {
  display: flex;
}

.column {
  flex: 1;
  padding: 10px;
}

// Media query for medium screens (768px and above)
@media (max-width: $large-screen) {
  .column {
    flex-basis: 50%;
  }
}

// Media query for small screens (less than 768px)
@media (max-width: $medium-screen) {
  .column {
    flex-basis: 100%;
  }
}
```

In this example, we have used media queries to change the `flex-basis` of the columns based on the screen size. For large screens (992px and above), the columns will take up one-third of the container's width, creating a three-column layout. For medium screens (768px to 991px), the columns will take up 50% of the container's width, creating a two-column layout. And for small screens (less than 768px), the columns will take up 100% of the container's width, creating a single-column layout.

## Nesting Media Queries

SCSS allows us to nest media

 queries inside other selectors, making it even more convenient to organize our styles. Let's see an example of nesting media queries:

```scss
.container {
  display: flex;

  .column {
    flex: 1;
    padding: 10px;

    // Media query for medium screens (768px and above)
    @media (max-width: $large-screen) {
      flex-basis: 50%;
    }

    // Media query for small screens (less than 768px)
    @media (max-width: $medium-screen) {
      flex-basis: 100%;
    }
  }
}
```

In this example, we have nested the media queries inside the `.column` selector, making it easier to manage the styles for different screen sizes.

## Conclusion

In this chapter, we learned about SCSS media queries and how they can be used to implement responsive design in our web projects. We saw how to define breakpoints and write SCSS media queries to apply different styles based on screen sizes. Media queries are a powerful tool that allows us to create websites that look great and function well on various devices and screen resolutions.

By using SCSS media queries, we can write more maintainable and organized code, making it easier to manage and update our responsive styles. With the flexibility and versatility of SCSS media queries, we can create fluid and adaptable designs that provide an optimal user experience across all devices.

In the next chapter, we will explore advanced SCSS techniques and best practices that will further enhance our CSS workflow and productivity. Stay tuned!