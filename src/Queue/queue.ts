import Bull from "bull";

import redisConfig from "../config/redis";

import OrderRegisterMail from "../app/jobs/OrderRegisterMail";
import OrderCanceledMail from "../app/jobs/OrderCanceledMail";

class Queue{
    private jobs = [OrderRegisterMail, OrderCanceledMail];
    private queues = {};

    constructor(){
        this.init();
    }

    private init(){
        this.jobs.forEach(({key, handle}) => {
            this.queues[key] = {
                queue: new Bull(key, {redis: redisConfig}),
                handle,
            };
        });
    }

    async add(key, data){
        return await this.queues[key].queue.add(data);
    }

    process(){
        this.jobs.forEach(job => {
            const {queue, handle} = this.queues[job.key];

            queue.on("failed", (job, result) => {
                console.log(job, result);
            }).process(handle);
        });
    }
}

export default new Queue;