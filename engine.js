//
//								.s$$$Ss.
//					.8,         $$$. _. .              ..sS$$$$$"  ...,.;
//		 o.   ,@..  88        =.$"$'  '          ..sS$$$$$$$$$$$$s. _;"'
//		  @@@.@@@. .88.   `  ` ""l. .sS$$.._.sS$$$$$$$$$$$$S'"'
//		   .@@@q@@.8888o.         .s$$$$$$$$$$$$$$$$$$$$$'
//			 .:`@@@@33333.       .>$$$$$$$$$$$$$$$$$$$$'
//			 .: `@@@@333'       ..>$$$$$$$$$$$$$$$$$$$'
//			  :  `@@333.     `.,   s$$$$$$$$$$$$$$$$$'
//			  :   `@33       $$ S.s$$$$$$$$$$$$$$$$$'
//			  .S   `Y      ..`  ,"$' `$$$$$$$$$$$$$$
//			  $s  .       ..S$s,    . .`$$$$$$$$$$$$.
//			  $s .,      ,s ,$$$$,,sS$s.$$$$$$$$$$$$$.
//			  / /$$SsS.s. ..s$$$$$$$$$$$$$$$$$$$$$$$$$.
//			 /`.`$$$$$dN.ssS$$'`$$$$$$$$$$$$$$$$$$$$$$$.
//			///   `$$$$$$$$$'    `$$$$$$$$$$$$$$$$$$$$$$.
//		   ///|     `S$$S$'       `$$$$$$$$$$$$$$$$$$$$$$.
//		  / /                      $$$$$$$$$$$$$$$$$$$$$.
//								   `$$$$$$$$$$$$$$$$$$$$$s.
//									$$$"'        .?T$$$$$$$
//								   .$'        ...      ?$$#\
//								   !       -=S$$$$$s
//								 .!       -=s$$'  `$=-_      :
//								,        .$$$'     `$,       .|
//							   ,       .$$$'          .        ,
//							  ,     ..$$$'
//								  .s$$$'                 `s     .
//						   .   .s$$$$'                    $s. ..$s
//						  .  .s$$$$'                      `$s=s$$$
//							.$$$$'                         ,    $$s
//					   `   " .$$'                               $$$
//					   ,   s$$'                              .  $$$s
//					` .s..s$'                                .s ,$$
//					 .s$$$'                                   "s$$$,
//				  -   $$$'                                     .$$$$.
//				."  .s$$s                                     .$',',$.
//				$s.s$$$$S..............   ................    $$....s$s......
//				 `""'           `     ```"""""""""""""""         `""   ``
//																   [banksy]dp  
//
//
//		 _____            _            
//		|  ___|          (_)           
//		| |__ _ __   __ _ _ _ __   ___ 
//		|  __| '_ \ / _` | | '_ \ / _ \
//		| |__| | | | (_| | | | | |  __/
//		\____/_| |_|\__, |_|_| |_|\___|
//					 __/ |
//					|___/ 
//
//====================================================================
//	Use the force, use the imagination!
//====================================================================

function Engine ( aGame, canvas ) { 'use strict';
	
	this.createContext = function ( canvas ) {
		var ctx = canvas.getContext( "2d" );
		return ctx;
	}
	
	//=================
	//	Fields
	//=================
	
	this.game = aGame;							// Game
	this.c = canvas;							// Canvas
	this.ctx = this.createContext( canvas );	// Canvas drawing Context "2d"
	this.ready = true;

	//=================
	//	Constructor
	//=================
	
	if ( this.c == null || this.ctx == null ) {
		console.log( "Engine: canvas or context not setup!" );
		this.ready = false;
		return this.ready;
	}
		
	if ( this.game == null ) {
		console.log( "Engine: game property is not set! You will facepalm in 3... 2... 1... " );
		this.ready = false;
		return this.ready;
	}
	
	//=================
	//	Methods
	//=================	
	
	this.createContext = function ( canvas ) {
		var ctx = canvas.getContext( "2d" );
		return ctx;
	}
		
	this.draw = function () {
		throw new Error( "Abstract!" );
		//console.log( "absrtract" );
	}
		
	this.draw2 = function () {
		console.log( "inherited2" );
	}
}

//
//		 _____          ______                    
//		|_   _|         |  _  \                   
//		  | | ___  _ __ | | | |_____      ___ __  
//		  | |/ _ \| '_ \| | | / _ \ \ /\ / / '_ \ 
//		  | | (_) | |_) | |/ / (_) \ V  V /| | | |
//		  \_/\___/| .__/|___/ \___/ \_/\_/ |_| |_|
//				  | |                             
//				  |_|                             
//
//====================================================================
//	What a living world may mean when you can not have clear VISION
//====================================================================

function TopDown ( aGame, canvas ) { 'use strict';
	
	this.parent.constructor.call( this, aGame, canvas );
	
	//=================
	//	Methods
	//=================	
	
	this.draw = function () {
		this.ctx.clearRect( 0, 0, this.c.width, this.c.height );
		
		this.drawMap();
		this.drawObjects();
		
		//this.testDrawLines();
		//this.testScanLine();
		//this.drawDot( new Vec2( 50, 70), 2, 0x00FFFF );
	}
	
	this.drawMap = function () {
		this.ctx.fillStyle = this.game.MAP_BG_COLOR;
		this.ctx.fillRect( 0, 0, this.c.width, this.c.height );
		
		this.ctx.fillStyle = this.game.MAP_TILE_COLOR;

		for ( var x = 0; x < this.game.map.length; x++ ) {
			for ( var y = 0; y < this.game.map[x].length; y++ ) {
				if ( !this.game.map[x][y] ) {
					//console.log( x + " " + y + ": " + this.game.map[x][y]);
					this.ctx.fillRect( x * this.game.MAP_TILE_SIZE,
									 y * this.game.MAP_TILE_SIZE,
									 this.game.MAP_TILE_SIZE,
									 this.game.MAP_TILE_SIZE);
				}
			}
		}
	}
	
	this.drawObjects = function () {
		for ( var i = 0; i < this.game.objs.length; i++ ) {
			this.drawObject( this.game.objs[i] );
		}
	}
	
	this.drawObject = function ( obj ) {
		
		
		// calc the center of obj
		// var startX, startY;
		// startX = obj.x - Math.floor( obj.width / 2 );
		// startY = obj.y - Math.floor( obj.height / 2 );
		
		// this.ctx.fillStyle = obj.color;
		// this.ctx.fillRect( startX, startY, obj.width, obj.height );
		
		this.drawDotV( obj.pos.toInt(), obj.width / 2, obj.color );
		
		//console.log( "drawing: " + obj.name + " " + obj.pos.toInt() );
	}
	
	this.testDrawLines = function () {
		
		var color = "#FF0000";
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 1;
		
		this.drawLine( 0, 0, 200, 100, color );	// "\"
		this.drawLine( 0, 100, 200, 0, color );	// "/"
		
		this.drawLine( 0, 0, 1, 100, color );	// l|
		this.drawLine( 200, 0, 200, 100, color );	// r|
		
		this.drawLine( 0, 0, 200, 0, color );	// t-
		this.drawLine( 0, 100, 200, 100, color );	// b-
	}
	
	this.drawDotV = function ( pos, r, color ) {
		this.drawDot( pos.x, pos.y, r, color );
	}
	
	this.drawDot = function ( x, y, r, color ) {
		
		this.ctx.beginPath();
		this.ctx.arc( x, y, r, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	
	this.drawLineVC = function ( start, end, color ) {
		this.drawLine( start.x, start.y, end.x, end.y, color );
	}
	
	this.drawLineC = function ( x0, y0, x1, y1, color ) {
	
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 1;
		
		this.drawLine( x0, y0, x1, y1 );
	}
	
	this.drawLine = function ( x0, y0, x1, y1 ) {
	
		this.ctx.beginPath();
		this.ctx.moveTo( x0, y0 );
		this.ctx.lineTo( x1, y1 );
		this.ctx.stroke();
	}
	
	this.testScanLine = function () {
	
		//var color = new RGBA();
		//color.b = 0xFF;
		var color = 0xFF;
		this.ctx.lineWidth = 1;
		
		var height = this.c.height;
		var width = this.c.width;
	
		for ( var y = 0; y < 20; y++ ) {
			this.ctx.strokeStyle = "#" + "00" + "00" + color.toString(16);
			//console.log( x + ", " + height );
			this.drawLine( 0, y + 150, width, y + 150, color );
			color = ( color - 10 ) & 0xFF;
			//console.log( "#" + "00" + "00" + color.toString(16) );
		}
	}
}

TopDown.prototype = Object.create( Engine.prototype );
TopDown.prototype.constructor = TopDown;
TopDown.prototype.parent = Engine.prototype;


//
//		 _____                 _     _            
//		/  ___|               | |   (_)           
//		\ `--.  ___ __ _ _ __ | |    _ _ __   ___ 
//		 `--. \/ __/ _` | '_ \| |   | | '_ \ / _ \
//		/\__/ / (_| (_| | | | | |___| | | | |  __/
//		\____/ \___\__,_|_| |_\_____/_|_| |_|\___|
//
//
//====================================================================
//	What a living world may mean when you can not have a tender TOUCH
//====================================================================

function ScanLine ( aGame, canvas ) { 'use strict';
	
	this.parent.constructor.call( this, aGame, canvas );
	
	this.setupImg = function ( context ) {
		return context.createImageData( this.c.width, this.c.height );
	}
	
	//=================
	//	Fields
	//=================	
	
	this.imgTarget = null;
	this.topDown = null;
	
	this.scansFactor = 1;
	this.scansFactor = 0.5;
	//this.scansFactor = 0.1;
	this.scansConst = 0;
	//this.scansConst = 5;
	this.scans = 0;
	
	this.minWallHeight = 0.05;
	this.maxWallHeight = 0.95;
	
	this.colorNear = new RGBA();
	this.colorFar = new RGBA();
	
	this.colorCeiling = new RGBA();
	this.colorFloor = new RGBA();
	
	this.addNoise = true;
	this.addNoise = false;
	this.maxNoise = 0x03;
	//this.maxNoise = 0x10;
	
	this.addDust = true;
	this.maxDust = 0x03;
	this.maxDustQuota = 1000;
	//this.maxDustQuota = 2000;
	this.dusts = [];
	
	for ( var i = 0; i < this.maxDustQuota; i++ ) {
		var dust = new Dust();
		dust.rand( 0, this.c.width, 0, this.c.height );
		this.dusts.push( dust );
	}
	
	if ( this.scansConst === 0 ) {
		this.scans = parseInt( this.c.width * this.scansFactor );
	} else {
		this.scans = this.scansConst;
	}
	
	this.colorNear.fromHex( 0xDDDDFF );
	this.colorFar.fromHex( 0x666688 );
	
	this.colorCeiling.fromHex( 0x444466 );
	this.colorFloor.fromHex( 0xDDDDFF );
	
	//=================
	//	Constructor
	//=================	
	
	if ( this.ready ) {
		this.imgTarget = this.setupImg( this.ctx );
		
		if ( this.imgTarget == null ) {
			this.ready = false
			return this.ready;
		}
	}
	
	if ( !this.topDown ) {
		console.log( "ScanLine: you may want assign topDown field" );
	}
	
	//=================
	//	Methods
	//=================	
	
	this.draw = function () {
		
		this.imgTarget = this.setupImg( this.ctx );
		
		// this.testScanLine();
		// this.testFill();
		// this.testDrawLine();
	
		this.drawViewport();
		
		this.scanLine();
		
		this.drawDusts();
		
		this.ctx.putImageData( this.imgTarget, 0, 0 );
	}
	
	this.testFill = function () {
		
		for ( var x = 20; x < 24; x++ ) {
			for ( var y = 30; y < 34; y++ ) {
				this.imgTarget = this.setPixel( this.imgTarget, x, y, 0xFF, 0, 0, 0xFF );
			}
		}
				
		this.ctx.putImageData( this.imgTarget, 0, 0 );		
	}
	
	this.testDrawLine = function () {
		
		var color = new RGBA();
		color.r = 0xFF;
		
		this.drawLine( this.imgTarget, 0, 0, 	200, 100, 	color );	// "\"
		this.drawLine( this.imgTarget, 0, 100,	200, 0, 	color );	// "/"
		
		this.drawLine( this.imgTarget, 0, 0, 	0, 100, 	color );	// l|
		this.drawLine( this.imgTarget, 200, 0, 	200, 100, 	color );	// r|
		
		this.drawLine( this.imgTarget, 0, 0, 	200, 0, 	color );	// t-
		this.drawLine( this.imgTarget, 0, 100, 	200, 100, 	color );	// b-
	}	
	
	this.drawViewport = function () {
		
		var player = this.game.findByName( "player" );
		
		if ( !player ) {
			//console.log( "DrawViewport: no player found!" );
			return;
		}
		
		var pos = player.pos;
		var intPos = pos.toInt();
		var lineOfSight = player.lineOfSight;
		
		var scans = this.scans;
		
		var startAngle = player.angle - DEG_TO_RAD( player.fov / 2 );
		var endAngle = player.angle + DEG_TO_RAD( player.fov / 2 );
				
		var startDir = this.createTargetVec( startAngle, lineOfSight );
		var endDir = this.createTargetVec( endAngle, lineOfSight );
		
		// draw frustrum:
		var tmpTarget = new Vec2( startDir );
		tmpTarget.add( pos );
		this.topDown.drawLineVC( intPos, tmpTarget.toInt(), 0xFF0000 );
		
		
		tmpTarget.copy( endDir );
		tmpTarget.add( pos );
		this.topDown.drawLineVC( intPos, tmpTarget.toInt(), 0xFF0000 );
		
		var angle = startAngle;
		var angleStep = ( endAngle - startAngle ) / scans;
		
		// actual scanning
		var stripes = [];
		var currDir = new Vec2( startDir );
		var currTarget = new Vec2( currDir );
		currTarget.add( pos );
		
		// console.log( "##############" );	
		for ( var i = 0; i <= scans; i++ ) {
			
			currDir.copy( startDir );
			currDir.rotateCCW( angleStep * i );
			currTarget.copy( currDir );
			currTarget.add( pos );
			
			
			var hitInfo = this.game.traceV( intPos, currTarget.toInt() );
			var depth = lineOfSight;
			if ( hitInfo.hit ) {
				this.topDown.drawDotV( hitInfo.pos.toInt(), 1, 0xFFFF00 );
				
				//depth = this.frustrumDepth( player, hitInfo.pos );
				//var depth2 = this.perpendicularDepth( player, hitInfo.pos );
				//depth = depth2;a
				depth = this.perpendicularDepth( player, hitInfo.pos );
				// console.log( "d1: " + depth + " d2: " + depth2 );
			}
			
			stripes.push( this.drawWallStripe( i, depth, lineOfSight ) );
		}
		
		this.drawStripes( stripes );
	}
	
	this.frustrumDepth = function ( player, point ) {
		var tmpD = new Vec2( player.pos );
		tmpD.sub( point );
		return VSize( tmpD );
	}
	
	this.perpendicularDepth = function ( player, point ) {
		var right = new Vec2( player.right );
		right.mult( 10 );
		right.add( player.pos );
		return distToLine( point, player.pos, right );
	}
	
	this.createTargetVec = function ( angle, lineOfSight ) {
		var target = new Vec2();
		target.unitFromAngle( angle );
		target.mult( lineOfSight );
		return target;
	}
	
	this.drawWallStripe = function ( i, depth, lineOfSight ) {
		
		//console.log( depth + " , " + RAD_TO_DEG( angle ) + " , "+ fov );	
		//console.log( i + " , " + depth + " , " + lineOfSight );	
		var wallColor = new RGBA();
		wallColor = wallColor.lerp( this.colorFar, this.colorNear, depth / lineOfSight );
		
		var width = this.c.width;
		var height = this.c.height;		
		
		var wallHeight = height * this.wallHeight( depth / lineOfSight );
		var hStart = parseInt( ( height - wallHeight ) / 2);
		var hEnd = hStart + wallHeight;
		
		hStart = parseInt( hStart );
		hEnd = parseInt( hEnd );
		
		var x = ( this.c.width - 1 ) / this.scans;
		
		var stripe = new VStripe( parseInt( x * i ), hStart, hEnd, depth, wallColor );
		// this.drawStripe( stripe );
		return stripe;
	}
	
	this.wallHeight = function ( depth ) {
		
		var maxWallHeight = this.maxWallHeight;
		var minWallHeight = this.minWallHeight;
		var height = maxWallHeight * ( 1 - depth );
		height = Math.max( height, minWallHeight );
		
		//height *= 
		//var height = maxWallHeight * depth;
		//console.log( "d " + depth + " h " + height );
		
		return height;
	}
	
	this.drawStripes = function ( stripes ) {
	
		if ( stripes.length < 2 ) {
			return;
		}
	
		var prevStr = stripes[0];
		for ( var i = 1; i < stripes.length; i++ ) {
			var currStr = stripes[i];
			
			this.lerpStripeRect( prevStr, currStr );
			
			//this.drawStripe( currStr );
			prevStr = currStr;
		}
	}
	
	this.lerpStripeRect = function ( stripe1, stripe2) {
		// console.log( " lrs" +  stripe1 + " " + stripe2 );
		//console.log( "#########" );
		
		if ( stripe1.x > stripe2.x ) {
			var tmpStripe = stripe1;
			stripe1 = stripe2;
			stripe2 = stripe1;
		}
		
		var lenght = stripe2.x - stripe1.x;
		for ( var x = 0; x <= lenght; x++ ) {
			
			// TODO: lerp height;
			var alpha = x / lenght;
			// console.log( " a: " + alpha + " x-s " + ( x - stripe1.x ) + " x " + x + " sub: " + (stripe2.x - stripe1.x) + " = " + stripe2.x  + " - " + stripe1.x );
			// console.log( " a: " + alpha + " x " +  x  + " len: " + lenght );
			
			//var col1 = stripe1.color;
			//var col2 = stripe2.color;
			var currColor = stripe1.color.lerp( stripe1.color, stripe2.color, alpha );
			var currStripe = new VStripe( x + stripe1.x, stripe1.hStart, stripe1.hEnd, stripe1.depth, currColor );
			
			this.drawStripe( currStripe );
		}
	}
	
	this.drawStripe = function ( stripe ) {
		
		var cc = new RGBA( this.colorCeiling );
		var cs = new RGBA( stripe.color );
		var cf = new RGBA( this.colorFloor );
		
		if ( this.addNoise ) {
			cc = cc.addNoise( this.maxNoise );
			cs = cs.addNoise( this.maxNoise );
			cf = cf.addNoise( this.maxNoise );
			// console.log( "c " + this.colorCeiling.toHex() + " n " + cc.toHex() );
		}
		
		// ceiling
		this.drawLineC( this.imgTarget, stripe.x, 0, stripe.x, stripe.hStart, cc );	
		// stripe
		this.drawLineC( this.imgTarget, stripe.x, stripe.hStart, stripe.x, stripe.hEnd, cs );	
		// floor
		this.drawLineC( this.imgTarget, stripe.x, stripe.hEnd, stripe.x, this.c.width, cf );	
	}
	
	this.scanLine = function () {
		
		var player = this.game.findByName( "player" );
		
		if ( !player ) {
			//console.log( "ScanLine: no player found!" );
			return;
		}
		
		var colorNear = this.colorNear;
		var colorFar = this.colorFar;
					
		var pos = player.pos;
		var intPos = pos.toInt();
		
		var lineOfSight = player.lineOfSight;
		
		var target = this.createTargetVec( player.angle, lineOfSight );
		target.add( pos );
		var intTarget = target.toInt();
		
		//console.log( "pos: " + pos + " target: " + target );
		this.topDown.drawLineVC( intPos, intTarget, 0xFF0000 );
		
		var rightTarget = new Vec2( player.right );
		rightTarget.mult( 10 );
		rightTarget.add( pos );
		this.topDown.drawLineVC( intPos, rightTarget.toInt(), 0xFF0000 );
		
		var hitInfo = this.game.traceV( intPos, intTarget );
		if ( hitInfo.hit ) {
			
			this.topDown.drawDotV( hitInfo.pos.toInt(), 1, 0xFFFF00 );

			var width = this.c.width;
			var height = this.c.height;
			
			var tmpD = new Vec2( pos );
			tmpD.sub( hitInfo.pos );
			
			var depth = VSize( tmpD );
			
			var right = new Vec2( player.right );
			right.mult( 10 );
			right.add( pos );
			var depth2 = distToLine( hitInfo.pos, pos, right );
			//console.log( "d1: " + depth + " d2: " + depth2 + " # " + pos + " " + right );
			// console.log( "d1: " + depth + " d2: " + depth2 );
			
			
			// console.log( "pos: " + pos.toInt()
						// + " hpos: " + hitInfo.pos.toInt()
						// + "tmpD: " + tmpD.toInt() + " d: " + depth );
						
			var wallColor = new RGBA();
			wallColor = wallColor.lerp( colorNear, colorFar, depth / lineOfSight );
						
			var wallHeight = height * this.wallHeight( depth / lineOfSight );
			var hStart = height - wallHeight;
			var hEnd = wallHeight;
			
			hStart = parseInt( hStart );
			hEnd = parseInt( hEnd );
			
			//this.drawLineC( this.imgTarget, width / 2, hStart, width / 2, hEnd,  wallColor );
		}
		//console.log( "trace: " + hitInfo.hit );
	}
	
	this.testScanLine = function () { 
		
		var color = new RGBA();
		color.b = 0xFF;
		var height = this.c.height;
		var width = this.c.width;
		
		//console.log( "##########" );
		for ( var y = 0; y < 20; y++ ) {
			//console.log( x + ", " + height );
			this.drawLine( this.imgTarget, 0, y + 150, width, y + 150, color );
			color.b -= 10;
			//this.drawLine( this.imgTarget, x, 0, x, width, color );
			//this.drawLine( this.imgTarget, x, 50, x, 100, color );
		}
	}
	
	this.setPixelVC = function ( img, pos, rgba ) {
		return this.setPixel( img, pos.x, pos.y, rgba.r, rgba.g, rgba.b, rgba.a );
	}
	
	this.setPixelC = function ( img, x, y, rgba ) {
		return this.setPixel( img, x, y, rgba.r, rgba.g, rgba.b, rgba.a );
	}
	
	this.setPixel = function ( img, x, y, r, g, b, a ) {
		var index = ( x + y * img.width ) * 4;
		//console.log( x + ", " + y );
		img.data[index + 0] = r;
		img.data[index + 1] = g;
		img.data[index + 2] = b;
		img.data[index + 3] = a;
	
		// console.log( x + ", " + y + ": " + img.data[index + 0] + ", "										 + img.data[index + 0] + ", "
										 // + img.data[index + 1] + ", "
										 // + img.data[index + 2] + ", " 
										 // + img.data[index + 3] );
		
		return img;
	}
	
	this.drawDusts = function () {
		for( var i = 0; i < this.dusts.length; i++ ) {
		
			var d = this.dusts[i];
			
			if ( d.lifetime > d.maxLifetime ) {
				this.dusts[i] = d = new Dust();
				d.rand( 0, this.c.width, 0, this.c.height );
			}
			
			d.update();
			
			for( var x = 0; x < d.width; x++ ) {
				for( var y = 0; y < d.height; y++ ) {
					var c = d.color1;
					//console.log( " c " + c.r + " " + c.g + " " + c.b );
					this.addToPixel( this.imgTarget, x + d.x, y + d.y, c.r, c.g, c.b, 0xFF );
					//this.setPixel( this.imgTarget, x + d.x, y + d.y, c.r, c.g, c.b );
				}
			}
		}
	}
	
	this.addToPixel = function ( img, x, y, r, g, b, a ) {
		var index = ( x + y * img.width ) * 4;
		//console.log( x + ", " + y );
		img.data[index + 0] += r;
		img.data[index + 1] += g;
		img.data[index + 2] += b;
		img.data[index + 3] += a;
	
		// console.log( x + ", " + y + ": " + img.data[index + 0] + ", "										 + img.data[index + 0] + ", "
										 // + img.data[index + 1] + ", "
										 // + img.data[index + 2] + ", " 
										 // + img.data[index + 3] );
		
		return img;
	}
	
	this.drawLineVC = function ( img, start, end, rgba ) {
		this.drawLineC( img, start.x, start.y, end.x, end.y, rgba );
	}
	
	// bresenham java port:
	this.drawLineC = function ( img, x0, y0, x1, y1, rgba ) {
	
		var height = this.c.height;
	
		var w = x1 - x0;
		var h = ( height - y1 ) - ( height - y0 );
		var x = x0;
		var y = height - y0;

		var dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;

		
		if ( w < 0 ) {
			dx1 = -1;
		} else if ( w > 0 ) {
			dx1 = 1;
		}
		
		if ( h < 0 ) {
			dy1 = -1;
		} else if ( h > 0 ) {
			dy1 = 1;
		}
		
		if ( w < 0 ) {
			dx2 = -1;
		} else if ( w > 0 ) {
			dx2 = 1;
		}
		
		var longest = Math.abs( w );
		var shortest = Math.abs( h );

		if ( !( longest > shortest ) ) {
			longest = Math.abs(h);
			shortest = Math.abs(w);
			if ( h < 0 )
				dy2 = -1;
			else if ( h > 0 )
				dy2 = 1;
			dx2 = 0;
		}
		
		var numerator = longest >> 1;

		for ( var i = 0; i <= longest; i++ ) {
	
	
			// if ( this.addNoise ) {
				// var noise = new RGBA( rgba );
				// noise = noise.addNoise( this.maxNoise );
				// this.setPixelC( img, x, height - y, noise );
			// } else {
				// this.setPixelC( img, x, height - y, rgba );
			// }
	
			
			this.setPixelC( img, x, height - y, rgba );
			
			numerator += shortest;

			if ( !( numerator < longest ) ) {
				numerator -= longest;
				x += dx1;
				y += dy1;
			} else {
				x += dx2;
				y += dy2;
			}
		}
	}
}

ScanLine.prototype = Object.create( Engine.prototype );
ScanLine.prototype.constructor = ScanLine;
ScanLine.prototype.parent = Engine.prototype;



//
//		 _   _ _____ _        _            
//		| | | /  ___| |      (_)           
//		| | | \ `--.| |_ _ __ _ _ __   ___ 
//		| | | |`--. \ __| '__| | '_ \ / _ \
//		\ \_/ /\__/ / |_| |  | | |_) |  __/
//		 \___/\____/ \__|_|  |_| .__/ \___|
//							   | |         
//							   |_|         
//
//====================================================================
//	Elementals of OUR VISIONS
//====================================================================

function VStripe( x, hStart, hEnd, depth, color ) { 

	this.x = x;
	this.hStart = hStart;
	this.hEnd = hEnd;
	this.depth = depth;
	this.color = color;

}



//		 _   _           _____ 
//		| | | |         / __  \
//		| | | | ___  ___`' / /'
//		| | | |/ _ \/ __| / /  
//		\ \_/ /  __/ (__./ /___
//		 \___/ \___|\___\_____/
//                       
//====================================================================
//	The true spirit of warrior will be found were courage is usually lost
//====================================================================
// That moment when you realize:
// http://memegenerator.net/instance/42852477
// btw. ...and multiple constructors without tricks would be awesome too

function Vec2 ( foo ) {
		
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
	
	this.copy = function ( vec ) {
		this.x = vec.x;
		this.y = vec.y;
	}
	
	this.toInt = function() {
		var vect = new Vec2( this );
		vect.x = parseInt( vect.x );
		vect.y = parseInt( vect.y );
		return vect;
	}
	
	this.unitFromAngle = function ( angle ) {
		this.x = Math.cos( angle );
		this.y = Math.sin( angle );
	}
	
	this.normal = function () {
		var magn = VSize( this );
		if ( magn == 0.0 ) {
			magn = 0.000000001;
		}
		
		var normal = new Vec2( this );
		normal.div( magn );
		return normal;
	}
	
	this.dot = function ( other ) {
		return this.x * other.x + this.y * other.y;
	}
	
	this.lerp = function ( start, end, alpha ) {
		this.x = lerp( start.x, end.x, alpha );
		this.y = lerp( start.y, end.y, alpha );
	}
	
	this.rotateCCW = function ( angle ) {
		this.rotate( angle, false );
	}
	
	this.rotateCW = function ( angle ) {
		this.rotate( angle, true );
	}

	this.rotate = function ( angle, cw ) {
        
		if ( cw ) {
            angle = -angle;
		}
		
		var cos = Math.cos( angle );
		var sin = Math.sin( angle );
		
        var newX = cos * this.x - sin * this.y;
        var newY = sin * this.x + cos * this.y;
        
		this.x = newX;
        this.y = newY;
    }
	
	this.div = function ( a ) {		
		if ( isNumber( a ) ) {
			this.x /= a;
			this.y /= a;
			return this;
		} else if ( a.x && a.y ) {
			this.x /= a.x;
			this.y /= a.y;
			return this;
		}
	}
	
	this.mult = function ( a ) {		
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
	
	this.add = function ( a ) {
		
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
	
	this.sub = function ( a ) {
		
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
	
	this.toString = function ( ) {
		return "(" + this.x + ", " + this.y + ")";
	}
}

Vec2.prototype.ZERO = new Vec2( [ 0, 0 ] );

//		______ _____ ______  ___  
//		| ___ \  __ \| ___ \/ _ \ 
//		| |_/ / |  \/| |_/ / /_\ \
//		|    /| | __ | ___ \  _  |
//		| |\ \| |_\ \| |_/ / | | |
//		\_| \_|\____/\____/\_| |_/
//
//====================================================================
//	Colors, colors, colors, need mhoar metal black
//====================================================================

/// may need more testing
function RGBA ( rgba ) {
	
	if ( rgba === undefined ) {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0xFF;
	} else {
		this.r = rgba.r;
		this.g = rgba.g;
		this.b = rgba.b;
		this.a = rgba.a;;
	}
	
	this.fromHex = function ( hex ) {
		this.fromHexA( hex, 0xFF );
	}
	
	this.fromHexA = function ( hex, alpha ) {
		
		this.r = ( hex & 0xFF0000 ) >> 16;
		this.g = ( hex & 0xFF00 ) >> 8;
		this.b = hex & 0xFF;
		this.a = alpha;
	}
	
	this.fromRGBA = function ( rr, gg , bb , aa ) {
		
		this.r = rr;
		this.g = gg;
		this.b = bb;
		this.a = aa;
	}
	
	this.add = function ( x ) {
		if ( isNumber(x) ) {
			this.r += x;
			this.g += x;
			this.b += x;
		} else if ( x.r && x.g && x.b ) {
			this.r += x.r;
			this.g += x.g;
			this.b += x.b;
		}
		return this;
	}
	
	this.mult = function ( x ) {
		if ( isNumber(x) ) {
			this.r *= x;
			this.g *= x;
			this.b *= x;
		} else if ( x.r && x.g && x.b ) {
			this.r *= x.r;
			this.g *= x.g;
			this.b *= x.b;
		}
		return this;
	}
	
	this.addNoise = function ( max ) {
		var noised = new RGBA( this );
		noised.add( parseInt( max * 2 * ( 0.5 - Math.random() ) ) );
		return noised;
	}
	
	this.toHex = function () {
		
		var c = this.b;
		c += this.g << 8;
		c += this.r << 16;
		
		return c;
	}
	
	this.toHexStr = function () {
		return "#" + this.toHex().toString(16);
	}
	
	this.toHexAStr = function () {
		return this.toHexStr() + this.a.toString(16);
	}
	
	// returns new color, ignoresAlpha
	this.lerp = function ( from, to, alpha ) {
		
		var color = new RGBA();
		color.r = lerp( from.r, to.r, alpha );
		color.g = lerp( from.g, to.g, alpha );
		color.b = lerp( from.b, to.b, alpha );
		return color;
	}
	
	this.lerpA = function ( from, to, alpha ) {
		
		var color = this.lerp( from, to, alpha );
		color.a = lerp( from.a, to.a, alpha );
		return color;
	}
}

//====================================================================
//	Inspired by playing Call of Duty(R) 4: Modern Warfare recently...
//====================================================================

function Dust( ) {
	
	this.x;
	this.y;
	
	this.width = 2;
	this.height = 2;
	
	// to be added
	this.color1;
	this.color2;
	
	this.lifetime = 0;
	this.maxLifetime = 0;
	
	this.delay = 0;
	this.maxDelay = 50;
	
	// movement
	this.update = function () {
		
		if ( this.delay > this.maxDelay ) {
			this.x += parseInt( 2 * 2 * ( 0.5 - Math.random() ) );
			this.y += parseInt( 4 * 2 * ( 0.5 - Math.random() ) );
			this.delay = 0;
		}
		
		this.delay++;
		this.lifetime++;
	}
	
	this.rand = function ( minX, maxX, minY, maxY ) {
		this.x = parseInt( ( maxX - minX ) * Math.random() ) ;
		this.y = parseInt( ( maxY - minY ) * Math.random() ) ;
		
		var size = parseInt( 8 * Math.random() ) ;
		this.width += size;
		this.height += size;
		
		this.color1 = new RGBA();
		this.color1.fromHex( 0x010101 );
		//this.color1.fromHex( 0x202020 );
		
		this.color2 = new RGBA();
		this.color2.fromHex( 0x010101 );
		//this.color2.fromHex( 0x101010 );
		//this.color1.fromHex( 0x505050 );
		
		var colorAdd = parseInt( size * Math.random() );
		this.color1.add( colorAdd );
		//console.log( "c1 " + this.color2.toHexStr() + " " + this.color1.toHexStr() );
		
		this.maxDelay += parseInt( this.maxDelay * Math.random() ) ;
		this.delay = parseInt( this.maxDelay * Math.random() ) ;
		this.maxLifetime = this.maxDelay + parseInt( 10 * this.maxDelay * Math.random() ) ;
		
	}
}

//	___  ____       _              ______                _   _                 
//	|  \/  (_)     (_)             |  ___|              | | (_)                
//	| .  . |_ _ __  _  ___  _ __   | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
//	| |\/| | | '_ \| |/ _ \| '_ \  |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//	| |  | | | | | | | (_) | | | | | | | |_| | | | | (__| |_| | (_) | | | \__ \
//	\_|  |_/_|_| |_|_|\___/|_| |_| \_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
//                                                                                                                                                   
//====================================================================
//	Come to me my minions, my little slaves
//====================================================================

// have you known that const is not in language standard :CCCC
function RAD_TO_DEG ( a ) {
	return a * 57.295779513082321600;	// 180 / Pi
}

function DEG_TO_RAD ( a ) {
	return a * 0.017453292519943296;	// Pi / 180
}

// returns: alpha == 0 -> from, 1 -> to
function lerp( from, to, alpha ) {
	return from * ( 1 - alpha ) + to * alpha;
}

// hope so, found at StackOverflow
function isNumber( n ) {
	return !isNaN( parseFloat( n ) ) && isFinite( n );
}

function VSqrSize( vec2 ) {
	return vec2.x * vec2.x + vec2.y * vec2.y;
}

// a bit of unreal from me
function VSize( vec2 ) {
	return Math.sqrt( VSqrSize( vec2 ) );
}

function unitVecFromAngle( v, angle ) {
	v.x = Math.cos( angle );
	v.y = Math.sin( angle );
	return v;
}

////
function sqr( x ) {
	return x * x;
}

function dist2( v, w ) {
	return sqr( v.x - w.x ) + sqr( v.y - w.y );
}

function distToLineSquared( p, v, w ) {
	
	var l2 = dist2( v, w );
	
	if ( l2 == 0 ) {
		return dist2( p, v );
	}
	
	var t = ( ( p.x - v.x ) * ( w.x - v.x )
			+ ( p.y - v.y ) * ( w.y - v.y ) ) / l2;
	
	if ( t < 0 ) {
		return dist2( p, v );
	}
	
	if ( t > 1 ) {
		return dist2( p, w );
	}
	
	return dist2( p,
				{ x: v.x + t * ( w.x - v.x ),
				  y: v.y + t * ( w.y - v.y ) }
				);
}

function distToLine( p, v, w ) {
	return Math.sqrt( distToLineSquared( p, v, w ) );
}

////

function clamp( a, min, max ) {
	return Math.max( Math.min( a, max ), min );
}

// dumm as heck:
// http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
function isArray( arrr ) {
	return Object.prototype.toString.call( arrr ) === '[object Array]';
}