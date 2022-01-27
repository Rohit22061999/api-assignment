const mongoose = require('mongoose')

let db = 'mongodb://localhost:27017/Api'
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDb created")
    } catch (err) {
        console.log(err.message)
    }
}


module.exports.connectDB = connectDB