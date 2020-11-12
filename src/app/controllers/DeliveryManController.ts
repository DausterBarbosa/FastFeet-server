import {getRepository} from "typeorm";
import Deliveryman from "../entity/Deliveryman";

import * as yup from "yup";

import {Request, Response} from "express";

class DeliveryManController{
    async create(req:Request, res:Response){
        const shape = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            avatar_id: yup.number().required(),
        });

        if(! (await shape.isValid(req.body))){
            return res.status(401).json({"Error": "Validation fail"});
        }

        const DeliveryManRepository = getRepository(Deliveryman);
        const deliveryman = DeliveryManRepository.create(req.body);
        const vamos = await DeliveryManRepository.save(deliveryman);

        return res.status(200).json(vamos);
    }
}

export default new DeliveryManController;