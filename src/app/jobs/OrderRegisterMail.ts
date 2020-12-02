import Email from "../../Email/email";

class OrderRegisterMail{
    get key(){
        return "OrderRegisterMail";
    }

    async handle(data){
        return await Email.sendEmail({
            to: data.data.deliveryman.email,
            subject: "Encomenda",
            template: "order-create",
            context: {
                deliveryMan: data.data.deliveryman.name,
                product: data.data.product,
                recipient: data.data.recipient.name,
                state: data.data.recipient.state,
                city: data.data.recipient.city,
                cep: data.data.recipient.cep,
                street: data.data.recipient.street,
                complement: data.data.recipient.complement,
            }
        });
    }
}

export default new OrderRegisterMail;