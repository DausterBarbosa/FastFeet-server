import {getRepository} from "typeorm";
import bcrypt from "bcryptjs";

import User from "../entity/User";

import {Request, Response} from "express";

class UserController{
    async create(req: Request, res: Response){
        const UserRepository = getRepository(User);
        const user = UserRepository.create({
            name: "Dauster",
            email: "dausterBarbosa@gmail.com",
            password_hash: bcrypt.hashSync("12345", 8),
        });
        await UserRepository.save(user);

        return res.status(200).json({"status": "User master created."});
    }
}

export default new UserController;