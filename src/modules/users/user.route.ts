import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

//? create user by post START
    //api/v1/users = "/"

    router.post("/", userController.createUser)

    //*all user get from database in postman START

    router.get('/', auth(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUser)

    //*all user get from database in postman END

    
    //?single id get from database in post START

    router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.agent , USER_ROLE.user) ,userController.getSingleUser )

    //?single id get from database in post END

      //! Update a specific user by PUT method START

    router.put("/:id",auth(USER_ROLE.admin, USER_ROLE.user) ,userController.updateUser)

    //! Update a specific user by PUT method END

      //*Delete a specific user by DELETE method START

    router.delete("/:id", auth(USER_ROLE.admin) ,userController.deleteUser )

    //* Delete a specific user by DELETE method END




export  const userRoute = router;