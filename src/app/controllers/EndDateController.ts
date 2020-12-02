import {Request, Response} from "express";

import {getRepository} from "typeorm";
import Order from "../entity/Order";

import * as yup from "yup";

class EndDateController {
    async create(req:Request, res:Response){
        const schema = yup.object().shape({
            end_date: yup.string().required(),
            signature_id: yup.number().required()
        }).noUnknown().required().strict(true);

        await schema.validate(req.body, {abortEarly: false});

        const {deliverymanid, orderid} = req.params;

        const OrderRepository = getRepository(Order);
        const order = await OrderRepository.findOne({
            where: {
                id: orderid,
                deliveryman_id: deliverymanid,
            }
        });

        const newOrder = {
            ...order,
            ...req.body
        };

        await OrderRepository.save(newOrder);

        return res.status(200).json({"status": "End Date Added"})
    }
}

export default new EndDateController;