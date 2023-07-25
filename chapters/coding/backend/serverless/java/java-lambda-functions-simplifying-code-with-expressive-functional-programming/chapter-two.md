# Chapter 2: Functional Interfaces in Java

In Chapter 1, we introduced the concept of lambda functions in Java and explored their syntax and benefits. Lambda functions provide a concise and expressive way to represent anonymous functions, making it easier to work with functional programming concepts in Java. However, to use lambda expressions effectively, we need to understand functional interfaces, as they form the foundation of lambda expressions in Java.

In this chapter, we will dive deep into functional interfaces, understanding their purpose, characteristics, and how they relate to lambda expressions. We will explore various built-in functional interfaces provided by Java in the `java.util.function` package and learn how to create custom functional interfaces. Through practical Java examples, we will gain a comprehensive understanding of functional interfaces and their significance in leveraging the power of lambda functions.

## 1. What are Functional Interfaces?

A functional interface is an interface that contains only one abstract method (SAM - Single Abstract Method). The presence of a single abstract method ensures that the interface can be used with lambda expressions. In other words, functional interfaces serve as the target type for lambda expressions and method references.

To indicate that an interface is intended to be a functional interface, we use the `@FunctionalInterface` annotation. Although the annotation is optional, it is good practice to use it as it helps developers understand the intended use of the interface.

```java
@FunctionalInterface
interface MyFunctionalInterface {
    void doSomething();
}
```

In this example, `MyFunctionalInterface` is a functional interface because it contains only one abstract method, `doSomething()`.

## 2. Built-in Functional Interfaces in Java

Java provides a set of built-in functional interfaces in the `java.util.function` package to cover a wide range of use cases. These functional interfaces are categorized into four main types based on the operation they perform: **Consumer**, **Supplier**, **Function**, and **Predicate**.

### 2.1. Consumer

A `Consumer` is a functional interface that represents an operation that takes a single input and performs some action on it. It does not return any value.

```java
@FunctionalInterface
interface Consumer<T> {
    void accept(T t);
}
```

- `accept(T t)`: This abstract method takes a parameter of type `T` and performs the desired action on it.

#### Example: Using Consumer

```java
import java.util.List;
import java.util.ArrayList;
import java.util.function.Consumer;

public class ConsumerExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        // Using a Consumer to print each element of the list
        Consumer<String> printName = name -> System.out.println(name);
        names.forEach(printName);
    }
}
```

In this example, we create a `Consumer` called `printName` that prints each element of the `names` list.

### 2.2. Supplier

A `Supplier` is a functional interface that represents an operation that supplies (provides) a result. It does not take any input.

```java
@FunctionalInterface
interface Supplier<T> {
    T get();
}
```

- `get()`: This abstract method returns a result of type `T`.

#### Example: Using Supplier

```java
import java.util.function.Supplier;

public class SupplierExample {
    public static void main(String[] args) {
        // Using a Supplier to generate a random number
        Supplier<Double> randomNumberSupplier = () -> Math.random();
        double randomNumber = randomNumberSupplier.get();
        System.out.println("Random Number: " + randomNumber);
    }
}
```

In this example, we create a `Supplier` called `randomNumberSupplier` that generates a random number using `Math.random()`.

### 2.3. Function

A `Function` is a functional interface that represents an operation that takes an input of type `T` and produces an output of type `R`.

```java
@FunctionalInterface
interface Function<T, R> {
    R apply(T t);
}
```

- `apply(T t)`: This abstract method takes a parameter of type `T` and returns a result of type `R`.

#### Example: Using Function

```java
import java.util.function.Function;

public class FunctionExample {
    public static void main(String[] args) {
        // Using a Function to convert a string to its length
        Function<String, Integer> stringLengthFunction = s -> s.length();
        int length = stringLengthFunction.apply("Java is awesome!");
        System.out.println("Length of the string: " + length);
    }
}
```

In this example, we create a `Function` called `stringLengthFunction` that converts a string to its length using the `length()` method.

### 2.4. Predicate

A `Predicate` is a functional interface that represents an operation that takes an input of type `T` and returns a boolean result.

```java
@FunctionalInterface
interface Predicate<T> {
    boolean test(T t);
}
```

- `test(T t)`: This abstract method takes a parameter of type `T` and returns a boolean result.

#### Example: Using Predicate

```java
import java.util.function.Predicate;

public class PredicateExample {
    public static void main(String[] args) {
        // Using a Predicate to check if a number is even
        Predicate<Integer> isEvenPredicate = number -> number % 2 == 0;
        boolean isEven = isEvenPredicate.test(10);
        System.out.println("Is the number even? " + isEven);
    }
}
```

In this example, we create a `Predicate` called `isEvenPredicate` that checks if a number is even using the condition `number % 2 == 0`.

## 3. Custom Functional Interfaces

While Java provides a set of useful built-in functional interfaces, you may encounter scenarios where none of the built-in interfaces precisely match your requirements. In such cases, you can create custom functional interfaces to suit your specific needs.

To create a custom functional interface, follow these steps:

1. Define an interface with a single abstract method that represents the functionality you want the lambda expression to perform.
2. Optionally, use the `@FunctionalInterface` annotation to indicate that the interface is intended to be a functional interface.

```java
@FunctionalInterface
interface MyCustomFunctionalInterface {
    void doSomething(int value);
}
```

In this example, we create a custom

 functional interface called `MyCustomFunctionalInterface` with a single abstract method `doSomething(int value)`.

### Example: Using Custom Functional Interface

```java
public class CustomFunctionalInterfaceExample {
    public static void main(String[] args) {
        // Using a custom functional interface to perform a custom operation
        MyCustomFunctionalInterface customFunction = value -> System.out.println("Value: " + value);
        customFunction.doSomething(42);
    }
}
```

In this example, we create an instance of the custom functional interface `MyCustomFunctionalInterface` and use it to perform a custom operation on the value `42`.

## 4. Functional Interfaces and Method References

Method references provide a shorthand notation for lambda expressions that call only one method. They offer an alternative way to represent lambda expressions in a more concise and expressive manner. Method references are especially useful when the lambda expression's sole purpose is to call an existing method.

There are four types of method references:

1. **Reference to a Static Method**: `ClassName::staticMethodName`
2. **Reference to an Instance Method of a Particular Object**: `instance::instanceMethodName`
3. **Reference to an Instance Method of an Arbitrary Object of a Particular Type**: `ClassName::instanceMethodName`
4. **Reference to a Constructor**: `ClassName::new`

```java
// Using a static method reference
Consumer<String> printUpperCase = StringUtils::printUpperCase;
names.forEach(printUpperCase);
```

In this example, we use a static method reference `StringUtils::printUpperCase` to print each element of the `names` list in uppercase.

## 5. Conclusion

Functional interfaces are a fundamental concept in Java that enables the use of lambda expressions and method references. They provide a way to represent anonymous functions and leverage the benefits of functional programming in Java. Java's built-in functional interfaces in the `java.util.function` package cover a wide range of use cases, and you can also create custom functional interfaces when the need arises.

In this chapter, we explored the four main types of built-in functional interfaces: `Consumer`, `Supplier`, `Function`, and `Predicate`. We learned how to use each of them with lambda expressions to perform various operations. Additionally, we discovered the power of method references and how they offer a more concise and expressive alternative to lambda expressions in certain scenarios.

As we progress in our exploration of lambda functions and functional programming in Java, the understanding of functional interfaces will serve as a solid foundation to create more elegant and efficient code.

**Next Chapter: Chapter 3: Syntax of Lambda Expressions**