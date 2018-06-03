const Command = require('./command');
const { prefix: getPrefix } = require('./../servers');

class Help extends Command {

    execute(msg, params = []) {
        const prefix = getPrefix(msg.guild !== null ? msg.guild.id : null);
        const content = `\`${prefix}price [id]\` - Fetches data from CoinMarketCap for the given ID.
\`${prefix}convert [amount] [from] [to]\` - Converts a given amount of \`from\` to currency \`to\`.
\`${prefix}balance [ticker] [address]\` - Returns the balance of the given Wallet. Supports \`eth\`, \`btc\` and \`tokens\` (ERC-20).
\`${prefix}top [type] [period]\` - Returns the top Cryptos by type for the given period. E.g. \`${prefix}top gainers 24h\`.
\`${prefix}prefix [prefix]\` - Allows you to replace the default prefix. E.g. \`${prefix}prefix .\`.
\`${prefix}ping\` - Returns the latency between Discord and the Bot.
\`${prefix}help\` - I'll give you 10 guesses.

---

**Donations:**

NANO: xrb_1oyed1fzw688ahrg8yy73tya5fnj7xqigttkwmdh36edk5hfknbd6uu548h8

**Support:**

https://discord.gg/2VBKbEH

---

**Vote for CryptoButler:** https://discordbots.org/bot/395189067719114752/vote
**Source Code:** https://github.com/oyed/cryptobutler`;

        msg.channel.send(content);
    }

}

module.exports = new Help();
