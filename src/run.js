require('dotenv').config();

const { discord } = require('./client');
const ticker = require('./ticker');
const db = require('./db');
const { parse } = require('./parser');

discord.on('message', msg => parse(msg));
ticker.fetch();

// Tell the process not to exit straight away.
process.stdin.resume();

let killed = false;

const exit = () => {
    if (killed) {
        return;
    }

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
