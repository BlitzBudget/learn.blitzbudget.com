# Chapter 6: Method References in Java

In the previous chapters, we explored the power of Java lambda functions and how they enable functional-style programming. Lambda expressions provide a concise way to express anonymous functions, making code more readable and maintainable. However, there are cases where the lambda expressions are merely a call to an existing method. This is where method references come into play.

Method references are a feature introduced in Java 8 that allows us to refer to methods by their names instead of using lambda expressions. They provide a more compact and elegant syntax when the lambda expression is a direct call to a method. Method references facilitate code reuse and improve code readability by making the code more expressive.

In this chapter, we will dive deep into method references and explore the various types of method references available in Java. We will learn how to use method references in different scenarios and how they enhance functional-style programming.

## 1. Introduction to Method References

Method references are shorthand notations for lambda expressions that directly call a method. They provide a way to refer to methods without invoking them. Method references simplify the code and make it more concise, especially when the lambda expression contains only a method call.

In Java, there are four types of method references:

1. **Reference to a Static Method**: A method reference to a static method uses the syntax `ClassName::staticMethodName`. It refers to a static method of the specified class.

2. **Reference to an Instance Method of a Particular Object**: A method reference to an instance method of a particular object uses the syntax `objectReference::instanceMethodName`. It refers to an instance method of the specified object.

3. **Reference to an Instance Method of an Arbitrary Object of a Particular Type**: A method reference to an instance method of an arbitrary object of a particular type uses the syntax `ClassName::instanceMethodName`. It refers to an instance method of the first argument of the specified type.

4. **Reference to a Constructor**: A method reference to a constructor uses the syntax `ClassName::new`. It refers to the constructor of the specified class.

Let's explore each type of method reference with practical examples.

## 2. Reference to a Static Method

A reference to a static method allows us to use a method reference to call a static method of a class. It is denoted by the syntax `ClassName::staticMethodName`.

### Example: Reference to a Static Method

```java
import java.util.Arrays;
import java.util.List;

public class MethodReferenceExample {

    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Using lambda expression
        names.forEach(name -> System.out.println(name));

        // Using method reference
        names.forEach(System.out::println);
    }
}
```

In this example, we have a list of names, and we use a lambda expression and a method reference to print each name to the console. The method reference `System.out::println` refers to the static method `println` of the `System.out` object, which is an instance of the `PrintStream` class.

## 3. Reference to an Instance Method of a Particular Object

A reference to an instance method of a particular object allows us to use a method reference to call an instance method of a specific object. It is denoted by the syntax `objectReference::instanceMethodName`.

### Example: Reference to an Instance Method of a Particular Object

```java
import java.util.Arrays;
import java.util.List;

class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Hello, my name is " + name);
    }
}

public class MethodReferenceExample {

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(new Person("Alice"), new Person("Bob"));

        // Using lambda expression
        people.forEach(person -> person.sayHello());

        // Using method reference
        people.forEach(Person::sayHello);
    }
}
```

In this example, we have a list of `Person` objects, and we use a lambda expression and a method reference to call the `sayHello` method for each person. The method reference `Person::sayHello` refers to the `sayHello` method of the `Person` class.

## 4. Reference to an Instance Method of an Arbitrary Object of a Particular Type

A reference to an instance method of an arbitrary object of a particular type allows us to use a method reference to call an instance method of the first argument of the specified type. It is denoted by the syntax `ClassName::instanceMethodName`.

### Example: Reference to an Instance Method of an Arbitrary Object of a Particular Type

```java
import java.util.Arrays;
import java.util.List;

class StringUtils {
    public boolean startsWithA(String s) {
        return s.startsWith("A");
    }
}

public class MethodReferenceExample {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Cherry");

        // Using lambda expression
        words.stream()
             .filter(s -> s.startsWith("A"))
             .forEach(System.out::println);

        // Using method reference
        StringUtils stringUtils = new StringUtils();
        words.stream()
             .filter(stringUtils::startsWithA)


             .forEach(System.out::println);
    }
}
```

In this example, we have a list of words, and we use a lambda expression and a method reference to filter the words that start with the letter "A." The method reference `stringUtils::startsWithA` refers to the `startsWithA` method of the `StringUtils` class.

## 5. Reference to a Constructor

A reference to a constructor allows us to use a method reference to create objects using a constructor. It is denoted by the syntax `ClassName::new`.

### Example: Reference to a Constructor

```java
import java.util.function.Supplier;

class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public class MethodReferenceExample {

    public static void main(String[] args) {
        // Using lambda expression
        Supplier<Person> personSupplier1 = () -> new Person("Alice");
        Person alice = personSupplier1.get();

        // Using method reference
        Supplier<Person> personSupplier2 = Person::new;
        Person bob = personSupplier2.get();

        System.out.println(alice.getName()); // Output: Alice
        System.out.println(bob.getName());   // Output: null
    }
}
```

In this example, we use a lambda expression and a method reference to create instances of the `Person` class. The method reference `Person::new` refers to the constructor of the `Person` class.

## 6. Method References with Generic Methods

Method references can be used with generic methods as well.

### Example: Using Method Reference with Generic Method

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

class StringUtils {
    public static <T> boolean startsWithLetter(T s, Predicate<T> predicate) {
        return predicate.test(s);
    }
}

public class MethodReferenceExample {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Cherry");

        // Using lambda expression
        boolean startsWithA1 = StringUtils.startsWithLetter("Apple", s -> s.startsWith("A"));
        System.out.println(startsWithA1); // Output: true

        // Using method reference
        boolean startsWithA2 = StringUtils.startsWithLetter("Apple", String::startsWith);
        System.out.println(startsWithA2); // Output: true
    }
}
```

In this example, we have a generic method `startsWithLetter` that takes a string and a predicate as arguments and checks if the string satisfies the predicate. We use both a lambda expression and a method reference to check if the word "Apple" starts with the letter "A."

## 7. Constructor Reference with Generic Class

Constructor references can also be used with generic classes.

### Example: Constructor Reference with Generic Class

```java
import java.util.function.Function;

class Pair<T, U> {
    private T first;
    private U second;

    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() {
        return first;
    }

    public U getSecond() {
        return second;
    }
}

public class MethodReferenceExample {

    public static void main(String[] args) {
        // Using lambda expression
        Function<Integer, Pair<Integer, String>> pairCreator1 = (x) -> new Pair<>(x, "Hello");
        Pair<Integer, String> pair1 = pairCreator1.apply(42);

        // Using constructor reference
        Function<Integer, Pair<Integer, String>> pairCreator2 = Pair::new;
        Pair<Integer, String> pair2 = pairCreator2.apply(42);

        System.out.println(pair1.getFirst() + ", " + pair1.getSecond()); // Output: 42, Hello
        System.out.println(pair2.getFirst() + ", " + pair2.getSecond()); // Output: 42, Hello
    }
}
```

In this example, we have a generic class `Pair` that represents a pair of two values. We use both a lambda expression and a constructor reference to create instances of the `Pair` class with an integer and a string.

## 8. Method References with Collections

Method references can be used with collections and streams to perform various operations concisely.

### Example: Using Method Reference with Collections

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class StringUtils {
    public static boolean startsWithA(String s) {
        return s.startsWith("A");
    }
}

public class MethodReferenceExample {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Cherry");

        // Using lambda expression
        List<String> filteredWords1 = new ArrayList<>();
        for (String word : words) {
            if (StringUtils.startsWithA(word)) {
                filteredWords1.add(word);
            }
        }

        // Using method reference
        List<String> filteredWords2 = new ArrayList<>();
        words.forEach(word -> {
            if (StringUtils.startsWithA(word)) {
                filteredWords2.add(word);
            }
        });

        System.out.println(filteredWords1); // Output: [Apple]
        System.out.println(filteredWords2); // Output: [Apple]
    }
}
```

In this example, we have a list of words, and we use both a lambda expression and a method reference to filter the words that start with the letter "A" and add them to a new list.

## 9. Limitations of Method References

While method references are a powerful and concise way to refer to methods, there are certain limitations to keep in mind:

1. **No Overloaded Methods**: Method references can only be used when the method name and argument types uniquely identify a single method. If there are overloaded methods with the same name but different argument types, the compiler may not be able to determine which method reference to use.

2. **Access to Instance Methods**: For instance methods, the method reference must have access to an object of the class on which the method is defined. If the method is non-static and belongs to a different class, we must use a reference to an instance method of a particular object.

3. **No Mutating Operations**: Method references cannot be used for methods that modify the state of an object. They are meant for operations that do not have side effects.

4. **Ambiguity**: In certain scenarios, the use of method references can lead to ambiguity if there are multiple compatible methods to choose from.

## 10. Conclusion

In this chapter, we explored the concept of method references in Java. Method references provide a more compact and elegant syntax for lambda expressions that directly call a method. We learned about the four types of method references: reference to a static method, reference to an instance method of a particular object, reference to an instance method of an arbitrary object of a particular type, and reference to a constructor.

Method references simplify code and enhance functional-style programming by making the code more expressive and concise. They are particularly useful when the lambda expression is a direct call to an existing method. However, there are certain limitations and considerations to keep in mind while using method references.

In the next chapter, we will explore more advanced topics related to functional programming in Java, including working with functional interfaces from the Java Standard Library, handling exceptions in lambda expressions, and creating custom

 functional interfaces for specialized use cases.

**Next Chapter: Chapter 7: Lambda Functions and Streams**