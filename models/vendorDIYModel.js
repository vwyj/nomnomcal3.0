const mongoose = require("mongoose");

const VendorDIYSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: [true, "Please add DIY Meal Kit Name"],
    },

    ingredients:
    {
        type: String,
        required: [true, "Please add DIY Meal Kit Ingredients"],
    },
    
    instructions:
    {
        type: String,
        required: [true, "Please add DIY Meal Kit Instructions"],
    },

    allergies:
    {
        type: String,
        required: [true, "Please add DIY Meal Kit Allergens"],
    },

    calories:
    {
        type: Number,
        required: [true, "Please add amount of calorie"],
    },

    price:
    {
        type: Number,
        required: [true, "Please add price of DIY Meal Kit"],
    },

    points:
    {
        type: Number,
        required: [true, "Please add points for redemption of DIY Meal Kit"],
    },

    }, { timestamps: true }
);

module.exports = mongoose.model( "VendorDIY", VendorDIYSchema );