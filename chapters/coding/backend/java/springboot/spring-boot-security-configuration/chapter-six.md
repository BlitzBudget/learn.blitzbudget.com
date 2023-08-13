# Chapter 6: Role-Based Authorization in Spring Boot

In this chapter, we'll dive into the concept of role-based authorization in Spring Boot applications. Role-based authorization is a crucial aspect of access control that allows administrators to define roles for users and restrict their actions based on these roles. We'll explore how to apply role-based access control, secure endpoints based on user roles, and customize access denied handling. By mastering role-based authorization, developers can create applications with fine-tuned access control, ensuring that users only have access to the functionality relevant to their roles.

## Table of Contents

1. Understanding Role-Based Authorization
2. Applying Role-Based Access Control
3. Securing Endpoints Based on User Roles
4. Customizing Access Denied Handling
5. Example: Building a Role-Based Authorization System

## 1. Understanding Role-Based Authorization

Role-based authorization is a fundamental approach to managing access control in applications. It revolves around assigning specific roles to users and granting them permissions based on these roles. Each role represents a set of permissions that determine what actions a user can perform within the application.

## 2. Applying Role-Based Access Control

Spring Security provides a robust framework for applying role-based access control. The key components are roles, authorities, and permissions.

### 2.1 Roles and Authorities

Roles are high-level groupings that represent a set of authorities. Authorities, in turn, define the specific permissions granted to users with a certain role.

### 2.2 Granting Authorities

Spring Security allows you to grant authorities to users based on their roles.

#### Example: Granting Authorities

```java
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

User user = new User(
    "username",
    "password",
    List.of(new SimpleGrantedAuthority("ROLE_USER"))
);
```

In this example, the user is assigned the "ROLE_USER" authority, indicating that they have the permissions associated with the "ROLE_USER" role.

## 3. Securing Endpoints Based on User Roles

Securing endpoints based on user roles is a core requirement of role-based authorization. Spring Security enables you to achieve this through method-level annotations or configuration.

### 3.1 Method-Level Role Security

Spring Security provides the `@PreAuthorize` and `@PostAuthorize` annotations to secure methods based on user roles.

#### Example: Securing Methods with `@PreAuthorize`

```java
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(long productId) {
        // Implementation
    }
}
```

In this example, the `deleteProduct` method can only be invoked by users with the 'ADMIN' role.

### 3.2 Endpoint-Level Role Security

You can secure endpoints in Spring Boot applications by configuring security rules using `HttpSecurity`.

#### Example: Securing Endpoints with `HttpSecurity`

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/user/**").hasRole("USER")
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }
}
```

In this example, the `/admin/**` endpoints are accessible only to users with the 'ADMIN' role, while the `/user/**` endpoints require the 'USER' role.

## 4. Customizing Access Denied Handling

When a user attempts to access a resource they're not authorized to, Spring Security triggers an access denied exception. You can customize how this exception is handled.

### 4.1 Custom Access Denied Handler

You can define a custom access denied handler to control how access denied exceptions are handled.

#### Example: Custom Access Denied Handler

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            // Custom logic for handling access denied
            response.sendRedirect("/access-denied");
        };
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler())
                .and()
            // Other configurations
    }
}
```

In this example, the custom `accessDeniedHandler` redirects users to an "access-denied" page upon access denial.

## 5. Example: Building a Role-Based Authorization System

Let's dive into a real-world example of implementing a role-based authorization system for a fictional e-commerce platform.

### 5.1 Scenario: Secure E-commerce Application

In our scenario, the e-commerce application has three user roles: 'ADMIN', 'MANAGER', and 'CUSTOMER'. We'll define role-based access control for various application features.

#### Example: Role-Based Authorization Implementation

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/manager/**").hasRole("MANAGER")
                .antMatchers("/customer/**").hasRole("CUSTOMER")
                .anyRequest().authenticated()
                .and()
            // Other configurations
    }
}
```

In this example, administrators have access to the `/admin/**` endpoints, managers can access the `/manager/**` endpoints, and customers are authorized to access the `/customer/**` endpoints.

## Conclusion

Role-based authorization is a fundamental aspect of access control in Spring Boot applications. By applying role-based access control, securing endpoints based on user roles, and customizing access denied handling, developers can create applications with robust and controlled user interactions. The provided examples demonstrate how to implement role-based authorization in both method-level and endpoint-level scenarios. As we continue to explore Spring Boot security, the next chapter will delve into securing your application's RESTful APIs.

---

This chapter has provided an extensive exploration of role-based authorization in Spring Boot applications. By understanding the concept of roles and authorities, securing endpoints based on user roles, and customizing access denied handling, developers can implement a comprehensive role-based access control system. The real-world example illustrated how these concepts can be applied to build a secure and role-aware application. As our journey through Spring Boot security continues, the next chapter will focus on securing RESTful APIs.