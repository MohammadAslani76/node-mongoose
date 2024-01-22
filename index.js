import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import 'dotenv/config'
import fileUpload from "express-fileupload"

import {connectToDB} from "./middleware/db.js";

import UserRoutes from "./routes/UserRoutes.js"
import BlogRoutes from "./routes/BlogRoutes.js";
import CarTypeRoutes from "./routes/CarTypeRoutes.js";

// Express
const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static("public"));

// Database
connectToDB()
const db = mongoose.connection;
db.on("error",(err) => console.log(err))
db.once("open",() => console.log("Database connected"))

// Routes
app.use("/users",UserRoutes)
app.use("/blog",BlogRoutes)
app.use("/car-type",CarTypeRoutes)

app.listen(2024,() => {
    console.log("Server is running...")
})