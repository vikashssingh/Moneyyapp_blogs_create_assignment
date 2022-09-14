const express = require("express");
const cors = require("cors");
const connection = require("./components/dataBase/db");
const blogRoute = require("./components/routes/blogRoute");
const reviewRoute = require("./components/routes/blogReviewRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server started");
});

app.use("/blog", blogRoute);
app.use("/review", reviewRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connection;
  console.log("server started on port 8080");
});
