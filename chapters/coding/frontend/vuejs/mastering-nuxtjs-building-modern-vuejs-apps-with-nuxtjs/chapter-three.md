# Chapter 3: Nuxt.js Pages and Routing

In this chapter, we will delve into the core of Nuxt.js - its powerful page and routing system. Understanding how Nuxt.js handles pages and routes is crucial for building efficient and scalable applications. We will explore the `pages` directory, dynamic routes, nested routes, and how to customize the routing behavior to suit your project's needs.

## The Pages Directory

In Nuxt.js, the `pages` directory plays a central role in defining the structure of your application. Each file in this directory corresponds to a specific route in your application. Nuxt.js uses a file-based routing system, which simplifies the process of creating pages and handling routes.

Let's start by creating a basic page in our Nuxt.js application:

1. Create a new file named `about.vue` in the `pages` directory.

```html
<!-- pages/about.vue -->
<template>
  <div>
    <h1>About Us</h1>
    <p>Welcome to our Nuxt.js blog!</p>
  </div>
</template>
```

With just this simple file, we've created an `/about` route in our Nuxt.js application. Nuxt.js automatically maps the filename to the route URL, making it incredibly straightforward to create pages.

## Dynamic Routes

Often, you may need to create routes with dynamic segments. Nuxt.js makes this easy with its dynamic routes feature. To create a dynamic route, use square brackets `[]` in the filename to indicate the dynamic segment.

For example, let's create a dynamic route for individual blog posts:

1. Create a new file named `[postId].vue` in the `pages` directory.

```html
<!-- pages/[postId].vue -->
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="post.content"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    // Fetch the blog post data based on postId
    const post = await fetchPost(params.postId);
    return { post };
  }
}
</script>
```

With this setup, Nuxt.js will match URLs like `/1`, `/2`, and so on, and pass the `postId` as a parameter to the component. This enables us to create dynamic pages that display content based on the URL parameter.

## Nested Routes

Nuxt.js also supports nested routes, allowing you to create complex page structures. Nested routes are useful when building applications with multiple layers of content.

For example, let's create a nested route for blog categories:

1. Create a new directory named `blog` inside the `pages` directory.

2. Inside the `blog` directory, create a new file named `[category].vue`.

```html
<!-- pages/blog/[category].vue -->
<template>
  <div>
    <h1>{{ category | capitalize }} Blog</h1>
    <ul>
      <li v-for="post in blogPosts" :key="post.id">
        <nuxt-link :to="`/blog/${category}/${post.id}`">{{ post.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    // Fetch blog posts based on category
    const blogPosts = await fetchPostsByCategory(params.category);
    return { category: params.category, blogPosts };
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}
</script>
```

In this example, we have a dynamic route for the `/blog/[category]` route, where `category` is a dynamic parameter. Each category page displays a list of blog posts related to that category.

## Navigating Between Pages

Nuxt.js provides an easy way to navigate between pages using the `<nuxt-link>` component. It automatically generates the appropriate URLs based on the defined routes.

```html
<template>
  <div>
    <h1>Welcome to our Nuxt.js Blog</h1>
    <p>Check out our <nuxt-link to="/about">About</nuxt-link> page.</p>
    <p>Explore our <nuxt-link to="/blog">Blog</nuxt-link> for exciting content.</p>
  </div>
</template>
```

Using `<nuxt-link>`, you can create links to any page in your Nuxt.js application without worrying about the exact URLs.

## Customizing Routes

While Nuxt.js follows a file-based routing system, you can customize routes further using the `nuxt.config.js` file. This allows you to have more control over your application's routes.

1. Create a `nuxt.config.js` file in the root of your project if it doesn't exist.

2. Inside the `nuxt.config.js`, you can use the `router.extendRoutes` method to add custom routes.

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      // Add a custom route
      routes.push({
        name: 'custom-route',
        path: '/custom',
        component: resolve(__dirname, 'pages/custom.vue')
      });
    }
  }
}
```

With this configuration, Nuxt.js will include the custom route `/custom` in your application.

## Conclusion

In this chapter, we explored the powerful page and routing system of Nuxt.js. We learned how to create basic pages using the file-based routing approach and handle dynamic and nested routes. We also saw how to navigate between pages using `<nuxt-link>` components. Moreover, customizing routes using the `nuxt.config.js` file gives us greater flexibility in defining the structure of our application.

By understanding the pages and routing system of Nuxt.js, you are now equipped with the knowledge to create complex applications with ease. With the power of dynamic routes and nested structures, you can build sophisticated user interfaces and manage complex content structures efficiently.