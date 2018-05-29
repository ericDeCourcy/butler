const pg = require('pg');

const {
    POSTGRESQL_PORT,
    POSTGRESQL_HOST,
    POSTGRESQL_USER,
    POSTGRESQL_PASSWORD,
    POSTGRESQL_DB,
} = process.env;
const pool = new pg.Pool({
    user: POSTGRESQL_USER,
    host: POSTGRESQL_HOST,
    database: POSTGRESQL_DB,
    password: POSTGRESQL_PASSWORD,
    port: POSTGRESQL_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
});
