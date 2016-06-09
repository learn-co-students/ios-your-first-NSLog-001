// Our Box Component Class
// It takes two arguments
// - selector: the css selector
//             of the object we
//             want to render to
// - title: the tile we want to 
//          display
var pouchItem = function (articleTitle, articlePath) {
  return (
    `
    <a href=${articlePath}>${articleTitle}</a> 
    `
  );
}

class Pouch {
  constructor(selector, articles) {
    this.selector = selector;
    this.articles = articles;
  }

  getPouchItems () {
    var self = this;
    /*fetch('./data/items.json')
      .then(function(response){
        return response.json();
      })
      .then(function(result) {
        self.articles = result;*/
        self.render();
      //})
  }
  
  render () {
    var appContents = '';
    this.articles.forEach(function(article) {
      appContents += pouchItem(article.articleTitle, article.articlePath);
    });
    document.querySelector(this.selector).innerHTML = appContents;
  }
}

var pouchItems = [{
  articleTitle : "Article 1",
  articlePath : "path/to/Article1"
  },
  {
  articleTitle : "Article 2",
  articlePath : "path/to/Article2"
  },
  {
  articleTitle : "Article 3",
  articlePath : "path/to/Article3"
  },
  {
  articleTitle : "Article 4",
  articlePath : "path/to/Article4"
  },
  {
  articleTitle : "Article 5",
  articlePath : "path/to/Article5"
  },
];

var pouchComponent = new Pouch('.app', pouchItems);
pouchComponent.getPouchItems();



/*var loopPouchItems = function (article) {
  return (
    appContents = appContents + pouchItem(article.articleTitle, article.articlePath)
  );
};

pouchItems.forEach(loopPouchItems);
*/

//console.log(`APP CONTENTS: ${appContents}`);

//document.querySelector('.app').innerHTML = appContents;