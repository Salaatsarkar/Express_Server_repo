import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

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


        // res.status(201).json({
        //     success : true,
        //     message:"User Login Successfully !!",
        //     data : result
            
        // })

        sendResponse(res, {
            statusCode: 201,
            success : true,
            message:"User Login Successfully !!",
            data : result
        })
        
    } catch (error : any) {

        // res.status(500).json({
        //     success : false,
        //     message : error?.message,
        //     error : error
        // })
        sendResponse(res, {
            statusCode: 500,
            success : false,
            message : error?.message,
            error : error
        })
        
    }

}

//! Get Refresh Token in Server by Cookies and Create Access Token START
const getRefreshToken = async (req: Request , res : Response) =>{

    //console.log(req.cookies.refreshToken);
    const result = await authService.generateNewAccessToken(req.cookies.refreshToken);


    try {
        //  res.status(201).json({
        //     success : true,
        //     message:"Generate New Access Token Successfully !!", 
        //     data : result
        // })

        sendResponse(res, {
            statusCode: 201,
            success : true,
            message:"Generate New Access Token Successfully !!", 
            data : result
        })
        
    } catch (error : any) {

        sendResponse(res, {
            statusCode: 500,
            success : false,
            message : error?.message,
            error : error
        })
        
    }

}


//! Get Refresh Token in Server by Cookies  and Create Access Token END



export const authController = {
    loginUser,
    getRefreshToken
}