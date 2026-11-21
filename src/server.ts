import app from "./app";
import config from "./config";

import { userTableDB } from "./db";

const main = async() =>{

   await userTableDB();
    app.listen(config.port, () =>{
    console.log(`server is running on ${config.port}`);
})

}
main();