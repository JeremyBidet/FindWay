$(document).ready(function ($) {
    /**
     * functions
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
        $('#ribbonMenu').css('display', 'block');
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
        $('#ribbonMenu').css('display', 'block');
		e.preventDefault();
	});

    /**
     * click on project logo
     * hide google map, show panel without form
     */
	$('#logoProject').click(function() {
        window.location.href = "index.html";
	});

    function mapDown() {
        var tmp = Math.max($("html").height()*8/100, 100);
        $('#mapCanvas').css('top', tmp+'px');
        $('#mapCanvas').animate(
            {
                top: tmp+55
            }
        );
    }
    
    /**
     * click on menu ribbon button :
     * home, place, route
     */
    $('#homeRibbonMenu').click(function() {
        window.location.href = "index.html";
    });
    
    $('#placeRibbonMenu').click(function() {
        var tmp = ( $('#ribbonForm').hasClass('active') ? false : true );
        
        deleteClass($('#routeRibbonMenu'), 'active');
        deleteClass($('#routeLink'), 'active');
        deleteClass($('#ribbonForm'), 'active');
        
        $('#ribbonStart').css('display', 'none');
        $('#ribbonEnd').css('display', 'none');
        $('#ribbonFindRoute').css('display', 'none');
        
        activeClass($('#placeRibbonMenu'), 'active');
        activeClass($('#placeLink'), 'active');
        activeClass($('#ribbonForm'), 'active');
        
        if( tmp ) {
            mapDown();
            setTimeout( function() {
                $('#ribbonPlace').css('display', 'inline');
                $('#ribbonFindPlace').css('display', 'inline');
                $('#ribbonPlace').focus();
                resizeWindow();
            }, 300);
        } else {
            $('#ribbonPlace').css('display', 'inline');
            $('#ribbonFindPlace').css('display', 'inline');
            $('#ribbonPlace').focus();
            resizeWindow();
        }
    });
    
    $('#routeRibbonMenu').click(function() {
        var tmp = ( $('#ribbonForm').hasClass('active') ? false : true );
    
        deleteClass($('#placeRibbonMenu'), 'active');
        deleteClass($('#placeLink'), 'active');
        deleteClass($('#ribbonForm'), 'active');
        
        $('#ribbonFindPlace').css('display', 'none');
        $('#ribbonPlace').css('display', 'none');
        
        activeClass($('#routeRibbonMenu'), 'active');
        activeClass($('#routeLink'), 'active');
        activeClass($('#ribbonForm'), 'active');
        
        if( tmp ) {
            mapDown();
            setTimeout( function() {
                $('#ribbonStart').css('display', 'inline');
                $('#ribbonEnd').css('display', 'inline');
                $('#ribbonFindRoute').css('display', 'inline');
                $('#ribbonStart').focus();
                resizeWindow();
            }, 300);
        } else {
            $('#ribbonStart').css('display', 'inline');
            $('#ribbonEnd').css('display', 'inline');
            $('#ribbonFindRoute').css('display', 'inline');
            $('#ribbonStart').focus();
            resizeWindow();
        }
    });
    
    $('#address').keypress( function (e) {
        if( e.which == 13 ) {
            if( $('#address').val().trim() ) {
                codeAddress('address');
                $('.panel').removeClass('flip');
                $('#titlePlace').removeClass('move');
                $('#mapCanvas').css('display', 'initial'),
                $('#main').css('display', 'none');
                $('#ribbonMenu').css('display', 'block');
                e.preventDefault();
            }
        }
    });
    
    $('#ribbonPlace').keypress( function (e) {
        if( e.which == 13 ) {
            if( $('#ribbonPlace').val().trim() ) {
                codeAddress('ribbonPlace');
                $('.panel').removeClass('flip');
                $('#titlePlace').removeClass('move');
                $('#mapCanvas').css('display', 'initial'),
                $('#main').css('display', 'none');
                $('#ribbonMenu').css('display', 'block');
                e.preventDefault();
            }
        }
    });

    function check(e) {
        if( e.which == 13 ) {
            if( $('#start').val().trim() && $('#end').val().trim() ) {
                calcRoute('start', 'end');
                $('.panel').removeClass('flip');
                $('#titleRoute').removeClass('move');
                $('#mapCanvas').css('display', 'initial'),
                $('#main').css('display', 'none');
                $('#ribbonMenu').css('display', 'block');
                e.preventDefault();
            }
        }
    }
    $('#end').keypress( check );
    $('#start').keypress( check );
    
    function checkRibbon(e) {
        if( e.which == 13 ) {
            if( $('#ribbonStart').val().trim() && $('#ribbonEnd').val().trim() ) {
                calcRoute('ribbonStart', 'ribbonEnd');
                $('.panel').removeClass('flip');
                $('#titleRoute').removeClass('move');
                $('#mapCanvas').css('display', 'initial'),
                $('#main').css('display', 'none');
                $('#ribbonMenu').css('display', 'block');
                e.preventDefault();
            }
        }
    };
    $('#ribbonEnd').keypress( checkRibbon );
    $('#ribbonStart').keypress( checkRibbon );
    
    
    
    function resizeWindow() {
        var main = $('#main');
        var mapCanvas = $('#mapCanvas');
        var block = $('.block');
        var ribbonForm = $('#ribbonForm');
        
        var hheight = $("html").height();
        var hmax = Math.max(hheight*8/100, 100);
        
        main.height(Math.max(hheight-hmax, parseInt(main.css('min-height'))));
        
        if( ribbonForm.hasClass('active') ) {
            hmax += ribbonForm.height();
        }
        mapCanvas.height(Math.max(hheight-hmax, parseInt(mapCanvas.css('min-height'))));
        mapCanvas.css( "top", hmax+"px" );
        
        var margin_top = (main.height() - block.width()) / 2;
        block.css('margin-top', margin_top+"px");
        block.css('margin-bottom', margin_top+"px");
    };
    
    resizeWindow();
    $( window ).resize( resizeWindow );

});

