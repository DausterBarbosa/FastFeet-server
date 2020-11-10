import express from "express";

import Routes from "./routes";

export const app = express();

app.use(Routes);