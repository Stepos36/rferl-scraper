var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    type: String,
    required: true
  },
  readingTime: {
    type: String
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
