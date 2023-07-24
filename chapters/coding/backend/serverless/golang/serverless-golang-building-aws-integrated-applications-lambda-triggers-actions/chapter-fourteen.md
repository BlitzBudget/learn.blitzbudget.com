**Chapter 14: Managing Environment Variables**

Welcome to Chapter 14 of our comprehensive guide on building serverless applications with Go! In this chapter, we'll focus on managing environment variables in Go Lambda functions. Environment variables are a fundamental aspect of configuring serverless applications, allowing you to store sensitive information, such as API keys, database credentials, and configuration settings, separately from your code.

**Why Use Environment Variables?**

Environment variables offer several advantages when managing your serverless application's configuration:

1. **Security:** Storing sensitive information, such as API keys and database credentials, in environment variables keeps them separate from your code, reducing the risk of accidental exposure.

2. **Configuration Flexibility:** Environment variables provide a flexible way to configure your application without modifying the code. You can change settings easily between deployments without redeploying the entire application.

3. **Scalability:** With serverless applications, you can dynamically adjust the number of function instances based on demand. Environment variables allow you to configure each instance independently, making your application scalable.

**How to Manage Environment Variables in Go Lambdas**

There are several ways to manage environment variables in Go Lambdas. We'll explore the following approaches:

1. **AWS Lambda Console:** You can configure environment variables directly in the AWS Lambda Management Console. This approach is simple and suitable for static configurations.

2. **AWS Systems Manager Parameter Store:** AWS SSM Parameter Store provides a centralized and secure way to store and manage configuration data, including sensitive information. You can use it to store environment variables and retrieve them programmatically.

3. **AWS Secrets Manager:** AWS Secrets Manager is designed specifically for managing secrets, such as database credentials or API keys. It provides an encrypted and secure way to store and retrieve sensitive information.

**Using Environment Variables from the AWS Lambda Console**

The AWS Lambda Management Console provides a straightforward way to set environment variables for your Go Lambda function:

1. Open the AWS Management Console and navigate to the AWS Lambda service.
2. Select your Lambda function and click on the "Configuration" tab.
3. Scroll down to the "Environment variables" section.
4. Click on "Edit" and add the key-value pairs for your environment variables.
5. Click "Save" to apply the changes.

Once you've set the environment variables, you can access them in your Go Lambda function using the `os.Getenv` function. Here's an example:

```go
package main

import (
	"fmt"
	"os"

	log "github.com/sirupsen/logrus"
)

func main() {
	apiKey := os.Getenv("API_KEY")
	dbPassword := os.Getenv("DB_PASSWORD")

	fmt.Printf("API Key: %s, DB Password: %s\n", apiKey, dbPassword)

	// Your Lambda function logic here
}
```

In this example, we use the `os.Getenv` function to access the values of the environment variables "API_KEY" and "DB_PASSWORD" that we set in the Lambda console.

**Using Environment Variables from AWS Systems Manager Parameter Store**

AWS Systems Manager Parameter Store allows you to store configuration data as parameters and retrieve them programmatically using the AWS SDK for Go. To use this approach:

1. Open the AWS Management Console and navigate to the AWS Systems Manager service.
2. Click on "Create parameter" and provide the parameter details, including the name, description, value, and data type. You can choose "SecureString" as the data type for sensitive information.
3. Click "Create parameter" to save the parameter.

To retrieve the parameter value in your Go Lambda function, you can use the AWS SDK for Go:

```go
package main

import (
	"fmt"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ssm"
)

func main() {
	apiKey, err := getParameterFromSSM("API_KEY")
	if err != nil {
		log.Errorf("Error getting API key: %v", err)
		return
	}

	dbPassword, err := getParameterFromSSM("DB_PASSWORD")
	if err != nil {
		log.Errorf("Error getting DB password: %v", err)
		return
	}

	fmt.Printf("API Key: %s, DB Password: %s\n", apiKey, dbPassword)

	// Your Lambda function logic here
}

func getParameterFromSSM(name string) (string, error) {
	sess, err := session.NewSession()
	if err != nil {
		return "", err
	}

	ssmSvc := ssm.New(sess)

	input := &ssm.GetParameterInput{
		Name:           &name,
		WithDecryption: aws.Bool(true),
	}

	result, err := ssmSvc.GetParameter(input)
	if err != nil {
		return "", err
	}

	return *result.Parameter.Value, nil
}
```

In this example, we define a function `getParameterFromSSM` that retrieves a parameter from AWS SSM Parameter Store using the AWS SDK for Go. We call this function to get the values of the "API_KEY" and "DB_PASSWORD" parameters.

**Using Environment Variables from AWS Secrets Manager**

AWS Secrets Manager provides a secure and managed way to store and retrieve secrets. To use this approach:

1. Open the AWS Management Console and navigate to the AWS Secrets Manager service.
2. Click on "Store a new secret" and provide the secret details, including the secret name, description, and secret value.
3. Click "Next" and configure additional settings if needed.
4. Click "Next" again, review the settings, and click "Store secret" to save the secret.

To retrieve the secret value in your Go Lambda function, you can use the AWS SDK for Go:

```go
package main

import (
	"fmt"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
)

func main() {
	apiKey, err := getSecretFromSecretsManager("API_KEY")
	if err != nil {
		log.Errorf("Error getting API key: %v", err)
		return
	}

	dbPassword, err := getSecretFromSecretsManager("DB_PASSWORD")
	if err != nil {
		log.Errorf("Error getting DB password: %v", err)
		return
	}

	fmt.Printf("API Key: %s, DB Password: %s\n", apiKey, dbPassword)

	// Your Lambda function logic here
}

func getSecretFromSecretsManager(secretName string) (string, error) {
	sess, err := session.NewSession()
	if err != nil {
		return "", err
	}

	secretsMgr := secretsmanager.New(sess)

	input := &secretsmanager.GetSecretValueInput{
		SecretId: &secretName,
	}

	result, err := secretsMgr.GetSecretValue(input)
	if err != nil {
		return "", err
	}

	return *result.SecretString, nil
}
```

In this example, we define a function `getSecretFromSecretsManager` that retrieves a secret from AWS Secrets Manager using the AWS SDK for Go. We call this function to get the values of the "API_KEY" and "DB_PASSWORD" secrets.

**Conclusion**

In this chapter, we've explored different methods for managing environment variables in Go Lambdas. Environment variables offer a flexible and secure way to configure your serverless applications, allowing you to store sensitive information separately from

 your code.

By using environment variables effectively, you can create scalable and maintainable serverless applications that are easy to configure and manage. Whether you choose to use the AWS Lambda Console, AWS Systems Manager Parameter Store, or AWS Secrets Manager, each method provides unique benefits for handling configuration data.

In the next chapter, we'll dive into AWS Step Functions, a serverless workflow service, and learn how to orchestrate complex workflows and manage the state of your serverless applications with Go Lambdas. Stay tuned for more exciting content on serverless Go development and AWS cloud services!