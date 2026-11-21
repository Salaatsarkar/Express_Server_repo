import express, { type Application, type NextFunction, type Request, type Response } from "express"
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";

import fs from "fs";
import logger from "./middleware/logger";


const app : Application = express()
app.use(express.json());
 app.use(express.text());
 app.use(express.urlencoded({extended : true}))

//! Custom MiddleWare START
app.use(logger);
//! Custom MiddleWare END


app.use("/api/v1/users", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/auth", authRouter);

 

 //! chatu Task START

app.get("/", (req : Request,res : Response) =>{
    res.json({
        success : true,
        message : "Hello Root Express Server!"
    });
});

app.get("/about", (req : Request,res : Response) =>{
    res.send("I am learning Typescript & Express.js");
});

app.get("/contact" , (req : Request,res : Response) =>{
    res.send("Contact me at salaat@gmail.com");
});

//!User Information API START

// app.get("/user/:id", (req : Request,res : Response) =>{

//     const  userId = Number(req.params.id);
//     if(isNaN(userId)){
//         return res.status(404).send("Your UserId Must be a Number");
//     }

//     res.status(200).json({
//    "message": "User information",
//     "userId": userId,
// })
//     //console.log(userId)
// })
//!User Information API END

//?Search Product START
app.get("/products", (req : Request,res : Response) =>{

    const productData = req.query;

    console.log(productData);

    res.status(200).json({
        
//   "category": productData,
         data : productData,
      message: "Here are your products"
})
})

//?Search Product END


//*create user START
//  const users : any[] = [];

// app.post("/users", (req : Request,res : Response) =>{
//     const userBody = req.body;
//     console.log(userBody);
//     users.push(userBody);

//     res.status(201).json({
//         message : "User Created Successfully",
//         data : userBody
//     });

// })
//*create user END


// app.get("/users", (req : Request,res : Response) => {

//     res.status(200).json({
//         message : "All Users",
//         data : users
//     });
   
// });

//! chatu Task end

export default app