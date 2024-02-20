const diyModel = require("../models/diyModel");   // Import diyModel which contains Mongoose for diary 
                        // is used to interact with the MongoDB database collection associated with diaries 
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
 
// Create diymeal 
// Declares an asynchronous function createPostController that takes two parameters: req (request) and res (response) 
const createDiyMealController = async (req, res) => {    
    try                                              
    { 
        // Destructures title and description from the request body (req.body) 
        // Validate whether both title and description are present in the request body 
        // If either is missing, it sends a 500 status response with a failure message 
        const { diymealkit, ingredients, instructions, allergens, calories, price, points, postedBy } = req.body 
        if ( !diymealkit  ) 
        { 
            return res.status(500).send({ 
                success: false, 
                message: 'Please enter meal kit name' 
            }); 
        } 
        if ( !ingredients  ) 
        { 
            return res.status(500).send({ 
                success: false, 
                message: 'Please enter meal kit ingredients' 
            }); 
        } 

        if ( !instructions  ) 
        { 
            return res.status(500).send({ 
                success: false, 
                message: 'Please enter meal kit instructions' 
            }); 
        } 

        if ( !calories  ) 
        { 
            return res.status(500).send({ 
                success: false, 
                message: 'Please enter meal kit calories' 
            }); 
        } 





        

 
        // Creates a new post instance using the postModel with user-provided title, description, id 
        // Call save method to save post to database; Result is assigned to the variable post 
        let diymealkitsData = { 
            diymealkit, 
            ingredients, 
            instructions, 
            allergens, 
            calories, 
            postedBy: req.auth._id 
        };

        // Check if price is provided and not null
        if (price !== null) {
            diymealkitsData.price = price;
        }

        // Check if points is provided and not null
        if (points !== null) {
            diymealkitsData.points = points;
        }

        const diymealkits = await diyModel(diymealkitsData).save(); 
        // Send 201 status response indicating successful creation 
        // Send success message and include created post in response body 
        // Log entire request object to console 
        res.status(201).send({ 
            success: true, 
            message: 'Diy Mealkit Purchased Successfully', 
            diymealkits, 
        }); 
        console.log(req) 
    } 
 
    // Logs the error to the console 
    // Send a 500 status response with a failure message and includes the error details in the response body 
    catch (error) 
    { 
        console.log(error); 
        res.status(500).send({ 
            success: true, 
            message: 'Error in Purchasing Diy Mealkit', 
            error 
        }); 
    } 
}; 

// Get All diymeal created by vendor
const getAllDiyUser = async (req, res) => {
    try{
        const vendorDIYMealKits = await vendorDIYModel.find();
        res.status(200).send({
            success: true,
            message: "Get All DIY Meal Kit Data from Vendor",
            vendorDIYMealKits,
        });
    }
    catch (error)
    {
        console.log(error)
        res.status(500).send({
            success: false.valueOf,
            message: 'Error in Get All User DIY Meal Kit Controller',
            error
        });
    }
};


const bestsellingDiy = async (req, res) => {
    try {
        const collection = diyModel;

        // Group by diymealkit field and count the occurrences of each set
        const result = await collection.aggregate([
            {
                $group: {
                    _id: "$diymealkit",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Sort in descending order based on count
            },
            {
                $limit: 1 // Limit to one document (set with the maximum count)
            }
        ]).exec();

        // Process the result as needed
        if (result.length > 0) {
            const bestDiy = result[0];
            const responseText = `${bestDiy._id} \nQuantity: ${bestDiy.count}`;
            console.log(responseText);
            return res.status(200).send(responseText);
        } else {
            return res.status(404).send('No data found');
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error('Error in bestsellingDiy:', error);
        return res.status(500).send('Internal Server Error');
    }
};


const moment = require('moment');

const generateGraph = async (req, res) => {
    try {
        const collection = diyModel;

        // Get the current date
        const currentDate = new Date();

        // Initialize an array to hold the graph data
        const graphData = [];

        // Loop through the last 6 months including the current month
        for (let month = 0; month < 6; month++) {
            // Calculate the first day of the current month
            const firstDayOfMonth = moment(currentDate)
                .subtract(month, 'months')
                .startOf('month')
                .toDate();

            // Calculate the last day of the current month
            const lastDayOfMonth = moment(firstDayOfMonth).endOf('month').toDate();

            // Aggregate data to get the accumulated amount per month for the specified date range
            const result = await collection.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: firstDayOfMonth,
                            $lte: lastDayOfMonth
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" }
                        },
                        totalAmount: { $sum: "$price" }
                    }
                }
            ]).exec();

            // Process the result and push it to the graphData array
            result.forEach(item => {
                graphData.push({
                    month: item._id.month,
                    year: item._id.year,
                    totalAmount: item.totalAmount
                });
            });
        }

        // Sort the graph data by year and month in ascending order
        graphData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        res.status(200).json({ graphData });
    } catch (error) {
        console.error('Error in generateGraph:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const mostPopDate = async (req, res) => {
    try {
        const collection = diyModel;

        // Aggregate data to get the count per day for the year 2024
        const result = await collection.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date("2024-01-01"),
                        $lt: new Date("2025-01-01")
                    }
                }
            },
            {
                $group: {
                    _id: {
                        dayOfWeek: { $dayOfWeek: "$createdAt" },
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Sort in descending order based on count
            },
            {
                $limit: 1 // Limit to one document (day with the maximum count)
            }
        ]).exec();

        // Process the result as needed
        if (result.length > 0) {
            const maxDay = result[0];
            
            // Convert dayOfWeek to a JavaScript date object
            const date = new Date();
            date.setDate(date.getDate() - (date.getDay() - maxDay._id.dayOfWeek + 7) % 7); // Calculate the date
            
            // Format the date as dd mmm yyyy
            const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

            const responseText = `Peak Purchase Date: ${formattedDate} \nQuantity: ${maxDay.count}`;
            console.log(responseText);
            return res.status(200).send(responseText);
        } else {
            return res.status(404).send('No data found');
        }
    } catch (error) {
        console.error('Error in generateGraph:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const mostPopAge = async (req, res) => {
    try {
        const collection = diyModel;

        // Aggregate data to get the count per day for the year 2024
        const result = await collection.aggregate([
            {
                $group: {
                    _id: {
                        postedBy: "$postedBy",
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Sort in descending order based on count
            },
            {
                $limit: 1 // Limit to one document (user with the maximum count)
            }
        ]).exec();

        // Process the result as needed
        if (result.length > 0) {
            const maxUser = result[0];

            // Find the user's date of birth from the users collection
            const user = await userModel.findById(maxUser._id.postedBy);
            
            if (!user || !user.dob) {
                return res.status(404).send('User not found or DOB not available');
            }

            // Calculate the age
            const dob = new Date(user.dob);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dob.getFullYear();

            // Format the date as dd mmm yyyy
            const formattedDate = `${dob.getDate().toString().padStart(2, '0')} ${dob.toLocaleString('default', { month: 'short' })} ${dob.getFullYear()}`;

            const responseText = `User with the maximum purchase is ${user.name}, Age: ${age} years`;
            console.log(responseText);
            return res.status(200).send(responseText);
        } else {
            return res.status(404).send('No data found');
        }
    } catch (error) {
        console.error('Error in mostPopDateWithAge:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const popularAgeGroup = async (req, res) => {
    try {
        const collection = diyModel;

        // Aggregate data to get the count per age group
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: "users",  
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $group: {
                    _id: {
                        ageGroup: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $lte: ["$userDetails.dob", new Date("1990-01-01")] },
                                        then: "20-30"
                                    },
                                    {
                                        case: { $lte: ["$userDetails.dob", new Date("1980-01-01")] },
                                        then: "30-40"
                                    },
                                    {
                                        case: { $lte: ["$userDetails.dob", new Date("1970-01-01")] },
                                        then: "40-50"
                                    },
                                    {
                                        case: { $lte: ["$userDetails.dob", new Date("1960-01-01")] },
                                        then: "50-60"
                                    },
                                    {
                                        case: { $lte: ["$userDetails.dob", new Date("1950-01-01")] },
                                        then: "60-70"
                                    },
                                    {
                                        case: { $gte: ["$userDetails.dob", new Date("1950-01-01")] },
                                        then: "Above 70"
                                    }
                                    
                                ],
                                default: "Unknown"
                            }
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Sort in descending order based on count
            },
            {
                $limit: 1 // Limit to one document (age group with the maximum count)
            }
        ]).exec();

        // Process the result as needed
        if (result.length > 0) {
            const maxAgeGroup = result[0];
            const responseText = `Most Popular Age Group for DIY purchases: ${maxAgeGroup._id.ageGroup}, Quantity: ${maxAgeGroup.count}`;
            console.log(responseText);
            return res.status(200).send(responseText);
        } else {
            return res.status(404).send('No data found');
        }
    } catch (error) {
        console.error('Error in popularAgeGroup:', error);
        return res.status(500).send('Internal Server Error');
    }
};


const getAllPendingDiy = async (req, res) => {
    try {
        
        // Query the diyModel to find all documents with status "pending"
        const diyMealKitsOrders = await diyModel.find().populate('postedBy', 'name address.block address.street address.building address.floor address.unit address.country address.postal allergyString').exec();
        

        res.status(200).send({
            success: true,
            message: "Get All DIY Meal Kits with Pending Status",
            diyMealKitsOrders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Getting DIY Meal Kits with Pending Status',
            error
        });
    }
};

const acceptOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      
      // Find the order by ID
      const order = await diyModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Update the status of the order to "Accepted"
      order.status = 'Accepted';
      
      // Save the updated order
      await order.save();
      
      // Respond with success message
      res.status(200).json({ message: 'Order accepted successfully', order });
    } catch (error) {
      console.error('Error accepting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

const rejectOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      
      // Find the order by ID
      const order = await diyModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Update the status of the order to "Accepted"
      order.status = 'Rejected';
      
      // Save the updated order
      await order.save();
      
      // Respond with success message
      res.status(200).json({ message: 'Order Rejected successfully', order });
    } catch (error) {
      console.error('Error accepting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const saveDIYMealKitItems = async (req, res) => {
    try {
      const { cartItems } = req.body; // Extract the cartItems array from the request body
  
      // Loop through each item in the cart
      for (let item of cartItems) {
        // Create a new DIYMealKit object with item details
        const newDIYMealKit = new diyModel({
          diymealkit: item.title,
          price: item.price,
          ingredients: item.ingredients,
          instructions: item.instructions,
          allergens: item.allergens,
          calories: item.calories,
          postedBy: req.auth._id 
          // Add any other fields as needed
        });
        
   
        // Save the DIY meal kit item to the database
        await newDIYMealKit.save();
      }
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'DIY meal kit items saved successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error saving DIY meal kit items:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  const saveDIYMealKitItemsByPoints = async (req, res) => {
    try {
      const { cartItems } = req.body; // Extract the cartItems array from the request body
  
      // Loop through each item in the cart
      for (let item of cartItems) {
        // Create a new DIYMealKit object with item details
        const newDIYMealKit = new diyModel({
          diymealkit: item.title,
          points: item.points,
          ingredients: item.ingredients,
          instructions: item.instructions,
          allergens: item.allergens,
          calories: item.calories,
          postedBy: req.auth._id 
          // Add any other fields as needed
        });

   
        // Save the DIY meal kit item to the database
        await newDIYMealKit.save();
      }
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'DIY meal kit items saved successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error saving DIY meal kit items:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  module.exports = { requireSignIn, createDiyMealController, bestsellingDiy, generateGraph, getAllDiyUser, mostPopDate, mostPopAge, popularAgeGroup, getAllPendingDiy, acceptOrder, rejectOrder, saveDIYMealKitItems, saveDIYMealKitItemsByPoints }; 