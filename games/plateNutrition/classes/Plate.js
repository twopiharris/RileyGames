function Plate(scene, image, width, height, x, y, z){
	plate = new Sprite(scene, image, width, height, z);
	plate.setPosition(x, y);
	plate.clickable = false;
	plate.type = "plate";

	
	return plate;
} // end ball