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
    '''
    hosts up javascript files in this file
    '''
    return send_from_directory('scripts',filename)


@app.route("/")
def hello():
    '''
    data cacheing layer
    check age of result, if older than specified duration, then get new one.
    in this case the duration of the cache is 60 seconds
    '''
    global stored_result
    global stored_result_time
    domain = request.args.get('domain')

    if domain in stored_result_time and (stored_result_time[domain] + 60 > time()):
        pages = stored_result[domain]
        print ('using cached object for domain: ' + domain)
        return json.dumps(pages)

    else:
        pages = request_pages_from_domain(domain)
        stored_result[domain] = pages
        stored_result_time[domain] = time()
        print ('created or updated cached object: ' + domain)
        return json.dumps(pages)

# INSERT YOUR API KEY into the request to our toppages API
def request_pages_from_domain(domain):
    r = requests.get('http://api.chartbeat.com/live/toppages/v3/?apikey=YOUR_API_KEY&host=' + domain + '&limit=200')
    pages = r.json()
    #sort_by_total_engaged_time(pages)
    return pages


def sort_by_total_engaged_time(pages):
    '''
    this function sorts the resulting data object on concurrents * engaged time.
    the call to this function is currently commented out and this happens in the 
    front end now.
    this can manipulate the object in any way you want: just change the code here.
    '''
    newpages = {}
    pageInfo = pages['pages']

    newpages = sorted(pageInfo, key=lambda page: page['stats']['people']*page['stats']['engaged_time']['avg'], reverse=True)
    stats = [(page['stats']['people']*page['stats']['engaged_time']['avg'], page['title']) for page in newpages]
    
    return newpages

if __name__ == "__main__":
    app.run(debug=True, port=8000)


  