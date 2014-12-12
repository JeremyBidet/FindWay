// JavaScript Document
$(document).ready(function ($) {
	
	/*$('input[type="text"]').toggleInput();*/

	$('#lieu .flipBlock').click(function(e){
		if($('#itineraire .flipBlock').hasClass('flip')){
			$('#itineraire .flipBlock').removeClass('flip');
			$('#titleItineraire').removeClass('move');
			$('#titleItineraire').addClass('moveDown');
		}	
		$('#lieu .flipBlock').addClass('flip');
		$('#titleLieu').removeClass('moveDown');
		$("#titleLieu").addClass('move');
		e.preventDefault();
	});
	$('#itineraire .flipBlock').click(function(e){
		if($('#lieu .flipBlock').hasClass('flip')){
			$('#lieu .flipBlock').removeClass('flip');
			$('#titleLieu').removeClass('move');
			$('#titleLieu').addClass('moveDown');
		}	
		$('#itineraire .flipBlock').addClass('flip');
		$('#titleItineraire').removeClass('moveDown');
		$("#titleItineraire").addClass('move');
		e.preventDefault();
	});
	
	$('#espace-client .flipBlock').click(function(e){
		$('#espace-client .flipBlock').addClass('flip');
		e.preventDefault();
	});
	
	$('#lieu .flipBlock .validate').click(function(e){
		$('.flipBlock').removeClass('flip');
		$('#titleLieu').removeClass('move');
		/*$(".row").removeClass('show');*/
		/*$(".row").addClass('hide');
		if($("#mapCanvas").hasClass('hide')){
			$("#mapCanvas").removeClass('hide');
		}*/
		$("#mapCanvas").addClass('show');
		e.preventDefault();
	});
	$('#itineraire .flipBlock .validate').click(function(e){
		$('.flipBlock').removeClass('flip');
		$('#titleItineraire').removeClass('move');
		/*$(".row").removeClass('show');
		$(".row").addClass('hide');
		if($("#mapCanvas").hasClass('hide')){
			$("#mapCanvas").removeClass('hide');
		}*/
		$("#mapCanvas").addClass('show');
		e.preventDefault();

		google.maps.event.addDomListener(window, 'load', initialize);
	});


	$('#logoClient').click(function() {
		$('.flipBlock').removeClass('flip');
		$(".row").removeClass('hide');
		$(".row").addClass('show');
		setTimeout(function() {
			if($('#titleItineraire').hasClass('move')){
				$('#titleItineraire').removeClass('move');
				$('#titleItineraire').addClass('moveDown');
			}
			if($('#titleLieu').hasClass('move')){
				$('#titleLieu').removeClass('move');
				$('#titleLieu').addClass('moveDown');
			}
		}, 400);
		if($("#mapCanvas").hasClass('show')){
			$("#mapCanvas").removeClass('show');
		}
		$("#mapCanvas").addClass('hide');
	});

	$('html').click(function() {
		$('.flipBlock').removeClass('flip');
		setTimeout(function() {
			if($('#titleItineraire').hasClass('move')){
				$('#titleItineraire').removeClass('move');
				$('#titleItineraire').addClass('moveDown');
			}
			if($('#titleLieu').hasClass('move')){
				$('#titleLieu').removeClass('move');
				$('#titleLieu').addClass('moveDown');
			}
		}, 400);
		if($("#mapCanvas").hasClass('show')){
			$("#mapCanvas").removeClass('show');
		}
		$("#mapCanvas").addClass('hide');
	});
	
	$('#main').click(function(event){
		event.stopPropagation();
	});

});