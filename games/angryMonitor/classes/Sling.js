function Sling(scene, x, y, baseImage, baseWidth, baseHeight, centerImage, centerWidth, centerHeight, dragSprite, maxDragDist, launchSpeed) {
/* The sling class consists of two images that are stretched and shrank when dragged until let go.
** Each image is stretched based on a fixed point and where the mouse/touch is. The class also keeps
** track of how stretched it is and in what direction it is stretched. After released, the sling will
** return to its original position (essentially a straight line).
**
** REQUIRES a scene object, an initial position, an image to represent the handle, the size
** of that image, an image to represent the holder, the size of that image, the sprite to
** be slung (needs fire(), wait(), and resetWait() functions and a moving boolean), the
** maximum distance the sling can be dragged, and the maximum speed the sprite
** can be launched.
*/
	tsling = new Sprite(scene, centerImage, centerWidth, centerHeight, 2);
	tsling.stick = new Sprite(scene, baseImage, baseWidth, baseHeight, 2);
	
	tsling.setSpeed(0);
	tsling.stick.setSpeed(0);
	tsling.stick.setPosition(x, y);
	tsling.setPosition(tsling.stick.x, tsling.stick.y - tsling.stick.height / 2);
	
	tsling.origX = tsling.x;			// The resting x of the sling.
	tsling.origY = tsling.y;			// The resting y of the sling.
	tsling.dragSprite = dragSprite;		// The sprite to be slung.
	tsling.dragging = false;			// Whether or not the sling is currently being dragged.
	tsling.defaultState = true;              // Whether or not the monitor is in the default state.
	tsling.maxDragDist = maxDragDist;	// Max distance the holder can be dragged.
	tsling.launchSpeed = launchSpeed;	// Speed multiplier when the sling is let go.
	tsling.curDragDist = 0;				// The current distance the sling has been dragged from the origin point.
	tsling.curDragAngle = 0;			// The current angle between the holder and origin point.
	tsling.lineColor = '#FF0000';		// Color of the sling's strings.
	tsling.lineWidth = 5;				// Width of the sling's strings.
	
	tsling.changeLineInfo = function(lineColor, lineWidth) {
	// Changes the sling's string attributes.
		this.lineColor = lineColor;
		this.lineWidth = lineWidth;
	} // end changeLineInfo
	
	tsling.checkMouseAction = function() {
	// Checks if the mouse is interacting with the sling.
		if(level.ball.canMove == true){
			mx = this.scene.getMouseX();
			my = this.scene.getMouseY();
			
			// The player is dragging the sling if the mouse coordinates are on the holder or drag sprite
			// and the mouse is actually clicked.
			if((this.isMouseDown(mx, my) || this.dragSprite.isMouseDown(mx, my)) && this.scene.getMouseClicked()) {
				this.dragging = true;
			
			// And the drag sprite should be launched if the player lets go after dragging.
			} else if(this.dragging && !this.scene.getMouseClicked()) {
				this.fire();
			} // end if
		}
	} // end checkMouseAction
	
	tsling.fire = function() {
	// Calls the drag sprite's fire function and play its launching sfx.
		// But only if the drag sprite hasn't already been launched.
		if(!this.dragSprite.moving) {
			this.dragSprite.fire(this.launchSpeed * this.curDragDist / this.maxDragDist, this.curDragAngle);
			level.launchSound.playSound();
		} // end if
		this.reset();
	} // end fire
	
	tsling.reset = function() {
	// Resets the sling back to a resting state.
		this.dragging = false;
		this.defaultState = true;
		this.setPosition(this.origX, this.origY);
	} // end reset
	
	tsling.drag = function() {
	// Calculates the distance and angle the holder is from the
	// origin and moves the drag sprite.
		mx = this.scene.getMouseX();
		my = this.scene.getMouseY();
		
		// Calculate distance.
		diffX = (this.origX + this.width / 2) - mx;
		diffY = this.origY - my;
		distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
		
		// Calculate angle.
		radians = Math.atan2(diffY, diffX);
		degrees = radians * 180 / Math.PI;
		
		//degrees are offset
		degrees += 90;
		this.curDragAngle = degrees;
		
		// Check if the distance has exceeded the max drag distance.
		if(distance < this.maxDragDist) {
			// Move the holder to the coordinates if not.
			this.curDragDist = distance;
			this.setPosition(mx, my);
		} else {
			this.curDragDist = this.maxDragDist;
			
			// Calculate where the coordinates would be on the circle centered on the
			// origin and with a radius of the max drag distance.
			newX = this.origX + this.maxDragDist * Math.cos(radians) * -1;
			newY = this.origY + this.maxDragDist * Math.sin(radians) * -1;
			this.setPosition(newX, newY);
		} // end if
		
		// Only move the drag sprite if it hasn't already been launched.
		if(!this.dragSprite.moving) {
			this.dragSprite.setPosition(this.x, this.y - 20);
		} // end if
	} // end drag
	
	tsling.update = function() {
		// Update positions if the sling is being dragged.
		if(this.dragging) {
		   if (this.defaultState == true){
			level.stretchSound.playSound();
			this.defaultState = false;
		   }
			this.drag();
			
			// Player is active, so reset the inactivity counter on the drag sprite.
			this.dragSprite.resetWait();
		} else {
			if (!this.dragSprite.moving) {
				// Nothing is happening, so increase the inactivity counter on the drag sprite.
				this.dragSprite.wait();
			} // end if
		} // end if
		
		// Update the stick portion of the sling.
		this.stick.setDX(this.dx);
		this.stick.setDY(this.dy);
		this.stick.update();
		
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if (this.visible){
		  this.draw();
		} // end if
		
		// Draw the two strings to make it look like the sling shot is actually being
		// pulled back.
		ctx = this.context;
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.lineColor;
		ctx.beginPath();
		
		// Start from the left and draw a line towards the center.
		ctx.moveTo(this.stick.x - this.stick.width / 2, this.stick.y - this.stick.height / 2);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
		
		// Start from the right and draw a line towards the center.
		ctx.moveTo(this.stick.x + this.stick.width / 2, this.stick.y - this.stick.height / 2);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	} // end update
	
	return tsling
} // End Sling def