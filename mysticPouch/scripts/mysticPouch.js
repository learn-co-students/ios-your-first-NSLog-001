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
    <div class="box"> 
      <h1>${articleTitle}${articlePath}</h1> 
    </div>
    `
  );
};

// Our list of titles
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

var loopFunc = function (title) {
  return (
    appContents = appContents + Pouch(title);
  );
};

pouchItems.forEach(loopFunc);

console.log(`APP CONTENTS: ${appContents}`);

document.querySelector('.app').innerHTML = appContents;

titles[0]['title']