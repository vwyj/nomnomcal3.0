const express = require('express');     // to create an Express router 
const { requireSignIn } = require('../controllers/userController'); 
const { createDiyMealController, bestsellingDiy, generateGraph, getAllDiyUser, mostPopDate, mostPopAge, popularAgeGroup, getAllPendingDiy, acceptOrder, rejectOrder, saveDIYMealKitItems, saveDIYMealKitItemsByPoints } = require('../controllers/diyController'); 
 
// Create Router Object 
// Create an instance of an Express router using express.Router() 
// The router object allows the definition of routes for the application 
const router = express.Router(); 
 
// CREATE POST || POST 
// Define a route to handle HTTP POST requests to the "/create-post" endpoint 
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a post 
// Call createDiyMealController function from postController to handle the creation of a post 
router.post('/create-diymealkit', requireSignIn, createDiyMealController); 
router.get('/bestsellingDiy', bestsellingDiy);
router.get('/monthly-data', generateGraph);
 

// GET ALL DIYMEALKIT COMPILATION || GET
router.get('/getAllDIY', getAllDiyUser);

router.get('/popDate', mostPopDate);

router.get('/popAge', mostPopAge);

router.get('/popAgeGrp', popularAgeGroup);

router.get('/pending-diy-meal-kits', getAllPendingDiy);
router.put('/orders/:orderId', requireSignIn, acceptOrder);
router.put('/ordersReject/:orderId', requireSignIn, rejectOrder);
router.post('/save-items', requireSignIn, saveDIYMealKitItems);
router.post('/save-items-byPoints', requireSignIn, saveDIYMealKitItemsByPoints);
// Export  
// Exports the router object, making it available for use in other parts of the application 
// This allows this router to be mounted in the main Express application to handle specific routes 
module.exports = router;
