const { discord } = require('./client');
const { parse } = require('./parser');
const { Server } = require('./bags/models');

const insertGuild = guild => Server.insertOrUpdate({
    id: guild.id,
    name: guild.name,
});

const register = () => {
    const jobs = [];

    discord.on('message', msg => parse(msg));
    discord.on('guildCreate', guild => insertGuild(guild));
    discord.on('guildDelete', guild => {
        Server.destroy({
            id: guild.id,
        });
    });

    // Update the Database with any Guilds we're already in.
    const guilds = discord.guilds.array();
    const total = guilds.length;

    for (let i = 0; i < total; i++) {
        jobs.push(insertGuild(guilds[i]));
    }

    return Promise.all(jobs);
};

const status = status => {
    discord.user.setActivity(status, {
        type: 'WATCHING',
    });
};

module.exports = {
    register,
    status,
};
