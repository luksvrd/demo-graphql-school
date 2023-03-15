import dotenv from "dotenv";

dotenv.config();
// config.js is used to store env variables and other config options
// this is the only part of the code that directly references the env variables. all other parts of the code use the config object
export default {
  mongooseSchemaOptions: {
    new: true,
    runValidators: true,
    strict: "throw",
    versionKey: false,
  },
  // Appollo server config - default port is 4000

  port: process.env.PORT || 4000,
};
