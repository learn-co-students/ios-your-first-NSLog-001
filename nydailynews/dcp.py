import urllib, json
import urllib2
import csv


dates = [
'2016-01-01',
'2016-01-02',
'2016-01-03',
'2016-01-04',
'2016-01-05',
'2016-01-06',
'2016-01-07',
'2016-01-08',
'2016-01-09',
'2016-01-10',
'2016-01-11',
'2016-01-12',
'2016-01-13',
'2016-01-14',
'2016-01-15',
'2016-01-16',
'2016-01-17',
'2016-01-18',
'2016-01-19',
'2016-01-20',
'2016-01-21',
'2016-01-22',
'2016-01-23',
'2016-01-24',
'2016-01-25',
'2016-01-26',
'2016-01-27',
'2016-01-28',
'2016-01-29',
'2016-01-30',
'2016-01-31',
'2016-02-01',
'2016-02-02',
'2016-02-03',
'2016-02-04',
'2016-02-05',
'2016-02-06',
'2016-02-07',
'2016-02-08',
'2016-02-09',
'2016-02-10',
'2016-02-11',
'2016-02-12',
'2016-02-13',
'2016-02-14',
'2016-02-15',
'2016-02-16',
'2016-02-17'

 ]

for date in dates:

	url = "https://chartbeat.com/report_api/reports/daily/"

	parameters = {
	'date': date,
	"host": 'nydailynews.com', 
	"human": "true", 
	"sessionid": "c65xa500ya8smahx2uxzn42gn52fl357", 
	
	}

	data = urllib.urlencode(parameters)
	req = urllib2.Request(url + "?" + data)
	response = urllib2.urlopen(req)

	json_object = json.load(response)

	engage_me = json_object['data']['overview']['data']['total_engaged_time']['num']
	max_concurrents = json_object['data']['overview']['data']['max_concurrents']['num']
	stories_published = json_object['data']['overview']['data']['num_articles']['num']

	print date + ',' + str(engage_me) + ',' + str(max_concurrents) + ',' + str(stories_published)


