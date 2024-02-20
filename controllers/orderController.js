const vendorDIYModel = require("../models/vendorDIYModel");
const orderModel = require("../models/orderModel");
const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)  
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison  
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users  
var { expressjwt: jwt } =  require('express-jwt'); 

const requireSignIn = jwt({  
    secret: process.env.JWT_SECRET,   
    algorithms: ["HS256"],  
}); 

// Get all DIY Meal Kit Orders
const getAllOrders = async (req, res) => {
    try
    {
        const orders = await vendorDIYModel.find();
        res.status(200).send({
            success: true,
            message: "All DIY Meal Kit Order Data",
            orders,
        });
    }
    catch (error)
    {
        console.log(error)
        res.status(500).send({
            success: false.valueOf,
            message: 'Error in Get all DIY Meal Kit Orders Controller',
            error
        });
    }
};

module.exports = { requireSignIn, getAllOrders };