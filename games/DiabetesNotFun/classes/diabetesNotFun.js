//Creates Scene and sets its size
//Initialized game, creates joystick and turns on virtual keys.
function init() {
    scene = new Scene();
    scene.setSize(948, 711);
	createGame();
	joy = new Joy();
	virtKeys = true;
    scene.start();
}

//Creates the Skills, Map, Player, and Reset Button
function createGame(){
	createSplash();
	preloadImages();
	createSkills();
	createHelper();
	createMap();
	createBlocks();
	createPlayer();
	createResetButton();
	createSound();
}

function preloadImages(){
	up = new Array();
	down = new Array();
	left = new Array();
	right = new Array();
	for(var i=0;i<8;i++){
		up[i] = new Image();
		up[i].src="images/walkAnimation/up" + (i+1) + ".png";
		down[i] = new Image();
		down[i].src="images/walkAnimation/down" + (i+1) + ".png";
		left[i] = new Image();
		left[i].src="images/walkAnimation/left" + (i+1) + ".png";
		right[i] = new Image();
		right[i].src="images/walkAnimation/right" + (i+1) + ".png";
	}
	
	buttonImages = new Array();
	buttonImages[0] = new Image();
	buttonImages[0].src="images/ResetButton.png";
	buttonImages[1] = new Image();
	buttonImages[1].src="images/ResetButtonPressed.png";

}

function createSound(){
	clickSound = new Sound("sfx/click.mp3");
	background = new Sound("sfx/background.mp3");
	battle = new Sound("sfx/battle.mp3");		
}

function createSplash(){
	loadSplash = new Splash(scene, "images/white.png", scene.width, scene.height, "preload");
	splashList = new Array();
	splashList[0] = new Array();
	splashList[1] = new Array();
	splashList[2] = new Array();
	splashList[3] = new Array();
	splashList[4] = new Array();
	splashList[0][0] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[0][1] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[1][0] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[1][1] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[2][0] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[2][1] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[3][0] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[3][1] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[4][0] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
	splashList[4][1] = new Splash(scene, "images/white.png", scene.width, scene.height, "standard");
}

//Creates the Player Object
function createPlayer(){
	player = new Player(scene, 64, 64, up, down, left, right, scene.width/2, scene.height - 32, 1);
}

function createHelper(){
	helper = new Helper(scene, "images/Cat.png", 200, 200);	
	helper.setPosition(500, 611);
	helper.helpBox.setPosition(715, 550);
	helper.hide();
	
	helpText = new Array();
	helpText[0] = "Stay positive and don't lose control!";
	helpText[1] = "Don't ignore the signs\nand never stop trying!";
	helpText[2] = "Keep your friends close and\nlet them know how you feel!";
	helpText[3] = "Don't keep bullying a secret or\nbe mean to others!";
	helpText[4] = "Don't compare yourself to others\nand remember to much\ncan become a problem!";
	
	helper.setText(helpText[0]);
	helper.setSmall();
}

function createResetButton(){
	rButton = new ResetButton(scene, 174, 100, buttonImages);
}

//Creates the Map Object
function createMap(){
	levelList = new Array();
	levelList[0] = new Level(scene, "images/BG_Outside.png", "images/Fence_Weights.png", "images/Weights0001.png", "images/Weights0002.png", "images/Weights0003.png", skillList[0], helpText[0], splashList[0]);
	levelList[1] = new Level(scene, "images/BG_Grass.png",  "images/Fence_Burnout.png", "images/burnout0001.png", "images/burnout0002.png", "images/burnout0003.png", skillList[1], helpText[1], splashList[1]);
	levelList[2] = new Level(scene, "images/BG_Cloud.png",  "images/Fence_Lightning.png", "images/Sadcloud0001.png", "images/Sadcloud0002.png", "images/Sadcloud0003.png", skillList[2], helpText[2], splashList[2]);
	levelList[3] = new Level(scene, "images/BG_School.png", "images/Fence_Teasing.png", "images/Teasing0001.png", "images/Teasing0002.png", "images/Teasing0003.png", skillList[3], helpText[3], splashList[3]);
	levelList[4] = new Level(scene, "images/BG_Picnic.png",  "images/Fence_Picnic.png", "images/DisorderEating0001.png", "images/DisorderEating0002.png", "images/DisorderEating0003.png", skillList[4], helpText[4], splashList[4]);
	for(var i=1;i<5;i++){
		levelList[i].background.hide();
		levelList[i].enemy.hide();
		levelList[i].blockade.hide();
	}
	
}

//Creates the Skill set for each Level
function createSkills(){

	//Stress Skills
	skillList = new Array();
	skillList[0] = new Array();
	skillList[0][0] = new Skill("Refuse to take control", -2);
	skillList[0][1] = new Skill("Snack", -2);
	skillList[0][2] = new Skill("Watch TV", 1);
	skillList[0][3] = new Skill("Read a book", 1);
	skillList[0][4] = new Skill("Ride your bike", 2);
	skillList[0][5] = new Skill("Take your dog on a walk", 2);
	skillList[0][6] = new Skill("Paint a picture of how you are feeling", 3);
	skillList[0][7] = new Skill("Journal your thoughts", 3);
	skillList[0][8] = new Skill("Take a nap", 1);
	skillList[0][9] = new Skill("Take long deep breaths and\nfocus on breathing", 2);
	skillList[0][10] = new Skill("Tighten your muscles and then relax\nyour body. Wiggle to loosen up", 2);
	skillList[0][11] = new Skill("Imagine yourself in your favorite place", 2);
	skillList[0][12] = new Skill("Do daily stretching and take quiet\ntime to think about relaxing", 3);
	skillList[0][13] = new Skill("List 5 positive things that you enjoy\nabout life and are looking forward to", 3);
	
	//Burnout Skills
	skillList[1] = new Array();
	skillList[1][0] = new Skill("Ignore it", -2);
	skillList[1][1] = new Skill("Stop trying to care for your diabetes", -2);
	skillList[1][2] = new Skill("Talk to your cat", 1);
	skillList[1][3] = new Skill("Tell your neighbor how you've been feeling", 1);
	skillList[1][4] = new Skill("Share your thoughts with a friend who\n doesn't have diabetes", 2);
	skillList[1][5] = new Skill("Talk with your mom\nwhen she is cooking dinner", 2);
	skillList[1][6] = new Skill("Talk to the person taking care of you\n everyday and ask for help", 3);
	skillList[1][7] = new Skill("Share your feelings with your school nurse", 3);
	skillList[1][8] = new Skill("Have your dad do everything for you", 1);
	skillList[1][9] = new Skill("Keep checking your blood sugars\nand taking insulin but don't worry\nabout what the numbers are", 1);
	skillList[1][10] = new Skill("Plan time to review blood sugars and\nproblems/fixes every week", 2);
	skillList[1][11] = new Skill("Keep all supplies with you and help\nkeep track of when they are running out", 2);
	skillList[1][12] = new Skill("Download a phone app that could\nhelp with monitoring blood\nsugars or counting carbs", 3);
	skillList[1][13] = new Skill("Create a task list to help divide tasks\nbetween you and the people taking care of you", 3);
	
	//Depression Skills
	skillList[2] = new Array();
	skillList[2][0] = new Skill("Hide your feelings from others", -2);
	skillList[2][1] = new Skill("Keep away from everyone", -2);
	skillList[2][2] = new Skill("Talk to your stuffed animals", 1);
	skillList[2][3] = new Skill("Share your thoughts with a friend", 2);
	skillList[2][4] = new Skill("Talk with your younger sibling or cousin", 2);
	skillList[2][5] = new Skill("Be honest about your thoughts with\nyourself and write them down", 2);
	skillList[2][6] = new Skill("Tell your parents, doctor, or nurse\nyour true feelings so\nthey can find help", 3);
	skillList[2][7] = new Skill("Ask to talk to a counselor", 3);
	skillList[2][8] = new Skill("Get on Twitter or SnapChat\nwith your friends", 1);
	skillList[2][9] = new Skill("Play video games online with your classmates", 1);
	skillList[2][10] = new Skill("Have a sleep over with friends\nincluding late night pizza,\ncandy, and snacks", 2);
	skillList[2][11] = new Skill("Ride bikes with your friends\nbefore your parents get home", 2);
	skillList[2][12] = new Skill("Go out to the park and have a\ncook out with your family", 3);
	skillList[2][13] = new Skill("Get involved in a diabetes walk\nor go to diabetes camp", 3);
	
	//Teasing Skills
	skillList[3] = new Array();
	skillList[3][0] = new Skill("Be mean back to others", -2);
	skillList[3][1] = new Skill("Keep it a secret", -2);
	skillList[3][2] = new Skill("Build/Decorate a birdhouse", 1);
	skillList[3][3] = new Skill("Listen to music", 1);
	skillList[3][4] = new Skill("Shoot some hoops", 2);
	skillList[3][5] = new Skill("Dance", 2);
	skillList[3][6] = new Skill("Write a poem about your feelings", 3);
	skillList[3][7] = new Skill("Journal your thoughts", 3);
	skillList[3][8] = new Skill("Yell into your pillow to\nlet out the tension", 1);
	skillList[3][9] = new Skill("Take deep breaths and walk away", 2);
	skillList[3][10] = new Skill("Ask an adult for some help", 2);
	skillList[3][11] = new Skill("Tell a joke or laugh about it\nand ignore the comments and keep\ndoing what you need to do", 3);
	skillList[3][12] = new Skill("Share information about what kids\ndon't know about diabetes.\nMaybe you can teach them more someday", 3);
	skillList[3][13] = new Skill("Sing a favorite song in your head\nand keep doing what you need to do", 3);
	
	//Disordered Eating Skills
	skillList[4] = new Array();
	skillList[4][0] = new Skill("Tell yourself it isn't a problem", -2);
	skillList[4][1] = new Skill("Compare yourself to others", -2);
	skillList[4][2] = new Skill("Eat the same thing everyday\nso you can memorize your carb counts", 1);
	skillList[4][3] = new Skill("Keep checking blood sugars and taking\ninsulin but don't worry\nabout what the numbers are", 1);
	skillList[4][4] = new Skill("Plan time to review blood sugars and\n problems/fixes every week", 2);
	skillList[4][5] = new Skill("Keep all supplies with you and help keep\n track of when they are running out", 2);
	skillList[4][6] = new Skill("Download a phone app that could help\nwith monitoring blood sugars\n or counting carbs", 3);
	skillList[4][7] = new Skill("Create a task list to help divide\ntasks between you and\nthe people taking care of you", 3);
	skillList[4][8] = new Skill("Get on Twitter or SnapChat\nwith your friends", 1);
	skillList[4][9] = new Skill("Play video games online with\nyour classmates", 1);
	skillList[4][10] = new Skill("Have a sleep over with friends\nincluding late night pizza,\ncandy, and snacks", 2);
	skillList[4][11] = new Skill("Ride bikes with your friends before\nyour parents get home", 2);
	skillList[4][12] = new Skill("Go out to the park and have a\ncook out with your family", 3);
	skillList[4][13] = new Skill("Get involved in a diabetes walk\nor go to diabetes camp", 3);
}

function createBlocks(){
	blockList = new Array();
	//Blocks

	blockList[0] = new Array();
	blockList[0][0] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/weights0.png", 200, 300, 2, 0, 0);
	blockList[0][1] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/weights1.png", 375, 325, 2, 1, 0);
	blockList[0][2] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/weights2.png", 450, 470, 2, 2, 0);
	blockList[0][3] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/weights3.png", 270, 455, 2, 3, 0);
	levelList[0].setBlocks(blockList[0]);
	blockList[0][0].showBlocks();
	blockList[0][1].showBlocks();
	blockList[0][2].showBlocks();
	blockList[0][3].showBlocks();
	
	//Stress Skills
	blockList = new Array();
	blockList[1] = new Array();
	blockList[1][0] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/burnout0.png", 200, 300, 2, 0, 1);
	blockList[1][1] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/burnout1.png", 375, 325, 2, 1, 1);
	blockList[1][2] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/burnout2.png", 450, 470, 2, 2, 1);
	blockList[1][3] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/burnout3.png", 270, 455, 2, 3, 1);
	levelList[1].setBlocks(blockList[1]);
	
	//Stress Skills
	blockList = new Array();
	blockList[2] = new Array();
	blockList[2][0] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/depression0.png", 200, 300, 2, 0, 2);
	blockList[2][1] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/depression1.png", 375, 325, 2, 1, 2);
	blockList[2][2] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/depression2.png", 450, 470, 2, 2, 2);
	blockList[2][3] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/depression3.png", 270, 455, 2, 3, 2);
	levelList[2].setBlocks(blockList[2]);
	
	//Stress Skills
	blockList = new Array();
	blockList[3] = new Array();
	blockList[3][0] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/bully0.png", 200, 300, 2, 0, 3);
	blockList[3][1] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/bully1.png", 375, 325, 2, 1, 3);
	blockList[3][2] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/bully2.png", 450, 470, 2, 2, 3);
	blockList[3][3] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/bully3.png", 270, 455, 2, 3, 3);
	levelList[3].setBlocks(blockList[3]);
	
	//Stress Skills
	blockList = new Array();
	blockList[4] = new Array();
	blockList[4][0] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/disorderEating0.png", 200, 300, 2, 0, 4);
	blockList[4][1] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/disorderEating1.png", 375, 325, 2, 1, 4);
	blockList[4][2] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/disorderEating2.png", 450, 470, 2, 2, 4);
	blockList[4][3] = new PuzzleBlock(scene, 100, 100, "images/Puzzle/disorderEating3.png", 270, 455, 2, 3, 4);
	levelList[4].setBlocks(blockList[4]);
	
}

//Clears and then updates all sprites
function update() {
    scene.clear();
	player.checkState();
	player.curLevel.checkState();
	//Updates all sprites that have been created automatically
	spriteList.update();
}