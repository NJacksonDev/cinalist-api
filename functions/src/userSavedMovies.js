import { userSavedMovies } from "./mongoConnect.js";

export async function addOneMovie(req, res) {
  await userSavedMovies.insertOne(req.body);
  res.send("Movie was added.");
}

export async function getAllMoviesToWatch(req, res) {
  const toWatchCollection = await userSavedMovies
    .find({ status: "to watch", deleted: { $ne: "true" } })
    .toArray();
  res.send(toWatchCollection);
}

export async function getAllMoviesInProgress(req, res) {
  const inProgressCollection = await userSavedMovies
    .find({ status: "in progress", deleted: { $ne: "true" } })
    .toArray();
  res.send(inProgressCollection);
}

export async function getAllMoviesWatched(req, res) {
  const watchedCollection = await userSavedMovies
    .find({ status: "watched", deleted: { $ne: "true" } })
    .toArray();
  res.send(watchedCollection);
}

export async function updateOneMovieToInProgress(req, res) {
  const { _id } = req.body;

  await userSavedMovies
    .findOneAndUpdate({ _id: _id }, { $set: { status: "in progress" } })
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  res.send("Movie watch status updated to in progress.");
}

export async function updateOneMovieToWatched(req, res) {
  const { _id } = req.body;

  await userSavedMovies
    .findOneAndUpdate({ _id: _id }, { $set: { status: "watched" } })
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  res.send("Movie watch status updated to watched.");
}

export async function updateOneMovieToDeleted(req, res) {
  const { _id } = req.body;

  await userSavedMovies
    .findOneAndUpdate({ _id: _id }, { $set: { deleted: "true" } })
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  res.send("Movie removed from list.");
}

// export async function removeOneMovie(req, res) {
//   const { movieId } = req.params;
//   await userSavedMovies.findOneAndDelete({ _id: new ObjectId(movieId) });
//   res.status(203).send("Movie removed from list.");
// }
