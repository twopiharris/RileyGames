//Enemy Object
function Enemy(scene, width, height, enemyOne, enemyTwo, enemyThree, x, y, z) {

	//Creates the Enemy Sprite, sets it's position, makes it unclickable.
    enemy = new Sprite(scene, enemyOne, width, height, z);
    enemy.setPosition(x, y);
	enemy.clickable = false;
	
	//Sets the path for all three Enemy battle images.
	enemy.enemyOne = enemyOne;
	enemy.enemyTwo = enemyTwo;
	enemy.enemyThree = enemyThree;
	
	//Sets the enemy speed.
	enemy.dx = 5;
	enemy.dy = 5;
	
	//Sets the enemy maximum Y bound.
	enemy.maxY = 160;
	
	//Sets the enemy HP for Battle.
	enemy.maxHits = 12;
	enemy.hit = enemy.maxHits;
	
	//Called when enemy is hit by player attack.
	enemy.applyHit = function(amount){
		this.hit = this.hit - amount;
		if(this.hit > 12){ this.hit = 12; }
		if(this.hit > 8) { this.setImage(enemyOne); }
		if(this.hit <= 8 && this.hit > 4) { this.setImage(enemyTwo); }
		if(this.hit <= 4 && this.hit > 0) { this.setImage(enemyThree); }
	}
	
	//Called when the battle scene is initialized.
	enemy.changeState = function(){
		this.width = 400;
		this.height = 200;
		this.dx = 0;
		this.dy = 0;
		this.setPosition(720, 200);
	}
	
	//Called on each frame to check the enemy position and keep it within it's bounds.
	enemy.checkState = function(){
		if(this.x + this.width/2 >= scene.width || this.x - this.width/2 <= 0){
			this.dx = this.dx * -1;
		}
		if(this.y + this.height/2 >= this.maxY || this.y - this.height/2 <= 0){
			this.dy = this.dy * -1;
		}
	}
	
    return enemy;
}