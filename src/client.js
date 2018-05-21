const Discord = require('discord.js');
const Dbl = require('dblapi.js');

const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN).then(() => {
    client.user.setActivity('Cryptocurrencies', {
        type: 'WATCHING',
    });
});

const dbl = new Dbl(process.env.DISCORDBOTS_TOKEN, client);

module.exports = client;
