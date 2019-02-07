import { NextFunction, Request, Response } from "express";

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
  } else {
    next();
  }
}
