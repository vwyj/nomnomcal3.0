//store payment in database 
const mongoose = require('mongoose'); 
//store set, price,postedby(username) in database  
const diymealkitSchema = new mongoose.Schema( 
    { 
        diymealkit: 
        { 
            type: String, 
            required: [true, "Please enter the name of meal kit"], 
            trim: true, 
        }, 
        ingredients: 
        { 
            type: String, 
            required: [true, "Please enter ingredients"], 
            trim: true, 
        },
        instructions: 
        { 
            type: String, 
            required: [true, "Please enter instructions"], 
            trim: true, 
        },
        allergens: 
        { 
            type: String, 
            trim: true, 
        },
        calories:
        { 
            type: Number, 
            required: [true, "Please enter calories"], 
            trim: true, 
        },
        price: 
        { 
            type: Number, 
            trim: true, 
        }, 
        points: 
        { 
            type: Number, 
            trim: true, 
        }, 
   
        postedBy: 
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User', 
            required: true, 
        }, 
        status: {
            type: String,
            default: "Pending", 
        },
        remarks:{
            type: String,
            default: "Null", 
        }
    },  
    { timestamps: true } 
); 
 
module.exports = mongoose.model("Diymealkit", diymealkitSchema);
