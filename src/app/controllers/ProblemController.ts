import {Request, Response} from "express";

import {getRepository} from "typeorm";
import Problem from "../entity/Problem";

import * as yup from "yup";

class ProblemController {
    async create(req: Request, res:Response){
        const schema = yup.object().shape({
            description: yup.string().required(),
        }).noUnknown().required().strict(true);

        if(! (await schema.isValid(req.body))){
            return res.status(401).json({"error": "Validation fail"});
        }

        const {id} = req.params;
        const {description} = req.body;

        const ProblemRepository = getRepository(Problem);
        const problem = ProblemRepository.create({
            order_id: Number(id),
            description,
        });
        await ProblemRepository.save(problem);

        return res.status(200).json({"status": "Problem created"});
    }
}

export default new ProblemController;