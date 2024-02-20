const healthhackmodel= require("../models/healthhackModel");   // Import dailyStreakModel which contains Mongoose for dailystreak
                        // is used to interact with the MongoDB database collection associated with dailystreak
const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users
var { expressjwt: jwt } =  require('express-jwt');  //  express-jwt: used for verifying JWTs in Express.js middleware
const moment = require('moment');


 
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"],
});

const getHealthHacks = async (req, res) => {
    try {
       
        const tips = await healthhackmodel.aggregate([
            { $sample: { size: 10 } }
        ]);

        res.status(200).send({
            success: true,
            message: "Random Health Hacks",
            tips,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching random health hacks',
            error
        });
    }
};



module.exports = { requireSignIn, getHealthHacks};
  
