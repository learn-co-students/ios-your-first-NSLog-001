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
import tornadoredis

# below is to support CBE reports
# cbe_endpoint = 'http://api.chartbeat.com/historical/traffic/stats/'

# class CbeHandler(tornado.web.RequestHandler):

class MainHandler(tornado.web.RequestHandler):
    debug=True
    serve_traceback=True
    autoreload=True
    @tornado.web.asynchronous
    def get(self):
        # product = self.get_argument('product-type', '')
        apikey = self.get_argument('apikey', '')
        email = self.get_argument('email', '')
        domain = self.get_argument('domain', '')
        start = self.get_argument('start', '')
        end = self.get_argument('end', '')
        urls = domain.split(",")
        print "urls: ", urls

        url_to_filenames_dictionary = {}
        for u in urls:
            print 'url', u
            filePath = os.path.join(".", "static", "{0}{1}{2}.csv".format(domain, start, end))
            if apikey:
                #results = max_concurrents(apikey, u, start, end, save_to=True)
                enqueue_job(apikey, u, start, end, save_to=True)
                if filePath:
                    #url_to_filenames_dictionary[u] = results
                    url_to_filenames_dictionary[u] = filePath
                    print filePath + 'valid'

        self.render('index.html', data=str(url_to_filenames_dictionary), start=start, end=end, urls=domain.split(","), apikey=apikey)

    def post(self):
        apikey = self.get_argument('apikey','')
        email = self.get_argument('email', '')
        domain = self.get_argument('domain','')
        start = self.get_argument('start','')
        end = self.get_argument('end','')
        urls = domain.split(",")
        for u in urls:
            filePath = u + "_"  + start + "_"  + end + ".csv"
            print filePath
            print r
            print email

def make_app():
    debug=True
    static_hash_cache=False
    serve_traceback=True
    autoreload=True
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/static", tornado.web.StaticFileHandler,
        dict(path=settings['static_path'])),
    ], **settings)

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
}


def enqueue_job(apikey, domain, start, end, save_to=True):
    try:
        q = Queue(connection=conn)
        result = q.enqueue_call(func=max_concurrents, args=(apikey, domain, start, end, save_to))
        print result
    except Exception as e:
        raise e


if __name__ == "__main__":
    static_hash_cache=False
    app = make_app()
    port = int(os.environ.get('PORT', 5000))
    app.listen(port, '0.0.0.0')
    print "It's alive!!!"
    tornado.ioloop.IOLoop.current().start()
