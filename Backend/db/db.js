const mongoose  = require('mongoose')

const db = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database working')
    } catch (error){
        console.log('and error occcured on Database connection Process')
    }
}

module.exports= {db}