const Command = require('./command');
const { prefix: getPrefix } = require('./../servers');

class Help extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super();

        this.description = 'Prints Help text for all available Commands.';
    }

    /**
     * Executes the Command logic.
     *
     * @param {Message} msg
     * @param {Array} [params]
     * @param {Object} [commands]
     */
    execute(msg, params = [], commands = {}) {
        const prefix = getPrefix(msg.guild !== null ? msg.guild.id : null);
        const keys = Object.keys(commands);
        const total = keys.length;
        let content = '';

        for (let c = 0; c < total; c++) {
            const cmd = commands[keys[c]];
            const totalParams = cmd.params.length;
            let paramsStr = '';

            for (let p = 0; p < totalParams; p++) {
                paramsStr += ` [${cmd.params[p]}]`;
            }

            content += `\`${prefix}${keys[c]}${paramsStr}\` - ${cmd.description}
`;
        }

        msg.channel.send(this.prepare(content));
    }

}

module.exports = new Help();
