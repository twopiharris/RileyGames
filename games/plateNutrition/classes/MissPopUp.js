function MissPopUp(scene, image, width, height, x, y, z) {
	miss = new Sprite(scene, image, width, height, z);
	miss.setPosition(x, y);
	miss.type = "miss";
	
	miss.clicked = function(){
		this.hide();
		character.canMove = true;
	}
	
	return miss;
}