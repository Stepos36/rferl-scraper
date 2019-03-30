module.exports = function(app, axios, cheerio) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.rferl.org/").then(function(response) {

        var $ = cheerio.load(response.data);
        var results = [];

        $(".media-block-wrap .content a").each(function(i, element) {
            var title = $(element).children().text();
            var link = $(element).attr("href");

            results.push({
            title: title.replace(/\n/g,""),
            link: 'https://rferl.org'+link
            });
        });
        console.log(results);
        });
    })
}