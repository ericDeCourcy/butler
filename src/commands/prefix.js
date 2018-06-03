const Command = require('./command');
const { update } = require('./../servers');

class Prefix extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super();

        this.minParams = 1;
    }

    /**
     * Executes the Command logic.
     *
     * @param {Message} msg
     * @param {Array} [params]
     */
    execute(msg, params = []) {
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
