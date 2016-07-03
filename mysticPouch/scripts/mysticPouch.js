// Our Box Component Class
// It takes two arguments
// - selector: the css selector
//             of the object we
//             want to render to
// - title: the tile we want to
//          display
var pouchContainer = function () {
  return (
    `
    <div id="close">
      <div id="top">
        <div id="recircTitle" class="flexitem">
          Most Popular Related Articles
        </div>
        <div id="closeMe" class="flexitem">
          Close [x]
        </div>
      </div>
      <a href="path">goo gooo ga gaaa</a>
    </div>
    `
    )
}

var pouchItem = function (article) {
  return (
    `
    <p>{article}</p>
    `
  );
}

class Pouch {
  constructor(selector, articles) {
    this.selector = selector;
    this.articles = articles;
    debugger;
  }

  getPouchItems () {

    var self = this;
    var request = new Request('http://localhost:3000/pages', {
      method: 'GET',
      dataType: 'json',
      mode: 'no-cors',
      headers: new Headers ({
        'Content-Type': 'application/json'
      })
    });

  fetch(request)
    .then(function(response){
      return response;
    })
    .then(function(result) {
      console.log(result);
      //this.articles = result;
      debugger;
      self.render();
    })
}

  render () {
    var appContents = pouchContainer();
    this.articles.forEach(function(article) {
      appContents += pouchItem(article);
    });
    document.querySelector(this.selector).innerHTML = "Most Popular Related Content";
    document.querySelector(this.selector).innerHTML += appContents;
  }
}

var pouchItems = [
  {
    articleTitle : "Article 1",
    articlePath : "path/to/Article1"
  },
  {
    articleTitle : "Article 2",
    articlePath : "path/to/Article2"
  },
  {
    articleTitle : "Article 3",
    articlePath: "path/to/article3"
  },
  {
    articleTitle : "Article 5",
    articlePath : "path/to/Article5"
  }
];

var pouchComponent = new Pouch('.app', pouchItems);
pouchComponent.getPouchItems();
debugger;


/*var loopPouchItems = function (article) {
  return (
    appContents = appContents + pouchItem(article.articleTitle, article.articlePath)
  );
};

pouchItems.forEach(loopPouchItems);
*/

//console.log(`APP CONTENTS: ${appContents}`);

//document.querySelector('.app').innerHTML = appContents;