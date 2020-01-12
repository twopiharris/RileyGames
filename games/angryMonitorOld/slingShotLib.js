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
	tsling = new Sprite(scene, centerImage, centerWidth, centerHeight, 1);
	tsling.stick = new Sprite(scene, baseImage, baseWidth, baseHeight, 1);
	
	tsling.setSpeed(0);
	tsling.stick.setSpeed(0);
	tsling.stick.setPosition(x, y);
	tsling.setPosition(tsling.stick.x, tsling.stick.y - tsling.stick.height / 2);
	
	tsling.origX = tsling.x;			// The resting x of the sling.
	tsling.origY = tsling.y;			// The resting y of the sling.
	tsling.dragSprite = dragSprite;		// The sprite to be slung.
	tsling.dragging = false;			// Whether or not the sling is currently being dragged.
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

function Ball(scene, x, y, image, width, height) {
/* The ball class simply moves with a given direction and speed.
*/
	tball = new Sprite(scene, image, width, height, 2);
	tball.setSpeed(0);
	tball.setPosition(x, y);
	tball.setBoundAction(SEMIBOUNCE);
	
	tball.moving = false;		// Whether or not the sprite has been fired.
	tball.numBounces = 0;		// Number of times the sprite has bounced.
	tball.onImg = image;		// The regularly displayed image.
	tball.offImg = null;		// The image to flash to after some inactivity.
	tball.isOff = false;		// Whether or not the sprite is flashing the alternate image.
	tball.waiting = 0;			// The current number of frames of inactivity.
	
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
			} // end if
		} // end if
	} // end update() 
	
	tball.flash = function() {
	// Switches between the normal image and the alternative image.
		if (this.offImg != null) {
			if (this.isOff) {
				this.setImage(this.onImg);
				this.isOff = false;
			} else {
				this.setImage(this.offImg);
				this.isOff = true;
			} // end if
		} // end if
	} // end flash()
	
	tball.wait = function() {
	// Increments the wating counter.
		this.waiting += 1;
	} // end wait()
	
	tball.resetWait = function() {
	// Resets the waiting counter.
		this.waiting = 0;
	} // end resetWait()
	return tball;
} // End Ball def

function Goal(scene, x, y, image, width, height) {
// The goal class simply holds an image and text.
	tgoal = new slingTextBox(scene);
	tgoal.width = width;
	tgoal.height = height;
	tgoal.setImage(image, NONE);
	tgoal.setPosition(x, y);
	
	return tgoal;
} // End Goal def

function Block(scene, x, y, image, width, height) {
// The block object is a sprite with directional collision detection.
// It pretty much sits in one place and blocks other objects.
	tblock = new Sprite(scene, image, width, height, 1);
	tblock.setPosition(x, y);
	tblock.setSpeed(0);
	
	tblock.collides = 0;					// Number of collisions on the block
	tblock.collideImage = 'blox0003.png';	// Image to show when the block has been damaged.
	
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

function Fan(scene, x, y, offImage, onImage, width, height) {
// The fan object toggles between blowing and idle. When blowing,
// it creates an area of effect that can blow other sprites away.
	tfan = new Sprite(scene, offImage, width, height, 1);
	tfan.setPosition(x, y);
	tfan.setSpeed(0);
	
	tfan.blowDirection = 0;				// Direction the fan is blowing.
	tfan.blowStrength = 10;				// How strong the fan blows.
	tfan.blowPeriod = 40;				// Frames between blowing and idle.
	tfan.aoeXOffset = 0;				// X offset for the AOE box.
	tfan.aoeYOffset = 0;				// Y offset for the AOE box.
	tfan.aoeWidth = 50;					// Width of the AOE box.
	tfan.aoeHeight = 300;				// Height of the AOE box.
	tfan.maxAffectDist = 300;			// The max distance the AOE can affect sprites. If set past the height, the blow affect will remain strong throughout the box.
	tfan.inactiveImage = offImage;		// The idle image.
	tfan.inactiveFrames = 0;			// Number of inactive frame animations.
	tfan.inactiveImagePre = '';			// Portion of the inactive animation file name before the frame number. EX: 'images/stop'
	tfan.inactiveImagePost = '';		// Portion of the inactive animation file name after the frame number. EX: '.png'
	tfan.activeImage = onImage;			// The active image.
	tfan.activeFrames = 0;				// Number of active frame animations.
	tfan.activeImagePre = '';			// Portion of the active animation file name before the frame number. EX: 'images/blowing'
	tfan.activeImagePost = '';			// Portion of the active animation file name after the frame number. EX: '.png'
	tfan.active = false;				// Whether or not the fan is currently blowing.
	tfan.curTime = 0;					// The current number of frames between switching animations.
	tfan.curFrame = 1;					// The current frame number.
	
	tfan.setAOEBox = function(xOff, yOff, width, height) {
	// Resets the AOE box attributes.
		this.aoeXOffset = xOff;
		this.aoeYOffset = yOff;
		this.aoeWidth = width;
		this.aoeHeight = height;
	} // end
	
	tfan.setImages = function(offImage, onImage) {
		this.activeImage = onImage;
		this.inactiveImage = offImage;
	} // end setImages
	
	tfan.setActiveAnimation = function(frames, pre, post) {
	// Sets the animation details for the active animation.
		this.activeFrames = frames;
		this.activeImagePre = pre;
		this.activeImagePost = post;
	} // end setActiveAnimation
	
	tfan.setInactiveAnimation = function(frames, pre, post) {
	// Sets the animation details for the inactive animation.
		this.inactiveFrames = frames;
		this.inactiveImagePre = pre;
		this.inactiveImagePost = post;
	} // end setInactiveAnimation
	
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
				this.active = false;
				
				// Change the image if animations are not defined.
				if(this.activeFrames == 0) {
					this.setImage(this.activeImage);
				} // end if
			} else {
				this.active = true;
				
				// Change the image if animations are not defined.
				if(this.inactiveFrames == 0) {
					this.setImage(this.inactiveImage);
				} // end if
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
		if(this.active && this.activeFrames > 0) {
			this.setImage(this.activeImagePre + this.curFrame + this.activeImagePost);
			//console.log(this.activeImagePre + this.curFrame + this.activeImagePost);
			this.curFrame ++;
			// Wrap the animation.
			if(this.curFrame > this.activeFrames) {
				this.curFrame = 1;
			} // end if
		} else if(!this.active && this.inactiveFrames > 0) {
			this.setImage(this.inactiveImagePre + this.curFrame + this.inactiveImagePost);
			//console.log(this.inactiveImagePre + this.curFrame + this.inactiveImagePost);
			this.curFrame ++;
			// Wrap the animation.
			if(this.curFrame > this.inactiveFrames) {
				this.curFrame = 1;
			} // end if
		} // end if
	} // end update
	
	return tfan;
} // end Fan def

function SlingQuestion(bs, time, details, correct, answers) {
// An extension of the prepost Question class. Holds information about blood sugar.

	tq = new Question(details, correct, answers);
	tq.bs = bs;
	tq.time = time;
	return tq;
} // end SHQuestion def

function BG(scene, image, width, height, x, y) {
// A static sprite.
	tBG = new Sprite(scene, image, width, height, 0);
	tBG.setSpeed(0);
	tBG.setPosition(x, y);
	return tBG;
} // end BG def

function slingTextBox(scene){
// A simplified text box that displays text within a box.
	this.x = 0;
	this.y = 0;
	this.scene = scene;
	this.context = scene.context;
	this.visible = true;
	
	this.width = 50;
	this.height = 50;
	this.backColor = '#FFFFFF';
	this.backAlpha = 1.0;
	this.backImage = null;
	this.backgroundImg = new Image();
	this.backStyle = STRETCH;
	
	this.text = 'Text Text';
	this.font = 'Arial';
	this.fontSize = 20;
	this.fontColor = '#000000';
	
	this.borderSize = 2;
	this.borderColor = '#000000';
	this.borderAlpha = 1.0;
	
	this.marginTop = 5;
	this.marginBottom = 5;
	this.marginRight = 5;
	this.marginLeft = 5;
	
	this.setBackground = function(color, alpha) {
		this.backColor = color;
		this.backAlpha = alpha;
	} // end changeBackground
	
	this.setImage = function(image, style) {
		this.backImage = image;
		this.backStyle = style;
		if(this.backImage != null) {
			this.backgroundImg.src = this.backImage;
		} // end if
	} // end changeImage
	
	this.setFont = function(font, size, color) {
		this.font = font;
		this.fontSize = size;
		this.fontColor = color;
	} // end changeFont
	
	this.setBorder = function(size, color, alpha) {
		this.borderSize = size;
		this.borderColor = color;
		this.borderAlpha = alpha;
	} // end changeBorder
	
	this.setMargin = function(top, bot, rig, lef) {
		this.marginTop = top;
		this.marginBottom = bot;
		this.marginRight = rig;
		this.marginLeft = lef;
	} // end setMargin
	
	this.resize = function(width, height) {
		this.width = width;
		this.height = height;
	} // end resize
	
	this.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
	} // end position
	
	this.isClicked = function(){
		//determines if mouse is clicked on this element
		mx = this.scene.getMouseX();
		my = this.scene.getMouseY();
		sLeft = this.x;
		sRight = this.x + this.width;
		sTop = this.y;
		sBottom = this.y + this.height;
		hit = false;
		
		if (mx > sLeft){
		  if (mx < sRight){
			if (my > sTop){
			  if (my < sBottom){
				  if (this.scene.getMouseClicked()){
					hit = true;
				  } // end if
			  } // end if
			} // end if
		  } // end if
		} // end if
		return hit;
	} // end isClicked
	
	this.collidesWithSprite = function(sprite){
		//check for collision with another sprite
		
		//collisions only activated when both sprites are visible
		collision = false;
		if (this.visible){
		  
		  if (sprite.visible){
		//define borders
		myLeft = this.x;
		myRight = this.x + this.width;
		myTop = this.y;
		myBottom = this.y + this.height;
		otherLeft = sprite.x - (sprite.width / 2);
		otherRight = sprite.x + (sprite.width / 2);
		otherTop = sprite.y - (sprite.height / 2);
		otherBottom = sprite.y + (sprite.height / 2);
		
		//assume collision
		collision = true;
		
		//determine non-colliding states
		if ((myBottom < otherTop) ||
			(myTop > otherBottom) ||
			(myRight < otherLeft) ||
			(myLeft > otherRight)) {
			  collision = false;
		} // end if

		  } // end 'other visible' if
		} // end 'I'm visible' if

		return collision;
	} // end collidesWith
	
	this.writeText = function() {
		ctx = this.context;
		ctx.font = this.fontSize + 'px ' + this.font;
		ctx.fillStyle = this.fontColor;
		ctx.globalAlpha = 1.0;
		ctx.textAlign = "left";
		xOffset = this.borderSize + this.marginLeft;
		yOffset = this.borderSize + this.marginTop + this.fontSize;
		maxWidth = this.width - (this.borderSize + this.marginRight) - (this.borderSize + this.marginLeft);
		maxHeight = this.height - (this.borderSize + this.marginBottom);
		
		start = 0;
		end = this.text.length;
		lines = 0;
		lineHeight = this.fontSize;
		complete = false;
		
		while(!complete) {
			subText = this.text.slice(start, end);
			width = ctx.measureText(subText).width;
			
			if (width > maxWidth) {
				end = start + Math.floor((end - start) * (maxWidth / width));
				while(this.text.charAt(end) != ' ' && end > start) {
					end --;
				} // end while
				if (end == start) {
					end = start + Math.floor((end - start) * (maxWidth / width));
					if(end == start) {
					// Just in case the font size is so large only one letter can be printed.
						end ++;
					} // end if
				} else if(this.text.charAt(start) == ' ' ) {
					start ++;
				} // end if
			} else {
				if(this.text.charAt(start) == ' ') {
					start ++;
				} // end if
				complete = true;
			} // end if
			
			subText = this.text.slice(start, end);
			if(yOffset + lines * lineHeight > maxHeight) {
				complete = true;
			} else {
				ctx.fillText(subText, this.x + xOffset, this.y + yOffset + lines * lineHeight);
			} // end if
			
			lines ++;
			start = end;
			end = this.text.length;
		} // end while
	} // end writeTextWidth
	
	this.drawBackground = function() {
		ctx = this.context;
		ctx.globalAlpha = 1.0;
		startX = this.x + this.borderSize;
		startY = this.y + this.borderSize;
		fullWidth = this.width - this.borderSize;
		fullHeight = this.height - this.borderSize;
		imgWidth = this.backgroundImg.width;
		imgHeight = this.backgroundImg.height;
		img = this.backgroundImg;
		smallestWidth = fullWidth;
		smallestHeight = fullHeight;
		if(imgWidth < fullWidth) { smallestWidth = imgWidth; }
		if(imgHeight < fullHeight) { smallestHeight = imgHeight; }
		
		if(this.backStyle == STRETCH) {
			ctx.drawImage(img, startX, startY, this.width, this.height);
		} else if(this.backStyle == TILE) {
			repeatsY = Math.ceil(fullHeight / imgHeight);
			for(var j = 0; j < repeatsY; j ++) {
				if(imgWidth < fullWidth) { smallestWidth = imgWidth; }
				if(imgHeight > fullHeight - j * imgHeight) { smallestHeight = fullHeight - j * imgHeight; }
				repeatsX = Math.ceil(fullWidth / imgWidth);
				for(var i = 0; i < repeatsX; i ++) {
					if(imgWidth > fullWidth - i * imgWidth) { smallestWidth = fullWidth - i * imgWidth; }
					ctx.drawImage(img, 0, 0, smallestWidth, smallestHeight, startX + i * imgWidth, startY + j * imgHeight, smallestWidth, smallestHeight);
				} // end for
			} // end for
		} else if(this.backStyle == TILE_X) {
			repeats = Math.ceil(fullWidth / imgWidth);
			for(var i = 0; i < repeats; i ++) {
				if(imgWidth > fullWidth - i * imgWidth) { smallestWidth = fullWidth - i * imgWidth; }
				ctx.drawImage(img, 0, 0, smallestWidth, smallestHeight, startX + i * imgWidth, startY, smallestWidth, smallestHeight);
			} // end for
		} else if(this.backStyle == TILE_Y) {
			repeats = Math.ceil(fullHeight / imgHeight);
			for(var i = 0; i < repeats; i ++) {
				if(imgHeight > fullHeight - i * imgHeight) { smallestHeight = fullHeight - i * imgHeight; }
				ctx.drawImage(img, 0, 0, smallestWidth, smallestHeight, startX, startY + i * imgHeight, smallestWidth, smallestHeight);
			} // end for
		} else if(this.backStyle == NONE) {
			ctx.drawImage(img, 0, 0, smallestWidth, smallestHeight, startX, startY, smallestWidth, smallestHeight);
		} // end if
	} // end drawBackground
	
	this.draw = function() {
		ctx = this.context;
		
		// Draw the background first.
		ctx.fillStyle = this.backColor;
		ctx.globalAlpha = this.backAlpha;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		if(this.backImage != null) {
			this.drawBackground();
		} // end if
		
		// Borders next.
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderSize;
		ctx.globalAlpha = this.borderAlpha;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		
		// Text last.
		this.writeText();
	} // end draw()
	
	this.update = function() {
		if(this.visible) {
			this.draw();
		} // end if
	} // end update
	
	return this;
} // end DialogueBox

function Level() {
// The level class contains everything needed to make a level for the game as well as provides functions
// to easily run the game. Calling the level's init function will start the game.
	// All game affecting variables are listed here and can be changed before running the game and
	// are ordered by object they are tied to.
	
	// Game object variables.
	this.gameWidth = 950;
	this.gameHeight = 425;
	this.gameOver = false;
	
	// Background variables.
	this.bgImage = 'BG0001.png';
	this.bgWidth = 950;
	this.bgHeight = 425;
	this.bgX = 475;
	this.bgY = 212;
	
	// Scenario image variables.
	this.scenarioImage = 'scenarios0001.png'
	this.scenarioWidth = 300;
	this.scenarioHeight = 106;
	this.scenarioX = 150;
	this.scenarioY = 53;
	
	// Correct-banner variables.
	this.correctImage = 'correct.png';
	this.incorrectImage = 'tryagain.png';
	this.bannerWidth = 300;
	this.bannerHeight = 100;
	this.bannerX = 495;
	this.bannerY = 200;
	
	// Sling variables.
	this.slingX = 75;
	this.slingY = 330;
	this.slingBaseImage = 'wholeslingshot.png';
	this.slingBaseWidth = 70;
	this.slingBaseHeight = 102;
	this.slingHolderImage = 'center.png';
	this.slingHolderWidth = 16;
	this.slingHolderHeight = 16;
	this.slingLineColor = '#000000';
	this.slingLineWidth = 5;
	this.maxDrag = 50;
	this.launchSpeed = 35;
	
	// Ball variables.
	this.gravityStrength = 1;
	this.ballFont = 'Arial';
	this.ballFontSize = 0;
	this.ballFontColor = '#000000';
	this.ballImage = 'GlucoseMonitor/GlucoseMonitor0001.png';
	this.ballWidth = 64;
	this.ballHeight = 64;
	this.ballTextXOffset = -15;
	this.ballTextYOffset = 0;
	this.ballBlankImage = 'GlucoseMonitor/GlucoseMonitor0000.png';
	
	// Goal variables.
	this.goalCount = 3;
	this.goalsX = [600, 600, 600];
	this.goalsY = [50, 184, 304];
	this.goalFont = 'Arial';
	this.goalFontSize = 15;
	this.goalFontColor = '#000000';
	this.goalsColor = ['#00AAFF', '#00AAFF', '#00AAFF'];
	this.goalsAlpha = [0.5, 0.5, 0.5];
	this.goalsStyle = [NONE, NONE, NONE];
	this.goalsBorderColor = ['#000000', '#000000', '#000000'];
	this.goalsBorderSize = [1, 1, 1];
	this.goalsBorderAlpha = [1.0, 1.0, 1.0];
	this.goalsXMarginSize = [64, 64, 64];
	this.goalsYMarginSize = [5, 5, 5]
	this.goalsImage = ['icons64/No.png', 'icons64/No.png', 'icons64/No.png'];
	this.goalsWidth = [289, 289, 289];
	this.goalsHeight = [92, 82, 82];
	
	// Block variables.
	this.numBlocks = 0;
	this.blocksImage = [];
	this.blocksWidth = [];
	this.blocksHeight = [];
	this.blocksX = [];
	this.blocksY = [];
	
	// Fan variables.
	this.numFans = 0;
	this.fansOffImage = [];
	this.fansOnImage = [];
	this.fansWidth = [];
	this.fansHeight = [];
	this.fansX = [];
	this.fansY = [];
	this.fansStrength = [];
	this.fansDirection = [];
	this.fansEffectXOffset = [];
	this.fansEffectYOffset = [];
	this.fansEffectWidth = [];
	this.fansEffectHeight = [];
	this.fansEffectMaxDistance = [];
	this.fansEffectFramePeriod = [];
	this.fansOffFrames = [];
	this.fansOffImagePre = [];
	this.fansOffImagePost = [];
	this.fansOnFrames = [];
	this.fansOnImagePre = [];
	this.fansOnImagePost = [];
	this.fansAngle = [];
	
	// Question variables.
	this.questionFont = 'Arial';
	this.questionFontSize = 30;
	this.questionFontColor = '#000000';
	this.questionBoxWidth = 475;
	this.questionBoxHeight = 100;
	this.questionX = this.gameWidth / 2 - this.questionBoxWidth / 2;
	this.questionY = this.gameHeight / 2 - this.questionBoxHeight / 2;
	this.questionBoxColor = '#00FF00';
	this.questionBoxAlpha = 0.0;
	this.questionBoxImage = null;
	this.questionBoxStyle = NONE;
	this.questionBoxBorderColor = '#000000';
	this.questionBoxBorderSize = 2;
	this.questionBoxBorderAlpha = 0.0;
	this.questionBoxMarginSize = 5;
	this.questionDetails = 'In class after lunch.';
	this.correct = 0;
	this.bs = 55;
	this.time = '12:00';
	this.answers = ['Drink ½ cup juice or eat 15 skittles and retest in 15 minutes. Once above 80, eat 15 grams of crackers.',
					'Put your head down on your desk until you feel better.', 
					'Eat a chocolate bar until class is over and you can go to the nurse.'];
	
	// Helper variables.
	this.helperX = 850;
	this.helperY = 325;
	this.helperWidth = 200;
	this.helperHeight = 200;
	this.helperImage = 'AnimatedCat/CatTalk1.png';
	this.helperClue = 'Pick the long one.';
	this.clueX = 700;
	this.clueY = 690;
	this.clueWidth = 260;
	this.clueHeight = 85;
	this.clueImage = 'TalkBubble.png'
	this.clueStyle = 4;
	this.clueAlign = 'center';
	this.clueColor = '#FFFFFF';
	this.clueAlpha = 0.0;
	this.clueBorderAlpha = 0.0;
	this.clueBorderColor = '#000000';
	this.clueBorderSize = 2;
	this.helperFont = 'Arial';
	this.helperFontSize = 20;
	this.helperLineWidth = 200;
	this.helperFontColor = '#000000';
	this.helperTalkFrames = 12;
	this.helperTalkPre = 'AnimatedCat/CatTalk';
	this.helperTalkPost = '.png';
	this.helperWaveFrames = 28;
	this.helperWavePre = 'AnimatedCat/CatLookAtMe';
	this.helperWavePost = '.png';
	
	// Sound variables.
	this.correctSoundFile = 'sounds/yaycrowdeditedshorter.ogg';
	this.wrongSoundFile = 'sounds/wrong.ogg';
	this.fanSound = 'sounds/fanhum.ogg';
	this.stretchSound = 'sounds/slingstretch.ogg';
	this.launchSound = 'sounds/monitorwhoosh.ogg';
	this.hitBlockSound = 'sounds/blockCollision.ogg';
	this.breakBlockSound = 'sounds/breakBlock.ogg';
	
	// Post synopsis box variables.
	this.explanation = 'Here is an explanation.';
	this.postBoxWidth = 400;
	this.postBoxHeight = 228;
	this.postBoxColor = '#00FF00';
	this.postBoxAlpha = 1.0;
	this.postBoxFontColor = '#000000';
	this.postBoxFont = 'Arial';
	this.postBoxFontSize = 20;
	this.postBoxImage = 'HappyCat2.png';
	this.postBoxStyle = 4;
	this.postBoxMarginTop = 128;
	
	// Tutorial variables.
	this.tutorialSceneCount = 0;
	this.tutorialText = [];
	this.tutorialTarget = [];
	this.tutorialBoxImage = [];
	this.tutorialBoxColor = [];
	this.tutorialBoxAlpha = [];
	this.tutorialBoxFont = [];
	this.tutorialBoxFontSize = [];
	this.tutorialBoxFontColor = [];
	this.tutorialBoxWidth = [];
	this.tutorialBoxHeight = [];
	this.tutorialBoxX = [];
	this.tutorialBoxY = [];
	this.tutorialBoxBorderSize = [];
	this.tutorialBoxBorderColor = [];
	this.tutorialBoxBorderAlpha = [];
	this.tutorialBoxMarginTop = [];
	this.tutorialBoxMarginBottom = [];
	this.tutorialBoxMarginRight = [];
	this.tutorialBoxMarginLeft = [];
	
	
	
	// Controls how the question is displayed
	this.topQuestionLayout = false;
	
	// Variables beyond here are initialized using the level's init function.
	this.game;
	this.bg;
	this.scenario;
	this.banner;
	this.bannerCounter;
	this.ball;
	this.sling;
	this.helper;
	this.question;
	this.questionBox;
	this.goals;
	this.goalBoxes;
	this.correctSound;
	this.wrongSound;
	this.fanSound;
	this.stretchSound;
	this.launchSound;
	this.hitBlockSound;
	this.breakBlockSound;
	this.joy;
	this.postBox;
	this.blocks;
	this.fans;
	this.sound;
	this.tutorialBoxes;
	this.soundWaitCounter;
	this.soundWaitTarget;
	this.tutorialAlphaSheet;
	
	this.init = function() {
	// Initializes all the various components needed to run in the game and then starts the game.
		this.game = new Scene();
		this.resetGame();
	} // end init
	
	this.update = function() {
		this.game.clear()
		
		// Get the sounds ready to be played after they have been given enough time
		// to be retrieved by the browser.
		// NOTE: Sound recently stopped working for iPad but still works on the Google Nexus (which it didn't before preloading the sounds).
		if(this.soundWaitCounter == this.soundWaitTarget) {
			this.correctSound.playSound({sound:0});
			this.wrongSound.playSound({sound:0});
			this.launchSound.playSound({sound:0});
			this.hitBlockSound.playSound({sound:0});
			this.breakBlockSound.playSound({sound:0});
			this.soundWaitCounter ++;
		} else if(this.soundWaitCounter < this.soundWaitTarget) {
			this.soundWaitCounter ++;
		} // end if
		
		// Handle the different game states.
		
		// The level ends only after the post box has been clicked.
		if(this.postBox.visible) {
			this.checkPostClicked();
			
		// The level is only playable if all the tutorial boxes have been clicked.
		} else if(this.checkTutorialVisible() == false){ 
			this.checkBlockCollision();
			this.addForces();
			this.bannerTick();
			this.sling.checkMouseAction();
			this.checkDone();
		} // end if
		
		
		this.bg.update();
		this.sling.update();
		this.updateFans();
		this.updateBlocks();
	
		// Update which ever question box is being used.
		if(this.topQuestionLayout) {
			this.questionBox.update();
		} else {
			this.scenario.update();
		} // end if
		
		this.ball.update();
		this.updateGoals();
		this.helper.update();
		this.banner.update();
		this.postBox.update();
		
		this.tutorialAlphaSheet.update();
		this.updateTutorialBoxes();
	} // end update
	
	this.makeQuestionBox = function() {
	// Initializes the question box that holds the scenario text.
		this.questionBox = new slingTextBox(this.game);
		//this.questionBox.setPosition(this.questionX, this.questionY);
		this.questionBox.setPosition(0, 0);
		//this.questionBox.resize(this.questionBoxWidth, this.questionBoxHeight);
		this.questionBox.resize(this.gameWidth, 50);
		this.questionBox.setFont(this.questionFont, this.questionFontSize, this.questionFontColor);
		this.questionBox.text = this.questionDetails;
		this.questionBox.setBorder(this.questionBoxBorderSize, this.questionBoxBorderColor, this.questionBoxBorderAlpha);
		this.questionBox.setBackground(this.questionBoxColor, this.questionBoxAlpha);
		this.questionBox.setImage(this.questionBoxImage, this.questionBoxStyle);
		this.questionBox.setMargin(this.questionBoxMarginSize, this.questionBoxMarginSize, this.questionBoxMarginSize, this.questionBoxMarginSize);
	} // end makeQuestionBox
	
	this.makeTutorialBoxes = function () {
	// Creates the tutorial boxes.
		this.tutorialBoxes = new Array();
		
		// Make as many as were defined by the level.
		for(var i = 0; i < this.tutorialSceneCount; i ++) {
			this.tutorialBoxes[i] = new slingTextBox(this.game, this.tutorialBoxImage[i]);
			this.tutorialBoxes[i].setPosition(this.tutorialBoxX[i], this.tutorialBoxY[i]);
			this.tutorialBoxes[i].resize(this.tutorialBoxWidth[i], this.tutorialBoxHeight[i]);
			this.tutorialBoxes[i].setImage(this.tutorialBoxImage[i], 0);
			this.tutorialBoxes[i].setFont(this.tutorialBoxFont[i], this.tutorialBoxFontSize[i], this.tutorialBoxFontColor[i]);
			this.tutorialBoxes[i].text = this.tutorialText[i];
			this.tutorialBoxes[i].setBackground(this.tutorialBoxColor[i], this.tutorialBoxAlpha[i]);
			this.tutorialBoxes[i].setBorder(this.tutorialBoxBorderSize[i], this.tutorialBoxBorderColor[i], this.tutorialBoxBorderAlpha[i]);
			this.tutorialBoxes[i].setMargin(this.tutorialBoxMarginTop[i], this.tutorialBoxMarginBottom[i], this.tutorialBoxMarginRight[i], this.tutorialBoxMarginLeft[i]);
			if(i > 0) {
				this.tutorialBoxes[i].visible = false;
			} // end if
		} // end for
		
		// Set the tutorial alpha sheet invisible if there were no tutorial boxes defined.
		if(this.tutorialBoxes.length == 0) {
			this.tutorialAlphaSheet.visible = false;
		} // end if
	} // end makeTutorialBoxes
	
	this.makeHelper = function() {
	// Initializes the helper object.
		this.helper = new Helper(this.game, this.helperImage, this.helperWidth, this.helperHeight);
		this.helper.setPosition(this.helperX, this.helperY);
		this.helper.setClue(this.helperClue, this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
		this.helper.setClueBoxSize(this.clueWidth, this.clueHeight);
		this.helper.setClueAlign(this.clueAlign);
		this.helper.setClueBoxBackground(this.clueImage, this.clueStyle, this.clueColor, this.clueAlpha);
		this.helper.setClueBoxBorder(this.clueBorderSize, this.clueBorderColor, this.clueBorderAlpha);
		this.helper.setTalkAnimation(this.helperTalkFrames, this.helperTalkPre, this.helperTalkPost);
		this.helper.setWaveAnimation(this.helperWaveFrames, this.helperWavePre, this.helperWavePost);
		this.helper.makeHelpBox();
	} // end makeHelper
	
	this.makeGoals = function() {
	// Creates the goal objects.
		this.goals = new Array();
		
		// Make as many goals as were defined by the level.
		for (var i = 0; i < this.goalCount; i ++) {
			this.goals[i] = new Goal(this.game, this.goalsX[i], this.goalsY[i], this.goalsImage[i], this.goalsWidth[i], this.goalsHeight[i]);
			this.goals[i].setFont(this.goalFont, this.goalFontSize, this.goalFontColor);
			this.goals[i].text = this.question.answers[i];
			//this.goals[i].fitText();
			this.goals[i].setBorder(this.goalsBorderSize[i], this.goalsBorderColor[i], this.goalsBorderAlpha[i]);
			this.goals[i].setBackground(this.goalsColor[i], this.goalsAlpha[i]);
			this.goals[i].setMargin(this.goalsYMarginSize[i], 5, 5, this.goalsXMarginSize[i]);
			this.goals[i].style = this.goalsStyle[i];
		} // end for
	} // end makeGoals
	
	this.makeBlocks = function() {
	// Creates the block objects in the level.
		this.blocks = new Array();
		
		// Make as many blocks as were defined by the level.
		for(var i = 0; i < this.numBlocks; i ++) {
			this.blocks[i] = new Block(this.game, this.blocksX[i], this.blocksY[i], this.blocksImage[i], this.blocksWidth[i], this.blocksHeight[i]);
		} // end for
	} // end makeBlocks
	
	this.makeFans = function() {
	// Creates the fan objects in the level.
		this.fans = new Array();
		
		// Create as many as are defined by the level.
		for(var i = 0; i < this.numFans; i ++) {
			this.fans[i] = new Fan(this.game, this.fansX[i], this.fansY[i], this.fansOffImage[i], this.fansOnImage[i], this.fansWidth[i], this.fansHeight[i]);
			this.fans[i].setAOEBox(this.fansEffectXOffset[i], this.fansEffectYOffset[i], this.fansEffectWidth[i], this.fansEffectHeight[i]);
			this.fans[i].setBlowDirection(this.fansDirection[i]);
			this.fans[i].setBlowStrength(this.fansStrength[i]);
			this.fans[i].setMaxDistance(this.fansEffectMaxDistance[i]);
			this.fans[i].setBlowPeriod(this.fansEffectFramePeriod[i]);
			this.fans[i].setActiveAnimation(this.fansOnFrames[i], this.fansOnImagePre[i], this.fansOnImagePost[i]);
			this.fans[i].setInactiveAnimation(this.fansOffFrames[i], this.fansOffImagePre[i], this.fansOffImagePost[i]);
			this.fans[i].setImgAngle(this.fansAngle[i]);
		} // end for
	} // end makeFans
	
	this.makePostBox = function() {
	// Initialize the post box which summarizes why answers are (in)correct.
		this.postBox = new slingTextBox(this.game);
		this.postBox.resize(this.postBoxWidth, this.postBoxHeight);
		this.postBox.setFont(this.postBoxFont, this.postBoxFontSize, this.postBoxFontColor);
		this.postBox.text = this.explanation;
		this.postBox.marginTop = this.postBoxMarginTop;
		this.postBox.setBackground(this.postBoxColor, this.postBoxAlpha);
		this.postBox.setImage(this.postBoxImage, this.postBoxStyle);
		this.postBox.x = this.gameWidth / 2 - this.postBox.width / 2;
		this.postBox.y = this.gameHeight / 2 - this.postBox.height / 2;
		this.postBox.visible = false;
		this.gotCorrect = false;
	} // end makePostBox
	
	this.updateGoals = function() {
		for (var i = 0; i < this.goals.length; i ++) {
			this.goals[i].update();
			
			// Check if the monitor collided with any of the goals and if it was the correct goal.
			if(this.goals[i].collidesWithSprite(this.ball)) {
				this.checkCorrect(i);
			} // end if
		} // end for
	} // end updateGoals
	
	this.updateBlocks = function() {
		for(var i = 0; i < this.numBlocks; i ++) {
			this.blocks[i].update();
		} // end for
	} // end updateBlocks
	
	this.updateFans = function() {
		for(var i = 0; i < this.numFans; i ++) {
			this.fans[i].update();
		} // end for
	} // end updateFans
	
	this.updateTutorialBoxes = function() {
		for(var i = 0; i < this.tutorialBoxes.length; i ++) {
			this.tutorialBoxes[i].update();
			if(this.tutorialBoxes[i].visible) {
				
				// If a tutorial box has a target game object,
				// draw it above the alpha sheet.
				// NOTE: this doubles the speed of the object.
				var target = this.tutorialTarget[i];
				if(target == "monitor") {
					this.sling.update();
					this.ball.update();
				} else if(target == "helper") {
					this.helper.update();
				} else if(target == "question") {
					this.scenario.update();
				} else if(target == "goal") {
					this.updateGoals();
				} else if(target == "fan") {
					this.updateFans();
				} else if(target == "block") {
					this.updateBlocks();
				} // end if
				
				// If the current tutorial box is clicked, hide it and display the next.
				if(this.tutorialBoxes[i].isClicked()) {
					this.tutorialBoxes[i].visible = false;
					if(this.tutorialBoxes.length > i + 1) {
						this.tutorialBoxes[i + 1].visible = true;
						
					// Hide the alpha sheet if there are no more tutorial boxes.
					} else {
						this.tutorialAlphaSheet.visible = false;
					} // end if
				} // end if
			} // end if
		} // end for
	} // end updateTutorialBoxes
	
	this.addForces = function() {
	// Adds different forces to the monitor.
		// Forces are added only if the monitor is moving.
		if(this.ball.moving) {
			// First add the downward gravity.
			this.ball.addVector(180, this.gravityStrength);
			
			// Then check if the monitor is in any active fan AOE boxes.
			for(var i = 0; i < this.numFans; i ++) {
				if(this.fans[i].collidesWithAOE(this.ball)) {
					// Calculate the strength of the force based on the distance from the fan.
					var str = this.fans[i].blowStrength * (1 - this.fans[i].distanceTo(this.ball) / this.fans[i].maxAffectDist);
					if(str < 0) str = 0;
					
					this.ball.addVector(this.fans[i].blowDirection, str);
				} // end if
			} // end for
		} // end if
	} // end addForces
	
	this.bannerTick = function() {
	// After some time, hides the status banner that pops up after a goal is hit.
		if (this.banner.visible) {
			if (this.bannerCounter >= 25) {
				this.banner.visible = false;
				this.bannerCounter = 0;
				console.log("banner reset.");
			} else {
				this.bannerCounter += 1;
				console.log("count");
			} // end if
		} // end if
	} // end bannerTick()
	
	this.checkBlockCollision = function() {
	// Checks if the monitor collides with any blocks.
		for(var i = 0; i < this.numBlocks; i ++) {
			// Get the direction the monitor has collided with the block.
			direction = this.blocks[i].directionalCollisionWith(this.ball);
			console.log(direction);
			
			if(direction != -1) {
				// Move the ball back a step.
				this.ball.setPosition(this.ball.x - this.ball.dx, this.ball.y - this.ball.dy);
				
				// Flip dx if the collision was horizontal.
				if(direction == LEFT || direction == RIGHT) {
					this.ball.setDX(this.ball.dx * -1);
					
				// Flip dy if the collision was vertical.
				} else if(direction == TOP || direction == BOTTOM) {
					this.ball.setDY(this.ball.dy * -1);
					
				// Flip both for corner cases.
				} else {
					this.ball.setDX(this.ball.dx * -1);
					this.ball.setDY(this.ball.dy * -1);
				} // end if
				
				// Calculate the new speed and angle.
				this.ball.calcSpeedAngle();
				
				// Slow the ball down just a little.
				this.ball.setSpeed(.8 * this.ball.getSpeed());
				
				// Count the bounce.
				this.ball.numBounces ++;
				
				// Damage the collided block.
				this.blocks[i].addDamage();
				
				// Play the sound effect for a hit block.
				this.hitBlockSound.playSound();
				//console.log(i);
			} // end if
		} // end for
	} // end checkBlockCollision
	
	this.checkDone = function() {
	// Soft resets the level if the monitor falls off screen or bounces too much.
		if (this.ball.y > this.game.height + 1) {
			this.resetLevel();
		} // end if
		if (this.ball.numBounces > 15) {
			this.resetLevel();
		} // end if
	} // end checkDone
	
	this.checkCorrect = function(answer) {
	// Check if the answer is correct and handles what happens next.
	
		// Play the correct sound, show the right banner, and show the post box if the player was correct.
		if(answer == this.question.correct) {
			this.correctSound.playSound();
			this.banner.setImage(this.correctImage);
			this.banner.visible = true;
			this.showPostBox();
			
		// Otherwise, play the wrong sound, show the wrong banner, and get the helper to wave.	
		} else {
			this.wrongSound.playSound();
			this.banner.setImage(this.incorrectImage);
			this.banner.visible = true;
			this.goals[answer].visible = false;
			this.helper.wave();
		} // end if
		this.resetLevel();
	} // end checkCorrect
	
	this.checkPostClicked = function() {
	// Hides the post box and banner and flags the level as complete.
		if (this.game.getMouseClicked()) {
			this.postBox.visible = false;
			this.banner.visible = false;
			this.gameOver = true;
		} // end if
	} // end checkPostClicked
	
	this.checkQuestionBoxClicked = function() {
	// Hides the question box if it is clicked.
	// NOTE: the current layout of the game does not require the questionBox object.
		if(this.game.getMouseClicked() && !this.scenario.isClicked()) {
			this.questionBox.visible = false;
		} // end if
	} // end checkQuestionBoxClicked
	
	this.checkScenarioClicked = function() {
	// Shows the question box if the scenario is clicked.
	// NOTE: the current layout of the game does not require the questionBox object.
		if(this.scenario.isClicked() && this.game.getMouseClicked() && !this.sling.dragging) {
			this.questionBox.visible = true;
		} // end if
	} // end checkScenarioClicked
	
	this.checkTutorialVisible = function() {
	// Checks if any of the tutorial boxes are visible.
		for(var i = 0; i < this.tutorialBoxes.length; i ++) {
			if(this.tutorialBoxes[i].visible) {
				return true;
			} // end if
		} // end for
		return false;
	} // end checkTutorialVisible
	
	this.showPostBox = function() {
		this.postBox.visible = true;
	} // end showPostBox
	
	this.resetLevel = function() {
	// Soft resets the level by just moving the monitor back to the sling.
		this.ball.reset(this.sling.x, this.sling.y);
		this.ball.numBounces = 0;
		this.ball.show();
	} // end reset
	
	this.resetGame = function() {
	// Resets and remakes all the game objects.
	// NOTE: Though this is done only when a new level is loaded, it could be made better by making
	// a separate start game function that does all this and having reset only change certain assets.
	// Objects like blocks and fans that may not have the same number from level to level will need to
	// be destroyed and created though.
		// Initialize the scene.
		this.game.setSize(this.gameWidth, this.gameHeight);
		
		// Initialize the background.
		this.bg = new BG(this.game, this.bgImage, this.bgWidth, this.bgHeight, this.bgX, this.bgY);
		
		// Initialize a sprite to cover the background as the tutorial is visible.
		this.tutorialAlphaSheet = new BG(this.game, 'alphaSheet.png', this.gameWidth, this.gameHeight, this.gameWidth / 2, this.gameHeight / 2);
		
		// Initialize the banner that indicates correctness.
		this.banner = new BG(this.game, this.correctImage, this.bannerWidth, this.bannerHeight, this.bannerX, this.bannerY);
		this.banner.visible = false;
		this.bannerCounter = 0;
		
		// Initialize the monitor.
		this.ball = new Ball(this.game, this.slingX, this.slingY, this.ballImage, this.ballWidth, this.ballHeight);
		this.ball.offImg = this.ballBlankImage;
		
		// Initialize the sling.
		this.sling = new Sling(this.game, this.slingX, this.slingY, this.slingBaseImage, this.slingBaseWidth,
							   this.slingBaseHeight, this.slingHolderImage, this.slingHolderWidth, this.slingHolderHeight,
							   this.ball, this.maxDrag, this.launchSpeed);
		this.sling.changeLineInfo(this.slingLineColor, this.slingLineWidth);
		this.ball.setPosition(this.sling.x, this.sling.y);
		
		// Initialize the sounds.
		this.correctSound = new Sound(this.correctSoundFile);
		this.wrongSound = new Sound(this.wrongSoundFile);
		this.fanSound = new Sound(this.fanSoundFile);
		this.stretchSound = new Sound(this.stretchSoundFile);
		this.launchSound = new Sound(this.launchSoundFile);
		this.hitBlockSound = new Sound(this.hitBlockSoundFile);
		this.breakBlockSound = new Sound(this.breakBlockSoundFile);
		
		// Initialize the question.
		this.question = new SlingQuestion(this.bs, this.time, this.questionDetails, this.correct, this.answers);
		
		// Initialize the question box or scenario image, depending on the level layout.
		if(this.topQuestionLayout) {
			this.makeQuestionBox();
		} else {
			this.scenario = new BG(this.game, this.scenarioImage, this.scenarioWidth, this.scenarioHeight, this.scenarioX, this.scenarioY);
		} // end 
		
		// Make everything else.
		this.makeHelper();
		this.makeGoals();
		this.makeTutorialBoxes();
		this.makeBlocks();
		this.makeFans();
		this.makePostBox();
		
		this.soundWaitCounter = 0;
		this.soundWaitTarget = 20;
			
		this.joy = new Joy();
		this.game.start();
	} // end resetGame
	
	this.defaults = function() {
	// Resets the level back to default variable values.
		// Game object variables.
		this.gameWidth = 948;
		this.gameHeight = 711;
		this.gameOver = false;
		
		// Background variables.
		this.bgImage = 'BG0001.png';
		this.bgWidth = 950;
		this.bgHeight = 711;
		this.bgX = 475;
		this.bgY = 355;
		
		// Scenario image variables.
		this.scenarioImage = 'scenarios0001.png'
		this.scenarioWidth = 300;
		this.scenarioHeight = 106;
		this.scenarioX = 150;
		this.scenarioY = 53;
		
		// Correct-banner variables.
		this.correctImage = 'Banner0001.png';
		this.incorrectImage = 'Banner0002.png';
		this.bannerWidth = 300;
		this.bannerHeight = 100;
		this.bannerX = 495;
		this.bannerY = 150;
		
		// Sling variables.
		this.slingX = 75;
		this.slingY = 550;
		this.slingBaseImage = 'wholeslingshot.png';
		this.slingBaseWidth = 70;
		this.slingBaseHeight = 102;
		this.slingHolderImage = 'center.png';
		this.slingHolderWidth = 16;
		this.slingHolderHeight = 16;
		this.slingLineColor = '#000000';
		this.slingLineWidth = 5;
		this.maxDrag = 50;
		this.launchSpeed = 35;
		
		// Ball variables.
		this.gravityStrength = 1;
		this.ballFont = 'Arial';
		this.ballFontSize = 0;
		this.ballFontColor = '#000000';
		this.ballImage = 'GlucoseMonitor/GlucoseMonitor0001.png';
		this.ballWidth = 80;
		this.ballHeight = 80;
		this.ballTextXOffset = -15;
		this.ballTextYOffset = 0;
		this.ballBlankImage = 'GlucoseMonitor/GlucoseMonitor0000.png';
		
		// Goal variables.
		this.goalCount = 3;
		this.goalsX = [600, 600, 600];
		this.goalsY = [50, 184, 304];
		this.goalFont = 'Arial';
		this.goalFontSize = 15;
		this.goalFontColor = '#000000';
		this.goalsColor = ['#00AAFF', '#00AAFF', '#00AAFF'];
		this.goalsAlpha = [0.5, 0.5, 0.5];
		this.goalsStyle = [NONE, NONE, NONE];
		this.goalsBorderColor = ['#000000', '#000000', '#000000'];
		this.goalsBorderSize = [1, 1, 1];
		this.goalsBorderAlpha = [1.0, 1.0, 1.0];
		this.goalsXMarginSize = [64, 64, 64];
		this.goalsYMarginSize = [5, 5, 5]
		this.goalsImage = ['icons64/No.png', 'icons64/No.png', 'icons64/No.png'];
		this.goalsWidth = [289, 289, 289];
		this.goalsHeight = [92, 82, 82];
		
		// Block variables.
		this.numBlocks = 0;
		this.blocksImage = [];
		this.blocksWidth = [];
		this.blocksHeight = [];
		this.blocksX = [];
		this.blocksY = [];
		
		// Fan variables.
		this.numFans = 0;
		this.fansOffImage = [];
		this.fansOnImage = [];
		this.fansWidth = [];
		this.fansHeight = [];
		this.fansX = [];
		this.fansY = [];
		this.fansStrength = [];
		this.fansDirection = [];
		this.fansEffectXOffset = [];
		this.fansEffectYOffset = [];
		this.fansEffectWidth = [];
		this.fansEffectHeight = [];
		this.fansEffectMaxDistance = [];
		this.fansEffectFramePeriod = [];
		this.fansOffFrames = [];
		this.fansOffImagePre = [];
		this.fansOffImagePost = [];
		this.fansOnFrames = [];
		this.fansOnImagePre = [];
		this.fansOnImagePost = [];
		this.fansAngle = [];
		
		// Question variables.
		this.questionFont = 'Arial';
		this.questionFontSize = 30;
		this.questionFontColor = '#000000';
		this.questionBoxWidth = 475;
		this.questionBoxHeight = 100;
		this.questionX = this.gameWidth / 2 - this.questionBoxWidth / 2;
		this.questionY = this.gameHeight / 2 - this.questionBoxHeight / 2;
		this.questionBoxColor = '#00FF00';
		this.questionBoxAlpha = 1.0;
		this.questionBoxImage = null;
		this.questionBoxStyle = NONE;
		this.questionBoxBorderColor = '#000000';
		this.questionBoxBorderSize = 2;
		this.questionBoxBorderAlpha = 1.0;
		this.questionBoxMarginSize = 5;
		this.questionDetails = '';
		this.correct = 0;
		this.bs = 55;
		this.time = '12:00';
		this.answers = ['Drink ½ cup juice or eat 15 skittles and retest in 15 minutes. Once above 80, eat 15 grams of crackers.',
						'Put your head down on your desk until you feel better.', 
						'Eat a chocolate bar until class is over and you can go to the nurse.'];
		
		// Helper variables.
		this.helperX = 850;
		this.helperY = 611;
		this.helperWidth = 200;
		this.helperHeight = 200;
		this.helperImage = 'AnimatedCat/CatTalk1.png';
		this.helperClue = 'Pick the long one.';
		this.clueX = 620;
		this.clueY = 560;
		this.clueWidth = 275;
		this.clueHeight = 85;
		this.clueImage = 'tbExtended.png'
		this.clueStyle = 4;
		this.clueAlign = 'center';
		this.clueColor = '#FFFFFF';
		this.clueAlpha = 0.0;
		this.clueBorderAlpha = 0.0;
		this.clueBorderColor = '#000000';
		this.clueBorderSize = 2;
		this.helperFont = 'Arial';
		this.helperFontSize = 20;
		this.helperLineWidth = 200;
		this.helperFontColor = '#000000';
		this.helperTalkFrames = 12;
		this.helperTalkPre = 'AnimatedCat/CatTalk';
		this.helperTalkPost = '.png';
		this.helperWaveFrames = 28;
		this.helperWavePre = 'AnimatedCat/CatLookAtMe';
		this.helperWavePost = '.png';
		
		// Sound variables.
		this.correctSoundFile = 'sounds/yaycrowdeditedshorter.mp3';
		this.wrongSoundFile = 'sounds/wrong.mp3';
		this.fanSoundFile = 'sounds/fanhum.mp3';
		this.stretchSoundFile = 'sounds/slingstretch.mp3';
		this.launchSoundFile = 'sounds/monitorwhoosh.mp3';
		this.hitBlockSoundFile = 'sounds/blockCollision.mp3';
		this.breakBlockSoundFile = 'sounds/blockBreak.mp3';
		
		// Controls how the question is displayed
		this.topQuestionLayout = false;
		
		// Post synopsis box variables.
		this.explanation = 'Here is an explanation.';
		this.postBoxWidth = 400;
		this.postBoxHeight = 228;
		this.postBoxColor = '#00FF00';
		this.postBoxAlpha = 1.0;
		this.postBoxFontColor = '#000000';
		this.postBoxFont = 'Arial';
		this.postBoxFontSize = 20;
		this.postBoxImage = 'HappyCat2.png';
		this.postBoxStyle = 4;
		this.postBoxMarginTop = 128;
		
		// Tutorial variables.
		this.tutorialSceneCount = 0;
		this.tutorialText = [];
		this.tutorialTarget = [];
		this.tutorialBoxImage = [];
		this.tutorialBoxColor = [];
		this.tutorialBoxAlpha = [];
		this.tutorialBoxFont = [];
		this.tutorialBoxFontSize = [];
		this.tutorialBoxWidth = [];
		this.tutorialBoxHeight = [];
		this.tutorialBoxX = [];
		this.tutorialBoxY = [];
		this.tutorialBoxBorderSize = [];
		this.tutorialBoxBorderColor = [];
		this.tutorialBoxBorderAlpha = [];
		this.tutorialBoxMarginTop = [];
		this.tutorialBoxMarginBottom = [];
		this.tutorialBoxMarginRight = [];
		this.tutorialBoxMarginLeft = [];
	} // end defaults
	
	this.stop = function() {
		this.game.stop();
	} // end stop

	
	return this;
} // end Level def

// Directional collision constants.
LEFT = 0; RIGHT = 1; TOP = 2; BOTTOM = 3; LEFTTOP = 4; RIGHTTOP = 5; LEFTBOTTOM = 6; RIGHTBOTTOM = 7;