function Splash(scene, image, width, height, x, y, z){
	splash = new Sprite(scene, image, width, height, z);
	splash.setPosition(x, y);
	splash.type = "splash";
	splash.bg = new Sprite(scene, WHITE, 950, 711, 9);
	splash.bg.setPosition(scene.width/2, scene.height/2);
	splash.bg.hide();
	splash.plate = new ReviewPlate(scene, "images/HealthyPlate.png", 950, 711, scene.width/2, scene.height/2, 10);
	splash.plate.hide();
	splash.grain = "null";
	splash.grainCarb = new TextBox(scene, "images/trans.png", 180, 20);
	splash.grainPortion = new TextBox(scene, "images/trans.png", 180, 20);
	splash.protein = "null";
	splash.proteinCarb = new TextBox(scene, "images/trans.png", 180, 20);
	splash.proteinPortion = new TextBox(scene, "images/trans.png", 180, 20);
	splash.dairy = "null";
	splash.dairyCarb = new TextBox(scene, "images/trans.png", 180, 20);
	splash.dairyPortion = new TextBox(scene, "images/trans.png", 180, 20);
	splash.fov1 = "null";
	splash.fov1Carb = new TextBox(scene, "images/trans.png", 180, 20);
	splash.fov1Portion = new TextBox(scene, "images/trans.png", 180, 20);
	splash.fov2 = "null";
	splash.fov2Carb = new TextBox(scene, "images/trans.png", 180, 20);
	splash.fov2Portion = new TextBox(scene, "images/trans.png", 180, 20);
	splash.curFood = new Array();
	splash.counter = 0;
	
	splash.grainCarb.fontColor = "#fff";
	splash.grainPortion.fontColor = "#fff";
	splash.proteinCarb.fontColor = "#fff";
	splash.proteinPortion.fontColor = "#fff";
	splash.dairyCarb.fontColor = "#fff";
	splash.dairyPortion.fontColor = "#fff";
	splash.fov1Carb.fontColor = "#fff";
	splash.fov1Portion.fontColor = "#fff";
	splash.fov2Carb.fontColor = "#fff";
	splash.fov2Portion.fontColor = "#fff";
	
	splash.grainCarb.fontSize = 25;
	splash.grainPortion.fontSize = 25;
	splash.proteinCarb.fontSize = 25;
	splash.proteinPortion.fontSize = 25;
	splash.dairyCarb.fontSize = 25;
	splash.dairyPortion.fontSize = 25;
	splash.fov1Carb.fontSize = 25;
	splash.fov1Portion.fontSize = 25;
	splash.fov2Carb.fontSize = 25;
	splash.fov2Portion.fontSize = 25;
	
	splash.grainCarb.z = 25;
	splash.grainPortion.z = 25;
	splash.proteinCarb.z = 25;
	splash.proteinPortion.z = 25;
	splash.dairyCarb.z = 25;
	splash.dairyPortion.z = 25;
	splash.fov1Carb.z = 25;
	splash.fov1Portion.z = 25;
	splash.fov2Carb.z = 25;
	splash.fov2Portion.z = 25;
	
	spriteList.sortZ();
	
	splash.grainCarb.hide();
	splash.grainPortion.hide();
	splash.proteinCarb.hide();
	splash.proteinPortion.hide();
	splash.dairyCarb.hide();
	splash.dairyPortion.hide();
	splash.fov1Carb.hide();
	splash.fov1Portion.hide();
	splash.fov2Carb.hide();
	splash.fov2Portion.hide();
	
	splash.clicked = function(){
		this.hide();
		if(game.tutorialFinished == false){
			increaseTutorial();
		}
		if(this.counter == 0){
			game.badFood[0].badSound.playSound({sound: 0.0});	
		}
	}
	
	splash.hideAll = function() {
		this.hide();
		game.splash1.hide();
		game.helper.show();
		this.bg.hide();
		this.plate.hide();
		
		this.grain.hide();
		this.protein.hide();
		this.dairy.hide();
		this.fov1.hide();
		this.fov2.hide();
		
		this.grainCarb.hide();
		this.grainPortion.hide();
		this.proteinCarb.hide();
		this.proteinPortion.hide();
		this.dairyCarb.hide();
		this.dairyPortion.hide();
		this.fov1Carb.hide();
		this.fov1Portion.hide();
		this.fov2Carb.hide();
		this.fov2Portion.hide();
		
	}
	
	splash.showAll = function() {
		this.show();
		game.splash1.hide();
		this.bg.show();
		game.helper.hide();
		this.plate.show();
		this.grain.show();
		this.grain.setPosition(250, 160);
		this.protein.show();
		this.protein.setPosition(725, 160);
		this.dairy.show();
		this.dairy.setPosition(480, 300);
		this.fov1.show();
		this.fov1.setPosition(250, 460);
		this.fov2.show();
		this.fov2.setPosition(700, 460);
		this.grain.width = 125;
		this.grain.height = 125;
		this.protein.width = 125;
		this.protein.height = 125;
		this.dairy.width = 125;
		this.dairy.height = 125;
		this.fov1.width = 125;
		this.fov1.height = 125;
		this.fov2.width = 125;
		this.fov2.height = 125;
		
		this.grainCarb.setPosition(250, 250);
		this.grainPortion.setPosition(250, 300);
		this.proteinCarb.setPosition(725, 250);
		this.proteinPortion.setPosition(725, 300);
		this.dairyCarb.setPosition(480, 400);
		this.dairyPortion.setPosition(480, 450);
		this.fov1Carb.setPosition(250, 550);
		this.fov1Portion.setPosition(250, 600);
		this.fov2Carb.setPosition(700, 550);
		this.fov2Portion.setPosition(700, 600);
		this.grainCarb.show();
		this.grainPortion.show();
		this.proteinCarb.show();
		this.proteinPortion.show();
		this.dairyCarb.show();
		this.dairyPortion.show();
		this.fov1Carb.show();
		this.fov1Portion.show();
		this.fov2Carb.show();
		this.fov2Portion.show();
		this.grainCarb.fitText();
		this.grainPortion.fitText();
		this.proteinCarb.fitText();
		this.proteinPortion.fitText();
		this.dairyCarb.fitText();
		this.dairyPortion.fitText();
		this.fov1Carb.fitText();
		this.fov1Portion.fitText();
		this.fov2Carb.fitText();
		this.fov2Portion.fitText();
		this.grainCarb.fitText();
		//this.grainPortion.width *= 1.25;
		this.proteinCarb.fitText();
		//this.proteinPortion.width *= 1.25;
		this.dairyCarb.fitText();
		//this.dairyPortion.width *= 1.25;
		this.fov1Carb.fitText();
		//this.fov1Portion.width *= 1.25;
		this.fov2Carb.fitText();
		//this.fov2Portion.width *= 1.25;
	
	}
	
	splash.populate = function() {
		var count = 0;
		this.curFood = game.infoBoxFood;
		for( var i = 0; i < this.curFood.length; i++){
			if(this.curFood[i].pieceInfo.type == "GRAIN") {
				this.grain = this.curFood[i];
				this.grain.hide();
				this.grainCarb.text = "Carbs: " + this.grain.pieceInfo.carbs.toString();
				this.grainPortion.text = "Portion: " + this.grain.pieceInfo.servingSize;
				this.grainPortion.fitText();
				this.grainCarb.hide();
				this.grainPortion.hide();
			}
			if(this.curFood[i].pieceInfo.type == "PROTEIN") {
				this.protein = this.curFood[i];
				this.protein.hide();
				this.proteinCarb.text = "Carbs: " + this.protein.pieceInfo.carbs.toString();
				this.proteinPortion.text = "Portion: " + this.protein.pieceInfo.servingSize;
				this.proteinCarb.hide();
				this.proteinPortion.hide();
			}
			if(this.curFood[i].pieceInfo.type == "DAIRY") {
				this.dairy = this.curFood[i];
				this.dairy.hide();
				this.dairyCarb.text = "Carbs: " + this.dairy.pieceInfo.carbs.toString();
				this.dairyPortion.text = "Portion: " + this.dairy.pieceInfo.servingSize;
				this.dairyCarb.hide();
				this.dairyPortion.hide();
			}
			if(count == 0){
				if(this.curFood[i].pieceInfo.type == "FRUIT" || this.curFood[i].pieceInfo.type == "VEGETABLE"){
					this.fov1 = this.curFood[i];
					this.fov1.hide();
					this.fov1Carb.text = "Carbs: " + this.fov1.pieceInfo.carbs.toString();
					this.fov1Portion.text = "Portion: " + this.fov1.pieceInfo.servingSize;
					this.fov1Carb.hide();
					this.fov1Portion.hide();
					count = 1;
				}
			}
			if(count == 1){
				if(this.curFood[i].pieceInfo.type == "FRUIT" || this.curFood[i].pieceInfo.type == "VEGETABLE"){
					this.fov2 = this.curFood[i];
					this.fov2.hide();
					this.fov2Carb.text = "Carbs: " + this.fov2.pieceInfo.carbs.toString();
					this.fov2Portion.text = "Portion: " + this.fov2.pieceInfo.servingSize;
					this.fov2Carb.hide();
					this.fov2Portion.hide();
				}
			}
		}
	}
	
	return splash;
} // end Splash