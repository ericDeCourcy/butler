class Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        this.minParams = 0;
    }

    /**
     * Executes the Command logic.
     *
     * @param {Message} msg
     * @param {Array} [params]
     */
    execute(msg, params = []) {
        //
    }

    /**
     * Prepares a text-based message to send to Discord.
     * Adds a zero-width space to the beginning of the message so that it isn't
     * picked up by other Bots.
     *
     * @param {String} msg
     *
     * @return {String}
     */
    prepare(msg) {
        return `\u200B${msg}`;
    }

}

module.exports = Command;
