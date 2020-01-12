function Splash(scene, image, width, height, type){

	tSplash = new Sprite(scene, image, width, height, 7);
	tSplash.setPosition(scene.width/2, scene.height/2);
	
	tSplash.type = type;

	tSplash.clicked = function(){
		this.hide();
		if(this.type == "preload"){
			clickSound.playSound({sound: 0.0});
			background.playSound({loop: true, sound: 0.15});
			battle.playSound({sound: 0.0});
			battle.stopSound();
		}
	}

	return tSplash;

}