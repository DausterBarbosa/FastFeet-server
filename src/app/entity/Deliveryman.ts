import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
