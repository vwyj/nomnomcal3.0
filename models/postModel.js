const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: [true, "Please add Recipe Name"],
    },

    ingredients:
    {
        type: String,
        required: [true, "Please add Recipe Ingredients"],
    },

    instructions:
    {
        type: String,
        required: [true, "Please add Recipe Instructions"],
    },

    calorie:
    {
        type: Number,
        required: [true, "Please add amount of calorie"],
    },

    postedBy:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },

}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);