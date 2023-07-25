# Chapter 14: Currying and Partial Application in Java

In this chapter, we will explore two essential concepts in functional programming: currying and partial application. Currying and partial application are techniques used to create more flexible and reusable functions by breaking down complex operations into simpler, composable units.

## 1. Introduction to Currying and Partial Application

### 1.1. What is Currying?

Currying is a technique in functional programming where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. The result of each function becomes the input for the next function, and so on, until all arguments are processed, and the final result is obtained.

In other words, a curried function takes one argument at a time and returns a new function that takes the next argument, leading to a chain of functions until all arguments are consumed, and the final result is produced.

Currying allows developers to transform functions with multiple parameters into a series of simpler functions. It enhances code modularity, composability, and flexibility.

### 1.2. What is Partial Application?

Partial application is a related concept to currying, but with a slight difference. In partial application, a function is applied to some of its arguments, producing a new function with a reduced number of parameters. The new function is specialized to handle the remaining arguments.

In other words, partial application fixes a certain number of arguments in a function, creating a new function with fewer parameters. This allows developers to create specialized versions of a function, reusing common behavior while leaving some arguments open to be provided later.

Both currying and partial application promote code reusability and facilitate the creation of more modular and expressive code.

## 2. Currying in Java

While Java does not have native support for currying, we can simulate currying using lambda expressions and functional interfaces.

### 2.1. Currying Using Nested Lambda Expressions

Let's create a curried function in Java using nested lambda expressions.

```java
import java.util.function.Function;

public class CurryingExample {

    public static void main(String[] args) {
        // Curried function: add(a)(b)
        Function<Integer, Function<Integer, Integer>> add = a -> b -> a + b;

        // Applying one argument at a time
        Function<Integer, Integer> add5 = add.apply(5);
        int result = add5.apply(3); // Result: 8
        System.out.println(result);
    }
}
```

In this example, we create a curried function `add`, which takes two integer arguments and returns their sum. We apply the arguments one at a time using nested lambda expressions, resulting in a chain of functions.

### 2.2. Currying Using Custom Functional Interfaces

We can also use custom functional interfaces to implement currying in Java.

```java
@FunctionalInterface
interface CurriedFunction<T, U, R> {
    Function<U, R> apply(T t);
}

public class CurryingExample {

    public static void main(String[] args) {
        // Curried function: add(a)(b)
        CurriedFunction<Integer, Integer, Integer> add = a -> b -> a + b;

        // Applying one argument at a time
        Function<Integer, Integer> add5 = add.apply(5);
        int result = add5.apply(3); // Result: 8
        System.out.println(result);
    }
}
```

In this example, we define a custom functional interface `CurriedFunction` representing a curried function. The `apply` method of this interface returns a new function that takes the second argument and produces the result.

## 3. Partial Application in Java

Partial application can also be achieved in Java using lambda expressions and functional interfaces.

### 3.1. Partial Application Using Nested Lambda Expressions

Let's create a partially applied function in Java using nested lambda expressions.

```java
import java.util.function.Function;

public class PartialApplicationExample {

    public static void main(String[] args) {
        // Partially applied function: add5To(b)
        Function<Integer, Integer> add5To = b -> add(5, b);

        int result = add5To.apply(3); // Result: 8
        System.out.println(result);
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
```

In this example, we create a partially applied function `add5To`, which takes one integer argument and returns the result of adding `5` to the argument. We use the `add` method to provide the behavior for the partial application.

### 3.2. Partial Application Using Custom Functional Interfaces

We can also use custom functional interfaces to implement partial application in Java.

```java
@FunctionalInterface
interface PartialFunction<T, R> {
    R apply(T t);
}

public class PartialApplicationExample {

    public static void main(String[] args) {
        // Partially applied function: add5To(b)
        PartialFunction<Integer, Integer> add5To = b -> add(5, b);

        int result = add5To.apply(3); // Result: 8
        System.out.println(result);
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
```

In this example, we define a custom functional interface `PartialFunction` representing a partially applied function. The `apply` method of this interface returns the result of applying the function `add` with the first argument fixed to `5`.

## 4. Benefits of Currying and Partial Application

The use of currying and partial application offers several benefits in functional programming:

###

 4.1. Code Reusability

Currying and partial application enable the creation of specialized versions of functions that can be reused across different parts of the codebase. Instead of duplicating similar functions with slight variations, partial application allows us to fix certain arguments and reuse the core behavior.

### 4.2. Modularity and Composability

By breaking down complex functions into simpler functions, currying and partial application promote code modularity and composability. The ability to create functions that build upon each other in a chain allows developers to express complex behavior in a clear and concise manner.

### 4.3. Flexibility

Currying and partial application provide flexibility in function usage. By partially applying a function, we can create specialized versions that can be used in various contexts, adapting to specific requirements.

### 4.4. Readability

Curried functions and partially applied functions can improve code readability, as they allow developers to focus on specific aspects of the functionality without dealing with the entire set of arguments at once.

## 5. Use Cases of Currying and Partial Application

### 5.1. Function Parameterization

Currying and partial application are valuable techniques in scenarios where we need to parameterize functions with specific values. For example, when performing mathematical calculations with varying constants or when filtering data with specific criteria.

```java
import java.util.function.Predicate;

public class UseCasesExample {

    public static void main(String[] args) {
        // Filtering a list of integers
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);
        Predicate<Integer> greaterThanThree = n -> n > 3;

        List<Integer> filteredNumbers = numbers.stream().filter(greaterThanThree).collect(Collectors.toList());
        System.out.println(filteredNumbers); // Output: [4, 5]
    }
}
```

In this example, we use partial application to create a specialized version of the `greaterThanThree` predicate. This specialized predicate can be reused in different filtering scenarios.

### 5.2. Closures and Context Preservation

Currying and partial application play a crucial role in preserving the context and closure properties of functions. These techniques allow functions to capture and retain the values of variables from their surrounding environment.

```java
import java.util.function.Function;

public class UseCasesExample {

    public static void main(String[] args) {
        int base = 10;
        Function<Integer, Integer> addWithBase = add(base);

        int result = addWithBase.apply(5); // Result: 15
        System.out.println(result);
    }

    public static Function<Integer, Integer> add(int a) {
        return b -> a + b;
    }
}
```

In this example, we define a function `add` that takes an integer `a` and returns a new function that adds `a` to its argument. By partially applying the function `add` with a base value of `10`, we create a new function `addWithBase`, which retains the value of `10` and adds it to the provided argument.

## 6. Conclusion

Currying and partial application are valuable concepts in functional programming that enhance code modularity, flexibility, and reusability. In Java, while currying is not natively supported, we can simulate currying and partial application using lambda expressions and custom functional interfaces.

In this chapter, we explored the concepts of currying and partial application and learned how to implement them in Java. We discussed the benefits of using currying and partial application, such as improved code readability, modularity, and composability.

By leveraging currying and partial application, developers can create more expressive, reusable, and flexible functions, leading to cleaner and more maintainable codebases.

**Next Chapter: Chapter 15: Lazy Evaluation with Lambda Functions**