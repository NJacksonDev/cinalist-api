import express from "express";
import cors from "cors";
import functions from "firebase-functions";
import "dotenv/config";
import { getOneMovie } from "./src/allMovies.js";
import {
  addOneMovie,
  getAllMoviesToWatch,
  getAllMoviesInProgress,
  getAllMoviesWatched,
  updateOneMovieToInProgress,
  updateOneMovieToWatched,
  updateOneMovieToDeleted,
} from "./src/userSavedMovies.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hooray, it works!");
});

app.get("/movies", getOneMovie);

app.post("/usersavedmovies", addOneMovie);

app.get("/usersavedmovies/towatch", getAllMoviesToWatch);
app.get("/usersavedmovies/inprogress", getAllMoviesInProgress);
app.get("/usersavedmovies/watched", getAllMoviesWatched);

app.patch(
  "/usersavedmovies/towatch/movetoinprogress",
  updateOneMovieToInProgress
);
app.patch("/usersavedmovies/towatch/movetowatched", updateOneMovieToWatched);
app.patch("/usersavedmovies/inprogress", updateOneMovieToWatched);
app.patch("/usersavedmovies", updateOneMovieToDeleted);

export const api = functions.https.onRequest(app);
