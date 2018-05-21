const Command = require('./command');

class Help extends Command {

    execute(msg, params = []) {
        const prefix = process.env.COMMAND_PREFIX;
        const content = `**CryptoButler Help**

---

\`${prefix} price [id]\` - Fetches data from CoinMarketCap for the given ID.
\`${prefix} convert [amount] [from] [to]\` - Converts a given amount of \`from\` to currency \`to\`.
\`${prefix} balance [ticker] [address]\` - Returns the balance of the given Wallet. Supports \`eth\`, \`btc\` and \`tokens\` (ERC-20).
\`${prefix} help\` - Prints this text.

---

**Donations:**

NANO: xrb_1oyed1fzw688ahrg8yy73tya5fnj7xqigttkwmdh36edk5hfknbd6uu548h8

---

**Source Code:** https://github.com/oyed/cryptobutler`;

        msg.channel.send(content);
    }

}

module.exports = new Help();
