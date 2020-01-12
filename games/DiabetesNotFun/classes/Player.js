//Player Object
function Player(scene, width, height, up, down, left, right, x, y, z) {

	//Creates the Player Sprite, sets its position, makes it unclickable.
    player = new Sprite(scene, down[0].src, width, height, z);
    player.setPosition(x, y);
	player.clickable = false;
	
	//Sets the players walking animation. UP, RIGHT, DOWN, LEFT
	//Each has 8 frames of animation
	player.position = new Array(1,1,1,1);
	
	//Sets player walk image arrays
	player.up = up;
	player.down = down;
	player.left = left;
	player.right = right;
	
	//Sets the Player's HP
	player.maxHits = 12;
	player.hit = player.maxHits;
	
	//Sets the current level the player is in.
	player.startLevel = 0;
	player.curLevel = levelList[player.startLevel];
	
	//Sets the initial battle state of the player to false.
	player.battle = false;
	
	player.minY = 210;
	
	//Method to check players interaction between itself and the blocks along with its movement.
	player.checkState = function(){
		if(this.battle == false){
			if(keysDown[K_RIGHT]){
				this.setAnimation(1);
				this.image = right[this.position[1]];//("images/walkAnimation/right" + this.position[1] + ".png");
				if(this.x + this.width/2 <= scene.width){
					this.changeXby(10);
					for(var i=0;i<4;i++){
						if(this.collidesWith(this.curLevel.blockList[i])){
							this.curLevel.blockList[i].checkState(1);
							this.setPosition(this.curLevel.blockList[i].x - (this.curLevel.blockList[i].width/2) - this.width/2 - 5, this.y);
						}
					}
				}	
			}
			if(keysDown[K_LEFT]){
				this.setAnimation(3);
				this.image = left[this.position[3]];//this.setImage("images/walkAnimation/left" + this.position[3] + ".png");
				if(this.x - this.width/2 >= 0){
					this.changeXby(-10);
					for(var i=0;i<4;i++){
						if(this.collidesWith(this.curLevel.blockList[i])){
							this.curLevel.blockList[i].checkState(3);
							this.setPosition(this.curLevel.blockList[i].x + (this.curLevel.blockList[i].width/2) + this.width/2 + 5, this.y);
						}
					}
				}
			}
			if(keysDown[K_UP]){
				this.setAnimation(0);
				this.image = up[this.position[0]];//this.setImage("images/walkAnimation/up" + this.position[0] + ".png");
				if(this.y >= this.minY){
					this.changeYby(-10);
					for(var i=0;i<4;i++){
						if(this.collidesWith(this.curLevel.blockList[i])){
							this.curLevel.blockList[i].checkState(0);
							this.setPosition(this.x, this.curLevel.blockList[i].y + (this.curLevel.blockList[i].height/2) + this.height/2 + 5);
						}
					}
				}
			}
			if(keysDown[K_DOWN]){
				this.setAnimation(2);
				this.image = down[this.position[2]];//this.setImage("images/walkAnimation/down" + this.position[2] + ".png");
				if(this.y + this.height/2 <= scene.height){
					this.changeYby(10);
					for(var i=0;i<4;i++){
						if(this.collidesWith(this.curLevel.blockList[i])){
							this.curLevel.blockList[i].checkState(2);
							this.setPosition(this.x, this.curLevel.blockList[i].y - (this.curLevel.blockList[i].height/2) - this.height/2 - 5);
						}
					}
				}
			}
			
			//Check for collision with the enemy.
			if(this.collidesWith(this.curLevel.enemy)){
				this.battle = true;
				this.setBattle();
				this.curLevel.setBattle();
			}
		}
	}
	
	//Sets the player's new animation number
	player.setAnimation = function(direction){
		console.log(this.position[direction]);
		if(this.position[direction] >= 4){
			this.position[direction] = 1;
		} else { 
			this.position[direction] = this.position[direction] + 1;
		}
	}
	
	//Applies the hit to the player against its HP.
	player.applyHit = function(amount){
		this.hit = this.hit + amount;
	}
	
	//Called when the Player and Enemy Collide. Sets the Player for Battle.
	player.setBattle = function(){
		this.width = 200;
		this.height = 250;
		this.setPosition(200, 590);
		this.setImage("images/PlayerBack.png");
	}
	
	//Resets the player after the battle.
	player.endBattle = function(){
		this.width = 64;
		this.height = 64;
		this.setPosition(scene.width/2, 40);
		this.battle = false;
		this.setImage("images/walkAnimation/down1.png");
	}
	
	player.nextLevel = function(){
		if(this.startLevel < 4){
			this.startLevel = this.startLevel + 1;
			this.curLevel = levelList[this.startLevel];
			this.curLevel.initialize();
		} else {
			alert("You WIN!!! Restarting..."); // TODO: Implement standardized game over function.
			document.location.href = "";
		}
	
	} // end nextLevel function

	// Restart function to allow the player to reset a level if it becomes unsolvable.
	player.restartLevel = function(){

		this.curLevel = levelList[this.startLevel];
		this.curLevel.initialize();
	}
	
    return player;
}