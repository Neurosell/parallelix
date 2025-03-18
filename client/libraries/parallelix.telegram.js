/**
 * Parallelix Telegram Web Apps Wrapper
 * 
 * @author                  Neurosell
 * @version                 1.0.0
 * @license                 MIT
 * @author                  Ilya Rastorguev
 * @email                   start@ncommx.com
 * @website                 https://ncommx.com
 * @github                  https://github.com/Neurosell/parallelix
 */

class ParallelixTelegram extends ParallelixWrapper {
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
        this.launchParamsRaw = null;

        /* Add Event Handlers */
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(`Parallelix Telegram Wrapper Error: ${error.message}`);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : (data) => {
            console.log(`Parallelix Telegram Wrapper Initialized`);
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
     * Initialize Telegram Wrapper
     */
    Initialize(){
        let self = this;

        // Load Telegram Mini Apps SDK Library
        self.platform.LoadLibrary("https://telegram.org/js/telegram-web-app.js?56", () => {
            self.isInitialized = true;
            self.OnInitialized({});
        }, self.OnError);
    }

    /**
     * Get Platform Launch Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetLaunchParams(onSuccess, onError){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !window?.Telegram?.WebApp) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        try{
            // Get Launch Params
            self.launchParams = window?.Telegram?.WebApp?.initDataUnsafe;
            self.launchParamsRaw = window?.Telegram?.WebApp?.initData;
            onSuccess(self.launchParams);
        } catch(error) {
            onError(error); 
        }
    }

    /**
     * Check if this wrapper is for current platform
     * @returns {boolean}
     */
    IsCurrentPlatform(){
        let isTelegramPlatform = false;

        // Check by Telegram Object
        if(window?.Telegram?.WebApp) {
            isTelegramPlatform = true;
        }

        // Check by Hash Launch Params
        let hash = window.location.hash;
        if(hash.includes("tgWebAppData")) {
            isTelegramPlatform = true;
        }

        return isTelegramPlatform;
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["telegram"] = ParallelixTelegram;