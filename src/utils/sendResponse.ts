import type { Response } from "express";

type responseT  <T> = {
    statusCode : number,
    success : boolean,
    message : string,
    data? : T,
    error? : any

}

const sendResponse = <T> (res : Response , data : responseT<T>) =>{

    res.status(data.statusCode).json({
            success : data.success,
            message:data.message, 
            data : data.data
        })

}

export default sendResponse;