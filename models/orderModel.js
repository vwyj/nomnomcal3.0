const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderName: 
        {
            type: mongoose.Types.ObjectId,
            ref: "VendorDIY",
            required: true,
        }, 

        orderedBy: 
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);