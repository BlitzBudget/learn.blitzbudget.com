# Chapter 11: Responsive Web Design with Vanilla JavaScript

In today's digital age, responsive web design has become a fundamental aspect of web development. With an increasing number of users accessing websites on various devices, from desktop computers to smartphones and tablets, it is essential to create web pages that adapt and provide an optimal user experience across different screen sizes and orientations. Responsive web design ensures that a website looks and functions seamlessly on all devices, eliminating the need for separate mobile versions or device-specific applications.

In this chapter, we will explore the concept of responsive web design and how we can achieve it using vanilla JavaScript. We will learn various techniques to create flexible and adaptive layouts, handle media queries, and manage responsive images. By the end of this chapter, you will have a comprehensive understanding of responsive web design principles and be able to implement them using plain JavaScript.

## Understanding Responsive Web Design

Responsive web design is an approach to web development that aims to provide an optimal viewing and interaction experience across a wide range of devices. It involves designing and coding websites in a way that allows the layout, images, and other elements to adjust dynamically based on the user's device screen size and orientation.

The three key components of responsive web design are:

1. Flexible Grids: Using fluid grid systems allows the content to adjust proportionally to the screen size, ensuring a consistent and visually appealing layout across various devices.

2. Fluid Images: Scaling images proportionally helps prevent them from being too large or too small on different screens. This ensures that images look sharp and load quickly regardless of the device.

3. Media Queries: Media queries are CSS rules that apply styles based on the device's characteristics, such as screen size, resolution, or orientation. They allow us to create different layouts for different devices, making the design more adaptive.

## Implementing Responsive Web Design with JavaScript

While CSS is the primary tool for building responsive layouts, JavaScript plays a crucial role in enhancing the responsiveness and interactivity of web pages. By using JavaScript, we can dynamically modify styles, handle events, and adjust the content based on the device's properties.

In this section, we will explore various JavaScript techniques to implement responsive web design:

### 1. Detecting Screen Size Changes

To create a responsive design, we need to detect changes in the screen size or orientation. JavaScript provides several ways to achieve this.

#### Window Resize Event

The `resize` event occurs whenever the browser window is resized. We can listen for this event and trigger functions accordingly to adjust the layout.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Web Design</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello, Responsive World!</h1>
  <p>This is a responsive paragraph.</p>
  <script src="app.js"></script>
</body>
</html>
```

```css
/* styles.css */
body {
  font-size: 16px;
}

/* Adjust font size on smaller screens */
@media screen and (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

```javascript
// app.js
function adjustFontSize() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    document.body.style.fontSize = '14px';
  } else {
    document.body.style.fontSize = '16px';
  }
}

window.addEventListener('resize', adjustFontSize);
```

In this example, we have a simple HTML page with a heading and a paragraph. In the `styles.css` file, we set the default font size to 16px. However, on smaller screens with a width of 768px or less, we want to reduce the font size to 14px.

In the `app.js` file, we have defined the `adjustFontSize` function that checks the current screen width using `window.innerWidth`. If the screen width is less than or equal to 768 pixels, it sets the font size to 14px; otherwise, it sets it to 16px. The `resize` event listener ensures that the font size is adjusted whenever the window is resized.

Using JavaScript in this manner allows us to dynamically modify styles based on the screen size, ensuring a better user experience on different devices.

### 2. Creating a Mobile Navigation Menu

One common responsive web design feature is the creation of a mobile-friendly navigation menu that adapts to different screen sizes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Navigation</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul id="navLinks">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <button id="toggleBtn">Menu</button>
  </header>
  <script src="app.js"></script>
</body>
</html>
```

```css
/* styles.css */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav li {
  margin-left: 1rem;
}

nav a {
  color: #fff;
  text-decoration: none;
}

/* Mobile navigation menu styles */
@media screen and (max-width: 768px) {
  #navLinks {
    display: none;
    flex-direction: column;
    align-items: center;
  }

  #navLinks li {
    margin: 0.5rem 0;
  }

  #toggleBtn {
    display: block;
  }
}
```

```javascript
// app.js
const toggleBtn = document.getElementById('toggleBtn');
const navLinks = document.getElementById('navLinks');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
```

In this example, we have a basic HTML structure with a header containing a navigation menu (`<nav>`) and a button (`<button>`) for toggling the mobile menu. The CSS styles in `styles.css` provide a simple navigation layout and define the styles for the mobile version using a media query for screen sizes of 768 pixels or less.

The JavaScript code in `app.js` handles the click event on the toggle button. When the button is clicked, it toggles the `show` class on the `navLinks` element, which causes the mobile navigation menu to appear or disappear.

By combining CSS media queries and JavaScript, we can create a mobile-friendly navigation menu that adapts to different screen sizes and enhances user experience on smaller devices.

### 3. Loading Different Images for Different Screen Sizes



Responsive web design involves serving appropriate images based on the user's device capabilities and screen size. This ensures that the website's performance is optimized, and images are not unnecessarily large, consuming more bandwidth than necessary.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Images</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <img src="default.jpg" alt="Default Image" id="responsiveImage">
  <script src="app.js"></script>
</body>
</html>
```

In this example, we have a simple HTML page with an `<img>` element that initially loads the `default.jpg` image. The goal is to replace this image with a different one when the screen size changes.

```css
/* styles.css */
#responsiveImage {
  width: 100%;
  max-width: 500px;
}
```

```javascript
// app.js
const responsiveImage = document.getElementById('responsiveImage');

function setResponsiveImage() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    responsiveImage.src = 'small.jpg';
  } else if (screenWidth <= 1024) {
    responsiveImage.src = 'medium.jpg';
  } else {
    responsiveImage.src = 'large.jpg';
  }
}

window.addEventListener('resize', setResponsiveImage);
```

In this JavaScript code, we have defined the `setResponsiveImage` function, which determines the appropriate image based on the current screen width using `window.innerWidth`. If the screen width is less than or equal to 768 pixels, it sets the `src` attribute of the `responsiveImage` to `small.jpg`. If the screen width is between 768 and 1024 pixels, it sets the `src` attribute to `medium.jpg`. For screen widths larger than 1024 pixels, it sets the `src` attribute to `large.jpg`.

The `resize` event listener ensures that the image is updated whenever the window is resized.

By dynamically loading different images based on screen size, we can significantly improve the performance and load times of our website, providing a smoother user experience across various devices.

## Conclusion

In this chapter, we explored the concept of responsive web design and how we can achieve it using vanilla JavaScript. We learned about flexible grids, fluid images, and media queries as the essential components of responsive web design. Additionally, we delved into various JavaScript techniques, such as detecting screen size changes, creating a mobile navigation menu, and loading different images for different screen sizes.

Responsive web design is crucial for ensuring that websites look great and function seamlessly on all devices, enhancing the overall user experience. By applying the principles and techniques covered in this chapter, you can create flexible and adaptive layouts that adapt to different screen sizes, orientations, and device capabilities.

Remember that responsive web design is an ongoing process, and testing your website on various devices and screen sizes is essential to identify and address any potential issues. With continuous improvement and optimization, you can build websites that cater to a diverse audience and provide a delightful user experience across the board. Happy coding!