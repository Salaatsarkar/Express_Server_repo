import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = async(req : Request , res : Response , next : NextFunction) =>{

    //console.log(req)


    console.log("This is Protected route");
    //console.log("headers",req.headers.authorization);

    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({
            success : false,
            message : "Unauthorized Access !!"
        })
    }

    const decode = jwt.verify(token as string ,config.secret_key) as JwtPayload;

     //console.log(decode);

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        
        `,[decode.email])

    if(user.rowCount === 0){
        res.status(404).json({
            success : false,
            message : "User Not Found"
        })
    }

    delete user.rows[0].password

    if(!user.rows[0].age){
        res.status(403).json({
            success : false,
            message : "Forbidden"
        })
    }

    req.user = decode;

    //console.log(req.user)
    console.log(req)
    

    next();

}

export default auth;