# Chapter 5: Building and Testing Your Code with GitHub Actions

## Overview

Automating the build and testing process is a fundamental aspect of any software development workflow. In this chapter, we'll show you how to leverage GitHub Actions to build and test your code automatically. By doing so, you can catch issues early and ensure that your codebase remains reliable and stable.

## Building Your Code

Building your code involves compiling the source files into an executable or deployable format. The build process may vary depending on the programming language and tools used in your project.

To automate the build process with GitHub Actions, you need to define the necessary steps in your workflow. Here's an example of a workflow that builds a Node.js application:

```yaml
name: Build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build
```

In this example:

- The workflow is named "Build."

- The workflow is triggered on pushes to the "main" branch.

- The job named "build" runs on the `ubuntu-latest` virtual environment.

- The job consists of four steps: checking out the repository, setting up Node.js with version 14, installing dependencies, and running the build command (`npm run build`).

## Testing Your Code

Automated testing is crucial for verifying that your code works as expected and meets the defined requirements. GitHub Actions can automate your testing process by running various test suites.

Here's an example of a workflow that performs testing for a Node.js application:

```yaml
name: Test

on:
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test
```

In this example:

- The workflow is named "Test."

- The workflow is triggered on pull requests targeting the "main" branch.

- The job named "test" runs on the `ubuntu-latest` virtual environment.

- The job consists of four steps: checking out the repository, setting up Node.js with version 14, installing dependencies, and running the test command (`npm test`).

## Conclusion

In this chapter, we explored how to use GitHub Actions to build and test your code automatically. By defining the necessary steps in your workflow, you can ensure that your codebase remains reliable and functional throughout its development lifecycle.

Automating the build and testing process allows you to catch issues early and streamline your development workflow. With GitHub Actions, you have the flexibility to customize your build and test tasks based on your project's specific requirements.

In the next chapters, we'll delve deeper into more advanced GitHub Actions topics, such as integrating with AWS services, automating deployment, and creating custom actions.

---