var routes = function(app, db) {
    app.get("/", function (req, res) {
      db.Article.find().sort({_id:-1}).
      exec(function (error, response) {
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