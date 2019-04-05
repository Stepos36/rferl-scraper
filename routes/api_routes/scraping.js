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
              result.readingTime = 'Video'
              $('.wsw p').each(function(i, element) {
                var textBlockUnit = $(element).text()
                textBlock.push(textBlockUnit)
                textBlockString = JSON.stringify(textBlock)
                result.summary = textBlockString.substring(2, 150)+'...'
                readingTime = (((textBlockString.length/4.79)/240)*60)                
                min = Math.floor(readingTime / 60)
                sec = parseInt(readingTime - (60 * min))
                result.readingTime = min + ' min ' + sec + ' sec'
                return result.readingTime
              })
            db.Article.create(result).then(function(dbArticle) {  
            }).catch(function(err) {
              console.log(err)  
            });
              return result.readingTime, result.time
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
        });
        $(".media-container video").each(function(i, element) {
          var videoId = $(element).attr('data-sdkid')
          videoIds.push(videoId)
        });
        $(".wsw video").each(function(i, element) {
          var videoId = $(element).attr('data-sdkid')
          videoIds.push(videoId)
        });
        result[0].push({videos: videoIds})        
        }).then(function() {
          res.send(result)
        });
    })
}
