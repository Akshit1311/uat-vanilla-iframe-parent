const express = require("express");
const path = require("path");
const config = require("./config.js");
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "public")));
const publicPath = path.join(__dirname, "public");

const indexRouter = express.Router();
indexRouter.get("/", function (req, res) {
  res.sendFile("index.html", { root: publicPath });
});

indexRouter.get("/health", function (req, res) {
  res.send({ status: 200, desc: "health check" });
});

indexRouter.get("*", function (req, res) {
  res.sendFile("index.html", { root: publicPath });
});

app.use(config.baseUrl, indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
