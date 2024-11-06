const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is mandatory"]
    }, 
    category: {
        type: String,
        required: [true, "Product Name is mandatory"],
        enum: ["fruits", "vegetables", "pulses", "cereals", "spices", "nuts"]
    },
    bestSeller: {
        type: Boolean,
        default: false
    },
    images: [{
        type: String
    }]
}, {
    collection: "product",
    timestamps: true
})

module.exports = mongoose.model('product', productSchema)