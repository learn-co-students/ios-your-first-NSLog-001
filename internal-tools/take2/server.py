from flask import Flask
from flask import request
from flask import render_template
from flask import url_for
from flask import jsonify

from datetime import datetime, timedelta
import requests
import json
import os
import os.path
from csv import DictWriter, DictReader
from flask import send_from_directory

#ad44599fae1d00ed39420c19b78b6001

app = Flask(__name__, static_url_path='')

REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/csv/<path:path>')
def send_csv(path):
    return send_from_directory('csv', path)

def max_concurrents(apikey, domain, start, end, save_to=False):

    d_start = datetime.strptime(start, "%Y-%m-%d")
    d_end = datetime.strptime(end, "%Y-%m-%d")

    delta = d_end - d_start

    toReturn = []
    rows = []
    for i in xrange(delta.days + 1):
        curr_date = d_start + timedelta(days=i)
        formatted_date = curr_date.strftime("%Y-%m-%d")
        params = {
            'host': domain,
            'apikey': apikey,
            'date': formatted_date,
        }
        r = requests.get(REPORTS_API_ENDPOINT, params=params)
       
        data = r.json()

        row = [domain, formatted_date, str(data['data']['overview']['data']['max_concurrents']['num'])]

        # data = r.json()
        toReturn.append(','.join(row))
        rows.append(row)
        #print r.json()
    if save_to:
        path = os.path.join(".", "csv/{0}_{1}_{2}.csv".format(domain, start, end))
        #print path
        with open(path, 'wb') as csvFile:
            writer = DictWriter(csvFile, fieldnames=['domain', 'date', 'max_concurrents'])
            writer.writeheader()
            for row in rows:
                writer.writerow({
                        'domain': row[0],
                        'date': row[1],
                        'max_concurrents': row[2],
                    })
            


    return '\n'.join(toReturn)

@app.route('/')
def home():
    apikey = request.args.get('apikey')
    domain = request.args.get('domain')
    start = request.args.get('start')
    end = request.args.get('end')
    print domain, start, end
    data = ''
    if apikey and domain and start and end:
        data = max_concurrents(apikey, domain, start, end, save_to=True)
    #data = max_concurrents(domain, start, end)
    print type(data)
    return render_template('index.html', data=data, domain=domain, start=start, end=end)

if __name__ == '__main__':
    app.run(debug=True)

