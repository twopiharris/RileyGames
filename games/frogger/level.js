function Level(game, frog)
{
    this.cars = [];
    
    //add answer boxes
    box1 = new Sprite(game, "box.png", 50, 50, 0);
    box1.setPosition(100, 50);
    
    box2 = new Sprite(game, "box.png", 50, 50, 0);
    box2.setPosition(400, 50);
    
    box3 = new Sprite(game, "box.png", 50, 50, 0);
    box3.setPosition(700, 50);
    
    this.frameCount = 1;
    this.lastCar = [0,0,0,0];
    this.mostRecentCar = 0;
    
    //add a car to car array
    var car;
    this.addCar = function(car)
    {
        this.cars.push(car);
    }
    
    this.collisionCheck = function()
    {
        for(var i = 0; i < this.cars.length; i++)
        {
            car = this.cars[i];
            
            if(car.collidesWith(frog))
            {
                game.stop();
                alert("U R DED");
                //this.playSplat();
            }
        }
    }
    
    this.loadSounds = function()
    {
        this.hop = new Sound("hop.mp3");
        this.splat = new Sound("splat.mp3");
        this.hop.playSound({sound: 0});
        this.splat.playSound({sound: 0});
    }
    
    this.playHop = function()
    {
        this.hop.playSound();
    }
    
    this.playSplat = function()
    {
        this.splat.playSound();
    }
    
    this.init = function()
    {
        //this.loadSounds();
    }
    
    this.update = function() {
        //increment frameCount
        this.frameCount++;
        
        this.collisionCheck();
        
        var randomLane = Math.floor((Math.random() * 4));
        //console.log("Lane: " + randomLane);
        
        if(this.mostRecentCar < (this.frameCount - 20))
        {
            if(this.lastCar[randomLane] < (this.frameCount - 40))
            {
                //lanes in pixels: 235, 310, 385, 460
                if(randomLane == 0){
                    var lane = 235;
                } else if(randomLane == 1){
                    var lane = 310;
                } else if(randomLane == 2){
                    var lane = 385;
                } else if(randomLane == 3){
                    var lane = 460;
                }
                
                //console.log("Spawning car in lane:" + lane);
                car = new Car(game, "car.jpg", 75, 35, 0, lane, 1);
                //add car to cars array
                this.addCar(car);
                
                //last car was this frame
                this.lastCar[randomLane] = this.frameCount;
                this.mostRecentCar = this.frameCount;
            }  
        }
        
    }
}