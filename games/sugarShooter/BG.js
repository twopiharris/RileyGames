function BG(scene, image, width, height, x, y, z) {
	tBG = new Sprite(scene, image, width, height, z);
	tBG.setSpeed(0);
	tBG.setPosition(x, y);
	
	tBG.clicked = function() {}
	
	return tBG;
} // end BG def