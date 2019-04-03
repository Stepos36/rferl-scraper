module.exports = function(app, db) {
    app.put("/save-article/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { "saved": true }, { new: true })
          .then(function (response) {
            console.log(response)
            res.send("Article saved!");
          })
          .catch(function (err) {
            console.log(err);
            res.send("Article has not been saved");
          }); 
      });
    
    app.get("/saved", function(req, res) {
      db.Article.find({saved:true})
        .then(function(response) {
          if(response.length===0)
          {
            res.send("You didn't save any articles yet!");
          }
          else{
          res.json(response);
          }
        }).catch(function(err) {
          res.json(err);
        });
    });
}
