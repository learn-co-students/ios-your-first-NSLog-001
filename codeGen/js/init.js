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
    	$('#codegen').removeClass('hide');
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
            var video = $('#video').val();

			$('#body-code').removeClass('hide')
			$('#async-body').addClass('hide')
			$('#sync-body').addClass('hide')
			$('#doc-ready').addClass('hide')
			$('#bcove').addClass('hide')
			$('#the-plat').addClass('hide')
			$('#video-js').addClass('hide')
			$('#stat-js').addClass('hide')


            if (eht === null) {
                $('#async-noFlick-head').removeClass('hide');
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
// PART 2 INCLUDE PLAYERDOMAIN
		// IF INCLUDES BRIGHTCOVE LOAD BCOVE 
		// OR PLATFORM LOAD THE-PLAT

			if (cbp === null) {
				$('#async-body').removeClass('hide')
				$('#stat-js').removeClass('hide')
			}
			else if ((cbp == 1) && (video === null)){
				$('#async-body').removeClass('hide')
				$('#stat-js').removeClass('hide')
			}
			else if ((cbp == 2) && (video === null)){
				$('#sync-body').removeClass('hide')
				$('#stat-js').removeClass('hide')
			}
			else if ((cbp == 3) && (video === null)){
				$('#doc-ready').removeClass('hide')
				$('#stat-js').removeClass('hide')
			}
			else if ((cbp == 1) && (video = 2)){
				$('#async-body').removeClass('hide')
				$('#bcove').removeClass('hide')
				$('#video-js').removeClass('hide')
			}
			else if ((cbp == 2) && (video = 2)){
				$('#sync-body').removeClass('hide')
				$('#bcove').removeClass('hide')
				$('#video-js').removeClass('hide')
			}
			else if ((cbp == 3) && (video = 2)){
				$('#doc-ready').removeClass('hide')
				$('#bcove').removeClass('hide')
				$('#video-js').removeClass('hide')
			}
			else if ((cbp == 1) && (video = 8)){
				$('#the-plat').removeClass('hide')
				$('#async-body').removeClass('hide')
				$('#video-js').removeClass('hide')
			}
			else if ((cbp == 2) && (video = 8)){
				$('#the-plat').removeClass('hide')
				$('#sync-body').removeClass('hide')
				$('#video-js').removeClass('hide')
			}
			else if ((cbp == 3) && (video = 8)){
				$('#the-plat').removeClass('hide')
				$('#doc-ready').removeClass('hide')
				$('#video-js').removeClass('hide')
			}
			else if (cbp == 1) {
				$('#async-body').removeClass('hide')
			}
			else if (cbp == 2) {
				$('#sync-body').removeClass('hide')
			}
			else if (cbp == 3) {
				$('#doc-ready').removeClass('hide')
			}
			else if ((video === null) || (cbp === null)){
				console.log("none");
			}
			
	// PART 2.VIDEO.JS
			// IF INCLUDES VIDEO ADD VIDEO.JS
			// VIDEO.JS
			// FLOWPLAYER
			// HTML5
			// JWPLAYER
			// KALTURA
			// OOYALA
			// YOUTUBE
			// SDK	

		}; // end code function
	

// CALL CODE GENERATION FUNCTION
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
	

// CALL ALL FUNCTIONS
config ();
displayVals();
generate();


// END OF CODE GEN BUTTON 








