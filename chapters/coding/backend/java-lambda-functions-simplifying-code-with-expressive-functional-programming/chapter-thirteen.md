# Chapter 13: Higher-Order Functions in Java

Higher-order functions are a powerful concept in functional programming, where functions can take other functions as arguments or return functions as results. In Java, the introduction of lambda functions in Java 8 enabled the creation of higher-order functions, allowing developers to write more expressive and concise code.

In this chapter, we will explore the concept of higher-order functions in Java, understand their significance, and learn how to use them with practical examples.

## 1. Introduction to Higher-Order Functions

In functional programming, functions are treated as first-class citizens, meaning they can be treated just like any other data type. Higher-order functions are functions that operate on other functions. They can do one of the following:

1. Take one or more functions as arguments.
2. Return a function as a result.

Higher-order functions offer several advantages:

- **Abstraction:** Higher-order functions allow developers to abstract away common patterns and behavior, promoting code reusability.

- **Expressiveness:** By using higher-order functions, developers can write more expressive and concise code, leading to cleaner and more readable codebases.

- **Modularity:** Higher-order functions promote modularity by breaking down complex tasks into smaller, composable functions.

## 2. Creating Higher-Order Functions in Java

Java introduced lambda expressions in Java 8, which allowed developers to write functional-style code and create higher-order functions.

### 2.1. Functions as Arguments

To create a higher-order function that takes other functions as arguments, we use functional interfaces. Functional interfaces are interfaces that have only one abstract method and can be used as the target type for lambda expressions.

Let's create a higher-order function that takes a function as an argument to perform some operation on a list of integers.

```java
import java.util.List;
import java.util.function.Function;

public class HigherOrderFunctions {

    public static void processList(List<Integer> numbers, Function<Integer, Integer> operation) {
        for (Integer number : numbers) {
            Integer result = operation.apply(number);
            System.out.print(result + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        // Higher-order function using lambda expression as an argument
        processList(numbers, x -> x * x); // Output: 1 4 9 16 25
    }
}
```

In this example, we define a higher-order function `processList`, which takes a `Function<Integer, Integer>` as an argument. The function `processList` applies the provided function to each element of the `numbers` list and prints the results.

### 2.2. Functions as Return Values

To create a higher-order function that returns a function as a result, we can use functional interfaces representing the return type.

Let's create a higher-order function that returns a function to calculate the sum of two integers.

```java
import java.util.function.IntBinaryOperator;

public class HigherOrderFunctions {

    public static IntBinaryOperator getSumFunction() {
        return (a, b) -> a + b;
    }

    public static void main(String[] args) {
        IntBinaryOperator sumFunction = getSumFunction();
        int result = sumFunction.applyAsInt(5, 10);
        System.out.println(result); // Output: 15
    }
}
```

In this example, the higher-order function `getSumFunction` returns an `IntBinaryOperator` that calculates the sum of two integers. We then use the returned function to calculate the sum of `5` and `10`.

## 3. Functional Interfaces in Higher-Order Functions

Functional interfaces play a crucial role in creating higher-order functions in Java. Java provides several built-in functional interfaces in the `java.util.function` package that can be used as parameters or return types in higher-order functions.

Here are some common functional interfaces used in higher-order functions:

- `Function<T, R>`: Represents a function that takes an argument of type `T` and returns a result of type `R`.
- `Predicate<T>`: Represents a function that takes an argument of type `T` and returns a boolean result.
- `Consumer<T>`: Represents a function that takes an argument of type `T` and performs some operation without returning a result.
- `Supplier<T>`: Represents a function that supplies a value of type `T`.
- `UnaryOperator<T>`: Represents a function that takes an argument of type `T` and returns a result of the same type.
- `BinaryOperator<T>`: Represents a function that takes two arguments of type `T` and returns a result of the same type.

Let's see some examples of using these functional interfaces in higher-order functions.

### 3.1. Higher-Order Function with `Function`

```java
import java.util.List;
import java.util.function.Function;

public class HigherOrderFunctions {

    public static void processList(List<Integer> numbers, Function<Integer, Integer> operation) {
        for (Integer number : numbers) {
            Integer result = operation.apply(number);
            System.out.print(result + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        // Higher-order function using lambda expression as an argument
        processList(numbers, x -> x * x); // Output: 1 4 9 16 25
    }
}
```

In this example, we have already seen how to create a higher-order function `processList` using the `Function` interface. The lambda expression `x -> x * x` is passed as an argument to the `processList` function, which squares each element in the `numbers` list.

### 3.2. Higher-Order Function with `Predicate`

Let's create a higher-order function that filters elements from a list based on a predicate.

```java
import java.util.List;
import java.util.function.Predicate;

public class HigherOrderFunctions {

    public static void filterList(List<Integer> numbers, Predicate<Integer> condition) {
        for (Integer number : numbers) {
            if (condition.test(number)) {
                System.out.print(number + " ");
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        // Higher-order function using lambda expression as an argument
        filterList(numbers, x -> x % 2 == 0); // Output: 2 4
    }
}
```

In this example, we define a higher-order function `filterList` using the `Predicate` interface. The lambda expression `x -> x % 2 == 0` is passed as an argument to the `filterList` function, which filters even numbers from the `numbers` list.

### 3.3. Higher-Order Function with `Consumer`

Let's create a higher-order function that applies an action to each element of a list.

```java
import java.util.List;
import java.util.function.Consumer;

public class HigherOrderFunctions {

    public static void forEachElement(List<Integer> numbers, Consumer<Integer> action) {
        for (Integer number : numbers) {
            action.accept(number);
        }


    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        // Higher-order function using lambda expression as an argument
        forEachElement(numbers, x -> System.out.print(x + " ")); // Output: 1 2 3 4 5
    }
}
```

In this example, we define a higher-order function `forEachElement` using the `Consumer` interface. The lambda expression `x -> System.out.print(x + " ")` is passed as an argument to the `forEachElement` function, which prints each element of the `numbers` list.

### 3.4. Higher-Order Function with `Supplier`

Let's create a higher-order function that generates a list of random integers.

```java
import java.util.List;
import java.util.Random;
import java.util.function.Supplier;

public class HigherOrderFunctions {

    public static List<Integer> generateRandomList(int size, Supplier<Integer> supplier) {
        List<Integer> randomList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            randomList.add(supplier.get());
        }
        return randomList;
    }

    public static void main(String[] args) {
        // Higher-order function using lambda expression as an argument
        List<Integer> randomNumbers = generateRandomList(5, () -> new Random().nextInt(100));
        System.out.println(randomNumbers); // Output: [42, 15, 75, 37, 86]
    }
}
```

In this example, we define a higher-order function `generateRandomList` using the `Supplier` interface. The lambda expression `() -> new Random().nextInt(100)` is passed as an argument to the `generateRandomList` function, which generates random integers between 0 and 100.

### 3.5. Higher-Order Function with `UnaryOperator` and `BinaryOperator`

Let's create higher-order functions that perform unary and binary operations on a list of integers.

```java
import java.util.List;
import java.util.function.UnaryOperator;
import java.util.function.BinaryOperator;

public class HigherOrderFunctions {

    public static void unaryOperation(List<Integer> numbers, UnaryOperator<Integer> operation) {
        for (Integer number : numbers) {
            Integer result = operation.apply(number);
            System.out.print(result + " ");
        }
        System.out.println();
    }

    public static void binaryOperation(List<Integer> numbers, BinaryOperator<Integer> operation) {
        for (int i = 0; i < numbers.size() - 1; i++) {
            Integer result = operation.apply(numbers.get(i), numbers.get(i + 1));
            System.out.print(result + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        // Higher-order function using lambda expression as an argument
        unaryOperation(numbers, x -> x * x); // Output: 1 4 9 16 25
        binaryOperation(numbers, (x, y) -> x + y); // Output: 3 5 7 9
    }
}
```

In this example, we define higher-order functions `unaryOperation` and `binaryOperation` using the `UnaryOperator` and `BinaryOperator` interfaces, respectively. The lambda expressions `x -> x * x` and `(x, y) -> x + y` are passed as arguments to these functions, which perform unary and binary operations on the `numbers` list, respectively.

## 4. Currying in Higher-Order Functions

Currying is a technique in functional programming where a higher-order function takes multiple arguments and returns a series of nested functions, each taking one argument. Currying allows developers to transform a function with multiple arguments into a chain of functions, making it more composable and flexible.

In Java, we can simulate currying using nested lambda expressions or by defining custom functional interfaces.

### 4.1. Currying Using Nested Lambda Expressions

Let's create a curried higher-order function to calculate the sum of three integers.

```java
import java.util.function.Function;

public class HigherOrderFunctions {

    public static Function<Integer, Function<Integer, Function<Integer, Integer>>> currySum() {
        return a -> b -> c -> a + b + c;
    }

    public static void main(String[] args) {
        // Curried higher-order function using nested lambda expressions
        Function<Integer, Function<Integer, Function<Integer, Integer>>> curriedSum = currySum();

        int result = curriedSum.apply(1).apply(2).apply(3);
        System.out.println(result); // Output: 6
    }
}
```

In this example, we define a curried higher-order function `currySum` using nested lambda expressions. The function takes three integers and returns their sum. By applying the function partially, we can achieve currying.

### 4.2. Currying Using Custom Functional Interfaces

We can also use custom functional interfaces to simulate currying in Java.

Let's create a custom functional interface `TriFunction` to represent a function that takes three arguments and returns a result.

```java
@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}

public class HigherOrderFunctions {

    public static TriFunction<Integer, Integer, Integer, Integer> curriedSum() {
        return (a, b, c) -> a + b + c;
    }

    public static void main(String[] args) {
        // Curried higher-order function using custom functional interface
        TriFunction<Integer, Integer, Integer, Integer> curriedSum = curriedSum();

        int result = curriedSum.apply(1, 2, 3);
        System.out.println(result); // Output: 6
    }
}
```

In this example, we create a custom functional interface `TriFunction` that represents a function with three arguments and a result. We define the `curriedSum` higher-order function using this custom functional interface.

## 5. Function Composition in Higher-Order Functions

Function composition is another powerful concept in functional programming, where two or more functions are combined to create a new function. Function composition allows developers to chain functions together and create more complex operations by combining simpler ones.

In Java, function composition can be achieved using the `andThen` and `compose` methods of functional interfaces.

### 5.1. Using `andThen`

The `andThen` method of functional interfaces allows us to compose two functions such that the output of the first function becomes the input of the second function.

Let's compose two functions to convert a list of integers to their squares and then sum the squared values.

```java
import java.util.List;
import java.util.function.Function;

public class HigherOrderFunctions {

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        Function<Integer, Integer> square = x -> x * x;
        Function<Integer, Integer> sumSquares = square.andThen(x -> numbers.stream().map(square).reduce(0, Integer::sum));

        int result = sumSquares.apply(5);


        System.out.println(result); // Output: 55 (1 + 4 + 9 + 16 + 25)
    }
}
```

In this example, we define two functions `square` and `sumSquares`. The `andThen` method is used to compose the `square` function and the summation of squared values.

### 5.2. Using `compose`

The `compose` method of functional interfaces allows us to compose two functions such that the output of the second function becomes the input of the first function.

Let's compose two functions to convert a list of integers to their squares and then find the sum of the original values.

```java
import java.util.List;
import java.util.function.Function;

public class HigherOrderFunctions {

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);

        Function<Integer, Integer> square = x -> x * x;
        Function<Integer, Integer> sumOriginalValues = square.compose(x -> numbers.stream().map(square).reduce(0, Integer::sum));

        int result = sumOriginalValues.apply(5);
        System.out.println(result); // Output: 15 (1 + 2 + 3 + 4 + 5)
    }
}
```

In this example, we define two functions `square` and `sumOriginalValues`. The `compose` method is used to compose the `square` function and the summation of squared values.

## 6. Conclusion

Higher-order functions are a powerful concept in functional programming that allows functions to take other functions as arguments or return functions as results. In Java, lambda expressions and functional interfaces enable the creation of higher-order functions, leading to more expressive and modular code.

In this chapter, we explored the concept of higher-order functions and how to create them in Java. We learned how to use functional interfaces as arguments and return types in higher-order functions. We also discovered the benefits of currying and function composition in creating more flexible and reusable code.

By leveraging higher-order functions in Java, developers can write more functional-style code and take advantage of the benefits of functional programming paradigms.

**Next Chapter: Chapter 14: Currying and Partial Application**