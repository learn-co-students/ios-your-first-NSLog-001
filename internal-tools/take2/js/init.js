(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function() {
    $('select').material_select();

    
 });


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10, // Creates a dropdown of 15 years to control year
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