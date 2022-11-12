
import jwt from "jsonwebtoken"
import  asynHandler from "express-async-handler"
import Folder from "../models/mainDirectory.models"
import config from "config";
import Todo from "../models/subDirectorymodels"
import {Request,Response} from "express"
//desc create new directory
//@route POST /directory/create
//@access Public

const JWT_SECRET = config.get("JWT_SECRET") as string;

const createFolder=asynHandler(async(req:Request,res:Response)=>{
    const {name}=req.body
    if(!name){
        res.status(400)
        throw new Error("Please add a Unique name")
    }
    const folder=await Folder.findOne({name})
    if(folder){
        res.status(400)
        throw new Error("Folder is Already Exist")
    }

    const newFolder=await Folder.create({
        name
    })
  console.log(newFolder)
    if(newFolder){
        res.status(201).json({
       _id:newFolder.id,
       name:newFolder.name,
       token:generateToken(newFolder._id)
        })
    }

   


})
//desc list directory
//@route POST /directory/list
//@access Public
const getFoldersList=asynHandler(async(req,res)=>{
    const allFolder=await Folder.find()
    res.status(200).json(allFolder)
   

})

//desc remove  directory
//@route POST /directory/remove
//@access Public
const removeFolder=asynHandler(async(req,res)=>{
    const {name}=req.body
       const findOneTodo:any=await Folder.findOne({name})
    const removeoneFolder=await Folder.findOneAndDelete({name})
 
    const removeAllTodo=await Todo.deleteMany({user:findOneTodo._id})


    res.status(200).json({message:"Success"})
   

})



//Generate JWT
export const generateToken=(id:string)=>{
    return jwt.sign({id},JWT_SECRET)
}

export {createFolder,getFoldersList,removeFolder}