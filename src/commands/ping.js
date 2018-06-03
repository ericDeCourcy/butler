const Command = require('./command');

class Ping extends Command {

    /**
     * Executes the Command logic.
     *
     * @param {Message} msg
     * @param {Array} [params]
     */
    execute(msg, params = []) {
        const diff = Date.now() - msg.createdTimestamp;

        msg.channel.send(this.prepare(`Pong! I heard you in ${diff / 1000}s.`));
    }

}

module.exports = new Ping();
