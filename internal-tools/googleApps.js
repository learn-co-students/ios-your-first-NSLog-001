function getChartbeatTraffic (apikey, domain) {
	var url = "http://api.chartbeat.com/historical/traffic/series?apikey=" + apikey + "&host=" + domain
	var response = UrlFetchApp.fetch(url, {"muteHttpExceptions": true});
	var json = response.getContentText();
	var data = JSON.parse(json);
	if (data.error) {
		var error;
		if (data.error.message) {
			error = data.error.message;
		} else {
			error = data.error;
		}
		throw new Error("API Error: " + error);
	}
	return data.data;
 }

 function insertData(sheet, data) {
 	var headerNames = data.shift();
 	var headerRange = sheet.getRange (1, 1, 1, headerNames.length);
 	headerRange.setValues([headerNames]);
 	sheet.getRange(2, 1, data.length, headerNames.length)
 		.setValues(data);
 }