# <a href="https://rferl.herokuapp.com/">rferl-scraper</a>

## About 
_A web application that lets users view and leave comments on the latest news from <a href="https://www.rferl.org/">RadioLiberty</a> news website_

## Description
Once you load the main page, you'll see the page with a __table__ on it:

* **Column 1:** 

  This column contains a **plus button**. Once you click this button, the program will go to <a href="https://www.rferl.org/">RadioLiberty</a>
website, collect all text for this particular article and populate it into multiple _child rows(each paragraph of text has its' own row)_.
If you click the plus button once again, child rows will collapse back and bring you to initial page view.

* **Column 2:** 

  Second column holds __article title__, __short article text summary__ and a __view notes button__.
All that information comes from MongoDB and is populated from it every time you visit '/' route. 

* **Column 3:** 

  This column holds the estimate time you'll spend reading this article. It's __calculated__ based on the average amount of symbols per word(~4.79), average adult reading speed(~240wpm) and amount of symbols in this article.

* **Column 4:**

  Fourth column contains the publication date of this article

* **Column 4:**

  And finally, the 5th column holds the __Save/Delete button__. This button allows users save articles they like and view them on "Saved articles" page.

* **Scraping new articles**

⋅⋅⋅Navigation bar has a __"Scrape new articles"__ button. If you press this button a modal pop-up will appear with a message about either
successful or unsuccessful scraping. After you press the __"Finish scraping and reload the page"__ button, the page will re-render with
all newly scraped articles on it.

### Workflow

![readme](public/assets/images/readme.gif)

_This web application was created using following technologies:_
* **HTML**
* **CSS**
* **Bootstrap**
* **Handlebars**
* **JavaScript**
* **JQuery**
* **Datatables jQuery plugin(https://datatables.net/)**
* **API POST/GET methods**
* **MongoDB**
* **Node.js**
* **Following NPM packages:**
    * "axios"
    * "cheerio"
    * "express"
    * "express-handlebars"
    * "mongoose"
    * "path"
* _Deployed to Heroku using mLab_

![footer](public/assets/images/footer.png)