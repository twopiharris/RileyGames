function Block(scene, x, y, image, width, height) {
// The block object is a sprite with directional collision detection.
// It pretty much sits in one place and blocks other objects.
	tblock = new Sprite(scene, image, width, height, 1);
	tblock.setPosition(x, y);
	tblock.setSpeed(0);
	
	tblock.collides = 0;					// Number of collisions on the block
	tblock.collideImage = 'blocks/blox0003.png';	// Image to show when the block has been damaged.
	
	tblock.addDamage = function() {
	// Adds "damage" to the block by changing the image or destroying the block.
		this.collides += 1;
		this.changeImage(this.collideImage);
		//If the block is damaged twice, it breaks.
		if (this.collides >= 2) {
			this.visible = false;
			level.breakBlockSound.playSound();
		} // end if
	} // end addDamage
	
	tblock.directionalCollisionWith = function(sprite) {
	// Returns the direction of collision if there is a collision.
		//check for collision with another sprite
    
		//collisions only activated when both sprites are visible
		collision = -1;
		if (this.visible){
		  
		  if (sprite.visible){
			//define borders
			myLeft = this.x - (this.width / 2);
			myRight = this.x + (this.width / 2);
			myTop = this.y - (this.height / 2);
			myBottom = this.y + (this.height / 2);
			otherLeft = sprite.x - (sprite.width / 2);
			otherRight = sprite.x + (sprite.width / 2);
			otherTop = sprite.y - (sprite.height / 2);
			otherBottom = sprite.y + (sprite.height / 2);
			
			if (!(myBottom < otherTop) &&
				!(myTop > otherBottom) &&
				!(myRight < otherLeft) &&
				!(myLeft > otherRight)) {
					
				xDiff = myLeft - otherLeft;
				yDiff = myTop - otherTop;
				
				// Rather than giving a specific angle, collisions will be divided into
				// eight different directions. To figure out the direction, the x and y
				// differences are compared.
				
				// Horizontal collision if xDiff is greater.
				if(Math.abs(xDiff) > Math.abs(yDiff)) {
					if(xDiff < 0) {
						collision = RIGHT;
					} else {
						collision = LEFT;
					} // end if
				
				// Vertical collision if yDiff is greater.
				} else if (Math.abs(xDiff) < Math.abs(yDiff)) {
					if(yDiff < 0) {
						collision = BOTTOM;
					} else {
						collision = TOP;
					} // end if
					
				// Corner collision if equal.
				} else {
					if(xDiff < 0 && yDiff < 0) {
						collision = RIGHTBOTTOM;
					} else if(xDiff < 0 && yDiff > 0) {
						collision = RIGHTTOP;
					} else if(xDiff > 0 && yDiff < 0) {
						collision = LEFTBOTTOM;
					} else if(xDiff > 0 && yDiff > 0) {
						collision = LEFTTOP;
					} // end if
				} // end if
			} // end if

		  } // end 'other visible' if
		} // end 'I'm visible' if

		return collision;
	} // end directionalCollisionWith
	
	return tblock;
} // end Block def