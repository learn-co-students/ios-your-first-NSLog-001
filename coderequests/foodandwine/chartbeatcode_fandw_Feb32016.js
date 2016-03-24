  var _sf_async_config={};
  /** CONFIGURATION START **/
  _sf_async_config.uid = 59300;
  _sf_async_config.domain = 'foodandwine.com';
  _sf_async_config.useCanonical = true;
  _sf_async_config.sections = jQuery.extend(Drupal.settings.omniture.prop15);
  _sf_async_config.authors = jQuery.extend(Drupal.settings.omniture.prop19);
  /** CONFIGURATION END **/
  (function(){
    function loadChartbeat() {
      window._sf_endpt=(new Date()).getTime();
      var e = document.createElement('script');
      e.setAttribute('language', 'javascript');
      e.setAttribute('type', 'text/javascript');
      e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
      document.body.appendChild(e);
    }
    var oldonload = window.onload;
    window.onload = (typeof window.onload != 'function') ?
       loadChartbeat : function() { oldonload(); loadChartbeat(); };
  })();  
