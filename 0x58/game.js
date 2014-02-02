function Onload() {

	var game = new Game();
	
	document.onkeydown	= function ( e ) {	game.checkKey( e ); };
	document.onkeyup	= function ( e ) {	game.checkKey( e ); };
	document.onmousemove= function ( e ) {	game.checkKey( e ); };
	window.onresize = function( e ) { game.windowResized( e ); };

	//=================
	// Start
	//=================
  
	game.init();
  
	game.start();

	//=================
	// Update Loop
	//=================
	
	function setupGameOnEachFrame ( game ) {
		if ( window.webkitRequestAnimationFrame ) {
		
			onEachFrame = function( game ) {
				webkitRequestAnimationFrame( ( function () { return onEachFrame( game ); } ) );
				game.run();
			};
			
		} else if ( window.mozRequestAnimationFrame ) {
		
			onEachFrame = function( game ) {
				mozRequestAnimationFrame( ( function () { return onEachFrame( game ); } ) );
				game.run();
			};
			
		} else {
		
			onEachFrame = function( game ) {
				setInterval( game.run(), game.INTERVAL );
			};
		}
		onEachFrame( game );
	}
  
	setupGameOnEachFrame( game );
	
};

/// SOUND

function Sound(filePath) {
	this.filePath = filePath;
}
{
	Sound.prototype.play = function()
	{
		var htmlElementForSound = document.createElement("audio");
		htmlElementForSound.autoplay = true;

		var htmlElementForSoundSource = document.createElement("source");
		htmlElementForSoundSource.src = this.filePath;

		htmlElementForSound.appendChild(htmlElementForSoundSource);
	}
}


// GAME

Game = function () {};

// start

Game.prototype.init = function () {

	/// LOOP
	this.FPS = 20;
	this.INTERVAL = 1000 / this.FPS;
	this.maxFrameSkip = 10;
	this.lastFrame = Date.now();
	this.ticks = 0;
	this.draws = 0;
	this.updateTimeAvg = 0;
	this.drawBeginAvg = 0;
	this.paused = false;
	
	/// INPUT
	// key events
	this.INPUT_EVENT_TYPE_KEYDOWN = "keydown";
	this.INPUT_EVENT_TYPE_KEYPRESS = "keypress";
	this.INPUT_EVENT_TYPE_KEYUP = "keyup";

	// mouse events
	this.INPUT_EVENT_TYPE_MOUSEDOWN = "mousedown";
	this.INPUT_EVENT_TYPE_MOUSEUP = "mouseup";

	// keycodes
	this.INPUT_KEY_ARROW_M = 77
	this.INPUT_KEY_ARROW_LEFT = 37;
	this.INPUT_KEY_ARROW_UP = 38;
	this.INPUT_KEY_ARROW_RIGHT = 39;
	this.INPUT_KEY_ARROW_DOWN = 40;
	this.INPUT_KEY_P = 80
	this.INPUT_KEY_SPACE = 32;
	this.INPUT_KEY_ESC = 0x1B;
	
	this.score = 0;
	this.useMouse = false;	
	
	this.input = new InputKeys();
	
	/// CONFIG
	
	this.conf = new Config();
	
	/// FACTORY
	
	this.fac = new Factory( this );
	
	/// ENGINE
	
	this.v = new Vect();
	this.v.init( document.getElementById("c"), this );
	
	/// GRID
	
	this.grid = new Grid();
	
	/// PLAYER
	
	this.p = new Player();
	
	/// WALLS 
	
	this.walls = [];
	
	/// OWALLS 
	
	this.owalls = [];
	
	this.mouseX = 0;
	this.mouseY = 0;
	
};

Game.prototype.start = function () {

	console.log( "start" );
	
	this.score = 0;
	
	/// CONFIG
	
	this.conf = new Config();
	
	/// FACTORY
	
	this.fac = new Factory( this );
	
	/// ENGINE
	
	this.v = new Vect();
	this.v.init( document.getElementById("c"), this );
	
	/// GRID
	
	this.grid = new Grid();
	
	/// PLAYER
	
	this.p = new Player();
	
	/// WALLS 
	
	this.walls = [];
	
	/// OWALLS 
	
	this.owalls = [];
	
	for ( var i = 0; i < 3; i++ ) {
		var wall = this.fac.getWall();
		wall.a = Math.random() * 0.1;
		console.log( wall );
		this.walls.push( wall );
	}
	
	for ( var i = 0; i < 3; i++ ) {
		var wall = this.fac.getWall();
		wall.a = Math.random() * 0.01;
		console.log( wall );
		this.walls.push( wall );
	}
};

/// SOUND

Game.prototype.playExpl = function () {	
	new Sound('explosion.wav').play();	
}

Game.prototype.playPow = function () {	
	new Sound('powerup.wav').play();	
}

Game.prototype.playSel = function () {	
	new Sound('select.wav').play();	
}
	
// events
	
Game.prototype.checkKey = function ( e ) {
	this.input = this.gatherInput( e, this.input );
	this.controlGame( e, this );
};

Game.prototype.windowResized = function ( e ) {
	//console.log( "resized" );
	this.v.updateDims();
};
	
Game.prototype.controlGame = function ( e ) {
	if ( e.type === this.INPUT_EVENT_TYPE_KEYDOWN ) {
		if ( e.keyCode === this.INPUT_KEY_ESC ) {
			console.log("exit " + Context.intervalId );
			clearInterval( Context.intervalId );
		}
	}
};
	
Game.prototype.gatherInput = function ( e, input ) {
	
	if ( e.type === this.INPUT_EVENT_TYPE_KEYDOWN ) {
		/// INPUT KEYS
		if ( e.keyCode === this.INPUT_KEY_ARROW_LEFT ) {
			input.left = true;
		}

		if ( e.keyCode === this.INPUT_KEY_ARROW_RIGHT ) {
			input.right = true;
		}

		if ( e.keyCode === this.INPUT_KEY_ARROW_UP ) {
			input.up = true;
		}

		if ( e.keyCode === this.INPUT_KEY_ARROW_DOWN ) {
			input.down = true;
		}
		
		if ( e.keyCode === this.INPUT_KEY_ARROW_M ) {
			this.useMouse = !this.useMouse;
		}
		
		/// PAUSED
		if ( e.keyCode === this.INPUT_KEY_P ) {
			this.paused = !this.paused;
			this.lastFrame = Date.now();
		}
	}
	
	if ( e.type === this.INPUT_EVENT_TYPE_KEYUP ) {
		/// INPUT KEYS
		if ( e.keyCode === this.INPUT_KEY_ARROW_LEFT ) {
			input.left = false;
		}

		if ( e.keyCode === this.INPUT_KEY_ARROW_RIGHT ) {
			input.right = false;
		}

		if ( e.keyCode === this.INPUT_KEY_ARROW_UP ) {
			input.up = false;
		}

		if ( e.keyCode === this.INPUT_KEY_ARROW_DOWN ) {
			input.down = false;
		}
	}
	
	if ( this.useMouse ) {
		if ( e.clinetX || e.clientY ) { 
			var dx = this.mouseX - e.clientX;
			var dy = this.mouseY - e.clientY;
			
			if ( dx > 0 ) {
				input.left = true;
				input.right = false;
			} else { 
				input.left = false;
				input.right = true;
			}
			
			if ( dy > 0 ) {
				input.up = true;
				input.down = false;
			} else { 
				input.up = false;
				input.down = true;
			}
			
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		}
	}
	return input;
};
	
// loop

Game.prototype.run = function () {
	
	if ( this.paused ) {
		return;
	}
	
	this.last
	
	var updateBegin = Date.now();
	var dt = ( updateBegin - this.lastFrame) / 1000;
	//console.log( " logic update dt " + dt );
	//console.log( "logic update @ tick " + this.ticks );
	
	this.ticks++;
	
	this.update( dt );
	
	var draws = 0;
	var drawingTime = 0;
	var drawBegin = Date.now();
	
	//do {
		this.draw( dt );
		draws++;
		//drawingTime += ( Date.now() - drawBegin );
	//} while ( Date.now() - updateBegin + drawingTime / draws < this.INTERVAL );
	
	// stats
	this.updateTimeAvg = 0.1 * ( Date.now() - updateBegin ) + 0.9 * this.updateTimeAvg;
	this.drawBeginAvg = 0.1 * drawingTime + 0.9 * this.drawBeginAvg;
	this.draws = draws;
	
	this.lastFrame = updateBegin;
	
};

Game.prototype.update = function ( dt ) {
	
	this.score += dt;
	
	/// UPDATE PLAYER
	this.p.update( this.input , dt );
			
	/// UPDATE GRID
	this.grid.setOffset( this.p.offset );
	
	this.grid.update();
	
	/// ADD OWALL FROM FACTORY
	if ( this.ticks % this.fac.owallMod == 0 ) {
		if ( Math.random() > 0.5 ) {
			var owall = this.fac.getOWall();
			console.log( owall );
			this.owalls.push( owall );
		}
	}
	
	/// ADD WALL FROM FACTORY
	//if ( Math.random() > 0.99) {
	if ( this.ticks % this.fac.wallMod == 0 ) {
		var wall = this.fac.getWall();
		console.log( wall );
		this.walls.push( wall ); 
	}
	
	/// UPDATE FACTORY
	this.fac.update( this.ticks );
	
	
	/// UPDATE WALLS
	var l = this.walls.length;
	while( l-- ) {
	 
		//console.log( "l" + l );
		this.walls[ l ].update( dt );
		
		if ( this.walls[ l ].toDel ) {
			// console.log( " wall deleted: " + l );
			this.walls.splice( l , 1 );
		}
	 }
	 
	 /// UPDATE OWALLS
	l = this.owalls.length;
	while( l-- ) {
	 
		//console.log( "l" + l );
		this.owalls[ l ].update( dt , this.p, this );
		
		if ( this.owalls[ l ].toDel ) {
			// console.log( " owall deleted: " + l );
			this.owalls.splice( l , 1 );
		}
	}
	 
	if ( this.p.getTimeLeft() < 0 ) {
		this.start();
	}
};

Game.prototype.draw = function ( dt ) {
	
	this.v.bob = this.p.bob;
	
	this.v.draw( dt );
	
	this.v.drawGrid( this.grid );
	
	// draw tunel
	this.v.drawWalls( this.grid, this.walls );
	this.v.drawOWalls( this.grid, this.owalls );
	
	this.drawGUI();
	//this.drawDebug( dt );
	
	this.v.drawMesh( mesh.kokpit , this.p );
	this.v.drawMesh( mesh.dzialka , this.p );
	this.v.drawMesh( mesh.celownik  , this.p);
};

Game.prototype.drawGUI = function () {
	
	this.v.ctx.font = "24px Atari Font Full Version";
//	this.v.drawTextN( 0 - this.v.ctx.measureText( this.p.getTimeLeft() ).width, 0.5, this.p.getTimeLeft() );
	this.v.drawTextN( -0.49, 0.9, "time left: " + this.p.getTimeLeft() );
	this.v.drawTextN( -0.25, 0.8, "score: " + ( Math.round( this.score * 100 ) / 100 ) );
	
	
	this.v.ctx.font = "62px Atari Font Full Version";
	this.v.drawTextN( -1.4, 0.8, "0x56" );
}


Game.prototype.drawDebug = function ( dt ) {
	
	this.v.ctx.font = "12px Verdana";
	this.v.drawText( 5, 10, "in: ( l r u d ) "
					 + this.input.left + ", "
					 + this.input.right + ", "
					 + this.input.up + ", " 
					 + this.input.down );
					 
	this.v.drawText( 5, 20, "dt: " + dt );
	this.v.drawText( 5, 30, "avgUpdTime: " + this.updateTimeAvg );
	this.v.drawText( 5, 40, "draws: " + this.draws );
	this.v.drawText( 5, 50, "paused: " + this.paused );
	
	this.v.drawText( 5, 60, "g.f.off: " + this.grid.f.offset.str()  );
	this.v.drawText( 5, 70, "g.n.off: " + this.grid.n.offset.str() );
	this.v.drawText( 5, 80, "player.off: " + this.p.offset.str() );
	this.v.drawText( 5, 90, "player.hits: " + this.p.wallHits );
	this.v.drawText( 5, 100, "player.timeLeft: " + this.p.getTimeLeft() );
	
};

/// HELPERS

function InputKeys() {
	
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	
	console.log( "InputKeys active!" );
};

/// GRID
function Grid() {

	/// PARALAX FACTOR
	this.FACTOR = 1.3;
	
	// far
	this.f = new Object();
	
	this.f.val = 0.05;
	
	this.f.offset = new Vec2( [ 0, 0 ] );
	
	this.f.leftTop = new Vec2( [ -this.f.val, this.f.val ] );
	this.f.leftBot = new Vec2( [ -this.f.val, -this.f.val ] );
	this.f.rightTop = new Vec2( [ this.f.val, this.f.val ] );
	this.f.rightBot = new Vec2( [ this.f.val, -this.f.val] );
	
	this.f.w = Math.abs( this.f.leftTop.x - this.f.rightBot.x );
	
	// near
	this.n = new Object();

	this.n.val = 3;
	//this.n.val = 0.8;
	
	this.n.offset = new Vec2( [ 0, 0 ] );

	this.n.leftTop = new Vec2( [ -this.n.val, this.n.val ] );
	this.n.leftBot = new Vec2( [ -this.n.val, -this.n.val ] );
	this.n.rightTop = new Vec2( [ this.n.val, this.n.val ] );
	this.n.rightBot = new Vec2( [ this.n.val, -this.n.val ] );
	
	this.n.w = Math.abs( this.n.leftTop.x - this.n.rightBot.x );
	
};

Grid.prototype.setOffset = function ( offset ) {
	
	/// USE OF PARALAX FACTOR
	this.f.offset = offset.mult( this.f.w * this.FACTOR );
	this.n.offset = offset.mult( this.n.w );
	//console.log( offset.str() + " -> " + this.f.offset.str() + " & " + this.n.offset.str() );
	
};

Grid.prototype.update = function ( ) {

	this.f.leftTop = this.f.offset.add ( { x: -this.f.val, y: this.f.val  } );
	this.f.leftBot = this.f.offset.add ( { x: -this.f.val, y: -this.f.val  } );
	this.f.rightTop = this.f.offset.add ( { x: this.f.val, y: this.f.val  } );
	this.f.rightBot = this.f.offset.add ( { x: this.f.val, y: -this.f.val  } );
	
	this.n.leftTop = this.n.offset.add ( { x: -this.n.val, y: this.n.val  } );
	this.n.leftBot = this.n.offset.add ( { x: -this.n.val, y: -this.n.val  } );
	this.n.rightTop = this.n.offset.add ( { x: this.n.val, y: this.n.val  } );
	this.n.rightBot = this.n.offset.add ( { x: this.n.val, y: -this.n.val  } );

};
