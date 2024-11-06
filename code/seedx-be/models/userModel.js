const mongoose = require("mongoose")

const favouriteSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["producer", "product", "category"],
        required: true
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        validate: {
            validator: function () {
                return this.type === "user" ? this.user != null : true;
            },
            message: "User ID is required when type is 'user'."
        }
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        validate: {
            validator: function () {
                return this.type === "product" ? this.product != null : true;
            },
            message: "Product ID is required when type is 'product'."
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        validate: {
            validator: function () {
                return this.type === "category" ? this.category != null : true;
            },
            message: "Category ID is required when type is 'category'."
        }
    }
});

const userSchema = new mongoose.Schema({    
    firstName: {
        type: String, 
        required: [true, "First Name is mandatory"]
    },
    lastName: {
        type: String, 
        required: [true, "Last Name is mandatory"]
    },
    email: {
        type: String, 
        required: [true, "Email is mandatory"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"],
        min: 8,
        max: 25,
        select: false
    },
    profilePicture: [{
        type: String,
    }],
    city: {
        type: String,
    },
    pincode: {
        type: String
    },
    state: {
        type: String,
    },
    location: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    addressLineOne: {
        type: String
    },
    addressLineTwo: {
        type: String
    },
    phoneNo: {
        type: String,
    },
    dob: {
        type: Date,
    },
    age: {
        type: Number,
    },
    experience: {
        type: Number
    },
    isProducer: {
        type: Boolean,
        default: false
    },
    farmSize: {
        type: Number,
        required: [true, 'Farm size is required']
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        comment: {type: String},
        rating: {type: Number}
    }],
    orders: {
        type: Number,
        default: 0
    },
    proofDocuments: [{
        documentName: {
            type: String,
        },
        documentType: {
            type: String
        },
        sector: {
            type: String,
            enum: ["private", "government", "others"]
        }
    }],
    fieldImages: [{
        type: String
    }],
    favourites: [favouriteSchema],
    cart: [{
        product:{
            type:  mongoose.Schema.Types.ObjectId,  //changed this to production reference
            ref: "production"
        },
        producer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        quantity: {                               // this is optional
            type: Number,
        }
    }],
    role: {
        type: String, 
        enum: ["consumer", "producer", "admin"],
        default: "consumer"
    }
}, {
    collection: "user",
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)