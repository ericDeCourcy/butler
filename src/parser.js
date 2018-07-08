const commands = require('./bags/commands');
const developers = require('./bags/developers');
const { discord } = require('./client');
const { prefix: getPrefix } = require('./servers');
const { prepare } = require('./helpers');

// Initial stores for all Commands.
const supported = Object.keys(commands);    //array of all supported commands: price, convert, balance, etc..
const totalCommands = supported.length;     //number of all supported commands
const aliases = {};
let aliasKeys = [];

// Compile all Aliases.
for (let c = 0; c < totalCommands; c++) {
    const cmd = commands[supported[c]];
    const total = cmd.aliases.length;       //sets total equal to the number of aliases for the specified command

    for (let a = 0; a < total; a++) {       
        aliases[cmd.aliases[a]] = supported[c];     //  ???
    }
}
aliasKeys = Object.keys(aliases);       //  ???

/**
 * Parses incoming messages and, if needed, executes commands.
 *
 * @param {String} msg
 *
 * @return {Boolean}
 */
module.exports = msg => {
    
    // Don't listen to other Bots -ever-.
    if (msg.author.bot) {
        return false;
    }

    // Fetch the Prefix used for this Server (May be custom).
    const isDm = msg.guild === null;                        //  ???
    const isMention = msg.isMentioned(discord.user);        //  ???
    let prefix = getPrefix(isDm ? null : msg.guild.id);     // if the message is a DM, prefix = null; otherwise prefix = msg.guild.id
    let { content } = msg;                                  // content = msg

    // Allow executing commands via mentioning the Bot instead of the prefix.
    if (isMention) {
        const split = content.split(' ');       //creates an array populated with objects in msg separated by ' '
        prefix = `${split[0]} `;                //SHOULD be '!', but is whatever comes before first ' ' in msg
    }

    // If the message doesn't start with the prefix then we don't care about it.
    if (content.indexOf(prefix) !== 0) {        //  if the prefix isn't at the first spot in msg content, then...
        return false;                           // we done here
    }

    // Parse the message content in to command and parameters.
    content = content.substr(prefix.length);        //content = everything after the prefix character(s)
    const lines = content.split('\n');              //array "lines" set to array of each different line in the message
    const paramsRaw = lines[0].split(' ');          //array paramsRaw = all words in first line of msg
    let cmd = paramsRaw[0].toLowerCase();           //cmd is set to first element in paramsRaw (in lower case)
    paramsRaw.shift();                              //shift everything down and delete first element in paramsRaw
    lines.shift();                                  //shift everything down and delete first element in lines

    // Check if the Command is supported or is an alias.
    if (supported.indexOf(cmd) === -1) {            //checks "supported" array for a match to cmd
        cmd = '';

        if (aliasKeys.indexOf(cmd) !== -1) {        // checks "aliasKeys" for same thing
            cmd = aliases[cmd];
        }
    }

    if (
        // Double-check the user specified a command.
        !cmd.length ||
        // Check that the user can run this command if Guild Owner only.
        (commands[cmd].guildOwnerOnly && parseInt(msg.member.guild.ownerID) !== parseInt(msg.member.user.id)) ||
        // Check that the command is enabled.
        (!commands[cmd].enabled && developers.indexOf(parseInt(msg.author.id)) === -1)  // important - there's an enable/disable feature for commands
    ) {
        return false;
    }

    // Fetch the command instance.
    const command = commands[cmd];

    // Check that the Bot & User have permission to execute the command
    const perms = {     // ???
        bot: {},        //
        user: {},
    };
    const pass = {
        bot: true,
        user: true,     // everything here
    };

    if (!isDm && msg.channel.type === 'text') {
        for (let i = 0; i < 2; i++) {
            const store = i === 0 ? 'bot' : 'user';     //for first iteration of loop, assume its a bot. second iteration, assume user
            const user = i === 0 ? discord.user : msg.member;
            const rawPerms = command.perms[store];      //get the perms for that command for bot or user as specified
            const compiledPerms = rawPerms.required.concat(rawPerms.optional);  //??? gotta figure out what .required and .optional mean
            const totalPerms = compiledPerms.length;    

            for (let p = 0; p < totalPerms; p++) {
                const perm = compiledPerms[p];
                const isRequired = rawPerms.required.indexOf(perm) !== -1;      //saves true or false into isRequired

                perms[store][perm] = msg.channel.permissionsFor(user).has(perm);        // ??? - I'm guessing that it checks to see if the user has the correct permission for that command

                if (!perms[store][perm] && isRequired) {
                    pass[store] = false;
                }
            }
        }
    }

    //returns false if you/your bot doesn't have the right permissions
    if (!pass.bot) {
        msg.channel.send(prepare(`Sorry, I need the following permission(s) to do that:
\`${command.perms.bot.required.join(', ')}\``));
        return false;
    } else if (!pass.user) {
        msg.channel.send(prepare(`You need the following permission(s) to do that:
\`${command.perms.user.required.join(', ')}\``));
        return false;
    }

    // Check the Parameters are valid.
    const paramKeys = Object.keys(command.params);
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
            const param = command.params[paramKeys[p]];
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
        const param = command.params[paramKeys[p]];
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

    // Now that all checks have passed - execute the Command!
    command.execute({                                           
        msg,
        params,
        lines,
        perms,
        commands, // Purely for `help` command.
        is: {
            dm: isDm,
            mention: isMention,
        },
    });

    return true;
};
