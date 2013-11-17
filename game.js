
//
//				  .                                                      .
//				.n                   .                 .                  n.
//		  .   .dP                  dP                   9b                 9b.    .
//		 4    qXb         .       dX                     Xb       .        dXp     t
//		dX.    9Xb      .dXb    __                         __    dXb.     dXP     .Xb
//		9XXb._       _.dXXXXb dXXXXbo.                 .odXXXXb dXXXXb._       _.dXXP
//		 9XXXXXXXXXXXXXXXXXXXVXXXXXXXXOo.           .oOXXXXXXXXVXXXXXXXXXXXXXXXXXXXP
//		  `9XXXXXXXXXXXXXXXXXXXXX'~   ~`OOO8b   d8OOO'~   ~`XXXXXXXXXXXXXXXXXXXXXP'
//			`9XXXXXXXXXXXP' `9XX'   DIE    `98v8P'  HUMAN   `XXP' `9XXXXXXXXXXXP'
//				~~~~~~~       9X.          .db|db.          .XP       ~~~~~~~
//								)b.  .dbo.dP'`v'`9b.odb.  .dX(
//							  ,dXXXXXXXXXXXb     dXXXXXXXXXXXb.
//							 dXXXXXXXXXXXP'   .   `9XXXXXXXXXXXb
//							dXXXXXXXXXXXXb   d|b   dXXXXXXXXXXXXb
//							9XXb'   `XXXXXb.dX|Xb.dXXXXX'   `dXXP
//							 `'      9XXXXXX(   )XXXXXXP      `'
//									  XXXX X.`v'.X XXXX
//									  XP^X'`b   d'`X^XX
//									  X. 9  `   '  P )X
//									  `b  `       '  d'
//									   `             '
//
//
//		 _     _                         
//		| |   (_)                        
//		| |    _  ___ ___ _ __  ___  ___ 
//		| |   | |/ __/ _ \ '_ \/ __|/ _ \
//		| |___| | (_|  __/ | | \__ \  __/
//		\_____/_|\___\___|_| |_|___/\___|
//
//
//====================================================================
// 
//	Copyright (c) 2013, All Right Reserved, spolsh
//
//	THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
//	IND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//	MPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//	ARTICULAR PURPOSE.
//
//
//	Content:		remake of Hovertank 3D (id Software) in javascript
//
//	Author:			Michał 'spolsh 'Kłoś
//	Email:			michal.m.klos@gmail.com
//
//	Framework:		HTML5 Canvas + Bresenham Line drawing algorithm
// 	Date started:	07.11.2013
//
//====================================================================
//		 _____                      
//		|  __ \                     
//		| |  \/ __ _ _ __ ___   ___ 
//		| | __ / _` | '_ ` _ \ / _ \
//		| |_\ \ (_| | | | | | |  __/
//		 \____/\__,_|_| |_| |_|\___|
//									
//====================================================================
//   Create a game for the sake of forgotten gods!!!
//====================================================================
// side note: I'm against violence in comments so there will be hardly any of them, 
//            I promise!
//====================================================================

function Game () { 'use strict';
	
	//===========================
	//   Constants
	//===========================

	/// STRUCTURE
	// canvas names
	this.CANVAS_TD_ID = "viewport2d";
	this.CANVAS_SL_ID = "viewport";
	this.FPS = 30;
	this.INTERVAL = 1000 / this.FPS;


	/// INPUT
	// According to mozzila web api...
	// ...and other site where it was said that most of keycode not work the same:
	// https://developer.mozilla.org/en-US/docs/Web/Reference/Events?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference

	// key events
	this.INPUT_EVENT_TYPE_KEYDOWN = "keydown";
	this.INPUT_EVENT_TYPE_KEYPRESS = "keypress";
	this.INPUT_EVENT_TYPE_KEYUP = "keyup";

	// mouse events
	this.INPUT_EVENT_TYPE_MOUSEDOWN = "mousedown";
	this.INPUT_EVENT_TYPE_MOUSEUP = "mouseup";

	// keycodes
	this.INPUT_KEY_ARROW_LEFT = 37;
	this.INPUT_KEY_ARROW_UP = 38;
	this.INPUT_KEY_ARROW_RIGHT = 39;
	this.INPUT_KEY_ARROW_DOWN = 40;
	this.INPUT_KEY_ESC = 0x1B;


	/// GAME

	// map
	this.MAP_TILE_SIZE = 10;
	this.MAP_TILE_COLOR = "#FFFFFF";
	this.MAP_BG_COLOR = "#000000";
	
	//===========================
	//   INIT
	//===========================

	this.map = [];					// actual map
	this.objs = [];					// gameobjects updated in game
	this.input = new InputKeys();

	// Engines:
	this.topDown = null;		// left eye
	this.scanLine = null;		// right eye
	
	this.initialize = function() {
		
		// prepare topdown
		var canvasTopDown = document.getElementById( this.CANVAS_TD_ID );
		this.topDown = new TopDown( this, canvasTopDown );
		
		// prepare scanline
		var canvasScanLine = document.getElementById( this.CANVAS_SL_ID );
		this.scanLine = new ScanLine( this, canvasScanLine );
		this.scanLine.topDown = this.topDown;
		
	};

	this.createMap = function () {
		var o = false;
		var X = true;
		
		// stored transposed so in code is always x then y
		var map = [
			[X, X, X, X, X, X, X],
			[X, X, o, o, o, X, X],
			[X, X, o, o, o, X, X],
			[X, X, o, o, o, X, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, X, X, o, X, X, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, o, o, o, o, o, X],
			[X, X, X, X, X, X, X]
		];
		
		//console.log("creating map: " + map );
		console.log( "Map created!" );
		return map;
	}

	//===========================
	//   Start
	//===========================

	this.start = function() {
		this.map = this.createMap();
		this.initPlayer();
	}

	this.addGameObj = function( gameObj ) {
		gameObj.game = this;
		this.objs.push( gameObj );
	}

	this.addRect = function() {
		this.entities.push(new Rect());
	};	

	this.findByName = function ( name ) {
		
		var found = false;
		var object = null;
		for( var i = 0; i < this.objs.length && !found; i++ ) {
			//console.log( i + " " + this.objs[i].name + " vs " + name );
			if ( this.objs[i].name == name ) {
				object = this.objs[i];
				found = true;
			}
		}
		return object;
	}

	this.initPlayer = function () {
		
		var player = new GameObject( "player" );
		player.pos.x = 35;
		player.pos.y = 40;
		player.width = 4;
		player.height = 4;
		player.color = "#00FF00";
		
		this.addGameObj( player );
	} 

	//===========================
	//	Control
	//===========================
	
	this.pushEvent = function( e ) {
		//console.log( "type: " + e.type );
		this.checkKey( e );
	}
		
	this.checkKey = function ( e ) { 
		
		this.input = this.gatherInput( e, this.input );
		this.controlGame( e, game );
		
	}
	
	this.controlGame = function ( e ) {
		if ( e.type === game.INPUT_EVENT_TYPE_KEYDOWN ) {
			if ( e.keyCode === game.INPUT_KEY_ESC ) {
				console.log("exit " + Context.intervalId );
				clearInterval( Context.intervalId );
			}
		}
	}
	
	this.gatherInput = function ( e, input ) {
	
		
		// console.log( "in1: ( l r u d ) "
						// + input.left + ", "
						// + input.right + ", "
						// + input.up + ", " 
						// + input.down );
		
		if ( e.type === game.INPUT_EVENT_TYPE_KEYDOWN ) {
			if ( e.keyCode === game.INPUT_KEY_ARROW_LEFT ) {
				input.left = true;
			}
	
			if ( e.keyCode === game.INPUT_KEY_ARROW_RIGHT ) {
				input.right = true;
			}
	
			if ( e.keyCode === game.INPUT_KEY_ARROW_UP ) {
				input.up = true;
			}
	
			if ( e.keyCode === game.INPUT_KEY_ARROW_DOWN ) {
				input.down = true;
			}
		}
		
		if ( e.type === game.INPUT_EVENT_TYPE_KEYUP ) {
			if ( e.keyCode === game.INPUT_KEY_ARROW_LEFT ) {
				input.left = false;
			}
	
			if ( e.keyCode === game.INPUT_KEY_ARROW_RIGHT ) {
				input.right = false;
			}
	
			if ( e.keyCode === game.INPUT_KEY_ARROW_UP ) {
				input.up = false;
			}
	
			if ( e.keyCode === game.INPUT_KEY_ARROW_DOWN ) {
				input.down = false;
			}
		}
		
		// console.log( "in2: ( l r u d ) "
						// + input.left + ", "
						// + input.right + ", "
						// + input.up + ", " 
						// + input.down );
						
		return input;
	}
		
	//===========================
	//	Update
	//===========================

	this.update = function() {
	
		var player = this.findByName( "player" );

		if ( player != null ) {
			player.processKeys( this.input );
		} else {
			console.log( "Player call failed!" )
		}
		
		// update gameobjects
		for ( var i = 0; i < this.objs.length; i++ ) {
			this.objs[i].update();
		}
	}		

	//===========================
	//   Collision
	//===========================
	
	this.obstacleAtV = function( pos ) {
		var intPos = pos.toInt();
		return this.obstacleAt( intPos.x , intPos.y );
	}
	
	this.obstacleAt = function( x , y ) {
		
		var mapX, mapY;
		mapX = Math.floor( x / this.MAP_TILE_SIZE );
		mapY = Math.floor( y / this.MAP_TILE_SIZE );
		
		if ( mapX >= 0 && mapY >= 0 && mapX < this.map.length ) {
			//console.log( "coll3: mapY(" + mapY + ") < this.map.lenght(" + this.map.length + ")" );
			if ( mapY < this.map[mapX].length ) {
				if ( mapY < this.map[mapX].length ) {
		
					return this.checkHit( mapX, mapY );
				}
			}				
		}
		//console.log( "coll: not in map range: true" );
		return true;
	}
	
	this.checkHit = function ( x, y ) {
		
		var hit = this.map[x][y];

		
		// console.log( "coll: (" + x + ", " + y + ") ( " + mapX + ", " + mapY + " ) "
					// + " ( " + this.map[x].length + ", " + this.map.length + " ) is:" +  hit );		
		
		return hit;
	}
	
	this.traceV = function ( start, end ) {
		return this.trace( start.x, start.y, end.x, end.y );
	}
	
	// collision bresenham trace, returns HitInfo
	this.trace = function ( x0, y0, x1, y1 ) {
	
		var height = this.map.length;
	
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

		var hitInfo = new HitInfo( false );
		for ( var i = 0; i <= longest && !hitInfo.hit; i++ ) {

			// can skip by MAP_TILE_SIZE to avoid unnecessary checks
			hitInfo.hit = this.obstacleAt( x , height - y );
			if ( hitInfo.hit ) {
				hitInfo.pos.x = x;
				hitInfo.pos.y = height - y;
			}

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
		
		return hitInfo;
	}
	
	//===========================
	//   Drawing, peek engine.js for spicy details
	//===========================
	
	this.draw = function () {
	
		this.topDown.draw();
		this.scanLine.draw();
	}
	
	// Log that everything was ok.
	console.log( "Game assembled!" );
}

//
//		 _   _ _ _  _____       __      
//		| | | (_) ||_   _|     / _|     
//		| |_| |_| |_ | | _ __ | |_ ___  
//		|  _  | | __|| || '_ \|  _/ _ \ 
//		| | | | | |__| || | | | || (_) |
//		\_| |_/_|\__\___/_| |_|_| \___/ 
//										
//                                
//====================================================================
//	Once hit will remain awaken
//====================================================================

function HitInfo( didHit ) {
	
	this.hit = didHit;
	this.pos = new Vec2();
}

//
//		 _____                  _   _   __               
//		|_   _|                | | | | / /               
//		  | | _ __  _ __  _   _| |_| |/ /  ___ _   _ ___ 
//		  | || '_ \| '_ \| | | | __|    \ / _ \ | | / __|
//		 _| || | | | |_) | |_| | |_| |\  \  __/ |_| \__ \
//		 \___/_| |_| .__/ \__,_|\__\_| \_/\___|\__, |___/
//				   | |                          __/ |    
//				   |_|                         |___/     
//
//====================================================================
//	Every world needs its directions so entities can make decisions
//====================================================================

function InputKeys() {
	
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	
	console.log( "InputKeys active!" );
}

//
//		 _____                       _____ _     _           _   
//		|  __ \                     |  _  | |   (_)         | |  
//		| |  \/ __ _ _ __ ___   ___ | | | | |__  _  ___  ___| |_ 
//		| | __ / _` | '_ ` _ \ / _ \| | | | '_ \| |/ _ \/ __| __|
//		| |_\ \ (_| | | | | | |  __/\ \_/ / |_) | |  __/ (__| |_ 
//		 \____/\__,_|_| |_| |_|\___| \___/|_.__/| |\___|\___|\__|
//											   _/ |              
//											  |__/               
//
//====================================================================
//	Summon thy mighty GameObject to exist in this dreadful environment
//====================================================================

/// Each game object on screen
function GameObject( name ) {
	
	this.game = null;
	
	this.name = name;
	this.pos = new Vec2();
	this.width = 10;
	this.height = 10;
	this.color = "#FF00FF";
	
	this.vel = new Vec2();
	
	// in radians
	this.angle = 0;
	// in degrees
	this.fov = 80;
	
	this.dir = new Vec2();	
	this.right = new Vec2();	// player has right to live
	this.turnVel = 0.1;
	this.lineOfSight = 120;
	
	console.log( "GameObject summoned!" );
	
	this.processKeys = function ( input ) {
		
		var accel = 0;
		var changeAngle = 0;
		
		//console.log( "in: " + input  + " c: " + change.toString() );
		
		// moving sideways
		// if ( input.left ) {
			// //console.log("left");
			// change.x -= 1;
		// }

		// if ( input.right ) {
			// //console.log("right");
			// change.x += 1;
		// }
		
		if ( input.left ) {
			// console.log("left");
			changeAngle -= this.turnVel;
		}

		if ( input.right ) {
			// console.log("right");
			changeAngle += this.turnVel;
		}

		if ( input.up ) {
			// console.log("up");
			accel += 1;
		}

		if ( input.down ) {
			// console.log("down");
			accel -= 1;
		}
		
		this.setAngle( this.angle + changeAngle );
		var newVel = new Vec2( this.dir );
		//console.log( "newV: " + newVel );
		//console.log( "change: " + newVel );
		newVel.mult( accel );
		this.vel = newVel;
	}
	
	this.setAngle = function ( angle ) {
		this.angle = angle % ( 2 * Math.PI );
		
		if ( this.angle < 0 ) {
			this.angle += ( 2 * Math.PI );
		}
		
		this.dir = unitVecFromAngle( this.dir, this.angle );
		
		this.right = unitVecFromAngle( this.right, this.angle + 0.5 * Math.PI );
		//console.log( " dir " + this.dir + " right " + this.right );
	}
	
	this.update = function () {
		this.move();
		// console.log("angle:" + this.angle );
	}
	
	this.move = function () {
		
		var newPos = new Vec2( this.pos );
		newPos.add( this.vel );
		
		// console.log(" pos: " + this.pos  + " , vel: " + this.vel + " npos: " + newPos );
		
		var collide = this.game.obstacleAt( newPos.x, newPos.y );
		// console.log(" collide: " + collide );
		
		if ( !collide ) {
			this.pos = newPos;
		}
	}
}

//
//		______ _                       
//		| ___ \ |                      
//		| |_/ / | __ _ _   _  ___ _ __ 
//		|  __/| |/ _` | | | |/ _ \ '__|
//		| |   | | (_| | |_| |  __/ |   
//		\_|   |_|\__,_|\__, |\___|_|   
//						__/ |          
//					   |___/           
//
//====================================================================
//	Create the logical entity to conquer all world,
//	their brethren and lead to world end
//====================================================================

/// Player object
function Player () {
	
	console.log( "Player drafted!" );
}
