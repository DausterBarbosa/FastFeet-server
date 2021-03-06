import {Entity, PrimaryGeneratedColumn, Column, AfterLoad} from "typeorm";

@Entity()
export default class Avatar {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    url: string;

    @AfterLoad()
    createUrl(){
        this.url = `${process.env.APP_URL}/static/${this.name}`;
    }
}
