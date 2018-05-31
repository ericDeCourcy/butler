const Command = require('./command');

class Convert extends Command {

    constructor() {
        super();

        this.minParams = 3;
    }

    execute(msg, params = []) {
        const amount = parseInt(params[0]);
        const from = params[1].toLowerCase();
        const to = params[2].toLowerCase();

        //
    }

}

module.exports = new Convert();
