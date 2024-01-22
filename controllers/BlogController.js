import Blog from "../models/BlogModel.js";
import path from "path";

export const createBlog = async (req,res) => {
    try {
        if (req.files == null) return res.json({result: false,message: "Please add image"})

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
            return res.json({result : false,msg: "Image must be png,jpg,jpeg"});
        }
        if(fileSize > 5000000) return res.json({result : false,msg: "Maximum image size is 5Mb"})

        file.mv(`./public/images/${fileName}`, async (err) => {
            if(err) return res.json({result: false, msg: err.message})

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