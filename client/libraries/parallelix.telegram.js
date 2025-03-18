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
        this.invoker = null;

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
            self.invoker = window?.Telegram?.WebApp;
            self.OnInitialized({});
            self.HandleEvents();
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
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        try{
            // Get Launch Params
            self.launchParams = self.invoker?.initDataUnsafe;
            self.launchParamsRaw = self.invoker?.initData;
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

    /**
     * Handle All Telegram Web Apps Events
     */
    HandleEvents(){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }
        
        // Get All Handled Events
        const handledEvents = self.handledEvents;

        // Subscribe to All Handled Events
        for(const event of handledEvents){
            const { eventName, eventHandler } = event;
            window.Telegram.WebApp.onEvent(eventName, eventHandler);
        }
    }

    /**
     * Get Client Information
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetClientInfo(onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Get Client Information
        onSuccess({
            platform: self.invoker?.platform,
            version: self.invoker?.version
        });
    }

    /**
     * Toggle Fullscreen for Telegram Web Apps
     * @param {boolean} isEnabled Enable or Disable Fullscreen
     */
    ToggleFullscreen(isEnabled) {
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Toggle Fullscreen
        if(isEnabled) {
            window.Telegram.WebApp.requestFullscreen();
        } else {
            window.Telegram.WebApp.exitFullscreen();
        }
    }

    /**
     * Add Application to Home Screen
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    AddToHomeScreen(onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Add Application to Home Screen
        window.Telegram.WebApp.addToHomeScreen();
        onSuccess({
            result: true
        });
    }

    /**
     * Call Custom Telegram Method
     * @param {string} methodName Telegram Method Name
     * @param {object} params Method Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CallCustomMethod(methodName, params = {}, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Call Custom Method
        console.warn("Telegram does not support custom methods");
        onError(new Error("Telegram does not support custom methods"));
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["telegram"] = ParallelixTelegram;