# Chapter 5: Method-Level Security in Spring Boot

In this chapter, we'll explore the powerful world of method-level security in Spring Boot applications. Method-level security allows for fine-grained access control over specific methods within your application. We'll dive into annotations like `@PreAuthorize` and `@PostAuthorize`, the usage of Spring Expression Language (SpEL) expressions for access control, and how to combine method security with global configuration. This level of security granularity enables developers to ensure that critical methods are only accessible by authorized users, bolstering the overall security of the application.

## 1. Securing Methods with `@PreAuthorize` and `@PostAuthorize`

Spring Security provides annotations that enable you to secure methods with `@PreAuthorize` and `@PostAuthorize`. These annotations allow you to specify access control rules that determine if a method can be invoked or if its results can be returned.

### 1.1 `@PreAuthorize`: Controlling Access Before Invocation

The `@PreAuthorize` annotation is used to specify that a method can only be invoked if the provided expression evaluates to `true` before the method is invoked.

#### Example: Restricting Access with `@PreAuthorize`

```java
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @PreAuthorize("hasRole('USER')")
    public Order createOrder(Order order) {
        // Implementation
    }
}
```

In this example, the `createOrder` method can only be invoked by users with the 'USER' role.

### 1.2 `@PostAuthorize`: Controlling Access After Invocation

The `@PostAuthorize` annotation ensures that a method can only be invoked if the provided expression evaluates to `true` after the method is invoked.

#### Example: Verifying Access with `@PostAuthorize`

```java
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @PostAuthorize("returnObject.customer.username == authentication.principal.username")
    public Order viewOrder(long orderId) {
        // Implementation
    }
}
```

Here, the `viewOrder` method is only accessible if the customer who placed the order matches the authenticated user.

## 2. Using SpEL Expressions for Access Control

Spring Expression Language (SpEL) empowers you to create dynamic access control rules based on method parameters, return values, and security context information.

### 2.1 Leveraging SpEL Expressions

```java
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @PreAuthorize("#productId > 100 && hasRole('ADMIN')")
    public Product getProductById(long productId) {
        // Implementation
    }
}
```

In this example, the `getProductById` method is only accessible by users with the 'ADMIN' role if the product ID is greater than 100.

## 3. Combining Method Security with Global Configuration

Method-level security can be combined with global security configurations to ensure consistent access control.

### 3.1 Enabling Global Method Security

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {
    // Additional configurations
}
```

By enabling `@PreAuthorize` and `@PostAuthorize` annotations with `@EnableGlobalMethodSecurity`, you can apply method-level security across your application consistently.

## 4. Example: Implementing Method-Level Security

Let's dive into a practical example that demonstrates the implementation of method-level security in a Spring Boot application.

### 4.1 Scenario: Secure E-commerce Platform

Consider a scenario where you're developing an e-commerce platform. You want to ensure that only authorized administrators can process refunds, and customers can only view their own order history.

#### Example: Method-Level Security Implementation

```java
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @PreAuthorize("hasRole('ADMIN')")
    public void processRefund(long orderId) {
        // Implementation
    }

    @PostAuthorize("returnObject.customer.username == authentication.principal.username")
    public List<Order> getOrderHistoryForCustomer(String customerUsername) {
        // Implementation
    }
}
```

In this example, the `processRefund` method can only be invoked by administrators. The `getOrderHistoryForCustomer` method ensures that customers can only retrieve their own order history.

## Conclusion

Method-level security empowers Spring Boot developers to enforce access control at a granular level. With annotations like `@PreAuthorize