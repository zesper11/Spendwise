const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { db } = require('./db/db');
const { readdirSync } = require('fs');

const app = express()
const PORT = process.env.PORT || 5000

// middlewares

app.use(express.json({ limit: '4mb' }));
app.use(cors())
app.use('/api/v1', async (req, res, next) => {
    try {
        await db();
        next();
    } catch (error) {
        console.error('Database connection failed:', error.message);
        res.status(503).json({ message: 'Database is temporarily unavailable.' });
    }
});

//routes
readdirSync(path.join(__dirname, 'routes')).forEach((route) => {
    app.use('/api/v1', require(path.join(__dirname, 'routes', route)));
})

const server = () => {
    db().then(() => {
        app.listen(PORT, () => console.log(`you are listening to port ${PORT}`));
    }).catch((error) => {
        console.error('Unable to start API:', error.message);
        process.exitCode = 1;
    });
}

if (require.main === module) server();

module.exports = app;