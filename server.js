var express = require("express");
    mongoose = require("mongoose");
    axios = require("axios");
    cheerio = require("cheerio");
    exphbs = require("express-handlebars");
    path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set('views', path.join(__dirname + '/views'));
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname + '/views/layouts')
}));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local rferl database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/rferl" ;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/api_routes/scraping")(app, axios, cheerio, db);
require("./routes/html_routes/routes")(app, db, exphbs);
require("./routes/api_routes/mongo")(app, db);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });