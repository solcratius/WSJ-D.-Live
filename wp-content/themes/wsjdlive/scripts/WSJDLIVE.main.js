WSJDLIVE.namespace( 'main' );

WSJDLIVE.main = (function() {
	var OBJ_NAV,
		OBJ_SECT;
	
	var myDomain,
		winW,
		winH,
		mediaWinW,
		photoW,
		photoH,
		winAspectRatio,
		photoAspectRatio,
		firstTime = true,
		introPlayed = false,
		popStateEventCount = 0,
		MEDIA_STATE = 0,
		PAGE_ID = 0,
		pageArray = ['HOME', 'ABOUT', 'SCHEDULE', 'SPEAKERS', 'SPONSORS', 'CONTACT'];

	var CACHE_COOKIE = 'loadedFromBrowserCache';

  	var init = function init() {
  		OBJ_NAV = WSJDLIVE.main.nav;
  		OBJ_SECT = WSJDLIVE.main.landing;
  		myDomain = jQuery('h1 a').attr('href');

		photoW = 1280;
		photoH = 852;
		photoAspectRatio = (photoH*100)/photoW;

  		getWinD();
  		styleSet();
  		
  		jQuery(window).resize(function(){
  			getWinD();
  			styleSet();
        });

        jQuery(window).on('popstate', function (e) {
		    this.popStateEventCount++;
		    // if (jQuery.browser.webkit && this.popStateEventCount == 1) return;
		    if (this.popStateEventCount == 1) return;
		    navigateToPage();
		});

        handlers();

        if (introPlayed)
  		{
			skipIntro();
		}
		else
		{
			if (localStorage.wsjdliveExperienced)
	  		{
				introSequence(0);
			}
			else
			{
				localStorage.wsjdliveExperienced = true;
	  			introSequence(3000);
			}
		}
		
		if (firstTime)
		{
			navigateToPage();
			firstTime = false;
		}
	};
	
	var getWinD = function getWinD() {
		winW = getWinW();
		winH = getWinH();
	}

	var styleSet = function styleSet() {
		if (jQuery('html').hasClass('breakpoint-phone') || jQuery('html').hasClass('breakpoint-small-tablet') || jQuery('html').hasClass('breakpoint-tablet'))
		{
			if (introPlayed) jQuery('#media-wrapper .registerbox').css('left', ((winW-320)*.5) +'px');
			if (MEDIA_STATE != 0) OBJ_SECT.slideInfoLayer(introPlayed);

			jQuery('a.photoBtnBox').each(function(i) {
				jQuery(this).find('img').attr('src', jQuery(this).find('.data').html());
			});
			
			slickOn();
		}
		else
		{
			if (jQuery('body').css('overflow-y') != 'hidden') jQuery('body').removeAttr('style');
			mediaWinW = winW-jQuery('#main-wrapper').width();
			if (mediaWinW < 300) mediaWinW = 384;
			if (introPlayed)
			{
				if (MEDIA_STATE == 1)
				{
					jQuery('#main-wrapper').css('right', (-1*(jQuery('#main-wrapper').width()-15))+'px');
				}
				else if (MEDIA_STATE == 2)
				{
					//MEDIA.find('.mapbox').css('width', mediaWinW+'px');
					//jQuery('#main-wrapper').removeAttr('style');
					jQuery('#main-wrapper').css('right', (-1*(jQuery('#main-wrapper').width()-15))+'px');
				}
				else
				{
					jQuery('#main-wrapper').removeAttr('style');
				}
				jQuery('#media-wrapper .registerbox').css('left', ((mediaWinW-320)*.5) +'px');
			}

			if (winH > (jQuery('#media-wrapper .registerbox').height()+50)) jQuery('#media-wrapper .registerbox').css('top', (((winH-jQuery('#media-wrapper .registerbox').height())*.5)+25) +'px');
			else jQuery('#media-wrapper .registerbox').css('top', '50px');
			slickOff();
			setPhotoRatio();

			if (jQuery('#video-modal .container').html() != '')
			{
				jQuery('#video-modal .container').html('');
				jQuery('#video-modal').removeAttr('style');
			}
		}
	};

	var setPhotoRatio = function setPhotoRatio() {
		winAspectRatio = (winH*100)/winW;
		
		if (winAspectRatio >= photoAspectRatio)
		{
			jQuery('#media-wrapper .photobox ul li img').css({
				'width': 'auto',
				'height': winH+'px',
				'marginTop': -1*(winH*.5) + 'px',
				'marginLeft': -1*(((photoW*winH)/photoH)*.5) + 'px'
			});
		}
		else
		{
			jQuery('#media-wrapper .photobox ul li img').css({
				'width': winW+'px',
				'height': 'auto',
				'marginTop': -1*(((photoH*winW)/photoW)*.5) + 'px',
				'marginLeft': -1*(winW*.5) + 'px'
			});
		}
	};

	var introSequence = function introSequence(delay) {
		jQuery('html, body').animate({scrollTop: 0}, 100);
		jQuery('#media-wrapper .registerbox').css({
			'top': ((winH-jQuery('#media-wrapper .registerbox').height())*.5) +'px',
			'left': ((winW-320)*.5) +'px',
			'display': 'block'
		});

		if (jQuery('html').hasClass('breakpoint-phone') || jQuery('html').hasClass('breakpoint-small-tablet') || jQuery('html').hasClass('breakpoint-tablet'))
		{
			jQuery('#main-wrapper').css('top', winH + 'px');
			jQuery('#main-wrapper').css('display', 'block');

			setTimeout(function(){
				jQuery('#media-wrapper .registerbox').animate({
					'top': '2px'
				}, 750, 'easeInOutQuad');

				jQuery('#main-wrapper').animate({
					'top': 0
				}, 750, 'easeInOutCubic', function(){
					jQuery('#header').addClass('introPlayed');
					jQuery('#main-wrapper').removeAttr('style');
					introPlayed = true;
					jQuery('body').css('overflow-y', 'auto');
					jQuery('#main-wrapper').addClass('anim');
				});
			}, delay+500);
		}
		else
		{
			if (winW < 1164) jQuery('#main-wrapper').css('right', '-640px');
			else jQuery('#main-wrapper').css('right', '-55%');
			jQuery('#main-wrapper').css('display', 'block');

			setTimeout(function(){
				jQuery('#media-wrapper .registerbox').animate({
					'left': ((mediaWinW-320)*.5) +'px'
				}, 750, 'easeInOutQuad');

				jQuery('#main-wrapper').animate({
					'right': '0'
				}, 750, 'easeInOutCubic', function(){
					jQuery('#header').addClass('introPlayed');
					jQuery('#main-wrapper').removeAttr('style');
					introPlayed = true;
					jQuery('body').css('overflow-y', 'auto');
					jQuery('#main-wrapper').addClass('anim');
				});
			}, delay+500);
		}
	};

	var skipIntro = function skipIntro() {
		jQuery('#media-wrapper .registerbox').removeAttr('style');
		jQuery('#media-wrapper .registerbox').css('display', 'block');
		jQuery('#header').addClass('introPlayed');
		jQuery('#main-wrapper').removeAttr('style');
		jQuery('body').css('overflow-y', 'auto');
		jQuery('#main-wrapper').addClass('anim');
		styleSet();
	};

	var setMediaState = function setMediaState(n) {
		MEDIA_STATE = n;
	};

	var getWinW = function getWinW() {
		return jQuery(window).width();
	};
	
	var getWinH = function getWinH() {
		return jQuery(window).height();
	};
	
	var rNumGenerator = function rNumGenerator(num) {
		return Math.floor(Math.random()*num);
    };

    var getMediaWinW = function getMediaWinW() {
    	return mediaWinW;
    };

    var getPageId = function getPageId() {
		return PAGE_ID;
    };

    var getIntroPlayed = function getIntroPlayed() {
		return introPlayed;
    };
    
    var setMediaContent = function setMediaContent() {
    	var pageName = getPageName().replace(/\.[^/.]+$/, "").toUpperCase();
    	if (pageName == '') pageName = 'HOME';
    	if (pageName.indexOf('#') > -1) pageName = pageName.slice(0, pageName.indexOf('#')-1);

    	for (var i = 0; i < pageArray.length; i ++)
    	{
    		if (pageArray[i] == pageName) PAGE_ID = i;
    	}

    	//console.log(pageName+", "+PAGE_ID);
		OBJ_SECT.slideInfoLayer(introPlayed, 'bg', PAGE_ID);
    };

	var getPageName = function getPageName() {
	    var pathName = String(window.location),
	    	pageName = '';

	        pageName = pathName.substring(myDomain.length);
	        pageName = pageName.slice(0, -1);
	        
	    return pageName;
	};

	var navigateToPage = function navigateToPage(scroll) {
		var pageName = String(window.location);
		//console.log("NavigateToPage Fired");
		jQuery.get(pageName, function (response) {
			var markup = jQuery("<div>" + response + "</div>"),
				fragment = markup.find(".body-content").html();

			jQuery(".body-content").html(fragment).fadeOut(0);
			jQuery(".body-content").fadeIn(500, 'easeOutCubic');

			if (!firstTime) {
				//init();
				OBJ_NAV.init();
			}

			jQuery("a.main-nav").each(function(i) {
				if (pageArray[i] == getPageName().toUpperCase()) jQuery(this).addClass('selected');
				else jQuery(this).removeClass('selected');
			});

			if (getPageName().toUpperCase() == '') jQuery("a.main-nav").eq(0).addClass('selected');
			if (scroll == 'top') jQuery(window).scrollTop(0);

			var hashLink = window.location.hash;

			if (hashLink)
			{
	            var target = jQuery(hashLink);
	            var navOffset = (jQuery('html').hasClass('breakpoint-tablet')) ? 65 : 60;
	            if (jQuery('html').hasClass('breakpoint-desktop')) navOffset = 50;

	            if (target.length)
	            {
	            	var myY = ((target.offset().top > 0) ? target.offset().top - navOffset : 0);
	                jQuery('html,body').delay(150).animate({
	                    scrollTop: myY
	                }, 800, 'easeInOutCubic');
	                return false;
	            }
			}
		});
		
		setMediaContent();
	};

	var slickOn = function slickOn() {
		if(!jQuery('#highlights .thumb-container').hasClass('slick-initialized'))
		{
			jQuery('#highlights .thumb-container').slick({
				dots: true,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				adaptiveHeight: true,
				centerMode: true,
				arrows: false,
				swipe: true,
				centerPadding: '0'
			});
		}
	};

	var slickOff = function slickOff() {
		if(jQuery('#highlights .thumb-container').hasClass('slick-initialized'))
		{
			jQuery('#highlights .thumb-container').slick("unslick");
		}
	};

    function handlers() {
    	if (firstTime)
    	{
		    jQuery('#nav-toggle').click(function (e) {
		        e.preventDefault();
		        e.stopPropagation();

		        jQuery(this).toggleClass('open');
		        jQuery('#header .navigation').slideToggle();
		        jQuery('body').toggleClass('navigation-open');
		        return false;
		    });

		    jQuery('#back-to-top').click(function (e) {
		        e.preventDefault();
		        e.stopPropagation();

                jQuery('html,body').animate({
                    scrollTop: 0
                }, 800, 'easeInOutCubic');
                return false;
		    });
		}

	 //    jQuery('a[data-role="ajax"]').click(function (e) {
	 //    	e.preventDefault();
		//     e.stopPropagation();
		//     console.log("YO");
	 //    	jQuery('#nav-toggle').removeClass('open');
	 //        jQuery('#header .navigation').slideUp(0);
	 //        jQuery('body').removeClass('navigation-open');

		//     if (Modernizr.history)
		//     {
		//         var pageName = jQuery(this).attr("href");
		//         var pagePath = String(window.location);

		//         //pageName = pageName.substring(myDomain.length); 

		// 		if (pageName != pagePath)
		// 		{
		// 			// console.log(pageName);
		// 			window.history.pushState(null, "", pageName);
		//         	navigateToPage('top');
		// 		}
		//     }
		//     else
		//     {
		//     	jQuery(window).scrollTop(0);
		//     }
		// });

	    jQuery('.social-share').sharrre({
		    share: {
		      twitter: true,
		      facebook: true
		    },
		    template: '<a class="social facebook" id="facebook" href="">Facebook</a><a class="social twitter" id="twitter" href="">Twitter</a>',
		    enableHover: false,
		    enableTracking: false,
		    render: function(api, options) {
		        jQuery(api.element).on('click', '.twitter', function() {
		        	api.openPopup('twitter');
		        });
		        jQuery(api.element).on('click', '.facebook', function() {
		        	api.openPopup('facebook');
		        });
		    }
		});
    };

	return {
		init: init,
		getWinW: getWinW,
		getWinH: getWinH,
		rNumGenerator: rNumGenerator,
		getMediaWinW: getMediaWinW,
		getPageId: getPageId,
		getIntroPlayed: getIntroPlayed,
		setMediaState: setMediaState,
		setPhotoRatio: setPhotoRatio,
		slickOn: slickOn,
		slickOff: slickOff,
		navigateToPage: navigateToPage
	};

})();

/*!
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.5
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
;(function(g,i,j,b){var h="sharrre",f={className:"sharrre",share:{googlePlus:false,facebook:false,twitter:false,digg:false,delicious:false,stumbleupon:false,linkedin:false,pinterest:false},shareTotal:0,template:"",title:"",url:j.location.href,text:j.title,urlCurl:"sharrre.php",count:{},total:0,shorterTotal:true,enableHover:true,enableCounter:true,enableTracking:false,hover:function(){},hide:function(){},click:function(){},render:function(){},buttons:{googlePlus:{url:"",urlCount:false,size:"medium",lang:"en-US",annotation:""},facebook:{url:"",urlCount:false,action:"like",layout:"button_count",width:"",send:"false",faces:"false",colorscheme:"",font:"",lang:"en_US"},twitter:{url:"",urlCount:false,count:"horizontal",hashtags:"",via:"",related:"",lang:"en"},digg:{url:"",urlCount:false,type:"DiggCompact"},delicious:{url:"",urlCount:false,size:"medium"},stumbleupon:{url:"",urlCount:false,layout:"1"},linkedin:{url:"",urlCount:false,counter:""},pinterest:{url:"",media:"",description:"",layout:"horizontal"}}},c={googlePlus:"",facebook:"https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",twitter:"http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",digg:"http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",delicious:"http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",stumbleupon:"",linkedin:"http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",pinterest:"http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"},l={googlePlus:function(m){var n=m.options.buttons.googlePlus;g(m.element).find(".buttons").append('<div class="button googleplus"><div class="g-plusone" data-size="'+n.size+'" data-href="'+(n.url!==""?n.url:m.options.url)+'" data-annotation="'+n.annotation+'"></div></div>');i.___gcfg={lang:m.options.buttons.googlePlus.lang};var o=0;if(typeof gapi==="undefined"&&o==0){o=1;(function(){var p=j.createElement("script");p.type="text/javascript";p.async=true;p.src="//apis.google.com/js/plusone.js";var q=j.getElementsByTagName("script")[0];q.parentNode.insertBefore(p,q)})()}else{gapi.plusone.go()}},facebook:function(m){var n=m.options.buttons.facebook;g(m.element).find(".buttons").append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(n.url!==""?n.url:m.options.url)+'" data-send="'+n.send+'" data-layout="'+n.layout+'" data-width="'+n.width+'" data-show-faces="'+n.faces+'" data-action="'+n.action+'" data-colorscheme="'+n.colorscheme+'" data-font="'+n.font+'" data-via="'+n.via+'"></div></div>');var o=0;if(typeof FB==="undefined"&&o==0){o=1;(function(t,p,u){var r,q=t.getElementsByTagName(p)[0];if(t.getElementById(u)){return}r=t.createElement(p);r.id=u;r.src="//connect.facebook.net/"+n.lang+"/all.js#xfbml=1";q.parentNode.insertBefore(r,q)}(j,"script","facebook-jssdk"))}else{FB.XFBML.parse()}},twitter:function(m){var n=m.options.buttons.twitter;g(m.element).find(".buttons").append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(n.url!==""?n.url:m.options.url)+'" data-count="'+n.count+'" data-text="'+m.options.text+'" data-via="'+n.via+'" data-hashtags="'+n.hashtags+'" data-related="'+n.related+'" data-lang="'+n.lang+'">Tweet</a></div>');var o=0;if(typeof twttr==="undefined"&&o==0){o=1;(function(){var q=j.createElement("script");q.type="text/javascript";q.async=true;q.src="//platform.twitter.com/widgets.js";var p=j.getElementsByTagName("script")[0];p.parentNode.insertBefore(q,p)})()}else{g.ajax({url:"//platform.twitter.com/widgets.js",dataType:"script",cache:true})}},digg:function(m){var n=m.options.buttons.digg;g(m.element).find(".buttons").append('<div class="button digg"><a class="DiggThisButton '+n.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((n.url!==""?n.url:m.options.url))+'"></a></div>');var o=0;if(typeof __DBW==="undefined"&&o==0){o=1;(function(){var q=j.createElement("SCRIPT"),p=j.getElementsByTagName("SCRIPT")[0];q.type="text/javascript";q.async=true;q.src="//widgets.digg.com/buttons.js";p.parentNode.insertBefore(q,p)})()}},delicious:function(o){if(o.options.buttons.delicious.size=="tall"){var p="width:50px;",n="height:35px;width:50px;font-size:15px;line-height:35px;",m="height:18px;line-height:18px;margin-top:3px;"}else{var p="width:93px;",n="float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",m="float:left;height:20px;line-height:20px;"}var q=o.shorterTotal(o.options.count.delicious);if(typeof q==="undefined"){q=0}g(o.element).find(".buttons").append('<div class="button delicious"><div style="'+p+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="'+n+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+q+'</div><div style="'+m+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');g(o.element).find(".delicious").on("click",function(){o.openPopup("delicious")})},stumbleupon:function(m){var n=m.options.buttons.stumbleupon;g(m.element).find(".buttons").append('<div class="button stumbleupon"><su:badge layout="'+n.layout+'" location="'+(n.url!==""?n.url:m.options.url)+'"></su:badge></div>');var o=0;if(typeof STMBLPN==="undefined"&&o==0){o=1;(function(){var p=j.createElement("script");p.type="text/javascript";p.async=true;p.src="//platform.stumbleupon.com/1/widgets.js";var q=j.getElementsByTagName("script")[0];q.parentNode.insertBefore(p,q)})();s=i.setTimeout(function(){if(typeof STMBLPN!=="undefined"){STMBLPN.processWidgets();clearInterval(s)}},500)}else{STMBLPN.processWidgets()}},linkedin:function(m){var n=m.options.buttons.linkedin;g(m.element).find(".buttons").append('<div class="button linkedin"><script type="in/share" data-url="'+(n.url!==""?n.url:m.options.url)+'" data-counter="'+n.counter+'"><\/script></div>');var o=0;if(typeof i.IN==="undefined"&&o==0){o=1;(function(){var p=j.createElement("script");p.type="text/javascript";p.async=true;p.src="//platform.linkedin.com/in.js";var q=j.getElementsByTagName("script")[0];q.parentNode.insertBefore(p,q)})()}else{i.IN.init()}},pinterest:function(m){var n=m.options.buttons.pinterest;g(m.element).find(".buttons").append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(n.url!==""?n.url:m.options.url)+"&media="+n.media+"&description="+n.description+'" class="pin-it-button" count-layout="'+n.layout+'">Pin It</a></div>');(function(){var o=j.createElement("script");o.type="text/javascript";o.async=true;o.src="//assets.pinterest.com/js/pinit.js";var p=j.getElementsByTagName("script")[0];p.parentNode.insertBefore(o,p)})()}},d={googlePlus:function(){},facebook:function(){fb=i.setInterval(function(){if(typeof FB!=="undefined"){FB.Event.subscribe("edge.create",function(m){_gaq.push(["_trackSocial","facebook","like",m])});FB.Event.subscribe("edge.remove",function(m){_gaq.push(["_trackSocial","facebook","unlike",m])});FB.Event.subscribe("message.send",function(m){_gaq.push(["_trackSocial","facebook","send",m])});clearInterval(fb)}},1000)},twitter:function(){tw=i.setInterval(function(){if(typeof twttr!=="undefined"){twttr.events.bind("tweet",function(m){if(m){_gaq.push(["_trackSocial","twitter","tweet"])}});clearInterval(tw)}},1000)},digg:function(){},delicious:function(){},stumbleupon:function(){},linkedin:function(){function m(){_gaq.push(["_trackSocial","linkedin","share"])}},pinterest:function(){}},a={googlePlus:function(m){i.open("https://plus.google.com/share?hl="+m.buttons.googlePlus.lang+"&url="+encodeURIComponent((m.buttons.googlePlus.url!==""?m.buttons.googlePlus.url:m.url)),"","toolbar=0, status=0, width=900, height=500")},facebook:function(m){i.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((m.buttons.facebook.url!==""?m.buttons.facebook.url:m.url))+"&t="+m.text+"","","toolbar=0, status=0, width=900, height=500")},twitter:function(m){i.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(m.text)+"&url="+encodeURIComponent((m.buttons.twitter.url!==""?m.buttons.twitter.url:m.url))+(m.buttons.twitter.via!==""?"&via="+m.buttons.twitter.via:""),"","toolbar=0, status=0, width=650, height=360")},digg:function(m){i.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((m.buttons.digg.url!==""?m.buttons.digg.url:m.url))+"&title="+m.text+"&related=true&style=true","","toolbar=0, status=0, width=650, height=360")},delicious:function(m){i.open("http://www.delicious.com/save?v=5&noui&jump=close&url="+encodeURIComponent((m.buttons.delicious.url!==""?m.buttons.delicious.url:m.url))+"&title="+m.text,"delicious","toolbar=no,width=550,height=550")},stumbleupon:function(m){i.open("http://www.stumbleupon.com/badge/?url="+encodeURIComponent((m.buttons.delicious.url!==""?m.buttons.delicious.url:m.url)),"stumbleupon","toolbar=no,width=550,height=550")},linkedin:function(m){i.open("https://www.linkedin.com/cws/share?url="+encodeURIComponent((m.buttons.delicious.url!==""?m.buttons.delicious.url:m.url))+"&token=&isFramed=true","linkedin","toolbar=no,width=550,height=550")},pinterest:function(m){i.open("http://pinterest.com/pin/create/button/?url="+encodeURIComponent((m.buttons.pinterest.url!==""?m.buttons.pinterest.url:m.url))+"&media="+encodeURIComponent(m.buttons.pinterest.media)+"&description="+m.buttons.pinterest.description,"pinterest","toolbar=no,width=700,height=300")}};function k(n,m){this.element=n;this.options=g.extend(true,{},f,m);this.options.share=m.share;this._defaults=f;this._name=h;this.init()}k.prototype.init=function(){var m=this;if(this.options.urlCurl!==""){c.googlePlus=this.options.urlCurl+"?url={url}&type=googlePlus";c.stumbleupon=this.options.urlCurl+"?url={url}&type=stumbleupon"}g(this.element).addClass(this.options.className);if(typeof g(this.element).data("title")!=="undefined"){this.options.title=g(this.element).attr("data-title")}if(typeof g(this.element).data("url")!=="undefined"){this.options.url=g(this.element).data("url")}if(typeof g(this.element).data("text")!=="undefined"){this.options.text=g(this.element).data("text")}g.each(this.options.share,function(n,o){if(o===true){m.options.shareTotal++}});if(m.options.enableCounter===true){g.each(this.options.share,function(n,p){if(p===true){try{m.getSocialJson(n)}catch(o){}}})}else{if(m.options.template!==""){this.options.render(this,this.options)}else{this.loadButtons()}}g(this.element).hover(function(){if(g(this).find(".buttons").length===0&&m.options.enableHover===true){m.loadButtons()}m.options.hover(m,m.options)},function(){m.options.hide(m,m.options)});g(this.element).click(function(){m.options.click(m,m.options);return false})};k.prototype.loadButtons=function(){var m=this;g(this.element).append('<div class="buttons"></div>');g.each(m.options.share,function(n,o){if(o==true){l[n](m);if(m.options.enableTracking===true){d[n]()}}})};k.prototype.getSocialJson=function(o){var m=this,p=0,n=c[o].replace("{url}",encodeURIComponent(this.options.url));if(this.options.buttons[o].urlCount===true&&this.options.buttons[o].url!==""){n=c[o].replace("{url}",this.options.buttons[o].url)}if(n!=""&&m.options.urlCurl!==""){g.getJSON(n,function(r){if(typeof r.count!=="undefined"){var q=r.count+"";q=q.replace("\u00c2\u00a0","");p+=parseInt(q,10)}else{if(r.data&&r.data.length>0&&typeof r.data[0].total_count!=="undefined"){p+=parseInt(r.data[0].total_count,10)}else{if(typeof r[0]!=="undefined"){p+=parseInt(r[0].total_posts,10)}else{if(typeof r[0]!=="undefined"){}}}}m.options.count[o]=p;m.options.total+=p;m.renderer();m.rendererPerso()}).error(function(){m.options.count[o]=0;m.rendererPerso()})}else{m.renderer();m.options.count[o]=0;m.rendererPerso()}};k.prototype.rendererPerso=function(){var m=0;for(e in this.options.count){m++}if(m===this.options.shareTotal){this.options.render(this,this.options)}};k.prototype.renderer=function(){var n=this.options.total,m=this.options.template;if(this.options.shorterTotal===true){n=this.shorterTotal(n)}if(m!==""){m=m.replace("{total}",n);g(this.element).html(m)}else{g(this.element).html('<div class="box"><a class="count" href="#">'+n+"</a>"+(this.options.title!==""?'<a class="share" href="#">'+this.options.title+"</a>":"")+"</div>")}};k.prototype.shorterTotal=function(m){if(m>=1000000){m=(m/1000000).toFixed(2)+"M"}else{if(m>=1000){m=(m/1000).toFixed(1)+"k"}}return m};k.prototype.openPopup=function(m){a[m](this.options);if(this.options.enableTracking===true){var n={googlePlus:{site:"Google",action:"+1"},facebook:{site:"facebook",action:"like"},twitter:{site:"twitter",action:"tweet"},digg:{site:"digg",action:"add"},delicious:{site:"delicious",action:"add"},stumbleupon:{site:"stumbleupon",action:"add"},linkedin:{site:"linkedin",action:"share"},pinterest:{site:"pinterest",action:"pin"}};_gaq.push(["_trackSocial",n[m].site,n[m].action])}};k.prototype.simulateClick=function(){var m=g(this.element).html();g(this.element).html(m.replace(this.options.total,this.options.total+1))};k.prototype.update=function(m,n){if(m!==""){this.options.url=m}if(n!==""){this.options.text=n}};g.fn[h]=function(n){var m=arguments;if(n===b||typeof n==="object"){return this.each(function(){if(!g.data(this,"plugin_"+h)){g.data(this,"plugin_"+h,new k(this,n))}})}else{if(typeof n==="string"&&n[0]!=="_"&&n!=="init"){return this.each(function(){var o=g.data(this,"plugin_"+h);if(o instanceof k&&typeof o[n]==="function"){o[n].apply(o,Array.prototype.slice.call(m,1))}})}}}})(jQuery,window,document);

