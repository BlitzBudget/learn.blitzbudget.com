# Chapter 7: Navigation with Bootstrap

In this chapter, we will explore the Navigation components of Bootstrap. Navigation is a critical element of web design that allows users to move between different sections of a website or access various functionalities. Bootstrap provides a variety of navigation styles and components to create responsive, user-friendly, and visually appealing navigation menus for your web projects.

## Introduction to Bootstrap Navigation

Navigation plays a pivotal role in helping users explore and interact with a website. It provides a roadmap for users to access different sections or pages and is an essential element for enhancing user experience and usability.

Bootstrap offers a range of navigation components and styles that can be easily customized and adapted to suit the design requirements of your website. From simple navigation bars to responsive mobile menus, Bootstrap provides the tools to create intuitive and user-friendly navigation systems.

## Creating a Basic Navigation Bar

A common navigation element in web design is the navigation bar, which typically appears at the top of the page and contains links to different sections or pages of the website.

To create a basic navigation bar in Bootstrap, you can use the `.navbar` class along with the `.navbar-nav` and `.nav-item` classes.

```html
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
```

In this example, we've created a basic navigation bar using the `.navbar` class. The `.navbar-expand-lg` class makes the navigation bar expandable for large screens, and the `.navbar-light bg-light` classes define the light color theme for the navigation bar.

The navigation bar contains a brand link (`<a class="navbar-brand">`) on the left side, and a collapsible navigation menu on the right side. The collapsible menu is triggered by a hamburger icon (`<button class="navbar-toggler">`), which appears on smaller screens.

## Dropdown Menus

Dropdown menus are commonly used to organize navigation links that belong to a particular category or section. Bootstrap provides a straightforward way to create dropdown menus within the navigation bar.

```html
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
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Services
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Web Design</a>
                        <a class="dropdown-item" href="#">Graphic Design</a>
                        <a class="dropdown-item" href="#">Digital Marketing</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

In this example, we've added a dropdown menu under the "Services" link. The `.dropdown` class is added to the `<li>` element to indicate that it contains a dropdown menu. The `.dropdown-toggle` class is applied to the "Services" link to make it trigger the dropdown when clicked.

The actual dropdown menu is defined inside a `<div>` with the `.dropdown-menu` class. Each menu item is created using the `.dropdown-item` class.

## Mobile-Friendly Navigation

Bootstrap's navigation components are designed to be mobile-friendly and responsive. On smaller screens, the navigation bar automatically collapses into a mobile menu, making it easier for users to navigate on their smartphones or tablets.

The collapsible mobile menu is achieved using the `.navbar-toggler` class and the data attributes `data-bs-toggle="collapse"` and `data-bs-target="#navbarNav"`. When the hamburger icon is clicked, the navigation links are hidden by default and become visible in a dropdown format.

## Styling the Active Page

In many cases, you may want to highlight the active page or section in the navigation bar to provide visual feedback to users. Bootstrap provides a simple way to do this using JavaScript and the `.active` class.

```html
<script>
    // Get the current page URL
    var currentUrl = window.location.href;

    // Select all navigation links
    var navLinks = document.querySelectorAll(".nav-link");

    // Loop through each link and check if its href matches the current URL
    navLinks.forEach(function (link) {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });
</script>
```

In this example, we use JavaScript to compare the `href` of each navigation link with the current page URL. If there is a match, we add the `.active` class to the link, which will apply the active state style to the active page.

## Sticky Navigation Bar

You can make the navigation bar sticky, so it remains at the top of the screen even when the user scrolls down the page. This is achieved using the `.fixed-top` class.

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <!-- Navigation content -->
</nav>
```

The `.fixed-top` class keeps the navigation bar fixed at the top of the viewport, providing easy access to navigation options regardless of the user's scrolling position.

## Conclusion

In this chapter, we explored the Navigation components of Bootstrap. We learned how to create a basic navigation bar with links and dropdown menus. We also saw how Bootstrap makes it easy to create mobile-friendly and responsive navigation systems for your web projects.

Navigation is a critical element of any website, and Bootstrap's navigation styles and components help you create intuitive and user-friendly navigation menus that enhance the overall user experience. Whether you need a simple navigation bar or a more

 complex navigation system with dropdowns and mobile responsiveness, Bootstrap has you covered.

In the next chapter, we will dive into Bootstrap's Forms components, including form elements, form layouts, and form validation. Join us in Chapter 8: Bootstrap Forms: Building User Input Interfaces!