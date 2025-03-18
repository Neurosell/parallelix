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
     * Open Internal Payment Form
     * @param {string} parameters Payment Form URL
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    OpenPaymentForm(parameters, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Get Telegram Parameters
        parameters = parameters?.telegram || {};

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // On Invoice Closed
        function onInvoiceClosed(){
            self.RemoveEventListener("invoiceClosed", onInvoiceClosed);
            onSuccess();
        }

        // Open Payment Form
        self.AddEventListener("invoiceClosed", onInvoiceClosed);
        self.invoker.openInvoice(parameters, onSuccess);
    }

    /** 
     * Publish Story
     * @param {string} mediaURL Media URL
     * @param {object} parameters Story Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    PublishStory(mediaURL, parameters, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Get Telegram Parameters
        parameters = parameters?.telegram || {};

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }   

        // Publish Story
        self.invoker.shareToStory(mediaURL, parameters);
        onSuccess({
            result: true
        });
    }
    

    /**
     * Open Link in Current Platform
     * @param {string} url Link URL
     */
    OpenLink(url){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Open Link
        self.invoker.openLink(url);
    }

    /**
     * Get Storage
     * @param {object} parameters Storage Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    GetStorage(parameters, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Get Telegram Parameters
        parameters = parameters?.telegram || {};
        
        // Check if Telegram SDK is initialized
        if(!self.isInitialized) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }
        
        // Get Storage
        let storage = localStorage.getItem(parameters.key);
        onSuccess({
            result: storage
        });
    }

    /**
     * Set Storage
     * @param {object} parameters Storage Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    SetStorage(parameters, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Get Telegram Parameters
        parameters = parameters?.telegram || {};

        // Check if Telegram SDK is initialized
        if(!self.isInitialized) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Set Storage
        localStorage.setItem(parameters.key, parameters.value);
        onSuccess({
            result: true
        });
    }

    /**
     * Close Application
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CloseApplication(onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Close Application
        self.invoker.close();
        onSuccess({
            result: true
        });
    }

    /**
     * Show QR Reader
     * @param {object} parameters QR Reader Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    ShowQRReader(parameters, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Get Telegram Parameters
        parameters = parameters?.telegram || {};

        // Check if Telegram SDK is initialized
        if(!self.isInitialized || !self.invoker) {
            onError(new Error("Telegram SDK is not initialized"));
            return;
        }

        // Show QR Reader
        self.invoker.showScanQrPopup(parameters, onSuccess);
    }
    
    /**
     * Go Back
     */
    GoBack(){
        window.history.back();
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["telegram"] = ParallelixTelegram;