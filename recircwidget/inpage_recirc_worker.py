import json
from time import time
import requests
from flask import Flask
from flask import request
from flask.ext.cors import CORS


app = Flask(__name__)
CORS(app)

stored_result = {}
stored_result_time = {}

@app.route("/")
## check age of result, if old (determined by whatever metric), then get new one)
def hello():
    global stored_result
    global stored_result_time
    ##if (stored_result_time != None && stored_result_time)
    #sections = request.args.get('sections')
    domain = request.args.get('domain')

    if domain in stored_result_time and (stored_result_time[domain] + 20 > time()):
        pages = stored_result[domain]
        print ('using cached object')
        return json.dumps(pages)

    else:
        pages = request_pages_from_domain(domain)
        stored_result[domain] = pages
        stored_result_time[domain] = time()
        print ('created or updated cached object')
        return json.dumps(pages)

def request_pages_from_domain(domain):
    r = requests.get('http://api.chartbeat.com/live/toppages/v3/?apikey=0993d53651dbf432cf9e235114c86d35&host='+domain+'&limit=200')
    pages = r.json()
    return pages


#r = requests.get('http://api.chartbeat.com/live/toppages/v3/?apikey=0993d53651dbf432cf9e235114c86d35&host='+domain+'&limit=200&sections='+sections)
#r = requests.get('http://api.chartbeat.com/live/toppages/v3/?apikey=0993d53651dbf432cf9e235114c86d35&host='+domain+'&limit=200')
#print sections
#pages = r.json()
#print pages
#r = requests.get('http://api.chartbeat.com/live/toppages/v3/?apikey=0993d53651dbf432cf9e235114c86d35&host=gizmodo.com&limit=200')
#print sections
#pages = r.json()['pages']
#result = [
#(p['stats']['people']*p['stats']['engaged_time']['avg'], p['path'], p['title'], p['sections']) for p in pages
#]
#result = sorted(result, reverse=True)

#result2 = pages[0]

#stored_result = result

#return json.dumps(stored_result)
#return json.dumps(r)
#pages.headers['']
## put requests data object output here and return a json object
#r = { 'x': 5 }
#r['x'] += 1
#return json.dumps(pages)

if __name__ == "__main__":
    app.run(debug=True)

## stuff that i need
## function that creates object

  