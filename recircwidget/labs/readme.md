<h1>Recirculation Widget</h1>

This widget is meant as an example to build a Top Pages widget using the Chartbeat top_pages API that returns the top 5 articles ranked by avg engaged time * concurrents.

<h2>STEP 1:</h2>
<p>Install dependencies</p>

<p>Install CORS flask extension <code>pip install -U flask-cors</code> https://flask-cors.readthedocs.org/en/latest/</p>
<p>Install requests <code>pip install requests</code></p>

<h2>STEP 2:</h2>

<h3>Set up a bookmarklet that runs the code</h3> 

<p>NOTE: Currently the inpage-recirc2.js call is set up for functionality with a bookmarklet. Create bookar with any name, Edit the contents and insert the following as the URL <code>javascript:void(function(){script=document.createElement('script');script.src='http://127.0.0.1:8000/scripts/inpage-recirc2.js';document.body.appendChild(script);})();</code></p>

<h3>STEP 3:</h3>
<p>in terminal run <code>python inpage_recirc_worker.py</code> which serves up the javascript targeted by the bookmarklet from step 2 on a local server (inpage-recirc2 requests from that locally hosted file).

<h3>STEP 4:</h3>
<p>Open any URL hosting Chartbeat code, let the page load complete and click the bookmarklet. It should load!</p>
<!--
concerns/ideas:
1) links currently work on gizmodo but paths sometimes do not link when widget is run on other sites
2) thumbnails, or something aesthetically pleasing would be good
3) inherits css of particular div element (p, a, div, etc) but concerns of structural flexibility (i.e., where the div is inserted on the page affecting appearance)
 -->



