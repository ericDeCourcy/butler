const { listings } = require('./cmc');

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
         * Listing data from all Currencies listed on CMC.
         *
         * @type {Object}
         */
        this.currencies = {};

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
     * Fetches and parses the data from CoinMarketCap.
     */
    fetch() {
        if (this.fetching) {
            return;
        }

        this.fetching = true;

        listings().then(data => {
            const total = data.length;

            for (let c = 0; c < total; c++) {
                const config = {
                    id: data[c].id,
                    name: data[c].name,
                    symbol: data[c].symbol.toLowerCase(),
                    slug: data[c].website_slug,
                };

                this.currencies[config.id] = config;
                this.bySymbol[config.symbol] = config.id;
                this.bySlug[config.slug] = config.id;
            }

            this.fetching = false;
        });
    }

    /**
     * Returns a Currency object, accepts CMC ID, Slug or Symbol.
     *
     * @param {String|Number} id
     *
     * @return {Object|null}
     */
    getCurrency(id) {
        const isNum = !isNaN(parseInt(id));

        if (isNum && this.currencies[id]) {
            return this.currencies[id];
        }

        const isSym = !!this.bySymbol[id];

        if (isSym) {
            return this.currencies[this.bySymbol[id]];
        }

        const isSlug = !!this.bySlug[id];

        if (isSlug) {
            return this.currencies[this.bySlug[id]];
        }

        return null;
    }

    /**
     * Returns a Currency CMC ID.
     *
     * @param {String|Number} id
     *
     * @return {Number|null}
     */
    getCurrencyId(id) {
        const data = this.getCurrency(id);

        if (data === null) {
            return null;
        }

        return data.id;
    }

}

module.exports = new Ticker();
