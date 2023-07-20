# Chapter 6: Continuous Integration (CI) with GitHub Actions

## Overview

Continuous Integration (CI) is a development practice that involves automatically integrating code changes into a shared repository multiple times a day. CI helps catch integration issues early, ensuring that code changes do not break the overall project.

In this chapter, we'll demonstrate how to implement Continuous Integration (CI) with GitHub Actions using a practical example.

## Setting Up Continuous Integration (CI) Workflow

To set up a CI workflow with GitHub Actions, we need to create a YAML file that defines the steps to be executed whenever code changes are pushed to the repository. Let's create a workflow that performs the following tasks for a Node.js application:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies.
4. Runs linter to check for code style issues.
5. Runs unit tests to ensure code correctness.

Create a new YAML file named `ci.yml` in the `.github/workflows` directory of your repository and add the following content:

```yaml
name: Continuous Integration

on:
  push:
    branches:
      - main

jobs:
  build-and-test:
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

    - name: Run linter
      run: npm run lint

    - name: Run unit tests
      run: npm test
```

In this example:

- The workflow is named "Continuous Integration."

- The workflow is triggered on pushes to the "main" branch.

- The job named "build-and-test" runs on the `ubuntu-latest` virtual environment.

- The job consists of five steps: checking out the repository, setting up Node.js with version 14, installing dependencies, running the linter (`npm run lint`), and running the unit tests (`npm test`).

## Enabling GitHub Actions

Once you have created the `ci.yml` file and committed it to your repository, GitHub Actions will automatically pick it up and start running the CI workflow whenever code changes are pushed to the "main" branch.

## Viewing CI Workflow Results

To view the results of your CI workflow:

1. Go to the "Actions" tab in your GitHub repository.

2. Click on the latest CI workflow run to see its details, including the status of each step and any logs generated during the process.

## Conclusion

In this chapter, we implemented Continuous Integration (CI) with GitHub Actions using a practical example for a Node.js application. We defined a CI workflow in a YAML file and configured it to trigger on pushes to the "main" branch.

GitHub Actions provides an excellent platform for automating your CI workflows. By catching integration issues early and ensuring code quality, CI significantly improves the development process.

In the next chapters, we'll explore more advanced topics, such as Continuous Deployment (CD) with GitHub Actions and integrating with AWS services for deployment and automation tasks.

---