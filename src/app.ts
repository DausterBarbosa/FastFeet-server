import "reflect-metadata";

import express from "express";

import "./database";

import Routes from "./routes";

export const app = express();

app.use(express.json());

app.use(Routes);