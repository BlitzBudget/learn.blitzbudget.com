# Chapter 7: Vue.js Routing

Routing is a crucial aspect of modern web development that allows users to navigate between different pages or views within a single-page application (SPA). In Vue.js, routing is made easy with the Vue Router, a powerful official router that enables us to create dynamic and responsive applications with multiple views. In this chapter, we will explore Vue.js routing and learn how to implement client-side navigation to enhance the user experience.

## Understanding Vue Router

Vue Router is the official routing library for Vue.js applications. It provides a seamless and flexible way to handle client-side navigation in SPAs. Vue Router allows us to define routes and associate them with specific components, enabling us to render different components based on the current URL.

### Setting Up Vue Router

To use Vue Router in our Vue.js application, we need to install it and configure the router instance.

1. Install Vue Router using npm or yarn:

```bash
npm install vue-router
```

2. In the main entry file (e.g., `main.js`), import and use Vue Router:

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

// Import your components
import Home from './components/Home.vue';
import About from './components/About.vue';
// ... Add more components as needed

// Use Vue Router
Vue.use(VueRouter);

// Define your routes
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // ... Add more routes as needed
];

// Create the router instance
const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```

In this setup, we import the necessary components and define the routes in an array. Each route object contains a `path` and a `component`, where the `path` represents the URL and the `component` is the Vue component to render when the URL matches the path.

## Navigating Between Routes

Vue Router provides several ways to navigate between routes in our application. We can use the `<router-link>` component or the router's instance methods to trigger navigation.

### Using `<router-link>`

The `<router-link>` component is a built-in component in Vue Router that renders an anchor tag (`<a>`) with a `to` prop. When clicked, it changes the URL to the specified route, triggering a navigation.

```vue
<template>
  <div>
    <!-- Navigate to the Home route -->
    <router-link to="/">Home</router-link>
    <!-- Navigate to the About route -->
    <router-link to="/about">About</router-link>
  </div>
</template>
```

### Using Router Instance Methods

In addition to `<router-link>`, Vue Router provides two instance methods, `push` and `replace`, to programmatically trigger navigation.

```js
// In a Vue component method
methods: {
  navigateToHome() {
    // Programmatically navigate to the Home route
    this.$router.push('/');
  },
},
```

## Dynamic Routing and Route Parameters

Sometimes, we need to pass dynamic data to a route, such as an ID or a username. Vue Router allows us to define dynamic segments in the route path using placeholders.

```js
// Define a dynamic route with a parameter
const routes = [
  { path: '/user/:id', component: User },
];
```

In this example, the `:id` segment in the path is a dynamic parameter that can match any value. We can access the value of the parameter in the component using `this.$route.params.id`.

## Route Guards

Route guards are functions that allow us to control navigation by either allowing or preventing it based on certain conditions. Vue Router provides three types of route guards: `beforeEach`, `beforeResolve`, and `afterEach`.

### Example: Using `beforeEach` Route Guard

```js
// Add a global beforeEach route guard
router.beforeEach((to, from, next) => {
  // Check if the user is authenticated
  if (isLoggedIn()) {
    // Allow navigation to the next route
    next();
  } else {
    // Redirect to the login page if not authenticated
    next('/login');
  }
});
```

In this example, we use a global `beforeEach` route guard to check if the user is authenticated before navigating to any route. If the user is authenticated, the navigation proceeds as usual using `next()`. Otherwise, we redirect the user to the login page.

## Nested Routes

Vue Router also supports nested routes, allowing us to create complex layouts with nested components. Nested routes are useful for creating hierarchical views or layouts.

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      { path: 'profile', component: Profile },
      { path: 'posts', component: UserPosts },
    ],
  },
];
```

In this example, the `User` component serves as a layout for the nested components `Profile` and `UserPosts`. The nested components will be rendered inside the `<router-view>` of the `User` component when the corresponding routes are matched.

## Lazy Loading Routes

In large applications with many routes and components, it's a good practice to lazy load the routes to improve the initial loading time. Lazy loading only loads the required components when the corresponding route is accessed.

```js
const routes = [
  { path: '/', component: () => import('./components/Home.vue') },
  // ...
];
```

In this example, we use a function that returns the `import()` statement to lazily load the `Home` component. This prevents loading the `Home` component until the corresponding route is accessed.

## Conclusion

Vue.js routing with Vue Router allows us to create dynamic and interactive applications with smooth navigation between different views. In this chapter, we explored the basics of Vue Router, including how to set it up, navigate between routes using `<router-link>` and router instance methods, and handle dynamic routing with route parameters.

We also learned about route guards for controlling navigation based on certain conditions, as well as nested routes for creating complex layouts with multiple views.

With Vue.js routing, we can create robust and user-friendly SPAs that deliver a seamless and engaging user experience.

In the next chapter, we will delve into Vue.js state management with Vuex, a powerful library for managing the application's state and data flow.
