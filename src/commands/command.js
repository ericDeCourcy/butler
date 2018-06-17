class Command {

    /**
     * Initializes the new Command Instance.
     *
     * @param {Object} config
     */
    constructor(config) {
        config = Object.assign({
            enabled: true,
            params: {},
            desc: '',
            aliases: [],
            ownerOnly: false,
        }, config);

        /**
         * Whether the command is enabled for use or not.
         *
         * @type {Boolean}
         */
        this.enabled = config.enabled;

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

        /**
         * All of the aliases for the Command.
         *
         * @type {Array}
         */
        this.aliases = config.aliases;

        /**
         * Whether or not this Command can only be run by the Server Owner.
         *
         * @type {[type]}
         */
        this.ownerOnly = config.ownerOnly;
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
