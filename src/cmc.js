const request = require('request');
const tickers = require('./bags/tickers');

const base = 'https://api.coinmarketcap.com/v1/';
const tickerKeys = Object.keys(tickers);

const fetch = id => {
    if (tickerKeys.indexOf(id) !== -1) {
        id = tickers[id];
    }

    return new Promise((resolve, reject) => {
        request(`${base}ticker/${id}`, (err, response, body) => {
            if (err) {
                reject();
            }

            const data = JSON.parse(body);

            if (!Array.isArray(data) || !data.length) {
                reject();
            }

            resolve(data[0]);
        });
    });
};

module.exports = {
    fetch,
};
