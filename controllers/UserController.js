import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/UserModel.js";

export const registerUser = async (req,res) => {
    try {
        const fullName = req.body.fullName.trim()
        const email = req.body.email.trim()
        const password = req.body.password.trim()

        if (fullName !== "" && email !== "" && password !== ""){
            if (password.length < 6) {
                return res.json({result : false, message : "Password must be at least 6 characters long"})
            }

            const existingUser = await User.findOne({email})

            if (existingUser) {
                return res.json({result: false, message: "User already exists"})
            }

            const newUser = new User({
                fullName, email,
                password : bcrypt.hashSync(password,10)
            })

            const savedUser = await newUser.save()

            return res.json({result: true, id : savedUser._id})
        }else {
            return res.json({result : false, message : "Fill field are required!"})
        }

    } catch (err) {
        return res.status(500).json({result : false,error : err.message})
    }
}

export const loginUser = async (req,res) => {
    try {
        const email = req.body.email.trim()
        const password = req.body.password.trim()

        if (email !== "" && password !== ""){
            const user = await User.findOne({email})
            if (!user || !bcrypt.compareSync(password,user.password)){
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET_KEY,{ expiresIn: '365d' });

            return res.status(200).json({result : true,
                user : {
                    email : user.email,
                    fullName : user.fullName,
                    token
                }})
        } else {
            return res.json({result : false, message : "Fill field are required!"})
        }

    } catch (err) {
        return res.status(500).json({result : false,error : err.message})
    }
}