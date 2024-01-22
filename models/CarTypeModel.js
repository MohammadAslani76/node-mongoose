import mongoose from "mongoose";

const CarType = mongoose.Schema({
    name : {
        type : String,
        require : [true,"Title is required"]
    }
})

export default mongoose.model("CarType",CarType)