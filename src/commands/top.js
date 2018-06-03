const { RichEmbed } = require('discord.js');
const Command = require('./command');
const Ticker = require('./../ticker');
const { Crypto } = require('./../bags/models');

class Top extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super();

        this.params = ['type', 'period'];
        this.description = 'Returns the top Cryptos by type for the given period.';
        this.minParams = 2;
    }

    /**
     * Executes the Command logic.
     *
     * @param {Message} msg
     * @param {Array} [params]
     */
    execute(msg, params = []) {
        const allowed = {
            types: ['gainers', 'losers'],
            periods: ['1h', '24h', '7d'],
        };
        const type = params[0];
        const period = params[1];
        let sentMessage = null;
        let results = [];

        msg.channel.send(this.prepare('Fetching...')).then(message => {
            sentMessage = message;

            if (allowed.types.indexOf(type) === -1) {
                return Promise.reject(`Unknown type "${type}". Allowed options: ${allowed.types.join(', ')}`);
            }

            if (allowed.periods.indexOf(period) === -1) {
                return Promise.reject(`Unknown period "${period}". Allowed options: ${allowed.periods.join(', ')}`);
            }

            return Ticker.charts[type][period];
        }).then(ids => {
            results = ids;

            return Crypto.findAll({
                where: {
                    id: ids,
                },
            }).then(data => {
                const parsed = {};
                const total = data.length;

                for (let c = 0; c < total; c++) {
                    const crypto = data[c].get({
                        plain: true,
                    });

                    parsed[crypto.id] = crypto;
                }

                return parsed;
            });
        }).then(data => {
            const diff = Math.floor((Date.now() - Ticker.charts.lastUpdated) / 1000);
            const typeStr = type.charAt(0).toUpperCase() + type.slice(1);
            const total = results.length;
            const fields = [];
            let diffStr = `${diff}s`;

            if (diff > 60) {
                const mins = Math.floor(diff / 60);
                diffStr = `${mins}m`;
            }

            for (let r = 0; r < total; r++) {
                const crypto = data[results[r]];
                const val = crypto[`change_${period}`];
                let change = '';

                if (val > 0) {
                    change = '+';
                }

                fields.push({
                    name: `${crypto.name} [${crypto.symbol.toUpperCase()}]`,
                    value: `${change}${val}%`,
                });
            }

            sentMessage.edit(new RichEmbed({
                title: `Top ${typeStr} (${period})`,
                footer: {
                    text: `Updated ${diffStr} ago`,
                },
                fields,
            }));
        }).catch(msg => {
            msg = this.prepare(msg);

            if (sentMessage !== null) {
                sentMessage.edit(msg);
            } else {
                msg.channel.send(msg);
            }
        });
    }

}

module.exports = new Top();
