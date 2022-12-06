import { allMovies } from "./mongoConnect.js";

export async function getOneMovie(req, res) {
  // const { search } = req.query;
  // if (search) {
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

// export async function getOneMovie(req, res) {
//   const { movieId } = req.params;
//   const singleMovie = await allMovies
//     .find({ _id: new ObjectId(movieId) })
//     .toArray();
//   res.send(singleMovie);
// }
