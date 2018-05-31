const ticker = require('./ticker');

const intervals = {
    listingUpdate: null,
    infoUpdate: null,
};

const keys = Object.keys(intervals);
const total = keys.length;

const register = () => {
    // Internal Crypto Listings update.
    intervals.listingUpdate = setInterval(() => {
        ticker.fetch();
    }, parseInt(process.env.CRYPTO_UPDATE_INTERVAL));

    // Regular information update.
    intervals.infoUpdate = setInterval(() => {
        ticker.update();
    }, parseInt(process.env.INFO_UPDATE_INTERVAL));
};

const kill = () => {
    for (let k = 0; k < total; k++) {
        clearInterval(intervals[keys[k]]);
    }
};

module.exports = {
    register,
    kill,
};
