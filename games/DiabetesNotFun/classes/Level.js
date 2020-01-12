//Level Object
function Level(scene, backgroundImage, fenceImage, enemyOne, enemyTwo, enemyThree, skillList, theHelpText, splashList) {
	
	this.blockList = new Array();
	this.skillList = new Array();
	this.skillList = skillList;
	this.helpText = theHelpText;
	
	this.preSplash = splashList[0];	
	this.preSplash.hide();
	this.postSplash = splashList[1]
	this.postSplash.hide();
	
	this.setBlocks = function(blockList) {
		this.blockList = blockList;
		for(var i=0;i<4;i++){
			this.blockList[i].level = this;
		}
	}
	
	//Sets the Background Image and sets the Position
	this.createBG = function(){
		this.background = new Sprite(scene, backgroundImage, scene.width, scene.height, -1);
		this.background.setPosition(scene.width/2, scene.height/2);
		this.background.clickable = false;
	}
	
	//Creates the Enemy for the Level
	this.createEnemy = function(){
		this.enemy = new Enemy(scene, 200, 75, enemyOne, enemyTwo, enemyThree, scene.width/2, 50, 1);
	}
	
	//Creates the Blockade Area for Enemy and sets the Position
	this.createBlockade = function(){
		this.blockade = new Sprite(scene, fenceImage, scene.width, 50, 2);
		this.blockade.setPosition(scene.width/2, 150);
	}
	
	//Creates the HP Bars for Battle Scene, sets their position, and hides them.
	this.createBattleHP = function(){
		this.enemyHP = new Sprite(scene, "images/hpBar3.png", 400, 70, 1);
		this.enemyHP.setPosition(this.enemyHP.width/2, this.enemyHP.height/2);
		this.enemyHP.hide();
		this.playerHP = new Sprite(scene, "images/hpBar3.png", 400, 70, 1);
		this.playerHP.setPosition(scene.width - this.playerHP.width/2, scene.height - this.playerHP.height/2);
		this.playerHP.hide();
	}
	
	//Creates Four Attack Slots for Battle Scene which are Populated by Player Skills
	this.createBattleAttackSlots = function(){
		this.slot = new Array();
		this.slot[0] = new Slot(scene, 800, 150, "images/AttackBox.png", 200, 200, 2);
		this.slot[1] = new Slot(scene, 800, 150, "images/AttackBox.png", 200, 275, 2);
		this.slot[2] = new Slot(scene, 800, 150, "images/AttackBox.png", 200, 350, 2);
		this.slot[3] = new Slot(scene, 800, 150, "images/AttackBox.png", 200, 425, 2);
	}
	
	//Populates the Attack Slots with Two Negative and Two Positive Skills
	this.populateSkills = function(){
		firstNegative = Math.floor(Math.random()*(3-0+1)+0);
		this.slot[firstNegative].setSkill(this.skillList[0]);
		secondNegative = firstNegative;
		while(secondNegative == firstNegative){
			secondNegative = Math.floor(Math.random()*(3-0+1)+0);
		}
		this.slot[secondNegative].setSkill(this.skillList[1]);
		for(i=0; i<4; i++){
			populated = false;
			if(i != firstNegative && i != secondNegative){
				while(populated == false){
					ranNum = Math.floor(Math.random()*(13-2+1)+2);
					if(this.skillList[ranNum].used == false && this.skillList[ranNum].current == false){
						this.slot[i].setSkill(this.skillList[ranNum]);
						this.skillList[ranNum].current = true;
						populated = true;
					}
				}
			}
		}
	}
	
	//Sets the Battle Scene when Player and Enemy Collide.
	this.setBattle = function(){
		this.preSplash.show();
		background.stopSound();
		battle.playSound({loop:true, sound: 0.15});
		this.enemy.changeState();
		this.background.setImage("images/BG0001.png");
		//this.playerHP.show();
		this.enemyHP.show();
		for(var i=0;i<4;i++){
			this.slot[i].show();
		}
		this.blockade.hide();
		helper.show();
	}
	
	//Checks the Player, Enemy, Puzzle, and Battle States.
	this.checkState = function(){
		this.enemy.checkState();
		for(var i=0;i<4;i++){
			this.blockList[i].checkState();
		}
		this.puzzleCompleted();
		if(player.battle == true){
			this.enemyHP.width = (this.enemy.hit/this.enemy.maxHits) * 400;
			if(this.enemy.hit >= 4 && this.enemy.hit < 8){
				this.background.setImage("images/BG0002.png");
				this.enemyHP.setImage("images/hpBar2.png");	
			}
			if(this.enemy.hit < 4){
				this.background.setImage("images/BG0003.png");
				this.enemyHP.setImage("images/hpBar.png");		
			}
			this.enemyHP.setPosition(this.enemyHP.width/2, this.enemyHP.y);
			this.playerHP.width = (player.hit/player.maxHits) * 400;
			if(player.hit >= 4 && player.hit < 8){
				this.playerHP.setImage("images/hpBar2.png");	
			}
			if(player.hit < 4){
				this.playerHP.setImage("images/hpBar.png");		
			}
			this.playerHP.setPosition(scene.width - (this.playerHP.width/2), this.playerHP.y);
		
			if(this.enemy.hit <= 0){
				helper.hide();
				this.enemy.hide();
				this.playerHP.hide();
				this.enemyHP.hide();
				player.endBattle();
				for(var i=0;i<4;i++){
					this.slot[i].hide();
				}
				this.levelHide();
				this.postSplash.show();
			}
			if(player.hit <= 0){
				alert("You LOSE!!! Restarting...");
				document.location.href = "";
			}
		}
	}
	
	this.randomizeBlocks = function(){
		// Randomly sets the position of blocks to make the level more interesting.
		// Called during level init.
		
		// move the top left block.
		var generatedX = Math.floor(Math.random() * 200) + 220; // Put the block in the left half of the puzzle.
		var generatedY = Math.floor(Math.random() * 80) + 360; // Put the block in the upper half of the puzzle.
		this.blockList[0].move(generatedX, generatedY);

		// move the top right block.
		generatedX = Math.floor(Math.random() * 200) + 490; // Put the block in the right half of the puzzle.
		generatedY = Math.floor(Math.random() * 80) + 360; // Put the block in the upper half of the puzzle.
		this.blockList[1].move(generatedX, generatedY);

		// move the bottom right block.
		generatedX = Math.floor(Math.random() * 200) + 490; // Put the block in the right half of the puzzle.
		generatedY = Math.floor(Math.random() * 80) + 460; // Put the block in the lower half of the puzzle.
		this.blockList[2].move(generatedX, generatedY);

		// move the bottom left block.
		generatedX = Math.floor(Math.random() * 200) + 220; // Put the block in the left half of the puzzle.
		generatedY = Math.floor(Math.random() * 80) + 460; // Put the block in the lower half of the puzzle.
		this.blockList[3].move(generatedX, generatedY);

	} // end randomizeBlocks

	this.initialize = function(){
		player.setPosition(scene.width/2, scene.height - 32);
		player.minY = 210;
		this.enemy.show();
		this.enemy.dx = 5;
		this.enemy.dy = 5;
		this.enemy.setPosition(scene.width/2, 50);
		this.background.show();
		this.blockade.show();
		this.randomizeBlocks(); // randomize the block positions.
		for(var j=0;j<4;j++){
			this.blockList[j].show();
			this.blockList[j].connectPoint.show();
			for(var i=0;i<4;i++){
				this.blockList[j].boundarySprites[i].show();
			}
		}
		rButton.show(); // Show the reset button.
		helper.setText(this.helpText);
		background.playSound({loop:true, sound:0.3});
		battle.stopSound();

	}
	
	this.randomBlocks = function(){
		player.setPosition(scene.width/2, scene.height - 32);
		this.randomizeBlocks(); // randomize the block positions.
		for(var j=0;j<4;j++){
			this.blockList[j].show();
			this.blockList[j].connectPoint.show();
			for(var i=0;i<4;i++){
				this.blockList[j].boundarySprites[i].show();
			}
		}
	}
	
	this.levelHide = function(){
		this.background.hide();
		this.enemy.hide();
		this.blockade.hide();
		for(var j=0;j<4;j++){
			this.blockList[j].hide();
			this.blockList[j].connectPoint.hide();
			this.slot[j].skill = null;
			for(var i=0;i<4;i++){
				this.blockList[j].boundarySprites[i].hide();
			}
		}
		player.nextLevel();
	}
	
	//Checks If Puzzle Has Been Completed.
	this.puzzleCompleted = function(){
		for(var i=1;i<4;i++){
			if(this.blockList[0].connectPoint.distanceTo(this.blockList[i].connectPoint) != 0){
				return;
			}
		}
		this.blockade.hide();
		this.enemy.maxY = scene.height;
		player.minY = 0 + player.height/2;
		for(var i=0;i<4;i++){
			this.blockList[i].hide();
			this.blockList[i].boundarySprites[0].hide();
			this.blockList[i].boundarySprites[1].hide();
			this.blockList[i].boundarySprites[2].hide();
			this.blockList[i].boundarySprites[3].hide();
			this.blockList[i].connectPoint.hide();
		}
		rButton.hide(); // hide the reset button too.
	}
	
	//Calls Methods to Create Level Objects
	this.createBG();
	this.createEnemy();
	this.createBlockade();
	this.createBattleHP();
	this.createBattleAttackSlots();
	this.populateSkills();
    return this;
}