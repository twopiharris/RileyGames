function InfoBar(width, height, curLevel, totalLevels){
	
	this.width = width;
	this.height = height;
	
	this.infoBarText = new TextBox(scene, GREEN, this.width, this.height);
	this.infoBarText.setPosition(this.width/2, this.height/2);
	
	this.changeText = function(curLevel) {
		if(curLevel == 1){
			this.infoBarText.text = "Roll the ball around to collect food and create a healthy and balanced BREAKFAST!";
		}
		if(curLevel == 2){
			this.infoBarText.text = "Roll the ball around to collect food and create a healthy and balanced LUNCH!";
		}
		if(curLevel == 3){
			this.infoBarText.text = "Roll the ball around to collect food and create a healthy and balanced DINNER!";
		}
	}
	
	return this;
} // end ball