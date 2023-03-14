// This is where we connect Node to MongoDB using Mongoose
import mongoose from "mongoose";
import config from "./config.js";

const init = async () => {
  mongoose
    // This is the connection string. its a URL that tells mongooose whre to find the database. stored in the .env file
    // config.mongoURL is the URL to the database. stored in the config.js file which is imported from .env
    .connect(`${config.mongoURL}/school`)
    .then(() => {
      console.info("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err.message);
    });
};

export const conn = mongoose.connection;

export default init;
