import {Request, Response} from "express";

import {isAfter, isBefore, startOfDay, endOfDay} from "date-fns";

import {getRepository, Between} from "typeorm";
import Order from "../entity/Order";

import * as yup from "yup";

class StartDateController {
    async create(req:Request, res:Response){
        const schema = yup.object().shape({
            start_date: yup.string().required()
        }).noUnknown().required().strict(true);

        await schema.validate(req.body, {abortEarly: false});

        const startHour = new Date();
        startHour.setHours(8, 0, 0);

        const endHour = new Date();
        endHour.setHours(18, 0, 0);

        const hourNow = new Date();

        if(isBefore(hourNow, startHour) || isAfter(hourNow, endHour)){
            return res.status(401).json({"error": "open only 8:00 and 18:00 hours"});
        }

        const {deliverymanid, orderid} = req.params;

        const OrderRepository = getRepository(Order);
        const repositories = await OrderRepository.find({
            take: 5,
            where: {
                deliveryman_id: deliverymanid,
                start_date: Between(startOfDay(new Date()), endOfDay(new Date()))
            }
        });
        
        if(repositories.length === 5){
            return res.status(401).json({"error": "Only 5 deliveries per day"});
        }

        const order = await OrderRepository.findOne({where:{id: orderid}});

        const newOrder = {
            ...order,
            ...req.body,
        };

        await OrderRepository.save(newOrder);

        return res.status(200).json({"status": "Start Date added"});
    }
}

export default new StartDateController;