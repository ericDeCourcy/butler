const Command = require('./command');
const { prefix: getPrefix } = require('./../servers');

class Help extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Shows all available Commands.',
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute({ msg, prepare, commands }) {
        const prefix = getPrefix(msg.guild !== null ? msg.guild.id : null);
        const keys = Object.keys(commands);
        const total = keys.length;
        let content = '';

        for (let c = 0; c < total; c++) {
            const cmd = commands[keys[c]];

            if (!cmd.enabled) {
                continue;
            }

            const params = cmd.params;
            const paramKeys = Object.keys(params);
            const totalParams = paramKeys.length;
            let paramsStr = '';

            for (let p = 0; p < totalParams; p++) {
                const param = params[paramKeys[p]];
                let range = `[${paramKeys[p]}]`;

                if (param.range) {
                    range = param.range.join('/');
                }

                paramsStr += ` ${range}`;
            }

            content += `\`${prefix}${keys[c]}${paramsStr}\` - ${cmd.desc}
`;
        }

        msg.channel.send(prepare(content));
    }

}

module.exports = new Help();
