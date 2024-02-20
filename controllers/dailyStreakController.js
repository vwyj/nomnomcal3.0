const dailyStreakModel= require("../models/dailyStreakModel");   // Import dailyStreakModel which contains Mongoose for dailystreak
                        // is used to interact with the MongoDB database collection associated with dailystreak
const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users
var { expressjwt: jwt } =  require('express-jwt');  //  express-jwt: used for verifying JWTs in Express.js middleware


// Middleware Authentication
// Configure a middleware requireSignIn using express-jwt
// This middleware is designed to ensure that incoming requests have a valid JWT in the "Authorization" header
// It uses the JWT secret from the environment variable JWT_SECRET and specifies the HMAC SHA-256 algorithm
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"],
});


// Create logBreakfast
// Declares an asynchronous function createLogBreakfastController that takes two parameters: req (request) and res (response)
const createDailyStreakController = async (req, res) => {   
    try                                             
    {
        // Destructures mealB, breakfast, caloriesBreakfast from the request body (req.body)
        // Validate whether mealB, breakfast, caloriesBreakfast are present in the request body
        // If any is missing, it sends a 500 status response with a failure message
        const { dateCheckIn, points } = req.body
        if ( !dateCheckIn || !points )
        {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        // Creates a new log instance using the logFoodModel with user-provided  mealB,breakfast,caloriesBreakfast,dateToDb,id
        // Call save method to save log to database; Result is assigned to the variable logFood
        const dailyStreak = await dailyStreakModel({
            dateCheckIn,
            points,
            postedBy: req.auth._id
        }).save();

        // Send 201 status response indicating successful creation
        // Send success message and include created logFood in response body
        // Log entire request object to console
        res.status(201).send({
            success: true,
            message: 'Successfully checked in',
            dailyStreak,
        });
        console.log(req)
    }

    // Logs the error to the console
    // Send a 500 status response with a failure message and includes the error details in the response body
    catch (error) {
        console.error(error);
        res.status(500).json({
           success: false,
           message: 'Internal Server Error',
           error: error.message,
        });
     }
};


const deductPointsController = async (req, res) => {   
  try                                             
  {
      // Destructures mealB, breakfast, caloriesBreakfast from the request body (req.body)
      // Validate whether mealB, breakfast, caloriesBreakfast are present in the request body
      // If any is missing, it sends a 500 status response with a failure message
      const { deductedPoints } = req.body
    

      // Creates a new log instance using the logFoodModel with user-provided  mealB,breakfast,caloriesBreakfast,dateToDb,id
      // Call save method to save log to database; Result is assigned to the variable logFood
      const dailyStreak = await dailyStreakModel({
          deductedPoints,
          postedBy: req.auth._id
      }).save();

      // Send 201 status response indicating successful creation
      // Send success message and include created logFood in response body
      // Log entire request object to console
      res.status(201).send({
          success: true,
          message: 'Successfully store deducted points',
          dailyStreak,
      });
      console.log(req)
  }

  // Logs the error to the console
  // Send a 500 status response with a failure message and includes the error details in the response body
  catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
         error: error.message,
      });
   }
};

// GET USER LOGS
// Declares an asynchronous function getUserDailyStreakController that takes two parameters: req (request) and res (response)
const getUserDailyStreakController = async (req, res) => {
    try {
        // Use dailyStreakModel to find all logs in the database
        // Filter logs for today's date
        const currentDate = new Date();
        const todayDateString = currentDate.toISOString().split('T')[0];

        const logs = await dailyStreakModel.find({
            postedBy: req.auth._id,
            dateCheckIn: todayDateString,
        });

        // Send a 200 status response indicating a successful request and includes the retrieved logs in the response body
        res.status(200).send({
            success: true,
            message: "All logs Data",
            hasCheckedInToday: logs.length > 0,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GETALLPOSTS API',
            error
        });
    }
};

const getTotalPointsController = async (req, res) => {
  try {
      // Use dailyStreakModel to find all logs for the user in the database
      const logs = await dailyStreakModel.find({
          postedBy: req.auth._id,
      });

      // Calculate the total points from the logs
      let totalPoints = 0;
      let totalDeductedPoints = 0;

      if (logs.length > 0) {
          logs.forEach((log) => {
              if (log.points) {
                  totalPoints += log.points;
              }
              if (log.deductedPoints) {
                  totalDeductedPoints += log.deductedPoints;
              }
          });

          // Calculate the final total points after deducting deducted points
          const finalTotalPoints = totalPoints - totalDeductedPoints;

          // Send a 200 status response indicating a successful request and includes the final total points in the response body
          res.status(200).send({
              success: true,
              message: 'Total points retrieved successfully',
              totalPoints: finalTotalPoints,
          });
      } else {
          // No logs found for the user
          res.status(200).send({
              success: true,
              message: 'No logs found for the user',
              totalPoints: 0,
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: 'Internal Server Error',
      });
  }
};




  const getLoggedDaysController = async (req, res) => {
    try {
      // Use dailyStreakModel to find all logs for the user in the database
      const logs = await dailyStreakModel.find({
        postedBy: req.auth._id,
      });
  
      // Extract the dateCheckIn values from the logs and send them as an array
      const loggedDays = logs.map((log) => log.dateCheckIn);
  
      // Send a 200 status response indicating a successful request and includes the logged days in the response body
      res.status(200).send({
        success: true,
        message: 'Logged days retrieved successfully',
        loggedDays,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
  
module.exports = { requireSignIn, createDailyStreakController, getUserDailyStreakController, getTotalPointsController, getLoggedDaysController, deductPointsController };
  
