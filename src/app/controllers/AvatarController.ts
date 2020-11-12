import {getRepository} from "typeorm";
import Avatar from "../entity/Avatar";

import {Request, Response} from "express";

class AvatarController {
    async create(req:Request, res:Response){
        const {filename, path} = req.file;

        const AvatarRepository = getRepository(Avatar);
        const avatar = AvatarRepository.create({
            name: filename,
            path,
        });
        const avatarFile =  await AvatarRepository.save(avatar);

        return res.status(200).json(avatarFile);
    }
}

export default new AvatarController;