import express from "express";

import cors from "cors";

import config from "config";

const app = express();

app.use(cors());

app.use(express.json());

import db from "../config/db";

import router from "./router";

app.use("/api", router);

const port = config.get<number>("port");

app.listen(3333, async () => {
  await db();
  console.log(`app rodando na porta ${port}`);
});

console.log("teste");
