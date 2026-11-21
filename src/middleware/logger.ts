import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = async(req: Request , res : Response ,next : NextFunction) =>{

    //console.log("Method -> URL ->  Time :", req.method, req.url, Date.now ());

    const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`;

    fs.appendFile("logger.txt" , log , (error) =>{
        //console.log("error",error)
    })

    next();

}

export default logger;

