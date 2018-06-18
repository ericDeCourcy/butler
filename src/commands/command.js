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
            botPerms: {
                required: [],
                optional: [],
            },
            userPerms: {
                required: [],
                optional: [],
            },
            guildOwnerOnly: false,
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
         * All of the Permissions required by the Bot to use this command.
         *
         * @type {Object}
         */
        this.botPerms = config.botPerms;

        /**
         * All of the Permissions required by the User to use this command.
         *
         * @type {Object}
         */
        this.userPerms = config.userPerms;

        /**
         * Whether or not this Command can only be run by the Guild Owner.
         *
         * @type {Boolean}
         */
        this.guildOwnerOnly = config.guildOwnerOnly;
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
