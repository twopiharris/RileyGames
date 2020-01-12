function Ball(scene, x, y, image, width, height) {
/* The ball class simply moves with a given direction and speed.
*/
	tball = new Sprite(scene, image, width, height, 3);
	tball.setSpeed(0);
	tball.setPosition(x, y);
	tball.setBoundAction(SEMIBOUNCE);
	
	tball.moving = false;		// Whether or not the sprite has been fired.
	tball.numBounces = 0;		// Number of times the sprite has bounced.
	tball.onImg = image;		// The regularly displayed image.
	tball.offImg = null;		// The image to flash to after some inactivity.
	tball.isOff = false;		// Whether or not the sprite is flashing the alternate image.
	tball.waiting = 0;			// The current number of frames of inactivity.
	tball.canMove = false;
	
	tball.fire = function(speed, angle) {
	// Gives the ball a speed and direction and switches moving to true.
		this.setSpeed(speed);
		this.setMoveAngle(angle);
		this.moving = true;
	} // end fire

	tball.reset = function(x, y) {
	// Resets the ball to the given coordinates.
		this.setSpeed(0);
		this.setPosition(x, y);
		this.setAngle(0);
		this.moving = false;
	} // end reset
	
	tball.update = function() {
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if (this.visible){
		  this.draw();
		} // end if
		
		// If the ball has been inactive for a few seconds, start flashing.
		if (this.waiting >= 75) {
			if (this.waiting % 15 == 0) {
				this.flash();
			} // end if	
		} else {
			// If the ball is active, make sure its normal image is displayed.
			if (this.isOff) {
				this.setImage(this.onImg);
			}
		}
	}
	
	tball.flash = function() {
	// Switches between the normal image and the alternative image.
		if (this.offImg != null) {
			if (this.isOff) {
				this.setImage(this.onImg);
				this.isOff = false;
			} else {
				this.setImage(this.offImg);
				this.isOff = true;
			}
		}
	}
	
	tball.wait = function() {
		this.waiting += 1;
	}
	
	tball.resetWait = function() {
		this.waiting = 0;
	}
	
	tball.addForces = function() {
		if(this.moving) {
			// First add the downward gravity.
			this.addVector(180, level.gravityStrength);
			
			// Then check if the monitor is in any active fan AOE boxes.
			for(var i = 0; i < level.numFans; i ++) {
				if(level.fans[i].collidesWithAOE(this)) {
					// Calculate the strength of the force based on the distance from the fan.
					var str = level.fans[i].blowStrength * (1 - level.fans[i].distanceTo(this) / level.fans[i].maxAffectDist);
					if(str < 0) str = 0;
					
					this.addVector(level.fans[i].blowDirection, str);
				}
			}
		}
	}
	
	
	tball.checkCollision = function() {
		for (var i = 0; i < level.goals.length; i ++) {
			level.goals[i].collision();	
		}
		for(var i = 0; i < level.numBlocks; i ++) {
			// Get the direction the monitor has collided with the block.
			direction = level.blocks[i].directionalCollisionWith(this);	
			if(direction != -1) {
				// Move the ball back a step.
				this.setPosition(this.x - this.dx, this.y - this.dy);
	
				// Flip dx if the collision was horizontal.
				if(direction == LEFT || direction == RIGHT) {
					this.setDX(this.dx * -1);
				// Flip dy if the collision was vertical.
				} else if(direction == TOP || direction == BOTTOM) {
					this.setDY(this.dy * -1);
				// Flip both for corner cases.
				} else {
					this.setDX(this.dx * -1);
					this.setDY(this.dy * -1);
				}
				this.calcSpeedAngle();				
				this.setSpeed(.8 * this.getSpeed());
				this.numBounces ++;			
				level.blocks[i].addDamage();				
				level.hitBlockSound.playSound();
			}
		}
	}
	
	tball.checkDone = function() {
	// Soft resets the level if the monitor falls off screen or bounces too much.
		if (this.y > level.game.height + 1) {
			this.resetLevel();
		}
		if (this.numBounces > 15) {
			this.resetLevel();
		}
	}
	
	tball.resetLevel = function() {
	// Soft resets the level by just moving the monitor back to the sling.
		this.reset(level.sling.x, level.sling.y);
		this.numBounces = 0;
		this.show();
	}
	
	
	return tball;
} // End Ball def