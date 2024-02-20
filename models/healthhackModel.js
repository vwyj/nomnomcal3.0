// models/Entry.js

const mongoose = require('mongoose');

const healthhackSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model('HealthHacks', healthhackSchema);
