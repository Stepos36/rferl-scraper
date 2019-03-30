var routes = function(app, db) {
    app.get("/", function (req, res) {
        db.Article.find({}, function(error, response) {
            if (error) {
              console.log(error);
            }
            else {
              res.render("index", {
                article: response
              });
            }
          });
        
      });
}
module.exports = routes