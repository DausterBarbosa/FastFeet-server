import {Request, Response} from "express";

import {getRepository} from "typeorm";
import Problem from "../entity/Problem";

class ProblemIndexController {
    async index(req:Request, res:Response){
        const ProblemRepository = getRepository(Problem);
        const problems = await ProblemRepository.find({
            relations: ["order"]
        });

        return res.status(200).json(problems);
    }
}

export default new ProblemIndexController;