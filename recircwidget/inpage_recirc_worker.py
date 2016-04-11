import json
from time import time
import requests
from flask import Flask, request, send_from_directory
from flask.ext.cors import CORS


app = Flask(__name__)
CORS(app)

stored_result = {}
stored_result_time = {}

@app.route("/scripts/<path:filename>")
def host_file(filename):
    return send_from_directory('scripts',filename)

@app.route("/")
## check age of result, if older than specified duration, then get new one)
def hello():
    print('inside hello function')
    global stored_result
    global stored_result_time
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
    sort_by_total_engaged_time(pages)
    return pages

def sort_by_total_engaged_time(pages):
    newpages = {}
    print (pages['pages'][0]['stats']['people'])
    print (pages['pages'][0]['stats']['engaged_time']['avg'])

    for x in range (0, len(pages['pages'])):
        if newpages:
            print ('newpages is true')
        else:
            newpages.update(pages['pages'][x])
   
    #print (pages['pages'][10]['path'])
    #print ('break')
    #sorted(pages, pages['pages'][0]['stats']['engaged_time']['avg'])
    #print (pages['pages'][10]['path'])
    return newpages

if __name__ == "__main__":
    app.run(debug=True)

## stuff that i need
## function that creates object

  