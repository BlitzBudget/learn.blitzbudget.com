# Chapter 10: OAuth 2.0 Configuration in Spring Boot

In this chapter, we will delve into the world of OAuth 2.0 configuration in Spring Boot applications. OAuth 2.0 is a powerful authorization framework that allows third-party applications to securely access resources on behalf of users. We will explore how to set up OAuth 2.0 clients and resource servers, configure authorization and token endpoints, and integrate OAuth 2.0 with social logins. By mastering OAuth 2.0 configuration, developers can create secure and seamless authentication experiences for their applications.

## Table of Contents

1. Understanding OAuth 2.0
2. Setting Up OAuth 2.0 Client and Resource Server
3. Configuring Authorization and Token Endpoints
4. Integrating OAuth 2.0 with Social Logins
5. Example: Implementing OAuth 2.0 Configuration

## 1. Understanding OAuth 2.0

OAuth 2.0 is an industry-standard protocol for authorization. It enables users to grant third-party applications limited access to their resources without sharing their credentials. OAuth 2.0 operates through various roles, including the client, resource owner, authorization server, and resource server.

## 2. Setting Up OAuth 2.0 Client and Resource Server

Configuring an OAuth 2.0 client and resource server involves defining their respective roles in your Spring Boot application.

### 2.1 Configuring OAuth 2.0 Client

To set up an OAuth 2.0 client, you need to register the client with an authorization server and configure the client's credentials.

#### Example: Configuring OAuth 2.0 Client

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

@Configuration
public class OAuth2Config {

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(
            ClientRegistration.withRegistrationId("my-client")
                .clientId("your-client-id")
                .clientSecret("your-client-secret")
                .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUriTemplate("{baseUrl}/login/oauth2/code/{registrationId}")
                .scope("read", "write")
                .authorizationUri("https://authorization-server.com/oauth2/authorize")
                .tokenUri("https://authorization-server.com/oauth2/token")
                .userInfoUri("https://resource-server.com/userinfo")
                .userNameAttributeName("sub")
                .clientName("My OAuth 2.0 Client")
                .build()
        );
    }
}
```

In this example, we configure an OAuth 2.0 client named "my-client" with its associated properties.

### 2.2 Setting Up OAuth 2.0 Resource Server

Configuring an OAuth 2.0 resource server involves securing your application's resources and validating access tokens.

#### Example: Configuring OAuth 2.0 Resource Server

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Resource;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.SecurityConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenServices(tokenServices());
    }

    private ResourceServerTokenServices tokenServices() {
        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setTokenStore(tokenStore()); // Define your TokenStore
        return tokenServices;
    }
}
```

In this example, we configure an OAuth 2.0 resource server to secure resources using token validation.

## 3. Configuring Authorization and Token Endpoints

OAuth 2.0 involves authorization and token endpoints that handle user authentication and token issuance.

### 3.1 Configuring Authorization Server

To configure an authorization server, you need to define its endpoints and configure its behavior.

#### Example: Configuring Authorization Server

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.configurers.oauth2.client.OAuth2AuthorizationCodeGrantConfigurer;
import org.springframework

.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationService;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    private final TokenStore tokenStore;
    private final ClientRegistrationService clientRegistrationService;

    public AuthorizationServerConfig(TokenStore tokenStore, ClientDetailsService clientDetailsService) {
        this.tokenStore = tokenStore;
        this.clientRegistrationService = clientDetailsService;
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        // Configure security options
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
            .tokenStore(tokenStore)
            .clientDetailsService(clientRegistrationService);
            // Other configurations
    }
}
```

In this example, we configure an authorization server, specifying the token store and client details service.

### 3.2 Configuring Token Endpoint

The token endpoint is crucial for obtaining access tokens.

#### Example: Configuring Token Endpoint

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    // ...

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
            .tokenStore(tokenStore)
            .clientDetailsService(clientRegistrationService)
            .tokenEndpointCustomizer(tokenEndpoint -> {
                // Configure token endpoint
            });
            // Other configurations
    }
}
```

Here, the `.tokenEndpointCustomizer()` allows you to configure the token endpoint.

## 4. Integrating OAuth 2.0 with Social Logins

OAuth 2.0 can be integrated with social login providers to enable users to log in using their existing accounts.

### 4.1 Integrating with Social Login

To integrate OAuth 2.0 with social logins, you need to configure the respective client registrations.

#### Example: Integrating with Google

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .loginPage("/login")
                .clientRegistrationRepository(clientRegistrationRepository);
            // Other configurations
    }
}
```

In this example, we integrate with Google for OAuth 2.0-based social login.

## 5. Example: Implementing OAuth 2.0 Configuration

Let's implement OAuth 2.0 configuration in a practical scenario.

### 5.1 Scenario: Secure API Access

Consider a scenario where you're building an API that requires secure access through OAuth 2.0.

#### Example: OAuth 2.0 Configuration

```java
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    // ... (Previous configuration)

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
            .tokenStore(tokenStore)
            .clientDetailsService(clientRegistrationService)
            .tokenEndpointCustomizer(tokenEndpoint -> {
                // Configure token endpoint
            })
            .pathMapping("/oauth/token", "/secure/token"); // Custom token endpoint path
            // Other configurations
    }
}
```

This example showcases configuring an authorization server for securing API access.

## Conclusion

OAuth 2.0 is a versatile framework that empowers applications with secure and seamless authorization. By understanding how to set up OAuth 2.0 clients and resource servers, configuring authorization and token endpoints, and integrating OAuth 2.0 with social logins, developers can implement robust authentication mechanisms. The provided examples offer insights into OAuth 2.0 configuration. As we continue our exploration of Spring Boot security, the next chapter will focus on securing communication within your application using Transport Layer Security (TLS).

---

This chapter has provided an extensive exploration of OAuth 2.0 configuration in Spring Boot applications. By understanding its components, setting up clients and resource servers, configuring authorization and token endpoints, and integrating social logins, developers can create secure authentication systems. The practical example showcased the implementation of OAuth 2.0 for securing API access. As our journey through Spring Boot security continues, the upcoming chapter will delve into securing communication using Transport Layer Security (TLS).