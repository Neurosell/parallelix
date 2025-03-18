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

/* Basic Wrapper Class */
class ParallelixWrapper {
    /**
     * Basic Wrapper Constructor
     * @param {object} options 
     */
    constructor(options = {}) {
        this.options = options;

        /* Add Event Handlers */
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(error.message);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : () => {
            console.log();
        };
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
        return false;
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
            supportedPlatforms: ["vk", "telegram"]
        };

        // Extend options from constructor options
        this.options = {...defaultOptions, ...options};
        this.platformClasses = {};
        this.wrappers = {};
        this.currentPlatform = null;
        

        // Add Event Handlers
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(error.message);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : () => {
            console.log();
        };

        console.log(`Welcome to Parallelix Client Library (Version: v${clientVersion})`);
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
                self.LoadLibrary(`./client/parallelix.${platform}.js`, () => {
                    if(!Parallelix._platformClasses?.[platform]) {
                        self.OnError(new Error(`"${platform}" platform wrapper class is not found.`));
                        return;
                    }

                    let wrapperConfig = (self?.options?.[platform] && typeof self?.options?.[platform] === "object") ? self?.options?.[platform] : {};
                    self.wrappers[platform] = new Parallelix._platformClasses[platform](wrapperConfig);
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
     * Detect Current Platform
     * and initialize wrapper
     */
    DetectPlatform() {
        let self = this;
        for(let platform in self.wrappers) {    
            if(self.wrappers[platform].IsCurrentPlatform()) {
                self.currentPlatform = self.wrappers[platform];
                break;
            }
        }
    }

    /**
     * Initialize Parallelix Library
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

            self.currentPlatform.OnError = self.OnError;
            self.currentPlatform.OnInitialized = (data)=> {
                console.log("Parallelix Platforms are Ready: ", data);
                self.OnInitialized();
            };
            self.currentPlatform.Initialize();
        });
    }

    /**
     * Get Current Platform Wrapper
     * @returns {Object} Current Platform Wrapper
     */
    Wrapper() {
        return this.currentPlatform;
    }

    // Internal Usage Only
    static _platformClasses = {};
}