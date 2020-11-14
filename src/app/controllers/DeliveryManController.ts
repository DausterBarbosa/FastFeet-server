import {getRepository} from "typeorm";
import Deliveryman from "../entity/Deliveryman";
import Avatar from "../entity/Avatar";

import fs from "fs";

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

        const duplicateEmail = DeliveryManRepository.findOne({where: {email: req.body.email}});

        if(duplicateEmail){
            return res.status(401).json({"Error": "Email already exists"});
        }

        const deliveryman = DeliveryManRepository.create(req.body);
        await DeliveryManRepository.save(deliveryman);

        return res.status(200).json({"status": "Deliveryman created"});
    }

    async index(req:Request, res:Response){
        const DeliveryManRepository = getRepository(Deliveryman);
        const deliverymans = await DeliveryManRepository.find({
            relations: ["avatar"]
        });

        return res.status(200).json(deliverymans);
    }

    async update(req:Request, res:Response){
        const shape = yup.object().shape({
            name: yup.string(),
            email: yup.string().email(),
            avatar_id: yup.number(),
        });

        if(! (await shape.isValid(req.body))){
            return res.status(401).json({"Error": "Validation fail"})
        }

        const {id} = req.params;

        const DeliveryManRepository = getRepository(Deliveryman);

        const {avatar_id, email} = req.body;

        if(email){
            const duplicateEmail = await DeliveryManRepository.findOne({where: {email}});

            if(duplicateEmail){
                return res.status(401).json({"Error": "Email already exists"});
            }
        }

        const deliveryman = await DeliveryManRepository.findOne({where: {id}});

        const newDeliveryman = {
            ...deliveryman,
            ...req.body,
        };

        await DeliveryManRepository.save(newDeliveryman);

        if(avatar_id){
            const AvatarRepository = getRepository(Avatar);
            const {path, id} = await AvatarRepository.findOne({where: {id: deliveryman.avatar_id}});
            
            if(avatar_id !== id){
                await AvatarRepository.delete(deliveryman.avatar_id);

                fs.unlink(path, (err) =>{
                    if(err){
                        console.log(err);
                    }
                });
            }
        }

        return res.status(200).json(newDeliveryman);
    }

    async delete(req:Request, res:Response){
        const {id} = req.params;

        const DeliveryManRepository = getRepository(Deliveryman);
        const deliveryman= await DeliveryManRepository.findOne({where:{id}});

        if(!deliveryman){
            return res.status(401).json({"Error": "Deliveryman not found"});
        }

        await DeliveryManRepository.delete(deliveryman.id);

        const AvatarRepository = getRepository(Avatar);
        const {path} = await AvatarRepository.findOne({where: {id: deliveryman.avatar_id}});
        await AvatarRepository.delete(deliveryman.avatar_id);

        fs.unlink(path, (err) =>{
            if(err){
                console.log(err);
            }
        });

        return res.status(200).json({"status": "Deliveryman deleted"});
    }
}

export default new DeliveryManController;