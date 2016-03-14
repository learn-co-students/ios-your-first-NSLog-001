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
	console.log(cbp);
	console.log(eht); 
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
            var UID = $('#UID').val();
            var domain = $('#domain').val();

			$('#body-code').removeClass('hide')
			$('#async-body').addClass('hide')
			$('#sync-body').addClass('hide')
			$('#doc-ready').addClass('hide')
			$('#bcove').addClass('hide')
			$('#the-plat').addClass('hide')
			$('#video-js').addClass('hide')
			$('#stat-js').addClass('hide')

			// validation for UID and DOMAIN
			if(UID.length === 0)
			   {
			    alert("Please input a your Account ID");
			   }
			   else if(domain.length === 0)
			   {
			    alert("Please input the domain you want to track");
			   };

			// EHT code

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

			if ( ((cbp === null) || (cbp == 1)) && ((video === null)))
			{
				$('#async-body').removeClass('hide')
				$('#stat-js').removeClass('hide')
				console.log('1')
			}
			else if (((cbp === null) || (cbp == 1)) &&  ((video == 1) || (video == 3) || (video == 4) || (video == 5) || (video == 6) || (video == 7) || (video == 9) || (video == 10)))
			{
				$('#async-body').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('new')
			}
			else if (((cbp == 2)) && ((video == 1) || (video == 3) || (video == 4) || (video == 5) || (video == 6) || (video == 7) || (video == 9) || (video == 10)))
			{
				$('#sync-body').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('new1')
			}
			else if (((cbp == 3)) && ((video == 1) || (video == 3) || (video == 4) || (video == 5) || (video == 6) || (video == 7) || (video == 9) || (video == 10)))
			{
				$('#doc-ready').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('new2')
			}

			else if ((cbp == 1) && (video === null))
			{
				$('#async-body').removeClass('hide')
				$('#stat-js').removeClass('hide')
				console.log('2')
			}
			else if ((cbp == 2) && (video === null))
			{
				$('#sync-body').removeClass('hide')
				$('#stat-js').removeClass('hide')
				console.log('3')
			}
			else if ((cbp == 3) && (video === null))
			{
				$('#doc-ready').removeClass('hide')
				$('#stat-js').removeClass('hide')
				console.log('4')
			}
			else if ((cbp == 1) && (video == 2))
			{
				$('#async-body').removeClass('hide')
				$('#bcove').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('5')
			}
			else if ((cbp == 2) && (video == 2))
			{
				$('#sync-body').removeClass('hide')
				$('#bcove').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('6')
			}
			else if ((cbp == 3) && (video == 2))
			{
				$('#doc-ready').removeClass('hide')
				$('#bcove').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('7')
			}
			else if ((cbp == 1) && (video == 8))
			{
				$('#the-plat').removeClass('hide')
				$('#async-body').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('8')
			}
			else if ((cbp == 2) && (video == 8))
			{
				$('#the-plat').removeClass('hide')
				$('#sync-body').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('9')
			}
			else if ((cbp == 3) && (video == 8))
			{
				$('#the-plat').removeClass('hide')
				$('#doc-ready').removeClass('hide')
				$('#video-js').removeClass('hide')
				console.log('10')
			}
			else if ((cbp == 1))
			 {
				$('#async-body').removeClass('hide')
				console.log('11')
			}
			else if ((cbp == 2))
			 {
				$('#sync-body').removeClass('hide')
				console.log('12')
			}
			else if ((cbp == 3))
			 {
				$('#doc-ready').removeClass('hide')
				console.log('13')
			}
			
			else {
				console.log('this shit is broken')
			};
			
			
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








