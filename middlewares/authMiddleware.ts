import jwt from "jsonwebtoken" 
import asynHandler from "express-async-handler"
import Folder from "../models/mainDirectory.models"
import {Response,NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import config from "config"
import mongoose, { DocumentDefinition } from "mongoose";
import { FolderDocument } from "../models/mainDirectory.models";
import { Request } from 'express';

 

const JWT_SECRET = config.get("JWT_SECRET") as string;
export interface RequestWithUser extends Request {
    user?: FolderDocument;
  }
const protect=asynHandler(async(req:RequestWithUser,res:Response,next:NextFunction)=>{

    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
            //Get token from headers

            try{
                token=req.headers.authorization.split(" ")[1]

                //verified Token
                const decoded:any=jwt.verify(token,JWT_SECRET)

                //Get user from the token

               const user=await Folder.findById(decoded.id).select("-name")
                
               if (user) {
                req.user = user;
                next();
              } 
                // console.log(req.user)

             
            }
            catch(err){
                // console.log(err)
                res.status(401)
                throw new Error("Not a directory or folder exist")

            }

    }

    if(!token){
        res.status(401)
        throw new Error("please select a correct folder")
    }



})

export {protect}