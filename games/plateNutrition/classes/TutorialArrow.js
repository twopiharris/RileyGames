function TutorialArrow(scene, image, width, height, x, y, up, down, left, right, text){
	tutArrow = new TextBox(scene, image, width, height);
	tutArrow.z = 50;
	tutArrow.setPosition(x, y);
	tutArrow.setMargin(up, down, left, right);
	tutArrow.text = text;
	tutArrow.hide();
	
	tutArrow.clicked = function() {
		this.hide();
		if(game.level.curArrow < 4){
			game.level.tutorialObjects[game.level.curArrow].setAlpha(.5);
		}
		game.level.curArrow = game.level.curArrow + 1;
		increaseTutorial();
		
	}
	
	return tutArrow;
} // end TutorialArrow