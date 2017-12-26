require('dotenv').config();

const client = require('./client');
const { parse } = require('./parser');

client.on('message', msg => parse(msg));
