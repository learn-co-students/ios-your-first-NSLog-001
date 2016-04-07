// chartbeat 
if ('undefined' != typeof pSUPERFLY)
 { 
var paramsCB = (options.cb || { 
	useCanonical: ($('#chartbeat').attr('data-useCanonical') == 'false' ? !1 : !0), 
	path: ($('#chartbeat').attr('data-path') || window.location.pathname), 
	sections: ( $('#chartbeat').attr('data-sections') || '') 
})

try { 
console.log(paramsCB) 
} catch (e) {}

_sf_async_config.useCanonical = paramsCB.useCanonical 
_sf_async_config.path = paramsCB.path 
_sf_async_config.sections = paramsCB.sections 

try 
	{ 
	pSUPERFLY.virtualPage((options.url || window.location.pathname), (options.title || document.title)) 
	}
	catch (e)
		 { 
		(console.error || console.log).call(console, e.stack || e) 
		} 
}