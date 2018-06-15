const Command = require('./command');
const { rand } = require('./../helpers');

class Flip extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Flips a coin. That\'s all.',
            aliases: ['f'],
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute({ msg, prepare }) {
        let text = 'Heads';

        if (rand(0, 1) === 1) {
            text = 'Tails';
        }

        msg.channel.send(prepare(text));
    }

}

module.exports = new Flip();
