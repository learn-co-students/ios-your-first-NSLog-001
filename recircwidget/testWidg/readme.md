Recirculation Widget
This widget is meant as an example to build a Top Pages widget using the Chartbeat top_pages API that returns the top 5 articles ranked by avg engaged time * concurrents.

STEP 1:

Install dependencies

Install CORS flask extension pip install -U flask-cors https://flask-cors.readthedocs.org/en/latest/

Install requests pip install requests

STEP 2:

Set up a bookmarklet that runs the code

Create bookmark in your browser with any name, select "Edit" on the bookmark and insert the following as the URL javascript:void(function(){script=document.createElement('script');script.src='http://127.0.0.1:8000/inpage-recirc2.js';document.body.appendChild(script);})();

STEP 3:

in terminal run python inpage_recirc_worker.py in the project home dir which serves up the data object on a local server (port: 8000) (inpage-recirc2 requests the data from inpage_recirc_worker.py).

STEP 4:

Open any URL hosting Chartbeat code that your API key has permission to access, let the page load complete and click the bookmarklet. It should load!