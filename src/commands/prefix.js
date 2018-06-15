const Command = require('./command');
const { update } = require('./../servers');

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
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute({ msg, params }) {
        const { member } = msg;

        if (parseInt(member.guild.ownerID) !== parseInt(member.user.id)) {
            return;
        }

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
