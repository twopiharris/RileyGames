function BG(scene, image, width, height, x, y, z) {
// A static sprite.
	tBG = new Sprite(scene, image, width, height, z);
	tBG.setSpeed(0);
	tBG.setPosition(x, y);
	tBG.curType = 0;
	
	tBG.bannerTick = function() {
		if (this.visible) {
			if (level.bannerCounter >= 25) {
				this.visible = false;
				level.bannerCounter = 0;
			} else {
				level.bannerCounter += 1;
			}
		}
	}
	
	tBG.clicked = function() {
		if(this.curType == 1){
			level.questionBox.show();	
		}
	}
	
	
	return tBG;
} // end BG def