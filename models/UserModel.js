import mongoose from "mongoose";

const User = mongoose.Schema({
    fullName : {
        type: String,
        require: [true,"Full name is required!"]
    },
    email : {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression for email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email address'
        }
    },
    password : {
        type : String,
        require: [true,"Password is required!"],
        minlength: [6,"Password must be at least 6 characters long"]
    }
})

export default mongoose.model("User",User)