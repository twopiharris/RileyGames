function FoodHolder(scene, image, badGood, width, height, x, y, z){
	foodHolder = new Sprite(scene, image, width, height, z);
	foodHolder.setPosition(x, y);
	foodHolder.clickable = false;
	
	foodHolder.food = new Array();
	foodHolder.badOrGood = badGood;
	
	foodHolder.addFood = function(hitFood){
		this.food.push(hitFood);
		
	/////////places food on the plate in a five-point pattern like the number five on 6-sided dice
		////if it counts as bad food, ignore the type and put on plate in order
		if(this.badOrGood == 0){
			if(this.food.length == 1){
				hitFood.setPosition(this.x - this.width/3, this.y - this.height/3);
			}
			else if(this.food.length == 2){
				hitFood.setPosition(this.x + this.width/3, this.y - this.height/3);
			}
			else if(this.food.length == 3){
				hitFood.setPosition(this.x+2, this.y);
			}
			else if(this.food.length == 4){
				hitFood.setPosition(this.x - this.width/3, this.y + this.height/3);
			}
			else if(this.food.length == 5){
				hitFood.setPosition(this.x + this.width/3, this.y + this.height/3);
			}
		}
		////if it goes on the healthy plate, place it in the correct location as specified on the image.
		else{
			if(hitFood.pieceInfo.type == "FRUIT" || hitFood.pieceInfo.type == "VEGETABLE")
			{
				if(this.food.length >1){
					var alreadyFruitVeg = 0;
					for(var i = 0; i<this.food.length; i++){
						if(this.food[i].pieceInfo.type == "FRUIT" || this.food[i].pieceInfo.type == "VEGETABLE"){
							alreadyFruitVeg++;
						}
					}
					if(alreadyFruitVeg<=1){
						hitFood.setPosition(this.x - this.width/3 + 20, this.y + this.height/3);
					}
					else{
						hitFood.setPosition(this.x + this.width/3 -20, this.y + this.height/3);
					}
				}
				else{
					hitFood.setPosition(this.x - this.width/3 + 20, this.y + this.height/3);
				}
			}
			else if(hitFood.pieceInfo.type == "GRAIN"){
				hitFood.setPosition(this.x - this.width/3 + 20, this.y - this.height/3);
			}
			else if(hitFood.pieceInfo.type == "PROTEIN"){
				hitFood.setPosition(this.x + this.width/3 - 20, this.y - this.height/3);
			}
			else if(hitFood.pieceInfo.type == "DAIRY"){
				hitFood.setPosition(this.x+2, this.y);
			}
		}
	}
	
	return foodHolder;
} // end FoodHolder