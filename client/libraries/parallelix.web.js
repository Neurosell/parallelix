/**
 * Parallelix Web Platform Wrapper
 * 
 * @author                  Neurosell
 * @version                 1.0.0
 * @license                 MIT
 * @author                  Ilya Rastorguev
 * @email                   start@ncommx.com
 * @website                 https://ncommx.com
 * @github                  https://github.com/Neurosell/parallelix
 */
class ParallelixWeb extends ParallelixWrapper {
    /**
     * Basic Wrapper Constructor
     * @param {Parallelix}      instance Parallelix Platform Instance
     * @param {object}          options  Wrapper Options
     */
    constructor(instance, options = {}) {
        /* Base Wrapper Options */
        const defaultOptions = {
            manifest: "/manifest.json",
        };

        // Extend Wrapper Options
        let extendedOptions = {...defaultOptions, ...options};
        super(instance, extendedOptions);
        this.options = extendedOptions;
        this.platform = instance;
        this.isInitialized = false;
        this.invoker = null;

        // Launch Params
        this.launchParams = null;
        this._beforeInstallPromptEvent = null;

        // Add Event Handlers
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(`Parallelix Web Wrapper Error: ${error.message}`);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : (data) => {
            console.log(`Parallelix Web Wrapper Initialized`);
        };
    }

    /**
     * Get Wrapper Priority
     * @returns {number}
     */
    get Priority(){
        return 1000;
    }

    /**
     * Initialize Web Wrapper
     */
    Initialize(){
        let self = this;

        /* Connect Application Manifest */
        if(self.options.manifest) {
            let manifest = document.createElement("link");
            manifest.rel = "manifest";
            manifest.href = self.options.manifest;
            document.head.appendChild(manifest);

            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                self._beforeInstallPromptEvent = e;
            });
        }

        /* Mark as Initialized */
        self.invoker = self;
        self.isInitialized = true;
        self.OnInitialized({});
        self.HandleEvents();
    }

    /**
     * Get Platform Launch Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetLaunchParams(onSuccess, onError){
        let self = this;

        try{
            // Get Location Arguments to object
            let locationArgs = {};
            let location = window.location;
            let searchParams = new URLSearchParams(location.search);
            searchParams.forEach((value, key) => {
                locationArgs[key] = value;
            });
            
            // Get Hash Arguments to object
            let hashArgs = {};
            let hash = window.location.hash;
            let hashParams = new URLSearchParams(hash.substring(1));
            hashParams.forEach((value, key) => {
                hashArgs[key] = value;
            });

            // Merge Location and Hash Arguments
            let finalArgs = {...locationArgs, ...hashArgs};
            self.launchParams = finalArgs;
            onSuccess(finalArgs);
        } catch(error) {
            onError(error);
        }
    }
    
    /**
     * Check if this wrapper is for current platform
     * @returns {boolean}
     */
    IsCurrentPlatform(){
        // For the web platform, we always return true
        // because it's the default platform
        return true;
    }

    /**
     * Handle All Web Events
     */
    HandleEvents(){
        let self = this;

        // Check if Web App is initialized
        if(!self.isInitialized) {
            onError(new Error("Web App is not initialized"));
            return;
        }   

        // Subscribe to Web App Events
        window.addEventListener("message", (event) => {
            if(!event.data) return;

            const { type, data } = event.data;
            self.GetEventListener(type)?.(data);
        });
    }

    /**
     * Get Client Information
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetClientInfo(onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Web App is initialized
        if(!self.isInitialized) {
            onError(new Error("Web App is not initialized"));
            return;
        }

        // Get Client Information
        onSuccess({
            platform: "web",
            version: "1.0.0",
            userAgent: navigator.userAgent,
            userAgentData: navigator.userAgentData,
        });
    }

    /**
     * Toggle Fullscreen on this Platform
     * @param {boolean} isEnabled Enable or Disable Fullscreen
     */
    ToggleFullscreen(isEnabled){
        let self = this;

        // Check if Web App is initialized
        if(!self.isInitialized) {
            onError(new Error("Web App is not initialized"));
            return;
        }

        // Toggle Fullscreen
        if(isEnabled) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    /**
     * Add Application to Home Screen
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    AddToHomeScreen(onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Web App is initialized
        if(!self.isInitialized) {
            onError(new Error("Web App is not initialized"));
            return;
        }

        // Add Web App to Home Screen
        if(self._beforeInstallPromptEvent) {
            self._beforeInstallPromptEvent.prompt();
            onSuccess({
                result: true
            });
        }else{
            onError(new Error("Your PWA does not contain a manifest file. Specify the manifest file in the wrapper options."));
        }
    }

    /**
     * Call Custom Method
     * @param {string} methodName Method Name
     * @param {object} params Method Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CallCustomMethod(methodName, params = {}, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Web App is initialized
        if(!self.isInitialized) {
            onError(new Error("Web App is not initialized"));
            return;
        }

        // Call Custom Method
        console.warn("Web App does not support custom methods");
        onError(new Error("Web App does not support custom methods"));
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["web"] = ParallelixWeb;