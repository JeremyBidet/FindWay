// JavaScript Document
$(document).ready(function ($) {
	
    
    /**
     * click on menu ribbon button :
     * home, place, route
     */
    function activeClass(node, className) {
        if( node.hasClass(className) ) {
            return;
        } else {
            node.addClass(className);
        }
    }
    function deleteClass(node, className) {
        if( node.hasClass(className) ) {
            node.removeClass(className);
        }
    }
    $('#homeRibbonMenu').click(function() {
        deleteClass($('#placeRibbonMenu'), 'active');
        deleteClass($('#placeLink'), 'active');
        deleteClass($('#routeRibbonMenu'), 'active');
        deleteClass($('#routeLink'), 'active');
        activeClass($('#homeRibbonMenu'), 'active');
        activeClass($('#homeLink'), 'active');
    });
    $('#placeRibbonMenu').click(function() {
        deleteClass($('#homeRibbonMenu'), 'active');
        deleteClass($('#homeLink'), 'active');
        deleteClass($('#routeRibbonMenu'), 'active');
        deleteClass($('#routeLink'), 'active');
        activeClass($('#placeRibbonMenu'), 'active');
        activeClass($('#placeLink'), 'active');
    });
    $('#routeRibbonMenu').click(function() {
        deleteClass($('#placeRibbonMenu'), 'active');
        deleteClass($('#placeLink'), 'active');
        deleteClass($('#homeRibbonMenu'), 'active');
        deleteClass($('#homeLink'), 'active');
        activeClass($('#routeRibbonMenu'), 'active');
        activeClass($('#routeLink'), 'active');
    });
    

    /**
     * click on place panel
     * close route panel form and open place panel form
     */
	$('#place .panel').click(function(e) {
        if($('#route .panel').hasClass('flip')) {
			$('#route .panel').removeClass('flip');
			$('#titleRoute').removeClass('move');
			$('#titleRoute').addClass('moveDown');
		}	
		$('#place .panel').addClass('flip');
		$('#titlePlace').removeClass('moveDown');
		$("#titlePlace").addClass('move');
        $('#address').focus();
		e.preventDefault();
	});
    
    /**
     * click on route panel
     * close place panel form and open route panel form
     */
    var ended = false;
	$('#route .panel').click(function(e) {
		if($('#place .panel').hasClass('flip')) {
			$('#place .panel').removeClass('flip');
			$('#titlePlace').removeClass('move');
			$('#titlePlace').addClass('moveDown');
		}	
		$('#route .panel').addClass('flip');
		$('#titleRoute').removeClass('moveDown');
		$("#titleRoute").addClass('move');
        if( ! ended ) {
            $('#start').focus();
        } else {
            $('#end').focus();
            ended = false;
        }
		e.preventDefault();
	});
    $('#end').click(function(e) {
        ended = true;
        e.preventDefault();
    });
	
    /**
     * submit with search button on place panel
     * hide all panel form and show google map
     */
	$('#place .panel .validate').click(function(e) {
		$('.panel').removeClass('flip');
		$('#titlePlace').removeClass('move');
		$('#mapCanvas').css('display', 'initial'),
        $('#main').css('display', 'none');
        e.preventDefault();
	});
    
    /**
     * submit with search button on place panel
     * hide all panel form and show google map
     */
	$('#route .panel .validate').click(function(e) {
		$('.panel').removeClass('flip');
		$('#titleRoute').removeClass('move');
		$('#mapCanvas').css('display', 'initial'),
        $('#main').css('display', 'none');
		e.preventDefault();

		google.maps.event.addDomListener(window, 'load', initialize);
	});


    /**
     * click on project logo
     * hide google map, show panel without form
     */
	$('#logoProject').click(function() {
		$('.panel').removeClass('flip');
		$(".mainMenu").removeClass('hide');
		$(".mainMenu").addClass('show');
		setTimeout(function() {
			if($('#titleRoute').hasClass('move')) {
				$('#titleRoute').removeClass('move');
				$('#titleRoute').addClass('moveDown');
			}
			if($('#titlePlace').hasClass('move')) {
				$('#titlePlace').removeClass('move');
				$('#titlePlace').addClass('moveDown');
			}
		}, 400);
		$('#mapCanvas').css('display', 'none'),
        $('#main').css('display', 'initial');
	});

    
    var resize = function() {
        var main = $('#main');
        var mapCanvas = $('#mapCanvas');
        var block = $('.block');
        
        var hheight = $("html").height();
        var hmax = Math.max(hheight*8/100, 100);
        
        main.height(Math.max(hheight-hmax, parseInt(main.css('min-height'))));
        
        mapCanvas.height(Math.max(hheight-hmax, parseInt(mapCanvas.css('min-height'))));
        mapCanvas.css( "top", hmax+"px" );
        
        var margin_top = (main.height() - block.width()) / 2;
        block.css('margin-top', margin_top+"px");
        block.css('margin-bottom', margin_top+"px");
    };
    
    resize();
    $( window ).resize( resize );

});



