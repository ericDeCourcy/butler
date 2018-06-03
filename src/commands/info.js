const Command = require('./command');

class Info extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super();

        this.description = 'Prints information on the Bot as well as support links.';
    }

    /**
     * Executes the Command logic.
     *
     * @param {Message} msg
     * @param {Array} [params]
     */
    execute(msg, params = []) {
        msg.channel.send(this.prepare(`**CryptoButler**

A general purpose, open-source Cryptocurrency Discord Bot.

**GitHub:** https://github.com/oyed/cryptobutler
**Support:** https://discord.gg/2VBKbEH
**Vote for CryptoButler:** https://discordbots.org/bot/395189067719114752/vote

Made by OYΞD#1337 (https://oyed.io)

---

**Donations:**

NANO: xrb_1oyed1fzw688ahrg8yy73tya5fnj7xqigttkwmdh36edk5hfknbd6uu548h8`));
    }

}

module.exports = new Info();
