import {Request, Response} from "express";

import {getRepository} from "typeorm";
import Order from "../entity/Order";

class DeliveryWaitingController {
    async index(req:Request, res:Response){
        const {id} = req.params;

        const OrderRepository = getRepository(Order);
        const orders = await OrderRepository.find({where: {
            deliveryman_id: id,
            end_date: null,
            canceled_at: null
        },
        relations: ["recipient"]
    });

        return res.status(200).json(orders);
    }
}

export default new DeliveryWaitingController;