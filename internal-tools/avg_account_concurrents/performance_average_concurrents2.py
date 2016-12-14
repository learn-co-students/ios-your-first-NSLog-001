import requests, json
import csv
import time
import traceback
from UID import ACCOUNTS
import grequests
import csv

CHUNK_SIZE = 100
UNIQUE_ACCOUNTS = list(set(ACCOUNTS))
COOKIES = dict(sessionid='svx27un8ir5setvfyalbcdp7c69eebwu')


def create_requests(_id):
    return grequests.get("https://chartbeat.com/admin/api/getavgpeople/?account_id=" + str(_id), cookies=COOKIES)

def get_data(ids):
    print "Creating requests"
    rs = (create_requests(_id) for _id in ids)
    print "Making requests"
    responses = grequests.map(rs)
    print "Requests finished"
    people_avg_data = [json.loads(r.text).get('people_avg', -1) for r in responses]
    return people_avg_data

def get_data_all_accounts():
    people_list = []
    for i in xrange(0, len(UNIQUE_ACCOUNTS), CHUNK_SIZE):
        print i
        people_list.extend(get_data(UNIQUE_ACCOUNTS[i:i+CHUNK_SIZE]))
    print people_list
    json.dump(people_list, open('pj.txt', 'wb'))

if __name__ == '__main__':
    #get_data_all_accounts()
    avg_people = json.load(file('pj.txt'))
    w = csv.writer(open('pj_final.csv', 'wb'), delimiter=",")
    for i, j in zip(UNIQUE_ACCOUNTS, avg_people):
        w.writerow([i, j])
```

