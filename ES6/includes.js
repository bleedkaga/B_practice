if(!Array.prototype.includes){
	Object.defineProperties(Array.prototype, 'includes', {
		value: function( searchElement, fromIndex){
			if(this == null){
				throw new TypeError('"this" is null or not defined')
			}
			
			var o = Object( this );
			
			var len = o.length >>> 0;
			
			if(len == 0) return false;
			
			var n = fromIndex | 0;
			
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
			
			while (k < len) {
							// a. Let elementK be the result of ? Get(O, ! ToString(k)).
							// b. If SameValueZero(searchElement, elementK) is true, return true.
							// c. Increase k by 1.
							// NOTE: === provides the correct "SameValueZero" comparison needed here.
							if (o[k] === searchElement) {
								return true;
							}
							k++;
						}
						return false;
		}
	})
}