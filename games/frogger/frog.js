
function Frog(game, image, width, height, x, y){

	frog = new Sprite(game, image, width, height, 1);
	frog.setPosition(x,y);
	frog.boundAction = DIE;
	//frog.z = 1;
	frog.frameCount = 0;
	frog.lastMoved = 0;
	
	frog.update = function()
	{
		frog.checkAnswers();
		
		frog.frameCount++;
		//console.log("Frames: " + frameCount);
		//console.log("Last moved: " + lastMoved);
		
		//only let player move every .5 seconds
		frog.checkKeys();
		
		this.x += this.dx;
		this.y += this.dy;
		this.checkBounds();
		if (this.visible) {
			this.draw();
		} else {
			game.stop();
			alert("U R DED");
		}
	}
	
	frog.checkKeys = function()
	{
		if(frog.frameCount > (frog.lastMoved + 5))
		{
			if (keysDown[K_LEFT]){
				frog.setImgAngle(270);
				this.setX(this.x - 70);
				frog.lastMoved = frog.frameCount;
			} // end if
			
			if (keysDown[K_RIGHT]){
			    frog.setImgAngle(90);
			    this.setX(this.x + 70);
			    frog.lastMoved = frog.frameCount;
			} // end if
			
			if (keysDown[K_UP]){
			    frog.setImgAngle(0);
			    this.setY(this.y - 70);
			    frog.lastMoved = frog.frameCount;
			} // end if
			
			if (keysDown[K_DOWN]){
			    frog.setImgAngle(180);
			    this.setY(this.y + 70);
			    frog.lastMoved = frog.frameCount;
			} // end if
		}
		
	}
	
	frog.checkAnswers = function()
	{
		if(frog.collidesWith(box1))
		{
			console.log("Box 1 hit");
			game.stop();
			alert("U WIN");
		}
		else if (frog.collidesWith(box2))
		{
			console.log("Box 2 hit");
			game.stop();
			alert("U WIN");
		}
		else if (frog.collidesWith(box3))
		{
			console.log("Box 3 hit");
			game.stop();
			alert("U WIN");
		}
	}
	
	frog.checkCars = function()
	{
		for(var i = 0; i < cars.length; i++)
		{
			car = cars[i];
			
			if(frog.collidesWith(car))
			{
				game.stop();
				alert("U R DED");
			}
		}
	}
	
	return frog;
}

