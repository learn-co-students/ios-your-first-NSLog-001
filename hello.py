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
from csv import DictWriter
from csv import DictReader
from rq import Queue
from redis import Redis
import worker
import json
from worker import conn
from maxConcurrents import max_concurrents
from redis import ConnectionError

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
                enqueue_job(apikey, u, start, end, save_to)
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


# class DailyMaxWorker(object):
#     def __init__(self, redis_address):
#         pass


def enqueue_job(apikey, domain, start, end, save_to=False):
    try:
        q = Queue(connection=conn)
        result = q.enqueue_call(func=max_concurrents, args=(apikey, domain, start, end, save_to))
        print result
    except Exception as e:
        raise e
# # async/worker 
# try:
#     q = Queue(connection=conn)
#     result = q.enqueue(max_concurrents, "redis://localhost:5000")
#     print result
#     print len(q)
# except Exception:
#     sys.exc_clear()
#     pass
# except max_concurrents as e:
#     pass
#     print max_concurrents
#     res = "no max"
# except ConnectionError as e:
#     print e 
#     res = "No Response"


if __name__ == "__main__":
    app = make_app()
    port = int(os.environ.get('PORT', 5000))
    app.listen(port, '0.0.0.0')
    print "It's alive!!!"
    tornado.ioloop.IOLoop.current().start()
