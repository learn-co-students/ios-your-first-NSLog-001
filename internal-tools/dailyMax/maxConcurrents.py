from datetime import datetime
from datetime import timedelta
import requests
import json
import os
import os.path
import logging
from csv import DictWriter
from csv import DictReader
import boto3
import botocore
import tempfile
from tempfile import NamedTemporaryFile
import csv



REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'


def concurrents_to_s3(apikey, domain, start, end, bucket, suffix, save_to=False):
    data = max_concurrents(apikey, domain, start, end)
    s3 = boto3.resource('s3')
    bucket = 'powerful-bayou'
    suffix = '{}_{}_{}.csv'.format(domain, start, end)
    path = os.path.join(bucket, suffix)
    writeCSV(s3,
             bucket=bucket,
             key=path,
             rows=data,
            # fieldnames=['domain', 'date', 'max_concurrents']

             fieldnames=['host', 'date', 'concurrents']
            )
    print path
    print bucket
    return json.dumps({
        'data': path,
        'url': 'https://%s.s3.amazonaws.com/%s' % (bucket, suffix)
    })

def max_concurrents(apikey, domain, start, end, save_to=False):
    domains = domain.split(",")
    d_start = datetime.strptime(start, "%Y-%m-%d")
    d_end = datetime.strptime(end, "%Y-%m-%d")
    delta = d_end - d_start

    # toReturn = []
    rows = []
    # grab the domain from comma separated list and make separate async requests for each domain

    print domains
    response = []
    for domain in domains:
        print domain
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
            concurrents = str(data['data']['overview']['data']['max_concurrents']['num'])

            response.append({
                'host': domain,
                'date': formatted_date,
                'concurrents': concurrents
            })

    return response

def writeCSV(s3, bucket, key, rows, fieldnames):
    # dataImport = max_concurrents(response)
    # maxCondata = open('test.jpg', 'rb')
    # rows = str(rows)
    with tempfile.NamedTemporaryFile() as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames , delimiter = ';')
        writer.writeheader()
        for row in rows:
            print "THIS IS THE ROW", row
            writer.writerow(row)
            print key
            print bucket
        f.seek(0)
        s3.Bucket(bucket).put_object(Key=key, Body=f)


    return ''


        # row = [domain, formatted_date, str(data['data']['overview']['data']['max_concurrents']['num'])]

        # toReturn.append(','.join(row))
        # rows.append(row)
        # #print r.json()

        # if save_to:
        #     # print "THE AWS METHOD RAN"
        #     # set the boto s3 environment
        #     s3 = boto3.resource('s3')
        #     bucket = s3.Bucket('powerful-bayou')
        #     exists = True
        #     # for bucket in s3.buckets.all():
        #     #     print(bucket.name)
            
            
        #     try:
        #         s3.meta.client.head_bucket(Bucket='powerful-bayou')
        #     except botocore.exceptions.ClientError as e:
        #         # If a client error is thrown, then check that it was a 404 error.
        #         # If it was a 404 error, then the bucket does not exist.
        #         error_code = int(e.response['Error']['Code'])
        #         if error_code == 404:
        #             exists = False
        #     # s3conn = boto3.resource("aws_access_key_id","aws_secret_access_key")

        #     # Load necessary information into the application
        #     # S3_BUCKET = self.s3Conn.lookup('S3_BUCKET_NAME')
        #     # print "THIS IS THE S3_BUCKET", bucket

        #     # Load required data from the request
        #     # file_name = request.args.get('file-name')
        #     # file_type = request.args.get('file-type')
        #     path = os.path.join(bucket, "/{0}{1}{2}.csv".format(domain, start, end))
        #     # print start, end
        #     # print "THIS IS THE FILEPATH: ", path
        #     # print "end"

        #     # INITIATE THE BOTO CONNECTION
        #     sqs = boto3.resource('sqs')
        #     # queue = sqs.get_queue_by_name(QueueName='enqueue_job')
        #     # print(queue.url)
        #     # print(queue.attributes.get('DelaySeconds'))

        #     # Print out each queue name, which is part of its ARN
        #     # for queue in sqs.queues.all():
        #     #     print(queue.url)

        # # RETURN THE JSON
        # # print "THIS IS AFTER THE WRITE"
        # return json.dumps({
        #     'data': path,
        #     'url': 'https://%s.s3.amazonaws.com/%s' % (bucket, path)
        #     })



# WRITE THE CSV TO AWS S3
# def writeCSV(s3, bucket):
#     for bucket in s3.buckets.all():
#         print(bucket.name)
#     print "THE WRTIE CSV FUNC"
#     s3data = open(path, 'rb')
    
    
#     # Create the csv file
#     with open(path, 'wb') as csvFile:
#         writer = DictWriter(csvFile, fieldnames=['u', 'date', 'max_concurrents'])
#         writer.writeheader()
#         for u, date, max_concurrents in rows:
#             writer.writerow({
#                 'u': u,
#                 'date': date,
#                 'max_concurrents': max_concurrents,
#             })
#         key = '/data/{}.csv'.format(name)
#         s3.Bucket('powerful-bayou').put_object(Key=key, Body=csvFile)

#     # s3.Bucket('powerful-bayou').put_object(Key=path, Body=s3data)

#     # Initialise the S3 client to store data
#     # s3fileData = open(path, 'rb')
#     # print path
#     # print bucket
#     # s3.Bucket('powerful-bayou').put_object(Key=path, Body=s3fileData)

#     return '\n'.join(toReturn)



