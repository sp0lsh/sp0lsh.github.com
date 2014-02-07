//====================================================================
// 
//	Copyright (c) 2013, All Right Reserved, spolsh, triget, antiad
//
//	THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
//	IND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//	MPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//	ARTICULAR PURPOSE.
//
//
//	Event:			TK Jame Gam vol. 1
//	Content:		remake of Stat Wars vector Atari game
//
//	Author:			Programmer: 	Michał 'spolsh 'Kłoś
//				Graphics:	Oskar 'triget' Szwajkowski
//				Designer:	Adam 'antiad' Żółtowski
//
//	Email:			michal.m.klos@gmail.com
//
//	Framework:		HTML5 Canvas 
//	Date started:		31.01.2014 at 22:00
// 
//
//====================================================================

///================================
///		VECTOR DRAWING ENGINE
///================================
Vect = function () {};
/// SETUP:
Vect.prototype.init = function ( canvas, game ) {
	this.game = game;
	this.ctx = canvas.getContext( "2d" );
	this.c = canvas;
	this.ready = true;
	
	this.screen = {};
	
	this.updateDims();
	
	this.bob = new Vec2( [ 0, 0 ] );
	
	this.CRed = "#C6262A";
	this.CBlue = "#116DCA";
	this.CGreen = "#45B547";
	this.CWhite = "#B2FEFA";
};

Vect.prototype.updateDims = function () {
	
	this.c.width = window.innerWidth;
	this.c.height = window.innerHeight;
	
	this.screen.ratio = this.c.width / this.c.height;
	this.screen.dim = new Vec2( [ this.c.width, this.c.height ] );
	this.screen.center = new Vec2( [ this.c.width / 2, this.c.height / 2 ] );
	//this.screen.center = new Vec2( [ this.screen.dim.x / 2, this.screen.dim.y / 2 ] );
	
	console.log( this.screen.center.x  + " / " + this.screen.center.y );
};
/// CORE DRAWING:
Vect.prototype.draw = function ( dt ) {

	var color = "#000000";
	this.ctx.fillStyle = color;
	this.ctx.fillRect( 0, 0, this.c.width, this.c.height );
	
	//this.ctx.shadowBlur = Math.sin( 100 * dt );
	
	//this.testDrawLines();
	
	//this.drawHelpers();		
};

Vect.prototype.drawLineV = function ( p0, p1 ) {
	this.drawLine( p0.x, p0.y, p1.x, p0.y );
};

Vect.prototype.drawLine = function ( x0, y0, x1, y1 ) {
	
	this.ctx.beginPath();
	this.ctx.moveTo( x0, y0 );
	this.ctx.lineTo( x1, y1 );
	this.ctx.stroke();
};

Vect.prototype.drawLineVN = function ( p0, p1, nobob ) {
	this.drawLineN( p0.x, p0.y, p1.x, p1.y, nobob );
};

Vect.prototype.drawLineN = function ( x0, y0, x1, y1 , nobob ) {
	
	if ( !nobob ) {
		x0 += this.bob.x;
		x1 += this.bob.x;
		
		y0 += this.bob.y;
		y1 += this.bob.y;
	}
	
	this.ctx.translate( this.screen.center.x, this.screen.center.y );
	this.ctx.beginPath();
	/// UWAGA NA MINUSY!!!
	this.ctx.moveTo( x0 * this.screen.center.y, y0  * -this.screen.center.y );
	this.ctx.lineTo( x1 * this.screen.center.y, y1 * -this.screen.center.y );
	this.ctx.stroke();
	this.ctx.translate( -this.screen.center.x, -this.screen.center.y );
};

Vect.prototype.drawTime = function ( text ) {
	
	var color = "#FFFFFF";
	this.ctx.fillStyle = color;
	this.ctx.fillText( text, 0 * this.screen.center.y,
					0 * -this.screen.center.y );
	
}

Vect.prototype.drawText = function ( x0, y0, text ) {
	
	var color = "#FFFFFF";
	this.ctx.fillStyle = color;
	this.ctx.fillText( text, x0, y0 ); 
	
};

Vect.prototype.drawTextN = function ( x0, y0, text ) {
	
	this.ctx.strokeStyle = this.CGreen;
	this.ctx.fillStyle = this.CGreen;
	
	this.ctx.fillText( text,
					x0 ,
					y0 );
	
};

Vect.prototype.drawTextN = function ( x0, y0, text ) {
	
	this.ctx.strokeStyle = this.CWhite;
	this.ctx.fillStyle = this.CWhite;
	
	this.ctx.translate( this.screen.center.x, this.screen.center.y );
	this.ctx.fillText( text, x0 * this.screen.center.y, y0  * -this.screen.center.y );
	this.ctx.translate( -this.screen.center.x, -this.screen.center.y );
	
};

/// MATERIALS
Vect.prototype.wallMat = function () {

	this.ctx.lineWidth = 2.0;
	this.ctx.lineCap = "round";
	this.ctx.lineJoint = "round";
	
	this.ctx.strokeStyle = this.CGreen;
	this.ctx.fillStyle = this.CGreen;
	
	this.ctx.shadowColor = this.CGreen;
	//this.ctx.shadowBlur = 10;
}

Vect.prototype.shipMat = function () {
	
	this.ctx.lineWidth = 6.0;
	this.ctx.lineCap = "round";
	this.ctx.lineJoint = "round";
	
	this.ctx.strokeStyle = this.CBlue;
	this.ctx.fillStyle = this.CBlue;
	
	this.ctx.shadowColor = this.CBlue;
	//this.ctx.shadowBlur = 0;
}

/// DRAWING
Vect.prototype.drawWalls = function ( g, walls ) {
	 
	this.wallMat();
	 
	for ( var i = walls.length - 1; i >= 0; i-- ) {
	
		var a = walls[i].a;
		
		this.ctx.shadowBlur = 500 * Math.sqrt( a );
		
		// middle interp
		var lRT = new Vec2();
		lRT.lerp( g.f.rightTop, g.n.rightTop, a );
		var lLT = new Vec2();
		lLT.lerp( g.f.leftTop, g.n.leftTop, a );
		var lRB = new Vec2();
		lRB.lerp( g.f.rightBot, g.n.rightBot, a );
		var lLB = new Vec2();
		lLB.lerp( g.f.leftBot, g.n.leftBot, a );
		
		// var h = Math.abs( lLB.y - lLT.y );
		// lLT.y += h * walls[i].height;
		// lRT.y += h * walls[i].height;
		
		// middle draw
		this.drawLineVN( lLB, lRB );
		this.drawLineVN( lLT, lRT );
		this.drawLineVN( lLT, lLB );
		this.drawLineVN( lRT, lRB );
	
	}
	this.ctx.shadowBlur = 0;
};

Vect.prototype.drawOWalls = function ( g, owalls ) {
		
	var colorAlly = "#00FF00";
	var colorEnemy = "#FF0000";
	
	for ( var i = owalls.length - 1; i >= 0; i-- ) {
	
		var a = owalls[i].a;
	
		this.ctx.strokeStyle = owalls[i].isAlly ? colorAlly : colorEnemy;
		this.ctx.shadowColor = owalls[i].isAlly ? colorAlly : colorEnemy;

		this.ctx.lineWidth = 5.0;
		
		this.ctx.shadowBlur = 500 * Math.sqrt( a );
		
		this.ctx.lineWidth = 50 * Math.sqrt( a ) ;
		
		// middle interp
		var lRT = new Vec2();
		lRT.lerp( g.f.rightTop, g.n.rightTop, a );
		var lLT = new Vec2();
		lLT.lerp( g.f.leftTop, g.n.leftTop, a );
		var lRB = new Vec2();
		lRB.lerp( g.f.rightBot, g.n.rightBot, a );
		var lLB = new Vec2();
		lLB.lerp( g.f.leftBot, g.n.leftBot, a );
		
		// 0 - left
		// 1 - right
		// 2 - bot
		// 3 - up
		// 4 - v mid
		// 5 - h mid
		
		switch( owalls[i].typ ) {
			case 0:
				lRT.x -= 0.6 * ( lRT.x - lLT.x );
				lRB.x -= 0.6 * ( lRB.x - lLB.x );
				break;
			case 1:
				lLT.x += 0.6 * ( lRT.x - lLT.x );
				lLB.x += 0.6 * ( lRB.x - lLB.x );
				break;
			case 2:
				lLT.y -= 0.6 * ( lRT.y - lLB.y );
				lRT.y -= 0.6 * ( lRT.y - lLB.y );
				break;
			case 3:
				lLB.y += 0.6 * ( lLT.y - lLB.y );
				lRB.y += 0.6 * ( lRT.y - lRB.y );
				break;
			case 4:
				lRT.x -= 0.3 * ( lRT.x - lLT.x );
				lRB.x -= 0.3 * ( lRB.x - lLB.x );
				lLT.x += 0.3 * ( lRT.x - lLT.x );
				lLB.x += 0.3 * ( lRB.x - lLB.x );
				break;
			case 5:
				lRT.y -= 0.3 * ( lRT.y - lRB.y );
				lLT.y -= 0.3 * ( lLT.y - lLB.y );
				lRB.y += 0.3 * ( lRT.y - lRB.y );
				lLB.y += 0.3 * ( lLT.y - lLB.y );
				break;
		}
		
		// middle draw
		this.drawLineVN( lLB, lRB );
		this.drawLineVN( lLT, lRT );
		this.drawLineVN( lLT, lLB );
		this.drawLineVN( lRT, lRB );
	}
	
	this.ctx.shadowBlur = 0;
	this.ctx.lineWidth = 1;
};

/// HELPERS

Vect.prototype.N = function ( v ) { 
	v.x *= this.screen.center.y;
	v.y *= -this.screen.center.y;
	return v;
}

Vect.prototype.N = function ( x , y ) { 
	
	//this.ctx.moveTo( x0 * this.screen.center.y, y0  * -this.screen.center.y );
	var tmp = new Vec2();
	tmp.x *= this.screen.center.y;
	tmp.y *= -this.screen.center.y;
	return tmp;
};

/// TESTS:

Vect.prototype.drawGrid = function ( g ) {
		
	this.wallMat();
	
	// this.drawLineVN( g.f.leftBot, g.f.rightBot);
	// this.drawLineVN( g.f.leftTop, g.f.rightTop);
	// this.drawLineVN( g.f.leftTop, g.f.leftBot);
	// this.drawLineVN( g.f.rightTop, g.f.rightBot);
	
	// // //n
	// this.drawLineVN( g.n.leftBot, g.n.rightBot);
	// this.drawLineVN( g.n.leftTop, g.n.rightTop);
	// this.drawLineVN( g.n.leftTop, g.n.leftBot);
	// this.drawLineVN( g.n.rightTop, g.n.rightBot );
	
	//connect
	this.drawLineVN( g.n.rightTop, g.f.rightTop );
	this.drawLineVN( g.n.rightBot, g.f.rightBot );
	this.drawLineVN( g.n.leftTop, g.f.leftTop );
	this.drawLineVN( g.n.leftBot, g.f.leftBot );
		
};

Vect.prototype.testDrawPlayer = function ( g, player ) {
	
	var pN = new Vec2( player.offset );
	pN.mult( g.n.val );
	
	var pF = new Vec2( player.offset );
	//pF.multL( g.f.w );
	
	this.drawLineVN( player.AIM , player.bob , true );
	
	this.drawLineVN( player.AIM , player.CAN0 , true );
	this.drawLineVN( player.AIM , player.CAN1 , true );
	
	//this.drawLineVN( g.f.offset, g.n.offset, color );
	
};

Vect.prototype.drawMesh = function ( mesh, p ) {
	
	this.shipMat();

	var edges = mesh.frames[0].edges;
	var verts = mesh.frames[0].verts;
	
	for ( var i = 0, l = edges.length; i < l; i += 2 ) {
			
		this.drawLineN( verts[edges[i] * 2] + p.offset.x * 0.1,
						-verts[edges[i] * 2 + 1] + p.offset.y * 0.1,
						verts[edges[i + 1] * 2] + p.offset.x * 0.1,
						-verts[edges[i + 1] * 2 + 1] + p.offset.y * 0.1,
						true );
						
	}
};