//Reset button Object
//For use if the player wants to start the level over again.

function ResetButton(scene, width, height, source){
	

	rButton = new Sprite(scene, source[0].src, width, height, 1); // Button is a sprite
	rButton.setPosition((scene.width)-87, 50); // Button should be out of the way, though this location may need tweaking.
	
	rButton.images = new Array();
	rButton.images = source;

	rButton.clicked = function(){
		//player.restartLevel();  // Use the restart level function defined in player.js
		levelList[player.startLevel].randomBlocks();
		this.image = this.images[1];
		setTimeout(function(){rButton.image = rButton.images[0]},100)
	}

	return rButton;

} // end ResetButton definition.