var snakeSize = 32;

function Snake() {
	//Class for the player controlled snake
	//Changes direction when the player swipes the screen
	var tsnake = new Sprite(game, './res/snakeHead.png', snakeSize, snakeSize, 5);
	tsnake.setBoundAction(WRAP);
	tsnake.updateSpeed = 5; //number of updates that pass between each movement
	tsnake.length = 3;
	tsnake.changedDir = false;
	tsnake.setPosition(gameWidth / 2 , (gameHeight + snakeSize) / 2);
	tsnake.body = new Array(0);
	for (var i = 0; i < tsnake.length; i++) {
		var tbody = new Body();
		tbody.setPosition(tsnake.x - tsnake.width * (tsnake.length - i), tsnake.y);
		tsnake.body.unshift(tbody);
	} //end for
	console.log(tsnake.moveAngle);
	return tsnake;
} //end Snake()

function Body() {
	var tbody = new Sprite(game, './res/tbody.png', snakeSize, snakeSize, 5);
	if (level.snake) {
		tbody.setPosition(level.snake.x, level.snake.y);
	} //end if
	return tbody;
}

function Item() {
	//Class for items that the player can collect
	var titem = new Sprite(game, './res/titem.png', snakeSize, snakeSize, 4);
	
	titem.randPosition = function() {
		this.setPosition((randInt(0, (gameWidth / snakeSize) - 1) + .5) * snakeSize, (randInt(0, gameHeight / snakeSize) + .5) * snakeSize);
	}
	
	return titem;
} //end Item()

function Level() {
	//Class for the level the player is on
	var tlevel = new Sprite(game, './res/alpha.png', gameWidth, gameHeight, 0);
	tlevel.setPosition(gameWidth / 2, gameHeight / 2);
	tlevel.numItems = 3;
	
	tlevel.init = function() {
		var n = spriteList.list.indexOf(this);
		spriteList.list.splice(n, 1);
		
		if (game.touchable) {
			virtKeys = true;
			tlevel.joy = new Joy(30);
		}
		
		tlevel.snake = new Snake();
		tlevel.items = new Array(tlevel.numItems);
		for (var i = 0; i < tlevel.items.length; i++) {
			tlevel.items[i] = new Item();
			tlevel.items[i].randPosition();
		} //end for
	}
	
	tlevel.update = function() {
		if (!this.snake.changedDir) {
			if (keysDown[K_UP] && this.snake.getImgAngle() - 90 != 90) {
				this.snake.setAngle(270);
				this.snake.changedDir = true;
			}
			else if (keysDown[K_DOWN] && this.snake.getImgAngle() - 90 != 270) {
				this.snake.setAngle(90);
				this.snake.changedDir = true;
			}
			else if (keysDown[K_LEFT] && this.snake.getImgAngle() - 90 != 0) {
				this.snake.changedDir = true;
				this.snake.setAngle(180);
			}
			else if (keysDown[K_RIGHT] && this.snake.getImgAngle() - 90 != 180) {
				this.snake.setAngle(0);
				this.snake.changedDir = true;
			} //end if
			
			this.snake.setMoveAngle(this.snake.getImgAngle());
		} //end if
		
		if (updates % this.snake.updateSpeed == 0) {
			this.snake.setSpeed(this.snake.width);
			this.snake.changedDir = false;
			this.snake.body.unshift(new Body());
			var hit = false;
			for (var i = 0; i < this.items.length; i++) {
				if (this.snake.distanceTo(this.items[i]) < 5) {
					hit = true;
					this.items[i].randPosition();
				} //end for
			}
			if (!hit) {
				this.snake.body.pop().hide();
			} //end if
			
			if (this.snake.x > gameWidth - snakeSize && this.snake.getImgAngle() - 90 == 0) {
				this.snake.x = snakeSize * .5;
				this.snake.setSpeed(0);
			}
			else if (this.snake.x < snakeSize && this.snake.getImgAngle() - 90 == 180) {
				this.snake.x = gameWidth - snakeSize * .5;
				this.snake.setSpeed(0);
			}
			else if (this.snake.y > gameHeight - snakeSize && this.snake.getImgAngle() - 90 == 90) {
				this.snake.y = snakeSize * .5;
				this.snake.setSpeed(0);
			}
			else if (this.snake.y < snakeSize && this.snake.getImgAngle() - 90 == 270) {
				this.snake.y = gameHeight - snakeSize * .5;
				this.snake.setSpeed(0);
			} //end if
		}
		else {
			this.snake.setSpeed(0);
		} //end if
		
		updates++;
		spriteList.update();
	} //end update()
	
	return tlevel;
} //end Level()

function rand(min, max) {
	return Math.random() * (max - min) + min;
} //end rand()

function randInt(min, max) {
	return Math.round(rand(min, max));
} //end randInt()