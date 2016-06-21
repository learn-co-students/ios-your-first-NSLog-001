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

var pouchItem = function (articleTitle, articlePath) {
  return (
    `
    <p><a href=${articlePath}>${articleTitle}</a></p>
    `
  );
}

class Pouch {
  constructor(selector, articles) {
    this.selector = selector;
    this.articles = articles;
  }

  getPouchItems () {

    var request = new Request('http://localhost:8000/data.json', {
      method: 'GET',
      dataType: 'json',
      mode: 'no-cors',
      headers: new Headers ({
        'Content-Type': 'text/plain'
      })
    });

  fetch(request)
    .then(function(response){
      debugger;
      return response;
    })
    .then(function(result) {
      this.articles = result;
      this.render();
    })
}

  render () {
    var appContents = pouchContainer();
    this.articles.forEach(function(article) {
      appContents += pouchItem(article.articleTitle, article.articlePath);
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