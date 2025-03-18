/**
 * Parallelix Client Library
 * 
 * @author                  Neurosell
 * @version                 1.0.0
 * @license                 MIT
 * @author                  Ilya Rastorguev
 * @email                   start@ncommx.com
 * @website                 https://ncommx.com
 * @github                  https://github.com/Neurosell/parallelix
 */

/**
 * Basic Wrapper Class for Platforms Definitions
 * Virtual Class for Platforms Definitions
 * @class                   ParallelixWrapper
 */
class ParallelixWrapper {
    /**
     * Basic Wrapper Constructor
     * @param {object} options 
     */
    constructor(instance, options = {}) {
        this.options = options;
        this.platform = instance;

        // Handled Events
        this.handledEvents = [];
        this.invoker = null;

        /* Add Event Handlers */
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(error.message);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : () => {
            console.log();
        };
    }

    /**
     * Get Platform Priority
     * @returns {number} Priority
     */
    get Priority(){
        console.error("Priority is not implemented in the wrapper");
        return 0;
    }
    
    /**
     * Initialize Wrapper
     */
    Initialize() {
        this.OnInitialized();
    }

    /**
     * Check if this wrapper is for current platform
     * @returns {boolean}
     */
    IsCurrentPlatform(){
        console.error("IsCurrentPlatform is not implemented in the wrapper");
        return false;
    }

    /**
     * Get Platform Launch Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetLaunchParams(onSuccess, onError){
        console.error("GetLaunchParams is not implemented for this platform");
        onError(new Error("GetLaunchParams is not implemented for this platform"));
        return;
    }

    /**
     * Add Platform-Specific Event Listener
     * @param {string} eventName Event Name
     * @param {Function} eventHandler Event Handler
     */
    AddEventListener(eventName, eventHandler = function(data){}){
        this.handledEvents.push({
            eventName: eventName,
            eventHandler: eventHandler
        });
        return this;
    }

    /**
     * Remove Platform-Specific Event Listener
     * @param {string} eventName Event Name
     * @param {Function} eventHandler Event Handler
     */
    RemoveEventListener(eventName, eventHandler = function(data){}){
        this.handledEvents = this.handledEvents.filter(event => event.eventName !== eventName && event.eventHandler !== eventHandler);
        return this;
    }

    /**
     * Get Event Listener
     * @param {string} eventName Event Name
     * @returns {Function} Event Handler
     */
    GetEventListener(eventName){
        return this.handledEvents.find(event => event.eventName === eventName);
    }

    /**
     * Get Client Information
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetClientInfo(onSuccess = (data) => {}, onError = (error) => {}){
        console.error("GetClientInfo is not implemented for this platform");
        onError(new Error("GetClientInfo is not implemented for this platform"));
        return;
    }

    /**
     * Toggle Fullscreen on this Platform
     * @param {boolean} isEnabled Enable or Disable Fullscreen
     */
    ToggleFullscreen(isEnabled){
        console.error("ToggleFullscreen is not implemented for this platform");
        onError(new Error("ToggleFullscreen is not implemented for this platform"));
        return;
    }

    /**
     * Add Application to Home Screen
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    AddToHomeScreen(onSuccess = (data) => {}, onError = (error) => {}){
        console.error("AddToHomeScreen is not implemented for this platform");
        onError(new Error("AddToHomeScreen is not implemented for this platform"));
        return;
    }

    /**
     * Open Internal Payment Form
     * @param {object} parameters Payment Form Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    OpenPaymentForm(parameters, onSuccess = function(data){}, onError = function(error){}){
        console.error("OpenPaymentForm is not implemented for this platform");
        onError(new Error("OpenPaymentForm is not implemented for this platform"));
        return;
    }

    /**
     * Add Application to Favorites
     * @param {object} parameters Application Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    AddToFavorites(parameters, onSuccess = function(data){}, onError = function(error){}){
        console.error("AddToFavorites is not implemented for this platform");
        onError(new Error("AddToFavorites is not implemented for this platform"));
        return;
    }

    /**
     * Share Application
     * @param {object} parameters Share Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    ShareApplication(parameters, onSuccess = function(data){}, onError = function(error){}){
        console.error("ShareApplication is not implemented for this platform");
        onError(new Error("ShareApplication is not implemented for this platform"));
        return;
    }

    /**
     * Publish Story
     * @param {object} parameters Story Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    PublishStory(parameters, onSuccess = function(data){}, onError = function(error){}){
        console.error("PublishStory is not implemented for this platform"); 
        onError(new Error("PublishStory is not implemented for this platform"));
        return;
    }

    /**
     * Get Current Platform Invoker
     * @returns {object} Invoker
     */
    get Invoker(){
        return this.invoker;
    }

    /**
     * Call Custom Method
     * @param {string} methodName Method Name
     * @param {object} params Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CallCustomMethod(methodName, params = {}, onSuccess = function(data){}, onError = function(error){}){
        console.error("CallCustomMethod is not implemented for this platform");
        onError(new Error("CallCustomMethod is not implemented for this platform"));
        return;
    }

    /**
     * Call Custom Method
     * @param {string} methodName Method Name
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CallCustomMethod(methodName, onSuccess = function(data){}, onError = function(error){}){
        console.error("CallCustomMethod is not implemented for this platform");
        onError(new Error("CallCustomMethod is not implemented for this platform"));
        return;
    }

    /**
     * Open Link in Current Platform
     * @param {string} url Link URL
     */
    OpenLink(url){
        console.error("OpenLink is not implemented for this platform");
        onError(new Error("OpenLink is not implemented for this platform"));
        return;
    }
}

/**
 * Parallelix General Class
 * @class                   Parallelix
 */
class Parallelix {
    /**
     * Constructor
     * @param {Object} options - Options
     */
    constructor(options = {}) {
        /* Base Client Options */
        const clientVersion = "1.0.0";
        const defaultOptions = {
            // Platforms Defenition
            supportedPlatforms: ["vk", "telegram"],         // Supported Platforms Example (by default VK, telegram)
            vk: {},                                         // VK Wrapper Options Example
            telegram: {},                                   // Telegram Wrapper Options Example

            // Additional libraries
            specificLibraries: [],                          // Additional Libraries for specific platforms { platform: "vk", script: "https://example.com/library.js" }
        };

        // Extend options from constructor options
        this.options = {...defaultOptions, ...options};
        this.platformClasses = {};
        this.wrappers = {};
        this.currentPlatform = null;
        this.currentPlatformName = null;
        
        // Check the web platform is added to supported platforms
        if(!this.options?.supportedPlatforms?.includes("web")) {
            this.options?.supportedPlatforms?.push("web");
        }

        // Add Event Handlers
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(error.message);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : () => {
            console.log();
        };

        console.log(`Welcome to Parallelix Client Library (Version: v${clientVersion})`);
        console.log(`Initializing Parallelix for Platforms: ${this.options?.supportedPlatforms?.join(", ")}`);
    }

    /**
     * Connect Wrappers for Supported Platforms
     * @param {Function} onConnected Connected Callback
     */
    ConnectWrappers(onConnected) {
        let self = this;

        console.log(`Initializing Parallelix Platforms (${self.options.supportedPlatforms.length} platforms)...`);
        let platformsCount = self.options.supportedPlatforms.length;
        self.options.supportedPlatforms.forEach(platform => {
            if(!self.wrappers?.[platform]) {
                // Load Library
                self.LoadLibrary(`/libraries/parallelix.${platform}.js`, () => {
                    if(!Parallelix._platformClasses?.[platform]) {
                        self.OnError(new Error(`"${platform}" platform wrapper class is not found.`));
                        return;
                    }

                    let wrapperConfig = (self?.options?.[platform] && typeof self?.options?.[platform] === "object") ? self?.options?.[platform] : {};
                    self.wrappers[platform] = new Parallelix._platformClasses[platform](self, wrapperConfig);
                    self.wrappers[platform].name = platform;
                    platformsCount--;
                    console.log(`"${platform}" platform wrapper connected.`);
                    if (platformsCount === 0) {
                        Parallelix._platformClasses = {};
                        onConnected();
                    }
                }, self.OnError);
            }
        });
    }

    /**
     * Load Libraries
     * @param {Array} libraries Libraries
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    LoadLibraries(libraries, onSuccess, onError){
        let self = this;

        // Check Libraries array length
        if(!libraries || libraries.length === 0 || typeof libraries !== "array") {
            onSuccess();
            return;
        }

        // Remaining Libraries
        let remainingLibraries = libraries.length;
        libraries.forEach(library => {
            try{
                self.LoadLibrary(library, () => {
                    remainingLibraries--;
                    if(remainingLibraries === 0) {
                        onSuccess();
                    }
                }, onError);
            }catch(ex){
                remainingLibraries--;
                console.error(`Error loading library: ${library}`);
                onError(ex);
            }
        });
    }

    /**
     * Load Library by URL
     * 
     * @param {string} library Library URL
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    LoadLibrary(library, onSuccess, onError){
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = library;
        script.onload = onSuccess;
        script.onerror = onError;
        document.body.appendChild(script);
    }

    /**
     * Detect Current Platform using wrappers method
     * by priority
     */
    DetectPlatform() {
        let self = this;

        // Sort wrappers by priority
        let sortedWrappers = Object.values(self.wrappers).sort((a, b) => a.Priority - b.Priority);

        // Detect current platform
        for(let wrapper of sortedWrappers) {
            if(wrapper.IsCurrentPlatform()) {
                self.currentPlatform = wrapper;
                self.currentPlatformName = wrapper.name;
                break;
            }
        }
    }

    /**
     * Initialize Parallelix Library
     * connect wrappers and load specific libraries
     */
    Initialize() {
        let self = this;

        /* Connect Wrappers */
        self.ConnectWrappers(()=>{
            console.log("Parallelix Platforms Wrappers are Initialized");
            self.DetectPlatform();

            /* Initialize Current Platform */
            if(!self.currentPlatform) {
                self.OnError(new Error("Current platform is not found."));
                return;
            }

            /* Load Specific Libraries for current Platform */
            let specificLibraries = self.options?.specificLibraries.filter(library => library.platform === self.currentPlatform) ?? [];
            let specificLibrariesScripts = [];
            for(let library of specificLibraries) {
                specificLibrariesScripts.push(library.script);
            }

            // Load Specific Libraries
            console.log(`Loading Specific Libraries for current Platform: ${specificLibraries.length} libraries...`);
            self.LoadLibraries(specificLibrariesScripts, () => {
                self.currentPlatform.OnError = self.OnError;
                self.currentPlatform.OnInitialized = (data)=> {
                    console.log("Parallelix Platforms are Ready: ", data);
                    self.OnInitialized();
                };
                self.currentPlatform.Initialize();
            });
        });
    }

    /**
     * Get Current Platform Wrapper
     * @returns {Object} Current Platform Wrapper
     */
    get Platform() {
        return this.currentPlatform;
    }

    /**
     * Get Current Platform Invoker
     * @returns {Object} Current Platform Invoker
     */
    get Invoker(){
        return this.currentPlatform?.Invoker;
    }

    /**
     * Get Current Platform Name
     * @returns {string} Current Platform Name
     */
    GetPlatformName(){
        return this.currentPlatformName;
    }

    // Internal Usage Only
    static _platformClasses = {};
}