function Fan(scene, x, y, offImage, width, height) {
// The fan object toggles between blowing and idle. When blowing,
// it creates an area of effect that can blow other sprites away.
	tfan = new Sprite(scene, offImage, width, height, 1);
	tfan.setPosition(x, y);
	tfan.setSpeed(0);
	
	tfan.sound = new Sound("sounds/fanhum.mp3");
	
	tfan.blowDirection = 0;				// Direction the fan is blowing.
	tfan.blowStrength = 10;				// How strong the fan blows.
	tfan.blowPeriod = 40;				// Frames between blowing and idle.
	tfan.aoeXOffset = 0;				// X offset for the AOE box.
	tfan.aoeYOffset = 0;				// Y offset for the AOE box.
	tfan.aoeWidth = 50;					// Width of the AOE box.
	tfan.aoeHeight = 300;				// Height of the AOE box.
	tfan.maxAffectDist = 300;			// The max distance the AOE can affect sprites. If set past the height, the blow affect will remain strong throughout the box.
	tfan.inactiveFrames = 0;			// Number of inactive frame animations.
	tfan.activeFrames = 4;				// Number of active frame animations.
	tfan.active = false;				// Whether or not the fan is currently blowing.
	tfan.curTime = 0;					// The current number of frames between switching animations.
	tfan.curFrame = 1;					// The current frame number.
	
	tfan.fanImage = new Array();
	for (var i = 1; i < 5; i++) {
		tfan.fanImage[i] = new Image();
		tfan.fanImage[i].src = "Fan/fan" + i + ".png";
	}
	
	tfan.setAOEBox = function(xOff, yOff, width, height) {
	// Resets the AOE box attributes.
		this.aoeXOffset = xOff;
		this.aoeYOffset = yOff;
		this.aoeWidth = width;
		this.aoeHeight = height;
	} // end
	
	tfan.setBlowPeriod = function(period) {
		this.blowPeriod = period;
	} // end setPeriod
	
	tfan.setMaxDistance = function(max) {
		this.maxAffectDist = max;
	} // end setMaxDistance
	
	tfan.setBlowStrength = function(str) {
		this.blowStrength = str;
	} // end setBlowStrength
	
	tfan.setBlowDirection = function(dir) {
		this.blowDirection = dir;
	} // end setBlowDirection
	
	tfan.collidesWithAOE = function(sprite) {
	// Checks if a sprite collides with the AOE box.
		//check for collision with another sprite
    
		//collisions only activated when both sprites are visible
		collision = false;
		if (this.visible && this.active){
		  
		  if (sprite.visible){
			//define borders
			aoeLeft = this.x + this.aoeXOffset - (this.aoeWidth / 2);
			aoeRight = this.x + this.aoeXOffset + (this.aoeWidth / 2);
			aoeTop = this.y + this.aoeYOffset - (this.aoeHeight / 2);
			aoeBottom = this.y + this.aoeYOffset + (this.aoeHeight / 2);
			otherLeft = sprite.x - (sprite.width / 2);
			otherRight = sprite.x + (sprite.width / 2);
			otherTop = sprite.y - (sprite.height / 2);
			otherBottom = sprite.y + (sprite.height / 2);
			
			//assume collision
			collision = true;
			
			//determine non-colliding states
			if ((aoeBottom < otherTop) ||
				(aoeTop > otherBottom) ||
				(aoeRight < otherLeft) ||
				(aoeLeft > otherRight)) {
				  collision = false;
			} // end if

		  } // end 'other visible' if
		} // end 'I'm visible' if

		return collision;
	} // end collidesWithAOE
	
	tfan.update = function() {
		// Check if the fan should stop/start blowing.
		if(this.curTime >= this.blowPeriod) {
			this.curTime = 0;
			
			if(this.active) {
				this.sound.stopSound();
				this.active = false;
			} else {
				this.sound.playSound({loop:true});
				this.active = true;
			} // end if
		} else {
			this.curTime ++;
		} // end if
		
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if(this.visible){
		  this.draw();
		} // end if
		
		// Animate the fan, but only if there are defined animations.
		if(this.active) {
			this.image = this.fanImage[this.curFrame];
			this.curFrame ++;
			// Wrap the animation.
			if(this.curFrame > this.activeFrames) {
				this.curFrame = 1;
			} // end if
		} else if(!this.active) {
			this.image = this.fanImage[1];
		} // end if
	} // end update
	
	return tfan;
} // end Fan def