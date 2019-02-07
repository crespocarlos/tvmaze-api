import { Show, ShowModel } from "../models";
import { fetchCast, fetchShows, TvMazeCast, TvMazeShow } from "./tvmaze";

const retry = (retries: number, fn: any) =>
  fn.catch((err: any) => {
    retries > 1 ? retry(retries - 1, fn) : Promise.reject(err);
  });

const pause = (duration: number) =>
  new Promise(res => setTimeout(res, duration));

const backoff = <P>(retries: number, fn: any, delay = 600): P => {
  return fn.catch((err: any) => {
    retries > 1
      ? pause(delay).then(() => backoff(retries - 1, fn, delay * 2))
      : Promise.reject(err);
  });
};

async function* getShows(): AsyncIterableIterator<TvMazeShow[]> {
  let fetchShow = true;
  let pageNumber = 1;
  while (fetchShow) {
    const shows = await backoff<TvMazeShow[]>(5, fetchShows(pageNumber));
    yield shows;
    pageNumber++;
    fetchShow = shows.length > 0;
  }
  return null;
}

const importShows = async () => {
  const showModels = [];
  /** TODO: implement a way of getting only shows I don't currently have in the DB
   * @see http://www.tvmaze.com/api#show-index
   */

  console.log("ingestion started");

  for await (const shows of getShows()) {
    for (const show of shows) {
      const cast = await backoff<TvMazeCast[]>(10, fetchCast(show.id));
      const showModel = {
        tvMazeId: show.id,
        name: show.name,
        cast: (cast || ([] as TvMazeCast[])).map(p => ({
          tvMazeId: p.person.id,
          name: p.person.name,
          birthday: p.person.birthday
        }))
      } as ShowModel;

      showModels.push(showModel);

      if (showModels.length >= 100) {
        console.log(`inserted ${showModels.length} registers`);
        await Show.insertMany(showModels);
        showModels.length = 0;
      }
    }
  }

  if (showModels.length > 0) {
    await Show.insertMany(showModels);
    console.log(`inserted ${showModels.length} registers`);
  }

  console.log("ingestion finished");
};

importShows();
