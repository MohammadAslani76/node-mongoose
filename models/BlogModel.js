import mongoose from "mongoose";

const Blog = mongoose.Schema({
    userId : {
        type: String,
        require: [true,"UserId is required"]
    },
    title : {
        type: String,
        require: [true,"Title is required"]
    },
    text : {
        type: String,
        require: [true,"Text is required"]
    },
    image : {
        type : String
    }
})

export default mongoose.model("Blog",Blog)