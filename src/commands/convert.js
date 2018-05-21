const Command = require('./command');
const { fetch } = require('./../services/cmc');
const fiat = require('./../bags/fiat');
const ticker = require('./../ticker');

class Convert extends Command {

    constructor() {
        super();

        this.minParams = 3;
    }

    execute(msg, params = []) {
        const amount = parseInt(params[0]);
        const from = params[1].toLowerCase();
        const to = params[2].toLowerCase();
        const fromData = ticker.getCurrency(from);
        const toData = ticker.getCurrency(to);
        const fromFiat = fiat.indexOf(from.toUpperCase()) !== -1;
        const toFiat = fiat.indexOf(to.toUpperCase()) !== -1;
        const hasFiat = fromFiat || toFiat;
        let fiatId = null;
        let sentMessage = null;

        msg.channel.send('Checking...').then(message => {
            sentMessage = message;

            if (amount <= 0) {
                sentMessage.edit('Please don\'t.');
                return;
            }

            if (!fromFiat && fromData === null) {
                sentMessage.edit(`Cannot recognise "${from}".`);
                return;
            }

            if (!toFiat && toData === null) {
                sentMessage.edit(`Cannot recognise "${to}".`);
                return;
            }

            if (fromFiat && toFiat) {
                sentMessage.edit('We do not support fiat -> fiat conversion.');
                return;
            }

            if (!hasFiat && (fromData.id === toData.id)) {
                sentMessage.edit('Really?');
                return;
            }

            if (hasFiat) {
                let crypto = null;

                if (toFiat) {
                    crypto = fromData.id;
                    fiatId = to;
                } else {
                    crypto = toData.id;
                    fiatId = from;
                }

                return fetch(crypto, fiatId);
            }

            return Promise.all([
                fetch(fromData.id, 'BTC'),
                fetch(toData.id, 'BTC'),
            ]);
        }).then(data => {
            if (hasFiat) {
                const { price } = data.quotes[fiatId.toUpperCase()];
                let message = '';

                if (fromFiat) {
                    message += `${parseFloat(amount).toLocaleString('en-US')} ${fiatId.toUpperCase()}`;
                } else {
                    message += `${amount} ${fromData.symbol.toUpperCase()}`;
                }

                message += ' = ';

                if (fromFiat) {
                    message += `${amount / price} ${toData.symbol.toUpperCase()}`;
                } else {
                    message += `${parseFloat(amount * price).toLocaleString('en-US')} ${fiatId.toUpperCase()}`;
                }

                sentMessage.edit(message);
            } else {
                if (data.length < 2) {
                    sentMessage.edit('Could not fetch all currencies from CoinMarketCap. Please try again.');
                    return;
                }

                let fromIndex = 0;
                let toIndex = 1;
                let message = '';

                if (data[1].id === fromData.id) {
                    fromIndex = 1;
                    toIndex = 0;
                }

                const fromBtc = data[fromIndex].quotes.BTC.price;
                const toBtc = data[toIndex].quotes.BTC.price;

                message += `${amount} ${fromData.symbol.toUpperCase()}`
                message += ' = ';
                message += `${amount * (fromBtc / toBtc)} ${toData.symbol.toUpperCase()}`

                sentMessage.edit(message);
            }
        }).catch(() => {
            sentMessage.edit('Unknown error. Please try again.');
        });
    }

}

module.exports = new Convert();
