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
              var textBlock =[]
              var readingTime
              var min
              var sec
              $('.wsw p').each(function(i, element) {
                textBlockUnit = $(element).text()
                textBlock.push(textBlockUnit)
                textBlockString = JSON.stringify(textBlock)
                console.log(textBlockString.length)
                readingTime = (((textBlockString.length/4.79)/225)*60)
                console.log(readingTime)
                min = Math.floor(readingTime / 60)
                sec = parseInt(readingTime - (60 * min))
                result.readingTime = min + ' min ' + sec + ' sec'
                console.log(result.readingTime)
                return result.readingTime
              })
              console.log(result)
            db.Article.create(result).then(function(dbArticle) {
              console.log(dbArticle);
            }).catch(function(err) {
              console.log(err);
            });
              return result.readingTime, result.time
            }).then(function() {
              
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
