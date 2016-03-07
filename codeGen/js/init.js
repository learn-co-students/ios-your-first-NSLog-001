(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function() {
    $('select').material_select();
  });

// generate javascript button is disabled

// activate JS button when the user inputs their implementation selection, UID and DOMAIN

 // on the JS click show the right code implementation for the selected options

 // standard CB code

 // EHT code

 // Video CODE


// VALUES VARIABLES

function displayVals(){
	var eht = $('#EHT').val();
	var cbp = $('#cbp').val();
	var video = $('#video').val();
	console.log(eht);
	 console.log(cbp);
	 console.log(video);
};

$( "#EHT" ).change( displayVals );
$( "#cbp" ).change( displayVals );
$( "#video" ).change( displayVals );


function generate() {
    $('#download-button').click(function(){
        $('#sync-head').addClass('hide');
        $('#async-flick-head').addClass('hide');
        $('#async-noFlick-head').addClass('hide');
    // PART 1 - HEAD CODE
        // if SYNC  no value for flicker control (not included in block)
        // with Flicker adds style and TIME OUT THING
        // without flicker adds FLICKERCONTROL=false

        function code() {
            var eht = $('#EHT').val();
            var cbp = $('#cbp').val();
			$('#body-code').removeClass('hide')
			$('#async-body').addClass('hide')
			$('#sync-body').addClass('hide')
			$('#doc-ready').addClass('hide')

            if (eht === null) {
            }
            else if (eht == 1) {
                $('#sync-head').removeClass('hide');
            }
            else if (eht == 2) {
                $('#async-flick-head').removeClass('hide');
            }
            else if (eht == 3) {
                $('#async-noFlick-head').removeClass('hide');
            };
        
// PART 2 BODY CODE
	// IF ASYNC LOAD async-body
	// IF SYNC LOAD sync-body
	// // IF DOC.READY LOAD that CLASS
			

			if (cbp === null) {
			console.log("none");
			}
			else if (cbp == 1) {

				$('#async-body').removeClass('hide')
			}
			else if (cbp == 2) {

				$('#sync-body').removeClass('hide')
			}
			else if (cbp == 3) {
				$('#doc-ready').removeClass('hide')
			};
		}; // end code function
        code();
    }); //end click function
};
	
// GRAB UID AND DOMAIN
	function config(){
        $( "#UID" )
          .keyup(function() {
            var value = $( this ).val();
            $( ".head-uid" ).text( value );
          })
      .keyup();

     $( "#domain" )
          .keyup(function() {
            var value = $( this ).val();
            $( ".head-domain" ).text( value );
          })
      .keyup();

    };
	

	

	// // PART 2 INCLUDE PLAYERDOMAIN
	// 	// IF INCLUDES BRIGHTCOVE LOAD BCOVE 
	// 	// OR PLATFORM LOAD THE-PLAT
	// 	// OR IFRAME LOAD IFRAME
	// function playerDomain(){

	// };

	// // PART 2.VIDEO.JS
	// 	// IF INCLUDES VIDEO ADD VIDEO.JS
	// function video(){

	// };

	// config();
	// bodyCode();
config ();
displayVals();

generate();


// END OF CODE GEN BUTTON 





// PART 5 VIDEO CODE
// ***** NEEDS .PLAYERDOMAIN SET
// **BRIGHTCOVE OLD
// **THE PLATFORM
// **IFRAME

// VIDEO.JS
// FLOWPLAYER
// HTML5
// JWPLAYER
// KALTURA
// OOYALA
// YOUTUBE
// SDK
// IFRAME - INSIDE


