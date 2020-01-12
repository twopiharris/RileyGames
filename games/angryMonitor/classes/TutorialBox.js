function tutorialBox(scene, image, width, height, x, y, text, num, z){
	tBox = new TextBox(scene, image, width, height, z);
	tBox.setPosition(x, y);
	tBox.text = text;
	tBox.number = num;

	tBox.clicked = function() {
		this.hide();
		if(level.tutorialBoxes.length > this.number + 1) {
			this.object.setAlpha(.6);
			level.tutorialBoxes[this.number+1].show();
			level.tutorialBoxes[this.number+1].object.setAlpha(1);
			level.tutorialBoxes[this.number+1].setAlpha(1);
			level.tutorialBoxes[this.number+1].clickable = true;
		} else {
			for(var i=0;i<spriteList.length(); i++){
				spriteList.list[i].setAlpha(1);
				spriteList.list[i].clickable = true;
			}
			level.ball.canMove = true;
		}
		if(this.number == 0 && levelCounter == 0){
			level.correctSound.playSound({sound:0});
			level.wrongSound.playSound({sound:0});
			level.launchSound.playSound({sound:0});
			level.hitBlockSound.playSound({sound:0});
			level.breakBlockSound.playSound({sound:0});	
		}
	}
	
	return tBox;
}