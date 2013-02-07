jquery-ajax-html5-cache
=======================

A cache for ajax request to reduce the requests.

Usage:
---------

``` js
$.ajax({
	url: 'test.json',
	dataType: 'json',
	localCache: true, 		// enable localStorage
	forceCache: false, 		// force to make an ajax request and cache it
	cacheKey: 'mydata', 	// the item name in the localStorage
	cacheTTL: 3, 			// the cache live for how long in seconds, default is 60 sec
	success: function(o){
		console.log(o);
	}
})
```
