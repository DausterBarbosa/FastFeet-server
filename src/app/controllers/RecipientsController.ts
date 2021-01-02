import {getRepository} from "typeorm";
import Recipient from "../entity/Recipient";

import * as yup from "yup";

import {Request, Response} from "express";

class RecipientsController{
    async create(req:Request, res: Response){
        const schema = yup.object().shape({
            name: yup.string().required(),
            street: yup.string().required(),
            number: yup.number().required(),
            complement: yup.string().required(),
            state: yup.string().required(),
            city: yup.string().required(),
            cep: yup.string().required(),
        }).noUnknown().required().strict(true);

        await schema.validate(req.body, {abortEarly: false});

        const RecipientRepository = getRepository(Recipient);
        const repository = RecipientRepository.create(req.body);
        await RecipientRepository.save(repository);

        return res.status(200).json({"status": "Recipient created"});
    }

    async index(req:Request, res:Response){
        const RecipientRepository = getRepository(Recipient);
        const recipients = await RecipientRepository.find();

        return res.status(200).json(recipients);
    }

    async update(req: Request, res: Response){
        const schema = yup.object().shape({
            name: yup.string(),
            street: yup.string(),
            complement: yup.string(),
            state: yup.string(),
            city: yup.string(),
            cep: yup.string(),
        }).noUnknown().required().strict(true);

        await schema.validate(req.body, {abortEarly: false});

        const {id} = req.params;

        const RecipientRepository = getRepository(Recipient);
        const repository = await RecipientRepository.findOne({where: {id}});

        const updatedRecipient = {
            ...repository,
            ...req.body,
        };

        await RecipientRepository.save(updatedRecipient);

        return res.status(200).json({"status": "Recipient updated"});
    }

    async delete(req:Request, res:Response){
        const {id} = req.params;

        const RecipientRepository = getRepository(Recipient);
        const recipient = await RecipientRepository.findOne({where:{id}});

        if(!recipient){
            return res.status(401).json({"Error": "Recipient not found"});
        }

        await RecipientRepository.delete(recipient.id);

        return res.status(200).json({"status": "Recipient deleted"});
    }
}

export default new RecipientsController;