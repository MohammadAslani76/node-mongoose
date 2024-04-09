import Blog from "../models/BlogModel.js";
import path from "path";
import fs from "fs"

export const createBlog = async (req,res) => {
    try {
        if (req.files == null) return res.status(400).json({result: false,message: "Please add image"})

        const {title,text} = req.body;
        const userId = req.userId;

        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name)
        let dateNow = Math.round(Date.now());
        const fileName = dateNow + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())){
            return res.status(400).json({result : false,msg: "Image must be png,jpg,jpeg"});
        }
        if(fileSize > 5000000) return res.status(400).json({result : false,msg: "Maximum image size is 5Mb"})

        file.mv(`./public/images/${fileName}`, async (err) => {
            if(err) return res.status(400).json({result: false, message: err.message})

            try {
                const newBlog = await Blog.create({userId,title,text, image: fileName, url});
                return res.status(201).json({result: true, _id : newBlog._id})
            } catch (error) {
                return res.status(500).json({result: false,error: error.message})
            }
        })
    } catch (err) {
        return res.status(500).json({result: false,error: err.message})
    }
}

export const getBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find();
        if (blogs){
            return res.status(200).json({result: true, data: blogs })
        } else {
            return res.json({result: false, message : "Blogs not found!"})
        }
    } catch (err) {
        return res.status(500).json({result: false,error: err.message})
    }
}

export const getBlogById = async (req,res) => {
    try {
        const blog = await Blog.findById({_id : req.params.id})
        if (blog){
            return res.status(200).json({result: true, data: blog })
        } else {
            return res.json({result: false, message : "Blog not found!"})
        }
    } catch (err) {
        return res.status(500).json({result: false,error: err.message})
    }
}

export const editBlog = async (req,res) => {
    try {
        const blog = await Blog.findById({_id : req.params.id})
        if (!blog) {
            return res.status(404).json({result: false, message: "Blog not found"})
        }

        const {title,text} = req.body;
        const userId = req.userId;

        let fileName = "";
        if (req.files === null) {
            fileName = blog.image
        } else {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name)
            let dateNow = Math.round(Date.now());
            fileName = dateNow + ext;
            const allowedType = ['.png','.jpg','.jpeg'];

            if(!allowedType.includes(ext.toLowerCase())){
                return res.status(400).json({result : false,msg: "Image must be png,jpg,jpeg"});
            }
            if(fileSize > 5000000) return res.status(400).json({result : false,msg: "Maximum image size is 5Mb"})

            const filePath = `./public/images/${blog.image}`
            fs.unlinkSync(filePath)

            file.mv(`./public/images/${fileName}`, async (err) => {
                if(err) return res.status(400).json({result: false, message: err.message})
            })
        }
        try {
            const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
            await Blog.updateOne({_id : req.params.id},{$set :{userId,title,text, image: fileName, url}});
            return res.status(200).json({result: true})
        } catch (error) {
            return res.status(500).json({result: false,error: error.message})
        }
    } catch (err) {
        return res.status(500).json({result: false,error: err.message})
    }
}

export const deleteBlog = async (req,res) => {
    try {
        const blog = await Blog.findById({_id : req.params.id})
        if (!blog) {
            return res.status(404).json({result: false, message: "Blog not found"})
        }
        const filePath = `./public/images/${blog.image}`
        fs.unlinkSync(filePath)
        await Blog.deleteOne({_id : req.params.id})
        res.json({result: true})
    } catch (err) {
        console.log("message err",err)
        res.status(500).json({result: false,error: err.message})
    }
}

export const getUserBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({userId : req.userId});
        if (blogs){
            return res.status(200).json({result: true, data: blogs })
        } else {
            return res.json({result: false, message : "Blogs not found!"})
        }
    } catch (err) {
        return res.status(500).json({result: false,error: err.message})
    }
}