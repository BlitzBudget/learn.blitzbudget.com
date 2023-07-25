# Chapter 13: Working with Audio and Video in Vanilla JavaScript

As web development continues to evolve, multimedia elements like audio and video have become integral parts of modern websites. Integrating audio and video content can greatly enhance user engagement and provide a more interactive experience. In this chapter, we will explore how to work with audio and video elements in Vanilla JavaScript, enabling you to add dynamic and interactive media content to your web applications.

## Understanding the `<audio>` and `<video>` Elements

The HTML5 specification introduced the `<audio>` and `<video>` elements, providing a standardized way to embed audio and video content directly into web pages. These elements offer a wide range of features, making it easy to control multimedia playback, adjust volume, and respond to various events.

### The `<audio>` Element

The `<audio>` element is used to embed audio content on a webpage. It supports various audio formats such as MP3, WAV, Ogg, and more, allowing you to provide fallback options for different browsers. Let's take a look at a basic example of using the `<audio>` element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audio Example</title>
</head>
<body>
  <h1>Audio Example</h1>
  <audio controls>
    <source src="audio/sample.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</body>
</html>
```

In this example, we have an `<audio>` element with the `controls` attribute, which adds default audio controls like play, pause, and volume sliders to the element. Inside the `<audio>` element, we use the `<source>` element to specify the audio file's source and its MIME type.

If the browser supports the audio format (in this case, MP3), it will use the provided source. Otherwise, it will display the text "Your browser does not support the audio element."

### The `<video>` Element

Similarly, the `<video>` element is used to embed video content on a webpage. It supports various video formats such as MP4, WebM, and Ogg. Let's take a look at a basic example of using the `<video>` element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Video Example</title>
</head>
<body>
  <h1>Video Example</h1>
  <video controls width="640" height="360">
    <source src="video/sample.mp4" type="video/mp4">
    Your browser does not support the video element.
  </video>
</body>
</html>
```

In this example, we have a `<video>` element with the `controls` attribute, which provides standard video controls. We also set the `width` and `height` attributes to specify the video's dimensions.

Inside the `<video>` element, we use the `<source>` element to specify the video file's source and its MIME type. As with the `<audio>` element, if the browser supports the video format (in this case, MP4), it will use the provided source. Otherwise, it will display the text "Your browser does not support the video element."

## JavaScript Interaction with Audio and Video Elements

Vanilla JavaScript allows us to interact with `<audio>` and `<video>` elements to control playback, adjust volume, respond to events, and add custom functionality. Let's explore some common JavaScript interactions with audio and video elements:

### Playing and Pausing Media

You can use JavaScript to control the playback of audio and video elements. The `play()` method starts playback, while the `pause()` method pauses it. Let's create a simple example to play and pause an audio element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audio Controls</title>
</head>
<body>
  <h1>Audio Controls</h1>
  <audio id="audioPlayer" controls>
    <source src="audio/sample.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <button onclick="playAudio()">Play</button>
  <button onclick="pauseAudio()">Pause</button>

  <script>
    const audioPlayer = document.getElementById('audioPlayer');

    function playAudio() {
      audioPlayer.play();
    }

    function pauseAudio() {
      audioPlayer.pause();
    }
  </script>
</body>
</html>
```

In this example, we have added two buttons to play and pause the audio element. The JavaScript functions `playAudio()` and `pauseAudio()` interact with the `<audio>` element's `play()` and `pause()` methods, respectively.

### Controlling Volume

You can also control the volume of audio and video elements using JavaScript. The `volume` property ranges from 0.0 to 1.0, where 0.0 is muted, and 1.0 is full volume. Let's create an example to adjust the volume of an audio element using a range input:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Volume Control</title>
</head>
<body>
  <h1>Volume Control</h1>
  <audio id="audioPlayer" controls>
    <source src="audio/sample.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="1" oninput="adjustVolume()">

  <script>
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeSlider = document.getElementById('volumeSlider');

    function adjustVolume() {
      audioPlayer.volume = volumeSlider.value;
    }
  </script>
</body>
</html>
```

In this example, we have added a range input with the `volumeSlider` id to control the volume of the audio element. The JavaScript function `adjustVolume()` sets the `<audio>` element's `volume` property to the current value of the volume slider.

### Responding to Playback Events

Audio and video elements emit various events during playback, allowing us to respond to different states. The most common events include `play`, `pause`, `ended`, `timeupdate`, and `loadedmetadata`. Let's create an example to display the current playback time of an audio element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playback Status</title>
</head>
<body>
  <h1>Playback Status</h1>
  <audio id="audioPlayer" controls>
    <source src="audio/sample

.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <p>Current Time: <span id="currentTime">0:00</span></p>

  <script>
    const audioPlayer = document.getElementById('audioPlayer');
    const currentTimeElement = document.getElementById('currentTime');

    audioPlayer.addEventListener('timeupdate', () => {
      const currentTime = formatTime(audioPlayer.currentTime);
      currentTimeElement.textContent = currentTime;
    });

    function formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
  </script>
</body>
</html>
```

In this example, we have added a paragraph element with the `currentTime` id to display the current time of the audio element. The JavaScript code listens for the `timeupdate` event on the `<audio>` element, updating the displayed time accordingly.

### Full-Screen Video

You can also enable full-screen mode for video elements using JavaScript. The `requestFullscreen()` method allows you to request full-screen mode on an element. Let's create an example to enable full-screen mode for a video element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Full-Screen Video</title>
</head>
<body>
  <h1>Full-Screen Video</h1>
  <video id="videoPlayer" controls width="640" height="360">
    <source src="video/sample.mp4" type="video/mp4">
    Your browser does not support the video element.
  </video>
  <button onclick="enterFullScreen()">Full-Screen</button>

  <script>
    const videoPlayer = document.getElementById('videoPlayer');

    function enterFullScreen() {
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
      } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen();
      } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
      } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
      }
    }
  </script>
</body>
</html>
```

In this example, we have added a button to enter full-screen mode for the video element. The `enterFullScreen()` function checks for different browser-specific methods to request full-screen mode.

## Ensuring Cross-Browser Compatibility

While the `<audio>` and `<video>` elements are widely supported in modern browsers, cross-browser compatibility is still essential, as older browsers may not fully support all features or codecs. Here are some tips to ensure cross-browser compatibility when working with audio and video elements:

### Provide Fallback Options

Always provide fallback options for audio and video content in case the browser does not support the specified format. Use the `<source>` element to include multiple sources in different formats, allowing the browser to choose a compatible format. Additionally, include descriptive text or alternative content within the elements to inform users if the content cannot be played.

```html
<audio controls>
  <source src="audio/sample.mp3" type="audio/mpeg">
  <source src="audio/sample.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

```html
<video controls width="640" height="360">
  <source src="video/sample.mp4" type="video/mp4">
  <source src="video/sample.webm" type="video/webm">
  Your browser does not support the video element.
</video>
```

### Feature Detection

Use feature detection instead of browser detection to check if certain features are supported. Avoid relying on browser-specific properties or methods, as they may vary across different browsers.

```javascript
const audioPlayer = document.createElement('audio');

if (audioPlayer.canPlayType('audio/mpeg')) {
  // MP3 format is supported
} else if (audioPlayer.canPlayType('audio/ogg')) {
  // Ogg format is supported
} else {
  // Audio format not supported
}
```

### Use External Libraries

Consider using external libraries or plugins that provide fallback mechanisms and handle cross-browser compatibility for audio and video elements. Popular libraries like MediaElement.js and Video.js offer additional features and browser support out of the box.

## Conclusion

Working with audio and video in Vanilla JavaScript allows us to create engaging and interactive multimedia experiences for users. The `<audio>` and `<video>` elements provide a simple and standardized way to embed audio and video content directly into web pages.

In this chapter, we explored how to interact with audio and video elements using JavaScript, such as controlling playback, adjusting volume, and responding to various events. We also discussed the importance of ensuring cross-browser compatibility and provided tips on providing fallback options and using feature detection.

By mastering the manipulation of audio and video elements in Vanilla JavaScript, you can enhance your web applications and create dynamic, multimedia-rich experiences for your users.