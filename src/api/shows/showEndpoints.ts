import { compareAsc } from "date-fns";
import express from "express";
import { Show, ShowModel } from "../../models";
import asyncMiddleware from "..//utils/asyncMiddleware";
import { ShowRequestModel, ShowResponseModel } from "./showModels";
const router = express.Router();
const PER_PAGE = 250;

router.get(
  "/",
  asyncMiddleware(async (req: ShowRequestModel, res) => {
    const shows = await Show.find()
      .sort({ tvMazeId: "asc" })
      .skip(((req.query.page || 1) - 1) * PER_PAGE)
      .limit(PER_PAGE);

    const payload: ShowResponseModel[] = [];

    for (const show of shows) {
      payload.push({
        id: show.tvMazeId,
        name: show.name,
        cast: show.cast
          .map(p => ({ id: p.tvMazeId, name: p.name, birthday: p.birthday }))
          .sort((a, b) => compareAsc(a.birthday, b.birthday))
      });
    }

    res.json(payload);
  })
);

export { router as shows };
