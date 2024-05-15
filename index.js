const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { Pool } = require('pg');
const pool = new Pool({
    user: 'dbuser',
    host: process.env.DB_HOST || 'localhost',
    database: 'sample-db',
    password: 'secretpassword',
    port: parseInt(process.env.DB_PORT) || 5432,
});

// Endpoint to get all rows
app.get('/rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sample_table');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get nth row
app.get('/rows/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sample_table WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Row not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to calculate average
app.get('/average', async (req, res) => {
    try {
        const result = await pool.query('SELECT AVG(number_field) FROM sample_table');
        res.json({ average: result.rows[0].avg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Application listening at 0.0.0.0:3000');
});
