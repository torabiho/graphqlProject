import pkg from "mongoose";
import logger from "./logger.js";

const { connect, connection } = pkg;
const mongoDB = "mongodb://user:pass@127.0.0.1:27017/main-db";
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = connection;

db.once("open", function () {
  logger.info("Connected to a DB");
});

db.on("error", () => {
  logger.error("MongoDB connection error");
});
