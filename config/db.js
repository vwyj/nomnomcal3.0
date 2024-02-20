const mongoose = require('mongoose');   // Mongoose: library for MongoDB; used to interact with MongoDB in an easier way
const colors = require('colors');       // To color console output

const connectDB = async() => {          //  async: indicates this function contains asynchronous operations, esp MongoDB connection which returns a promise
    
    // To attempt to connect to the MongoDB database using mongoose.connect
    // It awaits the result of the connection attempt as mongoose.connect returns a promise
    // If connection is successful, it logs a message to the console indicating that the connection has established, including the host of the MongoDB database
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(
            `Connected to DATEBASE ${mongoose.connection.host}`.bgCyan.white
        );
    }

    // It logs an error message to the console, including details about the error
    catch (error)
    {
        console.log(`Error in DATABASE Connection ${error}`.bgRed.white);
    }
};

module.exports = connectDB;