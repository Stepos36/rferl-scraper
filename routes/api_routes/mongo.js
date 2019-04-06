module.exports = function(app, db) {
    app.put("/save-article/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { "saved": true }, { new: true })
          .then(function (response) {
            console.log(response)
            res.send("Article added to saved!");
          })
          .catch(function (err) {
            console.log(err);
            res.send("Article has not been saved");
          }); 
      });
    
    app.get("/api/saved", function(req, res) {
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

    app.put("/delete-article/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { "saved": false }, { new: true })
          .then(function (response) {
            console.log(response)
            res.send("Article deleted from saved!");
          })
          .catch(function (err) {
            console.log(err);
            res.send("Article has not been deleted");
          }); 
      });

    app.put("/add-note/:id", function(req, res) {
      db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {notes: dbNote}}).then(function(dbArticle) {
          console.log(dbNote)
          res.send('Note has been added');
        }).catch(function(err) {
          res.send('An error occurred while posting this note')
          res.json(err)
        })
      })
      
    });
      
}
