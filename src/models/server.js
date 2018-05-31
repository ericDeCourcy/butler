const { STRING } = require('sequelize');
const { sequelize } = require('./../client');

const Server = sequelize.define('servers', {
    id: {
        type: STRING,
        primaryKey: true,
    },
    name: {
        type: STRING,
    },
});

module.exports = Server;
