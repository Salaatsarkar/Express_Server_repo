import dotenv from "dotenv"
import path from "node:path";
//import process from "node:process";

dotenv.config({
    path : path.join(process.cwd(), ".env")
})

const config = {
    port: process.env.PORT || 3000,
    connection_string : process.env.DATABASE_URL as string,
    secret_key : process.env.ACCESS_TOKEN_SECRET_KEY as string,
    refresh_key : process.env.REFRESH_TOKEN_SECRET_KEY as string
   
}

export default config;