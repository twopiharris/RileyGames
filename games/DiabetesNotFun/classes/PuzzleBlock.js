//PuzzleBlock Object
function PuzzleBlock(scene, width, height, image, x, y, z, position, level) {
	
	//Creates the Block Sprite, sets its position, makes it unclickable.
    block = new Sprite(scene, image, width, height, z);
    block.setPosition(x, y);
	block.clickable = false;
	
	block.sound = new Sound("sfx/click.mp3");
	
	//0 1 Sets which piece the block is.
	//3 2
	block.position = position;
	
	//Sets which level block belongs to.
	block.level = null;
	
	//Creates the boundary sprites for collision detection in a given direction
	//Sets the position. [N E S W]
	block.boundarySprites = new Array();
	block.boundarySprites[0] = new Sprite(scene, "images/white.png", block.width-15, 10, 1);
	block.boundarySprites[0].setPosition(block.x, block.y - block.height/2 + 5); 
	block.boundarySprites[1] = new Sprite(scene, "images/white.png", 10, block.width-15, 1);
	block.boundarySprites[1].setPosition(block.x + block.width/2 - 5, block.y); 
	block.boundarySprites[2] = new Sprite(scene, "images/white.png", block.width-15, 10, 1);
	block.boundarySprites[2].setPosition(block.x, block.y + block.height/2 - 5); 
	block.boundarySprites[3] = new Sprite(scene, "images/white.png", 10, block.width-15, 1);
	block.boundarySprites[3].setPosition(block.x - block.width/2 + 5, block.y);
	
	//Creates the connection point for puzzle completion against other sprites.
	block.connectPoint = new Sprite(scene, "images/white.png", 1, 1, 2);

	//Sets the position of the connection point based on the blocks position.
	if(block.position == 0){
		block.connectPoint.setPosition(block.x + block.width/2, block.y + block.height/2);
	}
	if(block.position == 1){
		block.connectPoint.setPosition(block.x - block.width/2, block.y + block.height/2);
	}
	if(block.position == 2){
		block.connectPoint.setPosition(block.x - block.width/2, block.y - block.height/2);
	}
	if(block.position == 3){
		block.connectPoint.setPosition(block.x + block.width/2, block.y - block.height/2);
	}
	
	//Initializes the blocks to allow movement in all four directions.
	block.moveN = true;
	block.moveE = true;
	block.moveS = true;
	block.moveW = true;
	
	//Checks the distance between each other block and if within a certain distance
	//Snaps the block to a nearby block and locks it in.
	block.checkDistance = function(){
		for(var i=0; i<4; i++){
			if(this.position != i){
				if(this.connectPoint.distanceTo(this.level.blockList[i].connectPoint) <= 5){
					this.move(this.level.blockList[i].connectPoint.x, this.level.blockList[i].connectPoint.y);
					this.sound.playSound();
				}
			}
		}
	}
	
	//Moves the block and its boundary pieces to the nearest block.
	block.move = function(x, y){
		this.connectPoint.setPosition(x, y);
		if(this.position == 0){
			this.setPosition(this.connectPoint.x - this.width/2, this.connectPoint.y - this.height/2);
		}
		if(this.position == 1){
			this.setPosition(this.connectPoint.x + this.width/2, this.connectPoint.y - this.height/2);
		}
		if(this.position == 2){
			this.setPosition(this.connectPoint.x + this.width/2, this.connectPoint.y + this.height/2);
		}
		if(this.position == 3){
			this.setPosition(this.connectPoint.x - this.width/2, this.connectPoint.y + this.height/2);
		}
		this.boundarySprites[0].setPosition(this.x, this.y - this.height/2 + 5); 
		this.boundarySprites[1].setPosition(this.x + this.width/2 - 5, this.y);
		this.boundarySprites[2].setPosition(this.x, this.y + this.height/2 - 5); 
		this.boundarySprites[3].setPosition(this.x - this.width/2 + 5, this.y);
	}
	
	//Checks the state of the blocks.
	//Controls if, where, and how far a block can move.
	block.checkState = function(direction){
		this.moveN = true;
		this.moveS = true;
		this.moveE = true;
		this.moveW = true;
		for(var i=0;i<4;i++){
			if(this.boundarySprites[0].collidesWith(this.level.blockList[i].boundarySprites[2])){
				this.moveN = false;
			}
			if(this.boundarySprites[2].collidesWith(this.level.blockList[i].boundarySprites[0])){
				this.moveS = false;
			}
			if(this.boundarySprites[1].collidesWith(this.level.blockList[i].boundarySprites[3])){
				this.moveE = false;
			}
			if(this.boundarySprites[3].collidesWith(this.level.blockList[i].boundarySprites[1])){
				this.moveW = false;
			}
		}
		
		if(direction == 0){
			if(this.y >= 300){
				if(this.moveN == true){
					this.move(this.connectPoint.x, this.connectPoint.y - 5);
					this.checkDistance();
					return true;
				}
				return false;
			}
		}
		if(direction == 1){
			if(this.x <= scene.width - 70 - this.width/2){
				if(this.moveE == true){
					this.move(this.connectPoint.x + 5, this.connectPoint.y);
					this.checkDistance();
					return true;
				}
				return false;
			}
		}
		if(direction == 2){
			if(this.y <= scene.height - this.height/2 - 70){
				if(this.moveS == true){
					this.move(this.connectPoint.x, this.connectPoint.y + 5);
					this.checkDistance();
					return true;
				}
				return false;
			}
		}
		if(direction == 3){
			if(this.x >= 70 + this.width/2){
				if(this.moveW == true){
					this.move(this.connectPoint.x - 5, this.connectPoint.y);
					this.checkDistance();
					return true;
				}
				return false;
			}
		}
	}
	
	block.hideBlocks = function(){
		this.hide();
		this.boundarySprites[0].hide();
		this.boundarySprites[1].hide();
		this.boundarySprites[2].hide();
		this.boundarySprites[3].hide();
		this.connectPoint.hide();
	}
	
	block.showBlocks = function(){
		this.show();
		this.boundarySprites[0].show();
		this.boundarySprites[1].show();
		this.boundarySprites[2].show();
		this.boundarySprites[3].show();
		this.connectPoint.show();
	
	}
	
	block.hideBlocks();
    return block;
}