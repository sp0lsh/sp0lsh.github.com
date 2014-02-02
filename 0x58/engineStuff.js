
Vec2 = function Vec2 ( foo ) {
	if ( foo === undefined )  {
        this.y = 0;
		this.x = 0;
	} else {
		if ( foo.x && foo.y ) {
			this.x = foo.x;
			this.y = foo.y;
		} else if ( isArray( foo ) ) {
			this.x = foo[0];
			this.y = foo[1];
		}
	}
	
	return this;
}

Vec2.prototype.str = function () {
	var x = Math.round( this.x * 100 ) / 100;
	var y = Math.round( this.y * 100 ) / 100;
	return "( " + x + ", " + y + " )";
}

Vec2.prototype.copy = function ( vec ) {
	this.x = vec.x;
	this.y = vec.y;
}

Vec2.prototype.unitFromAngle = function ( angle ) {
	this.x = Math.cos( angle );
	this.y = Math.sin( angle );
}

Vec2.prototype.toInt = function() {
	var vect = new Vec2( this );
	vect.x = justParseInt( vect.x );
	vect.y = justParseInt( vect.y );
	return vect;
}

Vec2.prototype.normal = function () {
	var magn = VSize( this );
	if ( magn === 0.0 ) {
		magn = 0.000000001;
	}
	
	var normal = new Vec2( this );
	normal.div( magn );
	return normal;
}

Vec2.prototype.lerp = function ( start, end, alpha ) {
	this.x = lerp( start.x, end.x, alpha );
	this.y = lerp( start.y, end.y, alpha );
}

Vec2.prototype.perp = function ( start, end, alpha ) {
	this.x = lerp( start.x, end.x, alpha );
	this.y = lerp( start.y, end.y, alpha );
}

Vec2.prototype.addL = function ( a ) {
		
	if ( isNumber( a ) ) {
		this.x += a;
		this.y += a;
		return this;
	} else if ( a.x && a.y ) {
		this.x += a.x;
		this.y += a.y;
		return this;
	}
}

Vec2.prototype.add = function ( a ) {
		
	var v = new Vec2( [ this.x, this.y ] );
	if ( isNumber( a ) ) {
		v.x += a;
		v.y += a;
		return v;
	} else if ( a.x && a.y ) {
		v.x += a.x;
		v.y += a.y;
		return v;
	}
}

Vec2.prototype.multL = function ( a ) {		
	if ( isNumber( a ) ) {
		this.x *= a;
		this.y *= a;
		return this;
	} else if ( a.x && a.y ) {
		this.x *= a.x;
		this.y *= a.y;
		return this;
	}
}

Vec2.prototype.mult = function ( a ) {		
	var v = new Vec2( [ this.x, this.y ] );
	if ( isNumber( a ) ) {
		v.x *= a;
		v.y *= a;
		return v;
	} else if ( a.x && a.y ) {
		v.x *= a.x;
		v.y *= a.y;
		return v;
	}
}

Vec2.prototype.subL = function ( a ) {
	
	if ( isNumber( a ) ) {
		this.x -= a;
		this.y -= a;
		return this;
	} else if ( a.x && a.y ) {
		this.x -= a.x;
		this.y -= a.y;
		return this;
	}
}

 Vec2.prototype.sub = function ( a ) {
	var v = new Vec2( this );
	if ( isNumber( a ) ) {
		 v.x -= a;
		 v.y -= a;
		 return v;
	} else if ( a.x && a.y ) {
		 v.x -= a.x;
		 v.y -= a.y;
		 return v;
	}
 }


// returns: alpha === 0 -> from, 1 -> to
function lerp( from, to, alpha ) {
	return from * ( 1 - alpha ) + to * alpha;
}

function perp( from, to, alpha ) {
	return from * ( 1 - ( 1 / alpha ) ) + to * ( 1 / alpha );
}

// hope so, found at StackOverflow
function isNumber( n ) {
	return !isNaN( parseFloat( n ) ) && isFinite( n );
}

// dumm as heck:
// http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
function isArray( arrr ) {
	return Object.prototype.toString.call( arrr ) === '[object Array]';
}
