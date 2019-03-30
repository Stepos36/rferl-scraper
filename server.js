var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local rferl database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/rferl" ;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/api_routes/scraping")(app, axios, cheerio);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });