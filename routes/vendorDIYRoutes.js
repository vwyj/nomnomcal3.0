const express = require('express');     // to create an Express router
const { requireSignIn } = require('../controllers/userController');
const { createVendorDIYController, getAllVendorDIY, deleteVendorDIY, updateVendorDIY } = require('../controllers/vendorDIYController');

// Router Object
const router = express.Router();

// CREATE DIYMEALKIT || POST
router.post('/create-VendorDIY', requireSignIn, createVendorDIYController);

// GET ALL DIYMEALKIT COMPILATION || GET
router.get('/getAllVendorDIY', getAllVendorDIY);

// DELETE DIYMEALKIT 
router.delete('/delete-VendorDIY/:id', requireSignIn, deleteVendorDIY);

// UPDATE DIYMEALKIT
router.put('/update-VendorDIY/:id', requireSignIn, updateVendorDIY);

// Export 
module.exports = router;