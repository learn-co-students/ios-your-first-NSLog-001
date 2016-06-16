	(function(){

	function emitChartbeatConfiguration() {
    // We set an interval and keep trying to find the Chartbeat configuration
    // object (_sf_async_config) in the host page. We wait for it to exist and
    // to have both `domain` and `path` properties (which allows us to assume
    // the page load has completed)
	    var retries = 0, maxRetries = 300;
	    var interval = setInterval(function() {
	      if (window['_sf_async_config'] &&
	          window['_sf_async_config']['domain'] &&
	          window['_sf_async_config']['path']) {

	        clearInterval(interval);

	        var config = _sf_async_config;

			console.log(config.domain);

			var requestUrl = "http://127.0.0.1:8000/?domain="+_sf_async_config.domain;
			createRequest(requestUrl, config);

	      } else {
	        retries += 1;
	        if (retries > maxRetries) {
	          clearInterval(interval);
	        }
	      }
	    }, 50);
  	}; emitChartbeatConfiguration();

  	
  	//Sets styling for the div we're inserting and injects the css code into the <head>
  	//Please note this can be hosted on the localhost and pointed to in the 'var style ='
  	//div element. I'm keeping it here for now as I am experimenting with the look / feel.
  	function divStyle() {
  		var css = '#close {';
	  		css = css + 'position: fixed;';
	  		css = css + 'bottom: 10px;';
	  		css = css + 'right: 0px;';
	  		css = css + 'background-color: white;';
	  		css = css + 'box-shadow: 0 0 0 2px rgba(0,0,0,.04),0 2px 2px 0 rgba(0,0,0,.25);';
	  		css = css + 'margin: 10px;';
	  		css = css + 'padding: 15px;';
			css = css + 'z-index: 9999999999;';
			css = css + '}';

			css = css + '#top {';
			css = css + 'display: -webkit-flex;';
			css = css + 'display: flex;';
			css = css + 'padding-bottom: 12px;';
			css = css + '}';

			css = css + '#recircTitle {';
			css = css + 'padding-right: 40px;';
			css = css + '}';

			css = css + '#closeMe {';
			css = css + 'margin-left: auto;';
			css = css + 'cursor: pointer;';
			css = css + '}';

			css = css + '.flexitem {';
			css = css + 'width: auto;';
			css = css + '}';

			css = css + '.rowItem {';
			css = css + 'padding-bottom: 10px;';
			css = css + '}';

			
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
  	}

	/* pushes top 5 articles ranked by concurrents * engaged time, excluding landing pages and current path, to an array.
	accepts: unsorted JSON object containing top pages, _sf_async_config config variable
	returns: JSON object containing array of top 5 sorted page objects */
	function topFive (pagesObject, config) {
		
		console.log('inside top topFive');
	    var topFiveList = [];
	    var i = 0;	

	   	while (topFiveList.length < 5 && i < pagesObject.pages.length) {
	   		var checkedPath = extractPath(pagesObject.pages[i].path);
	   		var configPath = extractPath(config.path);
	   		
			if (pagesObject.pages[i].stats.article !== 0 && checkedPath !== configPath && sectionChecker(pagesObject.pages[i].sections, config.sections)){
			 	console.log(checkedPath);
			 	console.log(config.path);
			 	topFiveList.push(pagesObject.pages[i]);
			 	console.log(pagesObject.pages[i].title);
			}
			i++;
		}

       console.log('top five list ------');
	   topFiveList.forEach(function(item) {
	   	console.dir(item);
	   });
	   console.log('top five list ------');
	   
	   return topFiveList;
  	};

  	// function to pass into sort() that tells sort() to use avg engaged time * concurrents
  	compare = function (prev, next) {
  		console.log('inside compare');

  		let prevVal = prev.stats.engaged_time.avg * prev.stats.people;
  		let nextVal = next.stats.engaged_time.avg * next.stats.people;

  		if (prevVal < nextVal) {
   			return 1;
  		} else if (prevVal > nextVal) {
    		return -1;
		} else {
	    	return 0;
	  	}
  	}

  	/* constructs div element to append to end of body after xhr request
  	accepts: empty div element, JSON object containing page objects 
  	doesn't return, but mutates divElement */
  	function createAnchors (divElement, pagesObject) {
  		divElement.id = "close";  		
  		var topContainer = document.createElement("div");
  		topContainer.id = "top";
  		var recircTitle = document.createElement("div");
  		recircTitle.innerHTML = "Most Popular Related Articles";
  		recircTitle.id = "recircTitle";
  		recircTitle.class = "flexitem";
  		var closeMe = document.createElement("div");
  		closeMe.innerHTML = "Close [x]";
  		closeMe.id = "closeMe";
  		closeMe.class = "flexitem";

  		topContainer.appendChild(recircTitle);
  		topContainer.appendChild(closeMe);
  		divElement.appendChild(topContainer);
  		for (i=0; i<pagesObject.length; i++)
  		{
  			var row = document.createElement("div");
  			row.class = "rowItem";
  			var link = document.createElement("a");
	  		link.href = extractPath(pagesObject[i].path);
	  		link.text = pagesObject[i].title;
	  		row.appendChild(link);
	  		divElement.appendChild(row);
  		}
  	}

  	/* 
	Compares _sf_async_config.sections set on the browser page to the page data objects'.
  	if sections on the page being checked is set to "" or is not defined,
  	returns true.
  	if sections is defined but equals 'home' or 'homepage', returns true
  	if any section value tagged on the page matches
  	any section value tagged in a particular page object in the cached data
  	object, returns true. 
  	if none of the above, returns false */
  	function sectionChecker (cachedDataObject, pageSections) {

  		if (pageSections === "" || pageSections === undefined || pageSections[0] === "home" || pageSections[0] === "homepage") {
  			console.log('page has no sections defined:' + pageObjectSections);
  			return true;
  		}
  		else {
  			var pageObjectSections = pageSections.split(',');

  			if(pageObjectSections[0].toLowerCase() == 'home' || pageObjectSections[0].toLowerCase() == 'homepage') {
  				console.log('homepage has home or homepage defined');
  				return true;
  			}

  			var cachedObjectSections = cachedDataObject;
	  		console.log(cachedObjectSections);
	  		console.log(pageObjectSections);
  			console.log('page data object has sections');
  			for (var i=0; i < pageObjectSections.length; i++) {
	  			for (var j=0; j < cachedObjectSections.length; j++) {
	  				if (pageObjectSections[i].toLowerCase() == cachedObjectSections[j].toLowerCase()) {
	  					return true;
	  				}
	  			}
	  		}
	  		return false;
  		}

  	}

  	
  	//this function detects and removes the domain from a given url and returns it.
  	function extractPath(url)	{
		var path = "";
		if (url.indexOf("://") > -1) {
		        domain = url.split('/')[2];
		    }
		    else {
		        domain = url.split('/')[0];
		    }
	    	//find & remove port number
	    	domain = domain.split(':')[0];
	  	url = url.split('/');
	  
	 	url.forEach(function(item){
	    		if (item !== domain) {
	        	path += "/"+item;
	    		}
	    		else {}
	    		});
	  return path;
	}

	// Where the magic happens - creates request based on API call, parses to JSON, sorts JSON, creates topFive pages,
	// creates recircWidg div element, styles it, and appends it to the body. This also creates the onclick event 
	// listener
  	function createRequest(requestUrl, config) {
  		console.log('createRequest fired')
  		var xhr = new XMLHttpRequest();
		console.log('created xhr');
		console.log(requestUrl);
		xhr.open("GET", requestUrl, true);
		xhr.setRequestHeader('Content-Type', 'text/html');
		xhr.send();

		xhr.addEventListener("load", function () {
			var response = JSON.parse(xhr.responseText);
		
			console.dir(response.pages);
			response.pages = response.pages.sort(compare);
			console.dir(response.pages);

			response.pages = topFive(response, config);
			console.log(response.pages);

			var recircWidg = document.createElement("div");
			createAnchors(recircWidg, response.pages);

			divStyle();
			
			document.body.insertBefore(recircWidg, document.body.childNodes[0]);

			document.getElementById('closeMe').onclick = function(){
	        	console.log('clicked');
	        	document.body.removeChild(document.getElementById('close'));
	        	return false;
    		};
  		});
	}
	/* fires after xhr request completes/loads, parses returned data into JSON and calls topPages to sort
	and createAnchors to build div element (recircWidg) to append to page */
}());
