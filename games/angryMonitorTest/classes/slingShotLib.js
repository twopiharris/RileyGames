function Level() {	
	
	/*********************/
	/******VARIABLES******/
	/*********************/
	this.correctSoundFile = "sounds/yaycrowdeditedshorter.mp3";
	this.wrongSoundFile = "sounds/wrong.mp3";
	this.fanSoundFile = "sounds/fanhum.mp3";
	this.stretchSoundFile = "sounds/slingstretch.mp3";
	this.launchSoundFile = "sounds/monitorwhoosh.mp3";
	this.hitBlockSoundFile = "sounds/blockCollision.mp3";
	this.breakBlockSoundFile = "sounds/blockBreak.mp3";
	
	this.gameWidth = 948;
	this.gameHeight = 711;
	this.gameOver = false;
	
	this.bgImage = 'bg/BG0001.png';
	this.bgWidth = 950;
	this.bgHeight = 711;
	this.bgX = 475;
	this.bgY = 355;
	
	this.scenarioImage = 'scenarios/Tutorial.png';
	this.scenarioWidth = 300;
	this.scenarioHeight = 106;
	this.scenarioX = 150;
	this.scenarioY = 53;
	
	this.correctImage = 'banners/Banner0001.png';
	this.incorrectImage = 'banners/Banner0002.png';
	this.bannerWidth = 300;
	this.bannerHeight = 100;
	this.bannerX = 495;
	this.bannerY = 150;
	
	this.slingX = 75;
	this.slingY = 550;
	this.slingBaseImage = 'slings/wholeslingshot.png';
	this.slingBaseWidth = 70;
	this.slingBaseHeight = 102;
	this.slingHolderImage = 'slings/center.png';
	this.slingHolderWidth = 16;
	this.slingHolderHeight = 16;
	this.slingLineColor = '#000000';
	this.slingLineWidth = 5;
	this.maxDrag = 50;
	this.launchSpeed = 35;
	
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
	
	this.goalCount = 1;
	this.goalsX = [660, 600, 600];
	this.goalsY = [100, 184, 304];
	this.goalFont = 'Arial';
	this.goalFontSize = 15;
	this.goalFontColor = '#FFFFFF';
	this.goalsColor = ['#001D74'];
	this.goalsAlpha = [0.7];
	this.goalsStyle = [NONE, NONE, NONE];
	this.goalsBorderColor = ['#000000', '#000000', '#000000'];
	this.goalsBorderSize = [1, 1, 1];
	this.goalsBorderAlpha = [1.0, 1.0, 1.0];
	this.goalsXMarginSize = [64, 64, 64];
	this.goalsYMarginSize = [5, 5, 5]
	this.goalsImage = ['icons64/HappyCatIcon.png'];
	this.goalsWidth = [125];
	this.goalsHeight = [75];
	
	this.numBlocks = 0;
	this.blocksImage = [];
	this.blocksWidth = [];
	this.blocksHeight = [];
	this.blocksX = [];
	this.blocksY = [];
	
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
	this.questionDetails = 'In class after lunch.';
	this.correct = 0;
	this.bs = 55;
	this.time = '12:00';
	this.answers = ['Aim\nhere!'];

	this.explanation = 'At the end of the level, an explanation of why an\nanswer is right will show up. When you are done\nreading it, tap the box to go on.';
	this.postBoxWidth = 470
	this.postBoxHeight = 200;
	this.postBoxColor = '#001D74';
	this.postBoxAlpha = 0.7;
	this.postBoxFontColor = '#FFFFFF';
	this.postBoxFont = 'Arial';
	this.postBoxFontSize = 20;
	this.postBoxImage = 'cats/HappyCat2.png';
	this.postBoxStyle = 4;
	this.postBoxMarginTop = 128;
	
	this.tutorialSceneCount = 6;
	this.tutorialText = ['Welcome to "What do these\nnumbers mean?" The goal is to\nfigure out what to do with\ndifferent blood sugar readings.\nTap the text boxes to continue.',
								 'This label will tell\nyou where you are\nand what time it is.',
								 'Here is your monitor. It will\ntell you what your blood sugar\nis at. To complete a level, you\nneed to sling your monitor at\nthe correct answer box.',
								 'This is an answer box.\nYou will need to read\ncarefully to get the\nright answer.',
								 "If you don't know an\nanswer, tap Nurse Cat\nto get some help. Try\nit now!",
								 'Drag the monitor\naround to aim it.\nThen lift your finger\nand let it fly!'];
	this.tutorialTarget = ['', 'question', 'monitor', 'goal', 'helper', 'monitor'];
	this.tutorialBoxImage = [null, 'arrows/arrow1.png', 'arrows/arrow2.png', 'arrows/arrow3.png', 'arrows/arrow3.png', 'arrows/arrow4.png'];
	this.tutorialBoxColor = ['#001D74', '#001D74', '#001D74', '#001D74', '#001D74', '#001D74'];
	this.tutorialBoxAlpha = [0.7, 0, 0, 0, 0, 0];
	this.tutorialBoxFont = ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'];
	this.tutorialBoxFontSize = [20, 20, 20, 20, 20, 20];
	this.tutorialBoxFontColor = ['#FFFFFF', '#000000', '#000000', '#000000', '#000000', '#000000'];
	this.tutorialBoxWidth = [300, 225, 350, 250, 250, 225];
	this.tutorialBoxHeight = [130, 80, 150, 110, 110, 120];
	this.tutorialBoxX = [474, 415, 300, 450, 640, 225];
	this.tutorialBoxY = [350, 60, 510, 115, 630, 480];
	this.tutorialBoxBorderSize = [2, 2, 2, 2, 2, 2];
	this.tutorialBoxBorderColor = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
	this.tutorialBoxBorderAlpha = [1, 0, 0, 0, 0, 0];
	this.tutorialBoxMarginTop = [5, 5, 15, 10, 10, 10];
	this.tutorialBoxMarginBottom = [5, 5, 5, 5, 5, 5];
	this.tutorialBoxMarginRight = [5, 5, 5, 45, 45, 5];
	this.tutorialBoxMarginLeft = [5, 40, 65, 5, 5, 45];
	
	this.topQuestionLayout = false;
	
	this.game;
	this.bg;
	this.scenario;
	this.banner;
	this.bannerCounter;
	this.ball;
	this.sling;
	this.helper;
	this.helperClue;
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
	
	this.helperX = 845;
	this.helperY = 611;
	this.helperWidth = 200;
	this.helperHeight = 200;
	this.helperClue = "Hey kids! I'll give you great\nhints if you need them. When\nyou're done reading my hints,\ntap my speech bubble.";
	this.clueX = 630;
	this.clueY = 600;
	
	
	/******************************/
	/******INITIALIZE OBJECTS******/
	/******************************/	
	this.init = function() {
		this.game = new Scene();
		
		this.game.setSize(this.gameWidth, this.gameHeight);
		
		this.makeQuestionBox();
		this.makeHelper();
		this.makeGoals();
		this.makeBlocks();
		this.makeFans();
		this.makePostBox();
		
		this.banner = new BG(this.game, this.correctImage, this.bannerWidth, this.bannerHeight, this.bannerX, this.bannerY, 3);
		this.banner.visible = false;
		this.bannerCounter = 0;
		this.ball = new Ball(this.game, this.slingX, this.slingY, this.ballImage, this.ballWidth, this.ballHeight);
		this.ball.offImg = this.ballBlankImage;
		this.sling = new Sling(this.game, this.slingX, this.slingY, this.slingBaseImage, this.slingBaseWidth, this.slingBaseHeight, this.slingHolderImage, this.slingHolderWidth, this.slingHolderHeight, this.ball, this.maxDrag, this.launchSpeed);
		this.sling.changeLineInfo(this.slingLineColor, this.slingLineWidth);
		this.ball.setPosition(this.sling.x, this.sling.y);
		this.question = new SlingQuestion(this.bs, this.time, this.questionDetails, this.correct, this.answers);
		this.scenario = new BG(this.game, this.scenarioImage, this.scenarioWidth, this.scenarioHeight, this.scenarioX, this.scenarioY, 1);
		this.scenario.curType = 1;
		this.bg = new BG(this.game, this.bgImage, this.bgWidth, this.bgHeight, this.bgX, this.bgY, -1);
		this.soundWaitCounter = 0;
		this.soundWaitTarget = 20;
		this.joy = new Joy();
		this.questionBox.hide();
		
		this.correctSound = new Sound(this.correctSoundFile);
		this.wrongSound = new Sound(this.wrongSoundFile);
		this.fanSound = new Sound(this.fanSoundFile);
		this.stretchSound = new Sound(this.stretchSoundFile);
		this.launchSound = new Sound(this.launchSoundFile);
		this.hitBlockSound = new Sound(this.hitBlockSoundFile);
		this.breakBlockSound = new Sound(this.breakBlockSoundFile);
		
		this.makeTutorialBoxes();
		spriteList.sortZ();
		
		this.game.start();
	}

	/************************/
	/******UPDATE GAMES******/
	/************************/	
	this.update = function() {
		this.game.clear()
		spriteList.update();
		this.ball.checkCollision();
		this.ball.addForces();
		this.banner.bannerTick();
		this.sling.checkMouseAction();
		this.ball.checkDone();
		this.scenario.update();
	}
	
	/*********************************/
	/******CREATE/REMAKE OBJECTS******/
	/*********************************/
	this.makeQuestionBox = function() {
		this.questionBox = new slingTextBox(this.game, null, this.gameWidth, 50, this.game.width/2, this.game.height/2, this.questionDetails);
		this.questionBox.setFont(this.questionFont, this.questionFontSize, this.questionFontColor);
		this.questionBox.setBorder(this.questionBoxBorderSize, this.questionBoxBorderColor, this.questionBoxBorderAlpha);
		this.questionBox.setBackground(this.questionBoxColor, this.questionBoxAlpha);
		this.questionBox.setImage(this.questionBoxImage, this.questionBoxStyle);
		this.questionBox.fitText();
	}
	
	this.makeTutorialBoxes = function () {
		this.tutorialBoxes = new Array();
		for(var i = 0; i < this.tutorialSceneCount; i ++) {
			this.tutorialBoxes[i] = new tutorialBox(this.game, this.tutorialBoxImage[i], this.tutorialBoxWidth[i], this.tutorialBoxHeight[i], this.tutorialBoxX[i], this.tutorialBoxY[i], this.tutorialText[i], i, 5);
			this.tutorialBoxes[i].setFont(this.tutorialBoxFont[i], this.tutorialBoxFontSize[i], this.tutorialBoxFontColor[i]);
			this.tutorialBoxes[i].setAlign("left");
			if(i > 0) {
				this.tutorialBoxes[i].hide();
			}
		}

		if(levelCounter == 0){
			this.tutorialBoxes[0].setBackground(this.tutorialBoxColor[0], this.tutorialBoxAlpha[0]);
			this.tutorialBoxes[0].fitText();
			this.tutorialBoxes[0].setAlign("center");
			this.tutorialBoxes[1].marginLeft = 45;
			this.tutorialBoxes[2].marginLeft = 65;
			this.tutorialBoxes[2].marginTop = 15;
			this.tutorialBoxes[3].marginLeft = 5;
			this.tutorialBoxes[4].marginLeft = 5;
			this.tutorialBoxes[5].marginLeft = 45;
			this.tutorialBoxes[2].marginTop = 15;
			this.tutorialBoxes[0].object = this.helper;
			this.tutorialBoxes[1].object = this.scenario;
			this.tutorialBoxes[2].object = this.ball;
			this.tutorialBoxes[3].object = this.goals[0];
			this.tutorialBoxes[4].object = this.helper;
			this.tutorialBoxes[5].object = this.ball;
			for(var i=0;i<spriteList.length(); i++){
				spriteList.list[i].setAlpha(.6);
				spriteList.list[i].clickable = false;
			}
			this.tutorialBoxes[0].setAlpha(1);
			this.tutorialBoxes[0].clickable = true;
		}
		if(levelCounter == 5){
			this.ball.canMove = false;
			this.tutorialBoxes[0].marginLeft = 50;	
			this.tutorialBoxes[0].marginTop = 5;
			this.tutorialBoxes[0].object = this.blocks[0];
			for(var i=0;i<spriteList.length(); i++){
				spriteList.list[i].setAlpha(.6);
				spriteList.list[i].clickable = false;
			}
			this.tutorialBoxes[0].setAlpha(1);
			this.tutorialBoxes[0].object.setAlpha(1);
			this.tutorialBoxes[0].clickable = true;
			this.questionBox.hide();
		}
		if(levelCounter == 11){
			this.ball.canMove = false;
			this.tutorialBoxes[0].marginLeft = 50;	
			this.tutorialBoxes[0].marginTop = 5;
			this.tutorialBoxes[0].object = this.fans[0];
			for(var i=0;i<spriteList.length(); i++){
				spriteList.list[i].setAlpha(.6);
				spriteList.list[i].clickable = false;
			}
			this.tutorialBoxes[0].setAlpha(1);
			this.tutorialBoxes[0].object.setAlpha(1);
			this.tutorialBoxes[0].clickable = true;
			this.questionBox.hide();
		}
	}
	
	this.makeHelper = function() {
		this.helper = new Helper(scene, "cats/Cat.png", this.helperWidth, this.helperHeight);
		this.helper.setPosition(this.helperX, this.helperY);
		this.helper.helpBox.setPosition(this.clueX, this.clueY);
		this.helper.helpBox.text = this.helperClue;
		this.helper.helpBox.z = 30;
	}
	
	this.makeGoals = function() {
		this.goals = new Array();
		for (var i = 0; i < this.goalCount; i ++) {
			this.goals[i] = new Goal(this.game, this.goalsX[i], this.goalsY[i], this.goalsImage[i], this.goalsWidth[i], this.goalsHeight[i], i, this.answers[i]);
			this.goals[i].setFont(this.goalFont, this.goalFontSize, this.goalFontColor);
			this.goals[i].setBorder(this.goalsBorderSize[i], this.goalsBorderColor[i], this.goalsBorderAlpha[i]);
			this.goals[i].setBackground(this.goalsColor[i], this.goalsAlpha[i]);
		}
	}
	
	this.makeBlocks = function() {
		this.blocks = new Array();	
		for(var i = 0; i < this.numBlocks; i ++) {
			this.blocks[i] = new Block(this.game, this.blocksX[i], this.blocksY[i], this.blocksImage[i], this.blocksWidth[i], this.blocksHeight[i]);
		}
	}
	
	this.makeFans = function() {
		this.fans = new Array();
		for(var i = 0; i < this.numFans; i ++) {
			this.fans[i] = new Fan(this.game, this.fansX[i], this.fansY[i], "Fan/fan1.png", this.fansWidth[i], this.fansHeight[i]);
			this.fans[i].setAOEBox(this.fansEffectXOffset[i], this.fansEffectYOffset[i], this.fansEffectWidth[i], this.fansEffectHeight[i]);
			this.fans[i].setBlowDirection(this.fansDirection[i]);
			this.fans[i].setBlowStrength(this.fansStrength[i]);
			this.fans[i].setMaxDistance(this.fansEffectMaxDistance[i]);
			this.fans[i].setBlowPeriod(this.fansEffectFramePeriod[i]);
			this.fans[i].setImgAngle(this.fansAngle[i]);
		}
	}
	
	this.makePostBox = function() {
		this.postBox = new postTextBox(this.game, null, this.postBoxWidth, this.postBoxHeight, this.gameWidth / 2, this.gameHeight / 2, this.explanation, this.postBoxImage, 300, 120, 4);
		this.postBox.setFont(this.postBoxFont, this.postBoxFontSize, this.postBoxFontColor);
		this.postBox.marginTop = this.postBoxMarginTop;
		this.postBox.setBackground(this.postBoxColor, this.postBoxAlpha);
		this.postBox.hideAll();
		this.gotCorrect = false;
	}
	
	
	/***********************/
	/******RESET LEVEL******/
	/***********************/
	this.resetGame = function() {
		this.makeQuestionBox();
		this.makeGoals();
		this.makeBlocks();
		this.makeFans();
		this.makePostBox();
		this.helper.setText(this.helperClue);
		this.banner.setImage(this.correctImage);
		this.sling.stick.setPosition(this.slingX, this.slingY);
		this.sling.setPosition(this.sling.stick.x, this.sling.stick.y - this.sling.stick.height / 2);
		this.sling.origX = this.sling.x;
		this.sling.origY = this.sling.y;
		this.ball.setPosition(this.sling.x, this.sling.y);
		this.ball.onImg = this.ballImage;
		this.ball.setImage(this.ballImage);
		this.question = new SlingQuestion(this.bs, this.time, this.questionDetails, this.correct, this.answers);
		this.bg.setImage(this.bgImage);	
		this.scenario.setImage(this.scenarioImage);
		this.makeTutorialBoxes();
		spriteList.sortZ();
		this.ball.canMove = false;
	}
	
	this.defaults = function() {
		this.gameOver = false;
		for(var i=0;i<this.goalCount;i++){
			this.goals[i].hideAll();	
		}
		for(var i=0;i<this.numBlocks;i++){
			this.blocks[i].hide();	
		}
		for(var i=0;i<this.numFans;i++){
			this.fans[i].hide();
			this.fans[i].sound.stopSound();
		}
		
		this.goalCount = 3;
		this.slingX = 75;
		this.slingY = 550;
		this.slingBaseImage = 'slings/wholeslingshot.png';
		this.slingBaseWidth = 70;
		this.slingBaseHeight = 102;
		this.slingHolderImage = 'slings/center.png';
		this.slingHolderWidth = 16;
		this.slingHolderHeight = 16;
		this.slingLineColor = '#000000';
		this.slingLineWidth = 5;
		this.maxDrag = 50;
		this.launchSpeed = 35;
		
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
	
		this.numFans = 0;
		
		this.correct = 0;
		
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
	} 
	
	this.stop = function() {
		this.game.stop();
	}

	return this;
}
// Directional collision constants.
LEFT = 0; RIGHT = 1; TOP = 2; BOTTOM = 3; LEFTTOP = 4; RIGHTTOP = 5; LEFTBOTTOM = 6; RIGHTBOTTOM = 7;