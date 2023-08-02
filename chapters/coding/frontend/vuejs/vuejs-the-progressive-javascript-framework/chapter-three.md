# Chapter 3: Vue.js Components

In Chapter 2, we learned the basics of setting up a Vue.js project and creating a simple "Hello World" application. Now, it's time to take our Vue.js skills to the next level by diving into the world of Vue.js components. Components are the building blocks of Vue.js applications, allowing us to create reusable and self-contained UI elements. In this chapter, we will explore Vue.js components, their structure, and how to leverage them to build powerful and modular user interfaces.

## Understanding Vue.js Components

In Vue.js, a component is a self-contained unit that encapsulates its template, script, and styles into a single cohesive unit. This encapsulation promotes reusability, maintainability, and separation of concerns within your application. Think of components as custom HTML elements with additional functionalities.

A Vue.js component consists of three parts:

1. **Template:** The template contains the HTML markup that defines the component's structure and layout. It uses Vue's template syntax to bind data and display dynamic content.

2. **Script:** The script part defines the component's behavior and logic. It includes data properties, methods, and lifecycle hooks. Data properties store the component's state, methods handle component-specific functionalities, and lifecycle hooks provide control over component initialization and destruction.

3. **Styles:** The styles section contains the component's CSS styles. You can use plain CSS, SCSS, or any other CSS preprocessor to style your components.

## Creating Your First Vue.js Component

Let's create our first Vue.js component to understand how components work. For this example, we'll create a simple "Counter" component that increments a counter value when a button is clicked.

### Step 1: Define the Component

Create a new file named `Counter.vue` inside the `components` directory of your Vue.js project. Open the file in your code editor and define the component's template, script, and styles as follows:

```vue
<template>
  <div class="counter">
    <h2>Counter: {{ count }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<style>
.counter {
  text-align: center;
  margin-top: 20px;
}
</style>
```

### Step 2: Using the Component

Now that we've defined the `Counter` component, let's use it in the `App.vue` file. Open `src/App.vue` and replace its contents with the following:

```vue
<template>
  <div>
    <h1>Hello Vue.js!</h1>
    <Counter />
  </div>
</template>

<script>
import Counter from './components/Counter.vue';

export default {
  components: {
    Counter,
  },
};
</script>

<style>
/* Your custom styles go here */
</style>
```

In this `App.vue` file, we've imported the `Counter` component and registered it using the `components` option. Now, we can use the `Counter` component directly in the template.

### Step 3: Previewing the Result

Save the changes to both `Counter.vue` and `App.vue`. The development server will automatically reload the application in your browser. Now, you should see the "Hello Vue.js!" message along with the "Counter" component below it.

Click the "Increment" button, and you'll notice that the counter value increases with each click.

Congratulations! You've successfully created and used your first Vue.js component.

## Reusability and Composing Components

The true power of Vue.js components lies in their reusability and composability. You can use a single component in multiple places throughout your application or combine multiple components to build more complex UI structures.

For instance, let's create another component named `TodoItem.vue` that represents a single item in a to-do list. Then, we'll use this component inside the `App.vue` template to display multiple to-do items.

### Step 1: Define the `TodoItem` Component

Create a new file named `TodoItem.vue` inside the `components` directory. Open the file and define the `TodoItem` component as follows:

```vue
<template>
  <div class="todo-item">
    <input type="checkbox" v-model="isCompleted" @change="toggleStatus" />
    <span :class="{ completed: isCompleted }">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    isCompleted: Boolean,
  },
  methods: {
    toggleStatus() {
      this.isCompleted = !this.isCompleted;
    },
  },
};
</script>

<style>
.todo-item {
  margin-bottom: 10px;
}

.completed {
  text-decoration: line-through;
}
</style>
```

In this `TodoItem.vue` file, we've defined the `TodoItem` component, which displays a to-do item with a checkbox and a title. The

 `isCompleted` property is used to keep track of the item's completion status, and the `toggleStatus` method is used to toggle the completion status when the checkbox is clicked.

### Step 2: Using the `TodoItem` Component

Now that we have the `TodoItem` component, let's use it inside the `App.vue` template to create a to-do list. Modify the `App.vue` file as follows:

```vue
<template>
  <div>
    <h1>Hello Vue.js!</h1>
    <Counter />
    <div class="todo-list">
      <TodoItem v-for="item in todos" :key="item.id" :title="item.title" :isCompleted="item.isCompleted" />
    </div>
  </div>
</template>

<script>
import Counter from './components/Counter.vue';
import TodoItem from './components/TodoItem.vue';

export default {
  components: {
    Counter,
    TodoItem,
  },
  data() {
    return {
      todos: [
        { id: 1, title: 'Buy groceries', isCompleted: false },
        { id: 2, title: 'Read a book', isCompleted: true },
        { id: 3, title: 'Do laundry', isCompleted: false },
      ],
    };
  },
};
</script>

<style>
/* Your custom styles go here */
.todo-list {
  margin-top: 20px;
}
</style>
```

In this updated `App.vue` file, we've imported the `TodoItem` component and registered it. Then, we used `v-for` to loop through the `todos` array and render a `TodoItem` component for each item.

### Step 3: Previewing the Result

Save the changes to both `TodoItem.vue` and `App.vue`, and the development server will reload the application in your browser. Now, you should see the "Hello Vue.js!" message, the "Counter" component, and the list of to-do items with checkboxes.

Click the checkboxes to toggle the completion status of the to-do items, and you'll notice that the completed items have a line-through style.

## Conclusion

In this chapter, we delved into Vue.js components and their significance in building modular and reusable UI elements. We learned how to define a component's template, script, and styles and use them in other parts of the application. Additionally, we explored the concept of component reusability and composed multiple components to create a to-do list.

Components are at the heart of Vue.js development, enabling developers to create dynamic and interactive user interfaces with ease. In the next chapters, we'll further explore Vue.js's capabilities, including data binding, directives, state management, and more.

Stay tuned for Chapter 4, where we'll dive into Vue.js data binding and explore how to handle and display dynamic data in our applications.
