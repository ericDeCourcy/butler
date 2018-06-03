const Command = require('./command');
const { update } = require('./../servers');

class Prefix extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super();

        this.params = ['prefix'];
        this.description = 'Allows you to replace the default prefix.';
        this.minParams = 1;
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

        update(msg.guild.id, {
            prefix: params[0],
        });
    }

}

module.exports = new Prefix();
