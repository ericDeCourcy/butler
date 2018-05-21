const Command = require('./command');

class Help extends Command {

    execute(msg, params = []) {
        const prefix = process.env.COMMAND_PREFIX;
        const content = `**CryptoButler Help**

---

\`${prefix} price [id]\` - Fetches data from CoinMarketCap for the given ID.
\`${prefix} help\` - Prints this text.

---

**Source Code:** https://github.com/oyed/cryptobutler`;

        msg.channel.send(content);
    }

}

module.exports = new Help();
