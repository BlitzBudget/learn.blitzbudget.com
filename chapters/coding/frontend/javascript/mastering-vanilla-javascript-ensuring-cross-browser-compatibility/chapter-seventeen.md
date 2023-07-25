# Chapter 17: Accessibility with Vanilla JavaScript

Accessibility is a crucial aspect of web development, ensuring that web content is inclusive and can be accessed by all users, including those with disabilities. Web accessibility aims to provide equal access and usability to people with diverse abilities, such as visual impairments, hearing impairments, motor disabilities, and cognitive disabilities.

In this chapter, we will explore techniques to improve accessibility using Vanilla JavaScript. We will cover various accessibility features, including keyboard navigation, focus management, ARIA roles, and more. By implementing these techniques, we can create web applications that are accessible and usable for all users.

## Why Accessibility Matters

Web accessibility is essential for several reasons:

1. **Inclusivity**: Accessibility ensures that everyone, regardless of their abilities, can access and use web content. It empowers individuals with disabilities to participate fully in digital experiences.

2. **Legal Compliance**: Many countries have laws and regulations that require websites to be accessible. By adhering to accessibility guidelines, you can avoid legal issues and potential penalties.

3. **Improved User Experience**: Accessible websites are typically more user-friendly for all users, not just those with disabilities. Clear navigation and well-structured content benefit everyone.

4. **Search Engine Optimization (SEO)**: Accessibility features can improve the SEO of a website by providing search engines with well-structured content and relevant information.

5. **Business Benefits**: An accessible website can expand your potential audience, attract more users, and increase customer loyalty.

## Keyboard Navigation

One of the fundamental principles of accessibility is ensuring that all functionality is operable through a keyboard. Many users with disabilities rely on keyboard navigation to interact with web content.

### Managing Focus

Managing focus is crucial for keyboard navigation. When users navigate through a page using the Tab key, the focus should move logically and predictably from one interactive element to another.

Let's create an example of managing focus when navigating through a list of items using the arrow keys:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyboard Navigation Example</title>
</head>
<body>
  <h1>Keyboard Navigation Example</h1>
  <ul id="itemList" tabindex="0">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
  </ul>

  <script>
    const itemList = document.getElementById('itemList');
    const items = Array.from(itemList.children);
    let focusIndex = -1;

    itemList.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        focusIndex = (focusIndex + 1) % items.length;
        items[focusIndex].focus();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        focusIndex = (focusIndex - 1 + items.length) % items.length;
        items[focusIndex].focus();
      }
    });

    items.forEach((item, index) => {
      item.addEventListener('focus', () => {
        focusIndex = index;
      });
    });
  </script>
</body>
</html>
```

In this example, we add keyboard navigation to a list of items. The `tabindex` attribute of the `ul` element allows it to receive focus. We use JavaScript to handle keyboard events and move the focus accordingly using the Arrow keys. When an item gains focus, we keep track of its index in the `focusIndex` variable.

## ARIA Roles and Attributes

The Accessible Rich Internet Applications (ARIA) specification provides additional attributes and roles that can be used to enhance the accessibility of web content. ARIA roles describe the type of element, while ARIA attributes provide additional information.

### Role="button"

Let's create an example of using the `role="button"` attribute to make a `div` element function like a button:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARIA Role="button" Example</title>
</head>
<body>
  <h1>ARIA Role="button" Example</h1>
  <div
    role="button"
    tabindex="0"
    onclick="alert('Button clicked!')"
    onkeyup="handleButtonKeyPress(event)"
  >
    Click me!
  </div>

  <script>
    function handleButtonKeyPress(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.target.click();
      }
    }
  </script>


</body>
</html>
```

In this example, we have a `div` element that behaves like a button. We assign the `role="button"` attribute to indicate its purpose. The `tabindex="0"` attribute allows it to receive keyboard focus. When the element is clicked or the Enter key is pressed, an alert is triggered.

## Semantic HTML

Using semantic HTML elements is fundamental to web accessibility. Semantic elements convey the correct meaning and structure of content to assistive technologies and search engines.

### Example: Semantic Form Markup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic Form Markup</title>
</head>
<body>
  <h1>Semantic Form Markup</h1>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>

    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

In this example, we use semantic HTML elements such as `form`, `label`, `input`, and `textarea` to create a simple form. The `for` attribute of the `label` elements associates them with the corresponding form fields for better accessibility. The `required` attribute indicates that the fields are mandatory.

## Screen Reader Compatibility

Screen readers are assistive technologies that read aloud the content of a web page, allowing users with visual impairments to access the information. Ensuring compatibility with screen readers is essential for web accessibility.

### Improving Screen Reader Readability

For better screen reader readability, we can use ARIA attributes and roles to provide additional context and descriptions for elements.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Screen Reader Compatibility Example</title>
</head>
<body>
  <h1>Screen Reader Compatibility Example</h1>
  <div role="region" aria-label="Announcement">
    <p>New feature: We now offer free shipping on all orders over $50!</p>
  </div>
</body>
</html>
```

In this example, we use the `role="region"` attribute to indicate that the `div` element represents an announcement section. The `aria-label` attribute provides a descriptive label for the region, which the screen reader reads aloud to the user.

## Testing with Assistive Technologies

When implementing accessibility features, it's crucial to test them using assistive technologies to ensure they work as intended.

### Screen Reader Testing

To test with a screen reader, install a screen reader software on your device. Popular screen readers include:

- NVDA (NonVisual Desktop Access) for Windows
- VoiceOver for macOS and iOS
- TalkBack for Android

Use the screen reader to navigate through your web pages, interact with form fields, and check if the content is read aloud correctly.

### Keyboard Navigation Testing

Ensure that all interactive elements on your web page can be accessed and used solely through keyboard navigation. Test the Tab order, Arrow key navigation, and Enter/Space key interactions.

### Automated Testing Tools

Several automated testing tools are available to evaluate the accessibility of your web pages. Some widely used tools include:

- **Lighthouse**: Built into Google Chrome DevTools, Lighthouse provides an Accessibility audit to identify accessibility issues.
- **axe**: A JavaScript library for accessibility testing that can be integrated into automated testing workflows.

## Conclusion

Accessibility is not just a nice-to-have feature; it is a fundamental aspect of web development that ensures equal access to web content for all users. By using Vanilla JavaScript and implementing accessibility features like keyboard navigation, ARIA roles, semantic HTML, and compatibility with screen readers, we can create web applications that are usable and inclusive for everyone.

In this chapter, we explored techniques to improve accessibility using Vanilla JavaScript. By understanding the importance of accessibility and implementing these techniques, we can make the web a more inclusive and accessible place for all users, regardless of their abilities. Let's continue to strive for a web that leaves no one behind.