const Command = require('./../command');
const { rand } = require('./../../helpers');

class Dice extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Rolls a 6-sided dice.',
            aliases: ['d'],
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute({ msg, prepare }) {
        msg.channel.send(prepare(rand(1, 6)));
    }

}

module.exports = new Dice();
