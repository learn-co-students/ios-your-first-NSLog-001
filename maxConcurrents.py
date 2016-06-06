from datetime import datetime
from datetime import timedelta
import requests
import json
import os
import os.path
import logging
from csv import DictWriter
from csv import DictReader


REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

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
                # requestUrl = "http://localhost:5000/?"+params;

                r = requests.get(REPORTS_API_ENDPOINT, params=params)
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