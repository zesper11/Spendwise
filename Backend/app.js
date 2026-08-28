const express = require('express');
const cors = require('cors')
require('dotenv').config()
const {db} = require('./db/db')
const { readdirSync } = require('fs')


const app = express()
const PORT = process.env.PORT || 5000

// middlewares

app.use(express.json());
app.use(cors())

//routes
readdirSync('./routes').map((route) => {
    app.use('/api/v1', require('./routes/' + route))
})

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log(`you are listening to port ${PORT}`)

    })
}

server()