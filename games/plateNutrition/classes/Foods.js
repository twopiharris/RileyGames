const ORANGE = "images/Foods0001.png";
const GRAPES = "images/Foods0002.png";
const CHICKEN = "images/Foods0003.png";
const PUDDING = "images/Foods0004.png";
const WHITE_MILK = "images/Foods0005.png";
const CHOCOLATE_MILK = "images/Foods0006.png";
const BROCCOLI = "images/Foods0007.png";
const BREAD_SLICE = "images/Foods0008.png";
const BEEF = "images/Foods0009.png";
const BEANS = "images/Foods0010.png";
const FISH = "images/Foods0012.png";
const HAM = "images/Foods0013.png";
const CABBAGE = "images/Foods0014.png";
const CARROT = "images/Foods0015.png";
const WATERMELON = "images/Foods0016.png";
const CHEESE = "images/Foods0017.png";
const POTATO = "images/Foods0018.png";
const APPLE = "images/Foods0019.png";
const PASTA = "images/Foods0020.png";
const RICE = "images/Foods0021.png";
const EGG = "images/Foods0023.png";
const BANANA = "images/Foods0024.png";
const CRACKERS = "images/Foods0025.png";
const WAFFLE = "images/Foods0033.png";
const PEAR = "images/Foods0034.png";
const RASPBERRIES = "images/Foods0035.png";
const SAUSAGE = "images/Foods0036.png";
const PEANUT_BUTTER = "images/Foods0037.png";
const CORN = "images/Foods0038.png";
const PANCAKE = "images/Foods0040.png";
const RAISINS = "images/Foods0041.png";
const OATMEAL = "images/Foods0042.png";
const GREEN_BEANS = "images/Foods0043.png";
const MANDARIN_ORANGES = "images/Foods0044.png";
const CANNED_FRUIT = "images/Foods0045.png";
const HAMBURGER_BUN = "images/Foods0046.png";
const TORTILLA = "images/Foods0047.png";
const ENGLISH_MUFFIN = "images/Foods0048.png";
const KIWI = "images/Foods0049.png";
const COOKED_BROCCOLI = "images/Foods0052.png";
const COOKED_CARROT = "images/Foods0050.png";

//bad food images
const FRIES = "images/Foods0022.png";
const CHOCOLATE = "images/Foods0026.png";
const DONUT = "images/Foods0027.png";
const SODA = "images/Foods0028.png";
const ICECREAM = "images/Foods0029.png";
const COOKIE = "images/Foods0030.png";
const CUPCAKE = "images/Foods0031.png";
const CANDY = "images/Foods0032.png";
const CHIPS = "images/Foods0039.png";

const BADFOOD_1 = "images/badFood.png";

const BASEBALL = "images/PortionSizeBox0001.png";
const TENNISBALL = "images/PortionSizeBox0002.png";
const DICE = "images/PortionSizeBox0003.png";
const DVD = "images/PortionSizeBox0004.png";
const LIGHTBULB = "images/PortionSizeBox0005.png";
const CARDS = "images/PortionSizeBox0006.png";
const CHECKBOOK = "images/PortionSizeBox0007.png";
const MOUSE = "images/PortionSizeBox0008.png";
const GOLFBALL = "images/PortionSizeBox0009.png";

const ZERO = "images/BoxedNumbers0001.png";
const FIVE = "images/BoxedNumbers0002.png";
const SEVEN = "images/BoxedNumbers0008.png";
const TEN = "images/BoxedNumbers0007.png";
const TWELVE = "images/BoxedNumbers0003.png";
const FIFTEEN = "images/BoxedNumbers0004.png";
const TWENTY_THREE = "images/BoxedNumbers0005.png";
const TWENTY_SEVEN = "images/BoxedNumbers0006.png";

function Food(){
	this.fruit = new Array();
	this.vegetable = new Array();
	this.grain = new Array();
	this.dairy = new Array();
	this.protein = new Array();
	this.portion = new Array();
	this.carb = new Array();
	this.bad = new Array();
	
	this.createFood = function(){
		this.createFruit();
		this.createVegetable();
		this.createGrain();
		this.createDairy()
		this.createProtein();
		this.createPortion();
		this.createCarb();
		this.createBad();
	}
	
	this.createBad = function(){
		this.bad[0] = new BlankObject();
		this.bad[0].image = FRIES;
		this.bad[0].item = "bad";
		this.bad[0].type = "bad";
		this.bad[0].used = false;
		
		this.bad[1] = new BlankObject();
		this.bad[1].image = CHOCOLATE;
		this.bad[1].item = "bad";
		this.bad[1].type = "bad";
		this.bad[1].used = false;
		
		this.bad[2] = new BlankObject();
		this.bad[2].image = DONUT;
		this.bad[2].item = "bad";
		this.bad[2].type = "bad";
		this.bad[2].used = false;
		
		this.bad[3] = new BlankObject();
		this.bad[3].image = SODA;
		this.bad[3].item = "bad";
		this.bad[3].type = "bad";
		this.bad[3].used = false;
		
		this.bad[4] = new BlankObject();
		this.bad[4].image = ICECREAM;
		this.bad[4].item = "bad";
		this.bad[4].type = "bad";
		this.bad[4].used = false;
		
		this.bad[5] = new BlankObject();
		this.bad[5].image = COOKIE;
		this.bad[5].item = "bad";
		this.bad[5].type = "bad";
		this.bad[5].used = false;
		
		this.bad[6] = new BlankObject();
		this.bad[6].image = CUPCAKE;
		this.bad[6].item = "bad";
		this.bad[6].type = "bad";
		this.bad[6].used = false;
		
		this.bad[7] = new BlankObject();
		this.bad[7].image = CANDY;
		this.bad[7].item = "bad";
		this.bad[7].type = "bad";
		this.bad[7].used = false;
		
		this.bad[8] = new BlankObject();
		this.bad[8].image = CHIPS;
		this.bad[8].item = "bad";
		this.bad[8].type = "bad";
		this.bad[8].used = false;
	}
	
	this.createPortion = function(){
		this.portion[0] = new BlankObject();
		this.portion[0].image = BASEBALL;
		this.portion[0].item = "baseball";
		this.portion[0].size = "One Cup";
		this.portion[0].hint = "You can hit it with a bat.";
		
		this.portion[1] = new BlankObject();
		this.portion[1].image = MOUSE;
		this.portion[1].item = "Computer Mouse";
		this.portion[1].size = "medium potato";
		this.portion[1].hint = "You use it to click.";
		
		this.portion[2] = new BlankObject();
		this.portion[2].image = DVD;
		this.portion[2].item = "dvd";
		this.portion[2].size = "Slice Of Bread";
		this.portion[2].hint = "I love to watch movies!";
		
		this.portion[3] = new BlankObject();
		this.portion[3].image = CHECKBOOK;
		this.portion[3].item = "checkbook";
		this.portion[3].size = "Fish";
		this.portion[3].hint = "You use it to buy things.";
		
		this.portion[4] = new BlankObject();
		this.portion[4].image = DICE;
		this.portion[4].item = "pair of dice";
		this.portion[4].size = "one ounce";
		this.portion[4].hint = "Roll them to see what numbers you get.";
		
		this.portion[5] = new BlankObject();
		this.portion[5].image = CARDS;
		this.portion[5].item = "deck of cards";
		this.portion[5].size = "Three Ounces";
		this.portion[5].hint = "Shuffle these to mix them all up.";
		
		this.portion[6] = new BlankObject();
		this.portion[6].image = TENNISBALL;
		this.portion[6].item = "tennis ball";
		this.portion[6].size = "One Small Piece";
		this.portion[6].hint = "You can hit it over the net by using a racket.";
		
		this.portion[7] = new BlankObject();
		this.portion[7].image = LIGHTBULB;
		this.portion[7].item = "lightbulb";
		this.portion[7].size = "Half Cup";
		this.portion[7].hint = "Turn it on to light up the dark.";
		
		this.portion[8] = new BlankObject();
		this.portion[8].image = GOLFBALL;
		this.portion[8].item = "golf ball";
		this.portion[8].size = "2 Tbsp.";
		this.portion[8].hint = "Hit it with a club and try to get the lowest score.";
	}
	
	this.createCarb = function(){
		this.carb[0] = new BlankObject();
		this.carb[0].image = ZERO;
		this.carb[0].size = 0;
		this.carb[0].hint = "The smallest number you can choose.";
		
		this.carb[1] = new BlankObject();
		this.carb[1].image = FIVE;
		this.carb[1].size = 5;
		this.carb[1].hint = "It is less than 10.";
		
		this.carb[2] = new BlankObject();
		this.carb[2].image = SEVEN;
		this.carb[2].size = 7;
		this.carb[2].hint = "It is less than 12 but more than 0.";
		
		this.carb[3] = new BlankObject();
		this.carb[3].image = TEN;
		this.carb[3].size = 10;
		this.carb[3].hint = "It is between 5 and 12.";
		
		this.carb[4] = new BlankObject();
		this.carb[4].image = TWELVE;
		this.carb[4].size = 12;
		this.carb[4].hint = "It is an even number greater than 0.";
		
		this.carb[5] = new BlankObject();
		this.carb[5].image = FIFTEEN;
		this.carb[5].size = 15;
		this.carb[5].hint = "It is between 10 and 23.";
		
		this.carb[6] = new BlankObject();
		this.carb[6].image = TWENTY_THREE;
		this.carb[6].size = 23;
		this.carb[6].hint = "It is more than 15.";
		
		this.carb[7] = new BlankObject();
		this.carb[7].image = TWENTY_SEVEN;
		this.carb[7].size = 27;
		this.carb[7].hint = "The largest number you can choose.";
	}
	
	this.createFruit = function(){
		this.fruit[0] = new BlankObject();
		this.fruit[0].name = "BANANA";
		this.fruit[0].type = "FRUIT";
		this.fruit[0].image = BANANA;
		this.fruit[0].portion = "tennis ball";
		this.fruit[0].servingSize = "One Small Piece";
		this.fruit[0].used = false;
		this.fruit[0].carbs = 15;
		
		this.fruit[1] = new BlankObject();
		this.fruit[1].name = "KIWI";
		this.fruit[1].type = "FRUIT";
		this.fruit[1].image = KIWI;
		this.fruit[1].portion = "tennis ball";
		this.fruit[1].servingSize = "One Small Piece";
		this.fruit[1].used = false;
		this.fruit[1].carbs = 15;
		
		this.fruit[2] = new BlankObject();
		this.fruit[2].name = "RAISINS";
		this.fruit[2].type = "FRUIT";
		this.fruit[2].image = RAISINS;
		this.fruit[2].portion = "golf ball";
		this.fruit[2].servingSize = "2 Tbsp.";
		this.fruit[2].used = false;
		this.fruit[2].carbs = 15;
		
		this.fruit[3] = new BlankObject();
		this.fruit[3].name = "WATERMELON";
		this.fruit[3].type = "FRUIT";
		this.fruit[3].image = WATERMELON;
		this.fruit[3].portion = "baseball";
		this.fruit[3].servingSize = "One Cup";
		this.fruit[3].used = false;
		this.fruit[3].carbs = 12;
		
		this.fruit[4] = new BlankObject();
		this.fruit[4].name = "GRAPES";
		this.fruit[4].type = "FRUIT";
		this.fruit[4].image = GRAPES;
		this.fruit[4].portion = "lightbulb";
		this.fruit[4].servingSize = "a Half Cup";
		this.fruit[4].used = false;
		this.fruit[4].carbs = 15;
		
		this.fruit[5] = new BlankObject();
		this.fruit[5].name = "ORANGE";
		this.fruit[5].type = "FRUIT";
		this.fruit[5].image = ORANGE;
		this.fruit[5].portion = "tennis ball";
		this.fruit[5].servingSize = "One Small Piece";
		this.fruit[5].used = false;
		this.fruit[5].carbs = 15;
		
		this.fruit[6] = new BlankObject();
		this.fruit[6].name = "CANNED FRUIT";
		this.fruit[6].type = "FRUIT";
		this.fruit[6].image = CANNED_FRUIT;
		this.fruit[6].portion = "lightbulb";
		this.fruit[6].servingSize = "a Half Cup";
		this.fruit[6].used = false;
		this.fruit[6].carbs = 15;
		
		this.fruit[7] = new BlankObject();
		this.fruit[7].name = "APPLE";
		this.fruit[7].type = "FRUIT";
		this.fruit[7].image = APPLE;
		this.fruit[7].portion = "tennis ball";
		this.fruit[7].servingSize = "One Small Piece";
		this.fruit[7].used = false;
		this.fruit[7].carbs = 15;
		
		this.fruit[8] = new BlankObject();
		this.fruit[8].name = "RASPBERRIES";
		this.fruit[8].type = "FRUIT";
		this.fruit[8].image = RASPBERRIES;
		this.fruit[8].portion = "baseball";
		this.fruit[8].servingSize = "One Cup";
		this.fruit[8].used = false;
		this.fruit[8].carbs = 15;
		
		this.fruit[9] = new BlankObject();
		this.fruit[9].name = "MANDARIN ORANGES";
		this.fruit[9].type = "FRUIT";
		this.fruit[9].image = MANDARIN_ORANGES;
		this.fruit[9].portion = "lightbulb";
		this.fruit[9].servingSize = "a Half Cup";
		this.fruit[9].used = false;
		this.fruit[9].carbs = 10;
		
		this.fruit[10] = new BlankObject();
		this.fruit[10].name = "PEAR";
		this.fruit[10].type = "FRUIT";
		this.fruit[10].image = PEAR;
		this.fruit[10].portion = "tennis ball";
		this.fruit[10].servingSize = "One Small Piece";
		this.fruit[10].used = false;
		this.fruit[10].carbs = 15;
	}
	
	this.createVegetable = function(){
		
		this.vegetable[1] = new BlankObject();
		this.vegetable[1].name = "CABBAGE";
		this.vegetable[1].type = "VEGETABLE";
		this.vegetable[1].image = CABBAGE;
		this.vegetable[1].portion = "baseball";
		this.vegetable[1].servingSize = "One Cup";
		this.vegetable[1].used = false;
		this.vegetable[1].carbs = 5;
	
		this.vegetable[2] = new BlankObject();
		this.vegetable[2].name = "CARROTS";
		this.vegetable[2].type = "VEGETABLE";
		this.vegetable[2].image = CARROT;
		this.vegetable[2].portion = "baseball";
		this.vegetable[2].servingSize = "One Cup";
		this.vegetable[2].used = false;
		this.vegetable[2].carbs = 5;
		
		this.vegetable[3] = new BlankObject();
		this.vegetable[3].name = "BROCCOLI";
		this.vegetable[3].type = "VEGETABLE";
		this.vegetable[3].image = BROCCOLI;
		this.vegetable[3].portion = "baseball";
		this.vegetable[3].servingSize = "One Cup";
		this.vegetable[3].used = false;
		this.vegetable[3].carbs = 5;
		
		this.vegetable[4] = new BlankObject();
		this.vegetable[4].name = "GREEN BEANS";
		this.vegetable[4].type = "VEGETABLE";
		this.vegetable[4].image = GREEN_BEANS;
		this.vegetable[4].portion = "lightbulb";
		this.vegetable[4].servingSize = "a Half Cup";
		this.vegetable[4].used = false;
		this.vegetable[4].carbs = 5;
		
		this.vegetable[5] = new BlankObject();
		this.vegetable[5].name = "COOKED CARROTS";
		this.vegetable[5].type = "VEGETABLE";
		this.vegetable[5].image = COOKED_CARROT;
		this.vegetable[5].portion = "baseball";
		this.vegetable[5].servingSize = "One Cup";
		this.vegetable[5].used = false;
		this.vegetable[5].carbs = 5;
		
		this.vegetable[6] = new BlankObject();
		this.vegetable[6].name = "COOKED BROCCOLI";
		this.vegetable[6].type = "VEGETABLE";
		this.vegetable[6].image = COOKED_BROCCOLI;
		this.vegetable[6].portion = "baseball";
		this.vegetable[6].servingSize = "One Cup";
		this.vegetable[6].used = false;
		this.vegetable[6].carbs = 5;
	}
	
	this.createProtein = function(){
		this.protein[0] = new BlankObject();
		this.protein[0].name = "EGG";
		this.protein[0].type = "PROTEIN";
		this.protein[0].image = EGG;
		this.protein[0].portion = "pair of dice";
		this.protein[0].servingSize = "one ounce";
		this.protein[0].used = false;
		this.protein[0].carbs = 0;
		
		this.protein[1] = new BlankObject();
		this.protein[1].name = "SAUSAGE";
		this.protein[1].type = "PROTEIN";
		this.protein[1].image = SAUSAGE;
		this.protein[1].portion = "deck of cards";
		this.protein[1].servingSize = "Three Ouncess";
		this.protein[1].used = false;
		this.protein[1].carbs = 0;
		
		this.protein[2] = new BlankObject();
		this.protein[2].name = "HAM";
		this.protein[2].type = "PROTEIN";
		this.protein[2].image = HAM;
		this.protein[2].portion = "deck of cards";
		this.protein[2].servingSize = "Three Ouncess";
		this.protein[2].used = false;
		this.protein[2].carbs = 0;
		
		this.protein[3] = new BlankObject();
		this.protein[3].name = "PEANUT BUTTER";
		this.protein[3].type = "PROTEIN";
		this.protein[3].image = PEANUT_BUTTER;
		this.protein[3].portion = "golf ball";
		this.protein[3].servingSize = "2 Tbsp.";
		this.protein[3].used = false;
		this.protein[3].carbs = 7;
		
		this.protein[4] = new BlankObject();
		this.protein[4].name = "CHICKEN";
		this.protein[4].type = "PROTEIN";
		this.protein[4].image = CHICKEN;
		this.protein[4].portion = "deck of cards";
		this.protein[4].servingSize = "Three Ouncess";
		this.protein[4].used = false;
		this.protein[4].carbs = 0;
		
		this.protein[5] = new BlankObject();
		this.protein[5].name = "FISH";
		this.protein[5].type = "PROTEIN";
		this.protein[5].image = FISH;
		this.protein[5].portion = "deck of cards";
		this.protein[5].servingSize = "Three Ouncess";
		this.protein[5].used = false;
		this.protein[5].carbs = 0;
	}
	
	this.createGrain = function(){
		this.grain[0] = new BlankObject();
		this.grain[0].name = "PANCAKE";
		this.grain[0].type = "GRAIN";
		this.grain[0].image = PANCAKE;
		this.grain[0].portion = "dvd";
		this.grain[0].servingSize = "a DVD sized piece";
		this.grain[0].used = false;
		this.grain[0].carbs = 15;
		
		this.grain[1] = new BlankObject();
		this.grain[1].name = "WAFFLE";
		this.grain[1].type = "GRAIN";
		this.grain[1].image = WAFFLE;
		this.grain[1].portion = "dvd";
		this.grain[1].servingSize = "a DVD sized piece";
		this.grain[1].used = false;
		this.grain[1].carbs = 15;
		
		this.grain[2] = new BlankObject();
		this.grain[2].name = "OATMEAL";
		this.grain[2].type = "GRAIN";
		this.grain[2].image = OATMEAL;
		this.grain[2].portion = "lightbulb";
		this.grain[2].servingSize = "a Half Cup";
		this.grain[2].used = false;
		this.grain[2].carbs = 15;
		
		this.grain[3] = new BlankObject();
		this.grain[3].name = "ENGLISH MUFFIN";
		this.grain[3].type = "GRAIN";
		this.grain[3].image = ENGLISH_MUFFIN;
		this.grain[3].portion = "dvd";
		this.grain[3].servingSize = "a DVD sized portion";
		this.grain[3].used = false;
		this.grain[3].carbs = 30;
		
		this.grain[4] = new BlankObject();
		this.grain[4].name = "BREAD SLICE";
		this.grain[4].type = "GRAIN";
		this.grain[4].image = BREAD_SLICE;
		this.grain[4].portion = "dvd";
		this.grain[4].servingSize = "a DVD sized piece";
		this.grain[4].used = false;
		this.grain[4].carbs = 15;
		
		this.grain[5] = new BlankObject();
		this.grain[5].name = "HAMBURGER BUN";
		this.grain[5].type = "GRAIN";
		this.grain[5].image = HAMBURGER_BUN;
		this.grain[5].portion = "dvd";
		this.grain[5].servingSize = "a DVD sized piece";
		this.grain[5].used = false;
		this.grain[5].carbs = 30;
		
		this.grain[6] = new BlankObject();
		this.grain[6].name = "CRACKERS";
		this.grain[6].type = "GRAIN";
		this.grain[6].image = CRACKERS;
		this.grain[6].portion = "dvd";
		this.grain[6].servingSize = "a DVD sized portion";
		this.grain[6].used = false;
		this.grain[6].carbs = 15;
		
		this.grain[7] = new BlankObject();
		this.grain[7].name = "TORTILLA";
		this.grain[7].type = "GRAIN";
		this.grain[7].image = TORTILLA;
		this.grain[7].portion = "dvd";
		this.grain[7].servingSize = "a DVD sized piece";
		this.grain[7].used = false;
		this.grain[7].carbs = 15;
		
		this.grain[8] = new BlankObject();
		this.grain[8].name = "CORN";
		this.grain[8].type = "GRAIN";
		this.grain[8].image = CORN;
		this.grain[8].portion = "lightbulb";
		this.grain[8].servingSize = "a Half Cup";
		this.grain[8].used = false;
		this.grain[8].carbs = 15;
		
		this.grain[9] = new BlankObject();
		this.grain[9].name = "POTATO";
		this.grain[9].type = "GRAIN";
		this.grain[9].image = POTATO;
		this.grain[9].portion = "lightbulb";
		this.grain[9].servingSize = "a Half Cup";
		this.grain[9].used = false;
		this.grain[9].carbs = 15;
		
		this.grain[10] = new BlankObject();
		this.grain[10].name = "RICE";
		this.grain[10].type = "GRAIN";
		this.grain[10].image = RICE;
		this.grain[10].portion = "lightbulb";
		this.grain[10].servingSize = "a Half Cup";
		this.grain[10].used = false;
		this.grain[10].carbs = 23;
		
		this.grain[11] = new BlankObject();
		this.grain[11].name = "PASTA";
		this.grain[11].type = "GRAIN";
		this.grain[11].image = PASTA;
		this.grain[11].portion = "lightbulb";
		this.grain[11].servingSize = "a Half Cup";
		this.grain[11].used = false;
		this.grain[11].carbs = 23;
	}
	
	this.createDairy = function(){
		
		this.dairy[0] = new BlankObject();
		this.dairy[0].name = "WHITE MILK";
		this.dairy[0].type = "DAIRY";
		this.dairy[0].image = WHITE_MILK;
		this.dairy[0].portion = "baseball";
		this.dairy[0].servingSize = "One Cup";
		this.dairy[0].used = false;
		this.dairy[0].carbs = 12;
		
		this.dairy[1] = new BlankObject();
		this.dairy[1].name = "CHOCOLATE MILK";
		this.dairy[1].type = "DAIRY";
		this.dairy[1].image = CHOCOLATE_MILK;
		this.dairy[1].portion = "baseball";
		this.dairy[1].servingSize = "One Cup";
		this.dairy[1].used = false;
		this.dairy[1].carbs = 27;
		
		this.dairy[2] = new BlankObject();
		this.dairy[2].name = "YOGURT";
		this.dairy[2].type = "DAIRY";
		this.dairy[2].image = PUDDING;
		this.dairy[2].portion = "baseball";
		this.dairy[2].servingSize = "One Cup";
		this.dairy[2].used = false;
		this.dairy[2].carbs = 23;
		
		this.dairy[3] = new BlankObject();
		this.dairy[3].name = "CHEESE";
		this.dairy[3].type = "DAIRY";
		this.dairy[3].image = CHEESE;
		this.dairy[3].portion = "pair of dice";
		this.dairy[3].servingSize = "one ounce";
		this.dairy[3].used = false;
		this.dairy[3].carbs = 0;
		
	}
	
	this.getFruit = function(){
		for(var i=0;i<this.fruit.length;i++){
			if(this.fruit[i].used == false){
				this.fruit[i].used = true;
				return this.fruit[i];
			}
		}
	}
	
	this.getVegetable = function(){
		for(var i=0;i<this.vegetable.length;i++){
			if(this.vegetable[i].used == false){
				this.vegetable[i].used = true;
				return this.vegetable[i];
			}
		}
	}
	
	this.getGrain = function(){
		for(var i=0;i<this.grain.length;i++){
			if(this.grain[i].used == false){
				this.grain[i].used = true;
				return this.grain[i];
			}
		}
	}
	
	this.getProtein = function(){
		for(var i=0;i<this.protein.length;i++){
			if(this.protein[i].used == false){
				this.protein[i].used = true;
				return this.protein[i];
			}
		}
	}
	
	this.getDairy = function(){
		for(var i=0;i<this.dairy.length;i++){
			if(this.dairy[i].used == false){
				this.dairy[i].used = true;
				return this.dairy[i];
			}
		}
	}
	
	this.getBad = function(){
		for(var i=0;i<this.bad.length;i++){
			if(this.bad[i].used == false){
				this.bad[i].used = true;
				if(i == this.bad.length-1){
					for(var j=0; j<this.bad.length; j++){
						this.bad[j].used = false;
					}
				}
				return this.bad[i];
			}
		}
	}
	
	return this;
}

function BlankObject(){
	return this;
} // end fruit