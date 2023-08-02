# Chapter 6: Vue.js Forms and Input Handling

Forms are an essential part of modern web applications, allowing users to input and submit data. In Vue.js, handling forms and input elements is made easy with two-way data binding and the `v-model` directive. In this chapter, we will explore Vue.js forms and input handling, learning how to create interactive and user-friendly forms in our applications.

## Understanding Forms in Vue.js

A form in Vue.js is created using standard HTML form elements like `<form>`, `<input>`, `<textarea>`, and `<select>`. When a user interacts with the form by entering data or making selections, we can capture and process that data in our Vue.js component.

One of the key features that make form handling in Vue.js so powerful is two-way data binding. With two-way data binding, we can bind the form elements to our component's data, allowing us to keep the form data in sync with the component's state.

## Handling Form Input with `v-model`

The `v-model` directive is the primary mechanism for handling form input in Vue.js. It enables two-way data binding between form elements and the component's data.

### Example: Input Element

```vue
<template>
  <div>
    <input v-model="message" type="text" />
    <p>You typed: {{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
};
</script>
```

In this example, we use `v-model` to bind the `message` data property to the `<input>` element. As the user types into the input field, the `message` data property is automatically updated, and the displayed message below the input field updates in real-time.

### Example: Textarea Element

```vue
<template>
  <div>
    <textarea v-model="message" rows="4" cols="30"></textarea>
    <p>You typed: {{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
};
</script>
```

In this example, we use `v-model` to bind the `message` data property to the `<textarea>` element. As the user types into the textarea, the `message` data property is automatically updated, and the displayed message below the textarea updates in real-time.

### Example: Select Element

```vue
<template>
  <div>
    <select v-model="selectedOption">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    <p>Selected option: {{ selectedOption }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: 'option1',
    };
  },
};
</script>
```

In this example, we use `v-model` to bind the `selectedOption` data property to the `<select>` element. When the user selects an option from the dropdown, the `selectedOption` data property is automatically updated, and the displayed message below the dropdown updates to show the selected option.

## Handling Form Submission

Handling form submission is a crucial part of form handling in Vue.js. When the user submits the form, we need to capture the form data and perform the necessary actions, such as making API requests or updating the component's data.

In Vue.js, we can use the `@submit` event modifier to handle form submission.

### Example:

```vue
<template>
  <div>
    <form @submit="handleSubmit">
      <input v-model="username" type="text" />
      <input v-model="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      // Perform form submission logic here, e.g., make API requests
      console.log('Form submitted!');
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      // Reset form data after submission
      this.username = '';
      this.password = '';
    },
  },
};
</script>
```

In this example, we bind the form elements to the `username` and `password` data properties using `v-model`. When the user clicks the submit button, the `handleSubmit` method is called, which prevents the default form submission behavior using `event.preventDefault()`. The method then performs the desired form submission logic, such as making API requests with the form data. Finally, the form data is reset after submission to clear the input fields.

## Form Validation

Form validation is a critical aspect of form handling to ensure that the data entered by users meets the required criteria. In Vue.js, we can implement form validation by using computed properties or methods to validate the form data.

### Example:

```vue
<template>
  <div>
    <form @submit="handleSubmit">
      <input v-model="email" type="text" />
      <span v-if="!isEmailValid">Invalid email format</span>
      <button type="submit" :disabled="!isForm

Valid">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  computed: {
    isEmailValid() {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isFormValid() {
      // Form is valid if the email is valid
      return this.isEmailValid;
    },
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      // Perform form submission logic here, e.g., make API requests
      console.log('Form submitted!');
      console.log('Email:', this.email);
      // Reset form data after submission
      this.email = '';
    },
  },
};
</script>
```

In this example, we implement basic email validation using the `isEmailValid` computed property. If the email format is invalid, we display an error message below the input field. The `isFormValid` computed property ensures that the form can only be submitted when all form data is valid.

## Conclusion

Handling forms and input elements is a crucial part of developing interactive web applications. In Vue.js, forms are made easy with two-way data binding and the `v-model` directive, allowing us to effortlessly synchronize form data with the component's state.

In this chapter, we explored different types of form elements, such as input fields, textareas, and select dropdowns, and learned how to handle form submission and implement form validation. Armed with this knowledge, we can create user-friendly and interactive forms in our Vue.js applications.

In the next chapter, we will delve into Vue.js components, a powerful feature that enables us to build reusable and modular user interface elements.