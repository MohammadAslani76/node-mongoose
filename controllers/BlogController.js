import Blog from "../models/BlogModel.js";

export const createBlog = async (req,res) => {
    try {
        return res.status(201).json({result: true})
    } catch (err) {
        return res.status(500).json({result: false,error: err.message})
    }
}