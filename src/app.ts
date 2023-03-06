import { ConnectDatabase } from "./server";
import { route } from "./route/index.route";

import cors = require("cors");
import express = require("express");
import { Application } from "express";

const app: Application = express();
const PORT = 8080;
// const connection = new ConnectDatabase().connection();
// connection;

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.use(express.json());

app.listen(PORT);

app.use('/api', route);