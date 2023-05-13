const {connect} = require('mongoose')

const connectDB = async () => {
    try {
        await connect('mongodb+srv://salomon121212:1aH6Obf34aAphqaV@gym-app-cluster.hisgecs.mongodb.net/sample_airbnb?retryWrites=true&w=majority')
        console.log("mongodb connected")
    } catch (error) {
        console.error("mongo error")
    }
}

module.exports = {connectDB}