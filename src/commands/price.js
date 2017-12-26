const { RichEmbed } = require('discord.js');
const Command = require('./command');
const { fetch } = require('./../cmc');

class Price extends Command {

    constructor() {
        super();

        this.minParams = 1;
    }

    execute(msg, params = []) {
        const from = params[0].toLowerCase();

        fetch(from).then(data => {
            msg.channel.send(new RichEmbed({
                title: `${data.name} [${data.symbol}]`,
                url: `https://coinmarketcap.com/currencies/${data.id}`,
                fields: [
                    {
                        name: 'Rank',
                        value: data.rank,
                        inline: true,
                    },
                    {
                        name: 'Cost (USD)',
                        value: parseFloat(data.price_usd).toLocaleString('en-US'),
                        inline: true,
                    },
                    {
                        name: 'Cost (BTC)',
                        value: data.price_btc,
                        inline: true,
                    },
                    {
                        name: 'Change (1h)',
                        value: `${data.percent_change_1h}%`,
                        inline: true,
                    },
                    {
                        name: 'Change (24h)',
                        value: `${data.percent_change_24h}%`,
                        inline: true,
                    },
                    {
                        name: 'Change (7d)',
                        value: `${data.percent_change_7d}%`,
                        inline: true,
                    },
                ],
            }));
        }).catch(() => {
            msg.channel.send('Error');
        });
    }

}

module.exports = new Price();
