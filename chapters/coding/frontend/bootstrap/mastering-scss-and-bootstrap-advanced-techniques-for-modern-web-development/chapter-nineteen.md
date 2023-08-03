# Chapter 19: SCSS and CSS Reset

In this chapter, we will delve into the world of SCSS and CSS reset. CSS reset is an essential technique used to normalize the default styles applied by different browsers, ensuring a consistent starting point for our styles. SCSS, on the other hand, is a powerful extension of CSS that brings a variety of features and improvements to the table.

## 1. What is a CSS Reset?

Before we dive into SCSS, let's first understand what a CSS reset is and why it's important. When you create a web page, different browsers apply their default styles to HTML elements. As a result, the same element may look different in different browsers. This inconsistency can be frustrating and can lead to cross-browser compatibility issues.

A CSS reset is a set of CSS rules that aim to reset or neutralize the default styles applied by browsers. By using a CSS reset, you can create a clean slate for your styles, ensuring that your web page looks consistent across all browsers. It's a best practice to include a CSS reset at the beginning of your stylesheet.

## 2. Advantages of SCSS for CSS Reset

SCSS (Sass) is a preprocessor scripting language that extends the capabilities of CSS. It allows you to use variables, nesting, functions, and more, making your stylesheets more organized and maintainable. When it comes to CSS reset, SCSS can be a game-changer in the following ways:

### 2.1. Variables for Easy Customization

SCSS allows you to use variables to store common values, making it easy to customize your CSS reset. For example, you can define a variable for font size and use it throughout your CSS reset:

```scss
$font-size: 16px;

body {
  font-size: $font-size;
}
```

If you decide to change the font size later, you can simply update the variable, and the change will apply to all elements using that variable.

### 2.2. Nesting for Improved Readability

SCSS supports nesting, allowing you to write more organized and readable styles. In a CSS reset, you may have multiple rules for different HTML elements. With SCSS, you can nest these rules to reflect the HTML hierarchy:

```scss
body {
  margin: 0;
  padding: 0;

  h1 {
    font-size: 24px;
  }

  p {
    line-height: 1.6;
  }
}
```

### 2.3. Mixins for Code Reusability

SCSS mixins are like functions that allow you to encapsulate styles and reuse them throughout your stylesheet. You can create a mixin for common styles in your CSS reset:

```scss
@mixin reset-margin-padding {
  margin: 0;
  padding: 0;
}
```

Then, you can include the mixin wherever you need to reset margins and padding:

```scss
body {
  @include reset-margin-padding;
}
```

### 2.4. Partials for Modularity

SCSS supports partials, which are smaller SCSS files that can be imported into your main stylesheet. This modularity allows you to organize your CSS reset into smaller, more manageable chunks:

```scss
// _reset.scss

body {
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 24px;
}
```

```scss
// main.scss

@import 'reset';

p {
  line-height: 1.6;
}
```

## 3. Building a Custom SCSS Reset

Now that we understand the advantages of SCSS for CSS reset, let's create a custom SCSS reset that we can use in our web projects. We will focus on the most common reset styles, such as resetting margins, paddings, and font properties.

### 3.1. Setting Global Variables

Before we start the reset, let's set some global variables that we can use throughout our SCSS reset:

```scss
// _variables.scss

$font-size-base: 16px;
$line-height-base: 1.6;
```

### 3.2. Creating the Reset

Next, we'll create our SCSS reset by defining styles for common HTML elements:

```scss
// _reset.scss

body {
  margin: 0;
  padding: 0;
  font-size: $font-size-base;
  line-height: $line-height-base;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
  padding: 0;
}
```

### 3.3. Importing the Reset

Finally, we'll import our SCSS reset into our main stylesheet:

```scss
// main.scss

@import 'variables';
@import 'reset';

// Your other styles go here
```

With this setup, our CSS reset is ready to be used in any web project

. By importing the reset into our main stylesheet, we ensure that the reset styles are applied to all HTML elements.

## 4. Conclusion

In this chapter, we explored the world of SCSS and CSS reset. CSS reset is a crucial technique to ensure consistent styles across different browsers, and SCSS can greatly enhance the process of creating and managing a CSS reset. With the power of variables, nesting, mixins, and partials, SCSS allows us to write cleaner and more maintainable code.

By building a custom SCSS reset, we can take full control of our styles and ensure a solid foundation for our web projects. As we move forward in this journey of SCSS, we'll discover even more powerful features that will revolutionize the way we write CSS.

In the next chapter, we'll explore advanced SCSS techniques and dive deeper into the world of mixins, functions, and more. Get ready to level up your SCSS skills!