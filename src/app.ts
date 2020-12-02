import "dotenv/config";

import "reflect-metadata";

import express from "express";
import "express-async-errors";

import path from "path";

import "./database";

import Routes from "./routes";

import ErrorHandler from "./Errors/handler";

class App{
    public server = express();

    constructor(){
        this.middlewares();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use("/static", express.static(path.resolve(__dirname, "..", "uploads", "tmp")));
        this.server.use(Routes);
        this.server.use(ErrorHandler);
    }
}

const app =  new App;

export default app.server;