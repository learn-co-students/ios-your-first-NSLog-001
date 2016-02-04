import urllib, json
import urllib2
import csv


domains = [
"abc27.com", 
"carolinascw.com", 
"counton2.com", 
"fox21news.com", 
"keloland.com", 
"khon2.com", 
"kimt.com", 
"klfy.com", 
"koin.com", 
"kron4.com", 
"krqe.com", 
"ksn.com", 
"ksnt.com", 
"kwqc.com", 
"kxan.com", 
"kxan.com", 
"kxan.com", 
"nbc26.tv",
"nbc4i.com", 
"news10.com", 
"sportzedge.com", 
"wane.com", 
"wate.com", 
"wate.com", 
"wavy.com", 
"wavy.com", 
"wbay.com", 
"wbtw.com", 
"wdtn.com", 
"wfla.com", 
"whlt.com", 
"wiat.com", 
"wishtv.com", 
"wishtv.com", 
"wivb.com", 
"wivb.com", 
"wjbf.com", 
"wjhl.com", 
"wjtv.com", 
"wkbn.com", 
"wkrg.com", 
"wkrn.com", 
"wkrn.com", 
"wlfi.com", 
"wlns.com", 
"wncn.com", 
"wnct.com", 
"woodtv.com", 
"woodtv.com", 
"wotv4women.com", 
"wpri.com", 
"wpri.com", 
"wrbl.com", 
"wric.com", 
"wsav.com", 
"wsls.com", 
"wspa.com", 
"wthitv.com", 
"wtnh.com", 
"wtnh.com", 
"wwlp.com", 
"wwlp.com", 
"wxedge.com", 
"wytv.com" ]


for domain in domains:

	url = "https://dashapi.chartbeat.com/historical/traffic/stats/" 

	parameters = {
	"host": domain, 
	"human": "true", 
	"sessionid": "2r7uxp0dmbjyvgya7o1xc41oppaytcq1", 
	"_src":"cb_dash", 
	"fields":"people"
	}
	
	data = urllib.urlencode(parameters)
	req = urllib2.Request(url + "?" + data)
	response = urllib2.urlopen(req)

	json_object = json.load(response)

	money_money = json_object['data'][domain]['people']['max']

	print domain + ',' + str(money_money)


# dates = [
# "2016-01-01",
# "2016-01-02",
# "2016-01-03",
# "2016-01-04",
# "2016-01-05",
# "2016-01-06",
# "2016-01-07",
# "2016-01-08",
# "2016-01-09",
# "2016-01-10",
# "2016-01-11",
# "2016-01-12",
# "2016-01-13",
# "2016-01-14",
# "2016-01-15",
# "2016-01-16",
# "2016-01-17",
# "2016-01-18",
# "2016-01-19",
# "2016-01-20",
# "2016-01-21",
# "2016-01-22",
# "2016-01-23",
# "2016-01-24",
# "2016-01-25",
# "2016-01-26",
# "2016-01-27",
# "2016-01-28",
# "2016-01-29",
# "2016-01-30",
# "2016-01-31"
# ]
# for domain in domains:
	# "tz":"America%2FNew_York",
	# "properties":"min%2Cmax"
# 	pre

# 	# for date in dates:

# 	url = preUrl
		
# 	response = urllib.urlopen(url)
# 	jsonResponse = json.loads(response.read())

# 	if "data" in jsonResponse:
# 		max_concurrents = jsonResponse["data"]["fields"]["people"]["max"]
# 	else:
# 		max_concurrents = 0

# 		# print domain + "," + date + "," + str(max_concurrents)
# 	json_object = json.load(response)

# 	print domain + "," + str(max_concurrents)

# 	output.append([domain, max_concurrents])
	
# set the domain of the url
# then append that domain into the url 
# then grab the data from the json object
# print to the terminal 
# 

# https://dashapi.chartbeat.com/historical/traffic/stats/?host=khon2.com&human=true&sessionid=2r7uxp0dmbjyvgya7o1xc41oppaytcq1&tz=America%2FNew_York&_src=cb_dash&fields=people%2Csocial&properties=min%2Cmax

