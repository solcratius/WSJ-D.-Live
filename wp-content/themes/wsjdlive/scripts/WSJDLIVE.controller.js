
'use strict';

var WSJDLIVE = WSJDLIVE || {};

(function() {

	WSJDLIVE.namespace = function(nsString) {

	    var parts 	= nsString.split( '.' ),
	        parent 	= WSJDLIVE,
	        i;

	    if ( parts[0] === 'WSJDLIVE' ) {
	    	parts = parts.slice(1);
	    }

	    for ( i = 0; i < parts.length; i += 1 ) {
	    	if ( typeof parent[ parts[i] ] === 'undefined' ) {
	        	parent[ parts[i] ] = {};
	      	}
	      	parent = parent[ parts[i] ];
	    }

	    return parent;

	};
}());

//-----------------------------------------------------------------------------------------------
WSJDLIVE.namespace( 'controller' );

WSJDLIVE.controller = (function() {

  	var init = function init() {
  		handlers();
  		
    	var doc = document.documentElement;
    	doc.setAttribute('data-useragent', navigator.userAgent);
	};

    function handlers() {
    	jQuery(window).load(function() {
    		WSJDLIVE.main.nav.init();
    		WSJDLIVE.main.landing.init();
    		WSJDLIVE.main.init();
    	});
    };

	return {
		init: init
	};

})();

//-----------------------------------------------------------------------------------------------
jQuery(document).ready(function() {
	WSJDLIVE.controller.init();
});
