///////////CONSTANT IMAGES///////////
const CHARACTER = "images/redBall.png";
const GOAL = "images/goal.png";
const PLATE = "images/plate.png";
const SPLASH1 = "images/splash0001.png";
const SPLASH2 = "images/splash0002.png";
const SPLASH3 = "images/splash0003.png";
const INFOBACKGROUND = "images/infoBack.png";
const CATHELPER = "images/Cat.png";
const WHITE = "images/White.png";
const GREEN = "images/Green.png";
const FOODHOLDER = "images/HealthyPlate.png";
const BADFOODHOLDER = "images/plate.png";
const MISSBUBBLE1 = "images/BubblesWText0001.png";
const MISSBUBBLE2 = "images/BubblesWText0002.png";
const MISSBUBBLE3 = "images/BubblesWText0003.png";

///////////SPRITE VARIABLES///////////
const SCREEN_WIDTH = 948;
const SCREEN_HEIGHT = 711;
const SPLASH_WIDTH = 948;
const SPLASH_HEIGHT = 711;
const PLATE_WIDTH = 670;
const PLATE_HEIGHT = 670;
const INFOBOX_WIDTH = 235;
const INFOBOX_HEIGHT = 670;
const INFOBAR_WIDTH = SCREEN_WIDTH;
const INFOBAR_HEIGHT = 41;
const CHARACTER_WIDTH = 30;
const CHARACTER_HEIGHT = 30;
const FOOD_WIDTH = 50;
const FOOD_HEIGHT = 50;
const PORTION_WIDTH = 100;
const PORTION_HEIGHT = 33;
const CARB_WIDTH = 80;
const CARB_HEIGHT = 80;
const GOAL_WIDTH = 50;
const GOAL_HEIGHT = 50;
const MISS_WIDTH = 504;
const MISS_HEIGHT = 323;

///////////GAME VARIABLES///////////
const TOTAL_LEVELS = 3;
const MEASUREMENT_SPRITES = 9;
const CARB_SPRITES = 8;

var isRolling = false;

const LEVELS = new Array();
LEVELS[0] = [1, 6, 3, 5, 4];
LEVELS[1] = [2, 6, 3, 5, 4];
LEVELS[2] = [3, 6, 3, 5, 4];

function init() {
    game = new Game();
    game.createStaticSprites();
    game.createLevel(false);
	
    game.scene.start();
} // end init

function Game() {

    this.scene = new Scene();
    this.accel = new Accel();
    this.scene.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.totalLevels = TOTAL_LEVELS;
    this.curLevel = 0;
    this.badFood = new Array();
    this.goodFood = new Array();
    this.goodPortion = new Array();
    this.badPortion = new Array();
    this.goodCarb = new Array();
    this.badCarb = new Array();
    this.infoBoxFood = new Array();
    this.foods = new Food();
    this.foods.createFood();
	this.tutorialFinished = false;
	this.counter = 0;

    this.createStaticSprites = function () {
		
        var badCounter = 0;
        ///////SPRITES IN ALL PHASES///////
        this.plate = new Plate(this.scene, PLATE, PLATE_WIDTH, PLATE_HEIGHT, 590, this.scene.height - 335, 2);
        this.infoBox = new InfoBox(INFOBOX_WIDTH, INFOBOX_HEIGHT);
        this.infoBar = new InfoBar(INFOBAR_WIDTH, INFOBAR_HEIGHT, this.curLevel+1, this.totalLevels);
        this.character = new Character(this.scene, CHARACTER, CHARACTER_WIDTH, CHARACTER_HEIGHT, 600, 65, 5);
        ///////PHASE ONE SPRITES///////
        this.badFood[0] = new GamePiece(game.scene, this.foods.bad[2], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.badFood[1] = new GamePiece(game.scene, this.foods.bad[4], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.badFood[2] = new GamePiece(game.scene, this.foods.bad[7], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');

        this.goodFood[0] = new GamePiece(game.scene, this.foods.dairy[0], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.goodFood[1] = new GamePiece(game.scene, this.foods.dairy[1], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.goodFood[2] = new GamePiece(game.scene, this.foods.dairy[2], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.goodFood[3] = new GamePiece(game.scene, this.foods.protein[0], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.goodFood[4] = new GamePiece(game.scene, this.foods.protein[1], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
		this.goodFood[5] = new GamePiece(game.scene, this.foods.grain[1], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
        this.goodFood[6] = new GamePiece(game.scene, this.foods.grain[2], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
		this.goodFood[7] = new GamePiece(game.scene, this.foods.fruit[0], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
		this.goodFood[8] = new GamePiece(game.scene, this.foods.fruit[1], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
		this.goodFood[9] = new GamePiece(game.scene, this.foods.fruit[10], FOOD_WIDTH, FOOD_HEIGHT, 0, 0, 12, 'food');
		
        ///////PHASE TWO SPRITES///////
        for (var i = 0; i < MEASUREMENT_SPRITES; i++) {
            if (this.goodFood[0].pieceInfo.portion == this.foods.portion[i].item) {
                this.goodPortion[0] = new GamePiece(game.scene, this.foods.portion[i], PORTION_WIDTH, PORTION_HEIGHT, 0, 0, 3, 'portion');
                this.goodPortion[0].hide();
            } else {
                this.badPortion[badCounter] = new GamePiece(game.scene, this.foods.portion[i], PORTION_WIDTH, PORTION_HEIGHT, 0, 0, 3, 'portion');
                this.badPortion[badCounter].hide();
                badCounter++;
            }
        }
        badCounter = 0;

        ///////PHASE THREE SPRITES///////
        for (var i = 0; i < CARB_SPRITES; i++) {
            if (this.goodFood[0].pieceInfo.carbs == this.foods.carb[i].size) {
                this.goodCarb[0] = new GamePiece(game.scene, this.foods.carb[i], CARB_WIDTH, CARB_HEIGHT, 0, 0, 3, 'carb');
                this.goodCarb[0].hide();
            } else {
                this.badCarb[badCounter] = new GamePiece(game.scene, this.foods.carb[i], CARB_WIDTH, CARB_HEIGHT, 0, 0, 3, 'carb');
                this.badCarb[badCounter].hide();
                badCounter++;
            }
        }
		
		this.goal = new Goal(game.scene, GOAL, GOAL_WIDTH, GOAL_HEIGHT, 0, 0, 4);
        goal.hide();
		
		this.helper = new Helper(scene, CATHELPER, 200, 200);
		this.helper.z = 14;
		spriteList.sortZ();
		this.helper.setPosition(INFOBOX_WIDTH/2, scene.height - 107);
		this.helper.helpBox.setPosition(INFOBOX_WIDTH*1.5, scene.height - 150);
		this.helper.helpBox.text = "Create a balanced meal by\ncollecting all of the Healthy Food!";
		////////////////////miss pop up for plate level
		this.miss = new MissPopUp(game.scene, MISSBUBBLE1, MISS_WIDTH, MISS_HEIGHT, 588, 360, 25);
		miss.hide();

		////////////////////splash screen
		this.splash1 = new Splash(game.scene, SPLASH1, SPLASH_WIDTH, SPLASH_HEIGHT, 474, 355, 15);
		this.reviewSplash = new Splash(game.scene, WHITE, SPLASH_WIDTH, SPLASH_HEIGHT, 1000, 1000, 9);
		this.reviewSplash.type = "review";
		this.reviewSplash.hide();
		this.endSplash = new Splash(game.scene, WHITE, SPLASH_WIDTH, SPLASH_HEIGHT, 1000, 1000, 99);
		this.endSplash.type = "end";
		this.endSplash.hide();
    }

    this.createLevel = function (resetBool) {
		if(resetBool == false){
			this.curLevel++;
		}
		this.infoBar.changeText(this.curLevel);
        this.helper.helpBox.text = "Create a balanced meal by\ncollecting all of the Healthy Food!";
		if (this.curLevel > this.totalLevels) {
            this.gameOver();
        } else {
			this.level = new Level(LEVELS[this.curLevel-1]);
        }
    }
	
	this.setFood = function() {
		if(this.counter == 0){
			this.goodFood[0].pieceInfo = this.foods.dairy[0];
			this.goodFood[0].setImage(this.goodFood[0].pieceInfo.image);
			
			this.goodFood[1].pieceInfo = this.foods.dairy[1];
			this.goodFood[1].setImage(this.goodFood[1].pieceInfo.image);
			
			this.goodFood[2].pieceInfo = this.foods.dairy[3];
			this.goodFood[2].setImage(this.goodFood[2].pieceInfo.image);
			
			this.goodFood[3].pieceInfo = this.foods.protein[2];
			this.goodFood[3].setImage(this.goodFood[3].pieceInfo.image);
			
			this.goodFood[4].pieceInfo = this.foods.protein[3];
			this.goodFood[4].setImage(this.goodFood[4].pieceInfo.image);
			
			this.goodFood[5].pieceInfo = this.foods.grain[4];
			this.goodFood[5].setImage(this.goodFood[5].pieceInfo.image);
			
			this.goodFood[6].pieceInfo = this.foods.grain[11];
			this.goodFood[6].setImage(this.goodFood[6].pieceInfo.image);
			
			this.goodFood[7].pieceInfo = this.foods.vegetable[2];
			this.goodFood[7].setImage(this.goodFood[7].pieceInfo.image);
			
			this.goodFood[8].pieceInfo = this.foods.vegetable[3];
			this.goodFood[8].setImage(this.goodFood[8].pieceInfo.image);
			
			this.goodFood[9].pieceInfo = this.foods.fruit[6];
			this.goodFood[9].setImage(this.goodFood[9].pieceInfo.image);
			
			this.badFood[0].pieceInfo = this.foods.bad[1];
			this.badFood[0].setImage(this.badFood[0].pieceInfo.image);
			
			this.badFood[1].pieceInfo = this.foods.bad[8];
			this.badFood[1].setImage(this.badFood[1].pieceInfo.image);
			
			this.badFood[2].pieceInfo = this.foods.bad[4];
			this.badFood[2].setImage(this.badFood[2].pieceInfo.image);
			this.counter = this.counter + 1;
		} else {
			this.goodFood[0].pieceInfo = this.foods.dairy[0];
			this.goodFood[0].setImage(this.goodFood[0].pieceInfo.image);
			
			this.goodFood[1].pieceInfo = this.foods.dairy[1];
			this.goodFood[1].setImage(this.goodFood[1].pieceInfo.image);
			
			this.goodFood[2].pieceInfo = this.foods.protein[4];
			this.goodFood[2].setImage(this.goodFood[2].pieceInfo.image);
			
			this.goodFood[3].pieceInfo = this.foods.protein[5];
			this.goodFood[3].setImage(this.goodFood[3].pieceInfo.image);
			
			this.goodFood[4].pieceInfo = this.foods.grain[8];
			this.goodFood[4].setImage(this.goodFood[4].pieceInfo.image);
			
			this.goodFood[5].pieceInfo = this.foods.grain[9];
			this.goodFood[5].setImage(this.goodFood[5].pieceInfo.image);
			
			this.goodFood[6].pieceInfo = this.foods.vegetable[5];
			this.goodFood[6].setImage(this.goodFood[6].pieceInfo.image);
			
			this.goodFood[7].pieceInfo = this.foods.vegetable[6];
			this.goodFood[7].setImage(this.goodFood[7].pieceInfo.image);
			
			this.goodFood[8].pieceInfo = this.foods.fruit[3];
			this.goodFood[8].setImage(this.goodFood[8].pieceInfo.image);
			
			this.goodFood[9].pieceInfo = this.foods.fruit[8];
			this.goodFood[9].setImage(this.goodFood[9].pieceInfo.image);
			
			this.badFood[0].pieceInfo = this.foods.bad[3];
			this.badFood[0].setImage(this.badFood[0].pieceInfo.image);
			
			this.badFood[1].pieceInfo = this.foods.bad[5];
			this.badFood[1].setImage(this.badFood[1].pieceInfo.image);
			
			this.badFood[2].pieceInfo = this.foods.bad[6];
			this.badFood[2].setImage(this.badFood[2].pieceInfo.image);
		}

	}

    this.gameOver = function () {
       setTimeout("location.href='../../postQuiz.php';",500);
    }

    this.update = function () {
        this.scene.clear();
        this.level.checkState();
        spriteList.update();
    }

    return this;
}

function setAlpha(alpha){
	for(i=0;i<spriteList.length();i++){
		spriteList.list[i].setAlpha(alpha);
	}
	game.splash1.setAlpha(1);
}

function phaseOneTutorial(){
	arrow = new Array();
	arrow[0] = new TutorialArrow(scene, "images/arrow2.png", 310, 150, 380, 180, 10, 0, 0, 25, "This is your healthy plate.\nSelect a grain, a protein,\na combination of two fruits\nand vegetables, along\nwith a dairy product.");
	arrow[1] = new TutorialArrow(scene, "images/arrow2.png", 310, 125, 380, 415, 10, 0, 0, 25, "This is your unhealthy plate.\nIf you pick up an unhealthy\nfood or too much food\nit will go here.");
	arrow[2] = new TutorialArrow(scene, "images/arrow2.png", 310, 125, 380, 625, 10, 0, 0, 25, "This is your friendly helper.\nIf you get stuck or just need\na little bit of a hint click\nhere for some help.");
	arrow[3] = new TutorialArrow(scene, "images/arrow3.png", 310, 125, 425, 67, 10, 0, 0, -25, "This is your rolling ball.\nTilt the iPad around and\nroll it into the food to\ncreate a healthy plate.");
	arrow[4] = new TutorialArrow(scene, "images/arrow3.png", 310, 125, 290, 360, 10, 0, 0, -25, "When you see this it means\nyou have built your healthy\nplate. Roll into it to move\nto the next level.");
	arrow[5] = new TutorialArrow(scene, "images/mainText.png", 0, 0, scene.width/2 + 100, scene.height/2, 0, 0, 0, 0, "The game is about to start!\nGet ready to tilt the iPad\nto starting building your plate!");
	arrow[5].fontColor = "#ffffff";
	game.helper.clickable = false;
	spriteList.sortZ();
}

function increaseTutorial(){
	if(game.tutorialFinished == false){
		if(game.level.curArrow < 4){
			arrow[game.level.curArrow].show();
			arrow[game.level.curArrow].setAlpha(1);
			game.level.tutorialObjects[game.level.curArrow].setAlpha(1);
		} 
		if(game.level.curArrow == 4){
			arrow[game.level.curArrow].show();
			game.level.tutorialObjects[game.level.curArrow].setAlpha(1);
			game.level.tutorialObjects[game.level.curArrow].show();
			game.level.tutorialObjects[game.level.curArrow].setPosition(scene.width/2, scene.height/2);
		}
		if(game.level.curArrow == 5){
			game.goal.hide();
			arrow[game.level.curArrow].show();
			arrow[game.level.curArrow].fitText();
		}
		if(game.level.curArrow == 6){
			setAlpha(1);
			game.character.canMove = true;
			game.helper.clickable = true;
		}
	}
}


function Level(levelInfo) {
	this.curArrow = 0;
	this.tutorialObjects = new Array(game.infoBox.goodFoodHolder, game.infoBox.badFoodHolder, game.helper, game.character, game.goal);
    this.curLevel = levelInfo[0];
    this.totalLevels = levelInfo[1];
    this.numBad = levelInfo[2];
    this.numGood = levelInfo[3];
    this.badAllowed = levelInfo[4];
    this.badHit = 0;
    this.goodHit = 0;
    this.totalPhases = 3;
    this.phase = 1;
    this.curPhaseRound = 0;
    this.curPhaseThree = 0;
	
	if(this.phase == 1){
		if(game.tutorialFinished == false){
			setAlpha(.5);
			phaseOneTutorial();
		}
		else {
			game.character.canMove = true;
		}
	}
    this.checkState = function () {
		
        this.checkInput();
        if (this.phase == 1) {
            this.checkCollision(game.badFood, game.goodFood);
        }
        if (this.phase == 2) {
            this.checkCollision(game.badPortion, game.goodPortion);
        }
        if (this.phase == 3) {
            this.checkCollision(game.badCarb, game.goodCarb);
        }

		if(game.goal.visible == false){ 
			if(this.goodHit >= this.numGood) {
				game.goal.show();
				game.goal.resetPosition();
				
			}
        }
		
        if (this.badHit >= this.badAllowed) {
           
			if(this.phase == 2){
				game.character.setDX(0);
				game.character.setDY(0);
				isRolling = false;
				var resetBool = true;
				this.Phase(8, game.badPortion, game.goodPortion, resetBool);
			}
			else if(this.phase == 3){
				game.character.setDX(0);
				game.character.setDY(0);
				isRolling = false;
				var resetBool = true;
				this.Phase(7, game.badCarb, game.goodCarb, resetBool);
			}
			else{
				var resetBool = true;
				game.tutorialFinished = true;
				this.resetLevel(resetBool);
				game.createLevel(resetBool);
				game.reviewSplash.show();
				game.goal.hide();
			}
        }
    }
    this.checkInput = function () {
        if(game.splash1.visible == false && game.miss.visible == false){
			if (game.scene.touchable) {
				isRolling = game.character.checkAccel(isRolling);
			} else {
				game.character.checkKeys();
			}
		}
    }

    this.checkCollision = function (bad, good) {
        for (var i = 0; i < bad.length; i++) {
            if (bad[i].collidesWith(game.character)) {
				bad[i].playBad();
                if (this.phase == 1) {
                    game.infoBox.badFoodHolder.addFood(bad[i]);
					game.miss.setImage(MISSBUBBLE1);
					game.miss.show();
					game.character.canMove = false;
					character.setDX(0);
					character.setDY(0);
					game.helper.waving = true;
					
                } else {
                    bad[i].hide();
					game.helper.waving = true;
					if(this.badHit < 3){
						game.infoBox.miss[this.badHit].show();
					}
                }
                this.badHit++;
                break;
            }
        }
        for (var i = 0; i < good.length; i++) {
            if (good[i].collidesWith(game.character)) {
                if (this.phase == 1) {
					var isSameType = false;
					var numVegFruit = 0;
					var maxVegFruit = false;
					//check to see if a food of the same type is already on the plate
					if(good[i].pieceInfo.type == "VEGETABLE" || good[i].pieceInfo.type == "FRUIT"){
						for (var j = 0; j < game.infoBoxFood.length; j++) {
							if(game.infoBoxFood[j].pieceInfo.type == "VEGETABLE" || game.infoBoxFood[j].pieceInfo.type == "FRUIT"){
								numVegFruit++;
								if(numVegFruit >=2){
									good[i].playBad();
									//bad food hit
									game.infoBox.badFoodHolder.addFood(good[i]);
									game.miss.setImage(MISSBUBBLE2);
									game.miss.show();
									game.character.canMove = false;
									character.setDX(0);
									character.setDY(0);
									game.helper.waving = true;
									this.badHit++;
									maxVegFruit = true;
									break;
								}
							}
						}
						if(!maxVegFruit){
							game.infoBox.goodFoodHolder.addFood(good[i]);
							game.infoBoxFood.push(good[i]);
							this.goodHit++;
						}
					} else {
						for (var j = 0; j < game.infoBoxFood.length; j++) {
							if (good[i].pieceInfo.type == game.infoBoxFood[j].pieceInfo.type){
								good[i].playBad();
								game.infoBox.badFoodHolder.addFood(good[i]);
								game.miss.setImage(MISSBUBBLE3);
								game.miss.show();
								character.setDX(0);
								character.setDY(0);
								game.character.canMove = false;
								game.helper.waving = true;
								this.badHit++;
								isSameType = true;
								break;
							}
						}
						if (!isSameType){
							game.infoBox.goodFoodHolder.addFood(good[i]);
							game.infoBoxFood.push(good[i]);
							this.goodHit++;
						}
					}
                } else {
                    good[i].hide();
					this.goodHit++;
                }
                break;
            }
        }
        if (game.goal.collidesWith(game.character) && this.phase == 1) {
			if(game.helper.helpBox.visible == true){
				game.helper.helpBox.hide();
			}
            this.endPhase(bad, good);
        }
        if (game.goal.collidesWith(game.character) && this.phase == 2) {
			if(game.helper.helpBox.visible == true){
				game.helper.helpBox.hide();
			}
			var resetBool = false;
            this.Phase(8, game.badPortion, game.goodPortion, resetBool);
        }
        if (game.goal.collidesWith(game.character) && this.phase == 3) {
			if(game.helper.helpBox.visible == true){
				game.helper.helpBox.hide();
			}
			var resetBool = false;
            this.Phase(7, game.badCarb, game.goodCarb, resetBool);
        }
    }
	
	this.endLevel = function(){
		game.tutorialFinished = true;
		this.resetLevel(false);
		game.createLevel(false);
	}

    this.endPhase = function (bad, good) {
        for (var i = 0; i < this.numBad; i++) {
            bad[i].hide();
        }
        for (var i = 0; i < this.numGood; i++) {
            good[i].hide();
        }
        game.goal.hide();
        game.character.hide();
        game.infoBox.goodFoodHolder.hide();
        game.infoBox.badFoodHolder.hide();
        game.infoBox.badFoodText.hide();
        game.infoBox.goodFoodText.hide();
        this.phase++;
        if (this.phase > this.totalPhases) {
			game.reviewSplash.showAll();
        }
        if (this.phase == 2) {
			game.reviewSplash.populate();
            for (var i = 0; i < game.goodFood.length; i++) {
                game.goodFood[i].x = game.infoBox.badFoodHolder.x;
                game.goodFood[i].y = game.infoBox.badFoodHolder.y;
                game.goodFood[i].width = game.infoBox.badFoodHolder.width;
                game.goodFood[i].height = game.infoBox.badFoodHolder.height;
                game.goodFood[i].hide();
            }
			var resetBool = false;
            this.Phase(8, game.badPortion, game.goodPortion, resetBool);
        }
        if (this.phase == 3) {
			var resetBool = false;
            this.Phase(7, game.badCarb, game.goodCarb, resetBool);
        }
    }

    this.Phase = function (numBad, bad, good, resetBool) {
		game.infoBox.miss[0].hide();
		game.infoBox.miss[1].hide();
		game.infoBox.miss[2].hide();
        this.numBad = numBad;
        this.numGood = 1;
        this.badHit = 0;
        this.goodHit = 0;
        game.infoBox.currentFoodText.show();
        game.character.setPosition(600, 50);
        game.character.show();
		game.character.setDX(0);
		game.character.setDY(0);
		isRolling = false;
		if(resetBool == true){
			this.curPhaseRound -= 1;
		}
        if (this.curPhaseRound >= game.infoBoxFood.length) {
            this.curPhaseRound = 0;
            game.infoBox.currentFoodText.hide();
            this.endPhase(bad, good);
            return;
        }

        if (this.curPhaseRound == 0) {
			game.infoBoxFood[game.infoBoxFood.length - 1].hide();
        } else {
			game.infoBoxFood[this.curPhaseRound - 1].hide();
        }
		game.infoBoxFood[this.curPhaseRound].show();

        if (this.phase == 2) {
			game.infoBox.currentFoodText.text = "This is a portion of\n" + game.infoBoxFood[this.curPhaseRound].pieceInfo.name + ".\nIt is a " + game.infoBoxFood[this.curPhaseRound].pieceInfo.type + ".\nWhat size portion\nshould you have for\nyour meal?";
            game.infoBar.infoBarText.text = "Find the correct portion for a " + game.infoBoxFood[this.curPhaseRound].pieceInfo.name + ".";
			
			
            badCounter = 0;
            for (var i = 0; i < game.foods.portion.length; i++) {
				if (game.infoBoxFood[this.curPhaseRound].pieceInfo.portion == game.foods.portion[i].item){
                    good[0].pieceInfo = game.foods.portion[i];
                    good[0].setImage(game.foods.portion[i].image);
                    good[0].show();
					good[0].resetPosition();
					game.helper.helpBox.text = good[0].pieceInfo.hint;

                } else {
                    bad[badCounter].pieceInfo = game.foods.portion[i];
                    bad[badCounter].setImage(game.foods.portion[i].image);
                    bad[badCounter].show();
					bad[badCounter].resetPosition();
                    badCounter++;
                }
            }
            badCounter = 0;
        }
        if (this.phase == 3) {
			game.infoBox.currentFoodText.text = "This is a portion of\n" + game.infoBoxFood[this.curPhaseRound].pieceInfo.name + ".\nIt is a " + game.infoBoxFood[this.curPhaseRound].pieceInfo.type + ".\nHow many Carbs are\nin this serving size?";
            game.infoBar.infoBarText.text = "Find the correct amount of carbs for " + game.infoBoxFood[this.curPhaseRound].pieceInfo.servingSize + " of " + game.infoBoxFood[this.curPhaseRound].pieceInfo.name + ".";
			
            for (var i = 0; i < game.foods.carb.length; i++) {
                if (game.infoBoxFood[this.curPhaseRound].pieceInfo.carbs == game.foods.carb[i].size) {
                    good[0].pieceInfo = game.foods.carb[i];
                    good[0].setImage(game.foods.carb[i].image);
                    good[0].show();
					good[0].resetPosition();
					game.helper.helpBox.text = good[0].pieceInfo.hint;
                } else {
                    bad[badCounter].pieceInfo = game.foods.carb[i];
                    bad[badCounter].setImage(game.foods.carb[i].image);
                    bad[badCounter].show();
					bad[badCounter].resetPosition();
                    badCounter++;
                }
            }
            badCounter = 0;
        }

        game.infoBoxFood[this.curPhaseRound].show();
		game.goal.resetPosition();
		game.goal.hide();

		if(this.curPhaseRound == 0){
			if(resetBool == false){
				if(this.phase == 2){
					game.splash1.setImage(SPLASH2);
				}
				if(this.phase == 3){
					game.splash1.setImage(SPLASH3);
				}
				game.splash1.show();
			}
		}
        this.curPhaseRound++;
    }

	this.resetLevel = function(resetBool){
		isRolling = false;
		game.splash1.setImage(SPLASH1);
		game.splash1.show();
		
		game.character.setPosition(600, 50);
		game.character.show();
		
		for(var i=0;i<game.goodFood.length;i++){
			game.goodFood[i].width = FOOD_WIDTH;
			game.goodFood[i].height = FOOD_HEIGHT;
			game.goodFood[i].show();
			game.goodFood[i].resetPosition();
		}
		
		for(var i=0;i<game.badFood.length;i++){
			game.badFood[i].show();
			game.badFood[i].resetPosition();
		}
		
		
		game.infoBox.goodFoodHolder.show();
        game.infoBox.badFoodHolder.show();
        game.infoBox.badFoodText.show();
        game.infoBox.goodFoodText.show();
		
		game.infoBox.goodFoodHolder.food = [];
		game.infoBox.badFoodHolder.food = [];
		
		game.miss.hide();
		
		game.infoBoxFood.length = 0;
		if(resetBool == false){
			if(this.curLevel < this.totalLevels){
				game.setFood();
			}
		}
		game.goal.hide();
	}
}

function update() {
    game.update();
} // end update
