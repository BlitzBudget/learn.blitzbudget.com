# Chapter 3: Creating Your First GitHub Actions Workflow

## Overview

Now that you have a basic understanding of GitHub Actions YAML syntax, let's dive into creating your first GitHub Actions workflow. We'll walk you through the process of setting up a simple workflow to automate the build and test process for a Node.js application.

## Prerequisites

Before you start creating your workflow, ensure you have the following prerequisites:

1. A GitHub repository with your Node.js application code.

2. The Node.js application should have a `package.json` file with the necessary scripts for building and testing the project.

## Setting Up the Workflow

1. Navigate to your GitHub repository on the GitHub website.

2. Click on the "Actions" tab at the top of the repository.

3. Click on the "Set up a workflow yourself" button, or if you already have an existing workflow, click "New workflow" in the top-right corner.

4. You will be presented with a new file named `main.yml` in the `.github/workflows` directory.

5. Replace the default content with the following YAML code:

```yaml
name: CI

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

    - name: Build and Test
      run: |
        npm run build
        npm test
```

## Understanding the Workflow

In this workflow:

- The workflow is named "CI."

- The workflow is triggered on pushes to the "main" branch.

- The job named "build" runs on the `ubuntu-latest` virtual environment.

- The job consists of four steps:
  1. Checking out the repository using the `actions/checkout@v2` action.
  2. Setting up Node.js with version 14 using the `actions/setup-node@v2` action.
  3. Installing project dependencies using the `npm install` command.
  4. Building and testing the code using the `npm run build` and `npm test` commands.

## Saving and Committing the Workflow

After creating your workflow, save the changes to the YAML file and commit them to your repository. The workflow will automatically start running when you push changes to the "main" branch.

## Viewing Workflow Results

To view the results of your workflow:

1. Go back to the "Actions" tab in your GitHub repository.

2. Click on the latest workflow run to see its details, including the status of each step and any logs generated during the process.

## Conclusion

Congratulations! You have successfully created your first GitHub Actions workflow. Your workflow will now automatically run whenever you push changes to the "main" branch, building and testing your Node.js application.

GitHub Actions provides a wide range of possibilities for automating various tasks in your software development lifecycle. As you become more familiar with GitHub Actions, you can customize and expand your workflows to suit your project's specific needs.

In the next chapters, we'll explore more advanced topics, such as reusing actions, integrating with AWS services, and deploying applications using GitHub Actions.

---