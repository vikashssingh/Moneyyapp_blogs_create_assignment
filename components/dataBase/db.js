const mongoose = require("mongoose");
require("dotenv").config();

const atlas_dataBaseUrl = process.env.DATABASE_URL;
const local_dataBaseUrl = process.env.LOCAL_DATABASE_URL;

const connection = mongoose
  .connect(atlas_dataBaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
