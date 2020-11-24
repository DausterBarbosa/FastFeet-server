import {Request, Response} from "express";

import {getRepository} from "typeorm";

import Order from "../entity/Order";
import DeliveryMan from "../entity/Deliveryman";
import Recipient from "../entity/Recipient";

import * as yup from "yup";

import Queue from "../../Queue/queue";

class OrderController{
    async create(req:Request, res:Response){
        const schema = yup.object().shape({
            recipient_id: yup.number().required(),
            deliveryman_id: yup.number().required(),
            product: yup.string().required()
        }).noUnknown().required().strict(true);

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({"Erro": "Validation fail"});
        }

        const OrderRepository = getRepository(Order);
        const order = OrderRepository.create(req.body);
        await OrderRepository.save(order);

        const {deliveryman_id, recipient_id, product} = req.body;

        const DeliveryManRepository = getRepository(DeliveryMan);
        const {email, name} = await DeliveryManRepository.findOne({where:{id: deliveryman_id}});

        const RecipientRepository = getRepository(Recipient);
        const recipient = await RecipientRepository.findOne({where: {id: recipient_id}});

        const data = {
            deliveryman: {
                email,
                name,
            },
            recipient,
            product
        };

        await Queue.add("OrderRegisterMail", data);

        return res.status(200).json({"status": "Order created"});
    }

    async index(req:Request, res:Response){
        const OrderRepository = getRepository(Order);
        const orders = await OrderRepository.find({
            relations: ["recipient", "deliveryman"]
        });

        return res.status(200).json(orders);
    }

    async update(req:Request, res:Response){
        const schema = yup.object().shape({
            recipient_id: yup.number(),
            deliveryman_id: yup.number(),
            product: yup.string(),
        }).noUnknown().required().strict(true);

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({"Erro": "Validation fail"});
        }

        const {id} = req.params;

        const OrderRepository = getRepository(Order);
        const order = await OrderRepository.findOne({where: {id}});

        const orderUpdated = {
            ...order,
            ...req.body,
        };

        await OrderRepository.save(orderUpdated);

        return res.status(200).json({"status": "Order updated"});
    }

    async delete(req:Request, res:Response){
        const OrderRepository = getRepository(Order);
        await OrderRepository.delete(req.params.id);

        return res.status(200).json({"status": "Order deleted"});
    }
}

export default new OrderController;