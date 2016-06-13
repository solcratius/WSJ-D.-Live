WSJDLIVE.namespace( 'main.nav' );

WSJDLIVE.main.nav = (function() {
	var OBJ_MAIN,
        OBJ_SECT;

    var firstTime = true,
        photoCur = 0,
        photoTotal;

  	var init = function init() {
        OBJ_MAIN = WSJDLIVE.main;
		OBJ_SECT = WSJDLIVE.main.landing;
        photoTotal = jQuery('#media-wrapper .photobox .data').length;
  		handlers();

        if (firstTime) firstTime = false;
	};

    var setCurPhotoID = function setCurPhotoID(n) {
        photoCur = n
    };

    var animPhoto = function animCurPhoto(dir) {
        jQuery('#media-wrapper .photobox ul').append('<li></li>');

        if (dir == 'left')
        {
            if (photoCur <= 0) photoCur = (photoTotal-1);
            else photoCur -= 1;
        }
        else
        {
            if (photoCur >= (photoTotal-1)) photoCur = 0;
            else photoCur += 1;
        }
        jQuery('#media-wrapper .photobox ul li').append('<img src="' + jQuery('#media-wrapper .photobox .data').eq(photoCur).html() + '" />').fadeOut(0);
        OBJ_MAIN.setPhotoRatio();
        jQuery('#media-wrapper .photobox ul li').eq(0).stop().fadeOut(500, 'easeInCubic');
        jQuery('#media-wrapper .photobox ul li').eq(1).stop().fadeIn(500, 'easeOutCubic', function() {
            jQuery('#media-wrapper .photobox ul li').eq(0).remove();
        });
    };

    function handlers() {
        jQuery('#main-wrapper a.videoBtnBox').on("mouseenter", function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).find('img').animate({'opacity': .25}, 300, 'easeOutCubic');
        });
        jQuery('#main-wrapper a.videoBtnBox').on("mouseleave", function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).find('img').animate({'opacity': 1}, 300, 'easeInCubic');
        });
        jQuery('#main-wrapper a.videoBtnBox').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var vidPath = jQuery(this).find('.data').html();
            if (jQuery('html').hasClass('breakpoint-desktop'))
            {
                OBJ_SECT.slideInfoLayer(OBJ_MAIN.getIntroPlayed(), 'video', vidPath);
            }
            else
            {
                jQuery('body').stop().css('overflow-y', 'hidden');
                jQuery('#video-modal').fadeIn(300, 'easeOutCubic', function() {
                    jQuery('body').stop().css('overflow-y', 'hidden');
                    jQuery('#video-modal .container').html(OBJ_SECT.buildInVideo(vidPath));
                });
            }
        });


        jQuery('#main-wrapper a.photoBtnBox').on("mouseenter", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (jQuery('html').hasClass('breakpoint-desktop')) jQuery(this).find('.cover').fadeIn(300, 'easeOutCubic');
        });
        jQuery('#main-wrapper a.photoBtnBox').on("mouseleave", function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).find('.cover').fadeOut(300, 'easeInCubic');
        });
        jQuery('#main-wrapper a.photoBtnBox').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (jQuery('html').hasClass('breakpoint-desktop'))
            {
                var imgPath = jQuery(this).find('.data').html();
                var imgID = jQuery('#media-wrapper .photobox .data').each(function(i) {
                    if (jQuery(this).html() == imgPath) setCurPhotoID(i);
                });
                OBJ_SECT.slideInfoLayer(OBJ_MAIN.getIntroPlayed(), 'photo', (imgPath));
            }
        });


        jQuery('#main-wrapper a.mapBtn').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            
            if (jQuery('html').hasClass('breakpoint-desktop')) OBJ_SECT.slideInfoLayer(OBJ_MAIN.getIntroPlayed(), 'map');
            else window.open(jQuery(this).attr('href').substring(1));
        });


        jQuery('#main-wrapper a.speaker').on("mouseenter", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (jQuery('html').hasClass('breakpoint-desktop'))
            {
                var elm = jQuery(this).find('.card .speaker-bio');
                jQuery(this).find('.card').fadeIn(300, 'easeOutCubic');
                elm.css('margin-top', (-1*(elm.height()*.5))+'px');
            }
        });
        jQuery('#main-wrapper a.speaker').on("mouseleave", function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).find('.card').fadeOut(300, 'easeInCubic');
        });
        jQuery('#main-wrapper a.speaker').on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            // resets the span tags after clicking a speaker w/ multiple titles
            if ( jQuery('#speakers-modal .title').length == 2){
                jQuery('#speakers-modal .title').eq(1).addClass('company').removeClass('title');
            }
            jQuery('#speakers-modal .name').html(jQuery(this).find('.data span').eq(0).html());
            jQuery('#speakers-modal .title').html(jQuery(this).find('.data span').eq(1).html());
            jQuery('#speakers-modal .company').html(jQuery(this).find('.data span').eq(2).html());
            if (jQuery(this).find('.data span').eq(3).html() != "" && jQuery(this).find('.data span').eq(3).html() != undefined)
            {
                jQuery('#speakers-modal .title').append(', ');
                jQuery('#speakers-modal .company').addClass('title').removeClass('company');
            }
            jQuery('#speakers-modal p').html(jQuery(this).find('.data span').eq(4).html());
            jQuery('#speakers-modal img').attr('src', jQuery(this).find('.data span').eq(5).html());
            jQuery('body').stop().css('overflow-y', 'hidden');
            jQuery('#speakers-modal').fadeIn(300, 'easeOutCubic', function(){
                jQuery('body').stop().css('overflow-y', 'hidden');
            });
        });
        
        jQuery('a[data-role="ajax"]').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("YO");
            jQuery('#nav-toggle').removeClass('open');
            jQuery('#header .navigation').slideUp(0);
            jQuery('body').removeClass('navigation-open');

            

            if (Modernizr.history)
            {
                var pageName = jQuery(this).attr("href");
                var pagePath = String(window.location);

                //pageName = pageName.substring(myDomain.length); 

                if (pageName != pagePath)
                {
                    // console.log(pageName);
                    window.history.pushState(null, "", pageName);
                    OBJ_MAIN.navigateToPage('top');
                }
            }
            else
            {
                window.location = pageName;
                jQuery(window).scrollTop(0);
                console.log(jQuery(".body-content").html());
            }
        });

        if (firstTime)
        {
    		jQuery('#speakers-modal a.closeBtn').click(function(e){
        		e.preventDefault();
        		e.stopPropagation();
        		jQuery('#speakers-modal').fadeOut(300, 'easeInCubic', function(){
                    // jQuery('body').stop().css('overflow-y', 'auto');
                    jQuery('body').removeAttr('style');
                });
        	});

            jQuery('#video-modal a.closeBtn').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                jQuery('#video-modal').fadeOut(300, 'easeInCubic', function(){
                    jQuery('body').removeAttr('style');
                    jQuery('#video-modal .container').html('');
                });
            });

        	jQuery('#media-wrapper a.closeBtn').click(function(e){
        		e.preventDefault();
        		e.stopPropagation();
        		OBJ_SECT.slideInfoLayer(OBJ_MAIN.getIntroPlayed());
                OBJ_MAIN.slickOff();
        	});

            jQuery('#media-wrapper a.photoNavBtn.left').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                jQuery('#media-wrapper a.photoNavBtn.left').animate({
                    'marginLeft': '5px'
                },75,'easeOutCubic').animate({
                    'marginLeft': '10px'
                },300,'easeInCubic');

                animPhoto('left');
            });
            jQuery('#media-wrapper a.photoNavBtn.right').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                jQuery('#media-wrapper a.photoNavBtn.right').animate({
                    'marginRight': '5px'
                },75,'easeOutCubic').animate({
                    'marginRight': '10px'
                },300,'easeInCubic');

                animPhoto('right');
            });
        }
    };

	return {
		init: init
	};

})();

//-----------------------------------------------------------------------------------------------
