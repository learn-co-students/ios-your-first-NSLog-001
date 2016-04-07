
      var $chartbeat = document.getElementById('chartbeat')
      var _sf_async_config = {
         uid: 57320,
         domain: 'swr3.de',
         useCanonical: ($chartbeat.getAttribute('data-useCanonical') == 'false' ? false : true)
      }
      if ($chartbeat.getAttribute('data-path')) {
         _sf_async_config.path = $chartbeat.getAttribute('data-path')
      }
      _sf_async_config.sections = $chartbeat.getAttribute('data-sections')
      _sf_async_config.authors = 'SWR3 CMS';
      
      (function() {
         function loadChartbeat() {
            window._sf_endpt = (new Date()).getTime()
            var e = document.createElement('script')
            e.setAttribute('language', 'javascript')
            e.setAttribute('type', 'text/javascript')
            e.setAttribute('src','//static.chartbeat.com/js/chartbeat.js')
            document.body.appendChild(e)
         }
         var oldonload = window.onload
         window.onload = (typeof window.onload != 'function') ?
            loadChartbeat : function() { oldonload(), loadChartbeat()
         }
      })()
   