class Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        /**
         * Whether the command is enabled for use or not.
         *
         * @type {Boolean}
         */
        this.enabled = true;

        /**
         * Names parameters for this Command.
         *
         * @type {Array}
         */
        this.params = {};

        /**
         * The Help Text for this Command.
         *
         * @type {String}
         */
        this.description = '';
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        //
    }

}

module.exports = Command;
