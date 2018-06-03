const Command = require('./command');
const { update } = require('./../servers');

class Prefix extends Command {

    constructor() {
        super();

        this.minParams = 1;
    }

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
