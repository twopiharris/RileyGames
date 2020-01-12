function Character(scene, image, width, height, x, y, z){
	character = new Sprite(scene, image, width, height, z);
	character.setPosition(x, y);
	character.canMove = false;
	
	character.checkKeys = function(){
		//temporary function for testing
		if(this.canMove){
			if (keysDown[K_UP]){
				this.changeYby(-10);
			}
			
			if (keysDown[K_DOWN]){
				this.changeYby(10);
			}
			
			if (keysDown[K_LEFT]){
				this.changeXby(-10);
			}
			
			if (keysDown[K_RIGHT]){
				this.changeXby(10);
			}
			
			this.checkBounds();
		}
	} // end checkKeys
	
	character.checkAccel = function(isRolling){
		//use the accelerometer to get input
		if(this.canMove){
			if(!isRolling){
				newDX = game.accel.getAY();
				newDY = game.accel.getAX();
				if(newDX >=2 || newDX <= -2 || newDY >=2 || newDY <= -2){
					newDX *= -1;
					newDY *= -1;
			
					this.setDX(newDX);
					this.setDY(newDY);
				
					this.checkBounds();
					return true;
				}
			}
			else{
				newDX = game.accel.getAY();
				newDY = game.accel.getAX();
				
				newDX *= -5;
				newDY *= -5;
			
				this.setDX(newDX);
				this.setDY(newDY);
				
				this.checkBounds();
				return true;
			}
		} else {
			this.setDX(0);
			this.setDY(0);
		}

	} // end checkAccel
	
	character.checkBounds = function(){
		if(this.x + this.width/2 >= plate.x + plate.width/2){
			this.x = plate.x + plate.width/2 - this.width/2;
		}
		if(this.x - this.width/2 <= plate.x - plate.width/2){
			this.x = plate.x - plate.width/2 + this.width/2;
		}
		if(this.y + this.height/2 >= plate.y + plate.height/2){
			this.y = plate.y + plate.width/2 - this.width/2;
		}
		if(this.y - this.height/2 <= plate.y - plate.height/2){
			this.y = plate.y - plate.width/2 + this.width/2;
		}
	}
	
	return character;
} // end ball