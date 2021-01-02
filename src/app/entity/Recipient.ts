import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class Recipient {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    name: string;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column()
    complement: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    cep: string;
}
