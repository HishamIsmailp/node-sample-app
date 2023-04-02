const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'meeting_room_booking',
    password: 'kiebot@123',
    port: 5432,
});

module.exports = { pool };
