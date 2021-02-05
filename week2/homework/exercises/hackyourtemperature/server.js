//modules we had to get from NPM
const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");

//modules I might need next week
//fs = file system!!!
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); //for paring json in request body

app.use(express.static(path.join(__dirname, "/public"))); //for accesing stylesheet

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hack Your Weather",
  });
});

app.post("/weather", (req, res) => {
  if (!req.body.cityName) {
    res.status(400);
    res.end("Bad request");
  } else {
    const city = req.body.cityName;
    res.status(200);
    res.end(city);
  }
});

app.listen(PORT);
