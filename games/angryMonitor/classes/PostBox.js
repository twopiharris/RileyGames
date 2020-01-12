function postTextBox(scene, image, width, height, x, y, text, imageFile, imageWidth, imageHeight, z){
	pBox = new TextBox(scene, image, width, height, 3);
	pBox.setPosition(x, y);
	pBox.text = text;
	pBox.setAlign("left");
	pBox.marginLeft = 10;
	pBox.marginBottom = -10;
	
	pBox.catImage = new Sprite(scene, imageFile, imageWidth, imageHeight, z);
	pBox.catImage.setPosition(x - width/2 + (imageWidth/2), y - (height/2) + (imageHeight/2));
	
	pBox.hideAll = function() {
		this.hide();
		this.catImage.hide();	
	}
	
	pBox.showAll = function() {
		this.show();
		this.catImage.show();	
	}
	
	pBox.clicked = function() {
		this.hideAll();
		level.banner.hide();
		level.gameOver = true;
	}
	
	pBox.catImage.clicked = function() {
		pBox.hideAll();
		level.banner.hide();
		level.gameOver = true;
	}
	
	return pBox;
}