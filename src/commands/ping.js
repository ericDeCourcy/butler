const Command = require('./command');

class Ping extends Command {

    execute(msg, params = []) {
        const diff = Date.now() - msg.createdTimestamp;

        msg.channel.send(`Pong! I heard you in ${diff / 1000}s.`);
    }

}

module.exports = new Ping();
