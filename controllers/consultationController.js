const consultationModel = require("../models/consultationModel");   // Import dailyStreakModel which contains Mongoose for dailystreak
                        // is used to interact with the MongoDB database collection associated with dailystreak
const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users
var { expressjwt: jwt } =  require('express-jwt');  //  express-jwt: used for verifying JWTs in Express.js middleware
const moment = require('moment');

// Middleware Authentication
// Configure a middleware requireSignIn using express-jwt
// This middleware is designed to ensure that incoming requests have a valid JWT in the "Authorization" header
// It uses the JWT secret from the environment variable JWT_SECRET and specifies the HMAC SHA-256 algorithm
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"],
});

const createBooking = async (req, res) => {   
    try {                                             
        const { consultantName, type, selectedDate, selectedTimeSlot } = req.body;
        if (!consultantName || !type) {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        const booking = await consultationModel({
            consultantName,
            type,
            selectedDate, 
            selectedTimeSlot,
            userId: req.auth._id
        }).save();

        res.status(201).send({
            success: true,
            message: 'Booking Created Successfully',
            booking,
        });
        console.log(req);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create Post API',
            error
        });
    }
};

const getBookingsByUserId = async (req, res) => {
    try {
        const userId = req.auth._id;

        // Query the database for bookings associated with the user ID
        const bookings = await consultationModel.find({ userId });

        res.status(200).send({
            success: true,
            message: 'Bookings retrieved successfully',
            bookings,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving bookings',
            error
        });
    }
};




module.exports = { requireSignIn, createBooking, getBookingsByUserId};
  
