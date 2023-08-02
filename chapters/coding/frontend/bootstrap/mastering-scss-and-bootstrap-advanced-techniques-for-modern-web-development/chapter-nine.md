# Chapter 9: Customizing Bootstrap with SCSS

Bootstrap is a popular CSS framework that provides a set of pre-designed components and styles to build responsive and modern websites. While Bootstrap offers a great starting point for web development, you may want to customize its styles to match the unique design requirements of your project. In this chapter, we will explore how to customize Bootstrap using SCSS to create a personalized and cohesive look for your web application.

## Understanding Bootstrap and SCSS

Before we dive into customizing Bootstrap with SCSS, let's have a brief overview of what Bootstrap and SCSS are.

### What is Bootstrap?

Bootstrap is an open-source CSS framework developed by Twitter. It provides a collection of CSS classes and JavaScript components that can be used to build responsive and mobile-first web applications. Bootstrap's grid system, typography, and CSS components make it easy to create consistent and professional-looking designs.

### What is SCSS?

SCSS (Sassy CSS) is a CSS preprocessor that extends the capabilities of regular CSS. It introduces features like variables, mixins, nesting, and functions, which make writing and maintaining CSS code much easier and efficient. SCSS files use the `.scss` file extension and are compiled into regular CSS files that the browser can understand.

## Setting up Bootstrap with SCSS

To customize Bootstrap using SCSS, we first need to set up a project with Bootstrap and SCSS.

1. Install Bootstrap using npm (Node Package Manager):

   ```
   npm install bootstrap
   ```

2. Create a new SCSS file (e.g., `custom.scss`) in your project's `src` or `assets` folder.

3. Import Bootstrap styles into your SCSS file:

   ```scss
   // custom.scss
   @import 'node_modules/bootstrap/scss/bootstrap';
   ```

4. Now, make sure that your SCSS file is being compiled into CSS. You can do this by including the SCSS file in your project's main entry point (e.g., `main.js` or `main.scss`):

   ```scss
   // main.scss
   @import 'custom.scss';
   ```

   If you are using Vue.js, you can add the following to your `nuxt.config.js` file to automatically include the SCSS file:

   ```javascript
   // nuxt.config.js
   export default {
     css: ['@/assets/main.scss'],
   };
   ```

With Bootstrap and SCSS set up, we are now ready to start customizing Bootstrap to match our project's design.

## Customizing Bootstrap Variables

Bootstrap provides a set of variables that control various aspects of its styles, such as colors, typography, spacing, and breakpoints. By customizing these variables, we can easily change the overall look and feel of our Bootstrap-based website.

### Example: Changing the Primary Color

Let's start by customizing the primary color of our website. By default, Bootstrap uses a blue color as the primary color. We will change it to a different color to match our project's branding.

In our `custom.scss` file, we can override the `$primary` variable with our desired color:

```scss
// custom.scss
$primary: #ff6347; // Tomato red color
@import 'node_modules/bootstrap/scss/bootstrap';
```

By recompiling the SCSS file, we can see that the primary color of all Bootstrap components will now be updated to the new color.

### Example: Adjusting Spacing

Bootstrap also provides variables to control spacing, such as margins and padding. Let's adjust the default spacing to better fit our design requirements.

```scss
// custom.scss
$spacer: 1.5rem; // Increase the default spacing to 1.5rem
@import 'node_modules/bootstrap/scss/bootstrap';
```

By adjusting the `$spacer` variable, we can increase or decrease the spacing between Bootstrap components throughout our website.

## Creating Custom CSS Classes with Mixins

In addition to customizing variables, we can use SCSS mixins to create custom CSS classes that apply specific styles to our elements.

### Example: Custom Button Style

Let's say we want to create a custom button style that has a unique background color and font size. We can achieve this by creating a SCSS mixin in our `custom.scss` file:

```scss
// custom.scss
$custom-button-color: #4caf50; // Green color for custom buttons

@mixin custom-button {
  background-color: $custom-button-color;
  color: white;
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darken($custom-button-color, 10%);
  }
}

// Using the custom button mixin
.custom-btn {
  @include custom-button;
}
```

In this example, we have defined a mixin called `custom-button` that sets the background color, text color, font size, padding, border radius, and cursor style for our custom button. The `darken` function is used to create a darker shade of the button color on hover.

We then create a custom button class `.custom-btn` and include the `custom-button` mixin in it. Now, we can apply our custom button style by adding the `.custom-btn` class to any HTML element.

## Overriding Bootstrap CSS

In some cases,

 we may want to completely override certain Bootstrap styles to achieve a more customized look. We can do this by targeting specific Bootstrap classes and overriding their styles in our `custom.scss` file.

### Example: Custom Navbar

Let's customize the Bootstrap navbar to have a different background color, font size, and link color.

```scss
// custom.scss
$navbar-bg: #333; // Dark background color for the navbar
$navbar-link-color: #fff; // White link color for the navbar
$navbar-link-hover-color: #ff6347; // Tomato red link color on hover

@import 'node_modules/bootstrap/scss/bootstrap';

// Overriding the default Bootstrap navbar styles
.navbar {
  background-color: $navbar-bg;
  font-size: 1.2rem;

  .nav-link {
    color: $navbar-link-color;

    &:hover {
      color: $navbar-link-hover-color;
    }
  }
}
```

In this example, we have customized the `$navbar-bg`, `$navbar-link-color`, and `$navbar-link-hover-color` variables to change the background color, link color, and link hover color of the Bootstrap navbar, respectively. We then override the default `.navbar` and `.nav-link` styles in our `custom.scss` file to apply our custom styles.

## Conclusion

In this chapter, we learned how to customize Bootstrap using SCSS to create a personalized and unique design for our web application. By customizing variables, creating custom CSS classes with mixins, and overriding Bootstrap CSS, we can achieve a highly customized and visually appealing website that matches our project's design requirements.

We covered examples of changing the primary color, adjusting spacing, creating custom button styles, and customizing the Bootstrap navbar. These examples are just the beginning of what you can achieve with SCSS and Bootstrap customization. With your creativity and the power of SCSS, the possibilities for customizing Bootstrap are virtually endless.

In the next chapter, we will explore more advanced SCSS techniques and how to create complex and reusable styles using SCSS features like nesting and functions. Stay tuned for more SCSS awesomeness!