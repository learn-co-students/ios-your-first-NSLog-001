if ( initialPageLoad ) {
		history.replaceState( historyObject, pageTitle, pageURL );
	} else {
		history.pushState( historyObject, pageTitle, pageURL );

		// Tell Omniture the user has read this article
		titleObject = document.getElementById( titleID );
		if ( titleObject ) {
			trackData = titleObject.getAttribute( 'data-omniture' );
			scrollType = titleObject.getAttribute( 'data-omniture-scroll-type' );

			allData = {};
			allData.trackData = trackData;
			allData.scrollType = scrollType;

			jQuery.publish( 'article.loaded', [allData] );
		}

		// Update Chartbeat to use current article info
		if ( _sf_async_config ) {
			titleObject = document.getElementById( titleID );
			_sf_async_config.path = document.location.pathname;
			_sf_async_config.title = document.title;
			_sf_async_config.sections = document.location.href.split('/')[3];
			_sf_async_config.authors = titleObject.getAttribute( 'data-short-byline' ).replace( 'By ', '' );
		}
	}

espn.track.chartbeat = function(props) {
	var p = typeof props !== "undefined" ? props : {}, cbUrl, cbName;
	try {
		cbUrl = p.section || document.location.href.split('/')[3];
		cbName = p.pagename || document.title;
		// set sections, authors and zones before virtualPage call
		window._sf_async_config.path = p.path || cbUrl;
		window._sf_async_config.title = p.title || cbName;
		window._sf_async_config.sections = p.sections || cbUrl;
		window._sf_async_config.authors = p.authors || s_omni.contentType;
		if(typeof ad_site !== 'undefined') { window._sf_async_config.zone = ad_site; }

		pSUPERFLY.virtualPage(cbUrl,cbName);
	}
	catch(e) {}
};