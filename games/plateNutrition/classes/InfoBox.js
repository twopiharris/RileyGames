function InfoBox(width, height){
	
	this.width = width;
	this.height = height;
	this.infoBackground = new Sprite(scene, INFOBACKGROUND, this.width, this.height, 1);
	this.infoBackground.setPosition(this.width/2, scene.height - this.height/2);
	
	this.goodFoodHolder = new FoodHolder(scene, FOODHOLDER, 1, 220, 170, this.width/2, 180, 2);
	this.badFoodHolder = new FoodHolder(scene, BADFOODHOLDER, 0, 190, 190, this.width/2, 410, 2);
	
	this.goodFoodText = new TextBox(scene, WHITE, 180, 20);
	this.goodFoodText.text = "HEALTHY FOOD";
	this.goodFoodText.z = 5;
	this.goodFoodText.setPosition(this.width/2, this.goodFoodHolder.y - this.goodFoodHolder.height/2 - this.goodFoodText.fontSize);
	
	this.badFoodText = new TextBox(scene, WHITE, 180, 20);
	this.badFoodText.text = "UNHEALTHY FOOD";
	this.badFoodText.z = 5;
	this.badFoodText.setPosition(this.width/2, this.badFoodHolder.y - this.badFoodHolder.height/2 - this.badFoodText.fontSize);
	
	this.currentFoodText = new TextBox(scene, WHITE, 180, 20);
	this.currentFoodText.z = 5;
	spriteList.sortZ();
	this.currentFoodText.setPosition(this.width/2, 160);
	this.currentFoodText.fontSize = 22;
	this.currentFoodText.hide();
	
	this.miss = new Array();
	this.miss[0] = new Sprite(scene, "images/X.png", 75, 75, 9);
	this.miss[0].setPosition(50, 100);
	this.miss[0].hide();
	this.miss[1] = new Sprite(scene, "images/X.png", 75, 75, 9);
	this.miss[1].setPosition(115, 100);
	this.miss[1].hide();
	this.miss[2] = new Sprite(scene, "images/X.png", 75, 75, 9);
	this.miss[2].setPosition(180, 100);
	this.miss[2].hide();
	
	
	return this;
} // end ball