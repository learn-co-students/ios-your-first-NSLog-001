import tornado.ioloop
import tornado.web
import os.path
from datetime import datetime
from datetime import timedelta
import requests
import json
import os
import os.path
from csv import DictWriter
from csv import DictReader
from flask import send_from_directory

REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        apikey = self.get_argument('apikey', '')
        domain = self.get_argument('domain','')
        start = self.get_argument('start','')
        end = self.get_argument('end','')
        filePath = domain + "_"  + start + "_"  + end + ".csv" 
        if apikey:
            results = max_concurrents(apikey, domain, start, end, save_to=True)
            # self.content_type = 'application/json'
            # self.write(json.dumps(results))
            # print results
            self.render('index.html', data=filePath, domain=domain, start=start, end=end)
        else:
           self.render('index.html')

    def post(self):
        apikey = self.get_argument('apikey','')
        domain = self.get_argument('domain','')
        start = self.get_argument('start','')
        end = self.get_argument('end','')
        filePath = domain + "_"  + start + "_"  + end + ".csv"
        print filePath

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/js", MainHandler),
        (r"/csv", MainHandler),
        (r"/css", tornado.web.StaticFileHandler,
        dict(path=settings['static_path'])),
    ], **settings)


settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
}


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
        path = os.path.join(".", "static/{0}_{1}_{2}.csv".format(domain, start, end))
        print domain
        print start, end
        with open(path, 'wb') as csvFile:
            writer = DictWriter(csvFile, fieldnames=['domain', 'date', 'max_concurrents'])
            writer.writeheader()
            for row in rows:
                print row
                writer.writerow({
                        'domain': row[0],
                        'date': row[1],
                        'max_concurrents': row[2],
                    })
            
    return '\n'.join(toReturn)

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
