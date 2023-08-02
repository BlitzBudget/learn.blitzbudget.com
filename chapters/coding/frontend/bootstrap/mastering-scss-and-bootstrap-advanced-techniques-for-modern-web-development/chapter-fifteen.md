# Chapter 15: SCSS Typography and Font Styling

In this chapter, we will dive deep into typography and font styling in SCSS. Typography is a crucial aspect of web design as it plays a significant role in readability, user experience, and overall aesthetics. With SCSS, we have powerful tools at our disposal to create beautiful and consistent typography across our web projects.

## 1. Introduction to Typography

Typography refers to the arrangement and styling of text on a web page. It includes various aspects such as font selection, font size, line height, letter spacing, and text alignment. A well-designed typography can greatly enhance the readability and legibility of content, making it easier for users to consume the information on the page.

In SCSS, we can use variables and mixins to define typography styles and apply them consistently throughout our project. Let's get started by setting up a basic typography system.

## 2. Setting up Typography Variables

To get started with typography in SCSS, we will define a set of variables for font families, font sizes, line heights, and other typographic properties. This will allow us to easily change the typography styles for the entire project by modifying these variables.

```scss
// _variables.scss
$base-font-family: 'Arial', sans-serif;
$base-font-size: 16px;
$line-height: 1.5;
```

In this example, we set the base font family to Arial and the base font size to 16 pixels. The line height is set to 1.5, which means the line spacing will be 1.5 times the font size.

## 3. Creating Font Mixins

Now that we have our typography variables defined, let's create some mixins to apply typography styles to different elements. Mixins are reusable blocks of code that can be included in other styles. This will allow us to easily apply typography styles to various elements without repeating the same code.

```scss
// _typography.scss
@mixin base-typography {
  font-family: $base-font-family;
  font-size: $base-font-size;
  line-height: $line-height;
}

@mixin heading-typography($font-size, $line-height) {
  font-family: $base-font-family;
  font-size: $font-size;
  line-height: $line-height;
  font-weight: bold;
}

@mixin link-typography {
  color: blue;
  text-decoration: underline;
}
```

In this example, we created three mixins: `base-typography`, `heading-typography`, and `link-typography`. The `base-typography` mixin sets the base font family, font size, and line height. The `heading-typography` mixin takes arguments for font size and line height to apply different styles for different heading levels. The `link-typography` mixin sets the color to blue and adds an underline to links.

## 4. Applying Typography Styles

With our typography variables and mixins ready, let's apply them to different elements in our web page.

```scss
// main.scss
@import 'variables';
@import 'typography';

body {
  @include base-typography;
}

h1 {
  @include heading-typography(28px, 1.2);
}

h2 {
  @include heading-typography(24px, 1.3);
}

a {
  @include link-typography;
}
```

In this example, we applied the `base-typography` mixin to the `body` element to set the default typography for the entire page. We also applied the `heading-typography` mixin to `h1` and `h2` elements to style the headings with different font sizes and line heights. Lastly, we applied the `link-typography` mixin to anchor (`a`) elements to style links with the specified color and underline.

## 5. Creating Responsive Typography

Responsive typography is essential to ensure that text remains legible and visually appealing on different screen sizes and devices. With SCSS, we can easily implement responsive typography using media queries.

```scss
// main.scss
@import 'variables';
@import 'typography';

body {
  @include base-typography;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
}

h1 {
  @include heading-typography(28px, 1.2);

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
}

h2 {
  @include heading-typography(24px, 1.3);

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
}
```

In this example, we added media queries to adjust the font size for the `body`, `h1`, and `h2` elements when the screen width is less than or equal to 768 pixels. This ensures that the typography adapts to smaller screen sizes, providing a better user experience on mobile devices.

## 6. Creating Custom Typography Themes

SCSS allows us to create custom typography themes easily. Let's define a dark theme with different font styles.

```scss
// _dark-theme.scss
$base-font-family: 'Helvetica', sans-serif

;
$base-font-size: 18px;
$line-height: 1.6;

@mixin link-typography {
  color: #ff7f50;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
```

In this example, we created a `_dark-theme.scss` file with custom typography styles. We changed the base font family to Helvetica and increased the base font size. We also customized the link typography with a different color and underline on hover.

To apply this dark theme, we need to import it after the main styles.

```scss
// main.scss
@import 'variables';
@import 'typography';
@import 'dark-theme';

body {
  @include base-typography;
}

h1 {
  @include heading-typography(28px, 1.2);
}

h2 {
  @include heading-typography(24px, 1.3);
}

a {
  @include link-typography;
}
```

With this setup, the `body`, `h1`, and `h2` elements will use the default typography styles, while the links will use the custom link typography defined in the `_dark-theme.scss` file.

## 7. Customizing Font Families

In addition to customizing font sizes and line heights, you can also use different font families in your typography. You can import custom fonts from external sources or use system fonts available on the user's device.

```scss
// _custom-font.scss
$custom-font-family: 'Montserrat', sans-serif;

@mixin custom-typography {
  font-family: $custom-font-family;
  font-size: 20px;
  line-height: 1.5;
}
```

In this example, we defined a `_custom-font.scss` file with a custom font family called Montserrat. We then created a `custom-typography` mixin that applies this custom font family with a font size of 20 pixels and a line height of 1.5.

To use this custom typography, we need to import the `_custom-font.scss` file and apply the `custom-typography` mixin to the desired elements.

```scss
// main.scss
@import 'variables';
@import 'typography';
@import 'custom-font';

body {
  @include base-typography;
}

h1 {
  @include custom-typography;
}

h2 {
  @include custom-typography;
}

a {
  @include link-typography;
}
```

With this setup, the `h1` and `h2` elements will use the Montserrat font, while the `body` and links will use the default styles defined in the `base-typography` and `link-typography` mixins.

## 8. Conclusion

In this chapter, we explored typography and font styling in SCSS. We learned how to set up typography variables, create mixins for different typography styles, and apply them to various elements in our web page. We also looked at responsive typography and how to create custom typography themes.

Typography is a fundamental aspect of web design, and with SCSS, we have powerful tools to create beautiful and readable text on our web pages. By using variables, mixins, and media queries, we can easily customize and adapt typography to suit different devices and design requirements. With the knowledge gained from this chapter, you can now confidently create visually appealing and well-organized typography in your web projects. Happy styling!