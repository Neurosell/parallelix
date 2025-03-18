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
        this.invoker = null;

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
            self.invoker = vkBridge;
            self.invoker.send('VKWebAppInit').then((data) => { 
                if (data.result) {
                    self.isInitialized = true;
                    self.OnInitialized(data);
                    self.HandleEvents();
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
        self.invoker.send('VKWebAppGetLaunchParams').then((data) => { 
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

    /**
     * Handle All VK Bridge Events
     */
    HandleEvents(){
        let self = this;

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Subscribe to VK Bridge Events
        self.invoker.subscribe((event) => {
            if(!event.detail) return;

            const { type, data } = event.detail;
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

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Get Client Version
        self.invoker.send('VKWebAppGetClientVersion').then((data) => {
            if (data.platform) {
                onSuccess(data);
            } else {
                onError(new Error("Unknown VK Bridge Client Version: " + JSON.stringify(data)));
            }
        }).catch((error) => {
            onError(error);
        });
    }

    /**
     * Add Application to Home Screen
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    AddToHomeScreen(onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Add Application to Home Screen
        self.invoker.send('VKWebAppAddToHomeScreen').then((data) => {
            if (data.result) {
                onSuccess(data);
            } else {
                onError(new Error("Failed to add application to homescreen"));
            }
        }).catch((error) => {
            onError(error);
        });
    }

    /**
     * Open VK Internal Payment Form
     * @param {object} parameters Payment Form Parameters
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    OpenPaymentForm(parameters, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Open Payment Form
        self.invoker.send('VKWebAppOpenPaymentForm', parameters).then((data) => {
            onSuccess(data);
        }).catch((error) => {
            onError(error);
        });
    }

    /**
     * Call Custom Bridge Method
     * @param {string} methodName VK Bridge Method Name
     * @param {object} params Method Params
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CallCustomMethod(methodName, params = {}, onSuccess = (data) => {}, onError = (error) => {}){
        let self = this;

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Call Custom Method
        self.invoker.send(methodName, params).then((data) => {
            onSuccess(data);
        }).catch((error) => {
            onError(error);
        });
    }

    /**
     * Call Custom Bridge Method without params
     * @param {string} methodName Method Name
     * @param {Function} onSuccess Success Callback
     * @param {Function} onError Error Callback
     */
    CallCustomMethod(methodName, onSuccess = function(data){}, onError = function(error){}){
        let self = this;

        // Check if VK Bridge is initialized
        if(!self.isInitialized) {
            onError(new Error("VK Bridge is not initialized"));
            return;
        }

        // Call Custom Method
        self.invoker.send(methodName).then((data) => {
            onSuccess(data);
        }).catch((error) => {
            onError(error);
        });
    }

    /**
     * Open Link in Current Platform
     * @param {string} url Link URL
     */
    OpenLink(url){
        window.open(url, "_blank");
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["vk"] = ParallelixVK;