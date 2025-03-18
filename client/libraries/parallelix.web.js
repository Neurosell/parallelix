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

        };

        // Extend Wrapper Options
        let extendedOptions = {...defaultOptions, ...options};
        super(instance, extendedOptions);
        this.options = extendedOptions;
        this.platform = instance;
        this.isInitialized = false;

        // Launch Params
        this.launchParams = null;

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
        self.OnInitialized({});
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
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["web"] = ParallelixWeb;