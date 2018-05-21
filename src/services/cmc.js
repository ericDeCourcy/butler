const request = require('request');

const base = 'https://api.coinmarketcap.com/v2/';

const fetch = (id, conversion = 'BTC') => new Promise((resolve, reject) => {
    request(`${base}ticker/${id}?convert=${conversion.toUpperCase()}`, (err, response, body) => {
        if (err) {
            reject();
        }

        const data = JSON.parse(body);

        if (data.data === null) {
            reject();
        }

        resolve(data.data);
    });
});

const listings = () => new Promise((resolve, reject) => {
    request(`${base}listings`, (err, response, body) => {
        if (err) {
            reject();
        }

        const data = JSON.parse(body);

        if (Array.isArray(data.data)) {
            resolve(data.data);
        } else {
            reject();
        }
    });
});

module.exports = {
    fetch,
    listings,
};
