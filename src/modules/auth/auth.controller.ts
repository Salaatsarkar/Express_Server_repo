import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req : Request , res : Response) =>{

    try {

        const result = await authService.loginUserIntoDB(req.body);
        const {refreshToken} = result;


        res.cookie("refreshToken",refreshToken,{
            secure : false,
            httpOnly : true,
            sameSite : "lax",
            path : '/',
            domain : "localhost"
        })


        res.status(201).json({
            success : true,
            message:"User Login Successfully !!",
            data : result
            
        })
        
    } catch (error : any) {

        res.status(500).json({
            success : false,
            message : error?.message,
            error : error
        })
        
    }

}

//! Get Refresh Token in Server by Cookies and Create Access Token START
const generateNewAccessToken = async (req: Request , res : Response) =>{

    console.log(req.cookies.refreshToken)


    try {
         res.status(201).json({
            success : true,
            message:"User Login Successfully !!", 
        })
        
    } catch (error : any) {

        res.status(500).json({
            success : false,
            message : error?.message,
            error : error
        })
        
    }

}



//! Get Refresh Token in Server by Cookies  and Create Access Token END



export const authController = {
    loginUser,
    generateNewAccessToken
}