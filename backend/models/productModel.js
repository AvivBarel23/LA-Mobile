import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }
})
const ProductSchema = mongoose.Schema({
        name: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        reviews: [reviewSchema],
        price: {
            type: Number,
            require: true,
            default: 0
        },
        countInStock: {
            type: Number,
            require: true,
            default: 0
        },
        rating: {
            type: Number,
            require: true,
            default: 0
        },
        numReviews: {
            type: Number,
            require: true,
            default: 0
        }
    },
    {
        timestamps: true
    })
const User = mongoose.model("Product", ProductSchema)

export default User