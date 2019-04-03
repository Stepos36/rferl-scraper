module.exports = function(app, axios, cheerio, db) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.rferl.org/").then(function(response) {  
        var $ = cheerio.load(response.data);
        $(".media-block-wrap .content a").each(function(i, element) {
            var result = {};
            result.title = $(element).children().text().replace(/\n/g,"");
            result.link = 'https://rferl.org'+$(element).attr("href");
            axios.get(result.link).then(function(res) {
              var $ = cheerio.load(res.data);
              $("time").each(function(i, element) {
                result.time = $(element).text()
                return result.time
              })
              return result.time
            }).then(function() {
              console.log(result)
            db.Article.create(result).then(function(dbArticle) {
              console.log(dbArticle);
            }).catch(function(err) {
              console.log(err);
            });
            })
            
        });

          res.send("Scrape is Complete");
        });
      });
    
    app.post('/article-full', function(req, res) {
      var link = req.body.link
      var result = [videos=[]];
      axios.get(link).then(function(response) {  
        var $ = cheerio.load(response.data);
        var videoIds = []
        $(".wsw p").each(function(i, element) {
            var text = $(element).text()
            result.push(text)
            console.log(result)
        });
        $(".media-container video").each(function(i, element) {
          var videoId = $(element).attr('data-sdkid')
          videoIds.push(videoId)
          console.log(result)
        });
        $(".wsw video").each(function(i, element) {
          var videoId = $(element).attr('data-sdkid')
          videoIds.push(videoId)
          console.log(result)
        });
        result[0].push({videos: videoIds})
        
        }).then(function() {
          res.send(result)
        });
    })
}
