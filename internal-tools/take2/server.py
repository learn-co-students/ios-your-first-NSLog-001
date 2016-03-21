from flask import Flask
from flask import request
from flask import render_template
from flask import url_for
from flask import jsonify

from datetime import datetime, timedelta
import requests
import json
import os
from csv import DictWriter, DictReader
from flask import send_from_directory

#ad44599fae1d00ed39420c19b78b6001

app = Flask(__name__, static_url_path='')

REPORTS_API_ENDPOINT = 'http://chartbeat.com/report_api/reports/daily/'

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/csv/<path:path>')
def send_csv(path):
    return send_from_directory('csv', path)

def max_concurrents(apikey, domain, start, end, save_to=False):

    d_start = datetime.strptime(start, "%Y-%m-%d")
    d_end = datetime.strptime(end, "%Y-%m-%d")

    delta = d_end - d_start

    toReturn = []
    rows = []
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

        row = [domain, formatted_date, str(data['data']['overview']['data']['max_concurrents']['num'])]

        # data = r.json()
        toReturn.append(','.join(row))
        rows.append(row)
        #print r.json()
    if save_to:
        path = os.path.join(".", "csv/{0}_{1}_{2}.csv".format(domain, start, end))
        #print path
        with open(path, 'wb') as csvFile:
            writer = DictWriter(csvFile, fieldnames=['domain', 'date', 'max_concurrents'])
            writer.writeheader()
            for row in rows:
                writer.writerow({
                        'domain': row[0],
                        'date': row[1],
                        'max_concurrents': row[2],
                    })
            


    return '\n'.join(toReturn)

@app.route('/')
def home():
    apikey = request.args.get('apikey')
    domain = request.args.get('domain')
    start = request.args.get('start')
    end = request.args.get('end')
    print domain, start, end
    data = ''
    if apikey and domain and start and end:
        data = max_concurrents(apikey, domain, start, end, save_to=True)
    #data = max_concurrents(domain, start, end)
    print type(data)
    return render_template('index.html', data=data, domain=domain, start=start, end=end)

if __name__ == '__main__':
    app.run(debug=True)

# BURST PRICING CALC JAVASCRIPT

# var chartbeatdata = null;
# var apiurl = null;
# var pricePerThousand = 5;
# var apikey = '4590cb98dd0aee683b0f7c38470b6638';

# //single-day variables
# var dayMax;
# var overage;
# var cost;

# //month values
# var monthConcurrents = [];
# var monthOverage = [];
# var monthCost = [];
# var totalCost = 0;

# // BurstApp = {
# //   cost: 77,
# //   calculateDay: function() {
# //     BurstApp.cost
# //   }
# // };

# $(function() {
#   $("input[name=domain]").focus();

#   $("#calculateDay").on("click", function() {
#     var domain = $('input[name=domain]').val();
#     var cap = $('input[name=cap]').val();
#     var date = $('input[name=date]').val(); //date must be YYYY-mm-dd
#     checkPrice();

#     if(domain && cap && date) {
#       calculateDay(domain,cap,date);
#     }
#   });

#   $("#calculateMonth").on("click", function() {
#     var domain = $('input[name=domain]').val();
#     var cap = $('input[name=cap]').val();
#     checkPrice();

#     if(domain && cap) {
#       calculateMonth(domain,cap);
#     }
#   });
# })

# function calculateDay(domain,cap,date) {
#   apiurl = 'http://api.chartbeat.com/historical/traffic/stats/?apikey=' + apikey + '&host=' + domain + '&start=' + date + '&end=' + date + '&properties=max&fields=people';
#   $.get(
#     apiurl, 
#     function(data) {
#       chartbeatdata = data;
#       dayMax = chartbeatdata.data[domain].people.max;

#       overage = concsOverCap(dayMax,cap);
#       cost = price(overage);

#       $("#concurrents").append('Concurrents: ' + dayMax);
#       $("#overage").append('Overage: ' + overage);
#       $("#cost").append('Cost: ' + cost);
#   });
# }

# function checkPrice() {
#   if( $('input[name=product]').is(':checked') ) {
#     pricePerThousand = 5;
#   }
#   else {
#     pricePerThousand = 3;
#   }
# }

# function calculateMonth(domain,cap) {
#   apiurl = 'http://api.chartbeat.com/historical/traffic/stats/?apikey=' + apikey + '&host=' + domain + '&properties=values&fields=people';
#   $.get(
#     apiurl, 
#     function(chartbeatdata) {
#       var dateOfData = new Date();
#       dateOfData.setDate( dateOfData.getDate() - 29 );

#       //populates the concurrents array
#       var monthConcurrents = chartbeatdata.data[domain].people.values;
      
#       for(var ctr = 0; ctr<monthConcurrents.length; ctr++) {
#         //populates the overage array
#         monthOverage.push( concsOverCap( monthConcurrents[ctr], cap ));

#         //populates the cost array
#         monthCost.push(
#           price(monthOverage[ctr])
#         );

#         //totals the cost
#         totalCost = totalCost + monthCost[ctr];

#         //Outputs data to HTML
#         //Need to fix the month bug (currently just patched over by doing a +1)
#         $('#resultsbody').append('<tr><td></td><td>' + (dateOfData.getMonth()+1) + '/' + dateOfData.getDate() + '</td><td>' + monthConcurrents[ctr] + '</td><td>' + monthOverage[ctr] + '</td><td>' + monthCost[ctr] + '</td></tr>');


#         dateOfData.setDate( dateOfData.getDate() + 1 );
#       }

#       $("#monthSummary").append('<div id="total">TOTAL COST: $' + totalCost + '</div>');
#   });
# }

# function concsOverCap(dayMax,cap) {
#   var concsOver = dayMax - cap;
#   if (dayMax < cap) {
#     concsOver = 0;
#   }
#   return concsOver
# }

# function price(overage) {
#   var roundedOverage = 0;
#   //Rounding
#   if (overage%1000 != 0) {
#     roundedOverage = overage - (overage%1000) + 1000;
#   }
#   //Pricing after rounding
#   return (roundedOverage/1000)*pricePerThousand;
# }
