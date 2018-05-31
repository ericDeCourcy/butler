const now = require('performance-now');
const { listings, ticker } = require('./services/cmc');
const Crypto = require('./models/crypto');

class Ticker {

    /**
     * Initialize the new Ticker store.
     */
    constructor() {
        /**
         * Whether or not we're already fetching data from CMC.
         *
         * @type {Boolean}
         */
        this.fetching = false;

        /**
         * Whether or not we're already updating our Database with info from CMC.
         *
         * @type {Boolean}
         */
        this.updating = false;

        /**
         * Map of CMC IDs by Symbol.
         *
         * @type {Object}
         */
        this.bySymbol = {};

        /**
         * Map of CMC IDs by Slug.
         *
         * @type {Object}
         */
        this.bySlug = {};
    }

    /**
     * Fetches price info from CMC for all Cryptos in the Database.
     *
     * @return {Promise}
     */
    update() {
        if (this.updating) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const startTime = now();

            console.log('Updating Price Information...');

            this.updating = true;

            const updates = [];
            const max = 100; // Shouldn't have over 100 pages (10,000 Cryptos) for a few years, best to use it as a limit.
            let pages = 1;
            let count = 0;

            const fetch = (start = 1) => {
                ticker({
                    start,
                    limit: 100,
                    sort: 'id',
                    convert: 'BTC',
                }).then(page => {
                    const ids = Object.keys(page);
                    const total = ids.length;
                    count += total;

                    for (let c = 0; c < total; c++) {
                        const data = page[ids[c]];
                        const isBtc = data.id === 1;
                        const quote = data.quotes[isBtc ? 'USD' : 'BTC'];

                        updates.push(Crypto.update({
                            rank: data.rank,
                            price_btc: isBtc ? 1 : quote.price,
                            price_usd: data.quotes.USD.price,
                            change_1h: quote.percent_change_1h,
                            change_24h: quote.percent_change_24h,
                            change_7d: quote.percent_change_7d,
                            checkedAt: new Date(),
                        }, {
                            where: {
                                id: data.id,
                            },
                        }).catch(() => {
                            console.log(`"${data.name}" was not found in the DB - it will be added once Butler next updates.`);
                        }));
                    }

                    if (total >= 100) {
                        pages++;

                        if (pages >= max) {
                            reject();
                        } else {
                            fetch(start + 100);
                        }
                    } else {
                        Promise.all(updates).then(() => {
                            const diff = ((now() - startTime) / 1000).toFixed(2);
                            console.log(`Fetched ${count} (${pages} pages) in ${diff}s`);
                            resolve();
                        });
                    }
                });
            };

            fetch();
        });
    }

    /**
     * Fetches and parses the data from CoinMarketCap.
     *
     * @return {Promise}
     */
    fetch() {
        if (this.fetching) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const startTime = now();

            console.log('Updating Crypto Database...');

            this.fetching = true;

            const upserts = [];
            let totalCryptos = 0;
            let newlyCreated = 0;

            listings().then(data => {
                const total = data.length;

                for (let c = 0; c < total; c++) {
                    const config = {
                        id: data[c].id,
                        name: data[c].name,
                        symbol: data[c].symbol.toLowerCase(),
                        slug: data[c].website_slug,
                    };

                    upserts.push(Crypto.insertOrUpdate(config).then(created => {
                        this.bySymbol[config.symbol] = config.id;
                        this.bySlug[config.slug] = config.id;

                        if (created) {
                            newlyCreated++;
                        }

                        totalCryptos++;
                    }));
                }

                Promise.all(upserts).then(() => {
                    this.fetching = false;
                    const diff = ((now() - startTime) / 1000).toFixed(2);
                    console.log(`Fetched ${totalCryptos} (${newlyCreated} new) in ${diff}s`);
                    resolve();
                });
            });
        });
    }

    /**
     * Returns a Currency ID by Slug or Symbol.
     *
     * @param {String|Number} id
     *
     * @return {Object|null}
     */
    getCurrencyId(id) {
        const isSym = !!this.bySymbol[id];

        if (isSym) {
            return this.bySymbol[id];
        }

        const isSlug = !!this.bySlug[id];

        if (isSlug) {
            return this.bySlug[id];
        }

        return id;
    }

}

module.exports = new Ticker();
