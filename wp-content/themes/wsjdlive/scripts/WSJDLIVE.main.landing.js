WSJDLIVE.namespace( 'main.landing' );

WSJDLIVE.main.landing = (function() {
	var OBJ_MAIN,
		OBJ_NAV;

  	var init = function init() {
  		OBJ_MAIN = WSJDLIVE.main;
  		OBJ_NAV = WSJDLIVE.main.nav;
  		//handlers();
	};
	
	var slideInfoLayer = function slideInfoLayer(introDone, to, id) {
		if (!id && (to == '' || to == undefined || to == 'bg')) id = OBJ_MAIN.getPageId();

		if (to == '' || to == undefined || to == 'bg')
		{
			OBJ_MAIN.setMediaState(0);
			jQuery('#media-wrapper a.closeBtn').stop().fadeOut(200);
			jQuery('#media-wrapper .photoNavBtn').stop().fadeOut(250);
			jQuery('#media-wrapper .videobox').html('');
        	jQuery('#media-wrapper .videobox').stop().fadeOut(250);
        	jQuery('#media-wrapper .photobox').stop().fadeOut(250);
        	jQuery('#media-wrapper .mapbox').stop().fadeOut(250);
			if (OBJ_MAIN.getIntroPlayed()) jQuery('#main-wrapper').removeAttr('style');

			jQuery('#media-wrapper .bgbox img').each(function(i){
				if (i == id) jQuery(this).delay(250).fadeIn(500, 'easeOutCubic');
				else jQuery(this).fadeOut(500, 'easeInCubic');
			});

			// jQuery('body').css('overflow-y', 'auto');
			jQuery('body').removeAttr('style');

			setTimeout(function(){
				jQuery('#media-wrapper .registerbox').fadeIn(250);
				// jQuery('#main-wrapper').find('#content').fadeIn(200);
				jQuery('#header').removeAttr('style');
				if (introDone) jQuery('#header').addClass('introPlayed');
			}, 250);
		}
		else
		{
			if (jQuery('html').hasClass('breakpoint-phone') || jQuery('html').hasClass('breakpoint-small-tablet') || jQuery('html').hasClass('breakpoint-tablet')) return;
			
			if (to == 'video')
			{
				OBJ_MAIN.setMediaState(1);
				jQuery('#media-wrapper a.closeBtn').removeClass('dark');
				jQuery('#media-wrapper .videobox').html(buildInVideo(id));
	        	jQuery('#media-wrapper .videobox').stop().delay(200).fadeIn(250);
			}

			if (to == 'photo')
			{
				OBJ_MAIN.setMediaState(1);
				jQuery('#media-wrapper a.closeBtn').removeClass('dark');
	        	jQuery('#media-wrapper .photobox').stop().delay(200).fadeIn(250);
	        	jQuery('#media-wrapper .photoNavBtn').stop().delay(200).fadeIn(250);
	        	jQuery('#media-wrapper .photobox ul').html('');
	        	jQuery('#media-wrapper .photobox ul').fadeOut(0);
	        	jQuery('#media-wrapper .photobox ul').append('<li><img src="' + id + '" /></li>');
	        	jQuery('#media-wrapper .photobox ul').fadeIn(500, 'easeOutCubic');
	        	OBJ_MAIN.setPhotoRatio();
			}

			if (to == 'map')
			{
				OBJ_MAIN.setMediaState(3);
				jQuery('#media-wrapper a.closeBtn').addClass('dark');
				jQuery('#media-wrapper .mapbox').stop().delay(200).fadeIn(250);
	        	jQuery('#media-wrapper .mapbox').stop().delay(250).fadeIn(250, function() {
					initMap();
				});
			}

			jQuery('#media-wrapper .registerbox').stop().fadeOut(250);
			//jQuery('#main-wrapper').find('#content').stop().fadeOut(200);
			//jQuery('#header').stop().fadeOut(200);
			jQuery('#header').removeClass('introPlayed');
			jQuery('body').css('overflow-y', 'hidden');
			jQuery('#main-wrapper').stop().css('right', (-1*(jQuery('#main-wrapper').width()-15))+'px');
			
			jQuery('#media-wrapper a.closeBtn').stop().delay(200).fadeIn(250);
		}
	};
    
    var buildInVideo = function buildInVideo(id) {
		return '<iframe width="100%" height="100%" src="' + id + '&autohide=1&autoplay=1&rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
	};

    var initMap = function initMap() {
    	var venue = new google.maps.LatLng(33.5149211, -117.7572141);
        var mapOptions = {
        	center: venue,
        	zoom: 16
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
        	position: venue,
		    map: map,
		    title: 'WSJDLIVE',
		    draggable: false,
		    animation: google.maps.Animation.DROP
		});

		var contentString = '<div id="gmap-content">'+
			'<h2 id="firstHeading" class="firstHeading">WSJDLIVE</h2>'+
            '<div id="siteNotice">'+
            '<a href="' + jQuery('#main-wrapper a.mapBtn').attr('href').substring(1) + '" title="Get Driving Directions" target="_blank">Get Directions</a>' +
	        '</div>'+
            '</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		marker.setMap(map);

		google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map, marker);
		});

		infowindow.open(map,marker);
    };

	function handlers() {
		
	};

	return {
		init: init,
		slideInfoLayer: slideInfoLayer,
		buildInVideo: buildInVideo
	};

})();

//-----------------------------------------------------------------------------------------------
