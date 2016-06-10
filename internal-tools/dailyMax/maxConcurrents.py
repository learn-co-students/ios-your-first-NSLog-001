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


REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'


def max_concurrents(apikey, domain, start, end, save_to=False):

        d_start = datetime.strptime(start, "%Y-%m-%d")
        d_end = datetime.strptime(end, "%Y-%m-%d")

        delta = d_end - d_start

        toReturn = []
        rows = []
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

                r = requests.get(REPORTS_API_ENDPOINT, params=params)

                data = r.json()

                row = [u, formatted_date, str(data['data']['overview']['data']['max_concurrents']['num'])]

                toReturn.append(','.join(row))
                rows.append(row)
                #print r.json()

                if save_to:
                    print "THE AWS METHOD RAN"
                    # set the boto s3 environment
                    s3 = boto3.resource('s3')
                    bucket = s3.Bucket('powerful-bayou')
                    exists = True
                    try:
                        s3.meta.client.head_bucket(Bucket='powerful-bayou')
                    except botocore.exceptions.ClientError as e:
                        # If a client error is thrown, then check that it was a 404 error.
                        # If it was a 404 error, then the bucket does not exist.
                        error_code = int(e.response['Error']['Code'])
                        if error_code == 404:
                            exists = False
                    # s3conn = boto3.resource("aws_access_key_id","aws_secret_access_key")

                    # Load necessary information into the application
                    # S3_BUCKET = self.s3Conn.lookup('S3_BUCKET_NAME')
                    print "THIS IS THE S3_BUCKET", bucket
                    # Load required data from the request
                    # file_name = request.args.get('file-name')
                    # file_type = request.args.get('file-type')
                    path = os.path.join(bucket, "/{0}{1}{2}.csv".format(domain, start, end))
                    print start, end
                    print "THIS IS THE FILEPATH: ", path
                    print "end"

                    # Initialise the S3 client to store data
                    s3fileData = open(path, 'rb')
                    s3.Bucket('powerful-bayou').put_object(Key=path, Body=s3fileData)

                    # Generate and return the presigned URL
                    presigned_post = s3.generate_presigned_post(
                    Bucket = S3_BUCKET,
                    Key = path,
                    Fields = {"acl": "public-read"},
                    Conditions = [
                      {"acl": "public-read"}
                    ],
                    ExpiresIn = 3600
                    )
                    # Return the data to the client
                    return json.dumps({
                    'data': presigned_post,
                    'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, path)
                    })
                    
                    # Create the csv file
                    with open(path, 'wb') as csvFile:
                        writer = DictWriter(csvFile, fieldnames=['u', 'date', 'max_concurrents'])
                        writer.writeheader()
                        for u, date, max_concurrents in rows:
                            writer.writerow({
                                'u': u,
                                'date': date,
                                'max_concurrents': max_concurrents,
                            })
                print "THIS IS AFTER THE WRITE"
                    
        return '\n'.join(toReturn)



