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
    
    app.get("/saved-articles", function (req, res) {
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
}
module.exports = routes