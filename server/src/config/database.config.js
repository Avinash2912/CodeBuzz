const mongoose = require('mongoose')
const { DBNAME, DBUSER, DBPASS } = require('./server.config')

const connectDB = async () => {
    await mongoose.connect(
       
        `mongodb://localhost:27017/${DBNAME}`,
    )
    console.log('database connected')
}

module.exports = connectDB
