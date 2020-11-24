import {Request, Response} from "express";

import {getRepository, Not, IsNull} from "typeorm";
import Order from "../entity/Order";

class DeliveryDoneController {
    async index(req:Request, res:Response){
        const {id} = req.params;

        const OrderRepository = getRepository(Order);
        const orders = await OrderRepository.find({where: {
            deliveryman_id: id,
            end_date: Not(IsNull()),
        },
        relations: ["recipient", "signature"]
    });

        return res.status(200).json(orders);
    }
}

export default new DeliveryDoneController;