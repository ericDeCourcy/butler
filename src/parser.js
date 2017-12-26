const commands = require('./bags/commands');

const parse = msg => {
    const prefix = process.env.COMMAND_PREFIX;
    let { content } = msg;

    if (content.indexOf(prefix) !== 0) {
        return false;
    }

    content = content.substr(prefix.length + 1);
    const params = content.split(' ');
    const cmd = params[0].toLowerCase();
    params.shift();

    if (!cmd.length) {
        return false;
    }

    const supported = Object.keys(commands);

    if (
        supported.indexOf(cmd) === -1 ||
        params.length < commands[cmd].minParams
    ) {
        return false;
    }

    commands[cmd].execute(msg, params);
};

module.exports = {
    parse,
};
