import json
from time import time
import requests
from flask import Flask, request, send_from_directory
from flask_cors import CORS


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
    #r = requests.get('http://api.chartbeat.com/live/toppages/v3/?apikey=0993d53651dbf432cf9e235114c86d35&host='+domain+'&limit=200')
    pages = r.json()
    sort_by_total_engaged_time(pages)
    return pages

def sort_by_total_engaged_time(pages):
    newpages = {}
    pageInfo = pages['pages']

    newpages = sorted(pageInfo, key=lambda page: page['stats']['people']*page['stats']['engaged_time']['avg'], reverse=True)
    print(newpages[:5])
    stats = [(page['stats']['people']*page['stats']['engaged_time']['avg'], page['title']) for page in newpages]
    print(stats)
    
    return newpages

if __name__ == "__main__":
    app.run(debug=True, port=8000)

## stuff that i need
## function that creates object

  