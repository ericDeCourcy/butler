const Command = require('./command');
const Ticker = require('./../ticker');
const { Crypto } = require('./../bags/models');

class Convert extends Command {

    constructor() {
        super();

        this.minParams = 3;
    }

    execute(msg, params = []) {
        const amount = parseFloat(params[0]);
        const data = {
            from: {
                id: null,
                raw: params[1].toLowerCase(),
                data: null,
            },
            to: {
                id: null,
                raw: params[2].toLowerCase(),
                data: null,
            },
        };
        let sentMessage = null;

        // Fetch the CMC IDs.
        data.from.id = Ticker.getCurrencyId(data.from.raw);
        data.to.id = Ticker.getCurrencyId(data.to.raw);

        // Used to fetch a Currency from the Database.
        const fetchCurrency = ticker => {
            const config = data[ticker];

            return Crypto.findById(config.id).then(crypto => {
                data[ticker].data = crypto.get({
                    plain: true,
                });
            }).catch(() => {
                return Promise.reject(`Could not recognise "${config.raw}".`);
            });
        };

        msg.channel.send('Converting...').then(message => {
            sentMessage = message;

            return fetchCurrency('from');
        }).then(() => {
            return fetchCurrency('to');
        }).then(() => {
            const { from, to } = data;
            const multi = from.data.price_btc / to.data.price_btc;
            const symbols = {
                from: from.data.symbol.toUpperCase(),
                to: to.data.symbol.toUpperCase(),
            };
            const converted = amount * multi;

            sentMessage.edit(`${amount} ${symbols.from} = ${converted} ${symbols.to}`);
        }).catch(msg => {
            if (sentMessage !== null) {
                sentMessage.edit(msg);
            } else {
                msg.channel.send(msg);
            }
        });
    }

}

module.exports = new Convert();
