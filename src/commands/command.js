class Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        /**
         * Names parameters for this Command, used in the Help Text.
         *
         * @type {Array}
         */
        this.params = [];

        /**
         * The Help Text for this Command.
         *
         * @type {String}
         */
        this.description = '';

        /**
         * The minimum amount of parameters required to run this Command.
         *
         * @type {Number}
         */
        this.minParams = 0;
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        //
    }

    /**
     * Prepares a text-based message to send to Discord.
     * Adds a zero-width space to the beginning of the message so that it isn't
     * picked up by other Bots.
     *
     * @param {String} msg
     *
     * @return {String}
     */
    prepare(msg) {
        return `\u200B${msg}`;
    }

}

module.exports = Command;
