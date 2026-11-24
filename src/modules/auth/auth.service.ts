import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { authUserType } from "./auth.interface";
import  jwt , { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import config from "../../config";

const loginUserIntoDB = async (payload : authUserType) =>{
    const {email , password} = payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `,[email]);

        if(user.rowCount === 0){
            throw new Error("Invalid Email")
        }

    const matchPassword = await bcrypt.compare(password,user.rows[0].password);
    if(!matchPassword){
            throw new Error("Invalid Password")
        }

    delete user.rows[0].password;
    
        const userBody = user.rows[0]

        const jwtPayload = {
            id :  userBody.id,
            name : userBody.name,
            email: userBody.email,
            age : userBody.age,
            phone : userBody.phone,
            gender : userBody.gender,
            is_active : userBody.is_active,
            role : userBody.role
        }
   

    const accessToken = jwt.sign(jwtPayload , config.secret_key , {expiresIn : "1h"})

    //! create Refresh Token START
    const refreshToken = jwt.sign(jwtPayload , config.refresh_key , {expiresIn : "10d"})

    //! create Refresh Token END

    return {accessToken,refreshToken, user : user.rows[0]}


       // console.log(user.rows[0])

}


//! generate new access token by refresh token START
const generateNewAccessToken = async (token : string) =>{

     if(!token){
      throw new Error("Unauthorized Access !!");
    }

    const decode = jwt.verify(token as string ,config.refresh_key) as JwtPayload;

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        
        `,[decode.email])

    if(user.rowCount === 0){
       throw new Error("User Not Found");
    }

    delete user.rows[0].password

    if(!user.rows[0].is_active){
      throw new Error("Forbidden")
    }

    //* New Access Token Create START
    const userBody = user.rows[0]
     const jwtPayload = {
            id :  userBody.id,
            name : userBody.name,
            email: userBody.email,
            age : userBody.age,
            phone : userBody.phone,
            gender : userBody.gender,
            is_active : userBody.is_active,
            role : userBody.role
        }
   

    const accessToken = jwt.sign(jwtPayload , config.secret_key , {expiresIn : "1h"});
     //* New Access Token Create END

    return {accessToken};

}


//! generate new access token by refresh token END

export const authService = {
    loginUserIntoDB,
    generateNewAccessToken
}