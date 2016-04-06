# Recirculation Widget

Replaces a div anywhere on the page with top 5 articles ranked by concurrents that share at least one section tag with a section tagged on the page.

b1.0: Proxy any page tagged with Chartbeat code (currently I've been using Gizmodo) and insert a div element tagged with <xyz id="cbrecirc"></xyz> anywhere on the page. inpage-recirc2.js replaces the div with an element containing links to 5 pages sorted by concurrents that share a section with the page. 

inpage_recirc_worker.py needs to be run in terminal because it serves up the data object on a local server; inpage-recirc2 requests from that locally hosted file.

concerns/ideas: 
1) links currently work on gizmodo but paths sometimes do not link when widget is run on other sites
2) thumbnails, or something aesthetically pleasing would be good
3) inherits css of particular div element (p, a, div, etc) but concerns of structural flexibility (i.e., where the div is inserted on the page affecting appearance)


