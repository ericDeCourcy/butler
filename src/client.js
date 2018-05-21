const Discord = require('discord.js');
const Dbl = require('dblapi.js');

const discord = new Discord.Client();
discord.login(process.env.DISCORD_TOKEN).then(() => {
    discord.user.setActivity('Cryptocurrencies', {
        type: 'WATCHING',
    });
});

const dbl = new Dbl(process.env.DISCORDBOTS_TOKEN, discord);

module.exports = {
    discord,
    dbl,
};
