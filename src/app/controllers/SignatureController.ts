import {Response, Request} from "express";

import {getRepository} from "typeorm";
import Signature from "../entity/Signature";

class SignatureController {
    async create(req:Request, res:Response){
        const {filename, path} = req.file;

        const SignatureRepository = getRepository(Signature);
        const signature = SignatureRepository.create({
            name: filename,
            path,
        });
        const signatureFile = await SignatureRepository.save(signature);

        return res.status(200).json(signatureFile);
    }
}

export default new SignatureController;