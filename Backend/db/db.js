const mongoose  = require('mongoose')

let connectionPromise;

const db = async () => {
    if (mongoose.connection.readyState === 1) return mongoose.connection;
    if (!process.env.MONGO_URL) throw new Error('MONGO_URL is not configured');

    if (!connectionPromise) {
        mongoose.set('strictQuery', false);
        connectionPromise = mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log('Database working');
                return mongoose.connection;
            })
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }
    return connectionPromise;
}

module.exports= {db}