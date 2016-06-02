import tornado.ioloop
import tornado.web
import os.path
from datetime import datetime
from datetime import timedelta
import requests
import json
import os
import os.path
import logging
import grequests
from csv import DictWriter
from csv import DictReader
from rq import Queue
from worker import conn
import json

REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

q = Queue(connection=conn)
# below is to support CBE reports
# cbe_endpoint = 'http://api.chartbeat.com/historical/traffic/stats/'

# class CbeHandler(tornado.web.RequestHandler):

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        # product = self.get_argument('product-type', '')
        apikey = self.get_argument('apikey', '')
        domain = self.get_argument('domain', '')
        start = self.get_argument('start', '')
        end = self.get_argument('end', '')
        urls = domain.split(",")
        print "urls: ", urls

        url_to_filenames_dictionary = {}
        for u in urls:
            print 'url', u
            filePath = u + "_"  + start + "_"  + end + ".csv" 
            if apikey:
                results = max_concurrents(apikey, u, start, end, save_to=True)
                if filePath:
                    url_to_filenames_dictionary[u] = results
                    print filePath + 'valid'

        self.render('index.html', data=str(url_to_filenames_dictionary), start=start, end=end, urls=domain.split(","), apikey=apikey)

    def post(self):
        # product = self.get_argument('product-type', '')
        apikey = self.get_argument('apikey','')
        domain = self.get_argument('domain','')
        start = self.get_argument('start','')
        end = self.get_argument('end','')
        urls = domain.split(",")
        for u in urls:
            filePath = u + "_"  + start + "_"  + end + ".csv"
            print filePath
            print r

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/font", tornado.web.StaticFileHandler,
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
        # for grequests
        # grab the domain from comma separated list and make separate async requests for each domain

        urls = domain.split(",")

        print urls

        for u in urls:
            print u
            for i in xrange(delta.days + 1):
                curr_date = d_start + timedelta(days=i)
                formatted_date = curr_date.strftime("%Y-%m-%d")
                params = {
                    'host': u,
                    'apikey': apikey,
                    'date': formatted_date,
                }
                # NEW CODE TO SUPPORT CBE CLIENTS
                # if "#product-type"==1:
                #     r = requests.get(cbe_endpoint, params=params)
                # else: 
                # END CBE CODE
                r = requests.get(REPORTS_API_ENDPOINT, params=params)
                var requestUrl = "http://127.0.0.1:5000/?host=" +u+ "&apikey="+apikey+ "&date=" + formatted_date;
                # rs = (grequests.get(u) for u in urls)
                # grequests.map(rs)

                data = r.json()

                row = [u, formatted_date, str(data['data']['overview']['data']['max_concurrents']['num'])]

                toReturn.append(','.join(row))
                rows.append(row)
                #print r.json()
        if save_to:
            path = os.path.join(".", "static", "{0}{1}{2}.csv".format(u, start, end))
            print start, end
            with open(path, 'wb') as csvFile:
                writer = DictWriter(csvFile, fieldnames=['u', 'date', 'max_concurrents'])
                writer.writeheader()
                for u, date, max_concurrents in rows:
                    writer.writerow({
                        'u': u,
                        'date': date,
                        'max_concurrents': max_concurrents,
                    })
                    
            return '\n'.join(toReturn)

if __name__ == "__main__":
    app = make_app()
    port = int(os.environ.get('PORT', 5000))
    app.listen(port, '0.0.0.0')
    print "It's alive!!!"
    tornado.ioloop.IOLoop.current().start()
