module.exports = function(app, axios, cheerio, db) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.rferl.org/").then(function(response) {  
        var $ = cheerio.load(response.data);
        $(".media-block-wrap .content a").each(function(i, element) {
            var result = {}
            result.title = $(element).children().text().replace(/\n/g,"")
            result.link = 'https://rferl.org'+$(element).attr("href");
            console.log(result)
            db.Article.create(result).then(function(dbArticle) {
              console.log(dbArticle);
            }).catch(function(err) {
              console.log(err);
            });
        });

          res.send("Scrape is Complete");
        });
      });
}