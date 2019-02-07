import "dotenv/config";
import "source-map-support/register";

import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { shows } from "./api/shows";
import { corsMiddleware } from "./api/utils/corsMiddleware";

const app = express();

app.set("trust proxy", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use(corsMiddleware);
app.use("/shows", shows);

/* eslint-disable no-unused-vars */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ error: "Something went wrong" });
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const server = app.listen(+port, host, () => {
  const addr = server.address();
  // @ts-ignore
  console.log(`listening on ${addr.address}:${addr.port}`);
});
