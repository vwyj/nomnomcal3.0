const express = require('express');     // to create an Express router
const { requireSignIn } = require('../controllers/userController');
const { createDailyStreakController, getUserDailyStreakController, getTotalPointsController, getLoggedDaysController, deductPointsController } = require('../controllers/dailyStreakController');

// Create Router Object
// Create an instance of an Express router using express.Router()
// The router object allows the definition of routes for the application
const router = express.Router();

// CREATE POST || POST
// Define a route to handle HTTP POST requests to the "/create-logBreakfast" endpoint
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a logBreakfast
// Call createDailyStreakController function from logFoodController to handle the creation of a logBreakfast
router.post('/create-dailyStreak', requireSignIn, async (req, res) => {
    try {
       // Call createLogBreakfastController function from logFoodController to handle the creation of a logFood
       await createDailyStreakController(req, res);
    } catch (error) {
       console.error(error);
       res.status(500).send({
          success: false,
          message: 'Internal Server Error',
       });
    }
 });

 router.post('/deductPoints', requireSignIn, deductPointsController);


//GET USER LOG
 router.get("/get-dailyStreak", requireSignIn, getUserDailyStreakController)

 router.get('/get-total-points', requireSignIn, getTotalPointsController);

 router.get('/get-logged-days', requireSignIn, getLoggedDaysController);
// Export 
// Exports the router object, making it available for use in other parts of the application
// This allows this router to be mounted in the main Express application to handle specific routes
module.exports = router;