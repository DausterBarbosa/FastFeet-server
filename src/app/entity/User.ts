import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

import {compareSync} from "bcryptjs";

@Entity()
export default class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password_hash: string;

    async passwordValidate(password:string){
        return await compareSync(password, this.password_hash);
    }
}
