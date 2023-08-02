# Chapter 10: Server-Side Rendering (SSR) with Vue.js

Server-Side Rendering (SSR) is a powerful technique in modern web development that brings several advantages to Vue.js applications. SSR allows the server to pre-render the web page before sending it to the client, resulting in improved performance, search engine optimization (SEO), and better user experience. In this chapter, we will explore the concept of SSR, its benefits, and how to implement SSR in Vue.js applications with practical examples.

## Understanding Server-Side Rendering (SSR)

Traditionally, front-end applications are built as Single-Page Applications (SPAs), where the rendering of content is done entirely on the client-side using JavaScript. While SPAs offer a smooth and dynamic user experience, they have some limitations, such as slower initial loading times and poor SEO performance.

SSR, on the other hand, renders the web page on the server-side and sends the fully-rendered HTML to the client. This means that the client receives a complete web page from the server, ready to be displayed, without the need to wait for JavaScript to load and render the content.

### Benefits of SSR

SSR provides several benefits to Vue.js applications:

1. **Improved Performance**: With SSR, the initial page load is significantly faster, as the server sends a fully-rendered HTML page. This results in reduced time-to-interactivity and a smoother user experience.

2. **SEO-Friendly**: Search engines can easily crawl and index SSR pages, as the content is available in the HTML. This improves the discoverability and ranking of your Vue.js application in search engine results.

3. **Accessibility**: SSR improves accessibility by delivering the content directly to the client, making it accessible to users who may have limited or no JavaScript support.

4. **Reduced Server Load**: SSR offloads some of the rendering tasks to the server, reducing the load on the client-side and enabling better performance on less powerful devices.

5. **Social Media Sharing**: SSR ensures that the content is available in the initial HTML, making it easier for social media platforms to display a preview when shared.

## Implementing SSR in Vue.js

Vue.js provides built-in support for SSR using the Vue Server Renderer (VSR). To implement SSR, we need to configure our Vue.js application for server-side rendering and create the necessary server-side entry point.

### Prerequisites

Before proceeding, ensure that you have a basic understanding of Vue.js, Node.js, and npm (Node Package Manager) installed on your machine.

### Setting Up a Vue.js Project with SSR

To set up a Vue.js project with SSR, we can use the Vue CLI to scaffold a new project:

1. Install the Vue CLI globally (if not already installed):

```bash
npm install -g @vue/cli
```

2. Create a new Vue.js project with SSR support:

```bash
vue create my-ssr-app
```

During the project creation process, select "Manually select features" and choose "Server-side rendering (SSR)" as one of the features to include.

### Project Structure

After creating the project, the directory structure will include a new folder named `src`, which contains the client and server entry points:

```
my-ssr-app/
|-- src/
|   |-- client/
|   |   |-- entry-client.js
|   |-- server/
|   |   |-- entry-server.js
```

The `entry-client.js` file is the entry point for the client-side rendering, while the `entry-server.js` file is the entry point for the server-side rendering.

### Building the Vue.js Application

Before we can perform SSR, we need to build the Vue.js application:

```bash
npm run build
```

The build process generates the necessary files for both the client and server.

### Creating the Server

To enable SSR, we need to create a server to handle the rendering and serve the SSR-enabled Vue.js application.

1. Install the required dependencies for the server:

```bash
npm install express vue-server-renderer
```

2. Create a new file named `server.js` in the root directory of the project:

```js
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

app.get('*', (req, res) => {
  const context = { url: req.url };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error(err);
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
      return;
    }
    res.end(html);
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
```

In this server file, we create an express server and use the `vue-server-renderer` to create a bundle renderer. The `createBundleRenderer` function takes the server-side bundle, the HTML template, and the client-side manifest as parameters.

### Running the SSR Server

To run the SSR server, use the following command:

```bash
node server.js
```

The server will be accessible at `http://localhost:3000` by default.

## Conclusion

Server-Side Rendering (SSR) is a powerful technique that improves the performance, SEO, and user experience of Vue.js applications. By rendering the web page on the server-side and sending the fully-rendered HTML to the client, SSR enhances the initial loading time and ensures that search engines can easily crawl and index the application's content.

In this chapter, we explored the concept of SSR, its benefits, and how to implement SSR in Vue.js applications using the Vue Server Renderer (VSR) and express.js. We learned how to configure the project for SSR, build the Vue.js application, and create a server to handle SSR.

With SSR, Vue.js applications can achieve better performance and SEO, making them more accessible and user-friendly.

In the next chapter, we will delve into optimizing Vue.js applications for performance with code splitting and lazy loading.