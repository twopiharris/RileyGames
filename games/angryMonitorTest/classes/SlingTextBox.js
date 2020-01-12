function slingTextBox(scene, image, width, height, x, y, text){
	slingBox = new TextBox(scene, image, width, height, 6);
	slingBox.setPosition(x, y);
	slingBox.text = text;
	
	slingBox.clicked = function() {
		this.hide();
		level.ball.canMove = true;	
	}
	
	return slingBox;
	
}
