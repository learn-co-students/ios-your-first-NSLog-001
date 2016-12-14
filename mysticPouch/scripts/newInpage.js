(function(){




});

/*
	Feature Set: 
		- 

*/

/*
	Tom's Advice
		- Build a view first
		- Hardcode Data
		-----------------------------------
		|   Stories                 close |
		|       story 1 - nytimes.com     |
		|       story 2 - cnn.com         |
		|
*/

function createRow(title, path) {
   // just display logic
}

function articleContainer(articles) {
    
	articles.forEach( function(article) {
	   createRow(article.title, article.path);
    }
}

var articles = [
	{
		title: 'test',
		path: 'theoatmeal.com'
	},
	{
		title: 'test2',
		path: 'chingde.com'
	},
	{
		title: 'test3',
		path: 'thecereal.com'
	}
	{
		title: 'test4',
		path: 'thecereal.com'
	}
	{
		title: 'test5',
		path: 'thecereal.com'
	}
];

articleContainer(articles)