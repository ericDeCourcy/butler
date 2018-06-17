const commands = require('./bags/commands');
const developers = require('./bags/developers');
const { discord } = require('./client');
const { prefix: getPrefix } = require('./servers');
const { log } = require('./stats');

const supported = Object.keys(commands);
const totalCommands = supported.length;
const aliases = {};
let aliasKeys = [];

// Compile all Aliases.
for (let c = 0; c < totalCommands; c++) {
    const cmd = commands[supported[c]];
    const total = cmd.aliases.length;

    for (let a = 0; a < total; a++) {
        aliases[cmd.aliases[a]] = supported[c];
    }
}
aliasKeys = Object.keys(aliases);

const prepare = msg => {
    return `\u200B${msg}`;
};

const parse = msg => {
    // Don't listen to other Bots -ever-.
    if (msg.author.bot) {
        return;
    }

    // Fetch the Prefix used for this Server (May be custom).
    const isDm = msg.guild === null;
    const isMention = msg.isMentioned(discord.user);
    let prefix = getPrefix(isDm ? null : msg.guild.id);
    let { content } = msg;

    // Allow executing commands via mentioning the Bot instead of the prefix.
    if (isMention) {
        const split = content.split(' ');
        prefix = `${split[0]} `;
    }

    // If the message doesn't start with the prefix then we don't care about it.
    if (content.indexOf(prefix) !== 0) {
        return false;
    }

    // Parse the message content in to command and parameters.
    content = content.substr(prefix.length);
    const lines = content.split('\n');
    const paramsRaw = lines[0].split(' ');
    let cmd = paramsRaw[0].toLowerCase();
    paramsRaw.shift();
    lines.shift();

    // Check if the Command is supported or is an alias.
    if (supported.indexOf(cmd) === -1) {
        if (aliasKeys.indexOf(cmd) !== -1) {
            cmd = aliases[cmd];
        } else {
            return false;
        }
    }

    if (
        // Double-check the user specified a command.
        !cmd.length ||
        // Check that the user can run this command.
        (cmd.ownerOnly && parseInt(msg.member.guild.ownerID) !== parseInt(msg.member.user.id)) ||
        // Check that the command is enabled.
        (!commands[cmd].enabled && developers.indexOf(msg.author.id) !== -1)
    ) {
        return false;
    }

    // Check the Parameters are valid.
    const paramKeys = Object.keys(commands[cmd].params);
    const totalParams = paramKeys.length;
    const params = {};
    const invalid = () => {
        let formatPrefix = '';

        if (!isDm && !isMention) {
            formatPrefix = prefix;
        }

        let message = `Valid format:

**${formatPrefix} ${cmd}`;

        for (let p = 0; p < totalParams; p++) {
            const param = commands[cmd].params[paramKeys[p]];
            let range = `[${paramKeys[p]}]`;

            if (param.range) {
                range = param.range.join('/');
            }

            message += ` \`${range}\``;
        }

        message += '**';

        return msg.channel.send(prepare(message));
    };

    for (let p = 0; p < totalParams; p++) {
        const param = commands[cmd].params[paramKeys[p]];
        let given = paramsRaw[p];

        if (given === undefined || given === null) {
            if (param.required) {
                invalid();
                return false;
            } else if (param.default !== undefined) {
                given = param.default;
            }
        }

        // Check whether the parameter is a full parameter (Entire param inc. spaces).
        if (param.full) {
            given = paramsRaw.join(' ');
        }

        // Check that the parameter is within range, if specified.
        if (
            param.range &&
            (param.range.indexOf(given) === -1)
        ) {
            invalid();
            return false;
        }

        params[paramKeys[p]] = given;
    }

    // Log the Statistics.
    log('commands_executed', 'all');

    if (!isDm) {
        log('commands_executed', msg.guild.id);
    }

    // Now that all checks have passed - execute the Command!
    commands[cmd].execute({
        msg,
        params,
        lines,
        commands, // Purely for `help` command.
        prepare,
        log,
        is: {
            dm: isDm,
            mention: isMention,
        },
    });
};

module.exports = {
    prepare,
    parse,
};
