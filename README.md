# Parallelix JS
<img src="https://github.com/Neurosell/parallelix/blob/develop/wiki_visuals/Header.png?raw=true" alt="Parallelix JS - cross-platform web-app library for client initialization" style="width: 100%" /><br/>

<p align="center"><b>Parallelix Toolkit</b> - Written in Vanilla JS, a modular library that allows you to forget about the existence of different client SDKs when developing your cross-platform web applications, be it VK Mini Apps, WeChat Mini Apps, Progressive Web App or Apache Cordova based applications</p>

<hr/>

<p align="center"><a href="https://neurosell.gitbook.io/parallelix" target="_blank">Documentation</a> | <a href="https://parallelix.nsell.tech/" target="_blank">Demo</a> | <a href="https://github.com/orgs/Neurosell/projects/1">Roadmap</a></p>

<hr/>

❓**Why Parallelix?**
- Cross-platform operation of your web applications on different platforms (VK Mini Apss, Telegram Mini Apps, Cordova etc.);
- Unified API for working with authorization and other functionality of platforms;
- Modular connection of various libraries required for platforms' operation (for example: VK Bridge);
- Simple to use and easy to learn;

**Supported Platforms:**
- Web Applications and PWA (Progressive Web Apps);
- VK Mini Apps (VK Bridge);
- Telegram Web Apps;

**Coming Soon (<a href="https://github.com/orgs/Neurosell/projects/1">Roadmap</a>):**
- Android, iOS (Apache Cordova Hybrid Apps);
- Windows, Mac, Linux (Electron Apps);
- WeChat;
- VK Direct Games Extension with Additional Methods;
- Yandex Games;

Read more about development progress and new modules in <a href="https://github.com/orgs/Neurosell/projects/1">Roadmap section</a>.

<hr/>

## Get Started
To work with Parallelix - just plug the script into your project and write the configurations. We have described the connection process below.

**1. Download libraries:**
From <a href="https://github.com/Neurosell/parallelix/releases">GitHub</a> and **put all files from "/libraries/" into your project;

**2. In HTML File:**
```html
<script type="text/javascript" src="/libraries/parallelix.js"></script>
```

**3. In your JS Code:**
```javascript
// Configure Parallelix
const client = new Parallelix({
    baseModulesPath: "/libraries/",            // Where your modules located
    supportedPlatforms: ["vk", "telegram"],
    vk: {},
    telegram: {}
});

// Add Error and Initialization Handler
client.OnError = (error) => {};
client.OnInitialized = (data) => {};

// Initialize Client
client.Initialize();
```

**4. After OnInitialized is fired, you can use Parallelix:**
```javascript
client.Platform.PublishStory({ 
    vk: {}, telegram: {}    // Your Stories Parameters
}, (data)=> {
    console.log(data);
}, (error)=> {
    console.error(error.message);
})
```

## Documentation
We have written extensive documentation so that you can quickly learn our product.

<a href="https://neurosell.gitbook.io/parallelix" target="_blank">Visit the documentation</a>

## Support Library
**You can support the development and updating of libraries by dropping a coin:**
<table>
  <tr><td>Bitcoin (BTC)</td><td>bc1qef2d34r4xkrm48zknjdjt7c0ea92ay9m2a7q55</td></tr>
  <tr><td>Etherium (ETH)</td><td>0x1112a2Ef850711DF4dE9c432376F255f416ef5d0</td></tr>
  <tr><td>USDT (TRC20)</td><td>TMR3ZqeXSGgTjqrRtgNBvZRGFKrKHBcNHT</td></tr>
</table>

![Neurosell Libraries](https://github.com/Neurosell/parallelix/blob/develop/wiki_visuals/Footer.png?raw=true)
