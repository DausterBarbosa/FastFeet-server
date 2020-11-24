import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Timestamp} from "typeorm";

import DeliveryMan from "./Deliveryman";
import Recipient from "./Recipient";
import Signature from "./Signature";

@Entity()
export default class Order {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    product: string;

    @Column()
    canceled_at: Date;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    deliveryman_id: number;

    @Column()
    recipient_id: number;

    @Column()
    signature_id: number;

    @OneToOne(() => DeliveryMan)
    @JoinColumn({name: "deliveryman_id"})
    deliveryman: DeliveryMan;

    @OneToOne(() => Recipient)
    @JoinColumn({name: "recipient_id"})
    recipient: Recipient;

    @OneToOne(() => Signature)
    @JoinColumn({name: "signature_id"})
    signature: Signature;
}
