function GamePiece(scene, pieceInfo, width, height, x, y, z, type){
	gamePiece = new Sprite(scene, pieceInfo.image, width, height, z);
	gamePiece.setPosition(x, y);
	gamePiece.type = type;
	gamePiece.pieceInfo = pieceInfo;
	gamePiece.badSound = new Sound("sfx/wrong.mp3");
	gamePiece.resetPosition = function(){
		//don't let me overlap the goal or ball
		keepGoing = true;
		while(keepGoing){            
			newX = Math.floor(Math.random() * ((scene.width-50) - 310 + 1)) + 310;
			newY = Math.floor(Math.random() * ((scene.height-50) - 75 + 1)) + 75;
			
			this.setPosition(newX, newY);
			keepGoing = false;
			
			if (this.distanceTo(game.character) < 100){
				keepGoing = true;
			} // end if
			if(this.type == 'food'){
				for (var i=0;i<game.goodFood.length;i++){
					if(this == game.goodFood[i]){
						continue;
					}
					if(this.collidesWith(game.goodFood[i])){
						keepGoing = true;
					}
				}
				for (var i=0;i<game.badFood.length;i++){
					if(this == game.badFood[i]){
						continue;
					}
					if(this.collidesWith(game.badFood[i])){
						keepGoing = true;
					}
				}
			}
			if(this.type == 'carb'){
				for (var i=0;i<game.goodCarb.length;i++){
					if(this == game.goodCarb[i]){
						continue;
					}
					if(this.collidesWith(game.goodCarb[i])){
						keepGoing = true;
					}
				}
				for (var i=0;i<game.badCarb.length;i++){
					if(this == game.badCarb[i]){
						continue;
					}
					if(this.collidesWith(game.badCarb[i])){
						keepGoing = true;
					}
				}
			}
			if(this.type == 'portion'){
				for (var i=0;i<game.goodPortion.length;i++){
					if(this == game.goodPortion[i]){
						continue;
					}
					if(this.collidesWith(game.goodPortion[i])){
						keepGoing = true;
					}
				}
				for (var i=0;i<game.badPortion.length;i++){
					if(this == game.badPortion[i]){
						continue;
					}
					if(this.collidesWith(game.badPortion[i])){
						keepGoing = true;
					}
				}
			}
			
			/*
			for (var j=0;j<game.badFood.length;j++){
				if(this.collidesWith(game.badFood[j])){
					keepGoing = true;
				}
			}
			*/
		} // end while loop
	} // end reset
	
	gamePiece.playBad = function(){
		this.badSound.playSound();
	}
	
	gamePiece.resetPosition();
	
	return gamePiece;
} // end food