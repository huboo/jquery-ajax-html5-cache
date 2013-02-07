// comes from this repository: github.com/paulirish/jquery-ajax-localstorage-cache

$.ajaxPrefilter(function(options, originalOptions, jqXHR){
	// Cache it ?
	if( ! window.localStorage || ! options.localCache)
		return;

	// cache ttl in seconds
	var ttl = options.cacheTTL || 60,
		cached = localStorage.getItem(options.cacheKey);

	if( ! options.forceCache){
		if(cached){
			cached = JSON.parse(cached);
			// if cache expired
			if(cached.ttl < +new Date()){
				localStorage.removeItem(options.cacheKey);
			}else{
				options.success(cached.cache);
				// Abort is broken on JQ 1.5 :(
				jqXHR.abort();
				return;
			}
		}
	}

	// start the request
	//If it not in the cache, we change the success callback, just put data on localstorage and after that apply the initial callback
	if(options.success){
		options.realsuccess = options.success;
	}

	options.success = function(data){
		var strdata = data,
			cache = {ttl: +new Date() + 1000 * ttl, cache: data};
		if(options.dataType.indexOf('json') === 0)
			strdata = JSON.stringify(cache);

		// Save the data to localStorage catching exceptions (possibly QUOTA_EXCEEDED_ERR)
		try{
			localStorage.setItem(options.cacheKey, strdata);
		}catch(e){
			// Remove any incomplete data that may have been saved before the exception was caught
			localStorage.removeItem(options.cacheKey);
			if(options.cacheError)
				options.cacheError(e, options.cacheKey, strdata);
		}

		if (options.realsuccess)
			options.realsuccess(data);
	}
})
