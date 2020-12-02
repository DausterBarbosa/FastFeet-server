import nodemailer from "nodemailer";

import path from "path";

import nohbs from "nodemailer-express-handlebars";
import hbs from "express-handlebars";

import config from "../config/nodemailer";

interface MessageProps {
    to: string;
    subject: string;
    template: string;
    context: {[key:string]: string};
}

class Email{
    private transporter = nodemailer.createTransport(config);

    constructor(){
        this.configureTemplate();
    }

    configureTemplate(){
        this.transporter.use("compile", nohbs({
            viewEngine: hbs.create({
                layoutsDir: path.resolve(__dirname, "view", "layouts"),
                defaultLayout: path.resolve(__dirname, "view", "layouts", "main.hbs"),
                extname: ".hbs",
            }),
            viewPath: path.resolve(__dirname, "view"),
            extName: ".hbs",
        }));
    }

    async sendEmail(message:MessageProps){
        await this.transporter.sendMail({
            ...config.default,
            ...message,
        });
    }
}

export default new Email;