const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Add Name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Add Email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please Add Password"],
        min: 6,
        max: 64
    },
    dob: {
        type: String,
        required: false,
        trim: true
    },
    gender: {
        type: String,
        required: false,
        trim: true
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    activitylvl: {
        type: String,
        required: false,
        trim: true
    },
    allergyString: 
    [
        {
            type: String,
        },
    ],
  
    question: {
        type: String,
        required: false,
        trim: true
    },
    answer: {
        type: String,
        required: false,
        trim: true
    },
    goal: {
        type: String,
        required: false,
        trim: true
    },
    totalCalories: {
        type: Number,
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: String,
        default: "active"
    },
    contactNumber: {
        type: Number
    },
    address: {
        country: {
            type: String,
            required: false,
            trim: true
        },
        unit: {
            type: String,
            required: false,
            trim: true
        },
        street: {
            type: String,
            required: false,
            trim: true
        },
        block: {
            type: String,
            required: false,
            trim: true
        },
        postal: {
            type: String,
            required: false,
            trim: true
        },
        floor: {
            type: String,
            required: false,
            trim: true
        },
        building: {
            type: String,
            required: false,
            trim: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
