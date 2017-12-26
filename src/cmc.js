const request = require('request');

const base = 'https://api.coinmarketcap.com/v1/';

const fetch = id => {
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
