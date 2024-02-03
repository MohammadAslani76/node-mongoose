import CarType from "../models/CarTypeModel.js";

export const getCarTypes = async (req,res) => {
    try{
        const carTypes = await CarType.find()
        if (carTypes){
            return res.status(200).json({result: true,data : carTypes})
        }else {
            return res.json({result: false,message: "CarTypes not found"})
        }
    } catch (err) {
        return res.status(500).json({result : false,error : err.message})
    }
}

export const getCarTypeById = async (req,res) => {
    try{
        const carType = await CarType.findById({_id : req.params.id})
        if (carType){
            return res.status(200).json({result: true,data: carType})
        }else {
            return res.json({result: false,message: "CarType not found"})
        }
    }catch (err){
        return res.status(500).json({result : false,error : err.message})
    }
}

export const createCarType = async (req,res) => {
    try{
        const name = req.body.name.trim();
        if (name !== "") {
            const carType = await CarType.create(req.body)
            if (carType) {
                return res.status(201).json({result: true,id : carType._id})
            } else return res.json({result: false,message: "Have a problem to create carType"})
        }else {
            return res.json({result: false,message: "Name is empty"})
        }
    }catch (err) {
        return res.status(500).json({result : false,error : err.message})
    }
}

export const deleteCarType = async (req,res) => {
    try {
        const carType = await CarType.deleteOne({_id : req.params.id})
        if (carType){
            return res.json({result: true})
        } else return res.status(404).json({result: false, message : "Car type not found"})
    } catch (err) {
        return res.status(500).json({result : false,error : err.message})
    }
}

export const updateCarType = async (req,res) => {
    try{
        const name = req.body.name.trim();
        const id = req.body._id
        if (name !== "") {
            const carType = await CarType.updateOne({_id: id},{$set: req.body})
            if (carType.matchedCount > 0) {
                return res.status(200).json({result: true})
            } else return res.json({result: false,message: "Have a problem to update carType"})
        }else {
            return res.json({result: false,message: "Name is empty"})
        }
    }catch (err) {
        return res.status(500).json({result : false,error : err.message})
    }
}