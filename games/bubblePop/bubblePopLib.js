function Bubble(scene, width, height, fallSpeed, baseImage, color, extension, z) {
	// The bubble class functions as a hex connected node and a sprite.
	z = 2;
	tbubb = new Sprite(scene, baseImage + color + extension, width, height, z);
	tbubb.setSpeed(0);
	tbubb.color = color;
	tbubb.fallSpeed = fallSpeed;
	tbubb.moving = false;
	tbubb.boundAction = BOUNCE;
	tbubb.clickable = false;
	tbubb.type = NORMAL;
	
	tbubb.connected = true;
	
	// Checked, colorChecked, and needToCheck are all flags used by the various recursive walks to know what
	// bubbles have already been stepped through and which have not.
	tbubb.checked = false;
	tbubb.colorChecked = false;
	tbubb.needToCheck = false;
	
	// Nodes connected to this bubble.
	tbubb.rParent;
	tbubb.lParent;
	tbubb.rPeer;
	tbubb.lPeer;
	tbubb.rChild;
	tbubb.lChild;
	
	// A special case bubble that does not fall and prevents bubbles connected to it from falling.
	tbubb.top = false;
	
	tbubb.launch = function(speed, angle) {
		// Fires the bubble.
		this.setMoveAngle(angle);
		this.setSpeed(speed);
		this.moving = true;
	} // end launch
	
	tbubb.fall = function() {
		// Causes the bubble to move downward and die after reaching the edge of the screen.
		this.connected = false;
		this.boundAction = DIE;
		this.setMoveAngle(180);
		this.setSpeed(10);
	} // end fall
	
	tbubb.checkConnected = function() {
	// Check if this is connected to one of the top bubbles.
		this.checked = true; // Make sure this bubble is not checked again.
		if(this.connected == false) {
			// The bubble is not connected if it was already popped.
			return false;
		} else if(this.top == true) {
			// If the bubble is a top row bubble, it is always connected.
			this.checked = false; // Reset the checked flag for the next walk.
			return true;
		} else {
			// Check if any bordering bubble is 1) actually exists and 2) is connected.
			// If any are connected, this bubble is connected and we can stop checking.
			if(this.rParent && !this.rParent.checked) {
				if(this.rParent.checkConnected()) { 
					this.checked = false;
					return true;
				} // end if
			} // end if
			if(this.lParent && !this.lParent.checked) {
				if(this.lParent.checkConnected()) {
					this.checked = false;
					return true;
				} // end if
			} // end if
			if(this.rPeer && !this.rPeer.checked) {
				if(this.rPeer.checkConnected()) {
					this.checked = false;
					return true;
				} // end if
			} // end if
			if(this.lPeer && !this.lPeer.checked) {
				if(this.lPeer.checkConnected()) {
					this.checked = false;
					return true;
				} // end if
			} // end if
			if(this.rChild && !this.rChild.checked) {
				if(this.rChild.checkConnected()) {
					this.checked = false;
					return true;
				} // end if
			} // end if
			if(this.lChild && !this.lChild.checked) {
				if(this.lChild.checkConnected()) {
					this.checked = false;
					return true;
				} // end if
			} // end if
			// If there were no connections, then flag this bubble to be checked again to start falling.
			this.needToCheck = true;
			return false;
		} // end if
	} // end checkConnected
	
	tbubb.unPop = function() {
		this.visible = true;
		this.connected = true;
	}
	
	tbubb.pop = function() {
	// Make self not visible and call nearby bubble's pop functions if the colors match.
	// If the colors of bordering bubble does not match, flag it to be checked for falling as it may not be connected to a top bubble.
		this.visible = false;
		this.connected = false;
		if(this.rChild) {
			if(this.rChild.connected) {
				if(this.rChild.color == this.color) {
					this.rChild.pop();
				} else {
					this.rChild.needToCheck = true;
				} // end if
			} // end if
		} // end if
		
		if(this.lChild) {
			if(this.lChild.connected) {
				if(this.lChild.color == this.color) {
					this.lChild.pop();
				} else {
					this.lChild.needToCheck = true;
				} // end if
			} // end if
		} // end if
		
		if(this.rPeer) {
			if(this.rPeer.connected) {
				if(this.rPeer.color == this.color) {
					this.rPeer.pop();
				} else {
					this.rPeer.needToCheck = true;
				} // end if
			} // end if
		} // end if
		
		if(this.lPeer) {
			if(this.lPeer.connected) {
				if(this.lPeer.color == this.color) {
					this.lPeer.pop();
				} else {
					this.lPeer.needToCheck = true;
				} // end if
			} // end if
		} // end if
		
		if(this.rParent) {
			if(this.rParent.connected) {
				if(this.rParent.color == this.color) {
					this.rParent.pop();
				} else {
					this.rParent.needToCheck = true;
				} // end if
			} // end if
		} // end if
		
		if(this.lParent) {
			if(this.lParent.connected) {
				if(this.lParent.color == this.color) {
					this.lParent.pop();
				} else {
					this.lParent.needToCheck = true;
				} // end if
			} // end if
		} // end if	
	} // end pop
	
	tbubb.countColor = function() {
	// Count how many bubbles of the same color are connected to this bubble.
		count = 1;
		this.colorChecked = true; // Make sure this bubble is not stepped through again.
		
		// First check if the bordering bubble exists and is actually connected.
		// Then check if it has the same color and has not already been checked.
		// If all those requirements are met, the bubble and its children will be checked.
		if(this.rParent) {
			if(this.rParent.connected) {
				if(this.rParent.color == this.color && !this.rParent.colorChecked) {
					count += this.rParent.countColor();
				} // end if
			} // end if
		} // end if
		
		if(this.lParent) {
			if(this.lParent.connected) {
				if(this.lParent.color == this.color && !this.lParent.colorChecked) {
					count += this.lParent.countColor();
				} // end if
			} // end if
		} // end if
		
		if(this.rPeer) {
			if(this.rPeer.connected) {
				if(this.rPeer.color == this.color && !this.rPeer.colorChecked) {
					count += this.rPeer.countColor();
				} // end if
			} // end if
		} // end if
		
		if(this.lPeer) {
			if(this.lPeer.connected) {
				if(this.lPeer.color == this.color && !this.lPeer.colorChecked) {
					count += this.lPeer.countColor();
				} // end if
			} // end if
		} // end if
		
		if(this.rChild) {
			if(this.rChild.connected) {
				if(this.rChild.color == this.color && !this.rChild.colorChecked) {
					count += this.rChild.countColor();
				} // end if
			} // end if
		} // end if
		
		if(this.lChild) {
			if(this.lChild.connected) {
				if(this.lChild.color == this.color && !this.lChild.colorChecked) {
					count += this.lChild.countColor();
				} // end if
			} // end if
		} // end if
		
		return count;
	} // end countColor
	
	tbubb.changeColor = function(color) {
		this.color = color;
		this.changeImage(level.baseImage + this.color + '.png');
	} // end changeColor
	
	tbubb.randomColor = function() {
		this.color = Math.floor(Math.random() * level.numberOfColors);
		this.changeImage('bubble' + this.color + '.png');
	}
	
	tbubb.update = function() {
		// Check if the bubble needs to be dropped.
		if(this.needToCheck == true) {
			if(!this.checkConnected()) {
				this.fall();
			} // end if
			this.needToCheck = false;
		} // end if
		// Reset flags just in case.
		this.checked = false;
		this.colorChecked = false;
	
		// Update position.
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if (this.visible){
		  this.draw();
		} // end if
	} // end update
	
	return tbubb;
} // end Bubble def

function BubbleTree(rowLength) {
// A container for storing, inserting, and deleting bubbles.
	this.rowLength = rowLength;
	// The bubbles are stored as an array to quickly iterate through them.
	this.bubbles = new Array();
	this.length = this.bubbles.length;
	
	this.getRPar = function(index) {
	// For insertion, returns the index, if there is one, for the appropriate right parent bubble of the given bubble position.
		rPar = 0;
		// First check if the initial bubble is on and even row or an odd row since the rows are staggered.
		if(Math.floor(index / this.rowLength) % 2 == 0) {
			// Even row bubbles will always have a right parent.
			rPar = index - this.rowLength;
		} else {
			// Odd row bubbles will have a right parent if they are not on the right edge of the row.
			rPar = index - this.rowLength + 1;
			if(index % this.rowLength == this.rowLength - 1) {
				// If they are, then they have no right parent.
				rPar = -1;
			} // end if
		} // end if
		return rPar;
	} // end getRPar
	
	this.getLPar = function(index) {
	// For insertion, returns the index, if there is one, for the appropriate left parent bubble of the given bubble position.
		lPar = 0;
		// Check if the bubble is on an odd or even row.
		if(Math.floor(index / this.rowLength) % 2 == 0) {
			// Even row bubbles will have a left parent if they are not on the left edge of the row.
			lPar = index - this.rowLength - 1;
			if(index % this.rowLength == 0) {
				// Otherwise they have no left parent.
				lPar = -1;
			} // end if
		} else {
			// Odd row bubbles will always have a left parent.
			lPar = index - this.rowLength;
		} // end if
		return lPar;
	} // end getLPar
	
	this.getRPer = function(index) {
	// For insertion, returns the index, if there is one, for the appropriate right peer bubble of the given bubble position.
		rPer = index + 1; // The right peer is just the next bubble.
		if(index % this.rowLength == 0) {//this.rowLength - 1) {
			// Bubbles on the right end of a row have no right peer.
			rPer = -1;
		} // end if
		return rPer;
	} // end getRPer
	
	this.getLPer = function(index) {
	// For insertion, returns the index, if there is one, for the appropriate left peer bubble of the given bubble position.
		lPer = index - 1; // The left peer is just the previous bubble.
		if(index % this.rowLength == 0) {
			// Bubbles on the left end of a row have no left peer.
			lPer = -1;
		} // end if
		return lPer;
	} // end getLPer
	
	this.getRChi = function(index) {
	// For insertion, returns the index, if there is one, for the appropriate right child bubble of the given bubble position.
		rChi = 0;
		// Check if the bubble is on an odd or even row.
		if(Math.floor(index / this.rowLength) % 2 == 0) {
			// Even row bubbles always have a right child.
			rChi = index + this.rowLength;
		} else {
			// Odd row bubbles will have a right child if they are not on the right end of the row.
			rChi = index + this.rowLength + 1;
			if(index % this.rowLength == this.rowLength -1) {
				rChi = -1
			} // end if
		} // end if
		return rChi;
	} // end getRChi
	
	this.getLChi = function(index) {
	// For insertion, returns the index, if there is one, for the appropriate left child bubble of the given bubble position.
		lChi = 0;
		// Check if the bubble is on an odd or even row.
		if(Math.floor(index / rowLength) % 2 == 0) {
			// Even row bubbles will have a left child if they are not on the left end of the row.
			lChi = index + rowLength - 1;
			if(index % rowLength == 0) {
				lChi = -1;
			} // end if
		} else {
			lChi = index + rowLength;
		} // end if
		return lChi;
	} // end getLChi
	
	this.addBubble = function(bubble) {
	// Pushes a bubble to the end of the tree.
		this.bubbles.push(bubble);
		bubble.clickable = false;
		this.length = this.bubbles.length;
		index = this.length - 1;
		this.addConnections(index);
	} // end addBubble
	
	this.addBubbleAt = function(bubble, index) {
	// Adds a bubble at a given index, replacing any bubbles that were already there.
		if(index >= 0) {
		// Only add a bubble if the index is a valid one.
			if(this.bubbles[index]) {
				delete this.bubbles[index];
			} // end if
			this.bubbles[index] = bubble;
			this.length = this.bubbles.length;
			this.addConnections(index);
		} // end if
	} // end addBubbleAt
	
	this.addConnections = function(index) {
	// Adds connections to the bubble at the given index.
		rPa = this.getRPar(index);
		lPa = this.getLPar(index);
		rPe = this.getRPer(index);
		lPe = this.getLPer(index);
		rCh = this.getRChi(index);
		lCh = this.getLChi(index);
		
		// For each edge, check to make sure there is actually a bubble that exists at the
		// index found and that the index found is a valid one.
		this.bubbles[index].rParent = this.bubbles[rPa];
		if(this.bubbles[rPa] && rPa >= 0) {this.bubbles[rPa].lChild = this.bubbles[index];}
		this.bubbles[index].lParent = this.bubbles[lPa];
		if(this.bubbles[lPa] && lPa >= 0) {this.bubbles[lPa].rChild = this.bubbles[index];}
		this.bubbles[index].rPeer = this.bubbles[rPe];
		if(this.bubbles[rPe] && rPe >= 0) {this.bubbles[rPe].lPeer = this.bubbles[index];}
		this.bubbles[index].lPeer = this.bubbles[lPe];
		if(this.bubbles[lPe] && lPe >= 0) {this.bubbles[lPe].rPeer = this.bubbles[index];}
		this.bubbles[index].rChild = this.bubbles[rCh];
		if(this.bubbles[rCh] && rCh >= 0) {this.bubbles[rCh].lParent = this.bubbles[index];}
		this.bubbles[index].lChild = this.bubbles[lCh];
		if(this.bubbles[lCh] && lCh >= 0) {this.bubbles[lCh].rParent = this.bubbles[index];}
		
		// Finally, check if the bubble at the given index is one of the top row bubbles.
		if(Math.floor(index / this.rowLength) == 0) {this.bubbles[index].top = true;}
	} // end addConnections
	
	this.delBubble = function(bubble) {
		delete this.bubbles[this.bubbles.indexOf(bubble)];
	} // end delBubble
	
	this.walk = function(action) {
	// Walks through the array while executing a given function on each bubble.
	// NOTE: This function does not work with the way Javascript handles scope unless all bubbles
	// 		 and the tree are within the global scope.
		for(var i = 0; i < this.length; i ++) {
			if(this.bubbles[i]) {
				if(action) {
					action(this.bubbles[i]);
				} // end if
			} // end if
		} // end for
	} // end doAction
	
	this.update = function() {
	// Updates all the bubbles.
		for(var i = 0; i < this.length; i ++) {
			if(this.bubbles[i]) {
				this.bubbles[i].update();
			} // end if
		} // end for
	} // end update
	
	this.printEdges = function() {
	// Prints each bubble's bordering index.
		for(var i = 0; i < this.length; i ++) {
			if(this.bubbles[i]) {
				var info = i + '. RPa: ' + this.bubbles[i].rParent;
				info += '. LPa: ' + this.bubbles[i].lParent;
				info += '. RPe: ' + this.bubbles[i].rPeer;
				info += '. LPe: ' + this.bubbles[i].lPeer;
				info += '. RCh: ' + this.bubbles[i].rChild;
				info += '. LCh: ' + this.bubbles[i].lChild + '.';
			} // end for
		} // end for
	} // end printEdges
	
	this.checkCollisions = function(sprite) {
	// Returns the first instance of a bubble that is colliding with the given sprite.
	// If there are no collisions, returns null.
		for(var i = 0; i < this.length; i ++) {
			if(this.bubbles[i] && this.bubbles[i].connected) {
				if(this.bubbles[i].collidesWith(sprite)) {
					return this.bubbles[i];
				} // end if
			} // end if
		} // end for
		return null;
	} // end checkCollision
	
	this.sameColorCount = function(bubble) {
	// Counts how many connecting bubbles are of the same color as the given bubble.
		count = bubble.countColor();
		return count;
	} // end sameColorCount
	
	this.colorsLeft = function() {
	// Returns an array with a list of colors of remaining bubbles.
		colors = new Array();
		for(var i = 0; i < this.length; i ++) {
			if(this.bubbles[i]) {
				if(this.bubbles[i].connected) {
					if(colors.indexOf(this.bubbles[i].color) < 0) {
						if(this.bubbles[i].type != QUESTION){
							colors.push(this.bubbles[i].color);
						}	
					} // end if
				} // end if
			} // end if
		} // end for
		return colors;
	} // end colorCount
	
	this.indexOf = function(bubble) {
		return this.bubbles.indexOf(bubble);
	} // end indexOf
	
	this.getBubble = function(index) {
		return this.bubbles[index];
	} // end getBubble
	
	return this;
} // end BubbleTree def

function BG(scene, image, width, height, x, y) {
	tBG = new Sprite(scene, image, width, height, 0);
	tBG.setSpeed(0);
	tBG.setPosition(x, y);
	
	tBG.clicked = function(){
		if(!level.helper.helping && !level.launcher.moving && !level.checkTutorialVisible() && level.game.mouseY < level.launcherY) {
			angle = level.launcher.angleToMouse();
			if(angle < 280 && angle >= 180) {angle = 280;}
			if(angle > 440 || angle < 180) {angle = 440;}
			level.launcher.launch(level.launcherSpeed, angle);
			level.sound.playLaunchSound();
		}
	}
	
	return tBG;
} // end BG def

function LauncherButton(scene, image, width, height, x, y){
	tLauncher = new TextBox(scene, image, width, height);
	tLauncher.z = 1;
	tLauncher.setPosition(x, y);
	tLauncher.color = "#000000";
	tLauncher.speed = 5;
	tLauncher.fontSize = 18;
	
	tLauncher.clicked = function(){
		if(!level.launcher.moving){
			colors = level.bubbles.colorsLeft();
			cur = colors.indexOf(level.launcher.color);
			cur ++;
			if(cur >= colors.length) cur = 0;
			if(colors[cur] == this.answerBubbleColor) cur ++;
			if(cur >= colors.length) cur = 0;
			level.launcher.changeColor(colors[cur]);
		}
	}
	
	return tLauncher;
}

function MainTextBox(scene, image, width, height, x, y){
	tTextBox = new TextBox(scene, image, width, height);
	tTextBox.z = 5;
	tTextBox.setPosition(x, y);
	
	tTextBox.clicked = function(){
		this.hide();
		if (m != 0 && m < menuScreen.length - 1) {
			level.nextQuestion();
		}
		else if (m != 0) {
			level.gameOver = true;
		}
	}
	
	tTextBox.setClue = function(clue, x, y, font, fontSize, color, textLength) {
		this.writeText(clue, "center");
		this.fitText();
	} // end setClue
	
	return tTextBox;
}

function TutTextBox(scene, image, width, height, x, y, fontType, fontSize, fontColor, text, backColor, backAlpha, borderSize, borderColor, borderAlpha, marginTop, marginBottom, marginRight, marginLeft) {
	tTextBox = new TextBox(scene, image, width, height);
	tTextBox.z = 6;
	tTextBox.setPosition(x, y);
	tTextBox.resize(width, height);
	tTextBox.setImage(image, 4);
	tTextBox.setFont(fontType, fontSize, fontColor);
	tTextBox.text = text;
	tTextBox.setBackground(backColor, backAlpha);
	tTextBox.setBorder(borderSize, borderColor, borderAlpha);
	tTextBox.setMargin(marginTop, marginBottom, marginRight, marginLeft);
	tTextBox.counter = 0;
	
	
	/*tTextBox.setPosition(this.tutorialBoxX[i], this.tutorialBoxY[i]);
	tTextBox.resize(this.tutorialBoxWidth[i], this.tutorialBoxHeight[i]);
	tTextBox.setImage(this.tutorialBoxImage[i], 4);
	tTextBox.setFont(this.tutorialBoxFont[i], this.tutorialBoxFontSize[i], this.tutorialBoxFontColor[i]);
	tTextBox.text = this.tutorialText[i];
	tTextBox.setBackground(this.tutorialBoxColor[i], this.tutorialBoxAlpha[i]);
	tTextBox.setBorder(this.tutorialBoxBorderSize[i], this.tutorialBoxBorderColor[i], this.tutorialBoxBorderAlpha[i]);
	tTextBox.setMargin(this.tutorialBoxMarginTop[i], this.tutorialBoxMarginBottom[i], this.tutorialBoxMarginRight[i], this.tutorialBoxMarginLeft[i]);*/
	
	tTextBox.clicked = function(){
		this.hide();
		//console.log(level.tutorialBoxes[1].text);
		//console.log(this.counter);
		if(this.counter == 0) {
			level.sound.preloadSounds();
		}
		if(this.counter < 3)
		{
			level.tutorialBoxes[this.counter+1].show();
		}
		
		//console.log("cliked!" + counter);
	}
	
	return tTextBox;
}

function CreateSounds(scene) {
	this.scene = scene;
	this.correctSound = new Sound("yaycrowdeditedshorter.mp3");
	this.wrongSound = new Sound("wrong.mp3");
	this.launchSound = new Sound("bubbleshot.mp3");
	this.bounceSound = new Sound("bubblebounce.mp3");
	this.popSound = new Sound("bubblepop.mp3");
	
	this.preloadSounds = function(){
		this.wrongSound.playSound({sound: 0});
		this.correctSound.playSound({sound: 0});
		this.launchSound.playSound({sound: 0});
		this.bounceSound.playSound({sound: 0});
		this.popSound.playSound({sound: 0});
	}
	
	this.playWrongSound = function(){
		this.wrongSound.playSound();
	}
	
	this.playCorrectSound = function(){
		this.correctSound.playSound();
	}
	
	this.playLaunchSound = function(){
		this.launchSound.playSound();
	}
	
	this.playBounceSound = function(){
		this.bounceSound.playSound();
	}
	
	this.playPopSound = function(){
		this.popSound.playSound();
	}
	
	return this;
}

function QuestionHolder(scene, image, width, height, x, y){
	tHolder = new TextBox(scene, image, width, height);
	tHolder.z  = 3;
	tHolder.setPosition(x, y);
	tHolder.clickable = false;
	
	tHolder.setClue = function(clue, x, y, font, fontSize, color, textLength) {
		this.fontSize = fontSize;
		this.fontColor = color;
		this.writeText(clue, "left");
		//this.fitText(); //the box needs to stay a fixed size
		this.setPosition(this.x, this.y)
	} // end setClue
	return tHolder;
}

var questions = [

	{questionLine1: 'Tutorial\nWhich answer bubble is in the middle?',
	answers: ['1', '2', '3'],
	correct: 1,
	hint: '2 is the correct answer'},
	
	{questionLine1: 'Ketones are my friend.',
	answers: ['True', 'False', 'Sometimes'],
	correct: 1,
	hint: 'Don’t invite ketones over for a visit!!'},
	
	{questionLine1: 'When my body doesn’t have enough\ninsulin, I may get: ',
	answers: ['A honeymoon period.', 'Low blood pressure.', 'Ketones.'],
	correct: 2,
	hint: 'If you go without insulin or miss a shot,\nketones might show up!'},
	
	{questionLine1: 'Ketones can be caused by:',
	answers: ['Being sick or not taking insulin.', 'Eating too much food.', 'Being active.'],
	correct: 0,
	hint: 'You can’t run or eat your way to ketones!'},
	
	{questionLine1: 'When should you check for ketones?',
	answers: ['Never.', 'When I am sick.', 'Only if I have to go to the hospital.'],
	correct: 1,
	hint: 'Oh! My tummy is upset and I don’t feel well, what should I do?'},
	
	{questionLine1: 'When should you NOT check for ketones?',
	answers: ['When BS is over 250 for two blood\n    sugar checks in a row.', 'If ketones were positive the last time\n    you checked.', 'Every morning.'],
	correct: 2,
	hint: 'Not at the same time every day.'},
	
	{questionLine1: 'Ketones are measured at the\nfollowing levels:',
	answers: ['Negative, Trace, Small,\n    Moderate, Large.', 'None, Minimal, Mild, Severe.', 'Zero, A few, Some, Tons.'],
	correct: 0,
	hint: 'Negative is good!'},
	
	{questionLine1: 'When you have moderate or\nlarge ketones, you might feel:',
	answers: ['Sick to your stomach and have\n    trouble breathing.', 'Dizzy and sweaty.', 'An itchy, runny nose and sore throat.'],
	correct: 0,
	hint: 'It is not like having a small cold or a low blood sugar.'},
	
	{questionLine1: 'When I am sick, I should:',
	answers: ['Sleep all day and get my rest. Don’t\n    worry about taking insulin or drinking.', 'Check my blood sugar and ketones.\n    Drink plenty of fluids.', 'Not take any insulin if I don’t feel like\n    eating.'],
	correct: 1,
	hint: 'You can’t skip diabetes care because you are sick.'},
	
	{questionLine1: 'I DON’T need to call the Riley\nEmergency Line if:',
	answers: ['I am vomiting and can’t keep anything\n    down.', 'I have moderate or large ketones.\n    (since I may need extra insulin)', 'I am not sure how many grams of\n    carb are in my lunch.'],
	correct: 2,
	hint: 'Carb counts can be found online or by asking an adult for help, but it isn’t an emergency.'},
	
	{questionLine1: 'If I am sick and have moderate or large\nketones but my blood sugar is normal \n(80-180), I might have to drink fluids that\nhave sugar in them (like regular 7-Up).',
	answers: ['True', 'False', 'Doesn’t matter'],//, 'Not sure'],
	correct: 0,
	hint: 'Sometimes sugar is needed.'},
	
	{questionLine1: 'If I am sick and have moderate or large\nketones and my blood sugar is higher\nthan it should be (like 250), then I\nshould drink sugar free fluids.',
	answers: ['True', 'False', 'Doesn’t matter'],//, 'Not sure'],
	correct: 0,
	hint: 'No need to add sugar with a high blood sugar.'},
	
	{questionLine1: 'If I have moderate or large ketones,\nI should not go to school.',
	answers: ['True', 'False', 'Doesn’t matter'],//, 'Not sure'],
	correct: 1,
	hint: 'School is good!!!'}
	
	/*{questionLine1: '',
	answers: ['', '', ''],
	correct: 1,
	hint: 'Game Over!\nThanks for playing!'}*/
	
];

var menuScreen = [
'Welcome to "We All Have Sick Days"\nTap the Tutorials to Start'/*\nTo play, launch the ball towards the bubble\nyou think is the correct answer to the\nquestion. You can change the bubble color\nby tapping it.'*/,
'2 is the middle bubble.',
'Ketones are not good.\nIf not treated, ketones can lead to a\nscary illness called Diabetic Ketoacidosis.',
'If your body doesn’t have insulin,\nsugar cannot get into your cells to help them work.\nIf that happens, your cells have to use something\nelse to work....this causes ketones.',
'Ketones are caused by your\nbody not getting enough insulin. This can be from being sick or\nbecause you didn’t take your insulin.',
'You may have ketones when you are sick\n(even with a normal or low blood sugar).\nYou always need to check ketones when you are sick.',
'If two blood sugar checks in a row\nare greater than 250, you need to check ketones!\nNot getting enough insulin will cause high blood sugars.\nIt will also cause your body to make ketones,\nso check your blood sugars with multiple highs.\nIf you have ketones, you need to make sure they go away,\nso keep checking until they are gone.',
'Negative ketones make us happy.\nTrace and small ketones need to be flushed out\nwith drinking fluids. Moderate and large ketones will need\nhelp going away – call Riley for help.',
'Moderate or large ketones can cause a scary\nillness called Diabetic Ketoacidosis. You may have trouble\nbreathing, have a stomach ache, or feel very tired.\nCall the Riley Emergency number,\nso that we can make you feel better!',
'When sick, you will need to check your\nblood sugar and ketones. You will need to take\nyour insulin and sip on fluids too - even if you\ncan’t eat! You may need help deciding how much\ninsulin to give if your ketones are\nmoderate or large - call Riley for help.',
'The Emergency Line is for help when you\ncan’t keep any food down or if you have moderate or\nlarge ketones – call the Riley Emergency line to get\nhelp with how to much insulin to\ngive when these things happen.',
'Extra insulin is needed to get rid of moderate or\nlarge blood sugars. Sometimes an adult may have you drink sugary\nfluids to bring your blood sugar up. Once your\nblood sugar is up, Riley Diabetes Team can give you extra insulin.',
'Extra insulin can be given for high blood sugar\nand moderate or large keytones – call Riley for a dose.\nYou also need to flush out the ketones with fluid.\nKeep it sugar free since your blood sugar is already high.',
'Adults at the school can help you take care of ketones.\nIt is not a reason to stay home from school. \nIf you have a fever or are vomiting from an illness,\nyou should not go to school.',
'Game Over\nThanks for playing!'
];    

var q = 0;
var m = 0;

function Level() {
// Class to easily create customized levels for the Bubble pop game.
// After being created, game variables can be changed before the game
// starts to customize each level. The game is started by calling init().
	// Game variables begin here and are ordered by which object they are tied to.
	
	// Game object variables. 
	this.gameWidth = 948;
	//this.gameWidth = 816;
	this.gameHeight = 711;
	//this.gameHeight = 500;
	this.gameOver = false;
	
	// Background variables.
	this.bgImage = 'background.png';
	//this.bgWidth = 900;
	this.bgWidth = this.gameWidth;
	//this.bgHeight = 550;
	this.bgHeight = this.gameHeight;
	//this.bgX = 450;
	this.bgX = this.gameWidth/2;
	//this.bgY = 275;
	this.bgY = this.gameHeight/2;
	
	// Box Pop-up Variables
	this.popUpBoxImage = 'White.png';
	this.popUpBoxImageCC = 'Paint.png';
	
	// Bubble Tree variables.
	this.rowLength = 25;
	this.numberOfBubbles = 100;
	this.numberOfColors = 3;
	this.minNumBubbleToPop = 3;
	this.initX = 16;
	this.initY = 16;
	
	// Bubble variables
	this.bubbleFallSpeed = 10;
	//this.bubbleWidth = 32;
	this.bubbleWidth = (2/51)*this.gameWidth;
	//this.bubbleHeight = 32;
	this.bubbleHeight = (2/51)*this.gameWidth;
	this.baseImage = 'bubble'; // 'bubble' or 'patternBubble'
	this.answerBase = 'bubble';
	this.fileExt = '.png';
	
	// Launched bubble variables.
	this.launcherX = this.gameWidth/2;//400;
	this.launcherY = this.gameHeight - (this.gameHeight * (27/100));//365;//384
	this.launcherSpeed = 20;
	
	// Question variables.
	this.questionIndex = 0;
	this.questionLine1 = questions[q].questionLine1;
	this.correct = questions[q].correct;
	this.answers = questions[q].answers;
	this.questionFont = 'Arial';
	this.questionFontSize = 23;
	this.questionFontColor = '#FFFFFF';
	this.questionX = 80;
	this.questionY = 350;
	this.questionLineSpacing = 25;
	this.questionCounter = 0;
	this.questionImage = "transparent.png";
	
	
	// Answer bubble variables.
	this.answerBubbleColor = WHITE;
	this.answerBubbleIndicies = [31, 37, 43];
	//this.alreadyAnswered = [false, false, false];
	
	// Helper variables.
	/*this.helperX = 716;
	this.helperY = 400;
	this.helperWidth = 200;
	this.helperHeight = 200;
	this.helperImage = 'Cat.png';
	this.clueX = 0;
	this.clueY = 0;
	this.helperClue = questions[q].hint;
	this.helperFont = 'Arial';
	this.helperFontSize = 20;
	this.helperLineWidth = 40;
	this.helperFontColor = '#000000';*/
	
	//this.helperX = 716;
	//this.helperX = this.gameWidth - ((25/204)*this.gameWidth);
	this.helperX = 850;
	//this.helperY = 400;
	//this.helperY = this.gameHeight - ((1/5)*this.gameHeight);
	this.helperY = 595;
	//this.helperWidth = 200;
	this.helperWidth = this.gameWidth * (25/102);
	//this.helperWidth = this.gameWidth * (2/5);
	//this.helperHeight = 200;
	this.helperHeight = this.gameWidth * (25/102);
	//this.helperHeight = this.gameWidth * (2/5);
	this.helperClue = questions[q].hint;
	this.clueX = this.gameWidth/2;
	this.clueY = this.gameHeight/2;
	this.clueWidth = 400;
	this.clueHeight = 125;
	this.clueImage = 'White.png'
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
	this.helperDir = '../Helper/AnimatedCat/';
	this.helperTalkPre = this.helperDir + 'CatTalk';
	this.helperTalkPost = '.png';
	this.helperWaveFrames = 28;
	this.helperWavePre = this.helperDir + 'CatLookAtMe';
	this.helperWavePost = '.png';
	this.helperImage = this.helperDir + 'CatTalk1.png';
	
	// Tutorial variables.
	this.tutorialSceneCount = 4;
	this.tutorialText = ['Tap where you want\nthe bubble to go.',
						 'Match three or more bubbles\nof the same color to make the\ncorrect answer bubble fall.',
						 'Tap here to change\nthe color of the bubble.',
						 'Tap here for a hint.'];
	//this.tutorialBoxImage = ['Paint.png', 'Paint.png', 'Paint.png', 'Paint.png'];
	this.tutorialBoxImage = ['arrow3.png', 'arrow2.png', 'arrow3.png', 'arrow3.png'];
	this.tutorialBoxColor = ['#001D74', '#001D74', '#001D74', '#001D74'];
	this.tutorialBoxAlpha = [0, 0, 0, 0];
	this.tutorialBoxFont = ['Arial', 'Arial', 'Arial', 'Arial'];
	this.tutorialBoxFontSize = [20, 20, 20, 20];
	this.tutorialBoxFontColor = ['#000000', '#000000', '#000000', '#000000'];
	this.tutorialBoxWidth = [210, 300, 230, 200];
	this.tutorialBoxHeight = [70, 100, 70, 60];
	this.tutorialBoxX = [200, 650, 310, 690];
	this.tutorialBoxY = [250, 60, 630, 620];
	this.tutorialBoxBorderSize = [0, 2, 2, 2];
	this.tutorialBoxBorderColor = ['#000000', '#000000', '#000000', '#000000'];
	this.tutorialBoxBorderAlpha = [0, 0, 0, 0];
	this.tutorialBoxMarginTop = [3, 7, 0, -3];
	this.tutorialBoxMarginBottom = [0, 0, 0, 0];
	this.tutorialBoxMarginRight = [0, 0, 0, 0];
	this.tutorialBoxMarginLeft = [-10, 10, -10, -7];
	
	// Launcher Button Variables
	this.launcherFontColor = "#000000";
	this.launcherFont = "Arial";
	this.launcherFontSize = 20;
	this.launcherLineWidth = 15;
	this.menuItem = menuScreen[m];
	
	// Game objects begin here.
	this.game;
	this.bubbles;
	this.launcher;
	this.question;
	this.answerBubbles;
	this.helper;
	this.correctSound;
	this.wrongSound;
	this.menu;
	this.launcherZ;
	this.tutorialBoxes;
	
	this.init = function() {
		this.game = new Scene();
		this.game.setSize(this.gameWidth, this.gameHeight);
		
		this.makeBubbles();
		this.makeQuestion();
		this.makeAnswers();
		
		this.sound = new CreateSounds(this.game);
		
		this.bg = new BG(this.game, this.bgImage, this.bgWidth, this.bgHeight, this.bgX, this.bgY);
		
		this.menu = new MainTextBox(this.game, this.popUpBoxImage, 400, 125, this.game.width/2, this.game.height/2);
		this.menu.setClue(this.menuItem, this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
			
		this.makeHelper();

		this.positionAllBubbles();		
		this.newLauncher();
		this.newLauncherZ();
		this.makeTutorialBoxes();
		
		this.questionHolder = new QuestionHolder(this.game, this.questionImage, this.launcher.x - this.launcher.width * .5, this.gameHeight * .25, (this.launcher.x - this.launcher.width * .5) * .5 + 10, this.gameHeight * .77);
		this.questionHolder.setClue(this.questionText, 0, 0, this.questionFont, this.questionFontSize, this.questionFontColor, 0);
		
		for (var i = 0; i < spriteList.length(); i++) {
			// cycle through sprites and hide the random 3 bubbles that are initialized but not used
			if (spriteList.list[i].x == 200 && spriteList.list[i].y == 200) {
				spriteList.list[i].hide();
			}
		}
			
		spriteList.list.sort(function(a, b) {
			if (a.z > b.z)
				return 1;
			if (a.z < b.z)
				return -1;
			return 0;
		});
		
		this.game.start();
	} // end init
	
	this.makeHelper = function() {
		this.helper = new Helper(this.game, this.helperImage, this.helperWidth, this.helperHeight);
		this.helper.z = 3;
		this.helper.setPosition(this.helperX, this.helperY);
		this.helper.setClue(this.helperClue + "\nTap to close", this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
		this.helper.setClueBoxSize(this.clueWidth, this.clueHeight);
		this.helper.setClueAlign(this.clueAlign);
		this.helper.setClueBoxBackground(this.clueImage, this.clueStyle, this.clueColor, this.clueAlpha);
		this.helper.setClueBoxBorder(this.clueBorderSize, this.clueBorderColor, this.clueBorderAlpha);
		this.helper.setTalkAnimation(this.helperTalkFrames, this.helperTalkPre, this.helperTalkPost);
		this.helper.setWaveAnimation(this.helperWaveFrames, this.helperWavePre, this.helperWavePost);
	} // end makeHelper
	
	this.makeBubbles = function() {
		this.bubbles = new BubbleTree(this.rowLength);
		color1 = Math.floor(Math.random() * this.numberOfColors);
		color2 = Math.floor(Math.random() * this.numberOfColors);
		color3 = Math.floor(Math.random() * this.numberOfColors);
		for(var i = 0; i < this.numberOfBubbles; i ++) {
			color = Math.floor(Math.random() * this.numberOfColors);
			if(i == 6 || i ==7 || i == 30 || i == 32 || i == 56 || i == 57)
			{
				this.bubbles.addBubble(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, color1, this.fileExt, 2));
				//i++;
			}
			/*if(i == 7)
			{
				this.bubbles.addBubble(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, color, this.fileExt));
			}*/
			else if(i == 12 || i ==13 || i == 36 || i == 38 || i == 62 || i == 63)
			{
				this.bubbles.addBubble(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, color2, this.fileExt, 2));
				//i++;
			}
			//this.bubbles.addBubble(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, color, this.fileExt));
			else if(i == 18 || i ==19 || i == 42 || i == 44 || i == 68 || i == 69)
			{
				this.bubbles.addBubble(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, color3, this.fileExt, 2));
				//i++;
			}
			else
			{
				this.bubbles.addBubble(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, color, this.fileExt, 2));
			}
		} // end for
		this.randomizeColors();
	} // end makeBubbles
	
	this.makeQuestion = function() {
		this.question = new Question(this.questionLine1, this.correct, this.answers);
		this.questionText = /*"Question " + this.questionCounter + " out of 12\n" + */this.question.questionLine1 + "\n\n" + "1) " + this.question.answers[0] + "\n" + "2) " + this.question.answers[1] + "\n" + "3) " + this.question.answers[2];
	} // end makeQuestion
	
	this.setQuestion = function() {
		this.questionText = "Question " + this.questionCounter + " out of 12\n" + this.question.questionLine1 + "\n\n" + "1) " + this.question.answers[0] + "\n" + "2) " + this.question.answers[1] + "\n" + "3) " + this.question.answers[2];
		this.questionHolder.setClue(this.questionText, 0, 0, this.questionFont, this.questionFontSize, this.questionFontColor, 0);
	} // end makeQuestion
	
	this.makeAnswers = function() {
		this.answerBubbles = new Array();
		for(var i=0;i<3;i++){
			this.answerBubbles.push(new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.answerBase, 8+i, this.fileExt));
			this.bubbles.addBubbleAt(this.answerBubbles[i], this.answerBubbleIndicies[i]);//28 + i * 9);
			//this.bubbles.addBubbleAt(this.answerBubbles[i], 28 + i * 9);
			this.answerBubbles[i].type = QUESTION;
		}
	} // end makeAnswers
	
	this.makeTutorialBoxes = function () {
		this.tutorialBoxes = new Array();
		for(var i = 0; i < this.tutorialSceneCount; i ++) {
			this.tutorialBoxes[i] = new TutTextBox(this.game, this.tutorialBoxImage[i], this.tutorialBoxWidth[i], this.tutorialBoxHeight[i], this.tutorialBoxX[i], this.tutorialBoxY[i], this.tutorialBoxFont[i], this.tutorialBoxFontSize[i], this.tutorialBoxFontColor[i], this.tutorialText[i], this.tutorialBoxColor[i], this.tutorialBoxAlpha[i], this.tutorialBoxBorderSize[i], this.tutorialBoxBorderColor[i], this.tutorialBoxBorderAlpha[i], this.tutorialBoxMarginTop[i], this.tutorialBoxMarginBottom[i], this.tutorialBoxMarginRight[i], this.tutorialBoxMarginLeft[i]);
			this.tutorialBoxes[i].counter = i;
			//this.tutorialBoxes[i] = new TextBox(this.game, this.tutorialBoxImage[i]);
			/*this.tutorialBoxes[i].setPosition(this.tutorialBoxX[i], this.tutorialBoxY[i]);
			this.tutorialBoxes[i].resize(this.tutorialBoxWidth[i], this.tutorialBoxHeight[i]);
			this.tutorialBoxes[i].setImage(this.tutorialBoxImage[i], 4);
			this.tutorialBoxes[i].setFont(this.tutorialBoxFont[i], this.tutorialBoxFontSize[i], this.tutorialBoxFontColor[i]);
			this.tutorialBoxes[i].text = this.tutorialText[i];
			this.tutorialBoxes[i].setBackground(this.tutorialBoxColor[i], this.tutorialBoxAlpha[i]);
			this.tutorialBoxes[i].setBorder(this.tutorialBoxBorderSize[i], this.tutorialBoxBorderColor[i], this.tutorialBoxBorderAlpha[i]);
			this.tutorialBoxes[i].setMargin(this.tutorialBoxMarginTop[i], this.tutorialBoxMarginBottom[i], this.tutorialBoxMarginRight[i], this.tutorialBoxMarginLeft[i]);*/
			if(i > 0) {
				this.tutorialBoxes[i].visible = false;
			} // end if
		} // end for
		this.tutorialBoxes[0].show();
	} // end makeTutorialBoxes
	
	this.updateTutorialBoxes = function() {
		for(var i = 0; i < this.tutorialBoxes.length; i ++) {
			this.tutorialBoxes[i].update();
			/*console.log('simple val0 ' + this.tutorialBoxes[0].isClicked());
			console.log('simple val1 ' + this.tutorialBoxes[1].isClicked());
			console.log('simple val2 ' + this.tutorialBoxes[2].isClicked());
			console.log('simple val3 ' + this.tutorialBoxes[3].isClicked());*/
			/*if(this.tutorialBoxes[i].visible && this.tutorialBoxes[i].isClicked()) {
				this.tutorialBoxes[i].visible = false;
				if(this.tutorialBoxes.length > i + 1) {
					this.tutorialBoxes[i + 1].visible = true;
					console.log('tut' + (i+1) + ' is '+ this.tutorialBoxes[i+1].visible + 'visid');
				} // end if
			} // end if*/
		} // end for
	} // end updateTutorialBoxes
	
	this.checkTutorialVisible = function() {
		/*console.log('how big: ' + this.tutorialBoxes.length);
		console.log('tut' + 0 + ' is '+ this.tutorialBoxes[0].visible);
		console.log('tut' + 1 + ' is '+ this.tutorialBoxes[1].visible);
		console.log('tut' + 2 + ' is '+ this.tutorialBoxes[2].visible);
		console.log('tut' + 3 + ' is '+ this.tutorialBoxes[3].visible);*/
		for(var i = 0; i < this.tutorialBoxes.length; i ++) {
			//console.log('tut' + i + ' is '+ this.tutorialBoxes[i].visible);
			if(this.tutorialBoxes[i].visible) {
				return true;
			} // end if
		} // end for
		return false;
	} // end checkTutorialVisible
	
	this.unPopAll = function() {
		for(var i = 0; i < this.bubbles.length-1; i ++) {
			var curBubble = this.bubbles.getBubble(i);
			curBubble.unPop();
		}
	}
	
	this.positionAllBubbles = function() {
		for(var i = 0; i < this.bubbles.length; i++) {
			this.positionBubble(this.bubbles.getBubble(i));
			//console.log(i + ": " + this.bubbles.getBubble(i).x + "," + this.bubbles.getBubble(i).x);
		} // end for
	} // end positionAllBubbles
	
	this.positionBubble = function(bubble) {
		index = this.bubbles.indexOf(bubble);
		x = this.initX + (index % this.rowLength) * this.bubbleWidth + (Math.floor(index / this.rowLength) % 2) * this.bubbleWidth / 2;
		y = this.initY + Math.floor(index / this.rowLength) * this.bubbleHeight;
		bubble.setPosition(x, y);
	} // end positionBubble
	
	this.randomizeColors = function () {
		color1 = Math.floor(Math.random() * level.numberOfColors);
		//console.log("1: " + color1);
		color2 = Math.floor(Math.random() * level.numberOfColors);
		//console.log("2: " + color2);
		while (color2 == color1) {
			color2 = Math.floor(Math.random() * level.numberOfColors);
			//console.log("2: " + color2);
		}
		color3 = Math.floor(Math.random() * level.numberOfColors);
		//console.log("3: " + color3);
		while (color3 == color1 || color3 == color2) {
			color3 = Math.floor(Math.random() * level.numberOfColors);
			//console.log("3: " + color3);
		}
		for(var i = 0; i < this.numberOfBubbles - 1; i++) {
			if(this.bubbles.bubbles[i].type != QUESTION){
				color = Math.floor(Math.random() * level.numberOfColors);
				//console.log(color);
				/*if(i == 6 || i == 12 || i == 18){
					this.bubbles.bubbles[i].changeColor(color);
					i++;
					console.log("YES" + i);
				}*/
				if(i == 6 || i ==7 || i == 30 || i == 32 || i == 56 || i == 57)
				{
					this.bubbles.bubbles[i].changeColor(color1);
				}
				else if(i == 12 || i ==13 || i == 36 || i == 38 || i == 62 || i == 63)
				{
					this.bubbles.bubbles[i].changeColor(color2);
				}
				else if(i == 18 || i ==19 || i == 42 || i == 44 || i == 68 || i == 69)
				{
					this.bubbles.bubbles[i].changeColor(color3);
				}
				else
				{
					this.bubbles.bubbles[i].changeColor(color);
				}
			}
			/*if(this.bubbles.bubbles[i].type == QUESTION){
				for(var j = 0; j < 3; j++){
					//console.log("A: " + this.bubbles.indexOf(this.bubbles[i]));
					//console.log("A: " + this.bubbles.bubbles[i].type);
					console.log("A: " + i );
					console.log("B: " + this.answerBubbleIndicies[j]);
					if(i == this.answerBubbleIndicies[j]){
						console.log("here01");
						if(this.alreadyAnswered[j] == true){
							console.log("here02");
							color = Math.floor(Math.random() * level.numberOfColors);
							this.bubbles.bubbles[i].changeColor(color);
							this.bubbles.bubbles[i].type = NORMAL;
						}
					}
				}
				//this.answerBubbleIndicies[]
				//this.alreadyAnswered = [false, false, false];
			}*/
		} // end for
	}
	
	this.chooseColor = function() {
		colors = this.bubbles.colorsLeft();
		choice = Math.floor(Math.random() * colors.length);
		if(colors[choice]) {
			if(colors[choice] == this.answerBubbleColor) {
				if(colors.length == 1) {
					return colors[choice];
				} else {
					return this.chooseColor();
				} // end if
			} else {
				return colors[choice];
			} // end if
		} else {
			return 0;
		} // end if
	} // end chooseColor
	
	this.newLauncher = function() {
		if (!this.launcher) {
			this.launcher = new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, this.chooseColor(), this.fileExt);
			this.launcher.setPosition(this.launcherX, this.launcherY);
		}
		if (this.launcher.y != this.launcherY) {
			this.launcher = new Bubble(this.game, this.bubbleWidth, this.bubbleHeight, this.bubbleFallSpeed, this.baseImage, this.chooseColor(), this.fileExt);
			this.launcher.setPosition(this.launcherX, this.launcherY);
		}
		this.launcher.setBoundAction(BOUNCE);
	} // end newLaunchBubble
	
	this.newLauncherZ = function() {
		this.launcherZ = new LauncherButton(this.game, this.popUpBoxImageCC, this.game.width*(29/158), this.game.height*(128/711),/*90, 90,*/ (this.game.width/2), this.game.height - (this.game.height * (11/100)),/*445*/ 99);
		this.launcherZ.writeText("Change\nColor", "center");
	}
	
	this.update = function() {
		//console.log(this.questionCounter);
		this.game.clear();
		////this.bg.update();
		
		if (this.menu.visible) {
			this.helper.clickable = false;
			this.bg.clickable = false;
			this.tutorialBoxes[0].clickable = false;
			this.tutorialBoxes[0].setAlpha(0);
		}
		else {
			this.helper.clickable = true;
			this.bg.clickable = true;
		}
		
		if(/*true){//*/this.checkTutorialVisible() == false){
			//console.log("Hered1!");
			//this.game.clear();
			//this.bg.update();
			this.checkAnswered();
			this.checkCollisions();
			//this.bubbles.update();
			//this.launcher.update();
			//this.launcherZ.update();
			//this.helper.update();
			//this.questionHolder.update();
			//this.menu.update();
			//this.updateTutorialBoxes();
			this.launcher.show();
			for (i = 0; i < spriteList.length(); i++) {
				spriteList.list[i].setAlpha(1);
			}
		}
		else if (!this.menu.visible) {
			this.tutorialBoxes[0].clickable = true;
			this.helper.clickable = false;
			this.launcher.hide();
			
			for (i = 0; i < spriteList.length(); i++) {
				spriteList.list[i].setAlpha(.5);
			}
			
			if (this.tutorialBoxes[0].visible) {
				this.bg.setAlpha(1);
			}
			else if (this.tutorialBoxes[1].visible) {
				for (i = 0; i < this.bubbles.bubbles.length; i++) {
					this.bubbles.bubbles[i].setAlpha(1);
				}
			}
			else if (this.tutorialBoxes[2].visible) {
				this.launcherZ.setAlpha(1);
			}
			else if (this.tutorialBoxes[3].visible) {
				this.helper.setAlpha(1);
			}
			
			for (i = 0; i < this.tutorialBoxes.length; i++) {
				this.tutorialBoxes[i].setAlpha(1);
			}
		}
		
		//this.game.clear();
		//this.bg.update();
		//this.checkAnswered();
		//this.checkCollisions();
		////this.bubbles.update();
		//this.launcher.update();
		/*this.launcherZ.update();
		this.helper.update();
		this.questionHolder.update();
		this.menu.update();
		this.updateTutorialBoxes();*/
		this.helper.fitText();
		
		spriteList.update();
		
		if (this.launcher.x < 0 || this.launcher.x > this.launcher.cWidth || this.launcher.y < 0) {
			this.sound.playBounceSound();
		}
		else if (this.launcher.y > this.launcher.cHeight) {
			//this.sound.playPopSound();
			this.launcher.hide();
			this.launcher.setSpeed(0);
			this.newLauncher();
		}
		/*for (var i = 0; i < this.bubbles.length; i++) {
			if (typeof this.bubbles.getBubble(i) != 'undefined') {
				if (this.bubbles.getBubble(i).y > this.launcher.cHeight && this.bubbles.getBubble(i).type != QUESTION) {
					this.sound.playPopSound();
					this.bubbles.getBubble(i).y = 200;
				}
			}
		}*/
	} // end update
	
	this.checkAnswered = function() {
		/*if(this.questionCounter == 7)
		{
			this.oldNumOfCol = this.numberOfColors;
			this.numberOfColors = 3;
			//this.reset();
			//this.randomizeColors();
			//console.log("changed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		}
		if(this.oldNumOfCol == this.numberOfColors-1)
		{
			this.randomizeColors();
		}*/
		if(this.questionCounter <= 12)
		{
			for(var i = 0; i < this.answerBubbles.length; i ++) {
				if(!this.answerBubbles[i].visible) {
					if(i == this.question.correct) {
						//this.alreadyAnswered = [false, false, false];
						this.reset();
						//if(this.questionCounter == 12)
						//{
							//console.log("THE END");
							//this.questionCounter = 0;
							//this.numberOfColors = 2;
						//}
						/*if(this.questionCounter == 2)
						{
							this.numberOfColors = 3;
						}*/
						this.sound.playCorrectSound();
						this.questionCounter++;
						m++;
						this.menu.setClue('Correct!\n' + menuScreen[m] + '\nTap to close.', this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
						this.menu.fitText();
						this.menu.show();
					} else {
						//this.alreadyAnswered[i] = true;
						this.helper.wave();
						/*this.helper.setClue(this.helperClue + '\nTap to close', this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
						this.helper.fitText();
						this.helper.helpBox.show();*/
						this.answerBubbles[i].show();
						this.answerBubbles[i].setBoundAction(CONTINUE);
						this.answerBubbles[i].y = this.game.height + this.answerBubbles[i].height + 50;
						this.sound.playWrongSound();
						//this.reset();
					} // end if
				} // end if
			} // end for
		}
		/*else
		{
			console.log("THE END");
			this.gameOver = true;
		}*/
		
	} // end checkAnswered
	
	this.checkCollisions = function() {
		bubble = this.bubbles.checkCollisions(this.launcher);
		if(bubble) {
			this.launcher.setSpeed(0);
			this.stickBubble(bubble);
			if(this.launcher.countColor() >= this.minNumBubbleToPop) {
				this.launcher.pop();
				this.sound.playPopSound();
			} // end if
			this.newLauncher();
			if(this.bubbles.checkCollisions(this.launcher)){
				this.helper.setClue(this.helperClue + '\nTap to close', this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
				this.helper.helpBox.show();
				this.helper.fitText();
				//this.sound.playWrongSound();
				this.reset();
			}
		} // end if
	} // end checkCollisions
	
	this.stickBubble = function(bubble) {
		index = this.bubbles.indexOf(bubble);
		angle = this.launcher.angleTo(bubble);
		if(angle >= 0 && angle < 60) {
			this.bubbles.addBubbleAt(this.launcher, this.bubbles.getRPar(index));
		} else if(angle >= 60 && angle < 120) {
			this.bubbles.addBubbleAt(this.launcher, this.bubbles.getRPer(index));
		} else if(angle >= 120 && angle < 180) {
			this.bubbles.addBubbleAt(this.launcher, this.bubbles.getRChi(index));
		} else if(angle >= 180 && angle < 240) {
			this.bubbles.addBubbleAt(this.launcher, this.bubbles.getLChi(index));
		} else if((angle >= 240 && angle < 270) || (angle >= -90 && angle < -60)) {
			this.bubbles.addBubbleAt(this.launcher, this.bubbles.getLPer(index));
		} else if(angle >= -60 && angle < 0) {
			this.bubbles.addBubbleAt(this.launcher, this.bubbles.getLPar(index));
		} // end if
		this.positionBubble(this.launcher);
	} // end stickBubble
	
	this.reset = function() {
		this.bubbles.bubbles.splice(100, this.bubbles.length - 100);
		this.bubbles.length = this.bubbles.bubbles.length;
		this.unPopAll();
		this.positionAllBubbles();
		this.randomizeColors();
		this.newLauncher();
		for (var i = 0; i < spriteList.length(); i++) {
			spriteList.list[i].setSpeed(0);
			spriteList.list[i].hide();
		}
		for(var i = 0; i < this.answerBubbles.length; i ++) {
			this.answerBubbles[i].setBoundAction(DIE);
		}
		for (var i = 0; i < this.bubbles.length; i++) {
			this.bubbles.getBubble(i).show();
		}
		this.bg.show();
		this.launcher.show();
		this.launcherZ.show();
		this.helper.show();
		this.questionHolder.show();
		//this.makeTutorialBoxes();

	} // end reset
	
	this.nextQuestion = function(){
		if (m <= 12) {
			//m = m + 1;
			
			/*if (m >= 13){
				m = 0;
			}*/
			
			q = q + 1;
			
			/*if (q >= 13){
				q = 0;
			}*/
			this.question.questionLine1 = questions[q].questionLine1;
			this.question.correct = questions[q].correct;
			this.question.answers = questions[q].answers;
			this.helperClue = questions[q].hint;
			this.helper.setClue(this.helperClue + "\nTap to close", this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
			this.setQuestion();
		}
		else {
			m = menuScreen.length - 1;
			this.menu.setClue(menuScreen[m] + '\nTap to close.', this.clueX, this.clueY, this.helperFont, this.helperFontSize, this.helperFontColor, this.helperLineWidth);
			this.menu.fitText();
			this.menu.show();
		}
	}
	
	this.stop = function() {
		this.game.stop();
	} // end stop
	
} // end level

BLUE = 0; RED = 1; GREEN = 2; YELLOW = 3; CYAN = 4; ORANGE = 5; PURPLE = 6; BLACK = 7; WHITE = 8;

NORMAL = 0; QUESTION = 1;
