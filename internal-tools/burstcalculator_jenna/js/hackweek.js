var chartbeatdata = null;
var apiurl = null;
var pricePerThousand = 5;
var apikey = '4590cb98dd0aee683b0f7c38470b6638';

//single-day variables
var dayMax;
var overage;
var cost;

//month values
var monthConcurrents = [];
var monthOverage = [];
var monthCost = [];
var totalCost = 0;

// BurstApp = {
//   cost: 77,
//   calculateDay: function() {
//     BurstApp.cost
//   }
// };

$(function() {
  $("input[name=domain]").focus();

  $("#calculateDay").on("click", function() {
    var domain = $('input[name=domain]').val();
    var cap = $('input[name=cap]').val();
    var date = $('input[name=date]').val(); //date must be YYYY-mm-dd
    checkPrice();

    if(domain && cap && date) {
      calculateDay(domain,cap,date);
    }
  });

  $("#calculateMonth").on("click", function() {
    var domain = $('input[name=domain]').val();
    var cap = $('input[name=cap]').val();
    checkPrice();

    if(domain && cap) {
      calculateMonth(domain,cap);
    }
  });
})

function calculateDay(domain,cap,date) {
  apiurl = 'http://api.chartbeat.com/historical/traffic/stats/?apikey=' + apikey + '&host=' + domain + '&start=' + date + '&end=' + date + '&properties=max&fields=people';
  $.get(
    apiurl, 
    function(data) {
      chartbeatdata = data;
      dayMax = chartbeatdata.data[domain].people.max;

      overage = concsOverCap(dayMax,cap);
      cost = price(overage);

      $("#concurrents").append('Concurrents: ' + dayMax);
      $("#overage").append('Overage: ' + overage);
      $("#cost").append('Cost: ' + cost);
  });
}

function checkPrice() {
  if( $('input[name=product]').is(':checked') ) {
    pricePerThousand = 5;
  }
  else {
    pricePerThousand = 3;
  }
}

function calculateMonth(domain,cap) {
  apiurl = 'http://api.chartbeat.com/historical/traffic/stats/?apikey=' + apikey + '&host=' + domain + '&properties=values&fields=people';
  $.get(
    apiurl, 
    function(chartbeatdata) {
      var dateOfData = new Date();
      dateOfData.setDate( dateOfData.getDate() - 29 );

      //populates the concurrents array
      var monthConcurrents = chartbeatdata.data[domain].people.values;
      
      for(var ctr = 0; ctr<monthConcurrents.length; ctr++) {
        //populates the overage array
        monthOverage.push( concsOverCap( monthConcurrents[ctr], cap ));

        //populates the cost array
        monthCost.push(
          price(monthOverage[ctr])
        );

        //totals the cost
        totalCost = totalCost + monthCost[ctr];

        //Outputs data to HTML
        //Need to fix the month bug (currently just patched over by doing a +1)
        $('#resultsbody').append('<tr><td></td><td>' + (dateOfData.getMonth()+1) + '/' + dateOfData.getDate() + '</td><td>' + monthConcurrents[ctr] + '</td><td>' + monthOverage[ctr] + '</td><td>' + monthCost[ctr] + '</td></tr>');


        dateOfData.setDate( dateOfData.getDate() + 1 );
      }

      $("#monthSummary").append('<div id="total">TOTAL COST: $' + totalCost + '</div>');
  });
}

function concsOverCap(dayMax,cap) {
  var concsOver = dayMax - cap;
  if (dayMax < cap) {
    concsOver = 0;
  }
  return concsOver
}

function price(overage) {
  var roundedOverage = 0;
  //Rounding
  if (overage%1000 != 0) {
    roundedOverage = overage - (overage%1000) + 1000;
  }
  //Pricing after rounding
  return (roundedOverage/1000)*pricePerThousand;
}
