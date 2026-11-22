import { pool } from "../../db";
import type { IUser, updateIUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async(payload : IUser) =>{

    const {name,email,password,phone,age,is_active, role} = payload ;

    const hashPassword = await bcrypt.hash(password,10);

        const result = await pool.query(`
                INSERT INTO users(name,email,password,phone,age,is_active,role)
                VALUES($1,$2,$3,$4,$5,$6,COALESCE($7,'user')) RETURNING *
            `,[name,email,hashPassword,phone,age,is_active,role]);

            //console.log(hashPassword);

            delete result.rows[0].password;


   //console.log(addUserDataDB);
   return result;

}

const getAllUserFromDB = async() =>{
    const result = await pool.query(`
                SELECT * FROM users`);

                return result;
}

const getSingleUserFromDB = async (id :  string) =>{
      const result = await pool.query(`
                SELECT * FROM users WHERE id = $1
                
                `,[id])

                return result;
}

const updateUserFromDB = async (payload : updateIUser , id : string) =>{

    const {name,password,phone,age} = payload;

            const result = await pool.query(`
                UPDATE users
                SET 
                name = COALESCE ($1, name),
                password = COALESCE ($2, password),
                phone = COALESCE ($3, phone),
                age = COALESCE ($4, age)
                WHERE id=$5 RETURNING *
                
                `,[name ?? null , password ?? null , phone ?? null , age ?? null , id]);

                //console.log(result)

                return result;
}


const deleteUserFromDB = async (id : string) =>{
       const result = await pool.query(`
                DELETE FROM users WHERE id=$1
                `,[id])
               
            //console.log(result)
            return result;
}


export const userService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB ,
    deleteUserFromDB
}