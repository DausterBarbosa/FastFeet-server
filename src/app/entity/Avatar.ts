import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class Avatar {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;
}
