// models/Entry.js

const mongoose = require('mongoose');

const dailyDiarySchema = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
  mealType: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner']
  },
  foodItem: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});


module.exports = mongoose.model('DailyDiary', dailyDiarySchema);
