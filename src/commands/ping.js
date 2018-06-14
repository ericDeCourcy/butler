const Command = require('./command');

class Ping extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super();

        this.description = 'Returns the latency between Discord and the Bot.';
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute({ msg, prepare }) {
        const diff = Date.now() - msg.createdTimestamp;

        msg.channel.send(prepare(`Pong! I heard you in ${diff / 1000}s.`));
    }

}

module.exports = new Ping();
