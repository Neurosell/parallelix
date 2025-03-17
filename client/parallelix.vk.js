/**
 * Parallelix VK Wrapper
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
    constructor(options = {}) {
        super(options);

        /* Add Event Handlers */
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(`Parallelix VK Wrapper Error: ${error.message}`);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : () => {
            console.log(`Parallelix VK Wrapper Initialized`);
        };
    }

    /**
     * Initialize VK Wrapper
     */
    Initialize(){
        let self = this;

        /* Initialize VK Wrapper */
        self.OnInitialized();
    }

    /**
     * Check if this wrapper is for current platform
     * @returns {boolean}
     */
    IsCurrentPlatform(){
        return true;
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["vk"] = ParallelixVK;