import tornado.ioloop
import tornado.web
import os.path
from datetime import datetime
from datetime import timedelta
import json
import os
import os.path
import logging
from csv import DictWriter
from csv import DictReader

REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        apikey = self.get_argument('apikey', '')
        domain = self.get_argument('domain', '')
        start = self.get_argument('start', '')
        end = self.get_argument('end', '')
        filePath = domain + "_"  + start + "_"  + end + ".csv" 
        if apikey:
            results = max_concurrents(apikey, domain, start, end, save_to=True)
            if filePath:
                print filePath + 'valid'
                self.render('index.html', data=filePath, domain=domain, start=start, end=end)
        else:
            print filePath + 'invalid'
            self.render('index.html', data=filePath)

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
            path = os.path.join(".", "static", "{0}_{1}_{2}.csv".format(domain, start, end))
            print domain
            print start, end
            with open(path, 'wb') as csvFile:
                writer = DictWriter(csvFile, fieldnames=['domain', 'date', 'max_concurrents'])
                writer.writeheader()
                for domain, date, max_concurrents in rows:
                    writer.writerow({
                        'domain': domain,
                        'date': date,
                        'max_concurrents': max_concurrents,
                    })
                
        return '\n'.join(toReturn)


if __name__ == "__main__":
    app = make_app()
    port = int(os.environ.get('PORT', 5000))
    app.listen(port, '0.0.0.0')
    print "test"
    tornado.ioloop.IOLoop.current().start()
