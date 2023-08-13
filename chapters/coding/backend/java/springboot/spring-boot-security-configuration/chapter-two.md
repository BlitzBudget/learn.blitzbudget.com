# Chapter 2: Basic Security Setup in Spring Boot

In this chapter, we'll delve into the foundational steps of setting up basic security for your Spring Boot application. Security is a paramount consideration in modern web development, and Spring Boot provides powerful tools to easily integrate security features into your application. We'll cover adding the Spring Boot Security dependency, configuring security settings using property files, and creating a basic authenticated endpoint to demonstrate the core concepts of security setup.

## Table of Contents

1. Introduction to Basic Security Setup
2. Adding Spring Boot Security Dependency
3. Configuration via `application.properties` and `application.yml`
4. Setting Up a Basic Authenticated Endpoint
5. Example: Securing a RESTful API

## 1. Introduction to Basic Security Setup

Before delving into the technical details, let's establish a clear understanding of why basic security setup is crucial for Spring Boot applications. In a digital landscape riddled with cybersecurity threats, safeguarding sensitive data and ensuring secure user interactions are paramount. Basic security measures form the foundation upon which more advanced security features can be built. With Spring Boot's seamless integration, even beginners can ensure their applications are fortified against common vulnerabilities.

## 2. Adding Spring Boot Security Dependency

Spring Boot Security is an extension of the Spring Security framework tailored for Spring Boot applications. To start building a secure application, the first step is to include the Spring Boot Security dependency. This dependency encapsulates all the necessary components to enable security features. The dependency can be added to your project by including the following snippet in your build configuration files:

### Example: Maven

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Other dependencies -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

### Example: Gradle

```groovy
// build.gradle
dependencies {
    // Other dependencies
    implementation 'org.springframework.boot:spring-boot-starter-security'
}
```

By adding this dependency, you equip your project with the core components necessary for implementing security mechanisms.

## 3. Configuration via `application.properties` and `application.yml`

One of the standout features of Spring Boot is its ability to simplify configuration. Spring Boot Security settings can be configured using property files such as `application.properties` or `application.yml`. These files should be placed in the `src/main/resources` directory of your project.

### Example: `application.yml` Configuration

```yaml
# src/main/resources/application.yml
spring:
  security:
    user:
      name: your-username
      password: your-password
```

In this example, we're setting a default username and password for basic authentication. However, this approach is primarily suited for development and testing purposes. In a production environment, it's essential to use more secure authentication mechanisms, such as integrating with authentication providers or databases.

## 4. Setting Up a Basic Authenticated Endpoint

Now that you've added the Spring Boot Security dependency and configured the security settings, you can proceed to set up a basic authenticated endpoint. With Spring Boot, securing an endpoint is remarkably straightforward, thanks to annotations.

To create a basic authenticated endpoint, follow these steps:

1. Create a class annotated with `@Configuration` to define security configurations.
2. Use the `@EnableWebSecurity` annotation to enable web security for your application.
3. Extend the `WebSecurityConfigurerAdapter` class to customize security settings.

### Example: Basic Security Configuration

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // Additional configurations can be added here
}
```

In this example, we've used the `@EnableWebSecurity` annotation to enable security configurations. Extending the `WebSecurityConfigurerAdapter` class allows you to customize security settings.

To secure a specific endpoint, you can use the `@Secured` annotation. Let's say you have a REST controller with an endpoint `/api/hello` that you want to secure:

### Example: Securing an Endpoint

```java
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    @Secured("ROLE_USER")
    public String hello() {
        return "Hello, authenticated user!";
    }
}
```

In this example, the `@Secured("ROLE_USER")` annotation ensures that only users with the role "ROLE_USER" can access the `/api/hello` endpoint.

## 5. Example: Securing a RESTful API

Let's explore a more comprehensive example of securing a RESTful API using Spring Boot Security. Suppose you're building a basic task management application with RESTful endpoints. You want to

 secure certain endpoints to ensure only authenticated users can perform actions.

### Example: Securing RESTful Endpoints

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
                .antMatchers("/api/public/**").permitAll() // Public endpoints
                .antMatchers("/api/tasks/**").authenticated() // Authenticated endpoints
            .and()
            .formLogin()
                .permitAll()
            .and()
            .logout()
                .permitAll();
    }
}
```

In this example, we're configuring security rules using the `HttpSecurity` object. We permit public access to endpoints under `/api/public/` while requiring authentication for endpoints under `/api/tasks/`. The `formLogin()` configuration sets up a login form, and `logout()` configures the logout process.

## Conclusion

Setting up basic security for your Spring Boot application is a foundational step toward building secure and robust software. By adding the Spring Boot Security dependency, configuring security settings, and securing endpoints, you establish a secure environment for user interactions. The provided examples demonstrate how to secure specific endpoints and create a secure RESTful API. In the next chapter, we'll delve into more advanced authentication and authorization configurations, enhancing your application's security even further.

---