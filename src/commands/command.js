class Command {

    /**
     * Initializes the new Command Instance.
     *
     * @param {Object} config
     */
    constructor(config) {
        config = Object.assign({
            params: {},
            desc: '',
        }, config);

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
        this.params = config.params;

        /**
         * The Help Text for this Command.
         *
         * @type {String}
         */
        this.desc = config.desc;
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
