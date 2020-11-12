import {getRepository} from "typeorm";
import Recipient from "../entity/Recipient";

import * as yup from "yup";

import {Request, Response} from "express";

class RecipientsController{
    async create(req:Request, res: Response){
        const schema = yup.object().shape({
            name: yup.string().required(),
            street: yup.string().required(),
            complement: yup.string().required(),
            state: yup.string().required(),
            city: yup.string().required(),
            cep: yup.string().required(),
        });

        if(! (await schema.isValid(req.body))){
            return res.status(401).json({"Error": "Validation fail"});
        }

        const RecipientRepository = getRepository(Recipient);
        const repository = RecipientRepository.create(req.body);
        await RecipientRepository.save(repository);

        return res.status(200).json(repository);
    }

    async update(req: Request, res: Response){
        const schema = yup.object().shape({
            name: yup.string(),
            street: yup.string(),
            complement: yup.string(),
            state: yup.string(),
            city: yup.string(),
            cep: yup.string(),
        });

        if(! (await schema.isValid(req.body))){
            return res.status(401).json({"Error": "Validation fail"});
        }

        const {id} = req.params;

        const RecipientRepository = getRepository(Recipient);
        const repository = await RecipientRepository.findOne({where: {id}});

        const updatedRecipient = {
            ...repository,
            ...req.body,
        };

        await RecipientRepository.save(updatedRecipient);

        return res.status(200).json(updatedRecipient);
    }
}

export default new RecipientsController;