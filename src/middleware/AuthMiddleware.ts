import {Request, Response, NextFunction} from "express";

import jwt from "jsonwebtoken";

import TokenConfig from "../config/token";

function AuthMiddleware(req:Request, res:Response, next:NextFunction){
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({"Error": "Token is not provided."});
    }

    const [, token] = authorization.split(" ");

    try {
        jwt.verify(token, TokenConfig.secret);

        next();
    } catch (error) {
        return res.status(401).json({"Error": "The token is invalid."});
    }
}

export default AuthMiddleware;