function ReviewPlate(scene, image, width, height, x, y, z){
	reviewPlate = new Sprite(scene, image, width, height, z);
	reviewPlate.setPosition(x, y);
	reviewPlate.clickable = true;
	
	reviewPlate.clicked = function(){
		game.reviewSplash.hideAll();
		game.level.endLevel();
	}
	
	return reviewPlate;
} // end ball