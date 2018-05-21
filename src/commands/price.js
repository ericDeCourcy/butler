const { RichEmbed } = require('discord.js');
const Command = require('./command');
const { fetch } = require('./../cmc');
const ticker = require('./../ticker');

class Price extends Command {

    constructor() {
        super();

        this.minParams = 1;
    }

    execute(msg, params = []) {
        const from = params[0].toLowerCase();
        let currency = null;
        let sentMessage = null;

        msg.channel.send('Fetching...').then(message => {
            sentMessage = message;
            currency = ticker.getCurrency(from);

            if (currency === null) {
                return Promise.reject();
            }

            return fetch(currency.id);
        }).then(data => {
            if (sentMessage === null) {
                return Promise.reject();
            }

            const { USD, BTC } = data.quotes;

            let color = 13369344; // Red.

            if (parseFloat(BTC.percent_change_1h) > 0) {
                color = 2728745; // Green.
            }

            sentMessage.edit(new RichEmbed({
                title: `${data.name} [${data.symbol}]`,
                url: `https://coinmarketcap.com/currencies/${data.website_slug}`,
                color,
                fields: [
                    {
                        name: 'Rank',
                        value: data.rank,
                        inline: true,
                    },
                    {
                        name: 'Cost (USD)',
                        value: parseFloat(USD.price).toLocaleString('en-US'),
                        inline: true,
                    },
                    {
                        name: 'Cost (BTC)',
                        value: `${BTC.price}`,
                        inline: true,
                    },
                    {
                        name: 'Change (1h)',
                        value: `${BTC.percent_change_1h}%`,
                        inline: true,
                    },
                    {
                        name: 'Change (24h)',
                        value: `${BTC.percent_change_24h}%`,
                        inline: true,
                    },
                    {
                        name: 'Change (7d)',
                        value: `${BTC.percent_change_7d}%`,
                        inline: true,
                    },
                ],
            }));
        }).catch((a, b, c) => {
            const text = `Could not fetch prices for "${from}".`;

            if (sentMessage !== null) {
                sentMessage.edit(text);
            } else {
                msg.channel.send(text);
            }
        });
    }

}

module.exports = new Price();
