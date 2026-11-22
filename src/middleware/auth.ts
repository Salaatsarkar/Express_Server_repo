import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { Role } from "../types";

const auth = (...roles : Role []) =>{

    return async(req : Request , res : Response , next : NextFunction) =>{

    try {
        console.log(roles)


    console.log("This is Protected route");
    //console.log("headers",req.headers.authorization);

    const token = req.headers.authorization;
    if(!token){
       return res.status(401).json({
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
       return res.status(404).json({
            success : false,
            message : "User Not Found"
        })
    }

    delete user.rows[0].password

    if(!user.rows[0].is_active){
       return res.status(403).json({
            success : false,
            message : "Forbidden"
        })
    }

    if(roles.length && !roles.includes(user.rows[0].role)){
      return  res.status(401).json({
            success : false,
            message : "Unauthorized Access !!"
        })

    }

    req.user = decode;

    console.log(req.user)

    //console.log(decode)

    next();

    } catch (error) {
        next(error);
    }

}
}

export default auth;