const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017"

const connectToMongo = async()=>{
    mongoose.connect(mongoURL)
    .then(()=>{
        console.log("connected to mongo successfully " )
    })
}

module.exports = connectToMongo;