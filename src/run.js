require('dotenv').config();

const { discord, sequelize } = require('./client');
const discordEvents = require('./discord');
const ticker = require('./ticker');
const jobs = require('./jobs');
const models = require('./bags/models'); // Registers Models before initialising.

console.log('Starting...');

sequelize.authenticate().then(() => {
    return models.Crypto.sync({
        force: true,
    });
}).then(() => {
    return models.Server.sync({
        force: true,
    });
}).then(() => {
    return ticker.fetch();
}).then(() => {
    return ticker.update();
}).then(() => {
    return discordEvents.register();
}).then(() => {
    discordEvents.status('Cryptocurrencies');

    // Register any on-going Jobs.
    jobs.register();

    console.log('Ready!');
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
