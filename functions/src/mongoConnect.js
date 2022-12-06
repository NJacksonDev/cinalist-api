import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("movies");
export const allMovies = database.collection("allMovies");
export const userSavedMovies = database.collection("userSavedMovies");

client.connect();
