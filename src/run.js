require('dotenv').config();

const { discord, sequelize } = require('./client');
const discordEvents = require('./discord');
const ticker = require('./ticker');
const jobs = require('./jobs');
const servers = require('./servers');
const models = require('./bags/models'); // Registers Models before initialising.

console.log('Starting...');

sequelize.authenticate().then(() => {
    return sequelize.sync();
}).then(() => {
    return servers.fetch();
}).then(() => {
    return ticker.fetch();
}).then(() => {
    return discordEvents.register();
}).then(() => {
    console.log('Ready!');

    discordEvents.status('Cryptocurrencies');

    // Updates all the Prices initially.
    ticker.update();

    // Register any on-going Jobs.
    jobs.register();
}).catch(e => {
    console.error(e);
    exit();
});

// Tell the process not to exit straight away.
process.stdin.resume();

let killed = false;

const exit = () => {
    if (killed) {
        return;
    }

    jobs.kill();

    killed = true;
    discord.destroy().then(() => {
        process.exit();
    });
};

// Register the Listeners for different exit events.
process.on('exit', () => exit());
process.on('SIGINT', () => exit());
process.on('SIGUSR1', () => exit());
process.on('SIGUSR2', () => exit());
process.on('uncaughtException', () => exit());
