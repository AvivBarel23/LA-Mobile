import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            unique: true
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false
        }
    },
    {
        timestamps: true
    })
const User = mongoose.model("User", UserSchema)

export default User