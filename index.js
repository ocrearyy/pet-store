if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./views/data.json");

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "STephanie", "Winston"];
  res.render("cats", { cats });
});

app.get("/r/:submix", (req, res) => {
  const { submix } = req.params;
  const data = redditData[submix];
  if (data) {
    res.render("mixology", { ...data });
  } else {
    res.render("notfound", { submix });
  }
});

app.get("/subscribe", (req, res) => {
  const num = Math.floor(Math.random() * 10 + 1);
  res.render("subscription", { num });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("LISTENING ON PORT 3000");
});
