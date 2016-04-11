(function(){

	var config = _sf_async_config;

	console.log(config.sections);
	console.log(config.domain);

	url = "http://127.0.0.1:5000/?domain="+config.domain;
	console.log(url);

	/* pushes top 5 articles ranked by concurrents excluding home page and current path to an array.
	accepts: unsorted JSON object containing top pages
	returns: JSON object containing array of top 5 sorted page objects */
	function topFive (pagesObject) {
		console.log('inside top topFive');
	    var temp = [];
	    var i = 0;
	    console.log(pagesObject.pages.length);	
	    console.log(temp.length);
	    while (temp.length < 5 && i < pagesObject.pages.length) {
		  if (pagesObject.pages[i].path !== "/" && pagesObject.pages[i].path !== config.path && sectionChecker(pagesObject.pages[i].sections, config.sections)){
		    temp.push(pagesObject.pages[i]);
		  }
		  i++;
	    }
	    return temp;
  	};

  	/* constructs div element to append to end of body after xhr request
  	accepts: empty div element, JSON object containing page objects */
  	function createAnchors (divElement, pagesObject) {  		
  		var title = document.createElement("p");
  		title.innerHTML = "Most Popular Related Articles";
  		divElement.appendChild(title);
  		for (i=0; i<pagesObject.length; i++)
  		{
  			var row = document.createElement("div");
  			var link = document.createElement("a");
	  		link.href = pagesObject[i].path;
	  		link.text = pagesObject[i].title;
	  		row.appendChild(link);
	  		divElement.appendChild(row);
  		}
  	}

  	/* checks to see if any section value tagged on the page matches
  	any section value tagged in a particular page object in the cached data
  	object. if so, returns true. if not, returns false */
  	function sectionChecker (cachedDataObject, pageSections) {
  		var cachedObjectSections = cachedDataObject;
  		var pageObjectSections = pageSections.split(',');
  		console.log(cachedObjectSections);
  		console.log(pageObjectSections);

  		for (var i=0; i < pageObjectSections.length; i++) {
  			for (var j=0; j < cachedObjectSections.length; j++) {
  				if (pageObjectSections[i] == cachedObjectSections[j]) {
  					return true;
  				}
  			}
  		}
  		return false;

  	}

  	// creates XHR request
	var xhr = new XMLHttpRequest();
	console.log('created xhr');
	xhr.open("GET", url, true);
	xhr.setRequestHeader('Content-Type', 'text/html');
	xhr.send();

	/* fires after xhr request completes/loads, parses returned data into JSON and calls topPages to sort
	and createAnchors to build div element (recircWidg) to append to page */
	xhr.addEventListener("load", function () {
		var topPages = JSON.parse(xhr.responseText);
		console.log(topPages);
		topPages = topFive(topPages);
		console.log(topPages);

		var recircWidg = document.createElement("div");

		createAnchors(recircWidg, topPages);

		//document.body.insertBefore(recircWidg, document.body.childNodes[0]);
		document.getElementById('cbrecirc').appendChild(recircWidg);
	});
}());