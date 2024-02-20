const express = require('express');     // to create an Express router  
const { requireSignIn } = require('../controllers/userController');    
const { createRedeemDiyMealController,calculateSelectedPointsDeducted } = require('../controllers/redeemController');  

// Create Router Object  
// Create an instance of an Express router using express.Router()  
// The router object allows the definition of routes for the application  
const router = express.Router();  
  
// CREATE POST || POST  
// Define a route to handle HTTP POST requests to the "/create-post" endpoint  
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a post  
// Call createDiyMealController function from postController to handle the creation of a post  
router.post('/create-redeem', requireSignIn, createRedeemDiyMealController);  
  
// Export   
// Exports the router object, making it available for use in other parts of the application  
// This allows this router to be mounted in the main Express application to handle specific routes  
module.exports = router;
