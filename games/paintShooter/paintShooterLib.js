resDir = "./res/"

function Target(image, width, height, z, text, fontSize, state) {
	//Target text boxes that will be 'painted' by the player
	var tTarget = new TextBox(game, image, width, height, z);
	tTarget.fontSize = fontSize;
	tTarget.state = state;
	tTarget.dA = 0;
	tTarget.correct = false;
	tTarget.writeText(text, "center");
	tTarget.clicked = function() {
		this.setImage(level.swatchSelected.splatSrc, NONE);
		//this.setImgAngle(random(0, 359)); //not working
		
		if (this.state == level.swatchSelected.state) {
			this.correct = true;
			this.setMoveAngle(this.angleTo(level.swatchSelected) + 180);
			this.setSpeed(level.targetMaxSpeed);
			this.setAlpha(1);
			this.dA = 0;
			this.clickable = false;
		}
		//console.log(this.dA, this.alpha);
	}
	tTarget.setMoveAngle(random(0,359));
	tTarget.setBoundAction(WRAP);
	return tTarget;
} //end Target definition

function Swatch(image, width, height, x, y, z, borderImage, borderWeight, state, splat) {
	//Swatches used to switch between colors
	var tSwatch = new Sprite(game, image, width, height, z);
	tSwatch.setPosition(x,y);
	tSwatch.state = state;
	tSwatch.imageSrc = image;
	tSwatch.splatSrc = splat;
	tSwatch.borderWeight = borderWeight;
	tSwatch.border = new Sprite(game, borderImage, width + borderWeight, height + borderWeight, z - 1); //new Array(4) new Sprite(game, borderImage, width + borderWeight, height + borderWeight, z - 1)
	tSwatch.border.setPosition(x, y);
	
	/*
	for (var i = 0; i < tSwatch.border.length; i++) {
		tSwatch.border[i] = new Sprite(game, borderImage, borderWeight, tSwatch.height + borderWeight * 2, z + 1);
	} //end for
	
	//create black border around color swatches
	//each side of the box is centered on the edge of the swatch
	tSwatch.border[1].setAngle(90);
	tSwatch.border[3].setAngle(90);
	tSwatch.border[0].setPosition(x - (tSwatch.width + borderWeight) * .5,y);
	tSwatch.border[1].setPosition(x,y - (tSwatch.height + borderWeight) * .5);
	tSwatch.border[2].setPosition(x + (tSwatch.width + borderWeight) * .5,y);
	tSwatch.border[3].setPosition(x,y + (tSwatch.height + borderWeight) * .5);
	tSwatch.border.show = function() {
		for (var i = 0; i < this.length; i++) {
			this[i].show();
		} //end for
	} //end border.show
	tSwatch.border.hide = function() {
		for (var i = 0; i < this.length; i++) {
			this[i].hide();
		} //end for
	} //end border.hide
	*/
	
	tSwatch.clicked = function() {
		for (var i = 0; i < level.swatches.length; i++) {
			level.swatches[i].border.hide();
		} //end for
		this.border.show();
		level.swatchSelected = this;
	} //end clicked
	return tSwatch;
} //end Swatch definition

function AnswerBox(image, width, height, z) {
	var tanswerBox = new TextBox(game, image, width, height, z);
	tanswerBox.correct = false;
	tanswerBox.clicked = function() {
		if (tanswerBox.correct) {
			level.explainText.show();
		} //if
		else {
			level.helper.wave();
		} //else
	} //clicked
	
	return tanswerBox;
} //end AnswerBox definition

function Level() {
	//level variables
	this.bg; //the level's background
	this.complete;
	this.inGame;
	this.backgrounds = [resDir + "bedroom.png", resDir + "kitchen.png", resDir + "kitchen.png"]
	//splashData = [[imagePath, extension, numImages],[...]]
	this.splashData = [[resDir + "bedroomCutscene", ".png", 8], [resDir + "bedroomCutscene", ".png", 8], [resDir + "bedroomCutscene", ".png", 8]];
	this.splashImages = new Array();
	this.splashIndex = 0; //index of splashscreen image
	this.splashDataIndex = 0; //index of splashscreen data
	this.splashNum = 0; //index of splashscreen data number
	this.splashNumLength = 4; //number of digits in the image index (scene0001.png = 4 digits)
	this.splashScreen;
	this.splashText;
	this.splats = Array();
	this.maxSplats = 150;
	this.splatMinSize = 20;
	this.splatMaxSize = 35;
	this.level = 0;  //level starts at 0
	this.level2 = 4; //level when targets start crossing the sides of the screen
	this.level3 = 7; //level when numbers start changing alpha
	
	//swatch variables
	this.swatches = new Array(3);
	this.swatchState = [LOW, NORMAL, HIGH];
	this.swatchSelected;
	this.swatchSize = 90;
	this.swatchPadding = 100;
	this.swatchBorderWeight = 10; //7 6
	this.swatchX = [gameWidth * .5 - this.swatchSize - this.swatchPadding, gameWidth * .5, gameWidth * .5 + this.swatchSize + this.swatchPadding];
	this.swatchY = gameHeight - this.swatchSize * .5 - this.swatchBorderWeight * 1.5;
	this.swatchZ = 4;
	this.swatchColor = ["#FF0000", "#00FF00", "#FFff00"];
	this.swatchImage = [resDir + "Paintball0003.png",resDir + "Paintball0004.png",resDir + "Paintball0002.png"];
	this.swatchSplat = [resDir + "Paintball0010.png",resDir + "Paintball0011.png",resDir + "Paintball0009.png"];
	this.swatchBorderImage = resDir + "PaintBallOutline.png"; //"black.png" "PaintballBorder.png"
	
	//target variables
	this.targets = new Array();
	this.targetImage = resDir + "targetHolder.png";
	this.targetWidth = 80;
	this.targetHeight = 80;
	this.targetZ = 3;
	this.targetFontSize = 30;
	this.targetMinX = this.targetWidth * .5;
	this.targetMaxX = gameWidth - this.targetWidth * .5;
	this.targetMinY = this.targetHeight * .5;
	this.targetMaxY = this.swatchY - (this.swatchSize + this.swatchBorderWeight + this.targetHeight) * .5;
	this.targetMinSpeed = 5;
	this.targetMaxSpeed = 10;
	this.targetMin = 35; //low target minimum
	this.targetLow = 70; //low target maximum / normal target minimum
	this.targetHigh = 150; //high target minimum / normal target maximum
	this.targetMax = 500; //high target maximum
	this.targetTolerance = 5; //ammount to offest targets by to avoid confusing normal with low or high
	this.targetMinDA = 0.007;
	this.targetMaxDA = 0.015;
	
	//helper variables
	this.helperWidth = 170;
	this.helperHeight = this.helperWidth;
	this.helperX = gameWidth - .5 * this.helperWidth;
	this.helperY = gameHeight - .5 * this.helperHeight;
	this.helper = new Helper(game, "../Helper/AnimatedCat/CatTalk1.png", this.helperWidth, this.helperHeight, 5);
	this.helperGameText = "Highlight the numbers according to their level\n" +
						  "by selecting a color at the bottom of the screen\n\n" +
						  "Red: Low (Less Than " + this.targetLow +
	                      ")\nGreen: Normal (Between " + this.targetLow + " and " + this.targetHigh +
						  ")\nYellow: High (Greater Than " + this.targetHigh + ")";
	
	//question variables
	this.questionBox;
	this.questionImg = resDir + "white.png";
	this.questionWidth = .5 * gameWidth;
	this.questionHeight = 50;
	this.questionX = .5 * gameWidth;
	this.questionY = .5 * this.questionHeight + 15;
	this.questionZ = 4;
	this.questionFontSize = 25;
	
	//chart display variables
	this.chartDays = scenarios[0][0].length;
	this.chartChecksPerDay = scenarios[0].length;
	this.chartPaddingH = 25; //horizontal space from cell value to the center of the border
	this.chartPaddingV = 3; //vertical space from cell value to the center of the border
	this.chartCellWidth = this.targetWidth + this.chartPaddingH * 2;
	this.chartCellHeight = this.targetHeight + this.chartPaddingV * 2;
	this.chartWidth = this.chartChecksPerDay * this.chartCellWidth;
	this.chartHeight = this.chartDays * this.chartCellHeight;
	this.chartX = .5 * gameWidth;
	this.chartY = .5 * gameHeight;
	this.chartBorders = new Array();
	this.chartBorderWeight = 4;
	this.chartBorderImg = resDir + "white.png";
	this.chartStartX = this.chartX - .5 * this.chartWidth;
	this.chartStartY = this.chartY - .5 * this.chartHeight;
	this.chartCellWidth = this.chartPaddingH * 2 + this.targetWidth;
	this.chartCellHeight = this.chartPaddingV * 2 + this.targetHeight;
	this.chartZ = 1;
	this.chartDisplaying = false;
	this.chartColText = ["Breakfast", "Lunch", "Dinner", "Snack"];
	this.chartRowText = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
	this.chartLabelPadding = 10;
	this.chartCols = new Array(); //chart column labels
	this.chartRows = new Array(); //chart row labels
	this.chartLableBG = resDir + "white.png";
	this.explainText;
	
	//answer variables
	this.answerBox = new Array();
	this.answerImg = resDir + "white.png";
	this.answerPadding = 20;
	this.answerWidth = (gameWidth - this.answerPadding * 3 - this.helperWidth) / 3;
	this.answerHeight = 50;
	this.answerWandP = this.answerWidth + this.answerPadding;
	this.answerX = [.5 * this.answerWandP, this.answerWandP * 1.5, this.answerWandP * 2.5];
	this.answerY = gameHeight - .5 * (gameHeight - (this.chartY + .5 * this.chartHeight));
	this.answerZ = 4;
	
	this.init = function() {
		this.splashScreen = new Sprite(game, resDir + "bedroomCutscene0001.png", gameWidth, gameHeight, 7);
		this.bg = new Sprite(game, this.backgrounds[0], gameWidth, gameHeight, -3);
		this.bg.setPosition(.5 * gameWidth, .5 * gameHeight);
		this.splashText = new TextBox(game, null, 5, 5, 8);
		this.splashText.borderSize = 3;
		this.splashText.writeText("Tap to continue");
		this.splashText.fitText();
		this.splashText.setPosition(gameWidth - this.splashText.width * .5 - 10, gameHeight - this.splashText.height * .5 - 10);
		this.splashIndex = 0;
		this.splashNum = 0;
		var index = 0;
		for (var i = 0; i < this.splashData.length; i++) {
			var data = this.splashData[i];
			for (var n = 0; n < data[2]; n++) {
				var num = (n + 1).toString();
				while (num.length < this.splashNumLength) {
					num = '0' + num;
				} //while
				var img = new Image();
				img.src = data[0] + num + data[1];
				this.splashImages[index++] = img;
			} //for
		} //for
		
		this.bg.clicked = function() {
			if (level.splats.length >= level.maxSplats) {
				level.splats[0].hide();
				level.splats.shift();
			} //end if
			
			level.splats.push(new Sprite(game, level.swatchSelected.splatSrc, random(level.splatMinSize, level.splatMaxSize), random(level.splatMinSize, level.splatMaxSize), level.bg.z + 1));
			level.splats[level.splats.length - 1].setPosition(game.mouseX, game.mouseY);
			level.splats[level.splats.length - 1].setAngle(random(0, 359));
			level.splats[level.splats.length - 1].show();
		} //end bg.clicked
		
		this.splashScreen.x = gameWidth * .5;
		this.splashScreen.y = gameHeight * .5;
		this.splashScreen.clicked = function() {
			var data = level.splashData[level.splashDataIndex];
			if (level.splashNum >= data[2]) {
				//data = level.splashData[level.splashIndex];
				level.splashNum = 0;
				level.splashDataIndex++;
				level.splashScreen.hide();
				level.splashText.hide();
				
			} //if
			//increment at the begining since the images are indexed from 1 and splashNum starts at 0
			/*var num = level.splashNum.toString();
			while (num.length < 4) {
				num = '0' + num;
			} //while*/
			//path + formattedIndex + extension
			level.splashScreen.image = level.splashImages[level.splashIndex];
			level.splashIndex++;
			level.splashNum++;
		} //end splashScreen.clicked
		//trigger clicked to initialize splashScreen image
		this.splashScreen.clicked();
		
		this.helper.setPosition(this.helperX, this.helperY);
		this.helper.helpBox.writeText(this.helperGameText, "center");
		
		//create swatches
		for (var i = 0; i < this.swatches.length; i++) {
			this.swatches[i] = new Swatch(this.swatchImage[i], this.swatchSize, this.swatchSize,
										  this.swatchX[i], this.swatchY, this.swatchZ, this.swatchBorderImage,
										  this.swatchBorderWeight, this.swatchState[i], this.swatchSplat[i]);
		} //end for
		
		//create the border for the chart
		for (i = 0; i <= this.chartChecksPerDay; i++) {
			this.chartBorders[i] = new Sprite(game, this.chartBorderImg, this.chartBorderWeight, this.chartHeight + this.chartBorderWeight, this.chartZ);
			this.chartBorders[i].setPosition(this.chartStartX + i * this.chartCellWidth, this.chartY);
			this.chartBorders[i].hide();
			if (i < this.chartChecksPerDay) {
				var colLabel = new TextBox(game, this.chartLableBG, this.chartCellWidth, this.chartCellHeight, this.chartZ);
				colLabel.writeText(this.chartColText[i], "center");
				colLabel.fitText();
				colLabel.setPosition(this.chartStartX + (.5 + i) * this.chartCellWidth, this.chartStartY - (.5 * colLabel.height + this.chartLabelPadding));
				colLabel.hide();
				this.chartCols.push(colLabel);
			} //end if
		} //end for
		
		for (var n = 0; n <= this.chartDays; n++, i++) {
			this.chartBorders[i] = new Sprite(game, this.chartBorderImg, this.chartWidth + this.chartBorderWeight, this.chartBorderWeight, this.chartZ);
			this.chartBorders[i].setPosition(this.chartX, this.chartStartY + n * this.chartCellHeight);
			this.chartBorders[i].hide();
			if (n < this.chartDays) {
				var rowLabel = new TextBox(game, this.chartLableBG, this.chartCellWidth, this.chartCellHeight, this.chartZ);
				rowLabel.writeText(this.chartRowText[n], "center");
				rowLabel.fitText();
				rowLabel.setPosition(this.chartStartX - (.5 * rowLabel.width + this.chartLabelPadding), this.chartStartY + (.5 + n) * this.chartCellHeight);
				rowLabel.hide();
				this.chartRows.push(rowLabel);
			} //end if
		} //end for
		
		//create question and answer text boxes
		this.questionBox = new TextBox(game, this.questionImg, this.questionWidth, this.questionHeight, this.questionZ);
		this.questionBox.fontSize = this.questionFontSize;
		this.questionBox.writeText("Choose the answer that best describes the chart below.", "center");
		this.questionBox.setPosition(this.questionX, this.questionY);
		this.questionBox.fitText();
		
		for (i = 0; i < 3; i++) {
			this.answerBox[i] = new AnswerBox(this.answerImg, this.answerWidth, this.answerHeight, this.answerZ);
			this.answerBox[i].setPosition(this.answerX[i], this.answerY);
		} //end for
		
		this.explainText = new TextBox(game, null, 5, 5, 5);
		this.explainText.setPosition(gameWidth * .5, gameHeight * .5);
		this.explainText.borderWidth = 2;
		this.explainText.hide();
		this.explainText.clicked = function () {
			level.levelInit();
			level.explainText.hide();
		} //explainText.clicked
		
		this.helper.setText(this.helperGameText);
		this.helper.fitText();
		this.helper.showHelp();
		
		this.level = -1; //to start at 0 when levelInit is called
		this.levelInit();
	} //end init
	
	this.levelInit = function() {
		this.level++; //starts at 0
		if (this.level == scenarios.length) {
			game.stop();
			gameOver();
		} //if
		else {
			this.bg.clickable = true;
			
			this.helper.setText(this.helperGameText);
			
			if (this.level == this.level2) {
				this.bg.setImage(this.backgrounds[1]);
				this.splashScreen.show();
				this.splashText.show();
			} //end if
			else if (this.level == this.level3) {
				this.bg.setImage(this.backgrounds[2]);
				this.splashScreen.show();
			} //end else if
			else if (this.level == 0) {
			} //else if
			
			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].hide();
			} //end for
			
			this.targets = new Array();
			
			for (i = 0; i < this.chartBorders.length; i++) {
				this.chartBorders[i].hide();
			} //end for
			for (i = 0; i < this.chartCols.length; i++) {
				this.chartCols[i].hide();
			} //end for
			for (i = 0; i < this.chartRows.length; i++) {
				this.chartRows[i].hide();
			} //end for
			
			for (i = 0; i < scenarios[this.level].length; i++) {
				for (var n = 0; n < scenarios[this.level][i].length; n++) {
					this.createTarget(scenarios[this.level][i][n]);
				} //end for
			} //end for
			
			if (this.level >= this.level3) {
				for (i = 0 ; i < this.targets.length; i++) {
					this.targets[i].dA = fRand(this.targetMinDA, this.targetMaxDA);
					this.targets[i].setAlpha(Math.random());
				} //end for
			} //end if
			
			for (i = 0; i < 3; i++) {
				this.answerBox[i].hide();
				this.swatches[i].show();
			} //end for
			
			this.questionBox.hide();
			
			this.swatches[1].clicked();
			this.chartDisplaying = false;
		} //else
	} //end levelInit
	
	/*this.createTargets = function(low,norm,high) { //currently unused
		for (var i = 0; i < low; i++) {
			this.createTarget(LOW);
		} //end for
		for (var i = 0; i < norm; i++) {
			this.createTarget(NORMAL);
		} //end for
		for (var i = 0; i < high; i++) {
			this.createTarget(HIGH);
		} //end for
	} // end createTargets*/
	
	this.createTarget = function(value) {
		/* takes actual target value */
		var state = HIGH;
		if (value < this.targetLow) {
			state = LOW;
		} //if
		else if (value <= this.targetHigh) {
			state = NORMAL;
		} //else if
		
		/* takes LOW NORMAL HIGH enum values
		var targetValue;
		switch(value) {
			case LOW:
				targetValue = random(this.targetMin, this.targetLow - this.targetTolerance);
			break;
			case NORMAL:
				targetValue = random(this.targetLow + this.targetTolerance, this.targetHigh - this.targetTolerance);
			break;
			case HIGH:
				targetValue = random(this.targetHigh + this.targetTolerance, this.targetMax);
			break;
		} //end switch*/
		var target = new Target(this.targetImage, this.targetWidth, this.targetHeight, this.targetZ, value.toString(), this.targetFontSize, state);
		target.setPosition(random(this.targetMinX, this.targetMaxX), random(this.targetMinY, this.targetMaxY));
		target.setSpeed(random(this.targetMinSpeed, this.targetMaxSpeed));
		this.targets.push(target);
	} //end createTarget
	
	this.showChart = function() {
		this.chartDisplaying = true;
		for (var i = 0; i < this.chartBorders.length; i++) {
			this.chartBorders[i].show();
		} //end for
		for (i = 0; i < this.chartCols.length; i++) {
			this.chartCols[i].show();
		} //end for
		for (i = 0; i < this.chartRows.length; i++) {
			this.chartRows[i].show();
		} //end for
		this.helper.setText(hints[this.level]);
		this.helper;
		
		this.questionBox.writeText(questions[this.level]);
		this.questionBox.fitText();
		
		this.questionBox.show();
		
		this.swatches[1].clicked();
		this.swatches[1].border.hide();
		
		this.bg.clickable = false;
		for (i = 0; i < this.splats.length; i++) {
			this.splats[i].hide();
		} //end for
		
		for (i = 0; i < 3; i ++) {
			this.swatches[i].hide();
			this.answerBox[i].show();
			this.answerBox[i].writeText(answers[this.level][i], "center");
			this.answerBox[i].fitText();
			this.answerBox[i].correct = i == answers[this.level][3] ? true : false;
		} //end for
		
		this.explainText.writeText("Correct!\n" + explanations[this.level] + "\n\nTap to Continue");
		this.explainText.fitText();
		
		var x = this.chartStartX + .5 * this.chartCellWidth;
		var y = this.chartStartY + .5 * this.chartCellHeight;
		for (i = 0; i < this.targets.length; i++) {
			this.targets[i].show();
			this.targets[i].setPosition(x, y);
			if ((i + 1) % this.chartDays == 0) {
				x += this.chartCellWidth;
				y = this.chartStartY + .5 * this.chartCellHeight;
			} //end if
			else {
				y += this.chartCellHeight;
			} //end else
		} //end for
	} //end showChart
	
	this.update = function() {
		this.complete = true;
		for (var i = 0; i < this.targets.length; i++) {
			var tar = this.targets[i];
			if (tar.correct) {
				for (var n = 0; n < this.swatches.length; n++) {
					if (tar.collidesWith(this.swatches[n]) && tar.state == this.swatches[n].state) {
						tar.hide();
						tar.setSpeed(0);
					} //end if
				} //end for
			} //end if
			else if (tar.y > this.targetMaxY) {
				tar.dy *= -1;
			} //end else if
			else if (tar.y < this.targetMinY) {
				tar.dy *= -1;
			} //end else if
				
			if (this.level < this.level2 && !tar.correct) {
				if (tar.x > this.targetMaxX) {
					tar.dx *= -1;
				} //end if
				else if (tar.x < this.targetMinX) {
					tar.dx *= -1;
				} //end else if
			} //end if
			
			if (tar.visible) {
				this.complete = false;
			} //end if
			
			if (tar.alpha > 1 - tar.dA || tar.alpha < -tar.dA) {
				tar.dA *= -1;
			} //end if
			
			tar.setAlpha(tar.alpha + tar.dA);
		} //end for
		
		if (this.complete && !this.chartDisplaying) {
			console.log("Complete");
			this.showChart();
		} //end if
		spriteList.update();
	} //end update
} //end Level definition

function random(min, max) {
	return Math.round(fRand(min, max)); //return an integer between min and max
} //end random

function fRand(min, max) {
	return min + Math.random() * (max - min); //return a float between min and max
} //end fRand

//Target states
LOW = 0;
NORMAL = 1;
HIGH = 2;

//Scenarios
var scenarios = [ // the blood glucose level for B (Breakfast), L (Lunch), D (Dinner), and S (Snack)
  //[[B,B,B,B,B],[L,L,L,L,L],[D,D,D,D,D],[S,S,S,S,S]]
	//[[120,102,85,92,99],[95,76,84,145,104],[112,111,87,135,71],[76,105,130,81,85]], //all normal test
	//[[65,64,71,69,65],[120,92,87,89,140],[100,137,152,143,126],[68,111,84,77,123]],
	[[120,102,85,92,99],[95,76,84,145,104],[112,111,87,135,71],[76,105,130,81,85]],
	[[145,108,220,149,130],[100,135,311,62,109],[126,152,175,102,99],[133,200,190,140,119]],
	[[145,68,165,154,130],[100,135,111,62,109],[126,152,141,102,170],[133,200,139,140,119]],
	[[155,108,220,160,130],[100,135,111,62,109],[126,152,175,102,99],[133,142,190,140,119]],
	[[138,124,168,151,100],[152,101,99,144,60],[63,59,69,72,80],[189,147,102,137,110]],
	[[145,90,114,136,80],[45,62,54,65,75],[137,126,140,101,170],[152,134,144,164,111]],
	[[160,190,214,156,188],[145,162,154,125,101],[137,126,140,101,87],[52,34,47,64,55]],
	[[145,90,114,136,80],[45,62,54,65,75],[137,126,140,101,170],[152,134,144,164,111]],
	[[138,124,168,151,100],[152,101,99,144,60],[63,59,69,72,80],[189,147,102,137,110]],
	[[106,119,114,156,128],[145,162,154,125,101],[137,126,140,101,87],[52,34,47,64,55]]
];

var questions = [
	"Would you normally expect to see all blood sugars in the normal range?",
	"Is there a pattern that requires a dose change?",
	"Is there a pattern that requires a dose change?",
	"Is there a pattern that requires a dose change?",
	"You are more active during the summer.\nWhich time of the day has the most blood sugars outside of the target range?",
	"When school starts, you notice that you have more low blood sugars.\nWhat time of the day do you see a pattern of low blood sugars?",
	"What time of the day do you see a pattern?",
	"When school starts, you notice that you have more low blood sugars.\nWhat time of the day do you see a pattern of low blood sugars?",
	"You are more active during the summer and haveing lows at dinner. What should you do?",
	"When there is a pattern of low blood sugars at bedtime, which dose of\ninsulin should be adjusted to help the bedtime blood sugars be higher?"
]; //questions

var hints = [
	"Blood sugars are never perfect.",
	"Are there 3 or more blood sugars outside of the normal range at a certain time?",
	"Are there 3 or more blood sugars outside of the normal range at a certain time?",
	"Are there 3 or more blood sugars outside of the normal range at a certain time?",
	"Look for a time where 3 or more of the blood sugars are outside the normal range.",
	"Look for a time where 3 or more of the blood sugars are outside the normal range.",
	"Look for a time where 3 or more of the blood sugars are outside the normal range.",
	"Blood sugar outside the normal range is from insulin taken earilier in the day.",
	"Consider changing a dose from earlier in the day or eating a little someting with the activity.",
	"Blood sugar outside the normal range is from insulin taken earilier in the day."
]; //hints

var answers = [
  //["Text0", "Text1", "Text2", index of correct answer]
	["Yes", "No", "I don't know", 1],
	["Yes", "No", "I don't know", 1],
	["Yes", "No", "I don't know", 1],
	["Yes", "No", "I don't know", 0],
	["Breakfast", "Lunch", "Dinner", 2],
	["Breakfast", "Lunch", "Bedtime", 1],
	["Breakfast", "Bedtime", "Both Breakfast and Bedtime", 2],
	["Breakfast", "Lunch", "Dinner", 0],
	["Change dinner dose", "Have a snack with activity", "Possibly A or B", 2],
	["Breakfast", "Lunch", "Dinner", 2]
];

var explanations = [
	"With diabetes, you will always have some blood sugars\nabove and below your target range - this is normal.\nThe goal is to have over half of your numbers within range.",
	"There is not a pattern for a certain time of day.\nWe cannot chang what happens on a single day.",
	"While there are a few lows and highs,\nthere is no pattern so no adjustments are needed.",
	"Breakfast has been high 3 or more times so we need to make adjustment.",
	"Dinner has been low 3 or more times so we need to make adjustments.",
	"Lunch has been low 3 or more times so we need to make adjustments.",
	"Breakfast has been high and dinner has been low 3\nor more times so we need to make adjustments.",
	"Lunch has been low so we need to make adjustments before that.\nThis means we need make adjustments to breakfast doses.",
	"Low blood sugar at dinner could be caused by increased\nactivity during the day or needing to adjust lunch doses.\nIf it's from activity, it is helpful to eat a snack.\nOtherwise, lunch doses need to be adjusted.",
	"Bedtime has been low so we need to make adjustments before that.\nThis means we need to make adjustments to dinner doses."
]; //explanations