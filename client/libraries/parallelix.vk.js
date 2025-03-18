/**
 * Parallelix VK Bridge Wrapper
 * 
 * @author                  Neurosell
 * @version                 1.0.0
 * @license                 MIT
 * @author                  Ilya Rastorguev
 * @email                   start@ncommx.com
 * @website                 https://ncommx.com
 * @github                  https://github.com/Neurosell/parallelix
 */

class ParallelixVK extends ParallelixWrapper {
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
            console.error(`Parallelix VK Wrapper Error: ${error.message}`);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : (data) => {
            console.log(`Parallelix VK Wrapper Initialized`);
        };
    }

    /**
     * Get Wrapper Priority
     * @returns {number}
     */
    get Priority(){
        return 10;
    }

    /**
     * Initialize VK Wrapper
     */
    Initialize(){
        let self = this;

        // Load VK Bridge Library
        self.platform.LoadLibrary("https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js", () => {
            // Initialize VK Bridge
            vkBridge.send('VKWebAppInit').then((data) => { 
                if (data.result) {
                    self.isInitialized = true;
                    self.OnInitialized(data);
                } else {
                    self.OnError(new Error("VK Bridge initialization failed"));
                }
            }).catch((error) => {
                self.OnError(error);
            });
        }, self.OnError);
    }

    /**
     * Get Platform Launch Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetLaunchParams(onSuccess, onError){
        let self = this;

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Get Launch Params
        vkBridge.send('VKWebAppGetLaunchParams').then((data) => { 
            if (data.vk_app_id) {
                self.launchParams = data;
                onSuccess(data);
            } else {
                onError(new Error("Unknown VK Bridge Launch Params: " + JSON.stringify(data)));
            }
        }).catch((error) => {
            onError(error);
        });
    }

    /**
     * Check if this wrapper is for current platform
     * @returns {boolean}
     */
    IsCurrentPlatform(){
        let isVKPlatform = false;

        // Check VK by Origin
        let origins = window.location.ancestorOrigins;
        if(origins.length > 0) {
            for(let origin of origins) {
                if(origin.includes("vk.com")) {
                    isVKPlatform = true;
                    break;
                }
            }
        }

        // Check VK by Search Params
        let searchParams = new URLSearchParams(window.location.search);
        if(searchParams.has("vk_app_id")) {
            isVKPlatform = true;
        }

        return isVKPlatform;
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["vk"] = ParallelixVK;