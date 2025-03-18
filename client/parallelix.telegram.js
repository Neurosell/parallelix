/**
 * Parallelix Telegram Wrapper
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
    constructor(options = {}) {
        /* Base Wrapper Options */
        const defaultOptions = {

        };

        // Extend Wrapper Options
        let extendedOptions = {...defaultOptions, ...options};
        super(extendedOptions);
        this.options = extendedOptions;

        /* Add Event Handlers */
        this.OnError = (options?.OnError && typeof options?.OnError === "function") ? options.OnError : (error) => {
            console.error(`Parallelix Telegram Wrapper Error: ${error.message}`);
        };
        this.OnInitialized = (options?.OnInitialized && typeof options?.OnInitialized === "function") ? options.OnInitialized : (data) => {
            console.log(`Parallelix Telegram Wrapper Initialized`);
        };
    }
}

// Add VK Platform Class to Parallelix
Parallelix._platformClasses["telegram"] = ParallelixTelegram;