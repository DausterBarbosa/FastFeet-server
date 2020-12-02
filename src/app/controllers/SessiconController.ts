import {getRepository} from "typeorm";
import User from "../entity/User";

import jwt from "jsonwebtoken";
import config from "../../config/token";

import * as yup from "yup";

import {Request, Response} from "express";

class SessionController{
    async create(req:Request, res:Response){
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        }).noUnknown().required().strict(true);

        await schema.validate(req.body, {abortEarly: false});

        const {email, password} = req.body;

        const UserRepository = getRepository(User);
        const user = await UserRepository.findOne({where: {email}});

        if(!user){
            return res.status(401).json({"error": "Email not found."});
        }

        if(! await user.passwordValidate(password)){
            return res.status(401).json({"error": "Password do not match."});
        }

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.time,
        });

        return res.status(200).json({
            name: user.name,
            email: user.email,
            token,
        });

    }
}

export default new SessionController;