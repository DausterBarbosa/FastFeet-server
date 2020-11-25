import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";

import Order from "./Order";

@Entity()
export default class Problem {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    description: string;

    @Column()
    order_id: number;

    @OneToOne(() => Order)
    @JoinColumn({name: "order_id"})
    order: Order
}
