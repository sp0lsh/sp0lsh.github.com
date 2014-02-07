/// PLAYER
function Player() {

	this.RADIUS = 0.1;
	this.MAX_OFFSET = 0.35;
	
	this.leftCan = true;
	this.CAN0 = new Vec2( [ 0.4 , -0.7 ] );
	this.CAN1 = new Vec2( [ -0.4 , -0.7 ] );
	
	this.AIM = new Vec2( [ 0 , 0 ] );
	
	this.speed = 0.5;
	this.offset = new Vec2( [ 0, 0 ] );
	
	this.bob = new Vec2( [ 0, 0 ] );
	this.bobA = 0;
	this.bobTarget = 0.01;
	this.bobLast = 0.00;
	this.maxBob = 0.03;
	
	/// COLLISIONS
	this.collOffTh = 0.1;
	this.collA = 0.7;
	this.wallHits = 0;
	
	/// SCORE
	
	this.timeLeft = 15; // s
	this.timeBonus = 5; // s
	this.timeDamage = 3; // s
	
};

Player.prototype.update = function ( input, dt ) {

	if ( input.left ) {
		// console.log("left");
		this.offset.x += this.speed * dt;
	}

	if ( input.right ) {
		// console.log("right");
		this.offset.x -= this.speed * dt;
	}

	if ( input.up ) {
		// console.log("up");
		this.offset.y -= this.speed * dt;
	}

	if ( input.down ) {
		// console.log("down");
		this.offset.y += this.speed * dt;
	}
	
	this.offset.x = Math.min( this.offset.x, this.MAX_OFFSET );
	this.offset.x = Math.max( this.offset.x, -this.MAX_OFFSET );
	
	this.offset.y = Math.min( this.offset.y, this.MAX_OFFSET );
	this.offset.y = Math.max( this.offset.y, -this.MAX_OFFSET );

	if ( this.bobA < 1 ) {	
		this.bob.y = lerp( this.bobLast, this.bobTarget, this.bobA );
		this.bobA += dt;
		
	} else {
		this.bobLast = this.bobTarget;
		this.bobTarget = this.bobTarget > 0 ? -this.maxBob : this.maxBob;
		this.bobA = 0;
	}
	
	this.timeLeft -= dt;
};

Player.prototype.getCan = function () {
	
	//console.log( "can: " + this.leftCan );

	this.leftCan = !this.leftCan;
	return this.leftCan ? this.CAN0 : this.CAN1;
};

Player.prototype.takeHit = function ( ally ) {
	if ( ally ) {
		this.timeLeft += this.timeBonus;
		this.wallHits++;
	} else {
		this.timeLeft -= this.timeDamage;
		this.wallHits--;
	}
};

Player.prototype.getTimeLeft = function () {
	return Math.round( this.timeLeft * 100 ) / 100;
};



/// WALL

function Wall () {

	this.LIMIT_A = 0.9;
	this.a = 0.001;
	this.speed = 1;
	
	this.toDel = false;
	this.height = 1;
	//console.log( "wall created" );

};

Wall.prototype.update = function ( dt ) {

	if ( this.toDel ) {
		return;
	}
	
	//console.log( "wall updated " + this.a );

	if ( this.a > this.LIMIT_A ) {
		this.toDel = true;
		return;
	}

	this.a += this.speed * ( 1 / 0.5 * this.a ) * dt;
	//console.log( "wall.a: " + this.a );
};


/// OWALL

function OWall () {

	this.LIMIT_A = 0.9;
	this.a = 0.001;
	this.speed = 1;
	
	this.toDel = false;
	this.isAlly = false;
	this.typ = 0;
	
	// 0 - left
	// 1 - right
	// 2 - bot
	// 3 - up
	// 4 - v mid
	// 5 - h mid
	
	// console.log( "Owall created" );

};

OWall.prototype.update = function ( dt, p, g ) {

	if ( this.toDel ) {
		return;
	}
	
	//console.log( "wall updated " + this.a );

	if ( this.a > this.LIMIT_A ) {
		this.toDel = true;
		return;
	}

	this.a += this.speed * ( 1 / 0.5 * this.a ) * dt;
	//console.log( "owall.a: " + this.a );
	
	if ( this.a > p.collA && !this.toDel ) {
		
		switch( this.typ ) {
			case 0:
				if ( p.offset.x > p.collOffTh) {
					p.takeHit( this.isAlly );
					this.toDel = true;
					
					if ( this.isAlly ) {
						g.playPow();
					} else {
						g.playExpl();
					} 
				}
				break;
			case 1:
				if ( p.offset.x < -p.collOffTh) {
					p.takeHit( this.isAlly );
					this.toDel = true;
					
					if ( this.isAlly ) {
						g.playPow();
					} else {
						g.playExpl();
					} 
				}
				break;
			case 2: 
				if ( p.offset.y > p.collOffTh) {
					p.takeHit( this.isAlly );
										
					if ( this.isAlly ) {
						g.playPow();
					} else {
						g.playExpl();
					} is.toDel = true;
				}
				break;
			case 3:
				if ( p.offset.y < -p.collOffTh) {
					p.takeHit( this.isAlly );
					this.toDel = true;
					
					if ( this.isAlly ) {
						g.playPow();
					} else {
						g.playExpl();
					} 
				}
				break;
			case 4:
				if ( p.offset.x > -p.collOffTh && p.offset.x < p.collOffTh ) {
					p.takeHit( this.isAlly );
					this.toDel = true;
					
					if ( this.isAlly ) {
						g.playPow();
					} else {
						g.playExpl();
					} 
				}
				break;
			case 5:
				if ( p.offset.y > -p.collOffTh && p.offset.y < p.collOffTh ) {
					p.takeHit( this.isAlly );
					this.toDel = true;
					
					if ( this.isAlly ) {
						g.playPow();
					} else {
						g.playExpl();
					} 
				}
				break;
			default:
				break;
		}
	}
};