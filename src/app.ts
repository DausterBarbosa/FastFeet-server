import "reflect-metadata";

import express from "express";
import path from "path";

import "./database";

import Routes from "./routes";

export const app = express();

app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, "..", "uploads", "avatars")));
app.use(Routes);