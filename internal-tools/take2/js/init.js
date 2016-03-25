(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function() {
    $('select').material_select();
 });


$('.datepicker').pickadate({
    today: '',
    selectMonths: true, // Creates a dropdown to control month
    selectYears: true,
    min: new Date(2013,12,01),
    max: -1,
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    hiddenPrefix: 'prefix__',
    hiddenSuffix: '__suffix'
    
  });

// function CreateCSV(){
//   var fileName = 'csv/' + '{{domain}}' + "_" + '{{start}}' + "_" + '{{end}}' + '.csv';
//   console.log(fileName);
//   $('#csv').attr('href', fileName);
// };

// CreateCSV();

// after 'run query' button is hit show the csv download button 