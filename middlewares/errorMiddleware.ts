import express, { Express, NextFunction, Request, Response} from "express";

export const errorHandle=(err:any,req:Request,res:Response,next:any)=>{
    const statusCode=res.statusCode?res.statusCode:500

    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==="production"?null:err.stack,
    })
}

