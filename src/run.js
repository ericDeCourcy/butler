require('dotenv').config();

const client = require('./client');
const { parse } = require('./parser');

client.on('message', msg => parse(msg));

// Tell the process not to exit straight away.
process.stdin.resume();

let killed = false;

const exit = () => {
    if (killed) {
        return;
    }

    killed = true;
    client.destroy().then(() => {
        process.exit();
    });
};

// Register the Listeners for different exit events.
process.on('exit', () => exit());
process.on('SIGINT', () => exit());
process.on('SIGUSR1', () => exit());
process.on('SIGUSR2', () => exit());
process.on('uncaughtException', () => exit());
