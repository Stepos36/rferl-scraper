var routes = function(app, db, exphbs) {
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
    
    app.get("/saved", function (req, res) {
      db.Article.find({saved:true})
        .then(function(response) {
          if(response.length===0)
          {
            res.send("You didn't save any articles yet!");
          }
          else{
          res.render("saved", {
            article: response
          });
          }
        }).catch(function(err) {
          res.json(err);
        });
      });

    app.get("/article/:id", function (req, res) {
      db.Article.findOne({ _id: req.params.id })
    .populate("notes")
    .then(function(dbArticle) {
      res.json(dbArticle);
    }).catch(function(err) {
    res.json(err);
    });
});
}
module.exports = routes