import Email from "../../Email/email";

class OrderCancelledMail {
    get key(){
        return "OrderCanceledMail";
    }

    async handle(data){
        await Email.sendEmail({
            to: data.data.deliveryman.email,
            subject: "Encomenda cancelada",
            template: "order-canceled",
            context: {
                deliveryMan: data.data.deliveryman.name,
                product: data.data.product,
                recipient: data.data.recipient.name,
            }
        });
    }
}

export default new OrderCancelledMail;