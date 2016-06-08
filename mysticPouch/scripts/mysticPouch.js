// Our Box Component Class
// It takes two arguments
// - selector: the css selector
//             of the object we
//             want to render to
// - title: the tile we want to 
//          display
var Pouch = function (articleTitle, articlePath) {
  return (
    `
    <a href=${articlePath}>${articleTitle}</a> 
    `
  );
};

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

var appContents = '';

var loopPouchItems = function (article) {
  return (
    appContents = appContents + Pouch(article.articleTitle, article.articlePath)
  );
};

pouchItems.forEach(loopPouchItems);

console.log(`APP CONTENTS: ${appContents}`);

document.querySelector('.app').innerHTML = appContents;