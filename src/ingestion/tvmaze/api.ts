import tvmazeApi from "./apiConfig";
import { TvMazeCast, TvMazeShow } from "./tvmazeModels";

export const fetchShows = (page: number) =>
  tvmazeApi
    .get<TvMazeShow[]>("shows", {
      params: {
        page
      }
    })
    .then(p => p.data);

export const fetchCast = (showId: number) =>
  tvmazeApi.get<TvMazeCast[]>(`shows/${showId}/cast`).then(p => p.data);
