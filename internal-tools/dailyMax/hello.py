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
from maxConcurrents import writeCSV
from maxConcurrents import concurrents_to_s3
from redis import ConnectionError
import boto3
import botocore

class MainHandler(tornado.web.RequestHandler):
    def get(self):
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

            
            bucket='powerful-bayou'
            suffix = '{}_{}_{}'.format(domain, start, end)
            path = os.path.join(bucket, suffix)
            if apikey:
                #results = max_concurrents(apikey, u, start, end, save_to=True)

                # THIS QUEUE PUTS THE CSV ONTO S3
                save_to = True
                enqueue_job_concurrents(apikey, domain, start, end, bucket, suffix, save_to)
                if path:
                    #url_to_filenames_dictionary[u] = results
                    url_to_filenames_dictionary[u] = path
                    print path + 'valid'

        self.render('index.html', data=str(url_to_filenames_dictionary), start=start, end=end, urls=domain.split(","), apikey=apikey)

    def post(self):
        apikey = self.get_argument('apikey','')
        email = self.get_argument('email', '')
        domain = self.get_argument('domain','')
        start = self.get_argument('start','')
        end = self.get_argument('end','')
        urls = domain.split(",")
        for u in urls:
            path = bucket + u + "_"  + start + "_"  + end + ".csv"
            print bucket
            print r
            print email

# MAKE THE APP
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

# SET THE SETTINGS
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
}

# # QUEUE THE JOB FOR THE WORKER
# def enqueue_job(apikey, domain, start, end, save_to=True):
#     try:
#         q = Queue(connection=conn)
#         result = q.enqueue_call(func=max_concurrents, args=(apikey, domain, start, end, save_to))
#         print result
#     except Exception as e:
#         raise e

# # QUEUE THE JOB TO WRITE THE CSV
# def enqueue_job_writeCSV(s3, bucket, key, rows, fieldnames):
#     # try:
#     q = Queue(connection=conn)
#     result = q.enqueue_call(func=writeCSV, args=(s3, bucket, key, rows, fieldnames))
#     print result
#     # except Exception as e:
#     #     raise e
# QUEUE THE JOB TO WRITE THE CSV FILES TO S3
def enqueue_job_concurrents(apikey, domain, start, end, bucket, suffix, save_to=True):
        q = Queue(connection=conn)
        result = q.enqueue_call(func=concurrents_to_s3, args=(apikey, domain, start, end, bucket, suffix))
        print result

if __name__ == "__main__":
    static_hash_cache=False
    app = make_app()
    port = int(os.environ.get('PORT', 5000))
    app.listen(port, '0.0.0.0')
    print "It's alive!!!"
    tornado.ioloop.IOLoop.current().start()
