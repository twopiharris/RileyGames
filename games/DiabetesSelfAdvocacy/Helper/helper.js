function Helper(scene, image, width, height) {
/* The helper class provides players with clues to in-game questions
** any time they are clicked.
**
** Since this object was made before the textbox object in simplegame was finished,
** there are a few places that need updated to take advantage of some of the new
** features of the textbox.
*/
	thelper = new Sprite(scene, image, width, height);
	thelper.mainImage = image;
	thelper.setSpeed(0);

	// Text formatting variables.
	thelper.clue = "";
	thelper.font = 'Arial';
	thelper.fontSize = 20;
	thelper.color = '#000000';
	thelper.lineWidth = 200;

	// Help box variables.
	thelper.boxX = scene.canvas.width / 2;
	thelper.boxY = scene.canvas.height / 2;
	thelper.boxWidth = 400;
	thelper.boxHeight = 200;
	thelper.boxColor = '#FFFFFF';
	thelper.boxAlpha = 1.0;
	thelper.boxImage = null;
	thelper.boxStyle = 0;
	thelper.boxAlign = 'center';
	thelper.boxBorderColor = '#000000';
	thelper.boxBorderAlpha = 1.0;
	thelper.boxBorderSize = 2;

	// Animation variables.
	thelper.talkFrames = 12;
	thelper.talkPre = 'AnimatedCat/CatTalk';
	thelper.talkPost = '.png';
	thelper.waveFrames = 28;
	thelper.wavePre = 'AnimatedCat/CatLookAtMe';
	thelper.wavePost = '.png';
	thelper.waving = false;
	thelper.helping = false;
	thelper.resetImage = false;
	thelper.endTalk = false;
	thelper.curFrame = 1;
	thelper.talkImages = new Array(thelper.talkFrames);
	thelper.waveImages = new Array(thelper.waveFrames);


	thelper.helpBox = new TextBox(scene, this.boxImage, this.boxWidth, this.boxHeight);

	thelper.setFont = function(font, size, color) {
		this.font = font;
		this.size = size;
		this.color = color;
		this.helpBox.setFont(this.font, this.size, this.color);
	}

	thelper.setText = function(text) {
		this.text = text;
		this.helpBox.text = this.text;
	}

	thelper.setColor = function(color) {
		this.color = color;
		this.helpBox.text = this.text;
	}

	thelper.fitText = function() {
		this.helpBox.fitText();
	}


	thelper.makeHelpBox = function() {
	// Resets most of the helper's help box attributes.
	// NOTE: the function could be changed to make use of the new fitText function
	// to avoid the need to set the width and height of the textbox.
		this.helpBox.text = this.clue;
		this.helpBox.setFont(this.font, this.fontSize, this.color);
		this.helpBox.setAlign(this.boxAlign);
		this.helpBox.resize(this.boxWidth, this.boxHeight);
		this.helpBox.setBorder(this.boxBorderSize, this.boxBorderColor, this.boxBorderAlpha);
		this.helpBox.setPosition(this.boxX, this.boxY);
		this.helpBox.setBackground(this.boxColor, this.boxAlpha);
		this.helpBox.visible = false;
		this.helpBox.clicked = function() {
			this.visible = false;
		} // end clicked
	} // end makeHelpBox

	thelper.setClue = function(clue, x, y, font, fontSize, color, lineWidth) {
	// Sets the text attributes, such as font and font color.
	// NOTE: lineWidth is no longer used. For a multi-lined textBox, simply put '\n'
	// where new lines are desired.
		this.clue = clue;
		this.boxX = x;
		this.boxY = y;
		this.font = font;
		this.fontSize = fontSize;
		this.color = color;
		this.lineWidth = lineWidth;
		this.makeHelpBox();
	} // end setClue

	thelper.setClueAlign = function(align) {
	// Sets the text alignment for the help box.
		this.boxAlign = align;
	} // end setClueAlign

	thelper.setClueBoxBackground = function(image, style, color, alpha) {
	// Sets the background image for the help box.
		this.boxImage = image;
		this.boxStyle = style;
		this.boxColor = color;
		this.boxAlpha = alpha;
		this.helpBox.setBackground(this.boxColor, this.boxAlpha);
		this.helpBox.setImage(this.boxImage, this.boxStyle);
	} // end setClueBackground

	thelper.setClueBoxSize = function(width, height) {
	// Sets the size of the help box.
	// NOTE: the textbox's fitText function should be used instead.
		this.boxWidth = width;
		this.boxHeight = height;
		this.helpBox.resize(width, height);
	} // end setClueBoxSize

	thelper.setClueBoxBorder = function(size, color, alpha) {
	// Sets the border attributes of the help box.
		this.boxBorderSize = size;
		this.boxBorderColor = color;
		this.boxBorderAlpha = alpha;
		this.helpBox.setBorder(size, color, alpha);
	} // end setClueBoxBorder

	thelper.setTalkAnimation = function(frames, pre, post) {
	// Sets the number of frames and file structure of the talk animations.
	// NOTE: these animations use separate, numbered images rather than a sprite sheet.
	// So pre should be the file path before the numbers in the images, such as "images/nurseTalk",
	// while post should be the file path after the numbers in the images, such as ".png".
		this.talkFrames = frames;
		this.talkPre = pre;
		this.talkPost = post;

		for (var i = 1; i < this.talkFrames; i++) {
			this.talkImages[i] = new Image();
			this.talkImages[i].src = this.talkPre + i + this.talkPost;
		}
	} // end setTalkAnimation

	thelper.setWaveAnimation = function(frames, pre, post) {
	// Sets the number of frames and file structure of the waving animations.
	// NOTE: these animations use separate, numbered images rather than a sprite sheet.
	// So pre should be the file path before the numbers in the images, such as "images/nurseWave",
	// while post should be the file path after the numbers in the images, such as ".png".
		this.waveFrames = frames;
		this.wavePre = pre;
		this.wavePost = post;

		for (var i = 1; i < this.waveFrames; i++) {
			this.waveImages[i] = new Image();
			this.waveImages[i].src = this.wavePre + i + this.wavePost;
		}
	} // end setWaveAnimation

	thelper.checkMouse = function() {
	// Shows the help box when the nurse is clicked. Hides the box when the
	// box is clicked.
	// Old way to check if the helper has been clicked. Kept for
	// compatibility with games developed before the spriteList object.
		if(this.isClicked() && this.scene.getMouseClicked()) {
			this.showHelp();
		} // end if
		if(this.helpBox.isClicked()) {
			this.hideHelp();
		} // end if
	} // end checkMouse

	thelper.clicked = function() {
	// Shows the help box when clicked.
		if(this.helping == false){
			this.showHelp();
			this.fitText();
		} else {
			this.hideHelp();
		}
	} // end clicked()

	thelper.wave = function() {
	// Turns the waving animation on.
		this.waving = true;
	} // end wave

	thelper.showHelp = function() {
	// Makes the help box visible and turns the talking animation on
	// while turning the waving animation off.
		this.helping = true;
		this.helpBox.visible = true;
		this.helpBox.show();
		this.curFrame = 1;
		this.waving = false;
	} // end showHelp

	thelper.hideHelp = function() {
	// Hides the help box and turns the talking animation off.
		//this.helping = false;
		this.helpBox.visible = false;
		//this.curFrame = 1;
		this.endTalk = true;
	} // end hideHelp

	thelper.changeFrame = function() {
	// Changes the helper's image based on which animation is playing, if any.
		if (this.helping) {
		// Talking animation is playing.
			if (this.talkFrames > 0) {
			// Only animate if there is an animation defined.
				this.image = this.talkImages[this.curFrame];//this.talkPre + this.curFrame + this.talkPost);
				this.curFrame ++;
				if (this.curFrame >= this.talkFrames) {
				// Wrap the animation.
					this.curFrame = 1;
					if (this.endTalk) {
						this.resetImage = true;
						this.helping = false;
						this.endTalk = false;
					}
				} // end if
			} // end if
		} else if (this.waving) {
		// Waving animation is playing.
			if (this.waveFrames > 0) {
			// Only animate if there is an animation defined.
				this.image = this.waveImages[this.curFrame];//this.wavePre + this.curFrame + this.talkPost);
				this.curFrame ++;
				if (this.curFrame >= this.waveFrames) {
				// End the animation. The nurse only waves once.
					this.curFrame = 1;
					this.waving = false;
					this.resetImage = true;
				} // end if
			} // end if
		} else if (this.resetImage) {
		// Change back to the original image if an animation has ended.
			this.setImage(this.mainImage);
			this.resetImage = false;
		} // end if
	} // end changeFrame

	thelper.update = function() {
		this.checkMouse();
		this.helpBox.update();
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if (this.visible){
		  this.draw();
		} // end if

		if(this.helpBox.visible == false) {
		// When the help box is not visible, the hideHelp is called to
		// stop the talking animation as well.
			if(this.helping){
				this.hideHelp();
			}
		} // end if
		this.changeFrame();
	} // end update

	thelper.makeHelpBox();
	thelper.setTalkAnimation(12, thelper.talkPre, thelper.talkPost);
	thelper.setWaveAnimation(28, thelper.wavePre, thelper.wavePost);
	return thelper;
} // end helper
