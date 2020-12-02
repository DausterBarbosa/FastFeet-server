import {ErrorRequestHandler} from "express";

import {ValidationError} from "yup";

const ErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof ValidationError){
        return res.status(401).json({
            status: "validation fail",
            errors: err.errors
        });
    }

    console.error(err)
    return res.status(500).json({"error": "internal error"})
}

export default ErrorHandler;