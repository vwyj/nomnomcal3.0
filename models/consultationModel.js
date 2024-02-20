// models/Entry.js

const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  consultantName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },

  selectedDate: {
    type: String,

    required: true
  },
  selectedTimeSlot: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});


module.exports = mongoose.model('Consultation', consultationSchema);
