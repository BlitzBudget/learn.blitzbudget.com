# Chapter 2: Nuxt.js Project Setup

In this chapter, we will dive deep into setting up a Nuxt.js project from scratch. We'll cover the necessary prerequisites, project initialization, and explore various configurations to tailor the project according to your needs. By the end of this chapter, you'll have a solid understanding of the Nuxt.js project structure and be ready to start building powerful applications.

## Prerequisites

Before we begin, make sure you have the following tools installed on your system:

1. Node.js and npm: Nuxt.js requires Node.js and npm to be installed on your machine. You can download them from the official Node.js website.

2. Vue CLI: The Vue CLI is essential for quickly creating and managing Vue.js projects. You can install it globally using npm:

```bash
npm install -g @vue/cli
```

## Creating a New Nuxt.js Project

Now that we have the necessary tools, let's create a new Nuxt.js project.

### Step 1: Using Vue CLI

Open your terminal or command prompt and execute the following command to create a new Nuxt.js project:

```bash
vue create my-nuxt-project
```

The Vue CLI will prompt you to select a preset. Choose the default preset for a quick setup, or manually select features based on your project requirements.

### Step 2: Project Initialization

Once the project is created, navigate to the project directory:

```bash
cd my-nuxt-project
```

Now, start the development server:

```bash
npm run dev
```

Your Nuxt.js project is now up and running!

## Nuxt.js Project Structure

Understanding the project structure is crucial for organizing your code and assets effectively. Let's explore the key directories and files in a Nuxt.js project:

1. `assets`: This directory contains static assets such as images, fonts, and stylesheets. Place your CSS and other static files here.

2. `components`: Here, you can store reusable Vue components that can be used throughout your application.

3. `layouts`: This directory houses layout components that structure the overall design of your pages. You can have multiple layout files for different page templates.

4. `pages`: The `pages` directory is a critical aspect of Nuxt.js. Each `.vue` file in this directory represents a route of your application. Nuxt.js automatically generates routes based on the files in this directory.

5. `plugins`: Use this directory to store Vue plugins that you want to use in your application. Plugins allow you to add global functionality to your app.

6. `store`: In Nuxt.js, the `store` directory is used for Vuex store management. Vuex is a state management pattern that helps manage the global state of your application.

## Customizing Nuxt.js Configurations

Nuxt.js allows you to customize various configurations to tailor the project to your specific needs. The primary configuration file is `nuxt.config.js`, located at the root of your project.

### Modifying Site Metadata

You can set site-wide metadata, such as the application title and description, in the `nuxt.config.js` file:

```js
export default {
  head: {
    title: 'My Nuxt.js Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My awesome Nuxt.js blog!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Other configurations...
}
```

### Adding Global CSS

To add global CSS to your Nuxt.js project, you can specify the file in the `css` option in `nuxt.config.js`:

```js
export default {
  css: [
    '@/assets/global.css'
  ],
  // Other configurations...
}
```

## Conclusion

In this chapter, we learned how to set up a new Nuxt.js project and explored the project structure. We also covered customizing Nuxt.js configurations to suit your project requirements. With this knowledge, you are now equipped to create powerful and scalable applications using Nuxt.js.