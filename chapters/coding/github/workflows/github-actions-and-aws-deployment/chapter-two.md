# Chapter 2: Getting Started with GitHub Actions YAML Syntax

## Overview

In the previous chapter, we introduced you to GitHub Actions and its capabilities. In this chapter, we'll dive into the YAML syntax used to define workflows in GitHub Actions. Understanding the YAML syntax is essential for creating and customizing your automation workflows effectively.

## Anatomy of a GitHub Actions Workflow YAML File

A GitHub Actions workflow is defined in a YAML file named `workflow.yml`. Each YAML file represents a workflow and contains a series of elements that define how the actions should be executed.

### 1. `name` (Required)

The `name` field specifies the name of the workflow. It should be a descriptive and meaningful name to identify the purpose of the workflow.

### 2. `on` (Required)

The `on` field specifies the event that triggers the workflow. You can specify various events such as pushes, pull requests, or scheduled intervals.

### 3. `jobs` (Required)

The `jobs` field contains a sequence of one or more jobs that define the individual units of work to be executed. Each job can run on a separate virtual environment.

### 4. `runs-on` (Required)

The `runs-on` field specifies the type of virtual environment in which the job will run. GitHub Actions provides a range of virtual environments, such as Ubuntu, macOS, and Windows.

### 5. `steps` (Required)

The `steps` field contains a sequence of steps that define the commands to be executed in the virtual environment. Each step performs a specific task, such as checking out code, installing dependencies, or running tests.

## Example Workflow YAML

Let's look at a simple example of a GitHub Actions workflow YAML file:

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

    - name: Build and Test
      run: |
        npm install
        npm run build
        npm test
```

In this example:

- The workflow is named "CI."
- The workflow is triggered on pushes to the "main" branch.
- The job named "build" runs on the `ubuntu-latest` virtual environment.
- The job consists of two steps: checking out the repository using the `actions/checkout@v2` action, and building and testing the code using the `npm` commands.

## YAML Syntax Rules

When writing YAML for GitHub Actions workflows, keep in mind the following syntax rules:

1. Use spaces, not tabs.
2. YAML is case-sensitive.
3. Use indentation (typically two spaces) to define the hierarchy of elements.
4. Lists and dictionaries are represented by `-` and `key: value` pairs, respectively.

## Conclusion

In this chapter, we explored the YAML syntax used to define GitHub Actions workflows. Understanding the structure of a YAML file and its various elements is essential for creating and customizing workflows effectively.

Remember that YAML is sensitive to indentation and relies on spaces, not tabs. Follow the syntax rules to ensure that your YAML files are correctly interpreted by GitHub Actions.

In the next chapters, we'll dive deeper into creating more complex workflows, reusing actions, and integrating with AWS services for deployment and automation tasks.

---