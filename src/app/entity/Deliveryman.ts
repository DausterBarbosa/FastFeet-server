import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";

import Avatar from "./Avatar";

@Entity()
export default class Deliveryman {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    avatar_id: number;

    @OneToOne(() => Avatar)
    @JoinColumn({name: "avatar_id"})
    avatar: Avatar;
}
