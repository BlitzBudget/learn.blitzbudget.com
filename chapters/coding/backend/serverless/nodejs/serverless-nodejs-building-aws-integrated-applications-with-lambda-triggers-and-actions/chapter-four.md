# Chapter 4: Using Amazon Polly in Node.js

In this chapter, we'll explore how to integrate Amazon Polly, AWS's Text-to-Speech service, into our Node.js serverless applications. Amazon Polly allows us to convert text into lifelike speech using advanced deep learning technologies. We'll walk through the process of setting up Amazon Polly, making API calls to convert text to speech, and storing the results in AWS S3.

## Prerequisites

Before we begin, ensure you have the following prerequisites:

1. An AWS account with the AWS CLI installed and configured. If you haven't set up an AWS account and the AWS CLI, refer to Chapter 2 for instructions.

2. Node.js and npm installed on your system. You can download the latest version of Node.js from the official website (https://nodejs.org) and follow the installation instructions.

3. Basic knowledge of JavaScript and Node.js.

## Setting Up Amazon Polly

To use Amazon Polly, we first need to set it up in the AWS Management Console:

1. Go to the AWS Management Console (https://aws.amazon.com/console/) and log in to your AWS account.

2. Navigate to the Amazon Polly service.

3. Click on "Create speech" in the Amazon Polly console.

4. Choose the settings for your speech synthesis, such as language, voice, and output format.

5. Click "Create" to generate the speech.

Once Amazon Polly is set up, we can start integrating it into our Node.js application.

## Installing the AWS SDK

To interact with AWS services, including Amazon Polly, we need the AWS SDK for JavaScript. Install it as a project dependency using npm:

```bash
npm install aws-sdk
```

## Making API Calls to Amazon Polly

With the AWS SDK installed, we can start making API calls to Amazon Polly. The main API method we'll use is `synthesizeSpeech`, which converts text to speech. Let's create a new file named `polly.js` and add the following code:

```javascript
// polly.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const polly = new AWS.Polly();

const text = "Hello, welcome to the world of Amazon Polly. We're excited to have you here!";
const params = {
  Text: text,
  OutputFormat: 'mp3',
  VoiceId: 'Joanna', // Change the voice as desired
};

polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log("Error:", err);
  } else if (data.AudioStream instanceof Buffer) {
    fs.writeFileSync('output.mp3', data.AudioStream);
    console.log("Audio generated and saved as output.mp3");
  }
});
```

In this example, we create an instance of the AWS Polly service and use the `synthesizeSpeech` method to convert the given `text` into speech. We specify the output format as `mp3`, but you can choose other formats like `ogg_vorbis` or `pcm`. Additionally, we can set the `VoiceId` to choose a specific voice. Amazon Polly provides a variety of voices in different languages and tones.

When we run this code, it will generate an MP3 file named `output.mp3` with the speech corresponding to the given `text`.

## Storing Speech Output in AWS S3

Now that we can generate speech with Amazon Polly, let's store the speech output in AWS S3. This way, we can access the audio files from anywhere and use them in our applications.

First, ensure that you have an AWS S3 bucket created. If not, you can create one using the AWS Management Console.

Now, let's modify our `polly.js` code to upload the speech output to AWS S3:

```javascript
// polly.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

const polly = new AWS.Polly();
const s3 = new AWS.S3();

const text = "Hello, welcome to the world of Amazon Polly. We're excited to have you here!";
const params = {
  Text: text,
  OutputFormat: 'mp3',
  VoiceId: 'Joanna', // Change the voice as desired
};

polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log("Error:", err);
  } else if (data.AudioStream instanceof Buffer) {
    // Upload the audio to AWS S3
    const uploadParams = {
      Bucket: 'your-bucket-name', // Replace 'your-bucket-name' with your S3 bucket name
      Key: 'output.mp3',
      Body: data.AudioStream,
      ContentType: 'audio/mpeg',
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log("Error uploading to S3:", err);
      } else {
        console.log("Audio uploaded successfully to S3:", data.Location);
      }
    });
  }
});
```

In this updated code, we create an instance of the AWS S3 service and use the `upload` method to upload the speech output as an MP3 file to the specified S3 bucket. Remember to replace `'your-bucket-name'` with the actual name of your S3 bucket.

Now, when you run the `polly.js` script, the speech output will be uploaded to your S3 bucket, and you'll receive a message indicating the successful upload and the URL of the uploaded audio file.

## Conclusion

In this chapter, we've learned how to integrate Amazon Polly, AWS's Text-to-Speech service, into our Node.js serverless applications. We've covered how to set up Amazon Polly, make API calls to convert text to speech, and store the speech output in AWS S3.

With Amazon Polly, you can add natural-sounding speech capabilities to your applications, enabling you to provide voice-based interactions, narration, and accessibility features. This can be particularly useful in scenarios like audiobook creation, language translation, or providing voice feedback to users.

In the next chapters, we'll explore more AWS services and demonstrate how to leverage them with Node.js to build powerful and dynamic serverless applications. Stay tuned for more exciting tutorials and examples!