<h1>### Recirculation Widget ###</h1>

Replaces a div anywhere on the page with top 5 articles ranked by concurrents that share at least one section tag with a section tagged on the page.

<h2>NOTE: Install CORS flask extension https://flask-cors.readthedocs.org/en/latest/</h2>

<h2>NOTE: If hosting inpage-recirc2.js locally, must get a secure SSL certificate from https://static.chartbeat.com for the proxied inpage.js (inpage-recirc2.js) code to load.</h2>

<h2>Copy the source code from any article page</h2> 
<p>The example gizmodo.html source is from the following url:</p> <a href="http://gizmodo.com/nasas-attaching-an-expandable-space-house-to-the-iss-1767575617">gizmodo.com/nasas-attaching-an-expandable-space-house-to-the-iss-1767575617</a>. It contains an added &lt;p id='recircwidg'&gt;&lt;/p&gt; in the middle of the body text.


<h2>STEP 2:</h2> Proxy any page tagged with Chartbeat code and insert a div element tagged with <code>&lt;div id=&quot;cbrecirc&quot;&gt;&lt;/div&gt; </code>anywhere on the page. inpage-recirc2.js replaces the div with an element containing links to 5 pages sorted by concurrents that share a section with the page. 

in terminal <code>python inpage_recirc_worker.py</code> needs to be run  because it serves up the data object on a local server; (inpage-recirc2 requests from that locally hosted file).

concerns/ideas: 
1) links currently work on gizmodo but paths sometimes do not link when widget is run on other sites
2) thumbnails, or something aesthetically pleasing would be good
3) inherits css of particular div element (p, a, div, etc) but concerns of structural flexibility (i.e., where the div is inserted on the page affecting appearance) 




