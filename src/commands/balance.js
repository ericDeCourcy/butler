const { RichEmbed } = require('discord.js');
const Command = require('./command');
const Btc = require('./../services/btc');
const Ethplorer = require('./../services/ethplorer');

class Balance extends Command {

    constructor() {
        super();

        this.minParams = 2;

        /**
         * The list of supported Wallets.
         *
         * @type {Array}
         */
        this.tickers = [
            'btc',
            'eth',
            'tokens',
        ];
    }

    execute(msg, params = []) {
        const ticker = params[0].toLowerCase();
        const address = params[1];
        let sentMessage = null;

        msg.channel.send('Checking...').then(message => {
            sentMessage = message;

            if (this.tickers.indexOf(ticker) === -1) {
                return Promise.reject(`Wallet type "${ticker}" isn't supported.`);
            }

            switch (ticker) {
                case 'btc': {
                    return Btc.account(address);
                }
                case 'tokens':
                case 'eth': {
                    return Ethplorer.account(address);
                }
            }

            return Promise.reject();
        }).then(data => {
            switch (ticker) {
                case 'btc': {
                    return {
                        name: 'Bitcoin [BTC]',
                        link: `https://btc.com/${address}`,
                        fields: [
                            {
                                name: 'Balance',
                                value: (data.balance / 100000000).toString(),
                                inline: true,
                            },
                            {
                                name: 'Total In',
                                value: (data.received / 100000000).toString(),
                                inline: true,
                            },
                            {
                                name: 'Total Out',
                                value: (data.sent / 100000000).toString(),
                                inline: true,
                            },
                        ],
                    };
                }
                case 'eth': {
                    return {
                        name: 'Ethereum [ETH]',
                        link: `https://etherscan.io/address/${address}`,
                        fields: [
                            {
                                name: 'Balance',
                                value: data.ETH.balance.toString(),
                                inline: true,
                            },
                            {
                                name: 'Total In',
                                value: data.ETH.totalIn.toString(),
                                inline: true,
                            },
                            {
                                name: 'Total Out',
                                value: data.ETH.totalOut.toString(),
                                inline: true,
                            },
                        ],
                    };
                }
                case 'tokens': {
                    const raw = data.tokens;
                    const total = raw.length;
                    const tokens = [];

                    for (let t = 0; t < total; t++) {
                        tokens.push({
                            name: raw[t].tokenInfo.name,
                            value: `${raw[t].balance / Math.pow(10, parseInt(raw[t].tokenInfo.decimals))}`,
                            inline: true,
                        });
                    }

                    return {
                        name: 'ERC-20 Tokens',
                        link: `https://etherscan.io/address/${address}`,
                        fields: tokens,
                    };
                }
            }

            return Promise.reject();
        }).then(data => {
            if (sentMessage === null) {
                return Promise.reject();
            }

            sentMessage.edit(new RichEmbed({
                title: data.name,
                url: data.link,
                fields: data.fields,
            }));
        }).catch(msg => {
            const text = msg ? msg : `Could not fetch balance for "${ticker}@${address}".`;

            if (sentMessage !== null) {
                sentMessage.edit(text);
            } else {
                msg.channel.send(text);
            }
        });
    }

}

module.exports = new Balance();
