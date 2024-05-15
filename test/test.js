const { Pool } = require('pg');
const assert = require('assert');
const fetch = require('node-fetch');

const pool = new Pool({
    user: 'dbuser',
    host: process.env.DB_HOST || 'localhost',
    database: 'sample-db',
    password: 'secretpassword',
    port: parseInt(process.env.DB_PORT) || 5432,
});

describe('API Tests', function() {
    it('should fetch all rows', async function() {
        const res = await fetch('http://web:3000/rows');
        const data = await res.json();
        assert.ok(data.length >= 0);
    });

    it('should fetch nth row', async function() {
        const res = await fetch('http://web:3000/rows/1');
        const data = await res.json();
        if (data.error) {
            assert.equal(data.error, 'Row not found');
        } else {
            assert.ok(data.id);
        }
    });

    it('should calculate average', async function() {
        const res = await fetch('http://web:3000/average');
        const data = await res.json();
        assert.ok(data.average !== undefined);
    });
});
