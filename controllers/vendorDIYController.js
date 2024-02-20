const vendorDIYModel = require("../models/vendorDIYModel");
const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)  
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison  
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users  
var { expressjwt: jwt } =  require('express-jwt'); 

const requireSignIn = jwt({  
    secret: process.env.JWT_SECRET,   
    algorithms: ["HS256"],  
}); 

// Create DIY Meal Kit
const createVendorDIYController = async (req, res) => {
    try
    {
        const { title, ingredients, instructions, allergies, calories, price, points } = req.body
        // Validate
        if ( !title || !ingredients || !instructions || !allergies || !calories || !price || !points)
        {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }
        const vendorDIYMealKits = await vendorDIYModel({
            title, 
            ingredients, 
            instructions, 
            allergies, 
            calories,
            price,
            points
        }).save();
        
        res.status(201).send({
            success: true,
            message: 'DIY Meal Kit created Successfully',
            vendorDIYMealKits,
        });
        console.log(req);
    }
    catch (error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Create DIY Meal Kit API',
            error,
        });
    }
};

// Get all DIY Meal Kit compilation
const getAllVendorDIY = async (req, res) => {
    try{
        const vendorDIYMealKits = await vendorDIYModel.find();
        res.status(200).send({
            success: true,
            message: "All Vendor DIY Meal Kit Data",
            vendorDIYMealKits,
        });
    }
    catch (error)
    {
        console.log(error)
        res.status(500).send({
            success: false.valueOf,
            message: 'Error in Get all Vendor DIY Meal Kit Controller',
            error
        });
    }
};



// Delete DIY Meal Kit
const deleteVendorDIY = async (req, res) => {
    try 
    {
        const { id } = req.params;

         // Delete meal kit
         await vendorDIYModel.findByIdAndDelete(id);
         res.status(200).send({
             success: true,
             message: 'DIY Meal Kit has successfully been deleted!',
         });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Delete Vendor DIY Meal Kit Controller',
            error,
        });
    }
};



// Update DIY Meal Kit
const updateVendorDIY = async (req, res) => {
    try 
    {
        const {  title, ingredients, instructions, allergies, calories, price } = req.body;
        
        // Find Post
        const mealKit = await vendorDIYModel.findById({ _id: req.params.id });
    
        // Validation
        if (!title || !ingredients || !instructions || !allergies || !calories) 
        {
            return res.status(500).send({
                success: false,
                message: "Please make sure to fill in the DIY meal kit title, ingredients, instructions, allergies, calories and price",
            });
        }
        const updatedMealKit = await vendorDIYModel.findByIdAndUpdate({ _id: req.params.id },
        {
            title: title || mealKit?.title,
            ingredients: ingredients || mealKit?.ingredients,
            instructions: instructions || mealKit?.instructions,
            allergies: allergies || mealKit?.allergies,
            calories: calories || mealKit?.calories,
            price: price || mealKit?.price,
        }, { new: true }
        );
        res.status(200).send({
            success: true,
            message: "DIY meal kit has been Successfully Updated!",
            updatedMealKit,
        });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Vendor DIY Meal Kit Controller',
            error,
        });
    }
};

module.exports = { requireSignIn, createVendorDIYController, getAllVendorDIY, deleteVendorDIY, updateVendorDIY };