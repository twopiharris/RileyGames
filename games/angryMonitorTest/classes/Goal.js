function Goal(scene, x, y, image, width, height, number, text) {
// The goal class simply holds an image and text.
	tgoal = new TextBox(scene, null, width, height, 1);
	tgoal.setPosition(x, y);
	tgoal.number = number;
	tgoal.text = text;
	tgoal.setAlign("left");
	tgoal.marginLeft = 70;
	
	tgoal.theImage = new Sprite(scene, image, 65, 65, 2);
	tgoal.theImage.setPosition(x - width/2 + 32, y);
	
	tgoal.hideAll = function() {
		this.hide();
		this.theImage.hide();	
	}
	
	tgoal.collision = function () {
		if(this.collidesWith(level.ball)) {
			if(this.number == level.correct) {
			level.correctSound.playSound();
			level.banner.setImage(level.correctImage);
			level.banner.show();
			level.postBox.showAll();	
		} else {
			level.wrongSound.playSound();
			level.banner.setImage(level.incorrectImage);
			level.banner.show();
			level.goals[this.number].hideAll();
			level.helper.wave();
		}
		level.ball.resetLevel();
		}
		
	}
	
	return tgoal;
} // End Goal def