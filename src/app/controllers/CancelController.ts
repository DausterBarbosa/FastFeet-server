import {Request, Response} from "express";

import {getRepository} from "typeorm";
import Problem from "../entity/Problem";
import Order from "../entity/Order";

import Queue from "../../Queue/queue";

class CancelController {
    async create(req:Request, res:Response){
        const {id} = req.params;

        const ProblemRepository = getRepository(Problem);
        const {order_id} = await ProblemRepository.findOne({
            where: {id}
        });

        const OrderRepository = getRepository(Order);
        const order = await OrderRepository.findOne({
            where:{id: order_id},
            relations: ["deliveryman", "recipient"]
        });

        order.canceled_at = new Date();

        await OrderRepository.save(order);

        const {deliveryman, recipient, product} = order;

        console.log(deliveryman, recipient, product)

        const data = {
            deliveryman: {
                email: deliveryman.email,
                name: deliveryman.name,
            },
            recipient: {
                name: recipient.name,
            },
            product
        }

        await Queue.add("OrderCanceledMail", data);

        return res.status(200).json({"status": "Delivery canceled"});
    }
}

export default new CancelController;