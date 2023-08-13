# Chapter 11: Custom Filters and Handlers in Spring Boot

In this chapter, we will explore the power of custom filters and handlers in Spring Boot applications. Custom filters allow you to add tailored authentication and authorization mechanisms, while custom handlers enable you to define behavior upon authentication success or failure. We will delve into creating custom authentication filters, implementing authentication success and failure handlers, and performing advanced request and response manipulation. By mastering custom filters and handlers, developers can fine-tune their security mechanisms to fit their application's unique requirements.

## Table of Contents

1. The Role of Custom Filters and Handlers
2. Creating Custom Authentication Filters
3. Implementing Authentication Success and Failure Handlers
4. Advanced Request and Response Manipulation
5. Example: Enhancing Security with Custom Filters and Handlers

## 1. The Role of Custom Filters and Handlers

Custom filters and handlers play a pivotal role in extending and customizing Spring Boot's security features. They enable developers to inject specialized behavior into the authentication and authorization process.

## 2. Creating Custom Authentication Filters

Creating custom authentication filters allows you to incorporate specialized authentication mechanisms beyond Spring Boot's built-in options.

### 2.1 Creating a Basic Custom Authentication Filter

To create a custom authentication filter, extend the `AbstractAuthenticationProcessingFilter` class and override the necessary methods.

#### Example: Creating a Basic Custom Authentication Filter

```java
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    public CustomAuthenticationFilter() {
        super(new AntPathRequestMatcher("/custom-login", "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        // Custom authentication logic
    }
}
```

In this example, the `CustomAuthenticationFilter` is triggered for POST requests to "/custom-login".

## 3. Implementing Authentication Success and Failure Handlers

Authentication success and failure handlers allow you to define custom behavior after a user successfully logs in or fails to authenticate.

### 3.1 Implementing an Authentication Success Handler

To implement an authentication success handler, implement the `AuthenticationSuccessHandler` interface.

#### Example: Implementing an Authentication Success Handler

```java
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // Custom success handling logic
    }
}
```

In this example, the `CustomAuthenticationSuccessHandler` handles successful authentication.

### 3.2 Implementing an Authentication Failure Handler

Similarly, to implement an authentication failure handler, implement the `AuthenticationFailureHandler` interface.

#### Example: Implementing an Authentication Failure Handler

```java
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        // Custom failure handling logic
    }
}
```

In this example, the `CustomAuthenticationFailureHandler` handles authentication failures.

## 4. Advanced Request and Response Manipulation

Custom filters and handlers also allow for advanced request and response manipulation.

### 4.1 Manipulating Requests

You can manipulate incoming requests to extract additional information for authentication.

#### Example: Manipulating Requests

```java
public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        String customParameter = request.getParameter("customParam");
        // Use custom parameter for authentication logic
    }
}
```

In this example, the `CustomAuthenticationFilter` extracts a custom parameter from the request.

### 4.2 Manipulating Responses

You can manipulate responses to customize the user experience.

#### Example: Manipulating Responses

```java
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        response.sendRedirect("/welcome");
    }
}
```

In this example, the `CustomAuthenticationSuccessHandler` redirects the user after successful authentication.

## 5. Example: Enhancing Security with Custom Filters and Handlers

Let's explore a real-world example of enhancing security with custom filters and handlers.

### 5.1 Scenario: Two-Factor Authentication

Consider a scenario where you're building an application that requires two-factor authentication (2FA).

#### Example: Custom Filter and Handler for 2FA

```java
public class TwoFactorAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        // Perform 2FA validation
    }
}

@Component
public class TwoFactorAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        if (authentication.getPrincipal() instanceof UserWithTwoFactor) {
            response.sendRedirect("/dashboard/secure");
        } else {
            response.sendRedirect("/dashboard");
        }
    }
}
```

In this example, the custom filter and success handler implement 2FA.

## Conclusion

Custom filters and handlers provide

 developers with unparalleled flexibility in shaping Spring Boot's security behavior. By creating custom authentication filters, implementing authentication success and failure handlers, and mastering advanced request and response manipulation, developers can tailor security mechanisms to their application's precise needs. The provided examples demonstrate the power of custom filters and handlers. As we continue our exploration of Spring Boot security, the upcoming chapter will delve into securing sensitive data with encryption techniques.

---

This chapter has offered an in-depth exploration of custom filters and handlers in Spring Boot applications. By understanding their significance, creating custom authentication filters, implementing authentication success and failure handlers, and mastering request and response manipulation, developers can elevate the security of their applications. The practical example showcased the implementation of custom filters and handlers for two-factor authentication. As we progress through Spring Boot security, the next chapter will focus on safeguarding sensitive data using encryption techniques.