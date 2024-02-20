//store payment in database  
const mongoose = require('mongoose');  
//store set, price,postedby(username) in database   
const redeemSchema = new mongoose.Schema(  
    {  
        selectedSet: //setA-D   
        {  
            type: String,  
            required: [true, "Please Select a Set"],  
            trim: true,  
        },  
        selectedPoint: //point 
        {  
            type: Number,  
            required: [true, "Please input a point"],  
            trim: true,  
        },  
        //username   
        postedBy:  
        {  
            type: mongoose.Schema.ObjectId,  
            ref: 'User',  
            required: true,  
        },  
  
    },   
    { timestamps: true }  
);  
  
module.exports = mongoose.model("Redeem", redeemSchema);
