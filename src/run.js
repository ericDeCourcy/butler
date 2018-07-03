require('dotenv').config();

const bugsnag = require('bugsnag');
const { login, discord, sequelize } = require('./client');
const discordEvents = require('./discord');
const ticker = require('./ticker');
const jobs = require('./jobs');
const servers = require('./servers');
const models = require('./bags/models'); // eslint-disable-line no-unused-vars

// Register Bugsnag.
const bugsnagApiKey = process.env.BUGSNAG_API_KEY;

if (bugsnagApiKey !== undefined && bugsnagApiKey.length) {
    bugsnag.register(bugsnagApiKey);
}

// Start the Bot.
console.log('Starting...');

sequelize.authenticate()
    .then(() => sequelize.sync())
    .then(() => servers.fetch())
    .then(() => ticker.fetch())
    .then(() => login())
    .then(() => discordEvents.register())
    .then(() => {
        console.log('Ready!');

        // Register any on-going Jobs.
        jobs.register();

        // Updates all the Prices initially.
        ticker.update();
    }
).catch(e => {
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

    killed = true;
    jobs.kill();
    discord.destroy().then(() => process.exit());
};

// Register the Listeners for different exit events.
process.on('exit', () => exit());
process.on('SIGINT', () => exit());
process.on('SIGUSR1', () => exit());
process.on('SIGUSR2', () => exit());
process.on('uncaughtException', () => exit());
