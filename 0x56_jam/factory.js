function Factory ( game ) {
	
	this.g = game;
	
	this.oSpeed = this.g.conf.eStartSpeed;
	this.wSpeed = this.g.conf.oStartSpeed;
	
	this.mod = 100;
	this.wallMod = 40;
	this.owallMod = 30;

}; 

Factory.prototype.update = function ( tick ) {
	
	if ( tick % 100 == 0 ) {
	
		this.wSpeed += this.g.conf.wSpeedIncr;
		this.oSpeed += this.g.conf.oSpeedIncr;
		
		if ( this.mod > 20 ) {
			this.mod--;
			this.wallMod--;
		}
		
		if ( this.owallMod > 2 ) {
			this.owallMod--;
		}
	}
};

Factory.prototype.getWall = function () {

	var wall = new Wall();
	
	wall.height = 1;
	wall.speed = this.wSpeed;
	
	return wall;
};

Factory.prototype.getOWall = function () {

	var owall = new OWall();
	
	owall.isAlly = Math.random() > 0.4;
	owall.speed = this.wSpeed;
	owall.typ = Math.round( Math.random() * 5 );
	console.log( "oWall typ: " + owall.typ );

	return owall;
};