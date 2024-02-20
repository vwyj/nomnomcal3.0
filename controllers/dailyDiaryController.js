const dailyDiaryModel= require("../models/dailyDiaryModel");   // Import dailyStreakModel which contains Mongoose for dailystreak
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

const createEntry = async (req, res) => {
  const diaryEntry = new dailyDiaryModel({
    userId: req.auth._id,
    mealType: req.body.mealType,
    foodItem: req.body.foodItem,
    calories: req.body.calories,
    date: req.body.date,
  });
  

  try {
    const newDiaryEntry = await diaryEntry.save();
    res.status(201).json(newDiaryEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  };

  const getEntriesForDate = async (req, res) => {
    const { date, mealType } = req.query; // Extract the date and mealType from the query parameters
  
    try {
      // Find entries for the specified user, date, and meal type
      const entries = await dailyDiaryModel.find({ userId: req.auth._id, date: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) }, mealType: mealType });
  
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  const getDailyGraph= async (req, res) => {
    const { date } = req.query; // Extract the date and mealType from the query parameters
  
    try {
      // Find entries for the specified user, date, and meal type
      const entries = await dailyDiaryModel.find({ userId: req.auth._id, date: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } });
  
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  

  // Controller function to update an entry
const updateEntry = async (req, res) => {
  const { id } = req.params; // Extract the entry ID from the request parameters
  const { foodItem, calories } = req.body; // Extract the updated food item and calories from the request body

  try {
    // Find the entry by ID and update its fields
    const updatedEntry = await dailyDiaryModel.findByIdAndUpdate(id, { foodItem, calories }, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete an entry
const deleteEntry = async (req, res) => {
  const { id } = req.params; // Extract the entry ID from the request parameters

  try {
    // Find the entry by ID and delete it
    const deletedEntry = await dailyDiaryModel.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getMonthlyGraph = async (req, res) => {
  const currentDate = moment(); // Current date
  const monthsData = []; // Array to store data for each month

  try {
    // Loop through the last 6 months including the current month
    for (let month = 0; month < 6; month++) {
      // Calculate the first day of the current month
      const firstDayOfMonth = moment(currentDate)
        .subtract(month, 'months')
        .startOf('month')
        .toDate();

      // Calculate the last day of the current month
      const lastDayOfMonth = moment(firstDayOfMonth).endOf('month').toDate();

      // Find entries for the specified user and month
      const entries = await dailyDiaryModel.find({
        userId: req.auth._id,
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
      });

      // Aggregate data for the month
      const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

      // Format the month name (e.g., "September 2023" to "Sept '23")
      const formattedMonth = moment(firstDayOfMonth).format("MMM 'YY");

      // Add the aggregated data to the monthsData array
      monthsData.push({
        month: formattedMonth,
        totalCalories
      });
    }

    // Sort the monthsData array by year and month in ascending order
    monthsData.sort((a, b) => {
      const [monthA, yearA] = a.month.split(' ');
      const [monthB, yearB] = b.month.split(' ');

      if (yearA === yearB) {
        return moment(monthA, "MMM").month() - moment(monthB, "MMM").month();
      } else {
        return yearA - yearB;
      }
    });

    res.status(200).json(monthsData);
  } catch (error) {
    console.error('Error fetching six months graph data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
module.exports = { requireSignIn, createEntry, getEntriesForDate, updateEntry, deleteEntry, getDailyGraph, getMonthlyGraph};
  
