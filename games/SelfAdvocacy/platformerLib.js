/* Platformer Library
** Authored by Ben Apple & Nick Perin
** Provides the base classes used to build platformer levels.
*/

function Block(scene, img, width, height, x, y, z) {
// Stationary sprite.
	tblock = new Sprite(scene, img, width, height, z);
	tblock.setSpeed(0);
	tblock.setPosition(x, y);

	return tblock;
}

function Spring(scene, img, width, height, x, y, z) {
// Stationary sprite.
	tSpring = new Sprite(scene, img, width, height, z);
	tSpring.setSpeed(0);
	tSpring.setPosition(x, y);
	tSpring.springing = false;

	// Animation variables.
	tSpring.curSpringFrame = 0;
	tSpring.maxSpringFrame = 15;
	tSpring.beginSpringingFile = 'images/spring';
	tSpring.endSpringingFile = '.png';

    // Spring Animation
    tSpring.changeFrame = function() {
        if (this.springing){
            this.changeImage(this.beginSpringingFile + this.curSpringFrame + this.endSpringingFile);
            this.curSpringFrame++;
            if (this.curSpringFrame >= 15){
                this.springing = false;
                this.curSpringFrame = 0;
            }//end if
        } // end if
        else{
            this.curSpringFrame = 0;
            this.changeImage(this.beginSpringingFile + this.curSpringFrame + this.endSpringingFile);
        } // end else
    } // end changeFrame


	tSpring.update = function() {
		this.changeFrame();
        if (this.visible)
            this.draw();
   }
	return tSpring;

} // end spring

function CreateSounds(scene) { // Load all of the sounds
	this.scene = scene;
	this.pickUpItemSound = new Sound("sounds/pickUpItemSound.mp3");
	this.dropItemSound = new Sound ("sounds/dropItemSound.mp3")
	this.jumpSound = new Sound("sounds/jumpSound.mp3");
	this.movingPlatformSound = new Sound("sounds/movingPlatformSound.mp3");
	this.buzzerSound = new Sound("sounds/buzzerSound.mp3");
	this.correctSound = new Sound("sounds/correctSound.mp3");
	this.incorrectSound = new Sound("sounds/incorrectSound.mp3");
	this.springSound = new Sound("sounds/springSound.mp3");
	this.fellSound = new Sound("sounds/fellSound.mp3");

	this.preloadSounds = function(){
		this.pickUpItemSound.playSound({sound: 0});
		this.dropItemSound.playSound({sound: 0});
		this.jumpSound.playSound({sound: 0});
		this.movingPlatformSound.playSound({sound: 0});
		this.buzzerSound.playSound({sound: 0});
		this.correctSound.playSound({"sound": 0});
		this.incorrectSound.playSound({"sound": 0});
		this.springSound.playSound({"sound": 0});
		this.fellSound.playSound({"sound": 0});
	}

	this.playPickUpItem = function(){
		this.pickUpItemSound.playSound();
	}

	this.playDropItem = function(){
        this.dropItemSound.playSound();
    }

	this.playJump = function(){
        this.jumpSound.playSound();
	}

	this.playMovingPlatform = function(){
        this.movingPlatformSound.playSound();
	}

	this.playBuzzer = function(){
        this.buzzerSound.playSound();
	}

	this.playCorrect = function(){
        this.correctSound.playSound();
	}

	this.playIncorrect = function(){
        this.incorrectSound.playSound();
	}

	this.playSpring = function(){
        this.springSound.playSound();
	}

	this.playFell = function(){
        this.fellSound.playSound();
	}

	return this;
}


function BG(scene, image, width, height, x, y, z) {
// Static background sprite.
	tBG = new Sprite(scene, image, width, height, z);
	tBG.setSpeed(0);
	tBG.setPosition(x, y);

	tBG.clicked = function() {console.log("background clicked.");

	this.pickUpItemSound;
	this.dropItemSound;
	this.jumpSound;
	this.correctSound;
	this.incorrectSound;
	this.buzzerSound;
	this.springSound;

	} // end clicked

	return tBG;
} // end BG def



function Player(scene, width, height, x, y, z, gender){
    console.log(gender);
// Sprite controlled by the player. Moves left and right, jumps, and falls.

    tplayer = new Sprite(scene, gender);
    tplayer.gender = gender;

    if (tplayer.gender == 'girl'){ //handle girl sprites
        tplayer = new Sprite(scene, "images/girlR.png", width, height, z);
        tplayer.beginWalkFile = 'images/girl';
        tplayer.beginJumpFile = 'images/girlJump';
    }

    else if (tplayer.gender == 'boy') { // handle the boy sprites
        tplayer = new Sprite(scene, "images/boyR.png", width, height, z);
        tplayer.beginWalkFile = 'images/boy';
        tplayer.beginJumpFile = 'images/boyJump';
    }


	tplayer.setSpeed(0);
	tplayer.setPosition(x, y);
	tplayer.setMoveAngle(90);

	// Determines how the player is moving.
	tplayer.falling = true;
	tplayer.walking = false;
	tplayer.onBlock = false;
	tplayer.onSpring = false;
	tplayer.facing = 'R';
	tplayer.canMove = true;

	// Respawn point.
	tplayer.startX = x;
	tplayer.startY = y;

	// Animation variables.
	tplayer.curWalkFrame = 0;
	tplayer.maxWalkFrames = 19;
	tplayer.endWalkFile = '.png';
	tplayer.endJumpFile = '.png';

	// Determines movement speeds.
	tplayer.moveSpeed = .5;
	tplayer.maxSpeed = 10;
	tplayer.slowSpeed = 2;		// For changing direction, emulates a skidding motion. Should be larger than moveSpeed.
	tplayer.jumpSpeed = 13;
	tplayer.fallSpeed = 1;
	tplayer.friction = 1.5;


	tplayer.checkKeys = function(){
	// Check if the player is inputting commands.
		if (this.canMove) {
			if (keysDown[K_LEFT]){
				this.facing = 'L';
				this.walking = true;
				if(this.dx > 0) {
				// Skid if sprite is moving right.
					this.addVector(270, this.slowSpeed);
				} else if(this.dx > -this.maxSpeed) {
				// Build up speed normally.
					this.addVector(270, this.moveSpeed);
				} // end if
			} // end if

			if (keysDown[K_RIGHT]){
				this.facing = 'R';
				this.walking = true;
				if(this.dx < 0) {
				// Skid if sprite is moving left.
					this.addVector(90, this.slowSpeed);
				} else if(this.dx < this.maxSpeed) {
				// build up speed normally.
					this.addVector(90, this.moveSpeed);
				} // end if
			} // end if

			if (!keysDown[K_RIGHT] && !keysDown[K_LEFT]) {
				this.walking = false;
				if(!this.falling) {
				// Emulates friction on a surface.
					this.setDX(this.dx / this.friction);
					if(this.dx < .5 && this.dx > 0) this.setDX(0);
					else if(this.dx > -.5 && this.dx < 0) this.setDX(0);
				} // end if
			} // end if

			if (keysDown[K_UP]){
				if(!this.falling) {
				// Jump if the player is not already in the air also play sound
					this.falling = true;
					this.addVector(0, this.jumpSpeed);
					sounds.jumpSound.playSound();
				} // end if
			} // end if
		} // end if

	} // end checkKeys

	tplayer.changeFrame = function() {
	// Changes the current image based on how the player is currently moving.
		if (this.falling) {
		// Change to the jump image if jumping/falling.
			this.changeImage(this.beginJumpFile + this.facing + this.endJumpFile);
		} else {
			if (!this.walking) {
			// Change to a static image if just standing. Also reset the walk animation.
				this.curWalkFrame = 8;
				this.changeImage(this.beginWalkFile + this.facing + this.endWalkFile);
			} else {
			// Increment the animation current animation image.
				this.changeImage(this.beginWalkFile + this.facing + this.curWalkFrame + this.endWalkFile);
				this.curWalkFrame ++;
				if (this.curWalkFrame >= this.maxWalkFrames) {
				// Wrap the animation.
					this.curWalkFrame = 0;
				} // end if
			} // end if
		} // end if
	} // end ChangeFrame

	tplayer.checkGravity = function(){
	// Adds gravity if the player is falling.
		if(this.falling) {
            if(this.fallSpeed <= 2) // Fixes issue where too high of fall speed makes player go through block
                this.addVector(180, 1);
            else
                this.fallSpeed = 2;
		} else if(this.onBlock == false) {
		// If the player walked off of a block, they should start falling.
			this.falling = true
		}// end if

		this.onBlock = false;

		if(this.y >= scene.height) {
		// Respawn the player if they fall to death, also reset sugarBar.
			this.restart();
			sugarBar.setBSToMid();
			sounds.fellSound.playSound();

		} // end if
	} // end checkGravity

	tplayer.checkBounds = function() {
	// Overwrites the original checkBounds function to define a custom bound action.
		camX = 0;
		camY = 0;
		if(this.camera){ camX = this.camera.cameraOffsetX; camY = this.camera.cameraOffsetY; }
		rightBorder = this.cWidth + camX;
		leftBorder = camX;
		topBorder = camY;
		bottomBorder = this.cHeight + camY;

		offRight = false;
		offLeft = false;
		offTop = false;
		offBottom = false;

		if (this.x > rightBorder){
		  offRight = true;
		}

		if (this.x < leftBorder){
		  offLeft = true;
		}

		if (this.y > bottomBorder){
		  offBottom = true;
		}

		if (this.y < 0){
		  offTop = true;
		}

		// If the player is at the edge of the screen, stop them and reset their position to
		// the edge of the screen for a solid stop.
		if (offLeft) {
			this.setSpeed(0);
			this.setX(leftBorder + 1);
		} else if (offRight) {
			this.setSpeed(0);
			this.setX(rightBorder - 1);
		} else if (offTop) {
			this.setSpeed(0);
			this.setY(topBorder + 1);
		} else if (offBottom) {
			this.setSpeed(0);
			this.setY(bottomBorder - 1);
		} // end if
	} // end checkBounds

	tplayer.setStart = function(x, y) {
		this.startX = x;
		this.startY = y;
	} // end setStart

	tplayer.restart = function() {
		this.setSpeed(0);
		this.setPosition(this.startX, this.startY);
	} // end restart

	tplayer.update = function() {
		this.checkKeys();
		this.changeFrame();
		this.checkGravity();
		this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if
	} // end update

	tplayer.setWalkAnim = function(frames, beginFile, endFile) {
		this.maxWalkFrames = frames;
		this.beginWalkFile = beginFile;
		this.endWalkFile = endFile;
	} // end setWalkAnim

	tplayer.setJumpAnim = function(beginFile, endFile) {
		this.beginJumpFile = beginFile;
		this.endJumpFile = endFile;
	} // end setJumpAnim

	tplayer.setMovement = function(move, max, slow, jump, fall) {
		this.moveSpeed = move;
		this.maxSpeed = max;
		this.slowSpeed = slow;
		this.jumpSpeed = jump;
		this.fallSpeed = fall;
	} // end setMovement

	return tplayer;
} // end player class def

function VisibilityTrigger(x, y) {
// Sprite that makes other sprites visible when stepped on. Can be used to set up traps.
	ttrigger = new Sprite(game, null, 50, 5, 0);
	ttrigger.setPosition(x, y);
	ttrigger.setSpeed(0);
	ttrigger.targetSprite = null;
	ttrigger.triggeringSprite = null;

	ttrigger.setTargetSprite = function(sprite) {
		this.targetSprite = sprite;
	} // end setTarget

	ttrigger.setTriggeringSprite = function(sprite) {
		this.triggeringSprite = sprite;
	} // end setTrigger

	ttrigger.update = function() {
		this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if

		if(this.triggeringSprite != null && this.targetSprite != null) {
		// Check collisions only if the trigger has been set up completely.
			if(this.collidesWith(this.triggeringSprite)) {
			// Show the target sprite if the trigger has been stepped on.
				this.targetSprite.show();
				this.hide();
			} // end if
		} // end if
	} // end update

	ttrigger.makeVisible = function(img) {
	// Assigns an image to the trigger to make it actually visible to the player.
		this.setImage(img);
	} // end makeVisible()

	return ttrigger;
} // end trigger class def

function Situation(scene, text, image, width, height, z) {
// Static textbox to hold a level's situation text.
	tSit = new TextBox(scene, image, width, height);
	tSit.z = z;
	tSit.text = text;

	tSit.clicked = function() {console.log("situation clicked.");} // end clicked

	return tSit;
} // end Situation

function Item(scene, image, width, height, x, y, z) {
// Draggable sprite class with a name descriptor.
	tItem = new Sprite(scene, image, width, height, z);
	tItem.name = "item";
	tItem.setPosition(x, y);
	tItem.dragging = false;
	tItem.canDrag = true;

	tItem.setName = function(name) {
		this.name = name;
	} // end setName

	tItem.clicked = function() {} // end clicked

	tItem.okayToDrag = function() {
		this.canDrag = true;
	} // end okayToDrag

	tItem.notOkayToDrag = function() {
		this.canDrag = false;
	} // end notOkayToDrag

	tItem.checkDragging = function() {
	// Checks if an object is being dragged.
		if (this.canDrag) {
			mx = this.scene.getMouseX();
			my = this.scene.getMouseY();
			if(this.isMouseDown(mx, my) && this.scene.getMouseClicked()) {
			// An object starts to be dragged when the mouse is clicked on it.
				this.dragging = true;
			} else if(this.dragging && !this.scene.getMouseClicked()) {
			// An object is no longer being dragged when the mouse is no longer clicked.
				this.dragging = false;
			} // end if
		} // end if
	} // end checkDragging

	tItem.update = function() {
		this.checkDragging();
		if (this.dragging) {
		// Move the item to the mouse coordinates if it is being dragged.
			this.x = this.scene.getMouseX();
			this.y = this.scene.getMouseY();
		} //else {
		// Otherwise, do any defined movements.
			//this.x += this.dx;
			//this.y += this.dy;
			//this.checkBounds();
		//} // end else
		if (this.visible){
		  this.draw();
		} // end if
	} // end update

	return tItem;
} // end Item

function Inventory(scene, image, width, height, x, y, z) {
// Container for sprite objects that handles adding objects, checking if it has an object, and displaying its contents.
// Consists of an icon sprite for toggling content display, a contents array, and a background sprite for when the contents
// are visible.
	tInv = new Sprite(scene, image, width, height, z);
	tInv.setPosition(x, y);

	tInv.contentsBG = new BG(scene, image, 248, 100 ,124, 660, 3);
	tInv.contentsBG.visible = true;
	tInv.showingContents = true;
	tInv.contents = [];
	tInv.maxContents = 6;

	tInv.contentsBG.clicked = function() {console.log("Invo clicked.");} // end clicked

	tInv.clicked = function() {
	// Toggle displaying the contents when sprite portion is clicked.
		if (this.showingContents) {
			this.hideContents();
			console.log("Hiding");
		} else {
			this.showContents();
			console.log("Showing");
		} // end if
	} // end clicked

	tInv.hasItem = function(sprite) {
	// Determines if the given sprite is in the contents array.
		if (this.contents.indexOf(sprite) == -1) {
			return false;
		} else {
			return true;
		} // end if
	} // end hasItem

	tInv.hasItemNamed = function(name) {
	// Determines if the contents array has a sprite with a name equal to the given name.
		var contains = false;
		for (var i = 0; i < this.contents.length; i ++) {
			if (this.contents[i].name == name) {
				contains = true;
			} // end if
		} // end for
		return contains;
	} // end hasItemNamed

	tInv.showContents = function() {
	// Displays the contents.
		this.contentsBG.visible = true;
		for (var i = 0; i < this.contents.length; i ++) {
			// NOTE: item positions are determined in a very static way, this will need to be changed to be dynamically determined
			// when item sizes are not always the same.
			// Things to consider when changing this include the size of the background sprite, the size of the objects, and the maximum
			// number of objects the inventory can hold.
			//this.contents[i].setPosition(tInv.contentsBG.x,tInv.contentsBG.y)
			this.contents[i].setPosition(50 + (50 * (i % 4)), 648 + (50 * Math.floor(i / 4)));
			this.contents[i].width = 50;
			this.contents[i].height = 50;
			this.contents[i].visible = true;
		} // end for
		this.showingContents = true;
	} // end showContents

	tInv.hideContents = function() {
	// Hides the background sprite and all contents.
		this.contentsBG.visible = false;
		for (var i = 0; i < this.contents.length; i ++) {
			this.contents[i].visible = false;
		} // end for
		this.showingContents = false;
	} // end hideContents

	tInv.addSprite = function(sprite) {
	// Adds a sprite to the contents array. Returns whether the item was added or not.
		if (this.contents.length < this.maxContents) {
		// Add only if the maximum number of items has not been reached.
			this.contents.push(sprite);
			if (this.showingContents) {
			// Redisplay contents if the contents were already being displayed.
				this.showContents();
			} else {
			// Otherwise, hide the item.
				sprite.visible = false;
			} // end if
			console.log('Item added');
			return true;
		} else {
			return false;
		} // end if
	} // end addSprite

	tInv.checkContentRemoved = function() {
	// Checks if an item has been removed from the inventory object. An item is removed if
	// it has moved outside of the bounds of the inventory's background sprite. Only one
	// item can be removed at a time.
		var keepgoing = true;
		var i = 0;
		while(keepgoing) {
			if(!this.contents[i].collidesWith(this.contentsBG)) {


//************************************ start of the decision handling ****************************************************

                if (this.contents[i].name == "item2" && inventory.hasItemNamed("item1")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[1].visible = true;
                    console.log('It worked!');
                }

                if (this.contents[i].name == "item3" && inventory.hasItemNamed("item1")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[1].visible = true;
                }

                if (this.contents[i].name == "item1" && inventory.hasItemNamed("item2")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[2].visible = true;
                }

                if (this.contents[i].name == "item3" && inventory.hasItemNamed("item2")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[2].visible = true;
                }

                if (this.contents[i].name == "item1" && inventory.hasItemNamed("item3")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[3].visible = true;
                }

                if (this.contents[i].name == "item2" && inventory.hasItemNamed("item3")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[3].visible = true;
                }

                if (this.contents[i].name == "item3" && inventory.hasItemNamed("item1") && inventory.hasItemNamed("item2")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[4].visible = true;
                }

                if (this.contents[i].name == "item2" && inventory.hasItemNamed("item1") && inventory.hasItemNamed("item3")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[5].visible = true;
                }

                if (this.contents[i].name == "item1" && inventory.hasItemNamed("item2") && inventory.hasItemNamed("item3")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[6].visible = true;
                }

                if (this.contents[i].name == "item1" && !inventory.hasItemNamed("item2") && !inventory.hasItemNamed("item3")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[0].visible = true;
                }
                if (this.contents[i].name == "item2" && !inventory.hasItemNamed("item1") && !inventory.hasItemNamed("item3")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[0].visible = true;
                }
                if (this.contents[i].name == "item3" && !inventory.hasItemNamed("item1") && !inventory.hasItemNamed("item2")){
                    for (var j = 0; j < choices.length; j++)
                        choices[j].visible = false; // hides the correct choice
                    choices[0].visible = true;
                }

//************************************ end of the decision handling ****************************************************

                this.contents[i].width = 64;
				this.contents[i].height = 64;
				this.contents.splice(i, 1);
				sounds.dropItemSound.playSound();
				console.log('Item removed');
				//this.hideContents();
				keepgoing = false;
			} // end if
			i ++;
			if (i >= this.contents.length) keepgoing = false;
		} // end for
	} // end checkContentRemoved

	tInv.update = function() {
		if (this.showingContents && this.contents.length > 0) { // added the && to allow invo to show when empty
			this.checkContentRemoved();
		} // end if

		this.contentsBG.update();
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if (this.visible){
		  this.draw();
		} // end if
	} // update

	return tInv;
} // end Inventory

function Choice(scene, text, image, width, height, answer, z) {
// Static textbox object that holds the text of a choice
	tChoice = new TextBox(scene, image, width, height);
	tChoice.text = text;
	tChoice.choiceNumber = 0;
	tChoice.answer = "answer";
	tChoice.z = z;

    tChoice.setAnswer = function(answer) {
		this.answer = answer;
	} // end setAnswer

	tChoice.clicked = function() {
		console.log(this.text);
	} // end clicked

	return tChoice;
} // end choice

function BSBar(scene, width, height, x, y, z) {
// Sprite that visually displays how much a current value differs from
// a middle value. Allows various changes to how the whole thing looks.
	tBar = new Sprite(scene, 'images/emptyBar.png', width, height, z);
	tBar.setPosition(x, y);

	// Values that determine the position of the slider and width of the status bar.
	tBar.maxValue = 240;
	tBar.minValue = 20;
	tBar.midValue = (tBar.maxValue + tBar.minValue) / 2;
	tBar.curValue = tBar.midValue;

	// Label for displaying the max value.
	tBar.maxLabel = new TextBox(scene, null, width, height);
	tBar.maxLabel.z = z;
	tBar.maxLabel.text = tBar.maxValue.toString();
	tBar.maxLabel.fitText();
	tBar.maxLabel.setPosition(x + width / 2 + tBar.maxLabel.width, y);

	// Label for displaying the min value.
	tBar.minLabel = new TextBox(scene, null, width, height);
	tBar.minLabel.z = z;
	tBar.minLabel.text = tBar.minValue.toString();
	tBar.minLabel.fitText();
	tBar.minLabel.setPosition(x - width / 2 - tBar.minLabel.width, y);

	// Sprite that grows or shrinks as the current value moves farther
	// from or closer to the middle value.
	tBar.curBar = new Sprite(scene, 'images/fullBar.png', width, height, z + 1);
	tBar.curBar.setPosition(x, y);

	// Sprite that moves with the current value.
	tBar.slideSprite = new Sprite(scene, 'images/GlucoseMonitor0000.png', 32, 32, z + 2);
	tBar.slideSprite.setPosition(x, y);

	tBar.update = function() {
		var width = 0;
		// Need to calculate how far to move the slider and grow the curBar.
		if (this.curValue < this.midValue) {
		// When the current value drops below the middle value, width is calculated by
		// finding the percentage of the middle value the current value makes up and
		// subtracting from 1.
			width = this.width * (1 - (this.curValue - this.minValue) / (this.midValue - this.minValue)) / 2;
			this.curBar.width = width;
			this.curBar.setPosition(this.x - width / 2, this.y);
			this.slideSprite.setPosition(this.x - width, this.y);
		} else {
		// When the current value rises above the middle value, width is calculated by
		// finding the percentage of the max value that the current value makes up.
			width = Math.floor(this.width * ((this.curValue - this.midValue) / (this.maxValue - this.midValue)) / 2);
			if (width % 2 == 1) width ++; // To prevent slight positioning errors of the status bar, only use even widths.
			if (width <= 0) width = 2; // Make sure there is actually a width.
			this.curBar.width = width;
			this.curBar.setPosition(this.x + width / 2, this.y);
			this.slideSprite.setPosition(this.x + width, this.y);
		} // end if

		this.x += this.dx;
        this.y += this.dy;
        this.checkBounds();
        if (this.visible) {
            this.draw();
        } // end if
	} // end update

	tBar.setMin = function(min) {
	// Sets the min value and recalculates the middle value. Also redisplays the min label.
		this.minValue = min;
		this.midValue = (this.maxValue + this.minValue) / 2;
		this.minLabel.text = this.minValue.toString();
		this.minLabel.fitText();
		this.minLabel.setPosition(this.x - this.width / 2 -  this.minLabel.width, this.y);
	} // end setMin

	tBar.setMax = function(max) {
	// Sets the max value and recalculates the middle value. Also redisplays the max label.
		this.maxValue = max;
		this.midValue = (this.maxValue + this.minValue) / 2;
		this.maxLabel.text = this.maxValue.toString();
		this.maxLabel.fitText();
		this.maxLabel.setPosition(this.x + this.width / 2 + this.maxLabel.width, this.y);
	} // end setMax

	tBar.setBackground = function(img) {
		this.changeImage(img);
	} // end setBackground

	tBar.setForeground = function(img) {
	// Sets the image of the status bar.
		this.curBar.changeImage(img);
	} // end setForeground

	tBar.setSliderImage = function(img) {
		this.slideSprite.changeImage(img);
	} // end setSlideImage

	tBar.changeBSBy = function(value) {
	// Adjusts the current value by the given value.
		this.curValue += value;

		// Constrain the current value.
		if (this.curValue < this.minValue) {
			this.curValue = this.minValue;
		} else if (this.curValue > this.maxValue) {
			this.curValue = this.maxValue;
		} // end if
	} // end changeBSBy

	tBar.resizeBar = function(width, height) {
	// Resizes the bar portion of the object and repositions the labels accordingly.
		this.width = width;
		this.height = height;
		this.minLabel.setPosition(this.x - this.width / 2 - this.minLabel.width, this.y);
		this.maxLabel.setPosition(this.x + this.width / 2 + this.maxLabel.width, this.y);
	} // end resize

	tBar.resizeSlider = function(width, height) {
		this.slideSprite.width = width;
		this.slideSprite.height = height;
	} // end resizeSlider

	tBar.setBSToMid = function() {
	// Sets the current value to the middle value.
		this.curValue = this.midValue;
	} // end setBSToMid

	tBar.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
		this.slideSprite.setPosition(x, y);
		this.curBar.setPosition(x, y);
		this.minLabel.setPosition(this.x - this.width / 2 - this.minLabel.width, this.y);
		this.maxLabel.setPosition(this.x + this.width / 2 + this.maxLabel.width, this.y);
	} // end setPosition

	tBar.setLabelImage = function(img) {
		this.minLabel.setImage(img, NONE);
		this.maxLabel.setImage(img, NONE);
	} // end setLabelImage

	tBar.hide = function() {
		this.visible = false;
		this.minLabel.visible = false;
		this.maxLabel.visible = false;
		this.curBar.visible = false;
		this.slideSprite.visible = false;
	} // end hide

	tBar.show = function() {
		this.visible = true;
		this.minLabel.visible = true;
		this.maxLabel.visible = true;
		this.curBar.visible = true;
		this.slideSprite.visible = true;
	} // end show

	return tBar;
} // end BSBar def

// Constants for the flame object.
FLAME_AT_MAX = 0;
FLAME_BACK = 1;
FLAME_AT_MIN = 2;
FLAME_FORWARD = 3;
