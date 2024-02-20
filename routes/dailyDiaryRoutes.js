const express = require('express');     // to create an Express router
const { requireSignIn } = require('../controllers/userController');
const { createEntry, getEntriesForDate, updateEntry, deleteEntry, getDailyGraph, getMonthlyGraph } = require('../controllers/dailyDiaryController');

// Create Router Object
// Create an instance of an Express router using express.Router()
// The router object allows the definition of routes for the application
const router = express.Router();

router.post('/createEntry', requireSignIn, createEntry);

router.get('/getEntry', requireSignIn, getEntriesForDate);

router.get('/getDaily', requireSignIn, getDailyGraph);

router.get('/monthly-graph', requireSignIn, getMonthlyGraph);

router.put('/updateEntry/:id', requireSignIn, updateEntry);

router.delete('/deleteEntry/:id', requireSignIn, deleteEntry);

// Export 
// Exports the router object, making it available for use in other parts of the application
// This allows this router to be mounted in the main Express application to handle specific routes
module.exports = router;