const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
); //this is needed to get object from the form, https://stackoverflow.com/questions/24543847/req-body-empty-on-posts

app.use(express.static(path.join(__dirname, "/public"))); //for accesing stylesheet

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

const PORT = process.env.PORT || 3000;
const title = "Hack Your Weather";

app.get("/", (req, res) => {
  res.render("index", {
    title,
  });
});

app.post("/weather", (req, res) => {
  const API_KEY = require("./sources/keys.json").API_KEY;
  const cityName = req.body.cityName;
  if (!cityName) {
    res.status(400);
    res.render("index", {
      title,
      weatherText: `You must enter a city name.`,
    });
  } else {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`
    )
      .then(response => {
        res.status(200);
        res.render("index", {
          title,
          weatherText: `The temperature in ${response.data.name} is ${response.data.main.temp} °C!`,
        });
      })
      .catch(error => {
        res.status(404);
        res.render("index", {
          title,
          weatherText: `City not found. Please try another city.`,
        });
      });
  }
});

//in case non existing page is visited
app.get("*", (req, res) => {
  res.status(404);
  res.render("notfound", {
    title,
    errorMessage: "404. Oops the page was not found",
  });
});

app.listen(PORT);
