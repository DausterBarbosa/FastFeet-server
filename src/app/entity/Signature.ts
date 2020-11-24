import {Entity, PrimaryGeneratedColumn, Column, AfterLoad} from "typeorm";

@Entity()
export default class Signature {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    url: string;

    @AfterLoad()
    createUrl(){
        this.url = `http://localhost:3333/static/${this.name}`;
    }
}
