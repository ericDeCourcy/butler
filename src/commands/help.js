const Command = require('./command');

class Help extends Command {

    execute(msg, params = []) {
        const content = `**CryptoButler Help**

---

\`!butler price [id]\` - Fetches data from CoinMarketCap for the given ID.
\`!butler help\` - Prints this text.

---

**Source Code:** https://github.com/oyed/cryptobutler`;

        msg.channel.send(content);
    }

}

module.exports = new Help();
