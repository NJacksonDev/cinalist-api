import { allMovies } from "./mongoConnect.js";

export async function getOneMovie(req, res) {
  const singleMovie = await allMovies
    .aggregate([
      {
        $search: {
          index: "allMovies",
          autocomplete: {
            query: `${req.query.term}`,
            path: "title",
          },
        },
      },
      {
        $project: {
          title: 1,
          year: 1,
          poster: 1,
        },
      },
    ])
    .toArray();
  res.send(singleMovie);
}
