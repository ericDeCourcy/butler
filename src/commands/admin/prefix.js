const Command = require('./../command');
const { update } = require('./../../servers');

class Prefix extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Sets the command prefix for the Server.',
            params: {
                prefix: {
                    required: true,
                },
            },
            ownerOnly: true,
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute({ msg, params }) {
        const { prefix } = params;

        if (!prefix.length) {
            return;
        }

        update(msg.guild.id, {
            prefix,
        });
    }

}

module.exports = new Prefix();
