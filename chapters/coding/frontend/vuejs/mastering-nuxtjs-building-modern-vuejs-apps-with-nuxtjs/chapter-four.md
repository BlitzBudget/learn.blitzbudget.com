# Chapter 4: Nuxt.js Components

In this chapter, we will explore the fundamental concept of components in Nuxt.js. Components play a crucial role in building reusable and modular user interfaces. We'll dive into how to create, use, and manage components effectively. Throughout this chapter, we will cover various aspects of Nuxt.js components with practical examples to solidify your understanding.

## Understanding Components in Nuxt.js

In Nuxt.js, components are reusable and self-contained building blocks of a user interface. They are an integral part of Vue.js, upon which Nuxt.js is built. Components allow you to encapsulate HTML, CSS, and JavaScript code, making your codebase more maintainable and organized. They promote a structured approach to building UI elements and facilitate code reuse, a key aspect of any robust application.

Let's begin by creating a simple component in Nuxt.js:

1. Create a new directory named `components` inside the `src` directory.

2. Inside the `components` directory, create a new file named `Button.vue`.

```html
<!-- src/components/Button.vue -->
<template>
  <button @click="onClick" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary'].includes(value)
    }
  },
  computed: {
    buttonClass() {
      return `btn btn-${this.type}`;
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>

<style>
/* Styles for the Button component */
.btn {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.btn-default {
  background-color: #f0f0f0;
  color: #333;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}
</style>
```

In this example, we've created a simple `Button` component that accepts a `type` prop to determine its appearance. The component emits a `click` event when clicked. The `slot` element allows us to provide custom content for the button, such as text or icons.

## Using Components in Pages

Now that we have our `Button` component, let's use it in a Nuxt.js page:

1. Open an existing page or create a new one in the `pages` directory.

2. Import the `Button` component at the top of the page.

```html
<template>
  <div>
    <h1>Using Components in Nuxt.js</h1>
    <Button type="primary" @click="onButtonClick">Click Me!</Button>
  </div>
</template>

<script>
import Button from '~/components/Button.vue';

export default {
  components: {
    Button
  },
  methods: {
    onButtonClick() {
      alert('Button clicked!');
    }
  }
}
</script>
```

In this example, we import the `Button` component and register it as a local component within the page using the `components` option. We can now use the `Button` component like any other HTML element within the page.

## Global Components

While local components are useful for specific pages, there are scenarios where you want to use a component across multiple pages in your application. For this purpose, Nuxt.js allows you to register global components.

To register a global component, simply create a `components` directory in the root of your project and place your components inside it. Nuxt.js will automatically recognize these components as global and make them available throughout your application.

## Passing Data to Components

Components can receive data through `props`, which are custom attributes you define on the component's tag. Props allow you to pass data from the parent component (page) to the child component (the component itself). Let's enhance our `Button` component to accept a custom label through props:

```html
<!-- src/components/Button.vue -->
<template>
  <button @click="onClick" :class="buttonClass">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary'].includes(value)
    },
    label: {
      type: String,
      default: 'Click Me'
    }
  },
  computed: {
    buttonClass() {
      return `btn btn-${this.type}`;
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>
```

With this change, the `Button` component now accepts a `label` prop, which defaults to "Click Me." We can customize the button label when using the component on a page:

```html
<template>
  <div>
    <h1>Passing Data to Components</h1>
    <Button type="primary" :label="buttonLabel" @click="onButtonClick" />
  </div>
</template>

<script>
import Button from '~/components/Button.vue';

export default {
  components: {
    Button
  },
  data() {
    return {
      buttonLabel: 'Submit'
    };
  },
  methods: {
    onButtonClick() {
      alert('Button clicked!');
    }
  }
}
</script>
```

In this example, we pass a custom label "Submit" to the `Button` component using the `label` prop.

## Scoped Styles

In Nuxt.js, you can use scoped styles within components to prevent CSS conflicts. Scoped styles ensure that the styles defined within a component only apply to elements within that component.

To use scoped styles, add a `<style>` section to your component and use the `scoped` attribute:

```html
<!-- src/components/Button.vue -->
<template>
  <button @click="onClick" :class="buttonClass">
    {{ label }}
  </button>
</template>

<script>
export default {
  // ...
}
</script>

<style scoped>
/* Scoped styles for the Button component */
button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.btn-default {
  background-color: #f0f0f0;
  color: #333;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}
</style>
```

With scoped styles, the styles defined in the `<style>` section will only affect the elements within the `Button` component and will not leak out to other parts of the application.

## Dynamic Components

In some scenarios, you may need to render different components based on certain conditions. Nuxt.js supports dynamic components that allow you to do just that.

For example, let's create two different components, `Hello.vue`, and `Goodbye.vue`, and conditionally render them based on a variable in our page:

```html
<template>
  <div>
    <h1>Dynamic Components</h1>
    <component :is="componentName" />
    <button @click="toggleComponent">Toggle

 Component</button>
  </div>
</template>

<script>
import Hello from '~/components/Hello.vue';
import Goodbye from '~/components/Goodbye.vue';

export default {
  components: {
    Hello,
    Goodbye
  },
  data() {
    return {
      componentName: 'Hello'
    };
  },
  methods: {
    toggleComponent() {
      this.componentName = this.componentName === 'Hello' ? 'Goodbye' : 'Hello';
    }
  }
}
</script>
```

In this example, we use the `component` element with a `:is` attribute to dynamically render either the `Hello` component or the `Goodbye` component based on the value of the `componentName` variable.

## Conclusion

In this chapter, we delved into the world of Nuxt.js components, a fundamental concept in building modern and maintainable web applications. We learned how to create components, pass data using `props`, and use scoped styles to prevent CSS conflicts. Additionally, we explored the concept of dynamic components, enabling us to conditionally render different components based on specific conditions.

By mastering Nuxt.js components, you are well-equipped to build complex and feature-rich applications while maintaining a clean and modular codebase. Components provide the building blocks for creating reusable UI elements, making your development process more efficient and productive.
