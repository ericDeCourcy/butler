const { RichEmbed } = require('discord.js');
const Command = require('./command');
const { fetch } = require('./../cmc');

class Price extends Command {

    constructor() {
        super();

        this.minParams = 3;
    }

    execute(msg, params = []) {
        const amount = parseInt(params[0]);
        const from = params[1];
        const to = params[2];
    }

}

module.exports = new Price();
