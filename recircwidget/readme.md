<h1>Recirculation Widget</h1>

This widget is meant as an example to build a Top Pages widget using the Chartbeat top_pages API that returns the top 5 articles ranked by concurrents.

<h2>STEP 1:</h2>
<p>Install dependencies</p>

<p>NOTE: Install CORS flask extension https://flask-cors.readthedocs.org/en/latest/</p>

<p>NOTE: If hosting inpage-recirc2.js locally, must get a secure SSL certificate from https://static.chartbeat.com for the proxied inpage.js (inpage-recirc2.js) code to load.</p>

<h2>STEP 2:</h2>

<h3>Copy the source code from any article page</h3> 

<p>The example gizmodo.html source is from the following url:</p> <a href="http://gizmodo.com/nasas-attaching-an-expandable-space-house-to-the-iss-1767575617">gizmodo.com/nasas-attaching-an-expandable-space-house-to-the-iss-1767575617</a>. It contains an added &lt;p id='recircwidg'&gt;&lt;/p&gt; in the middle of the body text.


<p>Proxy any page tagged with Chartbeat code and insert a div element tagged with <code>&lt;div id=&quot;cbrecirc&quot;&gt;&lt;/div&gt; </code>anywhere on the page. inpage-recirc2.js replaces the div with an element containing links to 5 pages sorted by concurrents that share a section with the page.</p>
  
<h3>STEP 3:</h3>
<p>in terminal run <code>python inpage_recirc_worker.py</code> which serves up the data object on a local server; (inpage-recirc2 requests from that locally hosted file).</p>

<h3>STEP 4:</h3>
<p>You're done!</p>
<!-- 
concerns/ideas: 
1) links currently work on gizmodo but paths sometimes do not link when widget is run on other sites
2) thumbnails, or something aesthetically pleasing would be good
3) inherits css of particular div element (p, a, div, etc) but concerns of structural flexibility (i.e., where the div is inserted on the page affecting appearance) 
 -->



