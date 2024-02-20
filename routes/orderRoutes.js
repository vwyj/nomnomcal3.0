const express = require('express');     // to create an Express router
const { requireSignIn } = require('../controllers/userController');
const { getAllOrders } = require('../controllers/orderController');

// Router Object
const router = express.Router();

// GET ALL DIYMEALKIT COMPILATION || GET
router.get('/getAllOrders', getAllOrders);


// Export 
module.exports = router;
