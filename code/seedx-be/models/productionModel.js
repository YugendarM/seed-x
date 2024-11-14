const mongoose = require("mongoose")

const productionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product',
        required: [true, "Product is required"]
    },
    productGrade: {
        type: String,
        enum: ["A", "B", "C", "D"]
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Producer is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    availableWithin: {
        type: Number,
        required: [true, "AvailableWithin no. of days is required"]
    }, 
    localLimit: {
        type: Number,
        required: [true, "localLimit is required"]
    },
    deliverableRegion: [{
        type: String, 
    }],
    restrictedRegion: [{
        type: String
    }],
    pricePerUnit: {
        type: Number,
        required: [true, "Price is required"]
    },
    deliveryChargePerUnit: {
        type: Number,
        required: [true, "Delivery charge is required"]
    },
    minimumQuantity: {
        type: Number
    },
    maximumQuantity: {
        type: Number
    }, 
    images: [{
        type: String,
    }]
}, {
    collection: 'production', 
    timestamps: true
})

module.exports = mongoose.model('production', productionSchema)