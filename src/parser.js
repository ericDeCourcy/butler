const commands = require('./bags/commands');
const { discord } = require('./client');
const { prefix: getPrefix } = require('./servers');

const supported = Object.keys(commands);

const parse = msg => {
    // Don't listen to other Bots -ever-.
    if (msg.author.bot) {
        return;
    }

    // Fetch the Prefix used for this Server (May be custom).
    let prefix = getPrefix(msg.guild !== null ? msg.guild.id : null);
    let { content } = msg;

    // Allow executing commands via mentioning the Bot instead of the prefix.
    if (msg.isMentioned(discord.user)) {
        const split = content.split(' ');
        prefix = `${split[0]} `;
    }

    // If the message doesn't start with the prefix then we don't care about it.
    if (content.indexOf(prefix) !== 0) {
        return false;
    }

    // Parse the message content in to command and parameters.
    content = content.substr(prefix.length);
    const params = content.split(' ');
    const cmd = params[0].toLowerCase();
    params.shift();

    // Double-check the user specified a command.
    if (!cmd.length) {
        return false;
    }

    // Check that the command is supported by the Bot.
    if (
        supported.indexOf(cmd) === -1 ||
        params.length < commands[cmd].minParams
    ) {
        return false;
    }

    // Now that all checks have passed - execute the Command!
    commands[cmd].execute(msg, params, commands);
};

module.exports = {
    parse,
};
